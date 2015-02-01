/*
 * Copyright (c) 2014 Samsung Electronics Co., Ltd All Rights Reserved
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

#include "application-manager.h"

#include <memory>
#include <type_traits>

#include <app_manager.h>
#include <aul.h>
#include <package_manager.h>
#include <pkgmgr-info.h>
#include <wrt-common/native-context.h>

#include "application-utils.h"
#include "current-application.h"
#include "logger.h"
#include "native-plugin.h"
#include "platform-exception.h"
#include "task-queue.h"

namespace webapi {
namespace application {

namespace {
const std::string kPrivilegeApplicationInfo = "http://tizen.org/privilege/application.info";
const std::string kPrivilegeAppManagerKill = "http://tizen.org/privilege/appmanager.kill";
const std::string kPrivilegeApplicationLaunch = "http://tizen.org/privilege/application.launch";
const std::string kPrivilegeAppManagerCertificate = "http://tizen.org/privilege/appmanager.certificate";

const std::string kTizenApisFileScheme = "file://";
const std::string kTizenApisAppSlash = "/";
const std::string kTizenApisAppShared = "shared";
}

using namespace webapi::common;

void ApplicationManager::GetCurrentApplication(const json::Object& /* args */, json::Object& out) {
    LoggerD("");

    json::Value app_info = json::Value(json::Object());
    json::Object& app_info_obj = app_info.get<json::Object>();

    // obtain handle to application info
    pkgmgrinfo_appinfo_h handle;
    int ret = pkgmgrinfo_appinfo_get_appinfo(CurrentApplication::GetInstance().GetApplicationId().c_str(), &handle);
    if (PMINFO_R_OK != ret) {
        LoggerE("Failed to get appInfo");
        throw UnknownException("pkgmgrinfo_appinfo_get_appinfo error: unknown error");
    }

    // fill in data
    ApplicationUtils::CreateApplicationInformation(handle, &app_info_obj);
    pkgmgrinfo_appinfo_destroy_appinfo(handle);

    // result object
    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    result_obj.insert(std::make_pair("contextId",
                                     json::Value(std::to_string(CurrentApplication::GetInstance().GetProcessId()))));
    result_obj.insert(std::make_pair("appInfo", app_info));

    NativePlugin::ReportSuccess(result, out);
}

class TerminateHandler {
public:
    TerminateHandler(int callback_handle) : callback_handle_(callback_handle),
                                            pid_(-1),
                                            timeout_id_(0) {
    }

    void set_pid(pid_t pid) {
        pid_ = pid;
    }

    pid_t pid() const {
        return pid_;
    }

    void Invoke(const std::shared_ptr<json::Value>& response) {
        LoggerD("");

        if (timeout_id_ > 0) {
            // cancel terminate callback
            g_source_remove(timeout_id_);
            timeout_id_ = 0;
        }

        TaskQueue::GetInstance().Async<json::Value>([callback_handle_](const std::shared_ptr<json::Value>& response) {
            wrt::common::NativeContext::GetInstance()->InvokeCallback(callback_handle_,
                                                                      response->serialize());
        }, response);
    }

    void LaunchCheckTerminate() {
        LoggerD("");
        timeout_id_ = g_timeout_add(3000, CheckTerminate, this);
        LoggerD("END");
    }

private:
    static gboolean CheckTerminate(gpointer user_data) {
        LoggerD("");
        TerminateHandler* that = static_cast<TerminateHandler*>(user_data);
        LoggerD("PID: " << that->pid_);

        // we're canceling the calback by returning false, no need for Invoke() to do that again
        that->timeout_id_ = 0;

        char* app_id = nullptr;
        std::shared_ptr<json::Value> response{new json::Value(json::Object())};

        LoggerD("checking if application is still alive");
        if (app_manager_get_app_id(that->pid_, &app_id) == APP_MANAGER_ERROR_NONE) {
            LoggerD("application is alive - failure");
            free(app_id);
            // context is still alive, report error
            NativePlugin::ReportError(UnknownException("Failed to kill application"),
                                      response->get<json::Object>());
        } else {
            LoggerD("application is dead - success");
            NativePlugin::ReportSuccess(response->get<json::Object>());
        }

        that->Invoke(response);
        delete that;

        return false;
    }

    int callback_handle_;
    pid_t pid_;
    guint timeout_id_;
};

void ApplicationManager::Kill(const json::Object& args, json::Object& out) {
    LoggerD("Entered Kill");
    NativePlugin::CheckAccess(kPrivilegeAppManagerKill);

    int callback_handle = NativePlugin::GetAsyncCallbackHandle(args);

    const auto it_context_id = args.find("contextId");
    const auto it_args_end = args.end();

    if (it_context_id == it_args_end ||
        !it_context_id->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    const json::String& context_id = it_context_id->second.get<json::String>();

    if (context_id.empty()) {
        LoggerE("Context ID is empty");
        throw NotFoundException("Cannot find the application with given context ID");
    }

    auto kill = [callback_handle, context_id]() -> void {
        LoggerD("Entered Kill async");
        TerminateHandler* handler = new TerminateHandler(callback_handle);
        try {
            pid_t pid = -1;
            try {
                pid = std::stoi(context_id);
            } catch (...) {
                LoggerE("Failed to convert string to int");
                throw NotFoundException("Cannot find the application with given context ID");
            }

            if (pid <= 0) {
                LoggerE("Context ID cannot be negative value");
                throw NotFoundException("Cannot find the application with given context ID");
            }

            // if kill request comes for current context, throw InvalidValuesException
            if (CurrentApplication::GetInstance().GetProcessId() == pid) {
                LoggerE("Cannot kill current application.");
                throw InvalidValuesException("Cannot send kill request for current application");
            }

            LoggerD("Kill async, pid: " << pid);

            // get application ID
            char* app_id = nullptr;

            int ret = app_manager_get_app_id(pid, &app_id);
            std::unique_ptr<char, void(*)(void*)> app_id_ptr(app_id, &std::free); // automatically release the memory

            if (APP_MANAGER_ERROR_NONE != ret) {
                LoggerE("Failed to get application ID, error: " << ret);
                throw NotFoundException("Error while getting application ID");
            }

            LoggerD("Kill async, app ID: " << app_id);

            // acquire application context
            app_context_h app_context = nullptr;

            ret = app_manager_get_app_context(app_id, &app_context);
            std::unique_ptr<std::remove_pointer<app_context_h>::type, int(*)(app_context_h)>
                            app_context_ptr(app_context, &app_context_destroy); // automatically release the memory

            if (APP_MANAGER_ERROR_NONE != ret) {
                LoggerE("Failed to get application context handle");
                throw NotFoundException("Error while getting application ID");
            }

            auto terminate_callback = [](app_context_h app_context,
                                         app_context_event_e event,
                                         void* user_data) {
                LoggerD("terminate_callback: " << event);

                if (APP_CONTEXT_EVENT_TERMINATED != event) {
                    LoggerD("ignoring event");
                    return;
                }

                int pid = 0;
                int ret = app_context_get_pid(app_context, &pid);

                if (APP_MANAGER_ERROR_NONE != ret) {
                    LoggerE("Failed to get pid of terminated app (" << ret << ")");
                    return;
                }

                TerminateHandler* handler = static_cast<TerminateHandler*>(user_data);

                LoggerD("Expected PID: " << handler->pid() << ", got: " << pid);

                if (handler->pid() == pid) {
                    std::shared_ptr<json::Value> response = std::shared_ptr<json::Value>(new json::Value(json::Object()));
                    NativePlugin::ReportSuccess(response->get<json::Object>());
                    handler->Invoke(response);
                    delete handler;
                }
            };

            LoggerD("Kill async, setting callback");
            handler->set_pid(pid);
            ret = app_manager_set_app_context_event_cb(terminate_callback, handler);

            if (APP_MANAGER_ERROR_NONE != ret) {
                LoggerE("Error while registering app context event (" << ret << ")");
                throw UnknownException("Failed to register termination callback.");
            }

            // due to platform issue, sometimes termination event is not reported to callback
            // registered with app_manager_set_app_context_event_cb()
            // this is a workaround, it should be removed when issue is solved
            handler->LaunchCheckTerminate();

            LoggerD("Kill async, KILL!!!!!!!!!");

            // terminate application
            ret = app_manager_terminate_app(app_context);

            if (APP_MANAGER_ERROR_NONE != ret) {
                LoggerE("Failed to terminate application");
                throw UnknownException("Failed to terminate application");
            }

            LoggerD("Kill async, end, waiting for notification");
        } catch (const BasePlatformException& e) {
            std::shared_ptr<json::Value> response = std::shared_ptr<json::Value>(new json::Value(json::Object()));
            NativePlugin::ReportError(e, response->get<json::Object>());
            handler->Invoke(response);
            delete handler;
        }
    };

    TaskQueue::GetInstance().Queue(kill);

    NativePlugin::ReportSuccess(out);
}

void ApplicationManager::Launch(const json::Object& args, json::Object& out) {
    LoggerD("");

    NativePlugin::CheckAccess(kPrivilegeApplicationLaunch);

    int callback_handle = NativePlugin::GetAsyncCallbackHandle(args);

    const auto it_id = args.find("id");
    const auto it_args_end = args.end();

    if (it_id == it_args_end ||
        !it_id->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    const json::String& id = it_id->second.get<json::String>();

    auto launch = [id](const std::shared_ptr<json::Value>& response) -> void {
        const char* app_id = id.c_str();
        const int retry_count = 3;

        int retry = 0;
        int ret = 0;

        while (retry < retry_count) {
            ret = aul_open_app(app_id);

            if (ret >= 0) {
                break;
            }

            // delay 300ms for each retry
            usleep(300 * 1000);
            ++retry;

            LoggerD("Retry launch request: " << retry);
        }

        if (ret < 0) {
            BasePlatformException e = UnknownException("Unknown error has occurred");

            switch (ret)
            {
            case AUL_R_EINVAL:
            case AUL_R_ERROR:
                LoggerE("aul_open_app returns Not Found error");
                e = NotFoundException("Launchpad returns not found error");
                break;

            case AUL_R_ECOMM:
                LoggerE("aul_open_app returns internal IPC error");
                e = UnknownException("Internal IPC error has occurred");
                break;
            }

            NativePlugin::ReportError(e, response->get<json::Object>());
        } else {
            LoggerD("Launch request success");
            NativePlugin::ReportSuccess(response->get<json::Object>());
        }
    };

    auto launch_response = [callback_handle](const std::shared_ptr<json::Value>& response) -> void {
        wrt::common::NativeContext::GetInstance()->InvokeCallback(callback_handle, response->serialize());
    };

    TaskQueue::GetInstance().Queue<json::Value>(launch,
                                                launch_response,
                                                std::shared_ptr<json::Value>(new json::Value(json::Object())));

    NativePlugin::ReportSuccess(out);
}

void ApplicationManager::LaunchAppControl(const json::Object& args, json::Object& out) {
    LoggerD("");
    NativePlugin::CheckAccess(kPrivilegeApplicationLaunch);

    int callback_handle = NativePlugin::GetAsyncCallbackHandle(args);

    const auto it_app_control = args.find("appControl");
    const auto it_args_end = args.end();

    if (it_app_control == it_args_end ||
        !it_app_control->second.is<json::Object>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    const json::Object& app_control_obj = it_app_control->second.get<json::Object>();
    app_control_h app_control = ApplicationUtils::ApplicationControlToService(app_control_obj);
    std::shared_ptr<std::remove_pointer<app_control_h>::type>
                    app_control_ptr(app_control, &app_control_destroy); // automatically release the memory

    json::String app_id;
    const auto it_app_id = args.find("id");
    if (it_app_id != it_args_end &&
        it_app_id->second.is<json::String>()) {
        app_id = it_app_id->second.get<json::String>();
    }

    json::String reply_callback;
    const auto it_reply_callback = args.find("replyCallback");
    if (it_reply_callback != it_args_end &&
        it_reply_callback->second.is<json::String>()) {
        reply_callback = it_reply_callback->second.get<json::String>();
    }

    auto launch = [app_control_ptr, app_id, reply_callback](const std::shared_ptr<json::Value>& response) -> void {
        LoggerD("");

        try {
            if (!app_id.empty()) {
                LoggerD("app_id: " << app_id);

                app_control_set_app_id(app_control_ptr.get(), app_id.c_str());

                char* resolved_app_id = nullptr;

                // application ID can be aliased, read it again to get the real value
                app_control_get_app_id(app_control_ptr.get(), &resolved_app_id);
                // automatically release the memory
                std::unique_ptr<char, void(*)(void*)> resolved_app_id_ptr(resolved_app_id, std::free);

                // Check if application exists
                app_info_h info_h = nullptr;

                int ret = app_manager_get_app_info(resolved_app_id, &info_h);
                std::unique_ptr<std::remove_pointer<app_info_h>::type, int(*)(app_info_h)>
                                                info_h_ptr(info_h, &app_info_destroy); // automatically release the memory

                if (APP_MANAGER_ERROR_NONE != ret) {
                    LoggerE("Specified application does not exist");
                    throw NotFoundException("no matched application found");
                }
            }

            app_control_reply_cb callback = nullptr;
            std::string* user_data = nullptr;

            if (!reply_callback.empty()) {
                user_data = new std::string(reply_callback);
                callback = [](app_control_h /* request */, app_control_h reply, app_control_result_e result, void* user_data) {
                    LoggerD("send_launch_request callback");

                    json::Value return_value = json::Value(json::Object());
                    json::Object& return_value_obj = return_value.get<json::Object>();
                    std::string* reply_callback = static_cast<std::string*>(user_data);

                    if (APP_CONTROL_RESULT_SUCCEEDED == result) {
                        const std::string data = "data";
                        return_value_obj.insert(std::make_pair(data, json::Value(json::Array())));
                        if (!ApplicationUtils::ServiceToApplicationControlDataArray(reply,
                                                       &return_value_obj.find(data)->second.get<json::Array>())) {
                            return_value_obj.erase(data);
                        }
                        NativePlugin::ReportSuccess(return_value_obj);
                    } else {
                        NativePlugin::ReportError(return_value_obj);
                    }

                    wrt::common::NativeContext::GetInstance()->FireEvent(reply_callback->c_str(),
                                                                         return_value.serialize());
                    delete reply_callback;
                };
            }

            const int retry_count = 3;

            int retry = 0;
            int ret = 0;

            while (retry < retry_count) {
                ret = app_control_send_launch_request(app_control_ptr.get(), callback, user_data);

                if (APP_CONTROL_ERROR_NONE == ret) {
                    break;
                }

                // delay 300ms for each retry
                usleep(300 * 1000);
                ++retry;

                LoggerD("Retry launch request: " << retry);
            }

            if (APP_CONTROL_ERROR_NONE != ret) {
                delete user_data;

                switch (ret)
                {
                case APP_CONTROL_ERROR_INVALID_PARAMETER:
                    LoggerD("app_control_send_launch_request returns APP_CONTROL_ERROR_INVALID_PARAMETER");
                    throw InvalidValuesException("Invalid parameter was returned");
                    break;

                case APP_CONTROL_ERROR_OUT_OF_MEMORY:
                    LoggerD("app_control_send_launch_request returns APP_CONTROL_ERROR_OUT_OF_MEMORY");
                    throw UnknownException("Out of memory");
                    break;

                case APP_CONTROL_ERROR_LAUNCH_REJECTED:
                case APP_CONTROL_ERROR_APP_NOT_FOUND:
                    LoggerD("app_control_send_launch_request returns APP_CONTROL_ERROR_APP_NOT_FOUND");
                    throw NotFoundException("No matched application found");
                    break;

                default:
                    LoggerD("app_control_send_launch_request returns UNKNOWN ERROR!!!");
                    throw UnknownException("Unknown error");
                    break;
                }
            }

            NativePlugin::ReportSuccess(response->get<json::Object>());
        } catch (const BasePlatformException& e) {
            NativePlugin::ReportError(e, response->get<json::Object>());
        }
    };

    auto launch_response = [callback_handle](const std::shared_ptr<json::Value>& response) -> void {
        wrt::common::NativeContext::GetInstance()->InvokeCallback(callback_handle, response->serialize());
    };

    TaskQueue::GetInstance().Queue<json::Value>(launch,
                                                launch_response,
                                                std::shared_ptr<json::Value>(new json::Value(json::Object())));

    NativePlugin::ReportSuccess(out);
}

void ApplicationManager::FindAppControl(const json::Object& args, json::Object& out) {
    LoggerD("");

    int callback_handle = NativePlugin::GetAsyncCallbackHandle(args);

    const auto it_app_control = args.find("appControl");
    const auto it_args_end = args.end();

    if (it_app_control == it_args_end ||
        !it_app_control->second.is<json::Object>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    const json::Object& app_control_obj = it_app_control->second.get<json::Object>();
    app_control_h app_control = ApplicationUtils::ApplicationControlToService(app_control_obj);
    std::shared_ptr<std::remove_pointer<app_control_h>::type>
                    app_control_ptr(app_control, &app_control_destroy); // automatically release the memory

    auto find = [app_control_ptr](const std::shared_ptr<json::Value>& response) -> void {
        auto app_control_matched = [](app_control_h /* app_control */, const char* appid, void* user_data) -> bool {
            if (nullptr == appid) {
                LoggerD("appid is NULL");
                return false;
            }

            pkgmgrinfo_appinfo_h handle;
            int ret = pkgmgrinfo_appinfo_get_appinfo(appid, &handle);
            if (PMINFO_R_OK != ret) {
                LoggerE("Failed to get appInfo");
            } else {
                json::Array* array = static_cast<json::Array*>(user_data);
                array->push_back(json::Value(json::Object()));

                ApplicationUtils::CreateApplicationInformation(handle, &array->back().get<json::Object>());
                pkgmgrinfo_appinfo_destroy_appinfo(handle);
            }

            return true;
        };

        json::Object& response_obj = response->get<json::Object>();
        auto it_result = response_obj.find("result");
        json::Object& result_obj = it_result->second.get<json::Object>();
        auto array = result_obj.insert(std::make_pair("informationArray", json::Value(json::Array())));

        int ret = app_control_foreach_app_matched(app_control_ptr.get(), app_control_matched, &array.first->second.get<json::Array>());

        if (APP_CONTROL_ERROR_NONE != ret) {
            LoggerE("app_control_foreach_app_matched error: " << ret);

            NativePlugin::ReportError(UnknownException("Unknown error"), response_obj);
            // remove copied ApplicationControl from result
            response_obj.erase(it_result);
        } else {
            NativePlugin::ReportSuccess(response_obj);
        }
    };

    auto find_response = [callback_handle](const std::shared_ptr<json::Value>& response) -> void {
        wrt::common::NativeContext::GetInstance()->InvokeCallback(callback_handle, response->serialize());
    };

    std::shared_ptr<json::Value> response(new json::Value(json::Object()));
    json::Object& response_obj = response->get<json::Object>();

    // prepare result object, we need to do that here, as input parameter is passed to result callback
    auto result = response_obj.insert(std::make_pair("result", json::Value(json::Object())));
    // reinsert application control
    result.first->second.get<json::Object>().insert(std::make_pair("appControl", it_app_control->second));

    // queue the task
    TaskQueue::GetInstance().Queue<json::Value>(find, find_response, response);

    NativePlugin::ReportSuccess(out);
}

void ApplicationManager::GetAppsContext(const json::Object& args, json::Object& out) {
    LoggerD("");

    int callback_handle = NativePlugin::GetAsyncCallbackHandle(args);

    auto get_apps_context = [](const std::shared_ptr<json::Value>& response) -> void {
        json::Object& response_obj = response->get<json::Object>();
        json::Value result = json::Value(json::Object());
        json::Object& result_obj = result.get<json::Object>();
        json::Array& array = result_obj.insert(std::make_pair("contexts", json::Value(json::Array())))
                             .first->second.get<json::Array>();

        auto app_context_cb = [](app_context_h app_context, void* user_data) -> bool {
            if (nullptr == user_data) {
                return false;
            }

            json::Array* array = static_cast<json::Array*>(user_data);
            array->push_back(json::Value(json::Object()));

            if (!ApplicationUtils::CreateApplicationContext(app_context, &array->back().get<json::Object>())) {
                array->pop_back();
                return false;
            }

            return true;
        };

        int ret = app_manager_foreach_app_context(app_context_cb, &array);

        if (APP_MANAGER_ERROR_NONE != ret) {
            LoggerE("app_manager_foreach_app_context error");
            NativePlugin::ReportError(UnknownException("Unknown error"), response_obj);
        } else {
            NativePlugin::ReportSuccess(result, response_obj);
        }
    };

    auto get_apps_context_response = [callback_handle](const std::shared_ptr<json::Value>& response) -> void {
        wrt::common::NativeContext::GetInstance()->InvokeCallback(callback_handle, response->serialize());
    };

    // queue the task
    TaskQueue::GetInstance().Queue<json::Value>(get_apps_context,
                                                get_apps_context_response,
                                                std::shared_ptr<json::Value>(new json::Value(json::Object())));

    NativePlugin::ReportSuccess(out);
}

void ApplicationManager::GetAppContext(const webapi::common::json::Object& args, webapi::common::json::Object& out) {
    LoggerD("");

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    const auto it_context_id = args.find("contextId");
    const auto it_args_end = args.end();

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    pid_t pid = 0;

    if (it_context_id != it_args_end &&
        it_context_id->second.is<json::String>()) {
        try {
            pid = std::stoi(it_context_id->second.get<json::String>());
        } catch(...) {
            LoggerE("Failed to convert string to int");
            throw NotFoundException("No such application exist");
        }
    } else {
        pid = CurrentApplication::GetInstance().GetProcessId();
    }

    char* app_id = nullptr;

    int ret = app_manager_get_app_id(pid, &app_id);
    std::unique_ptr<char, void(*)(void*)> app_id_ptr(app_id, &std::free); // automatically release the memory

    if (APP_MANAGER_ERROR_NONE != ret || nullptr == app_id) {
        switch(ret) {
        case APP_MANAGER_ERROR_NO_SUCH_APP:
            LoggerE("app_manager_get_app_id returned: APP_MANAGER_ERROR_NO_SUCH_APP");
            throw NotFoundException("No such application exist");

        case APP_MANAGER_ERROR_INVALID_PARAMETER:
            LoggerE("app_manager_get_app_id returned: APP_MANAGER_ERROR_INVALID_PARAMETER");
            throw NotFoundException("Not found application ID by given context ID");

        default:
            LoggerE("app_manager_get_app_id returned: " << ret);
            throw UnknownException("UnknownError");
        }
    }

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    json::Value result = json::Value(json::Object());

    ApplicationUtils::CreateApplicationContext(pid, app_id, &result.get<json::Object>());

    NativePlugin::ReportSuccess(result, out);
}

void ApplicationManager::GetAppsInfo(const json::Object& args, json::Object& out) {
    LoggerD("");

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    int callback_handle = NativePlugin::GetAsyncCallbackHandle(args);

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    auto get_apps_info = [](const std::shared_ptr<json::Value>& response) -> void {
        json::Object& response_obj = response->get<json::Object>();
        json::Value result = json::Value(json::Object());
        json::Object& result_obj = result.get<json::Object>();
        json::Array& array = result_obj.insert(std::make_pair("informationArray", json::Value(json::Array())))
                             .first->second.get<json::Array>();

        auto app_info_cb = [](pkgmgrinfo_appinfo_h handle, void* user_data) -> int {
            if (nullptr == user_data) {
                return -1;
            }

            json::Array* array = static_cast<json::Array*>(user_data);
            array->push_back(json::Value(json::Object()));

            ApplicationUtils::CreateApplicationInformation(handle, &array->back().get<json::Object>());

            return 0;
        };

        int ret = pkgmgrinfo_appinfo_get_installed_list(app_info_cb, &array);

        if (APP_MANAGER_ERROR_NONE != ret) {
            LoggerE("pkgmgrinfo_appinfo_get_installed_list error");
            NativePlugin::ReportError(UnknownException("Unknown error"), response_obj);
        } else {
            NativePlugin::ReportSuccess(result, response_obj);
        }
    };

    auto get_apps_info_response = [callback_handle](const std::shared_ptr<json::Value>& response) -> void {
        wrt::common::NativeContext::GetInstance()->InvokeCallback(callback_handle, response->serialize());
    };

    // queue the task
    TaskQueue::GetInstance().Queue<json::Value>(get_apps_info,
                                                get_apps_info_response,
                                                std::shared_ptr<json::Value>(new json::Value(json::Object())));

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(out);
}

void ApplicationManager::GetAppInfo(const webapi::common::json::Object& args, webapi::common::json::Object& out) {
    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    const auto it_id = args.find("id");
    const auto it_args_end = args.end();

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    json::String app_id;

    if (it_id != it_args_end &&
        it_id->second.is<json::String>()) {
        app_id = it_id->second.get<json::String>();
    } else {
        app_id = CurrentApplication::GetInstance().GetApplicationId();
    }

    pkgmgrinfo_appinfo_h handle;

    if (PMINFO_R_OK != pkgmgrinfo_appinfo_get_appinfo(app_id.c_str(), &handle)) {
        LoggerE("Can not get appInfo for specified application");
        throw NotFoundException("Can not get appInfo for specified application");
    }

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    json::Value result = json::Value(json::Object());

    ApplicationUtils::CreateApplicationInformation(handle, &result.get<json::Object>());

    NativePlugin::ReportSuccess(result, out);

    // free allocated resources
    pkgmgrinfo_appinfo_destroy_appinfo(handle);
}

void ApplicationManager::GetAppCerts(const webapi::common::json::Object& args, webapi::common::json::Object& out) {
    NativePlugin::CheckAccess(kPrivilegeAppManagerCertificate);

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    const auto it_id = args.find("id");
    const auto it_args_end = args.end();

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    // acquire application ID
    json::String app_id;

    if (it_id != it_args_end &&
        it_id->second.is<json::String>()) {
        app_id = it_id->second.get<json::String>();
    } else {
        app_id = CurrentApplication::GetInstance().GetApplicationId();
    }

    // find package ID for application ID
    char* package_id = nullptr;

    int ret = package_manager_get_package_id_by_app_id(app_id.c_str(), &package_id);
    std::unique_ptr<char, void(*)(void*)> package_id_ptr(package_id, &std::free); // automatically release the memory

    if (PACKAGE_MANAGER_ERROR_NONE != ret) {
        LoggerE("Failed to get package from application ID.");
        throw NotFoundException("Failed to get package from application ID.");
    }

    // find package info for package ID
    package_info_h pkg_info = nullptr;

    ret = package_manager_get_package_info(package_id, &pkg_info);
    std::unique_ptr<std::remove_pointer<package_info_h>::type, int(*)(package_info_h)>
                pkg_info_ptr(pkg_info, &package_info_destroy); // automatically release the memory

    if (PACKAGE_MANAGER_ERROR_NONE != ret) {
        LoggerE("Failed to get package info for application ID.");
        throw UnknownException("Failed to get package info for application ID.");
    }

    // callback
    auto cert_info_cb = [](package_info_h /* handle */,
                           package_cert_type_e cert_type,
                           const char* cert_value,
                           void* user_data) -> bool {
        const char* cert_name = nullptr;

        switch(cert_type) {
        case PACKAGE_INFO_AUTHOR_ROOT_CERT:
            cert_name = "AUTHOR_ROOT";
            break;

        case PACKAGE_INFO_AUTHOR_INTERMEDIATE_CERT:
            cert_name = "AUTHOR_INTERMEDIATE";
            break;

        case PACKAGE_INFO_AUTHOR_SIGNER_CERT:
            cert_name = "AUTHOR_SIGNER";
            break;

        case PACKAGE_INFO_DISTRIBUTOR_ROOT_CERT:
            cert_name = "DISTRIBUTOR_ROOT";
            break;

        case PACKAGE_INFO_DISTRIBUTOR_INTERMEDIATE_CERT:
            cert_name = "DISTRIBUTOR_INTERMEDIATE";
            break;

        case PACKAGE_INFO_DISTRIBUTOR_SIGNER_CERT:
            cert_name = "DISTRIBUTOR_SIGNER";
            break;

        case PACKAGE_INFO_DISTRIBUTOR2_ROOT_CERT:
            cert_name = "DISTRIBUTOR2_ROOT";
            break;

        case PACKAGE_INFO_DISTRIBUTOR2_INTERMEDIATE_CERT:
            cert_name = "DISTRIBUTOR2_INTERMEDIATE";
            break;

        case PACKAGE_INFO_DISTRIBUTOR2_SIGNER_CERT:
            cert_name = "DISTRIBUTOR2_SIGNER";
            break;

        default:
            LoggerD("Unknown certificate type: " << cert_type);
            break;
        }

        json::Array* array = static_cast<json::Array*>(user_data);
        array->push_back(json::Value(json::Object()));

        ApplicationUtils::CreateApplicationCertificate(cert_name, cert_value, &array->back().get<json::Object>());

        return true;
    };

    json::Value result = json::Value(json::Array());

    // obtain certificate information
    ret = package_info_foreach_cert_info(pkg_info, cert_info_cb, &result.get<json::Array>());

    if ((PACKAGE_MANAGER_ERROR_NONE != ret) && (PACKAGE_MANAGER_ERROR_IO_ERROR != ret)) {
        LoggerE("Unknown exception occurred while getting certificates info.");
        throw UnknownException("Unknown exception occurred while getting certificates info.");
    }

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(result, out);
}

void ApplicationManager::GetAppSharedUri(const webapi::common::json::Object& args, webapi::common::json::Object& out) {
    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    const auto it_id = args.find("id");
    const auto it_args_end = args.end();

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    // acquire application ID
    json::String app_id;

    if (it_id != it_args_end &&
        it_id->second.is<json::String>()) {
        app_id = it_id->second.get<json::String>();
    } else {
        app_id = CurrentApplication::GetInstance().GetApplicationId();
    }

    // find package ID for application ID
    char* package_id = nullptr;

    int ret = package_manager_get_package_id_by_app_id(app_id.c_str(), &package_id);
    std::unique_ptr<char, void(*)(void*)> package_id_ptr(package_id, &std::free); // automatically release the memory

    if (PACKAGE_MANAGER_ERROR_NONE != ret) {
        LoggerE("Failed to get package from application ID.");
        throw NotFoundException("Failed to get package from application ID.");
    }

    // find package info for package ID
    pkgmgrinfo_pkginfo_h pkg_info = nullptr;

    ret = pkgmgrinfo_pkginfo_get_pkginfo(package_id, &pkg_info);
    std::unique_ptr<std::remove_pointer<pkgmgrinfo_pkginfo_h>::type, int(*)(pkgmgrinfo_pkginfo_h)>
                pkg_info_ptr(pkg_info, &pkgmgrinfo_pkginfo_destroy_pkginfo); // automatically release the memory

    if (PMINFO_R_OK != ret) {
        LoggerE("Failed to get package info from package ID.");
        throw UnknownException("Failed to get package info from package ID.");
    }

    char* root_path = nullptr;

    ret = pkgmgrinfo_pkginfo_get_root_path(pkg_info, &root_path);

    if ((PMINFO_R_OK != ret) || (nullptr == root_path)) {
        LoggerE("Failed to get root path of package.");
        throw UnknownException("Failed to get root path of package.");
    }

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    json::Value result = json::Value(kTizenApisFileScheme +
                                     root_path +
                                     kTizenApisAppSlash +
                                     kTizenApisAppShared +
                                     kTizenApisAppSlash);
    NativePlugin::ReportSuccess(result, out);
}

void ApplicationManager::GetAppMetaData(const webapi::common::json::Object& args, webapi::common::json::Object& out) {
    LoggerD("");

    NativePlugin::CheckAccess(kPrivilegeApplicationInfo);

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    const auto it_id = args.find("id");
    const auto it_args_end = args.end();

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    // acquire application ID
    std::string app_id;

    if (it_id != it_args_end &&
        it_id->second.is<json::String>()) {
        app_id = it_id->second.get<json::String>();
    } else {
        app_id = CurrentApplication::GetInstance().GetApplicationId();
    }

    pkgmgrinfo_appinfo_h handle = nullptr;

    int ret = pkgmgrinfo_appinfo_get_appinfo(app_id.c_str(), &handle);
    std::unique_ptr<std::remove_pointer<pkgmgrinfo_appinfo_h>::type, int(*)(pkgmgrinfo_appinfo_h)>
                    pkg_info_ptr(handle, &pkgmgrinfo_appinfo_destroy_appinfo); // automatically release the memory

    if (PMINFO_R_OK != ret) {
        LoggerE("Failed to get appInfo from application ID");
        throw NotFoundException("Failed to get appInfo from application ID");
    }

    auto meta_data_cb = [](const char* meta_key, const char* meta_value, void* user_data) -> int {
        if ((nullptr == meta_key)  || (nullptr == meta_value)) {
            LoggerE("meta_key or meta_value is null");
            return 0;
        }

        json::Array* array = static_cast<json::Array*>(user_data);
        array->push_back(json::Value(json::Object()));

        ApplicationUtils::CreateApplicationMetaData(meta_key, meta_value, &array->back().get<json::Object>());

        return 0;
    };

    json::Value result = json::Value(json::Array());

    ret = pkgmgrinfo_appinfo_foreach_metadata(handle, meta_data_cb, &result.get<json::Array>());

    if (PMINFO_R_OK != ret) {
        LoggerE("pkgmgrinfo_appinfo_metadata_filter_foreach() failed");
        throw UnknownException("Failed to get meta data from given package");
    }

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(result, out);
}

class ApplicationListChangedBroker {
public:
    enum class Event {
        kInstalled,
        kUpdated,
        kUninstalled,
    };
    static int ClientStatusListener(int /* id */,
                                    const char* /* type */,
                                    const char* package,
                                    const char* key,
                                    const char* val,
                                    const void* /* msg */,
                                    void* data) {
        LoggerD("");
        ApplicationListChangedBroker* that = static_cast<ApplicationListChangedBroker*>(data);

        if (0 == strcasecmp(key, kStartKey)) {
            that->HandleStart(val, package);
        } else if (0 == strcasecmp(key, kEndKey) && 0 == strcasecmp(val, kOkValue)) {
            that->HandleEnd(package);
        } else {
            LoggerD("Ignored key: " << key);
        }

        return 0;
    }

private:
    void HandleStart(const char* event_type, const char* package) {
        LoggerD("");
        app_list_.clear();
        set_event_type(event_type);

        if (Event::kUninstalled == event_type_) {
            // we need to get information about application ID before it is uninstalled
            GetApplicationIdsFromPackage(package);
        }
    }

    void HandleEnd(const char* package) {
        LoggerD("");

        if (Event::kUninstalled != event_type_) {
            GetApplicationIdsFromPackage(package);
        }

        for (auto app_id : app_list_) {
            json::Value value = json::Value(json::Object());
            json::Object& data_obj = value.get<json::Object>();

            switch (event_type_) {
                case Event::kInstalled:
                    data_obj.insert(std::make_pair(kAction, json::Value(kOnInstalled)));
                    break;

                case Event::kUpdated:
                    data_obj.insert(std::make_pair(kAction, json::Value(kOnUpdated)));
                    break;

                case Event::kUninstalled:
                    data_obj.insert(std::make_pair(kAction, json::Value(kOnUninstalled)));
                    break;
            }

            switch (event_type_) {
                case Event::kInstalled:
                case Event::kUpdated:
                    {
                        pkgmgrinfo_appinfo_h handle = nullptr;
                        if (pkgmgrinfo_appinfo_get_appinfo(app_id.c_str(), &handle) != PMINFO_R_OK) {
                            LoggerE("Failed to get application information handle");
                            continue;
                        }
                        auto info = data_obj.insert(std::make_pair(kData, json::Value(json::Object())));
                        ApplicationUtils::CreateApplicationInformation(handle,
                                                                       &info.first->second.get<json::Object>());
                        pkgmgrinfo_appinfo_destroy_appinfo(handle);
                    }
                    break;

                case Event::kUninstalled:
                    data_obj.insert(std::make_pair(kData, json::Value(app_id)));
                    break;
            }

            wrt::common::NativeContext::GetInstance()->FireEvent("ApplicationInformationEventCallback",
                                                                 value.serialize());
        }
    }

    void GetApplicationIdsFromPackage(const char* package) {
        LoggerD("");
        package_info_h package_info = nullptr;

        int ret = package_manager_get_package_info(package, &package_info);
        if (PACKAGE_MANAGER_ERROR_NONE != ret) {
            LoggerE("Failed to create package info");
            return;
        }

        ret = package_info_foreach_app_from_package(package_info,
                                                    PACKAGE_INFO_ALLAPP,
                                                    ApplicationIdCallback,
                                                    this);
        if (PACKAGE_MANAGER_ERROR_NONE != ret) {
            LoggerE("Failed to get application IDs");
        }

        ret = package_info_destroy(package_info);
        if (PACKAGE_MANAGER_ERROR_NONE != ret) {
            LoggerE("Failed to destroy package info");
        }
    }

    void set_event_type(const char* type) {
        LoggerD("");
        if (0 == strcasecmp(type, kInstallEvent)) {
            event_type_ = Event::kInstalled;
        } else if (0 == strcasecmp(type, kUpdateEvent)) {
            event_type_ = Event::kUpdated;
        } else if (0 == strcasecmp(type, kUninstallEvent)) {
            event_type_ = Event::kUninstalled;
        }
    }

    static bool ApplicationIdCallback(package_info_app_component_type_e /* comp_type */,
                                      const char* app_id,
                                      void* user_data) {
        LoggerD("");
        if (nullptr != app_id) {
            static_cast<ApplicationListChangedBroker*>(user_data)->app_list_.push_back(app_id);
        }
        return true;
    }

    constexpr static const char* kStartKey = "start";
    constexpr static const char* kEndKey = "end";
    constexpr static const char* kOkValue = "ok";
    constexpr static const char* kAction = "action";
    constexpr static const char* kOnInstalled = "oninstalled";
    constexpr static const char* kOnUpdated = "onupdated";
    constexpr static const char* kOnUninstalled = "onuninstalled";
    constexpr static const char* kData = "data";
    constexpr static const char* kInstallEvent = "install";
    constexpr static const char* kUpdateEvent = "update";
    constexpr static const char* kUninstallEvent = "uninstall";

    Event event_type_;
    std::vector<std::string> app_list_;
};

static ApplicationListChangedBroker g_application_list_changed_broker;

void ApplicationManager::StartAppInfoEventListener(const json::Object& /* args */,
                                                   json::Object& out) {
    LoggerD("");

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    // none

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    if (nullptr == pkgmgr_client_handle_) {
        pkgmgr_client_handle_ = pkgmgr_client_new(PC_LISTENING);

        if (nullptr == pkgmgr_client_handle_) {
            throw UnknownException("Error while registering listener to ApplicationManager");
        }

        pkgmgr_client_listen_status(pkgmgr_client_handle_,
                                    ApplicationListChangedBroker::ClientStatusListener,
                                    &g_application_list_changed_broker);
    } else {
        LoggerD("Broker callback is already registered.");
    }

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(out);
}

void ApplicationManager::StopAppInfoEventListener(const json::Object& /* args */,
                                                  json::Object& out) {
    LoggerD("");

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    // none

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    if (nullptr != pkgmgr_client_handle_) {
        pkgmgr_client_free(pkgmgr_client_handle_);
        pkgmgr_client_handle_ = nullptr;
    } else {
        LoggerD("Broker callback is already unregistered.");
    }

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(out);
}

void ApplicationManager::GetApplicationInformationSize(const json::Object& args, json::Object& out) {
    LoggerD("");
    NativePlugin::CheckAccess(kPrivilegeApplicationInfo);

    const auto it_package_id = args.find("packageId");
    const auto it_args_end = args.end();

    if (it_package_id == it_args_end ||
        !it_package_id->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    const json::String& package_id = it_package_id->second.get<json::String>();

    // get installed size from package server (to solve smack issue)
    pkgmgr_client* pc = pkgmgr_client_new(PC_REQUEST);
    int size = -1;

    if (nullptr == pc) {
        LoggerE("Failed to create pkgmgr client");
    } else {
        size = pkgmgr_client_request_service(PM_REQUEST_GET_SIZE, PM_GET_TOTAL_SIZE, pc, NULL, package_id.c_str(),
                                             NULL, NULL, NULL);

        if (size < 0) {
            LoggerE("Failed to get installed size");
        }

        pkgmgr_client_free(pc);
    }

    // result object
    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();
    result_obj.insert(std::make_pair("size", json::Value(static_cast<double>(size))));

    NativePlugin::ReportSuccess(result, out);
}

} // namespace application
} // namespace webapi
