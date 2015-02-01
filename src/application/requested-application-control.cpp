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

#include "requested-application-control.h"

#include <app_manager.h>
#include <app_control.h>
#include <app_control_internal.h>
#include <bundle.h>

#include "application-utils.h"
#include "logger.h"
#include "native-plugin.h"
#include "platform-exception.h"

namespace webapi {
namespace application {

using namespace webapi::common;

void RequestedApplicationControl::set_bundle(const std::string& encoded_bundle) {
    if (encoded_bundle != bundle_) {
        bundle_ = encoded_bundle;

        bundle* bundle = bundle_decode((bundle_raw*)(encoded_bundle.c_str()),
                                       encoded_bundle.length());
        app_control_h app_control = nullptr;
        int ret = app_control_create_event(bundle, &app_control);
        bundle_free(bundle);

        if (APP_CONTROL_ERROR_NONE != ret) {
            LoggerE("Failed to create app_control");
            throw UnknownException("Failed to create app_control");
        }

        set_app_control(app_control);
    }
}

void RequestedApplicationControl::set_app_control(app_control_h app_control) {
    app_control_.reset(app_control, app_control_destroy);

    char* tmp_str = nullptr;
    int ret = app_control_get_caller(app_control, &tmp_str);

    if ((APP_CONTROL_ERROR_NONE == ret) && (nullptr != tmp_str)) {
        caller_app_id_ = tmp_str;
    } else {
        LoggerW("Failed to get callerAppId because of platform error");
        LoggerW("Please ignore if the application is launched in debug mode");
    }

    free(tmp_str);
}

void RequestedApplicationControl::ToJson(json::Object* out) {
    if (app_control_) {
        out->insert(std::make_pair("callerAppId", caller_app_id_));
        auto appControl = out->insert(std::make_pair("appControl", json::Value(json::Object())));
        ApplicationUtils::ServiceToApplicationControl(app_control_.get(),
                                                      &appControl.first->second.get<json::Object>());
    }
}

void RequestedApplicationControl::ReplyResult(const json::Object& args, json::Object& out) {
    LoggerD("Entered");

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    const auto it_data = args.find("data");
    const auto it_bundle = args.find("bundle");
    const auto it_args_end = args.end();

    if (it_data == it_args_end ||
        it_bundle == it_args_end ||
        !it_data->second.is<json::Array>() ||
        !it_bundle->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    // read input data
    const json::Array& data = it_data->second.get<json::Array>();
    set_bundle(it_bundle->second.get<json::String>());

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    // code to check caller liveness
    VerifyCallerPresence();

    // create reply
    app_control_h reply;
    app_control_create(&reply);
    std::unique_ptr<std::remove_pointer<app_control_h>::type, int(*)(app_control_h)>
                    reply_ptr(reply, &app_control_destroy); // automatically release the memory

    if (!data.empty()) {
        for (auto iter = data.begin(); iter != data.end(); ++iter) {
            ApplicationUtils::ApplicationControlDataToServiceExtraData(iter->get<json::Object>(),
                                                                       reply);
        }
    } else {
        LoggerD("appControlDataArray is empty");
    }

    // send reply
    if (app_control_reply_to_launch_request(reply, app_control_.get(), APP_CONTROL_RESULT_SUCCEEDED) != APP_CONTROL_ERROR_NONE) {
        throw NotFoundException("Cannot find caller.");
    }

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(out);
}

void RequestedApplicationControl::ReplyFailure(const json::Object& args, json::Object& out) {
    LoggerD("Entered");

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

    // read input data
    set_bundle(it_bundle->second.get<json::String>());

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    // code to check caller liveness
    VerifyCallerPresence();

    // create reply
    app_control_h reply;
    app_control_create(&reply);
    std::unique_ptr<std::remove_pointer<app_control_h>::type, int(*)(app_control_h)>
                    reply_ptr(reply, &app_control_destroy); // automatically release the memory

    // send reply
    if (app_control_reply_to_launch_request(reply, app_control_.get(), APP_CONTROL_RESULT_FAILED) != APP_CONTROL_ERROR_NONE) {
        throw NotFoundException("Cannot find caller.");
    }

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(out);
}

void RequestedApplicationControl::VerifyCallerPresence() {
    if (caller_app_id_.empty()) {
        LoggerE("caller_app_id_ is empty. This means caller is dead.");
        throw NotFoundException("Cannot find caller.");
    } else {
        bool running = false;

        int ret = app_manager_is_running(caller_app_id_.c_str(), &running);

        if ((APP_MANAGER_ERROR_NONE != ret) || !running) {
            LoggerE("Caller is not running");
            throw NotFoundException("Cannot find caller.");
        }
    }
}


} // namespace application
} // namespace webapi
