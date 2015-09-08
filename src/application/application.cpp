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

#include "application.h"

#include "logger.h"
#include "native-plugin.h"

namespace webapi {
namespace application {

using namespace webapi::common;

RequestedApplicationControl& Application::app_control() {
    return app_control_;
}

void Application::Exit(const json::Object& /* args */, json::Object& out) {
    LoggerD("");

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    //empty

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    // TODO: add implementation which will handle both UI and service

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(out);
}

void Application::Hide(const json::Object& /* args */, json::Object& out) {
    LoggerD("");

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    //empty

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    // TODO: add implementation for UI

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(out);
}

void Application::GetRequestedAppControl(const json::Object& args, json::Object& out) {
    LoggerD("");

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    const auto it_bundle = args.find("bundle");
    const auto it_args_end = args.end();

    if (it_bundle == it_args_end ||
        !it_bundle->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    const json::String& encoded_bundle = it_bundle->second.get<json::String>();

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    json::Value result = json::Value(json::Object());

    if (!encoded_bundle.empty()) {
        app_control_.set_bundle(encoded_bundle);
        app_control_.ToJson(&result.get<json::Object>());
    } else {
        LoggerD("bundle string is empty.");
        result = json::Value();
    }

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(result, out);
}

} // namespace application
} // namespace webapi
