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

#include <native-context.h>

#include "application.h"
#include "application-manager.h"
#include "native-plugin.h"

namespace webapi {
namespace application {

class ApplicationPlugin : public webapi::common::NativePlugin {
public:
    virtual void OnLoad();

private:
    Application current_application_;
    ApplicationManager manager_;
};

EXPORT_NATIVE_PLUGIN(webapi::application::ApplicationPlugin);

using namespace webapi::common;

void ApplicationPlugin::OnLoad() {
    using namespace std::placeholders;
    dispatcher_.AddFunction("ApplicationManager_getCurrentApplication",
                            std::bind(&ApplicationManager::GetCurrentApplication,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_kill",
                            std::bind(&ApplicationManager::Kill,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_launch",
                            std::bind(&ApplicationManager::Launch,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_launchAppControl",
                            std::bind(&ApplicationManager::LaunchAppControl,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_findAppControl",
                            std::bind(&ApplicationManager::FindAppControl,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_getAppsContext",
                            std::bind(&ApplicationManager::GetAppsContext,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_getAppContext",
                            std::bind(&ApplicationManager::GetAppContext,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_getAppsInfo",
                            std::bind(&ApplicationManager::GetAppsInfo,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_getAppInfo",
                            std::bind(&ApplicationManager::GetAppInfo,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_getAppCerts",
                            std::bind(&ApplicationManager::GetAppCerts,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_getAppSharedURI",
                            std::bind(&ApplicationManager::GetAppSharedUri,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_getAppMetaData",
                            std::bind(&ApplicationManager::GetAppMetaData,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_startAppInfoEventListener",
                            std::bind(&ApplicationManager::StartAppInfoEventListener,
                                      &manager_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("ApplicationManager_stopAppInfoEventListener",
                            std::bind(&ApplicationManager::StopAppInfoEventListener,
                                      &manager_,
                                      _1,
                                      _2));

    dispatcher_.AddFunction("Application_exit",
                            std::bind(&Application::Exit, &current_application_, _1, _2));
    dispatcher_.AddFunction("Application_hide",
                            std::bind(&Application::Hide,
                                      &current_application_,
                                      _1,
                                      _2));
    dispatcher_.AddFunction("Application_getRequestedAppControl",
                            std::bind(&Application::GetRequestedAppControl,
                                      &current_application_,
                                      _1,
                                      _2));

    dispatcher_.AddFunction("RequestedApplicationControl_replyResult",
                            std::bind(&RequestedApplicationControl::ReplyResult,
                                      &current_application_.app_control(),
                                      _1,
                                      _2));
    dispatcher_.AddFunction("RequestedApplicationControl_replyFailure",
                            std::bind(&RequestedApplicationControl::ReplyFailure,
                                      &current_application_.app_control(),
                                      _1,
                                      _2));

    dispatcher_.AddFunction("ApplicationInformation_getSize",
                            std::bind(&ApplicationManager::GetApplicationInformationSize,
                                      &manager_,
                                      _1,
                                      _2));
}

} // namespace application
} // namespace webapi
