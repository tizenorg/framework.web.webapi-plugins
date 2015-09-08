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

#include "native-plugin.h"

#include <wrt-common/access-control.h>

#include "logger.h"
#include "platform-exception.h"

namespace webapi {
namespace common {

namespace {
const char* kAsyncCallbackHandle = "__async_callback_handle";
} // namespace

std::string NativePlugin::OnCallSync(/* const */ std::string& data) {
    LoggerD("");
    return Call(data);
}

std::string NativePlugin::OnCall(/* const */ std::string& data, int callback_handle) {
    LoggerD("");
    // callback handle will be appended to argument list
    return Call(data, json::Value(static_cast<double>(callback_handle)));
}

bool NativePlugin::HasAsyncCallbackHandle(const json::Object& args) {
    const auto it_handle = args.find(kAsyncCallbackHandle);
    return (args.end() != it_handle) && it_handle->second.is<double>();
}

int NativePlugin::GetAsyncCallbackHandle(const json::Object& args) {
    const auto it_handle = args.find(kAsyncCallbackHandle);
    if ((args.end() != it_handle) && it_handle->second.is<double>()) {
        return it_handle->second.get<double>();
    } else {
        LoggerE("Expecting asynchronous call, but callback handle was not provided.");
        throw InvalidValuesException("Expecting asynchronous call, but callback handle was not provided.");
    }
}

void NativePlugin::ReportSuccess(json::Object& out) {
    out.insert(std::make_pair("status", json::Value("success")));
}

void NativePlugin::ReportSuccess(const json::Value& result, json::Object& out) {
    out.insert(std::make_pair("result", result));
    ReportSuccess(out);
}

void NativePlugin::ReportError(json::Object& out) {
    out.insert(std::make_pair("status", json::Value("error")));
}

void NativePlugin::ReportError(const BasePlatformException& ex, json::Object& out) {
     out.insert(std::make_pair("error", ex.ToJSON()));
     ReportError(out);
}

void NativePlugin::CheckAccess(const std::string& privilege) {
    LoggerD("Checking access to: " << privilege);
    if (!wrt::common::AccessControl::GetInstance()->CheckAccessibility({privilege})) {
        LoggerE("Access to " << privilege << " denied");
        throw SecurityException("The application does not have the privilege to call this method.");
    }
}

std::string NativePlugin::Call(/* const */ std::string& data, const json::Value& callback_handle /* = json::Value() */) {
    LoggerD("");
    try {
        json::Value value = json::parse(data);

        if (value.is<json::Object>()) {
            LoggerD("Interpreting JSON");

            // uwrap object
            const json::Object& obj = value.get<json::Object>();

            // check for method in JSON
            const auto method = obj.find("method");
            if (obj.end() == method || !method->second.is<json::String>()) {
                LoggerE("No \"method\" field in JSON");
                throw InvalidValuesException("No \"method\" field in JSON");
            }
            const json::String& m = method->second.get<json::String>();

            // check if we have that method mapped
            NativeFunction func = dispatcher_.GetFunction(m);

            if (!func) {
                LoggerE("Unknown function: " << m);
                throw InvalidValuesException("Unknown function");
            }

            // check for args in JSON
            const auto args = obj.find("args");
            if (obj.end() == args || !args->second.is<json::Object>()) {
                LoggerE("No \"args\" field in JSON");
                throw InvalidValuesException("No \"args\" field in JSON");
            }
            const json::Object& a = args->second.get<json::Object>();

            // append callback_handle
            if (!callback_handle.is<json::Null>()) {
                const_cast<json::Object&>(a).insert(std::make_pair(kAsyncCallbackHandle, callback_handle));
            }

            // perform the call
            json::Value result = json::Value(json::Object());
            func(a, result.get<json::Object>());

            return result.serialize();
        } else {
            LoggerE("Not an object!");
            throw InvalidValuesException("Not an object!");
        }
    } catch (const BasePlatformException& e) {
        return HandleException(e);
    } catch (const BasePlatformException* e) {
        return HandleException(*e);
    } catch (const std::exception& e) {
        return HandleException(UnknownException(e.what()));
    } catch (const std::exception* e) {
        return HandleException(UnknownException(e->what()));
    } catch (...) {
        return HandleException(UnknownException("Unknown exception"));
    }
}

std::string NativePlugin::HandleException(const BasePlatformException& ex) {
    LoggerD("Exception: " << ex.message());
    json::Value result = json::Value(json::Object());
    NativePlugin::ReportError(ex, result.get<json::Object>());
    return result.serialize();
}

} // namespace common
} // namespace webapi
