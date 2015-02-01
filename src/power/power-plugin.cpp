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

#include <functional>

#include <device/display.h>
#include <device/power.h>
#include <device/callback.h>
#include <wrt-common/native-context.h>

#include "logger.h"
#include "native-plugin.h"
#include "platform-exception.h"

namespace webapi {
namespace power {

namespace {
// The privileges that required in Power API
const std::string kPrivilegePower = "http://tizen.org/privilege/power";

// The table used for mapping enum to string value
const std::map<display_state_e, std::string> kPowerStateTable = {
    { DISPLAY_STATE_NORMAL, "SCREEN_NORMAL" },
    { DISPLAY_STATE_SCREEN_DIM, "SCREEN_DIM" },
    { DISPLAY_STATE_SCREEN_OFF, "SCREEN_OFF" }
};

const std::string kScreenResource = "SCREEN";

} // namespace

using namespace webapi::common;

class PowerPlugin: public webapi::common::NativePlugin {
public:
    PowerPlugin();
    virtual ~PowerPlugin();
    virtual void OnLoad();
private:
    void Request(const json::Object& args, json::Object& out);
    void Release(const json::Object& args, json::Object& out);
    void GetCurrentState(const json::Object& args, json::Object& out);
};

EXPORT_NATIVE_PLUGIN(webapi::power::PowerPlugin);

static std::string PowerStateToString(display_state_e state) {
    LoggerD("");
    auto it = kPowerStateTable.find(state);
    if (kPowerStateTable.end() != it) {
        return it->second;
    }
    throw UnknownException("Unknown state: " + state);
}

static void OnPlatformStateChangedCB(device_callback_e type, void* value, void* /*user_data*/) {
    LoggerD("");
    if (DEVICE_CALLBACK_DISPLAY_STATE != type) {
        LoggerE("type is not DISPLAY_STATE");
        return;
    }
    display_state_e state = static_cast<display_state_e>(reinterpret_cast<int>(value));
    try {
        wrt::common::NativeContext::GetInstance()->FireEvent("power-ScreenStateChanged",
                                                             PowerStateToString(state));
    } catch (const BasePlatformException& e) {
        LoggerD("Unknown state: " << state);
    }
}

PowerPlugin::PowerPlugin() {
    device_add_callback(DEVICE_CALLBACK_DISPLAY_STATE, OnPlatformStateChangedCB, nullptr);
}

PowerPlugin::~PowerPlugin() {
    device_remove_callback(DEVICE_CALLBACK_DISPLAY_STATE, OnPlatformStateChangedCB);
}

void PowerPlugin::OnLoad(){
    using namespace std::placeholders;
    dispatcher_.AddFunction("PowerManager_request",
                            std::bind(&PowerPlugin::Request, this, _1, _2));
    dispatcher_.AddFunction("PowerManager_release",
                            std::bind(&PowerPlugin::Release, this, _1, _2));
    dispatcher_.AddFunction("PowerManager_getCurrentState",
                            std::bind(&PowerPlugin::GetCurrentState, this, _1, _2));
}

extern "C" {
int dbus_method_sync(const char *dest, const char *path, const char *interface, const char *method,
                     const char *sig, char *param[]);
}

void PowerPlugin::Request(const json::Object& args, json::Object& out) {
    LoggerD("");

    NativePlugin::CheckAccess(kPrivilegePower);

    const auto arg_state = args.find("state");
    if (arg_state == args.end()) {
        throw InvalidValuesException("no state arguments");
    }

    const std::string& state = arg_state->second.get<json::String>();

    if (kPowerStateTable.at(DISPLAY_STATE_SCREEN_DIM) == state) {
        // device_power_request_lock is not support DIM
        char* arr[4];
        arr[0] = const_cast<char*>("lcddim");
        arr[1] = const_cast<char*>("staycurstate");
        arr[2] = const_cast<char*>("NULL");
        arr[3] = const_cast<char*>("0");
        int ret = dbus_method_sync("org.tizen.system.deviced",
                                   "/Org/Tizen/System/DeviceD/Display",
                                   "org.tizen.system.deviced.display",
                                   "lockstate", "sssi", arr);
        if (ret < 0) {
            LoggerE("device_power_request_lock error: " << ret);
            throw UnknownException("device_power_request_lock error");
        }
    } else if (kPowerStateTable.at(DISPLAY_STATE_NORMAL) == state) {
        int ret = device_power_request_lock(POWER_LOCK_DISPLAY, 0);
        if (DEVICE_ERROR_NONE != ret) {
            LoggerE("device_power_request_lock error: " << ret);
            throw UnknownException("device_power_request_lock error");
        }
    } else {
        int ret = device_power_request_lock(POWER_LOCK_CPU, 0);
        if (DEVICE_ERROR_NONE != ret) {
            LoggerE("device_power_request_lock error: " << ret);
            throw UnknownException("device_power_request_lock error");
        }
    }

    ReportSuccess(out);
}

void PowerPlugin::Release(const json::Object& args, json::Object& out) {
    LoggerD("");

    const auto arg_resource = args.find("resource");
    if (arg_resource == args.end()) {
        throw InvalidValuesException("no resource arguments");
    }

    const json::String& resource = arg_resource->second.get<json::String>();

    if (kScreenResource == resource) {
        device_power_release_lock(POWER_LOCK_DISPLAY);
    } else {
        device_power_release_lock(POWER_LOCK_CPU);
    }

    ReportSuccess(out);
}

void PowerPlugin::GetCurrentState(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");
    display_state_e platform_state = DISPLAY_STATE_NORMAL;

    int ret = device_display_get_state(&platform_state);
    if (DEVICE_ERROR_NONE != ret) {
        LoggerE("device_display_get_state failed (" << ret << ")");
    }
    ReportSuccess(json::Value(PowerStateToString(platform_state)), out);
}

} // power
} // webapi
