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

#include "application-utils.h"

#include <memory>

#include <app_manager.h>

#include "logger.h"
#include "platform-exception.h"

namespace webapi {
namespace application {

using namespace webapi::common;

void ApplicationUtils::CreateApplicationInformation(const pkgmgrinfo_appinfo_h handle, json::Object* app_info) {
    char* tmp_str = nullptr;
    int ret = 0;

    // application ID
    ret = pkgmgrinfo_appinfo_get_appid(handle, &tmp_str);
    if ((PMINFO_R_OK != ret) || (nullptr == tmp_str)) {
        LoggerE("Failed to get appid");
    } else {
        app_info->insert(std::make_pair("id", json::Value(tmp_str)));
    }
    tmp_str = nullptr;

    // name
    ret = pkgmgrinfo_appinfo_get_label(handle, &tmp_str);
    if ((PMINFO_R_OK != ret) || (nullptr == tmp_str)) {
        LoggerE("Failed to get label");
    } else {
        app_info->insert(std::make_pair("name", json::Value(tmp_str)));
    }
    tmp_str = nullptr;

    // icon path
    ret = pkgmgrinfo_appinfo_get_icon(handle, &tmp_str);
    if ((PMINFO_R_OK != ret) || (nullptr == tmp_str)) {
        LoggerE("Failed to get icon path");
    } else {
        app_info->insert(std::make_pair("iconPath", json::Value(tmp_str)));
    }
    tmp_str = nullptr;

    // show
    bool no_display = false;
    ret = pkgmgrinfo_appinfo_is_nodisplay(handle, &no_display);
    if (PMINFO_R_OK != ret) {
        LoggerE("Failed to get nodisplay");
    } else {
        app_info->insert(std::make_pair("show", json::Value(!no_display)));
    }

    // categories
    json::Value categories = json::Value(json::Array());
    json::Array& categories_array = categories.get<json::Array>();
    app_info->insert(std::make_pair("categories", categories));

    ret = pkgmgrinfo_appinfo_foreach_category(
            handle,
            [](const char* category, void* user_data) -> int {
                json::Array* categories_array = static_cast<json::Array*>(user_data);

                if ((nullptr != category) && (nullptr != categories_array)) {
                    categories_array->push_back(json::Value(category));
                }

                return 0;
            },
            &categories_array);

    if (PMINFO_R_OK != ret) {
        LoggerE("Failed to get categories");
    }

    // package ID
    ret = pkgmgrinfo_appinfo_get_pkgid(handle, &tmp_str);
    if ((PMINFO_R_OK != ret) || (nullptr == tmp_str)) {
        LoggerE("Failed to get pkgid");
    } else {
        app_info->insert(std::make_pair("packageId", json::Value(tmp_str)));
    }

    pkgmgrinfo_pkginfo_h pkginfo;
    ret = pkgmgrinfo_pkginfo_get_pkginfo(tmp_str, &pkginfo);
    if (PMINFO_R_OK != ret) {
        LoggerE("Failed to get package info");
    } else {
        // version
        tmp_str = nullptr;
        ret = pkgmgrinfo_pkginfo_get_version(pkginfo, &tmp_str);
        if ((PMINFO_R_OK != ret) || (nullptr == tmp_str)) {
            LoggerE("Failed to get version");
        } else {
            app_info->insert(std::make_pair("version", json::Value(tmp_str)));
        }
        tmp_str = nullptr;

        // installation date
        int installed_time = 0;
        ret = pkgmgrinfo_pkginfo_get_installed_time(pkginfo, &installed_time);
        if (ret != PMINFO_R_OK) {
            LoggerE("Fail to get installed date");
        } else {
            app_info->insert(std::make_pair("installDate", json::Value(1000.0 * installed_time)));
        }

        pkgmgrinfo_pkginfo_destroy_pkginfo(pkginfo);
    }

    // size is set at first attribute access (performance)
}

bool ApplicationUtils::CreateApplicationContext(const app_context_h handle, webapi::common::json::Object* app_context) {
    char* app_id = nullptr;

    int ret = app_context_get_app_id(handle, &app_id);
    std::unique_ptr<char, void(*)(void*)> app_id_ptr(app_id, &std::free); // automatically release the memory

    if ((APP_MANAGER_ERROR_NONE != ret) || (nullptr == app_id)) {
        LoggerD("Failed to get application ID from context.");
        return false;
    }

    pid_t pid;
    ret = app_context_get_pid(handle, &pid);

    if(ret != APP_MANAGER_ERROR_NONE) {
        LoggerD("Failed to get pid from context.");
        return false;
    }

    CreateApplicationContext(pid, app_id, app_context);

    return true;
}

void ApplicationUtils::CreateApplicationContext(pid_t pid, const std::string& app_id, webapi::common::json::Object* app_context) {
    app_context->insert(std::make_pair("id", json::Value(std::to_string(pid))));
    app_context->insert(std::make_pair("appId", json::Value(app_id)));
}

void ApplicationUtils::CreateApplicationCertificate(const char* cert_type,
                                                    const char* cert_value,
                                                    webapi::common::json::Object* app_certificate) {
    app_certificate->insert(std::make_pair("type", json::Value(cert_type)));
    app_certificate->insert(std::make_pair("value", json::Value(cert_value)));
}

void ApplicationUtils::CreateApplicationMetaData(const char* key,
                                                 const char* value,
                                                 webapi::common::json::Object* app_meta_data) {
    app_meta_data->insert(std::make_pair("key", json::Value(key)));
    app_meta_data->insert(std::make_pair("value", json::Value(value)));
}

app_control_h ApplicationUtils::ApplicationControlToService(const webapi::common::json::Object& app_control_obj) {
    const auto it_operation = app_control_obj.find("operation");
    const auto it_uri = app_control_obj.find("uri");
    const auto it_mime = app_control_obj.find("mime");
    const auto it_category = app_control_obj.find("category");
    const auto it_data = app_control_obj.find("data");
    const auto it_app_control_end = app_control_obj.end();

    if (it_operation == it_app_control_end ||
        it_uri == it_app_control_end ||
        it_mime == it_app_control_end ||
        it_category == it_app_control_end ||
        it_data == it_app_control_end ||
        !it_operation->second.is<json::String>() ||
        !it_data->second.is<json::Array>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    app_control_h app_control;
    app_control_create(&app_control);

    // operation
    app_control_set_operation(app_control, it_operation->second.get<json::String>().c_str());

    // uri
    if (it_uri->second.is<json::String>()) {
        app_control_set_uri(app_control, it_uri->second.get<json::String>().c_str());
    }

    // mime
    if (it_mime->second.is<json::String>()) {
        app_control_set_mime(app_control, it_mime->second.get<json::String>().c_str());
    }

    // category
    if (it_category->second.is<json::String>()) {
        app_control_set_category(app_control, it_category->second.get<json::String>().c_str());
    }

    // ApplicationControlData
    const json::Array& data = it_data->second.get<json::Array>();

    for (auto iter = data.begin(); iter != data.end(); ++iter) {
        if (iter->is<json::Object>()) {
            ApplicationControlDataToServiceExtraData(iter->get<json::Object>(), app_control);
        }
    }

    return app_control;
}

void ApplicationUtils::ApplicationControlDataToServiceExtraData(const json::Object& app_control_data,
                                                                app_control_h app_control) {
    const auto it_key = app_control_data.find("key");
    const auto it_value = app_control_data.find("value");
    const auto it_app_control_data_end = app_control_data.end();

    if (it_key == it_app_control_data_end ||
        it_value == it_app_control_data_end ||
        !it_key->second.is<json::String>() ||
        !it_value->second.is<json::Array>()) {
        LoggerE("Problem with key or value.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    const json::String& key = it_key->second.get<json::String>();
    const json::Array& value = it_value->second.get<json::Array>();

    const size_t size = value.size();
    const char** arr = new const char*[size];
    size_t i = 0;

    for (auto iter = value.begin(); iter != value.end(); ++iter, ++i) {
        if (iter->is<json::String>()) {
            arr[i] = iter->get<json::String>().c_str();
        }
    }

    if (1 == size) {
        app_control_add_extra_data(app_control, key.c_str(), arr[0]);
    } else {
        app_control_add_extra_data_array(app_control, key.c_str(), arr, size);
    }

    delete[] arr;
}

void ApplicationUtils::ServiceToApplicationControl(app_control_h app_control, webapi::common::json::Object* app_control_obj) {
    int ret = 0;
    char* tmp_str = nullptr;
    auto clear = [](char*& str) {
        free(str);
        str = nullptr;
    };

    ret = app_control_get_operation(app_control, &tmp_str);
    if ((APP_CONTROL_ERROR_NONE == ret) && (nullptr != tmp_str)) {
        LoggerD("operation: " << tmp_str);
        app_control_obj->insert(std::make_pair("operation", json::String(tmp_str)));
    }
    clear(tmp_str);

    ret = app_control_get_uri(app_control, &tmp_str);
    if ((APP_CONTROL_ERROR_NONE == ret) && (nullptr != tmp_str)) {
        LoggerD("URI: " << tmp_str);
        app_control_obj->insert(std::make_pair("uri", json::String(tmp_str)));
    }
    clear(tmp_str);

    ret = app_control_get_mime(app_control, &tmp_str);
    if ((APP_CONTROL_ERROR_NONE == ret) && (nullptr != tmp_str)) {
        LoggerD("MIME: " << tmp_str);
        app_control_obj->insert(std::make_pair("mime", json::String(tmp_str)));
    }
    clear(tmp_str);

    ret = app_control_get_category(app_control, &tmp_str);
    if ((APP_CONTROL_ERROR_NONE == ret) && (nullptr != tmp_str)) {
        LoggerD("category: " << tmp_str);
        app_control_obj->insert(std::make_pair("category", json::String(tmp_str)));
    }
    clear(tmp_str);

    app_control_obj->insert(std::make_pair("data", json::Value(json::Array())));
    ServiceToApplicationControlDataArray(app_control, &app_control_obj->find("data")->second.get<json::Array>());
}

void ApplicationUtils::ServiceExtraDataToApplicationControlData(app_control_h app_control,
                                                                const std::string& key,
                                                                json::Object* app_control_data) {
    int ret = 0;
    bool is_array = false;

    ret = app_control_is_extra_data_array(app_control, key.c_str(), &is_array);

    if (APP_CONTROL_ERROR_NONE != ret) {
        LoggerE("Failed to check whether extra data is array or not");
        return;
    }

    app_control_data->insert(std::make_pair("key", key));
    json::Array value_array;

    if (is_array) {
        int length = 0;
        char** value = nullptr;

        ret = app_control_get_extra_data_array(app_control, key.c_str(), &value, &length);

        if ((APP_CONTROL_ERROR_NONE == ret) && (nullptr != value)) {
            for (int i = 0; i < length; ++i) {
                if (value[i]) {
                    value_array.push_back(json::Value(value[i]));
                    free(value[i]);
                }
            }
            free(value);
        } else {
            LoggerE("Failed to get extra data array, errno: " << ret);
        }
    } else {
        char* value = nullptr;

        ret = app_control_get_extra_data(app_control, key.c_str(), &value);

        if ((APP_CONTROL_ERROR_NONE == ret) && (nullptr != value)) {
            value_array.push_back(json::Value(value));
            free(value);
        } else {
            LoggerE("Failed to get extra data, errno: " << ret);
        }
    }

    app_control_data->insert(std::make_pair("value", value_array));
}

bool ApplicationUtils::ServiceToApplicationControlDataArray(app_control_h app_control, json::Array* data) {
    return (APP_CONTROL_ERROR_NONE == app_control_foreach_extra_data(app_control, ServiceExtraDataCallback, data));
}

bool ApplicationUtils::ServiceExtraDataCallback(app_control_h app_control, const char* key, void* user_data) {
    json::Array* data = static_cast<json::Array*>(user_data);

    data->push_back(json::Value(json::Object()));
    ServiceExtraDataToApplicationControlData(app_control, key, &data->back().get<json::Object>());

    return true;
}

} // namespace application
} // namespace webapi
