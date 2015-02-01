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

#include <string.h>

#include <app_manager.h>

#include <package_manager.h>
#include <package-manager.h>
#include <package_info.h>

#include <pkgmgr-info.h>

#include <wrt-common/native-context.h>

#include "native-plugin.h"
#include "json-parser.h"
#include "logger.h"
#include "platform-exception.h"
#include "current-application.h"
#include "task-queue.h"

using namespace std;

struct user_data_pack {
    int callback_handle;
    package_manager_request_h request_h;
    string listener_handle;

    user_data_pack()
    {
        callback_handle = 0;
    }
    ~user_data_pack()
    {
        if( request_h != NULL )
            package_manager_request_destroy(request_h);
    }
};

namespace webapi {
namespace package {

namespace {
const std::string kPrivilegePackageManagerInstall = "http://tizen.org/privilege/packagemanager.install";
const std::string kPrivilegePackageInfo = "http://tizen.org/privilege/package.info";

const std::string kPackageInfoEventListenerCallback = "package-PackageInfoEvent";
} // namespace

using namespace webapi::common;

class PackagePlugin : public webapi::common::NativePlugin {
public:
    PackagePlugin();
    virtual ~PackagePlugin();
    virtual void OnLoad();

private:
    void Install(const json::Object& args, json::Object& out);
    void Uninstall(const json::Object& args, json::Object& out);
    void GetPackagesInfo(const json::Object& args, json::Object& out);
    void GetPackageInfo(const json::Object& args, json::Object& out);
    void SetPackageInfoEventListener(const json::Object& args, json::Object& out);
    void UnsetPackageInfoEventListener(const json::Object& args, json::Object& out);
    void GetSize(const json::Object& args, json::Object& out);

    pkgmgr_client* manager_handle_;
};

EXPORT_NATIVE_PLUGIN(webapi::package::PackagePlugin);

PackagePlugin::PackagePlugin() {
    manager_handle_ = nullptr;
}

PackagePlugin::~PackagePlugin() {
}

void PackagePlugin::OnLoad() {
    using namespace std::placeholders;
    dispatcher_.AddFunction("PackageManager_install",
                            std::bind(&PackagePlugin::Install, this, _1, _2));
    dispatcher_.AddFunction("PackageManager_uninstall",
                            std::bind(&PackagePlugin::Uninstall, this, _1, _2));
    dispatcher_.AddFunction("PackageManager_getPackagesInfo",
                            std::bind(&PackagePlugin::GetPackagesInfo, this, _1, _2));
    dispatcher_.AddFunction("PackageManager_getPackageInfo",
                            std::bind(&PackagePlugin::GetPackageInfo, this, _1, _2));
    dispatcher_.AddFunction("PackageManager_setPackageInfoEventListener",
                            std::bind(&PackagePlugin::SetPackageInfoEventListener, this, _1, _2));
    dispatcher_.AddFunction("PackageManager_unsetPackageInfoEventListener",
                            std::bind(&PackagePlugin::UnsetPackageInfoEventListener, this, _1, _2));
    dispatcher_.AddFunction("PackageManager_getSize",
                            std::bind(&PackagePlugin::GetSize, this, _1, _2));
}

static string ltrim(const string& s) {
    string str = s;
    string::iterator i;
    for (i = str.begin(); i != str.end(); i++) {
        if (!isspace(*i)) {
            break;
        }
    }
    if (i == str.end()) {
        str.clear();
    } else {
        str.erase(str.begin(), i);
    }
    return str;
}

static string ConvertUriToPath(const string& str) {
    string result;
    string schema ("file://");
    string _str = ltrim(str);

    string _schema = _str.substr(0,schema.size());
    if(_schema == schema) {
        result = _str.substr(schema.size());
    } else {
        result = _str;
    }
    return result;
}

void install_request_cb(int /*id*/, const char* /*type*/, const char *package,
                        package_manager_event_type_e /*event_type*/,
                        package_manager_event_state_e event_state,
                        int progress,
                        package_manager_error_e error_e,
                        void *user_data) {
    LoggerD("");
    user_data_pack* udp = static_cast<user_data_pack*>(user_data);

    switch (event_state) {
    case PACKAGE_MANAGER_EVENT_STATE_COMPLETED: {
        LoggerD("PACKAGE_MANAGER_EVENT_STATE_COMPLETED");

        json::Value result = json::Value(json::Object());
        json::Object& result_obj = result.get<json::Object>();

        result_obj.insert(std::make_pair("id", json::Value(package)));
        NativePlugin::ReportSuccess(result_obj);

        wrt::common::NativeContext::GetInstance()->InvokeCallback(udp->callback_handle, result.serialize());

        LoggerD("destroy client handle");
        // this api is not supported from platform. -> this goes to destructor
        //package_manager_request_destroy(callback->getHandle());
        //package_manager_client_destroy(udp->request_h);

        //clean-up user_data_pack object
        delete udp;

        break;
    }

    case PACKAGE_MANAGER_EVENT_STATE_STARTED:
    case PACKAGE_MANAGER_EVENT_STATE_PROCESSING: {
        LoggerD("PACKAGE_MANAGER_EVENT_STATE_PROCESSING");

        json::Value result = json::Value(json::Object());
        json::Object& result_obj = result.get<json::Object>();

        result_obj.insert(std::make_pair("id", json::Value(package)));
        result_obj.insert(std::make_pair("progress", json::Value(static_cast<double>(progress))));

        wrt::common::NativeContext::GetInstance()->FireEvent(udp->listener_handle.c_str(), result.serialize());
        break;
    }

    case PACKAGE_MANAGER_EVENT_STATE_FAILED:
    default: {
        LoggerD("PACKAGE_MANAGER_EVENT_STATE_FAILED");

        json::Value result = json::Value(json::Object());
        json::Object& result_obj = result.get<json::Object>();

        if (error_e == PACKAGE_MANAGER_ERROR_NO_SUCH_PACKAGE) {
            // Not Found Error
            NativePlugin::ReportError(NotFoundException("given package is not found"), result_obj);
        } else {
            // Unknown Error
            NativePlugin::ReportError(NotFoundException("platform exception"), result_obj);
        }

        wrt::common::NativeContext::GetInstance()->InvokeCallback(udp->callback_handle, result.serialize());

        LoggerD("destroy client handle");
        // this api is not supported from platform. -> this goes to destructor
        //package_manager_request_destroy(callback->getHandle());
        //package_manager_client_destroy(udp->request_h);

        //clean-up user_data_pack object
        delete udp;
        break;
    }
    }
}

void PackagePlugin::Install(const json::Object& args, json::Object& out) {
    LoggerD("");

    NativePlugin::CheckAccess(kPrivilegePackageManagerInstall);

    const auto arg_path = args.find("path");
    const auto arg_end = args.end();
    if (arg_path == arg_end ||
        !arg_path->second.is<json::String>()) {
        throw InvalidValuesException("No path argument");
    }

    package_manager_request_h request_h;
    int ret = package_manager_request_create(&request_h);
    if (ret != PACKAGE_MANAGER_ERROR_NONE) {
        throw UnknownException("Platform Error");
    }

    int id = 0;
    ret = package_manager_request_install(request_h,
                                          ConvertUriToPath(arg_path->second.get<json::String>()).c_str(),
                                          &id);

    if (ret != PACKAGE_MANAGER_ERROR_NONE) {
        package_manager_request_destroy(request_h);
        throw NotFoundException("Not proper file");
    }

    const auto arg_listener = args.find("listener");
    string listener_handle;

    if (arg_listener != arg_end &&
        arg_listener->second.is<json::String>()) {
        listener_handle = arg_listener->second.get<json::String>();
        LoggerD("listener: " << listener_handle);
    }

    user_data_pack* user_data = new user_data_pack();
    user_data->callback_handle = GetAsyncCallbackHandle(args);
    user_data->request_h = request_h;
    user_data->listener_handle = listener_handle;

    ret = package_manager_request_set_event_cb(request_h, install_request_cb, user_data);

    if (ret != PACKAGE_MANAGER_ERROR_NONE) {
        delete user_data;
        throw UnknownException("Platform Error");
    }

    ReportSuccess(out);
    LoggerD("OK");
}

void PackagePlugin::Uninstall(const json::Object& args, json::Object& out) {
    LoggerD("");

    NativePlugin::CheckAccess(kPrivilegePackageManagerInstall);

    const auto arg_id = args.find("id");
    const auto arg_end = args.end();
    if (arg_id == arg_end ||
        !arg_id->second.is<json::String>()) {
        throw InvalidValuesException("No id argument");
    }

    package_manager_request_h request_h;
    int ret = package_manager_request_create(&request_h);
    if (ret != PACKAGE_MANAGER_ERROR_NONE) {
        throw UnknownException("Platform Error");
    }

    int id = 0;
    ret = package_manager_request_uninstall(request_h,
                                            arg_id->second.get<json::String>().c_str(),
                                            &id);

    if (ret != PACKAGE_MANAGER_ERROR_NONE) {
        package_manager_request_destroy(request_h);
        throw NotFoundException("Not proper file");
    }

    const auto arg_listener = args.find("listener");
    string listener_handle;

    if (arg_listener != arg_end) {
        listener_handle = arg_listener->second.get<json::String>();
    }

    user_data_pack* user_data = new user_data_pack();
    user_data->callback_handle = GetAsyncCallbackHandle(args);
    user_data->request_h = request_h;
    user_data->listener_handle = listener_handle;

    ret = package_manager_request_set_event_cb(request_h, install_request_cb, user_data);

    if (ret != PACKAGE_MANAGER_ERROR_NONE) {
        delete user_data;
        throw UnknownException("Platform Error");
    }

    ReportSuccess(out);
}

static bool CreatePackageInfo(pkgmgrinfo_pkginfo_h handle, json::Object* pkg_info) {
    LoggerD("");

    char* id = nullptr;
    char* tmp_str = nullptr;
    int lastModified = 0;
    int ret = 0;

    //ID
    ret = pkgmgrinfo_pkginfo_get_pkgid(handle, &id);
    if ((ret != PMINFO_R_OK) || (id == nullptr)) {
        LoggerE("Fail to get id.");
        return false;
    } else {
        pkg_info->insert(std::make_pair("id", json::Value(id)));
    }

    //Name
    ret = pkgmgrinfo_pkginfo_get_label(handle, &tmp_str);
    if ((ret != PMINFO_R_OK) || (tmp_str == nullptr)) {
        LoggerE("Fail to get label");
    } else {
        pkg_info->insert(std::make_pair("name", json::Value(tmp_str)));
    }
    tmp_str = nullptr;

    //IconPath
    ret = pkgmgrinfo_pkginfo_get_icon(handle, &tmp_str);
    if ((ret != PMINFO_R_OK) || (tmp_str == nullptr)) {
        LoggerE("Fail to get iconPath");
    } else {
        pkg_info->insert(std::make_pair("iconPath", json::Value(tmp_str)));
    }
    tmp_str = nullptr;

    //Version
    ret = pkgmgrinfo_pkginfo_get_version(handle, &tmp_str);
    if ((ret != PMINFO_R_OK) || (tmp_str == nullptr)) {
        LoggerE("Fail to get version");
    } else {
        pkg_info->insert(std::make_pair("version", json::Value(tmp_str)));
    }
    tmp_str = nullptr;

    //LastModified
    ret = pkgmgrinfo_pkginfo_get_installed_time(handle, &lastModified);
    if (ret != PMINFO_R_OK) {
        LoggerE("Fail to get lastModified");
    } else {
        pkg_info->insert(std::make_pair("lastModified", json::Value(1000.0 * lastModified)));
    }

    //Author
    ret = pkgmgrinfo_pkginfo_get_author_name(handle, &tmp_str);
    if ((ret != PMINFO_R_OK) || (tmp_str == nullptr)) {
        LoggerE("Fail to get author");
    } else {
        pkg_info->insert(std::make_pair("author", json::Value(tmp_str)));
    }
    tmp_str = nullptr;

    //Description
    ret = pkgmgrinfo_pkginfo_get_description(handle, &tmp_str);
    if ((ret != PMINFO_R_OK) || (tmp_str == nullptr)) {
        LoggerE("Fail to get description");
    } else {
        pkg_info->insert(std::make_pair("description", json::Value(tmp_str)));
    }
    tmp_str = nullptr;

    package_info_h package_info;

    ret = package_manager_get_package_info(id, &package_info);
    if (ret != PACKAGE_MANAGER_ERROR_NONE) {
        LoggerE("Cannot create package info");
        return false;
    }

    json::Array& array = pkg_info->insert(std::make_pair("appIds", json::Value(json::Array())))
                         .first->second.get<json::Array>();

    //AppIds
    ret = package_info_foreach_app_from_package(package_info, PACKAGE_INFO_ALLAPP,
            [](package_info_app_component_type_e /*comp_type*/, const char *app_id, void *user_data) -> bool {
                json::Array* appId_array = static_cast<json::Array*>(user_data);
                appId_array->push_back(json::Value(app_id));
                return true;
            },
            &array);

    if (ret != PACKAGE_MANAGER_ERROR_NONE) {
        LoggerE("failed while getting appids");
    }

    ret = package_info_destroy(package_info);
    if (ret != PACKAGE_MANAGER_ERROR_NONE) {
        LoggerE("Cannot destroy package info");
    }

    // REMARK: data size and total size is set at first access time
    // REMARK: do not destroy handle. because handle is comes from outside!!
    return true;
}

static int CreatePackagesInfo(pkgmgrinfo_pkginfo_h handle, void* user_data) {
    LoggerD("");

    json::Array* array = static_cast<json::Array*>(user_data);
    array->push_back(json::Value(json::Object()));

    CreatePackageInfo(handle, &array->back().get<json::Object>());
    return 0;
}

void PackagePlugin::GetPackagesInfo(const json::Object& args, json::Object& out) {
    LoggerD("");

    NativePlugin::CheckAccess(kPrivilegePackageInfo);

    int callback_handle = NativePlugin::GetAsyncCallbackHandle(args);

    auto get_packages_info = [&](const std::shared_ptr<json::Value>& response) -> void {
        LoggerD("get_packages_info");

        json::Object& response_obj = response->get<json::Object>();
        json::Value result = json::Value(json::Object());
        json::Object& result_obj = result.get<json::Object>();
        json::Array& array = result_obj.insert(std::make_pair("pkgInfos", json::Value(json::Array())))
                             .first->second.get<json::Array>();

        int ret = pkgmgrinfo_pkginfo_get_list(CreatePackagesInfo, &array);

        if (PMINFO_R_OK != ret){
            LoggerE("Failed to get package info");
            NativePlugin::ReportError(UnknownException("Platform Error"), response_obj);
        } else {
            LoggerD("ReportSuccess");
            NativePlugin::ReportSuccess(result, response_obj);
        }
    };

    auto get_packages_info_response = [callback_handle](const std::shared_ptr<json::Value>& response) -> void {
        wrt::common::NativeContext::GetInstance()->InvokeCallback(callback_handle, response->serialize());
    };

    TaskQueue::GetInstance().Queue<json::Value>(get_packages_info,
                                                get_packages_info_response,
                                                std::shared_ptr<json::Value>(new json::Value(json::Object())));

    ReportSuccess(out);
}

void PackagePlugin::GetPackageInfo(const json::Object& args, json::Object& out) {
    LoggerD("");

    NativePlugin::CheckAccess(kPrivilegePackageInfo);

    string pkgid;
    const auto arg_id = args.find("id");

    if (arg_id == args.end() ||
        !arg_id->second.is<json::String>()) {
        LoggerD("ID was not provided");
        pkgid = CurrentApplication::GetInstance().GetPackageId();
    } else {
        pkgid = arg_id->second.get<json::String>();
    }

    pkgmgrinfo_pkginfo_h handle;
    int ret = pkgmgrinfo_pkginfo_get_pkginfo(pkgid.c_str(), &handle);

    if (ret != PMINFO_R_OK) {
        throw NotFoundException("Can't find given package");
    }

    json::Value pkg_info = json::Value(json::Object());
    json::Object& pkg_info_obj = pkg_info.get<json::Object>();

    bool ret_info = CreatePackageInfo(handle, &pkg_info_obj);

    pkgmgrinfo_pkginfo_destroy_pkginfo(handle);

    if (ret_info != true) {
        throw UnknownException("Can't get pkg info from given package");
    }

    ReportSuccess(pkg_info, out);
}

void PackagePlugin::SetPackageInfoEventListener(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");

    NativePlugin::CheckAccess(kPrivilegePackageInfo);

    if (nullptr == manager_handle_) {
        manager_handle_ = pkgmgr_client_new(PC_LISTENING);
        if (nullptr == manager_handle_) {
            throw UnknownException("Fail to create package manager handle");
        }
    }

    pkgmgr_client_listen_status(manager_handle_,
        [](int /*id*/, const char* /*type*/, const char* package, const char* key, const char* val, const void* /*msg*/, void* /*data*/) -> int {
            static app_info_event_e event_type;

            if (!strcasecmp(key, "start"))
            {
                LoggerD("start ");
                if (!strcasecmp(val, "install"))
                {
                    event_type = APP_INFO_EVENT_INSTALLED;
                }
                else if (!strcasecmp(val, "uninstall"))
                {
                    event_type = APP_INFO_EVENT_UNINSTALLED;
                }
                else if (!strcasecmp(val, "update"))
                {
                    event_type = APP_INFO_EVENT_UPDATED;
                }
            } else if (!strcasecmp(key, "end") && !strcasecmp(val, "ok")) {
                LoggerD("end ");
                if (event_type >= 0) {
                    //package_event_cb(event_type, package, data);
                    switch(event_type) {
                    case APP_INFO_EVENT_INSTALLED:
                    case APP_INFO_EVENT_UPDATED: {
                        pkgmgrinfo_pkginfo_h handle;

                        int ret = pkgmgrinfo_pkginfo_get_pkginfo(package, &handle);
                        if (ret != PMINFO_R_OK) {
                            LoggerE("fail to find pkg info with given pkg");
                            // Do not throw exception. No one can handle exception because this
                            // code is called from async callback.
                            break;
                        }

                        json::Value pkg_info = json::Value(json::Object());
                        json::Object& pkg_info_obj = pkg_info.get<json::Object>();

                        bool ret_info = CreatePackageInfo(handle, &pkg_info_obj);

                        pkgmgrinfo_pkginfo_destroy_pkginfo(handle);

                        if (ret_info != true) {
                            LoggerE("Fail to get pkg info. skip callback call");
                        } else {
                            std::shared_ptr<json::Value> result = std::shared_ptr<json::Value>(new json::Value(json::Object()));
                            json::Object& data_obj = result->get<json::Object>();

                            if (event_type == APP_INFO_EVENT_INSTALLED) {
                                data_obj.insert(std::make_pair("type", json::Value("install")));
                            } else {
                                data_obj.insert(std::make_pair("type", json::Value("update")));
                            }

                            data_obj.insert(std::make_pair("pkgInfo", pkg_info));

                            TaskQueue::GetInstance().Async<json::Value>([](const std::shared_ptr<json::Value>& result) {
                                wrt::common::NativeContext::GetInstance()->FireEvent(kPackageInfoEventListenerCallback,
                                                                                     result->serialize());
                            }, result);
                        }
                        break;
                    }
                    case APP_INFO_EVENT_UNINSTALLED: {
                        std::shared_ptr<json::Value> result = std::shared_ptr<json::Value>(new json::Value(json::Object()));
                        json::Object& data_obj = result->get<json::Object>();

                        data_obj.insert(std::make_pair("type", json::Value("uninstall")));
                        data_obj.insert(std::make_pair("id", json::Value(package)));

                        TaskQueue::GetInstance().Async<json::Value>([](const std::shared_ptr<json::Value>& result) {
                            wrt::common::NativeContext::GetInstance()->FireEvent(kPackageInfoEventListenerCallback,
                                                                                 result->serialize());
                        }, result);
                        break;
                    }
                    default:
                        LoggerE("Fail!! Unknown event type is entered : " << event_type);
                        break;
                    }
                }
            }
            return 0;
        },
        (void*)nullptr);

    ReportSuccess(out);
}

void PackagePlugin::UnsetPackageInfoEventListener(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");

    NativePlugin::CheckAccess(kPrivilegePackageInfo);

    if (nullptr != manager_handle_) {
        pkgmgr_client_free(manager_handle_);
        manager_handle_ = nullptr;
    } else {
        LoggerE("no package manager handle registered");
    }

    ReportSuccess(out);
}

void PackagePlugin::GetSize(const json::Object& args, json::Object& out) {
    LoggerD("");

    string pkgid;
    const auto arg_id = args.find("id");

    if (arg_id == args.end() ||
        !arg_id->second.is<json::String>()) {
        LoggerD("ID was not provided");
        pkgid = CurrentApplication::GetInstance().GetPackageId();
    } else {
        pkgid = arg_id->second.get<json::String>();
    }

    pkgmgr_client* pc = pkgmgr_client_new(PC_REQUEST);

    if (nullptr == pc) {
        LoggerE("Failed to create pkgmgr client");
        ReportSuccess(out);
    } else {
        json::Value result = json::Value(json::Object());
        json::Object& result_obj = result.get<json::Object>();
        //TotalSize
        LoggerD("TotalSize");
        int ret = pkgmgr_client_request_service(PM_REQUEST_GET_SIZE,
                                                PM_GET_TOTAL_SIZE,
                                                pc,
                                                NULL,
                                                pkgid.c_str(),
                                                NULL,
                                                NULL,
                                                NULL);
        if (ret < 0) {
            LoggerE("Fail to get total size");
        } else {
            result_obj.insert(std::make_pair("totalSize", json::Value(static_cast<double>(ret))));
        }

        //DataSize
        LoggerD("DataSize");
        ret = pkgmgr_client_request_service(PM_REQUEST_GET_SIZE,
                                            PM_GET_DATA_SIZE,
                                            pc,
                                            NULL,
                                            pkgid.c_str(),
                                            NULL,
                                            NULL,
                                            NULL);
        if (ret < 0) {
            LoggerE("Fail to get data size");
        } else {
            result_obj.insert(std::make_pair("dataSize", json::Value(static_cast<double>(ret))));
        }

        pkgmgr_client_free(pc);
        pc = nullptr;

        ReportSuccess(result, out);
    }
}

} // namespace package
} // namespace webapi
