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

#ifndef WEBAPI_PLUGINS_COMMON_NATIVE_PLUGIN_H_
#define WEBAPI_PLUGINS_COMMON_NATIVE_PLUGIN_H_

#include <wrt-common/native-plugin.h>

#include "function-dispatcher.h"
#include "json-parser.h"
#include "platform-exception.h"

namespace webapi {
namespace common {

class NativePlugin : public wrt::common::NativePlugin {
public:
    virtual ~NativePlugin() {}
    virtual void OnLoad() = 0;
    virtual std::string OnCallSync(/* const */ std::string& data);
    virtual std::string OnCall(/* const */ std::string& data, int callback_handle);

    static bool HasAsyncCallbackHandle(const json::Object& args);
    static int GetAsyncCallbackHandle(const json::Object& args);

    static void ReportSuccess(json::Object& out);
    static void ReportSuccess(const json::Value& result, json::Object& out);
    static void ReportError(json::Object& out);
    static void ReportError(const BasePlatformException& ex, json::Object& out);

    static void CheckAccess(const std::string& privilege);

protected:
    FunctionDispatcher dispatcher_;

private:
    std::string Call(/* const */ std::string& data, const json::Value& callback_handle = json::Value());
    std::string HandleException(const BasePlatformException& ex);
};

} // namespace common
} // namespace webapi

#endif // WEBAPI_PLUGINS_COMMON_NATIVE_PLUGIN_H_
