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

#ifndef WEBAPI_PLUGINS_APPLICATION_APPLICATION_UTILS_H__
#define WEBAPI_PLUGINS_APPLICATION_APPLICATION_UTILS_H__

#include <pkgmgr-info.h>
#include <app_context.h>
#include <app_control.h>

#include "json-parser.h"

namespace webapi {
namespace application {

class ApplicationUtils {
public:
    static void CreateApplicationInformation(const pkgmgrinfo_appinfo_h handle, webapi::common::json::Object* app_info);

    static bool CreateApplicationContext(const app_context_h handle, webapi::common::json::Object* app_context);

    static void CreateApplicationContext(pid_t pid, const std::string& app_id, webapi::common::json::Object* app_context);

    static void CreateApplicationCertificate(const char* cert_type,
                                             const char* cert_value,
                                             webapi::common::json::Object* app_certificate);

    static void CreateApplicationMetaData(const char* key,
                                          const char* value,
                                          webapi::common::json::Object* app_meta_data);

    static app_control_h ApplicationControlToService(const webapi::common::json::Object& app_control_obj);

    static void ApplicationControlDataToServiceExtraData(const webapi::common::json::Object& app_control_data,
                                                         app_control_h app_control);

    static void ServiceToApplicationControl(app_control_h app_control, webapi::common::json::Object* app_control_obj);

    static void ServiceExtraDataToApplicationControlData(app_control_h app_control,
                                                         const std::string& key,
                                                         webapi::common::json::Object* app_control_data);

    static bool ServiceToApplicationControlDataArray(app_control_h app_control, webapi::common::json::Array* data);

private:
    static bool ServiceExtraDataCallback(app_control_h app_control, const char* key, void* user_data);
};

} // namespace application
} // namespace webapi

#endif // WEBAPI_PLUGINS_APPLICATION_APPLICATION_UTILS_H__
