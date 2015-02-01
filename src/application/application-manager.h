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

#ifndef WEBAPI_PLUGINS_APPLICATION_APPLICATION_MANAGER_H__
#define WEBAPI_PLUGINS_APPLICATION_APPLICATION_MANAGER_H__

#include <package-manager.h>

#include "json-parser.h"

namespace webapi {
namespace application {

class ApplicationManager {
public:
    ApplicationManager() : pkgmgr_client_handle_(nullptr) {}

    /**
     * Signature: @code Application getCurrentApplication(); @endcode
     * JSON: @code data: {method: 'ApplicationManager_getCurrentApplication', args: {}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success', result: {appInfo, contextId}}
     * @endcode
     */
    void GetCurrentApplication(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code void kill(contextId, successCallback, errorCallback); @endcode
     * JSON: @code data: {method: 'ApplicationManager_kill', args: {contextId: contextId}} @endcode
     * Invocation: @code native.call(request, result_callback); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     * Result callback:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     */
    void Kill(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code void launch(id, successCallback, errorCallback); @endcode
     * JSON: @code data: {method: 'ApplicationManager_launch', args: {id: id}} @endcode
     * Invocation: @code native.call(request, result_callback); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     * Result callback:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     */
    void Launch(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code void launchAppControl(appControl, id, successCallback, errorCallback, replyCallback); @endcode
     * JSON: @code data: {method: 'ApplicationManager_launchAppControl',
     *             args: {appControl: appControl, id: id, replyCallback: 'replyCallback'}} @endcode
     * Invocation: @code native.call(request, result_callback); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     * Result callback:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     * Reply  callback:
     * @code
     * {status: 'error'}
     * {status: 'success', result: {data}}
     * @endcode
     */
    void LaunchAppControl(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code void findAppControl(appControl, successCallback, errorCallback); @endcode
     * JSON: @code data: {method: 'ApplicationManager_findAppControl',
     *             args: {appControl: appControl}} @endcode
     * Invocation: @code native.call(request, result_callback); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     * Result callback:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success', result: {informationArray, appControl}}
     * @endcode
     */
    void FindAppControl(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code void getAppsContext(successCallback, errorCallback); @endcode
     * JSON: @code data: {method: 'ApplicationManager_getAppsContext',
     *             args: {}} @endcode
     * Invocation: @code native.call(request, result_callback); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     * Result callback:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success', result: {contexts}}
     * @endcode
     */
    void GetAppsContext(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code ApplicationContext getAppContext(contextId); @endcode
     * JSON: @code data: {method: 'ApplicationManager_getAppContext',
     *             args: {contextId: contextId}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success', result: {id, appId}}
     * @endcode
     */
    void GetAppContext(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code void getAppsInfo(successCallback, errorCallback); @endcode
     * JSON: @code data: {method: 'ApplicationManager_getAppsInfo',
     *             args: {}} @endcode
     * Invocation: @code native.call(request, result_callback); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     * Result callback:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success', result: {informationArray}}
     * @endcode
     */
    void GetAppsInfo(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code ApplicationInformation getAppInfo(id); @endcode
     * JSON: @code data: {method: 'ApplicationManager_getAppInfo',
     *             args: {id: id}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success', result: ApplicationInformation}
     * @endcode
     */
    void GetAppInfo(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code ApplicationCertificate[] getAppCerts(id); @endcode
     * JSON: @code data: {method: 'ApplicationManager_getAppCerts',
     *             args: {id: id}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success', result: [certificates]}
     * @endcode
     */
    void GetAppCerts(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code DOMString getAppSharedURI(id); @endcode
     * JSON: @code data: {method: 'ApplicationManager_getAppSharedURI',
     *             args: {id: id}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success', result: uri}
     * @endcode
     */
    void GetAppSharedUri(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code ApplicationMetaData[] getAppMetaData(id); @endcode
     * JSON: @code data: {method: 'ApplicationManager_getAppMetaData',
     *             args: {id: id}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success', result: [ApplicationMetaData]}
     * @endcode
     */
    void GetAppMetaData(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * JSON: @code data: {method: 'ApplicationManager_startAppInfoEventListener',
     *             args: {}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     */
    void StartAppInfoEventListener(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * JSON: @code data: {method: 'ApplicationManager_stopAppInfoEventListener',
     *             args: {}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     */
    void StopAppInfoEventListener(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code ApplicationInformation.size @endcode
     * JSON: @code data: {method: 'ApplicationInformation_getSize', args: {packageId: this.packageId}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success', result: {size}}
     * @endcode
     */
    void GetApplicationInformationSize(const webapi::common::json::Object& args, webapi::common::json::Object& out);

private:
    pkgmgr_client* pkgmgr_client_handle_;
};

} // namespace application
} // namespace webapi

#endif // WEBAPI_PLUGINS_APPLICATION_APPLICATION_MANAGER_H__
