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

#ifndef WEBAPI_PLUGINS_APPLICATION_REQUESTED_APPLICATION_CONTROL_H__
#define WEBAPI_PLUGINS_APPLICATION_REQUESTED_APPLICATION_CONTROL_H__

#include <memory>
#include <string>
#include <type_traits>

#include <app_control.h>

#include "json-parser.h"

namespace webapi {
namespace application {

class RequestedApplicationControl {
public:
    void set_bundle(const std::string& encoded_bundle);

    void ToJson(webapi::common::json::Object* out);

    /**
     * Signature: @code void replyResult(data); @endcode
     * JSON: @code data: {method: 'RequestedApplicationControl_replyResult',
     *                    args: {data: data, bundle: encoded_bundle}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     */
    void ReplyResult(const webapi::common::json::Object& args, webapi::common::json::Object& out);

    /**
     * Signature: @code void replyFailure(); @endcode
     * JSON: @code data: {method: 'RequestedApplicationControl_replyFailure',
     *                    args: {bundle: encoded_bundle}} @endcode
     * Invocation: @code native.callSync(request); @endcode
     * Return:
     * @code
     * {status: 'error', error: {name, message}}
     * {status: 'success'}
     * @endcode
     */
    void ReplyFailure(const webapi::common::json::Object& args, webapi::common::json::Object& out);

private:
    void set_app_control(app_control_h app_control);
    void VerifyCallerPresence();

    std::string bundle_;
    std::shared_ptr<std::remove_pointer<app_control_h>::type> app_control_;
    std::string caller_app_id_;
};

} // namespace application
} // namespace webapi

#endif // WEBAPI_PLUGINS_APPLICATION_REQUESTED_APPLICATION_CONTROL_H__
