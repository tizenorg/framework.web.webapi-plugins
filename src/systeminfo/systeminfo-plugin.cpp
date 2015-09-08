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

#include <memory>

#include <native-context.h>
#include <system_info.h>
#include <system_info_internal.h>
#include <vconf.h>

#include "logger.h"
#include "json-parser.h"
#include "platform-exception.h"
#include "native-plugin.h"
#include "systeminfo-utils.h"
#include "task-queue.h"

namespace webapi {
namespace systeminfo {

using namespace webapi::common;

class SystemInfoPlugin : public webapi::common::NativePlugin {
public:
    virtual void OnLoad();
};

EXPORT_NATIVE_PLUGIN(webapi::systeminfo::SystemInfoPlugin);

static void SystemInfo_getCapabilities(const json::Object& args, json::Object& out);
static void SystemInfo_getCapability(const json::Object& args, json::Object& out);
static void SystemInfo_getPropertyValue(const json::Object& args, json::Object& out);
static void SystemInfo_addPropertyValueChangeListener(const json::Object& args, json::Object& out);
static void SystemInfo_removePropertyValueChangeListener(const json::Object& args, json::Object& out);

//Callback functions declarations
static void OnBatteryChangedCallback();
static void OnCpuChangedCallback();
static void OnStorageChangedCallback();
static void OnDisplayChangedCallback();
static void OnDeviceOrientationChangedCallback();
static void OnLocaleChangedCallback();
static void OnNetworkChangedCallback();
static void OnWifiNetworkChangedCallback();
static void OnCellularNetworkChangedCallback();
static void OnPeripheralChangedCallback();

namespace {
const std::string kPropertyIdBattery = "BATTERY";
const std::string kPropertyIdCpu = "CPU";
const std::string kPropertyIdStorage = "STORAGE";
const std::string kPropertyIdDisplay = "DISPLAY";
const std::string kPropertyIdDeviceOrientation = "DEVICE_ORIENTATION";
const std::string kPropertyIdBuild = "BUILD";
const std::string kPropertyIdLocale = "LOCALE";
const std::string kPropertyIdNetwork = "NETWORK";
const std::string kPropertyIdWifiNetwork = "WIFI_NETWORK";
const std::string kPropertyIdCellularNetwork = "CELLULAR_NETWORK";
const std::string kPropertyIdSim = "SIM";
const std::string kPropertyIdPeripheral = "PERIPHERAL";
}

void SystemInfoPlugin::OnLoad() {
    // TODO: implement
#define DISPATCHER_ADDFUNCTION(N) dispatcher_.AddFunction(#N, N);
    DISPATCHER_ADDFUNCTION(SystemInfo_getCapabilities)
    DISPATCHER_ADDFUNCTION(SystemInfo_getCapability)
    DISPATCHER_ADDFUNCTION(SystemInfo_getPropertyValue)
    DISPATCHER_ADDFUNCTION(SystemInfo_addPropertyValueChangeListener)
    DISPATCHER_ADDFUNCTION(SystemInfo_removePropertyValueChangeListener)
#undef DISPATCHER_ADDFUNCTION
}

void SystemInfo_getCapabilities(const json::Object& args, json::Object& out) {
    LoggerD("");
    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    // No input arguments
    LoggerD("%d", args.size());

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------

    //out.insert(std::make_pair("result", json::Value(static_cast<double>(0.5))));

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    result_obj.insert(std::make_pair("bluetooth",
            SystemInfoDeviceCapability::IsBluetooth() ));
    result_obj.insert(std::make_pair("nfc",
            SystemInfoDeviceCapability::IsNfc() ));
    result_obj.insert(std::make_pair("nfcReservedPush",
            SystemInfoDeviceCapability::IsNfcReservedPush() ));
    result_obj.insert(std::make_pair("multiTouchCount",
            std::to_string(SystemInfoDeviceCapability::GetMultiTouchCount())));
    result_obj.insert(std::make_pair("inputKeyboard",
            SystemInfoDeviceCapability::IsInputKeyboard() ));
    result_obj.insert(std::make_pair("inputKeyboardLayout",
            SystemInfoDeviceCapability::IsInputKeyboardLayout() ));
    result_obj.insert(std::make_pair("wifi",
            SystemInfoDeviceCapability::IsWifi() ));
    result_obj.insert(std::make_pair("wifiDirect",
            SystemInfoDeviceCapability::IsWifiDirect() ));
    result_obj.insert(std::make_pair("platformName",
            SystemInfoDeviceCapability::GetPlatformName() ));
    result_obj.insert(std::make_pair("platformVersion",
            SystemInfoDeviceCapability::GetPlatformVersion() ));
    result_obj.insert(std::make_pair("webApiVersion",
            SystemInfoDeviceCapability::GetWebApiVersion() ));
    result_obj.insert(std::make_pair("fmRadio",
            SystemInfoDeviceCapability::IsFmRadio() ));
    result_obj.insert(std::make_pair("opengles",
            SystemInfoDeviceCapability::IsOpengles() ));
    result_obj.insert(std::make_pair("openglesVersion1_1",
            SystemInfoDeviceCapability::IsOpenglesVersion11() ));
    result_obj.insert(std::make_pair("openglesVersion2_0",
            SystemInfoDeviceCapability::IsOpenglesVersion20() ));
    result_obj.insert(std::make_pair("openglestextureFormat",
            SystemInfoDeviceCapability::GetOpenglesTextureFormat() ));
    result_obj.insert(std::make_pair("speechRecognition",
            SystemInfoDeviceCapability::IsSpeechRecognition() ));
    result_obj.insert(std::make_pair("speechSynthesis",
            SystemInfoDeviceCapability::IsSpeechSynthesis() ));
    result_obj.insert(std::make_pair("accelerometer",
            SystemInfoDeviceCapability::IsAccelerometer( ) ));
    result_obj.insert(std::make_pair("accelerometerWakeup",
            SystemInfoDeviceCapability::IsAccelerometerWakeup() ));
    result_obj.insert(std::make_pair("barometer",
            SystemInfoDeviceCapability::IsBarometer() ));
    result_obj.insert(std::make_pair("barometerWakeup",
            SystemInfoDeviceCapability::IsBarometerWakeup() ));
    result_obj.insert(std::make_pair("gyroscope",
            SystemInfoDeviceCapability::IsGyroscope() ));
    result_obj.insert(std::make_pair("gyroscopeWakeup",
            SystemInfoDeviceCapability::IsGyroscopeWakeup() ));
    result_obj.insert(std::make_pair("camera",
            SystemInfoDeviceCapability::IsCamera() ));
    result_obj.insert(std::make_pair("cameraFront",
            SystemInfoDeviceCapability::IsCameraFront() ));
    result_obj.insert(std::make_pair("cameraFrontFlash",
            SystemInfoDeviceCapability::IsCameraFrontFlash() ));
    result_obj.insert(std::make_pair("cameraBack",
            SystemInfoDeviceCapability::IsCameraBack() ));
    result_obj.insert(std::make_pair("cameraBackFlash",
            SystemInfoDeviceCapability::IsCameraBackFlash() ));
    result_obj.insert(std::make_pair("location",
            SystemInfoDeviceCapability::IsLocation() ));
    result_obj.insert(std::make_pair("locationGps",
            SystemInfoDeviceCapability::IsLocationGps() ));
    result_obj.insert(std::make_pair("locationWps",
            SystemInfoDeviceCapability::IsLocationWps() ));
    result_obj.insert(std::make_pair("microphone",
            SystemInfoDeviceCapability::IsMicrophone() ));
    result_obj.insert(std::make_pair("usbHost",
            SystemInfoDeviceCapability::IsUsbHost() ));
    result_obj.insert(std::make_pair("usbAccessory",
            SystemInfoDeviceCapability::IsUsbAccessory() ));
    result_obj.insert(std::make_pair("screenOutputRca",
            SystemInfoDeviceCapability::IsScreenOutputRca() ));
    result_obj.insert(std::make_pair("screenOutputHdmi",
            SystemInfoDeviceCapability::IsScreenOutputHdmi() ));
    result_obj.insert(std::make_pair("graphicsAcceleration",
            SystemInfoDeviceCapability::IsGraphicsAcceleration() ));
    result_obj.insert(std::make_pair("push",
            SystemInfoDeviceCapability::IsPush() ));
    result_obj.insert(std::make_pair("telephony",
            SystemInfoDeviceCapability::IsTelephony() ));
    result_obj.insert(std::make_pair("telephonyMms",
            SystemInfoDeviceCapability::IsTelephonyMMS() ));
    result_obj.insert(std::make_pair("telephonySms",
            SystemInfoDeviceCapability::IsTelephonySMS() ));
    result_obj.insert(std::make_pair("platformCoreCpuArch",
            SystemInfoDeviceCapability::GetPlatfomCoreCpuArch() ));
    result_obj.insert(std::make_pair("platformCoreFpuArch",
            SystemInfoDeviceCapability::GetPlatfomCoreFpuArch() ));
    result_obj.insert(std::make_pair("sipVoip",
            SystemInfoDeviceCapability::IsSipVoip() ));
    result_obj.insert(std::make_pair("magnetometer",
            SystemInfoDeviceCapability::IsMagnetometer() ));
    result_obj.insert(std::make_pair("magnetometerWakeup",
            SystemInfoDeviceCapability::IsMagnetometerWakeup() ));
    result_obj.insert(std::make_pair("photometer",
            SystemInfoDeviceCapability::IsPhotometer() ));
    result_obj.insert(std::make_pair("photometerWakeup",
            SystemInfoDeviceCapability::IsPhotometerWakeup() ));
    result_obj.insert(std::make_pair("proximity",
            SystemInfoDeviceCapability::IsProximity() ));
    result_obj.insert(std::make_pair("proximityWakeup",
            SystemInfoDeviceCapability::IsProximityWakeup() ));
    result_obj.insert(std::make_pair("tiltmeter",
            SystemInfoDeviceCapability::IsTiltmeter() ));
    result_obj.insert(std::make_pair("tiltmeterWakeup",
            SystemInfoDeviceCapability::IsTiltmeterWakeup() ));
    result_obj.insert(std::make_pair("dataEncryption",
            SystemInfoDeviceCapability::IsDataEncryption() ));
    result_obj.insert(std::make_pair("autoRotation",
            SystemInfoDeviceCapability::IsAutoRotation() ));
    result_obj.insert(std::make_pair("visionImageRecognition",
            SystemInfoDeviceCapability::IsVisionImageRecognition() ));
    result_obj.insert(std::make_pair("visionQrcodeGeneration",
            SystemInfoDeviceCapability::IsVisionQrcodeGeneration() ));
    result_obj.insert(std::make_pair("visionQrcodeRecognition",
            SystemInfoDeviceCapability::IsVisionQrcodeRecognition() ));
    result_obj.insert(std::make_pair("visionFaceRecognition",
            SystemInfoDeviceCapability::IsVisionFaceRecognition() ));
    result_obj.insert(std::make_pair("secureElement",
            SystemInfoDeviceCapability::IsSecureElement() ));
    result_obj.insert(std::make_pair("profile",
            SystemInfoDeviceCapability::GetProfile() ));
    result_obj.insert(std::make_pair("nativeApiVersion",
                SystemInfoDeviceCapability::GetNativeAPIVersion() ));
    result_obj.insert(std::make_pair("duid",
                SystemInfoDeviceCapability::GetDuid() ));
    result_obj.insert(std::make_pair("screenSizeNormal",
                SystemInfoDeviceCapability::IsScreenSizeNormal() ));
    result_obj.insert(std::make_pair("screenSize480_800",
                SystemInfoDeviceCapability::IsScreenSize480_800() ));
    result_obj.insert(std::make_pair("screenSize720_1280",
                SystemInfoDeviceCapability::IsScreenSize720_1280() ));
    result_obj.insert(std::make_pair("shellAppWidget",
                SystemInfoDeviceCapability::IsShellAppWidget() ));
    result_obj.insert(std::make_pair("nativeOspCompatible",
                SystemInfoDeviceCapability::IsNativeOspCompatible() ));
    NativePlugin::ReportSuccess(result, out);
    LoggerD("Success");
}

void SystemInfo_getCapability(const json::Object& args, json::Object& out) {
    const auto it_key = args.find("key");
    const auto it_args_end = args.end();

    if (it_key == it_args_end ||
            !it_key->second.is<json::String>()) {
        LoggerE("Invalid key was passed.");
        throw InvalidValuesException("Invalid key was passed.");
    }
    const std::string& key = it_key->second.get<json::String>();
    LoggerD("Getting capability with key: %s ", key.c_str());

    json::Value result = SystemInfoDeviceCapability::GetCapability(key);
    NativePlugin::ReportSuccess(result, out);
    LoggerD("Success");
}

void SystemInfo_getPropertyValue(const json::Object& args, json::Object& out) {
    LoggerD("");
    int callback_handle = NativePlugin::GetAsyncCallbackHandle(args);

    const auto it_prop = args.find("property");
    const auto it_args_end = args.end();

    if (it_prop == it_args_end ||
            !it_prop->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }
    std::string prop_id = it_prop->second.get<json::String>();
    LoggerD("Getting property with id: %s ", prop_id.c_str());

    auto get = [prop_id](const std::shared_ptr<json::Value>& response) -> void {
        try {
            json::Value result = SysteminfoUtils::GetPropertyValue(prop_id);
            NativePlugin::ReportSuccess(result, response->get<json::Object>());
        } catch (const BasePlatformException& e) {
            NativePlugin::ReportError(e,response->get<json::Object>());
        }
    };

    auto get_response = [callback_handle](const std::shared_ptr<json::Value>& response) -> void {
        wrt::common::NativeContext::GetInstance()->InvokeCallback(callback_handle, response->serialize());
    };

    TaskQueue::GetInstance().Queue<json::Value>
        (get, get_response, std::shared_ptr<json::Value>(new json::Value(json::Object())));

    NativePlugin::ReportSuccess(out);
}

void SystemInfo_addPropertyValueChangeListener(const json::Object& args, json::Object& out) {
    LoggerD("");
    LoggerD("%d", args.size());

    try {
        const auto it_property = args.find("property");
        const auto it_args_end = args.end();

        if (it_property == it_args_end || !it_property->second.is<json::String>()) {
            LoggerE("Invalid parameter was passed.");
            throw InvalidValuesException("Invalid parameter was passed.");
        }
        // Check type of property for which listener should be registered
        const std::string& property_name = it_property->second.get<json::String>();
        if (property_name == kPropertyIdBattery) {
            SysteminfoUtils::RegisterBatteryListener(OnBatteryChangedCallback);
        } else if (property_name == kPropertyIdCpu) {
            SysteminfoUtils::RegisterCpuListener(OnCpuChangedCallback);
        } else if (property_name == kPropertyIdStorage) {
            SysteminfoUtils::RegisterStorageListener(OnStorageChangedCallback);
        } else if (property_name == kPropertyIdDisplay) {
            SysteminfoUtils::RegisterDisplayListener(OnDisplayChangedCallback);
        } else if (property_name == kPropertyIdDeviceOrientation) {
            SysteminfoUtils::RegisterDeviceOrientationListener(OnDeviceOrientationChangedCallback);
        } else if (property_name == kPropertyIdBuild) {
            LoggerW("BUILD property's value is a fixed value");
            throw NotSupportedException("BUILD property's value is a fixed value");
        } else if (property_name == kPropertyIdLocale) {
            SysteminfoUtils::RegisterLocaleListener(OnLocaleChangedCallback);
        } else if (property_name == kPropertyIdNetwork) {
            SysteminfoUtils::RegisterNetworkListener(OnNetworkChangedCallback);
        } else if (property_name == kPropertyIdWifiNetwork) {
            SysteminfoUtils::RegisterWifiNetworkListener(OnWifiNetworkChangedCallback);
        } else if (property_name == kPropertyIdCellularNetwork) {
            SysteminfoUtils::RegisterCellularNetworkListener(OnCellularNetworkChangedCallback);
        } else if (property_name == kPropertyIdSim) {
            //SIM listeners are not supported by core API, so we just pass over
            LoggerW("SIM listener is not supported by Core API - ignoring");
        } else if (property_name == kPropertyIdPeripheral) {
            SysteminfoUtils::RegisterPeripheralListener(OnPeripheralChangedCallback);
        } else {
            LoggerE("Not supported property");
            throw InvalidValuesException("Not supported property");
        }
        NativePlugin::ReportSuccess(out);
        LoggerD("Success");
    } catch (const BasePlatformException& e) {
        LoggerD("Error");
        NativePlugin::ReportError(e, out);
    }

}

void SystemInfo_removePropertyValueChangeListener(const json::Object& args, json::Object& out) {
    LoggerD("");
    LoggerD("%d", args.size());

    try {
        const auto it_property = args.find("property");
        const auto it_args_end = args.end();

        if (it_property == it_args_end || !it_property->second.is<json::String>()) {
            LoggerE("Invalid parameter was passed.");
            throw InvalidValuesException("Invalid parameter was passed.");
        }
        // Check type of property for which listener should be removed
        const std::string& property_name = it_property->second.get<json::String>();
        if (property_name == kPropertyIdBattery) {
            SysteminfoUtils::UnregisterBatteryListener();
        } else if (property_name == kPropertyIdCpu) {
            SysteminfoUtils::UnregisterCpuListener();
        } else if (property_name == kPropertyIdStorage) {
            SysteminfoUtils::UnregisterStorageListener();
        } else if (property_name == kPropertyIdDisplay) {
            SysteminfoUtils::UnregisterDisplayListener();
        } else if (property_name == kPropertyIdDeviceOrientation) {
            SysteminfoUtils::UnregisterDeviceOrientationListener();
        } else if (property_name == kPropertyIdBuild) {
            LoggerW("BUILD property's value is a fixed value");
            throw NotSupportedException("BUILD property's value is a fixed value");
        } else if (property_name == kPropertyIdLocale) {
            SysteminfoUtils::UnregisterLocaleListener();
        } else if (property_name == kPropertyIdNetwork) {
            SysteminfoUtils::UnregisterNetworkListener();
        } else if (property_name == kPropertyIdWifiNetwork) {
            SysteminfoUtils::UnregisterWifiNetworkListener();
        } else if (property_name == kPropertyIdCellularNetwork) {
            SysteminfoUtils::UnregisterCellularNetworkListener();
        } else if (property_name == kPropertyIdSim) {
            //SIM listeners are not supported by core API, so we just pass over
            LoggerW("SIM listener is not supported by Core API - ignoring");
        } else if (property_name == kPropertyIdPeripheral) {
            SysteminfoUtils::UnregisterPeripheralListener();
        } else {
            LoggerE("Not supported property");
            throw InvalidValuesException("Not supported property");
        }
        NativePlugin::ReportSuccess(out);
        LoggerD("Success");
    } catch (const BasePlatformException& e) {
        LoggerD("Error");
        NativePlugin::ReportError(e, out);
    }
}

//Callback functions
void OnBatteryChangedCallback()
{
    LoggerD("");
    const std::shared_ptr<json::Value>& response =
            std::shared_ptr<json::Value>(new json::Value(json::Object()));
    json::Value result = SysteminfoUtils::GetPropertyValue(kPropertyIdBattery);
    NativePlugin::ReportSuccess(result, response->get<json::Object>());
    wrt::common::NativeContext::GetInstance()->FireEvent("SystemInfoBatteryChangeBroadcast",
            response->serialize());
}

void OnCpuChangedCallback()
{
    LoggerD("");
    const std::shared_ptr<json::Value>& response =
            std::shared_ptr<json::Value>(new json::Value(json::Object()));
    json::Value result = SysteminfoUtils::GetPropertyValue(kPropertyIdCpu);
    NativePlugin::ReportSuccess(result, response->get<json::Object>());
    wrt::common::NativeContext::GetInstance()->FireEvent("SystemInfoCpuChangeBroadcast",
            response->serialize());
}

void OnStorageChangedCallback()
{
    LoggerD("");
    const std::shared_ptr<json::Value>& response =
            std::shared_ptr<json::Value>(new json::Value(json::Object()));
    json::Value result = SysteminfoUtils::GetPropertyValue(kPropertyIdStorage);
    NativePlugin::ReportSuccess(result, response->get<json::Object>());
    wrt::common::NativeContext::GetInstance()->FireEvent("SystemInfoStorageChangeBroadcast",
            response->serialize());
}

void OnDisplayChangedCallback()
{
    LoggerD("");
    const std::shared_ptr<json::Value>& response =
                std::shared_ptr<json::Value>(new json::Value(json::Object()));
    json::Value result = SysteminfoUtils::GetPropertyValue(kPropertyIdDisplay);
    NativePlugin::ReportSuccess(result, response->get<json::Object>());
    wrt::common::NativeContext::GetInstance()->FireEvent("SystemInfoDisplayChangeBroadcast",
                                                            response->serialize());
}

void OnDeviceOrientationChangedCallback()
{
    LoggerD("");
    const std::shared_ptr<json::Value>& response =
            std::shared_ptr<json::Value>(new json::Value(json::Object()));
    json::Value result = SysteminfoUtils::GetPropertyValue(kPropertyIdDeviceOrientation);
    NativePlugin::ReportSuccess(result, response->get<json::Object>());
    wrt::common::NativeContext::GetInstance()->FireEvent("SystemInfoDeviceOrientationChangeBroadcast",
            response->serialize());
}

void OnLocaleChangedCallback()
{
    LoggerD("");
    const std::shared_ptr<json::Value>& response =
            std::shared_ptr<json::Value>(new json::Value(json::Object()));
    json::Value result = SysteminfoUtils::GetPropertyValue(kPropertyIdLocale);
    NativePlugin::ReportSuccess(result, response->get<json::Object>());
    wrt::common::NativeContext::GetInstance()->FireEvent("SystemInfoLocaleChangeBroadcast",
            response->serialize());
}

void OnNetworkChangedCallback()
{
    LoggerD("");
    const std::shared_ptr<json::Value>& response =
            std::shared_ptr<json::Value>(new json::Value(json::Object()));
    json::Value result = SysteminfoUtils::GetPropertyValue(kPropertyIdNetwork);
    NativePlugin::ReportSuccess(result, response->get<json::Object>());
    wrt::common::NativeContext::GetInstance()->FireEvent("SystemInfoNetworkChangeBroadcast",
            response->serialize());
}

void OnWifiNetworkChangedCallback()
{
    LoggerD("");
    const std::shared_ptr<json::Value>& response =
            std::shared_ptr<json::Value>(new json::Value(json::Object()));
    json::Value result = SysteminfoUtils::GetPropertyValue(kPropertyIdWifiNetwork);
    NativePlugin::ReportSuccess(result, response->get<json::Object>());
    wrt::common::NativeContext::GetInstance()->FireEvent("SystemInfoWifiNetworkChangeBroadcast",
            response->serialize());
}

void OnCellularNetworkChangedCallback()
{
    LoggerD("");
    const std::shared_ptr<json::Value>& response =
            std::shared_ptr<json::Value>(new json::Value(json::Object()));
    json::Value result = SysteminfoUtils::GetPropertyValue(kPropertyIdCellularNetwork);
    NativePlugin::ReportSuccess(result, response->get<json::Object>());
    wrt::common::NativeContext::GetInstance()->FireEvent(
            "SystemInfoCellularNetworkChangeBroadcast", response->serialize());
}

void OnPeripheralChangedCallback()
{
    LoggerD("");
    const std::shared_ptr<json::Value>& response =
            std::shared_ptr<json::Value>(new json::Value(json::Object()));
    json::Value result = SysteminfoUtils::GetPropertyValue(kPropertyIdPeripheral);
    NativePlugin::ReportSuccess(result, response->get<json::Object>());
    wrt::common::NativeContext::GetInstance()->FireEvent("SystemInfoPeripheralChangeBroadcast",
            response->serialize());
}

} // namespace systeminfo
} // namespace webapi
