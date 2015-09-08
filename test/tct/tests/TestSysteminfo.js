/*
Copyright (c) 2013 Samsung Electronics Co., Ltd.

Licensed under the Apache License, Version 2.0 (the License);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


 */

var attribute = "";
var status_value = "";
var isRoaming = false;

var SystemInfoDeviceCapability = ["bluetooth", "nfc", "nfcReservedPush", "multiTouchCount", "inputKeyboard", "inputKeyboardLayout", "wifi", "wifiDirect", "opengles", "openglestextureFormat", "openglesVersion1_1", "openglesVersion2_0", "fmRadio", "platformVersion", "webApiVersion", "platformName", "camera", "cameraFront", "cameraFrontFlash", "cameraBack", "cameraBackFlash", "location", "locationGps", "locationWps", "microphone", "usbHost", "usbAccessory", "screenOutputRca", "screenOutputHdmi", "platformCoreCpuArch", "platformCoreFpuArch", "sipVoip", "speechRecognition", "speechSynthesis", "accelerometer", "accelerometerWakeup", "barometer", "barometerWakeup", "gyroscope", "gyroscopeWakeup", "magnetometer", "magnetometerWakeup", "photometer", "photometerWakeup", "proximity", "proximityWakeup", "tiltmeter", "tiltmeterWakeup", "dataEncryption", "graphicsAcceleration", "push", "telephony", "telephonyMms", "telephonySms", "autoRotation", "visionImageRecognition", "visionQrcodeGeneration", "visionQrcodeRecognition", "visionFaceRecognition", "secureElement", "profile"];
var SystemInfoStorageUnit = ["type", "capacity", "availableCapacity", "isRemovable"];
var systemInfoPropertyId = ["BATTERY", "CPU", "STORAGE", "DISPLAY", "DEVICE_ORIENTATION", "PERIPHERAL"];
var SYSTEM_INFO_DEVICE_ORIENTATION_STATUS = ["PORTRAIT_PRIMARY", "PORTRAIT_SECONDARY", "LANDSCAPE_PRIMARY", "LANDSCAPE_SECONDARY"];
var PLATFROM_CORE_CPU_ARCH = ["armv6", "armv7", "x86", "llvm"];
var PLATFROM_CORE_FPU_ARCH = ["vfpv3", "sse2", "sse3", "ssse3"];
var SYSTEM_INFO_PROFILE = ["MOBILE_FULL", "MOBILE_WEB", "WEARABLE"];

var INVALID_VALUES_ERR = {
    name: "InvalidValuesError"
};
var TYPE_MISMATCH_ERR = {
    name: "TypeMismatchError"
};

function assert_value_in_range(minValue, maxValue, attributeValue, description) {
    var expected, epsilon;

    assert_type(attributeValue, "number", "attributeValue is not a number.");

    epsilon = Math.abs((Number(maxValue) - Number(minValue)) / 2);
    expected = Number(maxValue) - epsilon;
    assert_approx_equals(attributeValue, expected, epsilon, description)
}

function SystemInfo_getPropertyValue_exist() {
//==== TEST: SystemInfo_getPropertyValue_exist
//==== LABEL Check if method getPropertyValue of SystemInfo exists
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getPropertyValue M
//==== TEST_CRITERIA ME
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
test(function () {
    assert_true("getPropertyValue" in tizen.systeminfo, "No getPropertyValue method in tizen.systeminfo.");
    check_method_exists(tizen.systeminfo, "getPropertyValue");
}, 'SystemInfo_getPropertyValue_exist');

}

function SystemInfo_getPropertyValue() {
//==== TEST: SystemInfo_getPropertyValue
//==== LABEL Check method getPropertyValue of SystemInfo
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getPropertyValue M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MMINA MR
setup({timeout: 90000});

var t = async_test('SystemInfo_getPropertyValue', {timeout: 90000}), getPropertyValueSuccess, retValue = null;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (battery) {
        assert_not_equals(battery.level, null, "Fail to getPropertyValue");
        assert_equals(retValue, undefined, "getPropertyValue returns wrong value");

        t.done();
    });
    retValue = tizen.systeminfo.getPropertyValue("BATTERY", getPropertyValueSuccess);
});

}

function SystemInfo_addPropertyValueChangeListener_exist() {
//==== TEST: SystemInfo_addPropertyValueChangeListener_exist
//==== LABEL Check if method addPropertyValueChangeListener of SystemInfo exists
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:addPropertyValueChangeListener M
//==== TEST_CRITERIA ME
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
test(function () {
    assert_true("addPropertyValueChangeListener" in tizen.systeminfo,
        "tizen.systeminfo.addPropertyValueChangeListener method exists");
    check_method_exists(tizen.systeminfo, "addPropertyValueChangeListener");
}, 'SystemInfo_addPropertyValueChangeListener_exist');

}

function SystemInfo_SystemInfoObject_systeminfo_attribute() {
//==== TEST: SystemInfo_SystemInfoObject_systeminfo_attribute
//==== LABEL Check if SystemInfo exists and implements methods
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:SystemInfo U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    assert_equals(typeof (tizen), "object", "Checking tizen object");
    assert_true(typeof (tizen.systeminfo) === "object", "Checking Systeminfo object");
    assert_equals(typeof (tizen.systeminfo.getCapabilities), "function", "Checking type of getCapabilities");
    assert_equals(typeof (tizen.systeminfo.getPropertyValue), "function", "Checking type of getPropertyValue");
    assert_equals(typeof (tizen.systeminfo.addPropertyValueChangeListener), "function", "Checking type of addPropertyValueChangeListener");
    assert_equals(typeof (tizen.systeminfo.removePropertyValueChangeListener), "function", "Checking type of removePropertyValueChangeListener");
}, 'SystemInfo_SystemInfoObject_systeminfo_attribute');

}

function SystemInfoBattery_notexist() {
//==== TEST: SystemInfoBattery_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoBattery exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoBattery:SystemInfoBattery U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfoBattery");
}, 'SystemInfoBattery_notexist');

}

function SystemInfoBuild_notexist() {
//==== TEST: SystemInfoBuild_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoBuild exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoBuild:SystemInfoBuild U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfoBuild");
}, 'SystemInfoBuild_notexist');

}

function SystemInfoCpu_notexist() {
//==== TEST: SystemInfoCpu_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoCpu exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoCpu:SystemInfoCpu U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfoCpu");
}, 'SystemInfoCpu_notexist');

}

function SystemInfoDeviceCapability_notexist() {
//==== TEST: SystemInfoDeviceCapability_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoDeviceCapability exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfoDeviceCapability");
}, 'SystemInfoDeviceCapability_notexist');

}

function SystemInfoDeviceOrientation_notexist() {
//==== TEST: SystemInfoDeviceOrientation_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoDeviceOrientation exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceOrientation:SystemInfoDeviceOrientation U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfoDeviceOrientation");
}, 'SystemInfoDeviceOrientation_notexist');

}

function SystemInfoDisplay_notexist() {
//==== TEST: SystemInfoDisplay_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoDisplay exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDisplay:SystemInfoDisplay U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfoDisplay");
}, 'SystemInfoDisplay_notexist');

}

function SystemInfoObject_notexist() {
//==== TEST: SystemInfoObject_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoObject exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoObject:SystemInfoObject U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfoObject");
}, 'SystemInfoObject_notexist');

}

function SystemInfoPeripheral_notexist() {
//==== TEST: SystemInfoPeripheral_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoPeripheral exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPeripheral:SystemInfoPeripheral U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfoPeripheral");
}, 'SystemInfoPeripheral_notexist');

}

function SystemInfoPropertySuccessCallback_notexist() {
//==== TEST: SystemInfoPropertySuccessCallback_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoPropertySuccessCallback exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPropertySuccessCallback:SystemInfoPropertySuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA CBNIO

test(function () {
    check_no_interface_object("SystemInfoPropertySuccessCallback");
}, 'SystemInfoPropertySuccessCallback_notexist');

}

function SystemInfoProperty_notexist() {
//==== TEST: SystemInfoProperty_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoProperty exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoProperty:SystemInfoProperty U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfoProperty");
}, 'SystemInfoProperty_notexist');

}

function SystemInfoStorageUnit_notexist() {
//==== TEST: SystemInfoStorageUnit_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoStorageUnit exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoStorageUnit:SystemInfoStorageUnit U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO


test(function () {
    check_no_interface_object("SystemInfoStorageUnit");
}, 'SystemInfoStorageUnit_notexist');

}

function SystemInfoStorage_notexist() {
//==== TEST: SystemInfoStorage_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfoStorage exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoStorage:SystemInfoStorage U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfoStorage");
}, 'SystemInfoStorage_notexist');

}

function SystemInfo_notexist() {
//==== TEST: SystemInfo_notexist
//==== PRIORITY P3
//==== LABEL Check if interface SystemInfo exists, it should not.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:SystemInfo U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("SystemInfo");
}, 'SystemInfo_notexist');

}

function SystemInfoDeviceCapability_bluetooth_attribute() {
//==== TEST: SystemInfoDeviceCapability_bluetooth_attribute
//==== LABEL Check if attribute bluetooth of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:bluetooth A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "bluetooth", "SystemInfoDeviceCapability does not own bluetooth property.");
    check_readonly(deviceCapabilities, "bluetooth", deviceCapabilities.bluetooth, "boolean", null);
}, 'SystemInfoDeviceCapability_bluetooth_attribute');

}

function SystemInfoDeviceCapability_extend() {
//==== TEST: SystemInfoDeviceCapability_extend
//==== PRIORITY P3
//==== LABEL Check if instance of interface SystemInfoDeviceCapability can be extended with new property
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA OBX
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    check_extensibility(deviceCapabilities);
}, 'SystemInfoDeviceCapability_extend');

}

function SystemInfoDeviceCapability_nfc_attribute() {
//==== TEST: SystemInfoDeviceCapability_nfc_attribute
//==== LABEL Check if attribute nfc of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:nfc A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "nfc",
        "SystemInfoDeviceCapability does not own nfc property.");
    check_readonly(deviceCapabilities, "nfc", deviceCapabilities.nfc,
        "boolean", null);
}, 'SystemInfoDeviceCapability_nfc_attribute');

}

function SystemInfoDeviceCapability_multiTouchCount_attribute() {
//==== TEST: SystemInfoDeviceCapability_multiTouchCount_attribute
//==== LABEL Check if attribute multiTouchCount of SystemInfoDeviceCapability exists, has type unsigned short and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:multiTouchCount A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "multiTouchCount",
        "SystemInfoDeviceCapability does not own multiTouchCount property.");
    check_readonly(deviceCapabilities, "multiTouchCount",
        deviceCapabilities.multiTouchCount, "number", null);
    assert_true(deviceCapabilities.multiTouchCount > 0, "multiTouchCount check");
}, 'SystemInfoDeviceCapability_multiTouchCount_attribute');

}

function SystemInfoDeviceCapability_inputKeyboard_attribute() {
//==== TEST: SystemInfoDeviceCapability_inputKeyboard_attribute
//==== LABEL Check if attribute inputKeyboard of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:inputKeyboard A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "inputKeyboard",
        "SystemInfoDeviceCapability does not own inputKeyboard property.");
    check_readonly(deviceCapabilities, "inputKeyboard",
        deviceCapabilities.inputKeyboard, "boolean", null);
}, 'SystemInfoDeviceCapability_inputKeyboard_attribute');

}

function SystemInfoDeviceCapability_wifi_attribute() {
//==== TEST: SystemInfoDeviceCapability_wifi_attribute
//==== LABEL Check if attribute wifi of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:wifi A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "wifi",
        "SystemInfoDeviceCapability does not own wifi property.");
    check_readonly(deviceCapabilities, "wifi", deviceCapabilities.wifi,
        "boolean", null);
}, 'SystemInfoDeviceCapability_wifi_attribute');

}

function SystemInfoDeviceCapability_wifiDirect_attribute() {
//==== TEST: SystemInfoDeviceCapability_wifiDirect_attribute
//==== LABEL Check if attribute wifiDirect of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:wifiDirect A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "wifiDirect",
        "SystemInfoDeviceCapability does not own wifiDirect property.");
    check_readonly(deviceCapabilities, "wifiDirect",
        deviceCapabilities.wifiDirect, "boolean", null);
}, 'SystemInfoDeviceCapability_wifiDirect_attribute');

}

function SystemInfoDeviceCapability_fmRadio_attribute() {
//==== TEST: SystemInfoDeviceCapability_fmRadio_attribute
//==== LABEL Check if attribute fmRadio of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:fmRadio A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "fmRadio",
        "SystemInfoDeviceCapability does not own fmRadio property.");
    check_readonly(deviceCapabilities, "fmRadio",
        deviceCapabilities.fmRadio, "boolean", null);
}, 'SystemInfoDeviceCapability_fmRadio_attribute');

}

function SystemInfoDeviceCapability_openglesVersion1_1_attribute() {
//==== TEST: SystemInfoDeviceCapability_openglesVersion1_1_attribute
//==== LABEL Check if attribute openglesVersion1_1 of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:openglesVersion1_1 A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "openglesVersion1_1",
        "SystemInfoDeviceCapability does not own openglesVersion1_1 property.");
    check_readonly(deviceCapabilities, "openglesVersion1_1",
        deviceCapabilities.openglesVersion1_1, "boolean", null);
}, 'SystemInfoDeviceCapability_openglesVersion1_1_attribute');

}

function SystemInfoDeviceCapability_openglesVersion2_0_attribute() {
//==== TEST: SystemInfoDeviceCapability_openglesVersion2_0_attribute
//==== LABEL Check if attribute openglesVersion2_0 of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:openglesVersion2_0 A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "openglesVersion2_0",
        "SystemInfoDeviceCapability does not own openglesVersion2_0 property.");
    check_readonly(deviceCapabilities, "openglesVersion2_0",
        deviceCapabilities.openglesVersion2_0, "boolean", null);
}, 'SystemInfoDeviceCapability_openglesVersion2_0_attribute');

}

function SystemInfoDeviceCapability_platformName_attribute() {
//==== TEST: SystemInfoDeviceCapability_platformName_attribute
//==== LABEL Check if attribute platformName of SystemInfoDeviceCapability exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:platformName A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "platformName",
        "SystemInfoDeviceCapability does not own platformName property.");
    check_readonly(deviceCapabilities, "platformName",
        deviceCapabilities.platformName, "string", null);
    assert_true(deviceCapabilities.platformName !== "", "null check");
    assert_equals(deviceCapabilities.platformName, "Tizen",
        "platformName is not Tizen");
}, 'SystemInfoDeviceCapability_platformName_attribute');

}

function SystemInfoDeviceCapability_platformVersion_attribute() {
//==== TEST: SystemInfoDeviceCapability_platformVersion_attribute
//==== LABEL Check if attribute platformVersion of SystemInfoDeviceCapability exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:platformVersion A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "platformVersion",
        "SystemInfoDeviceCapability does not own platformVersion property.");
    check_readonly(deviceCapabilities, "platformVersion",
        deviceCapabilities.platformVersion, "string", null);
    assert_true(deviceCapabilities.platformVersion !== "", "null check");
    assert_regexp_match(deviceCapabilities.platformVersion, /2\.3\.[0-9]+/, "platformVersion has a bad value");
}, 'SystemInfoDeviceCapability_platformVersion_attribute');

}

function SystemInfoDeviceCapability_webApiVersion_attribute() {
//==== TEST: SystemInfoDeviceCapability_webApiVersion_attribute
//==== LABEL Check if attribute webApiVersion of SystemInfoDeviceCapability exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:webApiVersion A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "webApiVersion",
        "SystemInfoDeviceCapability does not own webApiVersion property.");
    check_readonly(deviceCapabilities, "webApiVersion",
        deviceCapabilities.webApiVersion, "string", null);
    assert_true(deviceCapabilities.webApiVersion !== "", "null check");
    assert_equals(deviceCapabilities.webApiVersion, "2.3.1",
        "webApiVersion is not 2.3.1");
}, 'SystemInfoDeviceCapability_webApiVersion_attribute');

}

function SystemInfoDeviceCapability_accelerometer_attribute() {
//==== TEST: SystemInfoDeviceCapability_accelerometer_attribute
//==== LABEL Check if attribute accelerometer of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:accelerometer A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "accelerometer",
        "SystemInfoDeviceCapability does not own accelerometer property.");
    check_readonly(deviceCapabilities, "accelerometer",
        deviceCapabilities.accelerometer, "boolean", null);
}, 'SystemInfoDeviceCapability_accelerometer_attribute');

}

function SystemInfoDeviceCapability_barometer_attribute() {
//==== TEST: SystemInfoDeviceCapability_barometer_attribute
//==== LABEL Check if attribute barometer of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:barometer A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "barometer",
        "SystemInfoDeviceCapability does not own barometer property.");
    check_readonly(deviceCapabilities, "barometer",
        deviceCapabilities.barometer, "boolean", null);
}, 'SystemInfoDeviceCapability_barometer_attribute');

}

function SystemInfoDeviceCapability_cameraBackFlash_attribute() {
//==== TEST: SystemInfoDeviceCapability_cameraBackFlash_attribute
//==== LABEL Check if attribute cameraBackFlash of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:cameraBackFlash A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "cameraBackFlash",
        "SystemInfoDeviceCapability does not own cameraBackFlash property.");
    check_readonly(deviceCapabilities, "cameraBackFlash",
        deviceCapabilities.cameraBackFlash, "boolean", null);
}, 'SystemInfoDeviceCapability_cameraBackFlash_attribute');

}

function SystemInfoDeviceCapability_cameraBack_attribute() {
//==== TEST: SystemInfoDeviceCapability_cameraBack_attribute
//==== LABEL Check if attribute cameraBack of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:cameraBack A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "cameraBack",
        "SystemInfoDeviceCapability does not own cameraBack property.");
    check_readonly(deviceCapabilities, "cameraBack",
        deviceCapabilities.cameraBack, "boolean", null);
}, 'SystemInfoDeviceCapability_cameraBack_attribute');

}

function SystemInfoDeviceCapability_cameraFrontFlash_attribute() {
//==== TEST: SystemInfoDeviceCapability_cameraFrontFlash_attribute
//==== LABEL Check if attribute cameraFrontFlash of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:cameraFrontFlash A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "cameraFrontFlash",
        "SystemInfoDeviceCapability does not own cameraFrontFlash property.");
    check_readonly(deviceCapabilities, "cameraFrontFlash",
        deviceCapabilities.cameraFrontFlash, "boolean", null);
}, 'SystemInfoDeviceCapability_cameraFrontFlash_attribute');

}

function SystemInfoDeviceCapability_cameraFront_attribute() {
//==== TEST: SystemInfoDeviceCapability_cameraFront_attribute
//==== LABEL Check if attribute cameraFront of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:cameraFront A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "cameraFront",
        "SystemInfoDeviceCapability does not own cameraFront property.");
    check_readonly(deviceCapabilities, "cameraFront",
        deviceCapabilities.cameraFront, "boolean", null);
}, 'SystemInfoDeviceCapability_cameraFront_attribute');

}

function SystemInfoDeviceCapability_gyroscope_attribute() {
//==== TEST: SystemInfoDeviceCapability_gyroscope_attribute
//==== LABEL Check if attribute gyroscope of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:gyroscope A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "gyroscope",
        "SystemInfoDeviceCapability does not own gyroscope property.");
    check_readonly(deviceCapabilities, "gyroscope",
        deviceCapabilities.gyroscope, "boolean", null);
}, 'SystemInfoDeviceCapability_gyroscope_attribute');

}

function SystemInfoDeviceCapability_locationGps_attribute() {
//==== TEST: SystemInfoDeviceCapability_locationGps_attribute
//==== LABEL Check if attribute locationGps of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:locationGps A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "locationGps",
        "SystemInfoDeviceCapability does not own locationGps property.");
    check_readonly(deviceCapabilities, "locationGps",
        deviceCapabilities.locationGps, "boolean", null);
}, 'SystemInfoDeviceCapability_locationGps_attribute');

}

function SystemInfoDeviceCapability_locationWps_attribute() {
//==== TEST: SystemInfoDeviceCapability_locationWps_attribute
//==== LABEL Check if attribute locationWps of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:locationWps A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "locationWps",
        "SystemInfoDeviceCapability does not own locationWps property.");
    check_readonly(deviceCapabilities, "locationWps",
        deviceCapabilities.locationWps, "boolean", null);
}, 'SystemInfoDeviceCapability_locationWps_attribute');

}

function SystemInfoDeviceCapability_location_attribute() {
//==== TEST: SystemInfoDeviceCapability_location_attribute
//==== LABEL Check if attribute location of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:location A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "location",
        "SystemInfoDeviceCapability does not own location property.");
    check_readonly(deviceCapabilities, "location",
        deviceCapabilities.location, "boolean", null);
}, 'SystemInfoDeviceCapability_location_attribute');

}

function SystemInfoDeviceCapability_magnetometer_attribute() {
//==== TEST: SystemInfoDeviceCapability_magnetometer_attribute
//==== LABEL Check if attribute magnetometer of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:magnetometer A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "magnetometer",
        "SystemInfoDeviceCapability does not own magnetometer property.");
    check_readonly(deviceCapabilities, "magnetometer",
        deviceCapabilities.magnetometer, "boolean", null);
}, 'SystemInfoDeviceCapability_magnetometer_attribute');

}

function SystemInfoDeviceCapability_microphone_attribute() {
//==== TEST: SystemInfoDeviceCapability_microphone_attribute
//==== LABEL Check if attribute microphone of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:microphone A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "microphone",
        "SystemInfoDeviceCapability does not own microphone property.");
    check_readonly(deviceCapabilities, "microphone",
        deviceCapabilities.microphone, "boolean", null);
}, 'SystemInfoDeviceCapability_microphone_attribute');

}

function SystemInfoDeviceCapability_platformCoreCpuArch_attribute() {
//==== TEST: SystemInfoDeviceCapability_platformCoreCpuArch_attribute
//==== LABEL Check if attribute platformCoreCpuArch of SystemInfoDeviceCapability exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:platformCoreCpuArch A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO AVL

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "platformCoreCpuArch",
        "SystemInfoDeviceCapability does not own platformCoreCpuArch property.");
    check_readonly(deviceCapabilities, "platformCoreCpuArch",
        deviceCapabilities.platformCoreCpuArch, "string", null);
    assert_true(deviceCapabilities.platformCoreCpuArch !== "", "null check");
    assert_in_array(deviceCapabilities.platformCoreCpuArch,
        PLATFROM_CORE_CPU_ARCH, "platformCoreFpuArch isn't value of PlatformCoreFpuArch");
}, 'SystemInfoDeviceCapability_platformCoreCpuArch_attribute');

}

function SystemInfoDeviceCapability_platformCoreFpuArch_attribute() {
//==== TEST: SystemInfoDeviceCapability_platformCoreFpuArch_attribute
//==== LABEL Check if attribute platformCoreFpuArch of SystemInfoDeviceCapability exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:platformCoreFpuArch A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO AVL

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "platformCoreFpuArch",
        "SystemInfoDeviceCapability does not own platformCoreFpuArch property.");
    check_readonly(deviceCapabilities, "platformCoreFpuArch",
        deviceCapabilities.platformCoreFpuArch, "string", null);
    assert_true(deviceCapabilities.platformCoreFpuArch !== "", "null check");
    assert_in_array(deviceCapabilities.platformCoreFpuArch,
        PLATFROM_CORE_FPU_ARCH, "platformCoreFpuArch isn't value of PlatformCoreFpuArch");
}, 'SystemInfoDeviceCapability_platformCoreFpuArch_attribute');

}

function SystemInfoDeviceCapability_proximity_attribute() {
//==== TEST: SystemInfoDeviceCapability_proximity_attribute
//==== LABEL Check if attribute proximity of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:proximity A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "proximity",
        "SystemInfoDeviceCapability does not own proximity property.");
    check_readonly(deviceCapabilities, "proximity",
        deviceCapabilities.proximity, "boolean", null);
}, 'SystemInfoDeviceCapability_proximity_attribute');

}

function SystemInfoDeviceCapability_screenOutputHdmi_attribute() {
//==== TEST: SystemInfoDeviceCapability_screenOutputHdmi_attribute
//==== LABEL Check if attribute screenOutputHdmi of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:screenOutputHdmi A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "screenOutputHdmi",
        "SystemInfoDeviceCapability does not own screenOutputHdmi property.");
    check_readonly(deviceCapabilities, "screenOutputHdmi",
        deviceCapabilities.screenOutputHdmi, "boolean", null);
}, 'SystemInfoDeviceCapability_screenOutputHdmi_attribute');

}

function SystemInfoDeviceCapability_screenOutputRca_attribute() {
//==== TEST: SystemInfoDeviceCapability_screenOutputRca_attribute
//==== LABEL Check if attribute screenOutputRca of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:screenOutputRca A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "screenOutputRca",
        "SystemInfoDeviceCapability does not own screenOutputRca property.");
    check_readonly(deviceCapabilities, "screenOutputRca",
        deviceCapabilities.screenOutputRca, "boolean", null);
}, 'SystemInfoDeviceCapability_screenOutputRca_attribute');

}

function SystemInfoDeviceCapability_sipVoip_attribute() {
//==== TEST: SystemInfoDeviceCapability_sipVoip_attribute
//==== LABEL Check if attribute sipVoip of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:sipVoip A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "sipVoip",
        "SystemInfoDeviceCapability does not own sipVoip property.");
    check_readonly(deviceCapabilities, "sipVoip",
        deviceCapabilities.sipVoip, "boolean", null);
}, 'SystemInfoDeviceCapability_sipVoip_attribute');

}

function SystemInfoDeviceCapability_speechRecognition_attribute() {
//==== TEST: SystemInfoDeviceCapability_speechRecognition_attribute
//==== LABEL Check if attribute speechRecognition of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:speechRecognition A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "speechRecognition",
        "SystemInfoDeviceCapability does not own speechRecognition property.");
    check_readonly(deviceCapabilities, "speechRecognition",
        deviceCapabilities.speechRecognition, "boolean", null);
}, 'SystemInfoDeviceCapability_speechRecognition_attribute');

}

function SystemInfoDeviceCapability_usbAccessory_attribute() {
//==== TEST: SystemInfoDeviceCapability_usbAccessory_attribute
//==== LABEL Check if attribute usbAccessory of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:usbAccessory A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "usbAccessory",
        "SystemInfoDeviceCapability does not own usbAccessory property.");
    check_readonly(deviceCapabilities, "usbAccessory",
        deviceCapabilities.usbAccessory, "boolean", null);
}, 'SystemInfoDeviceCapability_usbAccessory_attribute');

}

function SystemInfoDeviceCapability_usbHost_attribute() {
//==== TEST: SystemInfoDeviceCapability_usbHost_attribute
//==== LABEL Check if attribute usbHost of SystemInfoDeviceCapability exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:usbHost A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "usbHost",
        "SystemInfoDeviceCapability does not own usbHost property.");
    check_readonly(deviceCapabilities, "usbHost",
        deviceCapabilities.usbHost, "boolean", null);
}, 'SystemInfoDeviceCapability_usbHost_attribute');

}

function SystemInfoBattery_extend() {
//==== TEST: SystemInfoBattery_extend
//==== LABEL Check if SystemInfoBattery can have new property added
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoBattery:SystemInfoBattery U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA OBX
//==== PRIORITY P3
setup({timeout: 90000});

var t = async_test('SystemInfoBattery_extend', {timeout: 90000}), getPropertyValueSuccess,
    getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        check_extensibility(property);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name:" +
            error.message + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("BATTERY", getPropertyValueSuccess, getPropertyValueError);
});

}

function SystemInfoBattery_level_attribute() {
//==== TEST: SystemInfoBattery_level_attribute
//==== LABEL Check attribute level in SystemInfoBattery
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoBattery:level A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO AVL
setup({timeout: 90000});

var t = async_test('SystemInfoBattery_level_attribute', {timeout: 90000}), getPropertyValueSuccess,
    getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "level", "BATTERY does not own level property.");
        check_readonly(property, "level", property.level, "number", null);
        assert_value_in_range(0, 1, property.level,
            "Remaining level of an internal battery MUST be between 0 and 1.");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.message + ", msg: " + error.name);
    });

    tizen.systeminfo.getPropertyValue("BATTERY", getPropertyValueSuccess, getPropertyValueError);
});

}

function SystemInfoBattery_isCharging_attribute() {
//==== TEST: SystemInfoBattery_isCharging_attribute
//==== LABEL Check attribute isCharging in SystemInfoBattery
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoBattery:isCharging A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('SystemInfoBattery_isCharging_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "isCharging", "BATTERY doesn't own isCharging property.");
        check_readonly(property, "isCharging", property.isCharging, "boolean", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.message + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("BATTERY", getPropertyValueSuccess, getPropertyValueError);
});

}

function SystemInfo_extend() {
//==== TEST: SystemInfo_extend
//==== PRIORITY P3
//==== LABEL Check if instance of interface SystemInfo can be extended with new property
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:SystemInfo U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA OBX

test(function () {
    check_extensibility(tizen.systeminfo);
}, 'SystemInfo_extend');

}

function SystemInfo_getCapabilities_exist() {
//==== TEST: SystemInfo_getCapabilities_exist
//==== LABEL Check if method getCapabilities of SystemInfo exists
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getCapabilities M
//==== TEST_CRITERIA ME
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
test(function () {
    assert_true("getCapabilities" in tizen.systeminfo, "No getCapabilities method in tizen.systeminfo.");
    check_method_exists(tizen.systeminfo, "getCapabilities");
}, 'SystemInfo_getCapabilities_exist');

}

function SystemInfo_getCapabilities() {
//==== TEST: SystemInfo_getCapabilities
//==== LABEL Check method getCapabilities of SystemInfo
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getCapabilities M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MNA MR

test(function () {
    var deviceCapabilities = tizen.systeminfo.getCapabilities(), i;
    for(i = 0; i < SystemInfoDeviceCapability.length; i++) {
        assert_true(SystemInfoDeviceCapability[i] in deviceCapabilities,
            "There is no "+SystemInfoDeviceCapability[i]+
            " attribute in tizen.systeminfo.getCapabilities().");
    }
}, 'SystemInfo_getCapabilities');

}

function SystemInfo_getCapabilities_extra_argument() {
//==== TEST: SystemInfo_getCapabilities_extra_argument
//==== LABEL Check if method getCapabilities of SystemInfo accepts extra argument
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getCapabilities M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MNAEX

test(function () {
    checkExtraArgument(tizen.systeminfo, "getCapabilities");
}, 'SystemInfo_getCapabilities_extra_argument');

}

function SystemInfoDisplay_brightness_attribute() {
//==== TEST: SystemInfoDisplay_brightness_attribute
//==== LABEL Check if attribute brightness of SystemInfoDisplay exists, has type Number and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDisplay:brightness A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO AVL

setup({timeout: 90000});

var t = async_test('SystemInfoDisplay_brightness_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "brightness",
            "SystemInfoDisplay does not own brightness property.");
        check_readonly(property, "brightness", property.brightness,
            "number", null);
        assert_value_in_range(0, 1, property.brightness, "brightness MUST be between 0 and 1.");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DISPLAY", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoDisplay_dotsPerInchHeight_attribute() {
//==== TEST: SystemInfoDisplay_dotsPerInchHeight_attribute
//==== LABEL Check if attribute dotsPerInchHeight of SystemInfoDisplay exists, has type Number and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDisplay:dotsPerInchHeight A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoDisplay_dotsPerInchHeight_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "dotsPerInchHeight",
            "SystemInfoDisplay does not own dotsPerInchHeight property.");
        check_readonly(property, "dotsPerInchHeight",
            property.dotsPerInchHeight, "number", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DISPLAY", getPropertyValueSuccess,
        getPropertyValueError);
}, "SystemInfoDisplay_dotsPerInchHeight_attribute");

}

function SystemInfoDisplay_dotsPerInchWidth_attribute() {
//==== TEST: SystemInfoDisplay_dotsPerInchWidth_attribute
//==== LABEL Check if attribute dotsPerInchWidth of SystemInfoDisplay exists, has type Number and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDisplay:dotsPerInchWidth A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoDisplay_dotsPerInchWidth_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "dotsPerInchWidth", "SystemInfoDisplay does not own dotsPerInchWidth property.");
        check_readonly(property, "dotsPerInchWidth", property.dotsPerInchWidth, "number", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DISPLAY", getPropertyValueSuccess,
        getPropertyValueError);
}, "SystemInfoDisplay_dotsPerInchWidth_attribute");

}

function SystemInfoDisplay_physicalHeight_attribute() {
//==== TEST: SystemInfoDisplay_physicalHeight_attribute
//==== LABEL Check if attribute physicalHeight of SystemInfoDisplay exists, has type Number and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDisplay:physicalHeight A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoDisplay_physicalHeight_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "physicalHeight",
            "SystemInfoDisplay does not own physicalHeight property.");
        check_readonly(property, "physicalHeight",
            property.physicalHeight, "number", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DISPLAY", getPropertyValueSuccess,
        getPropertyValueError);
}, "SystemInfoDisplay_physicalHeight_attribute");

}

function SystemInfoDisplay_physicalWidth_attribute() {
//==== TEST: SystemInfoDisplay_physicalWidth_attribute
//==== LABEL Check if attribute physicalWidth of SystemInfoDisplay exists, has type Number and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDisplay:physicalWidth A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoDisplay_physicalWidth_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "physicalWidth", "SystemInfoDisplay does not own physicalWidth property.");
        check_readonly(property, "physicalWidth", property.physicalWidth, "number", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DISPLAY", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoDisplay_resolutionHeight_attribute() {
//==== TEST: SystemInfoDisplay_resolutionHeight_attribute
//==== LABEL Check if attribute resolutionHeight of SystemInfoDisplay exists, has type Number and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDisplay:resolutionHeight A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoDisplay_resolutionHeight_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "resolutionHeight",
            "SystemInfoDisplay does not own resolutionHeight property.");
        check_readonly(property, "resolutionHeight", property.resolutionHeight,
            "number", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DISPLAY", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoDisplay_resolutionWidth_attribute() {
//==== TEST: SystemInfoDisplay_resolutionWidth_attribute
//==== LABEL Check if attribute resolutionWidth of SystemInfoDisplay exists, has type Number and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDisplay:resolutionWidth A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoDisplay_resolutionWidth_attribute', {timeout: 90000}), getPropertyValueSuccess,
    getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "resolutionWidth", "SystemInfoDisplay does not own resolutionWidth property.");
        check_readonly(property, "resolutionWidth", property.resolutionWidth, "number", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DISPLAY", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoPeripheral_isVideoOutputOn_attribute() {
//==== TEST: SystemInfoPeripheral_isVideoOutputOn_attribute
//==== LABEL Check if attribute isVideoOutputOn of SystemInfoPeripheral exists, has type Boolean and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPeripheral:isVideoOutputOn A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoPeripheral_isVideoOutputOn_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "isVideoOutputOn",
            "SystemInfoPeripheral does not own isVideoOutputOn property.");
        check_readonly(property, "isVideoOutputOn",
            property.isVideoOutputOn, "boolean", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("PERIPHERAL", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoCpu_load_attribute() {
//==== TEST: SystemInfoCpu_load_attribute
//==== LABEL Check if attribute load of SystemInfoCpu exists, has type Number and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoCpu:load A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO AVL
setup({timeout: 90000});

var t = async_test('SystemInfoCpu_load_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "load", "SystemInfoCpu does not own load property.");
        check_readonly(property, "load", property.load, "number", null);
        assert_value_in_range(0, 1, property.load,
            "An attribute to indicate the current CPU load MUST be between 0 and 1.");
        t.done();
    });

    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("CPU", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoStorage_units_attribute() {
//==== TEST: SystemInfoStorage_units_attribute
//==== LABEL Check if attribute units of SystemInfoStorage exists, has type Array and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoStorage:units A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
//==== ONLOAD_DELAY 90
var t = async_test('SystemInfoStorage_units_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError, i, j, units;
setup({timeout: 90000});
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "units",
            "SystemInfoStorage does not own units property.");
        assert_true(Array.isArray(property.units),
            "SystemInfoStorage_units is not an array");

        assert_true(property.units.length > 0, "No available units.");

        for(i = 0; i < property.units.length; i++) {
            for(j = 0; j < SystemInfoStorageUnit.length; j++) {
                assert_own_property(property.units[i], SystemInfoStorageUnit[j],
                    "storage unit does not own " + SystemInfoStorageUnit[j] +
                    " property.");
            }
        }

        units = property.units;
        property.units = [];
        for(i = 0; i < units.length; i++) {
            for(j = 0; j < SystemInfoStorageUnit.length; j++) {
                assert_equals(property.units[i][SystemInfoStorageUnit[j]],
                    units[i][SystemInfoStorageUnit[j]],
                    "units is not a read-only on property " + SystemInfoStorageUnit[j] + " at unit[" + i + "]");
            }
        }
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoDeviceOrientation_status_attribute() {
//==== TEST: SystemInfoDeviceOrientation_status_attribute
//==== LABEL Check status attribute of SystemInfoDeviceOrientation
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceOrientation:status A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoDeviceOrientation_status_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "status", "DEVICE_ORIENTATION doesn't own status property.");
        check_readonly(property, "status", property.status, "string", null);
        assert_in_array(property.status, SYSTEM_INFO_DEVICE_ORIENTATION_STATUS,
            "status isn't type of SystemInfoDeviceOrientationStatus");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DEVICE_ORIENTATION",
        getPropertyValueSuccess, getPropertyValueError);
}, "SystemInfoDeviceOrientation_status_attribute");

}

function SystemInfoCpu_extend() {
//==== TEST: SystemInfoCpu_extend
//==== PRIORITY P3
//==== LABEL Check if instance of interface SystemInfoCpu can be extended with new property
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoCpu:SystemInfoCpu U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA OBX
setup({timeout: 90000});

var t = async_test('SystemInfoCpu_extend', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        check_extensibility(property);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
           error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("CPU", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoDisplay_extend() {
//==== TEST: SystemInfoDisplay_extend
//==== PRIORITY P3
//==== LABEL Check if instance of interface SystemInfoDisplay can be extended with new property
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDisplay:SystemInfoDisplay U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA OBX

setup({timeout: 90000});

var t = async_test('SystemInfoDisplay_extend', {timeout: 90000}), getPropertyValueSuccess,
    getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        check_extensibility(property);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DISPLAY", getPropertyValueSuccess,
        getPropertyValueError);
}, "SystemInfoDisplay_extend");

}

function SystemInfoPeripheral_extend() {
//==== TEST: SystemInfoPeripheral_extend
//==== PRIORITY P3
//==== LABEL Check if instance of interface SystemInfoPeripheral can be extended with new property
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPeripheral:SystemInfoPeripheral U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA OBX

setup({timeout: 90000});

var t = async_test('SystemInfoPeripheral_extend', {timeout: 90000}), getPropertyValueSuccess,
    getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        check_extensibility(property);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("PERIPHERAL", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoStorageUnit_availableCapacity_attribute() {
//==== TEST: SystemInfoStorageUnit_availableCapacity_attribute
//==== LABEL Check if attribute availableCapacity of SystemInfoStorageUnit exists, has type Number and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoStorageUnit:availableCapacity A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoStorageUnit_availableCapacity_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "units", "No units property.");
        assert_true(Array.isArray(property.units),
            "SystemInfoStorage_units is not an array");
        assert_true(property.units.length > 0, "No available units.");
        assert_own_property(property.units[0], "availableCapacity", "SystemInfoStorageUnit does not own availableCapacity property.");
        check_readonly(property.units[0], "availableCapacity", property.units[0].availableCapacity, "number", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoStorageUnit_capacity_attribute() {
//==== TEST: SystemInfoStorageUnit_capacity_attribute
//==== LABEL Check if attribute capacity of SystemInfoStorageUnit exists, has type Number and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoStorageUnit:capacity A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoStorageUnit_capacity_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "units", "No units property.");
        assert_true(Array.isArray(property.units),
            "SystemInfoStorage_units is not an array");
        assert_true(property.units.length > 0, "No available units.");

        assert_own_property(property.units[0], "capacity",
            "SystemInfoStorageUnit does not own capacity property.units[0].");
        check_readonly(property.units[0], "capacity", property.units[0].capacity, "number", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoStorageUnit_isRemovable_attribute() {
//==== TEST: SystemInfoStorageUnit_isRemovable_attribute
//==== LABEL Check if attribute isRemovable of SystemInfoStorageUnit exists, has type Boolean and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoStorageUnit:isRemovable A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoStorageUnit_isRemovable_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "units", "No units property.");
        assert_true(Array.isArray(property.units),
            "SystemInfoStorage_units is not an array");
        assert_true(property.units.length > 0, "No available units.");
        assert_own_property(property.units[0], "isRemovable", "SystemInfoStorageUnit does not own isRemovable property.");
        check_readonly(property.units[0], "isRemovable", property.units[0].isRemovable, "boolean", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoStorageUnit_isRemoveable_attribute() {
//==== TEST: SystemInfoStorageUnit_isRemoveable_attribute
//==== LABEL Check if attribute isRemoveable of SystemInfoStorageUnit exists, has type Boolean and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoStorageUnit:isRemoveable A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoStorageUnit_isRemoveable_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "units", "No units property.");
        assert_true(Array.isArray(property.units),
            "SystemInfoStorage_units is not an array");
        assert_true(property.units.length > 0, "No available units.");
        assert_own_property(property.units[0], "isRemoveable", "SystemInfoStorageUnit does not own isRemoveable property.");
        check_readonly(property.units[0], "isRemoveable", property.units[0].isRemoveable, "boolean", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoStorageUnit_type_attribute() {
//==== TEST: SystemInfoStorageUnit_type_attribute
//==== LABEL Check if attribute type of SystemInfoStorageUnit exists, has type DOMString and is readonly
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoStorageUnit:type A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoStorageUnit_type_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "units", "No units property.");
        assert_true(Array.isArray(property.units),
            "SystemInfoStorage_units is not an array");
        assert_true(property.units.length > 0, "No available units.");
        assert_own_property(property.units[0], "type", "SystemInfoStorageUnit does not own type property.");
        check_readonly(property.units[0], "type", property.units[0].type, "string", null);
        assert_true(property.units[0].type !== "", "null check");
        t.done();
    });
    getPropertyValueError = t.step_func(function (e) {
        assert_unreached("Exception: " + e.message);
    });

    tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoStorageUnit_extend() {
//==== TEST: SystemInfoStorageUnit_extend
//==== LABEL Check if SystemInfoStorageUnit is extendable
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoStorageUnit:SystemInfoStorageUnit U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA OBX
//==== PRIORITY P3

setup({timeout: 90000});

var t = async_test('SystemInfoStorageUnit_extend', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "units", "No units property.");
        assert_true(Array.isArray(property.units),
            "SystemInfoStorage_units is not an array");
        assert_true(property.units.length > 0, "No available units.");
        check_extensibility(property.units[0]);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoBuild_extend() {
//==== TEST: SystemInfoBuild_extend
//==== LABEL Check if SystemInfoBuild can have new property added
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoBuild:SystemInfoBuild U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA OBX
//==== PRIORITY P3
setup({timeout: 90000});

var t = async_test('SystemInfoBuild_extend', {timeout: 90000}), getPropertyValueSuccess,
    getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        check_extensibility(property);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("BUILD", getPropertyValueSuccess, getPropertyValueError);
});

}

function SystemInfoBuild_manufacturer_attribute() {
//==== TEST: SystemInfoBuild_manufacturer_attribute
//==== LABEL Check attribute manufacturer of SystemInfoBuild_manufacturer
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoBuild:manufacturer A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('SystemInfoBuild_manufacturer_attribute', {timeout: 90000}), getPropertyValueSuccess,
    getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (cellular) {
        assert_own_property(cellular, "manufacturer", "CELLULAR_NETWORK doesn't own manufacturer property.");
        check_readonly(cellular, "manufacturer", cellular.manufacturer, "string", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.message + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("BUILD", getPropertyValueSuccess, getPropertyValueError);
});

}

function SystemInfoBuild_model_attribute() {
//==== TEST: SystemInfoBuild_model_attribute
//==== LABEL Check attribute model of SystemInfoBuild
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoBuild:model A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('SystemInfoBuild_model_attribute', {timeout: 90000}), getPropertyValueSuccess,
    getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (cellular) {
        assert_own_property(cellular, "model", "CELLULAR_NETWORK doesn't own model property.");
        check_readonly(cellular, "model", cellular.model, "string", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (e) {
        assert_unreached("Exception: " + e.message);
    });

    tizen.systeminfo.getPropertyValue("BUILD", getPropertyValueSuccess, getPropertyValueError);
});

}

function SystemInfoDeviceOrientation_extend() {
//==== TEST: SystemInfoDeviceOrientation_extend
//==== LABEL Check if SystemInfoDeviceOrientation can have new property added
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceOrientation:SystemInfoDeviceOrientation U
//==== TEST_CRITERIA OBX
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== PRIORITY P3
setup({timeout: 90000});

var t = async_test('SystemInfoDeviceOrientation_extend', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        check_extensibility(property);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("Exception: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DEVICE_ORIENTATION",
        getPropertyValueSuccess, getPropertyValueError);
}, "SystemInfoDeviceOrientation_extend");

}

function SystemInfoStorage_extend() {
//==== TEST: SystemInfoStorage_extend
//==== LABEL Check if SystemInfoStorage can have new property added
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoStorage:SystemInfoStorage U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA OBX
//==== PRIORITY P3

setup({timeout: 90000});

var t = async_test('SystemInfoStorage_extend', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        check_extensibility(property);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfo_in_tizen() {
//==== TEST: SystemInfo_in_tizen
//==== PRIORITY P3
//==== LABEL Check if package exists in tizen.
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:SystemInfo U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA OBME
test(function () {
    assert_true("systeminfo" in tizen, "No systeminfo in tizen.");
    check_readonly(tizen, "systeminfo", tizen.systeminfo, "object", "dummyValue");
}, 'SystemInfo_in_tizen');

}

function SystemInfo_getPropertyValue_missarg() {
//==== TEST: SystemInfo_getPropertyValue_missarg
//==== LABEL Check if getPropertyValue method called with missing non-optional argument throws an exception
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getPropertyValue M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws( TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.systeminfo.getPropertyValue();
        }, TYPE_MISMATCH_ERR + " should be thrown");
}, 'SystemInfo_getPropertyValue_missarg');

}

function SystemInfo_getPropertyValue_with_errorCallback() {
//==== TEST: SystemInfo_getPropertyValue_with_errorCallback
//==== LABEL Check method SystemInfo_getPropertyValue with errorCallback
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getPropertyValue M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MOA
setup({timeout: 90000});

var t = async_test('SystemInfo_getPropertyValue_with_errorCallback', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (battery) {
        assert_not_equals(battery.level, null, "Failed to getPropertyValue");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name:" +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("BATTERY", getPropertyValueSuccess, getPropertyValueError);
});

}

function SystemInfo_getPropertyValue_property_TypeMismatch() {
//==== TEST: SystemInfo_getPropertyValue_property_TypeMismatch
//==== LABEL Check if getPropertyValue throws exception when property is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getPropertyValue M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MC
setup({timeout: 90000});

var t = async_test('SystemInfo_getPropertyValue_property_TypeMismatch', {timeout: 90000}), i, conversionTable, systemInfoProperty, exceptionName,
    getPropertyValueSuccess, getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_unreached("Should not be here.");
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("Should not be here: " + error.name + ": " + error.message);
    });

    conversionTable = getTypeConversionExceptions("enum", false);

    for(i = 0; i < conversionTable.length; i++) {
        systemInfoProperty = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systeminfo.getPropertyValue(systemInfoProperty,
                    getPropertyValueSuccess, getPropertyValueError);
            }, exceptionName + " should be thrown - given incorrect SystemSettingType - ");
    }
    t.done();
}, "SystemInfo_getPropertyValue_property_TypeMismatch");

}

function SystemInfo_getPropertyValue_successCallback_invalid_cb() {
//==== TEST: SystemInfo_getPropertyValue_successCallback_invalid_cb
//==== LABEL Check getPropertyValue() argument successCallback validation - use {onsuccess: function (){}}
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:SystemInfo:SystemInfo:getPropertyValue M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MTCB
//==== ONLOAD_DELAY 90
setup({timeout: 90000});

var t = async_test('SystemInfo_getPropertyValue_successCallback_invalid_cb', {timeout: 90000}),
    getPropertyValueSuccess, exceptionName = "TypeMismatchError", i;
t.step(function () {
    getPropertyValueSuccess = {
        onsuccess: t.step_func(function () {
            assert_unreached("Invalid successCallback invoked: ");
        })
    };
    for (i = 0;  i < systemInfoPropertyId.length; i++) {
        assert_throws({name: exceptionName},
            function () {
                tizen.systeminfo.getPropertyValue(systemInfoPropertyId[i], getPropertyValueSuccess);
            }, exceptionName + " should be thrown - given incorrect success callback.");
    }
    t.done();
});

}

function SystemInfo_getPropertyValue_errorCallback_TypeMismatch() {
//==== TEST: SystemInfo_getPropertyValue_errorCallback_TypeMismatch
//==== LABEL Check if getPropertyValue throws exception when errorCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getPropertyValue M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MC
setup({timeout: 90000});

var t = async_test('SystemInfo_getPropertyValue_errorCallback_TypeMismatch', {timeout: 90000}),
    conversionTable, getPropertyValueSuccess, getPropertyValueError, exceptionName, i;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);

    getPropertyValueSuccess = t.step_func(function () {
        assert_unreached("Unexpected successCallback");
    });

    for (i = 0; i < conversionTable.length; i++) {
        getPropertyValueError = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess, getPropertyValueError);
            }, exceptionName + " should be thrown - give incorrect errorCallback.");
    }
    t.done();
});

}

function SystemInfo_getPropertyValue_errorCallback_invalid_cb() {
//==== TEST: SystemInfo_getPropertyValue_errorCallback_invalid_cb
//==== LABEL Check if getPropertyValue throws exception when errorCallback is invalid
//==== PRIORITY: P2
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getPropertyValue M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MTCB
setup({timeout: 90000});

var t = async_test('SystemInfo_getPropertyValue_errorCallback_invalid_cb', {timeout: 90000}), getPropertyValueSuccess, getPropertyValueError, i;

t.step(function () {
    getPropertyValueError = {
        onerror: t.step_func(function (error) {
            assert_unreached("getPropertyValue() error callback invoked: name:" +
                error.name + ", msg: " + error.message);
        })
    };
    getPropertyValueSuccess = t.step_func(function () {
        assert_unreached("Unexpected successCallback");
    });
    for (i = 0;  i < systemInfoPropertyId.length; i++) {
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                tizen.systeminfo.getPropertyValue(systemInfoPropertyId[i], getPropertyValueSuccess, getPropertyValueError);
            }, TYPE_MISMATCH_ERR + " should be thrown");
    }
    t.done();
});

}

function SystemInfo_addPropertyValueChangeListener_options_TypeMismatch() {
//==== TEST: SystemInfo_addPropertyValueChangeListener_options_TypeMismatch
//==== LABEL Check if addPropertyValueChangeListener of SystemInfo throws exception when option is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:addPropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MC
//==== ONLOAD_DELAY 90
var t = async_test('SystemInfo_addPropertyValueChangeListener_options_TypeMismatch', {timeout: 90000}), i, conversionTable,
    systemInfoOption, exceptionName, addPropertyValueChangeListenerSuccess;

setup({timeout: 90000});

t.step(function () {
    addPropertyValueChangeListenerSuccess = t.step_func(function (property) {
        assert_unreached("Should not be here.");
    });

    conversionTable = getTypeConversionExceptions("dictionary", true);

    for(i = 0; i < conversionTable.length; i++) {
        systemInfoOption = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systeminfo.addPropertyValueChangeListener("BATTERY",
                    addPropertyValueChangeListenerSuccess, systemInfoOption);
            }, exceptionName + " should be thrown - given incorrect systemInfoOption - " + systemInfoOption);
    }
    t.done();
});

}

function SystemInfo_addPropertyValueChangeListener_property_TypeMismatch() {
//==== TEST: SystemInfo_addPropertyValueChangeListener_property_TypeMismatch
//==== LABEL Check if addPropertyValueChangeListener throws exception when property is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:addPropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MC
//==== ONLOAD_DELAY 90
var t = async_test('SystemInfo_addPropertyValueChangeListener_property_TypeMismatch', {timeout: 90000}),
    i, conversionTable, systemInfoProperty, exceptionName, addPropertyValueChangeListenerSuccess;
setup({timeout: 90000});

t.step(function () {
    addPropertyValueChangeListenerSuccess = t.step_func(function (property) {
        assert_unreached("Should not be here.");
    });

    conversionTable = getTypeConversionExceptions("enum", false);

    for (i = 0; i < conversionTable.length; i++) {
        systemInfoProperty = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systeminfo.addPropertyValueChangeListener(systemInfoProperty, addPropertyValueChangeListenerSuccess);
            }, exceptionName + " should be thrown - given incorrect systemInfoPropertyId - " + systemInfoProperty);
    }
    t.done();
});

}

function SystemInfo_addPropertyValueChangeListener_missarg() {
//==== TEST: SystemInfo_addPropertyValueChangeListener_missarg
//==== LABEL Check if addPropertyValueChangeListener method of SystemInfo called with missing non-optional argument throws an exception
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:addPropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.systeminfo.addPropertyValueChangeListener();
        }, "Calling addPropertyValueChangeListener without arguments should throw an exception.");
}, 'SystemInfo_addPropertyValueChangeListener_missarg');

}

function SystemInfo_addPropertyValueChangeListener_successCallback_TypeMismatch() {

//==== TEST: SystemInfo_addPropertyValueChangeListener_successCallback_TypeMismatch
//==== LABEL Check argument successCallback conversions exception
//==== PRIORITY: P2
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:addPropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MC
setup({timeout: 90000});

var t = async_test('SystemInfo_addPropertyValueChangeListener_successCallback_TypeMismatch', {timeout: 90000}), addPropertyValueChangeListenerSuccess, exceptionName, i, conversionTable;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", false);

    for(i = 0; i < conversionTable.length; i++) {
        addPropertyValueChangeListenerSuccess = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systeminfo.addPropertyValueChangeListener("STORAGE", addPropertyValueChangeListenerSuccess);
            }, exceptionName + " should be thrown - given incorrect success callback.");
    }
    t.done();
});

}

function SystemInfo_addPropertyValueChangeListener_successCallback_invalid_cb() {
//==== TEST: SystemInfo_addPropertyValueChangeListener_successCallback_invalid_cb
//==== LABEL Check addPropertyValueChangeListener() argument successCallback validation - use {onsuccess: function (){}}
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:SystemInfo:SystemInfo:addPropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MTCB
//==== ONLOAD_DELAY 90
setup({timeout: 90000});

var t = async_test('SystemInfo_addPropertyValueChangeListener_successCallback_invalid_cb',
    {timeout: 90000}), addPropertyValueChangeListenerSuccess, exceptionName = "TypeMismatchError";
t.step(function () {
    addPropertyValueChangeListenerSuccess = {
        onsuccess: t.step_func(function () {
            assert_unreached("Invalid successCallback invoked: ");
        })
    };
    assert_throws({name: exceptionName},
        function () {
            tizen.systeminfo.addPropertyValueChangeListener("STORAGE", addPropertyValueChangeListenerSuccess);
        }, exceptionName + " should be thrown - given incorrect success callback.");
    t.done();
});

}

function SystemInfo_removePropertyValueChangeListener_exist() {
//==== TEST: SystemInfo_removePropertyValueChangeListener_exist
//==== LABEL Check if method removePropertyValueChangeListener of SystemInfo exists
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:removePropertyValueChangeListener M
//==== TEST_CRITERIA ME
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
test(function () {
    assert_true("removePropertyValueChangeListener" in tizen.systeminfo, "No removePropertyValueChangeListener method in tizen.systeminfo.");
    check_method_exists(tizen.systeminfo, "removePropertyValueChangeListener");
}, 'SystemInfo_removePropertyValueChangeListener_exist');

}

function SystemInfoPropertySuccessCallback_onsuccess() {
//==== TEST: SystemInfoPropertySuccessCallback_onsuccess
//==== LABEL Check if SystemInfoPropertySuccessCallback works
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPropertySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA CBOA
//==== PRIORITY P1

setup({timeout: 90000});

var t = async_test('SystemInfoPropertySuccessCallback_onsuccess', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (value) {
        assert_not_equals(value , null, "Argument should not be null.");
        assert_type(value, "object", "Incorrect type.");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoDeviceCapability_accelerometerWakeup_attribute() {
//==== TEST: SystemInfoDeviceCapability_accelerometerWakeup_attribute
//==== LABEL Check attribute accelerometerWakeup of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:accelerometerWakeup A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "accelerometerWakeup",
        "SystemInfoDeviceCapability does not own accelerometerWakeup property.");
    check_readonly(deviceCapabilities, "accelerometerWakeup",
        deviceCapabilities.accelerometerWakeup, "boolean", null);
}, 'SystemInfoDeviceCapability_accelerometerWakeup_attribute');

}

function SystemInfoDeviceCapability_autoRotation_attribute() {
//==== TEST: SystemInfoDeviceCapability_autoRotation_attribute
//==== LABEL Check attribute autoRotation of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:autoRotation A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "autoRotation",
        "SystemInfoDeviceCapability does not own autoRotation property.");
    check_readonly(deviceCapabilities, "autoRotation",
        deviceCapabilities.autoRotation, "boolean", null);
}, 'SystemInfoDeviceCapability_autoRotation_attribute');

}

function SystemInfoDeviceCapability_barometerWakeup_attribute() {
//==== TEST: SystemInfoDeviceCapability_barometerWakeup_attribute
//==== LABEL Check attribute barometerWakeup of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:barometerWakeup A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "barometerWakeup",
        "SystemInfoDeviceCapability does not own barometerWakeup property.");
    check_readonly(deviceCapabilities, "barometerWakeup",
        deviceCapabilities.barometerWakeup, "boolean", null);
}, 'SystemInfoDeviceCapability_barometerWakeup_attribute');

}

function SystemInfoDeviceCapability_camera_attribute() {
//==== TEST: SystemInfoDeviceCapability_camera_attribute
//==== LABEL Check attribute camera of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:camera A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "camera",
        "SystemInfoDeviceCapability does not own camera property.");
    check_readonly(deviceCapabilities, "camera",
        deviceCapabilities.camera, "boolean", null);
}, 'SystemInfoDeviceCapability_camera_attribute');

}

function SystemInfoDeviceCapability_dataEncryption_attribute() {
//==== TEST: SystemInfoDeviceCapability_dataEncryption_attribute
//==== LABEL Check attribute dataEncryption of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:dataEncryption A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "dataEncryption",
        "SystemInfoDeviceCapability does not own dataEncryption property.");
    check_readonly(deviceCapabilities, "dataEncryption",
        deviceCapabilities.dataEncryption, "boolean", null);
}, 'SystemInfoDeviceCapability_dataEncryption_attribute');

}

function SystemInfoDeviceCapability_graphicsAcceleration_attribute() {
//==== TEST: SystemInfoDeviceCapability_graphicsAcceleration_attribute
//==== LABEL Check attribute graphicsAcceleration of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:graphicsAcceleration A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "graphicsAcceleration",
        "SystemInfoDeviceCapability does not own graphicsAcceleration property.");
    check_readonly(deviceCapabilities, "graphicsAcceleration",
        deviceCapabilities.graphicsAcceleration, "boolean", null);
}, 'SystemInfoDeviceCapability_graphicsAcceleration_attribute');

}

function SystemInfoDeviceCapability_gyroscopeWakeup_attribute() {
//==== TEST: SystemInfoDeviceCapability_gyroscopeWakeup_attribute
//==== LABEL Check attribute gyroscopeWakeup of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:gyroscopeWakeup A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "gyroscopeWakeup",
        "SystemInfoDeviceCapability does not own gyroscopeWakeup property.");
    check_readonly(deviceCapabilities, "gyroscopeWakeup",
        deviceCapabilities.gyroscopeWakeup, "boolean", null);
}, 'SystemInfoDeviceCapability_gyroscopeWakeup_attribute');

}

function SystemInfoDeviceCapability_inputKeyboardLayout_attribute() {
//==== TEST: SystemInfoDeviceCapability_inputKeyboardLayout_attribute
//==== LABEL Check attribute inputKeyboardLayout of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:inputKeyboardLayout A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "inputKeyboardLayout",
        "SystemInfoDeviceCapability does not own inputKeyboardLayout property.");
    check_readonly(deviceCapabilities, "inputKeyboardLayout",
        deviceCapabilities.inputKeyboardLayout, "boolean", null);
}, 'SystemInfoDeviceCapability_inputKeyboardLayout_attribute');

}

function SystemInfoDeviceCapability_magnetometerWakeup_attribute() {
//==== TEST: SystemInfoDeviceCapability_magnetometerWakeup_attribute
//==== LABEL Check attribute magnetometerWakeup of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:magnetometerWakeup A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "magnetometerWakeup",
        "SystemInfoDeviceCapability does not own magnetometerWakeup property.");
    check_readonly(deviceCapabilities, "magnetometerWakeup",
        deviceCapabilities.magnetometerWakeup, "boolean", null);
}, 'SystemInfoDeviceCapability_magnetometerWakeup_attribute');

}

function SystemInfoDeviceCapability_nfcReservedPush_attribute() {
//==== TEST: SystemInfoDeviceCapability_nfcReservedPush_attribute
//==== LABEL Check attribute nfcReservedPush of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:nfcReservedPush A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
var deviceCapabilities = tizen.systeminfo.getCapabilities();

test(function () {
    assert_own_property(deviceCapabilities, "nfcReservedPush",
        "SystemInfoDeviceCapability does not own nfcReservedPush property.");
    check_readonly(deviceCapabilities, "nfcReservedPush",
        deviceCapabilities.nfcReservedPush, "boolean", null);
}, 'SystemInfoDeviceCapability_nfcReservedPush_attribute');

}

function SystemInfoDeviceCapability_opengles_attribute() {
//==== TEST: SystemInfoDeviceCapability_opengles_attribute
//==== LABEL Check attribute opengles of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:opengles A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "opengles",
        "SystemInfoDeviceCapability does not own opengles property.");
    check_readonly(deviceCapabilities, "opengles",
        deviceCapabilities.opengles, "boolean", null);
}, 'SystemInfoDeviceCapability_opengles_attribute');

}

function SystemInfoDeviceCapability_openglestextureFormat_attribute() {
//==== TEST: SystemInfoDeviceCapability_openglestextureFormat_attribute
//==== LABEL Check attribute openglestextureFormat of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:openglestextureFormat A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "openglestextureFormat",
        "SystemInfoDeviceCapability does not own openglestextureFormat property.");
    check_readonly(deviceCapabilities, "openglestextureFormat",
        deviceCapabilities.openglestextureFormat, "string", null);
}, 'SystemInfoDeviceCapability_openglestextureFormat_attribute');

}

function SystemInfoDeviceCapability_photometerWakeup_attribute() {
//==== TEST: SystemInfoDeviceCapability_photometerWakeup_attribute
//==== LABEL Check attribute photometerWakeup of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:photometerWakeup A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "photometerWakeup",
        "SystemInfoDeviceCapability does not own photometerWakeup property.");
    check_readonly(deviceCapabilities, "photometerWakeup",
        deviceCapabilities.photometerWakeup, "boolean", null);
}, 'SystemInfoDeviceCapability_photometerWakeup_attribute');

}

function SystemInfoDeviceCapability_photometer_attribute() {
//==== TEST: SystemInfoDeviceCapability_photometer_attribute
//==== LABEL Check attribute photometer of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:photometer A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "photometer",
        "SystemInfoDeviceCapability does not own photometer property.");
    check_readonly(deviceCapabilities, "photometer",
        deviceCapabilities.photometer, "boolean", null);
}, 'SystemInfoDeviceCapability_photometer_attribute');

}

function SystemInfoDeviceCapability_proximityWakeup_attribute() {
//==== TEST: SystemInfoDeviceCapability_proximityWakeup_attribute
//==== LABEL Check attribute proximityWakeup of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:proximityWakeup A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "proximityWakeup",
        "SystemInfoDeviceCapability does not own proximityWakeup property.");
    check_readonly(deviceCapabilities, "proximityWakeup",
        deviceCapabilities.proximityWakeup, "boolean", null);
}, 'SystemInfoDeviceCapability_proximityWakeup_attribute');

}

function SystemInfoDeviceCapability_push_attribute() {
//==== TEST: SystemInfoDeviceCapability_push_attribute
//==== LABEL Check attribute push of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:push A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "push",
        "SystemInfoDeviceCapability does not own push property.");
    check_readonly(deviceCapabilities, "push",
        deviceCapabilities.push, "boolean", null);
}, 'SystemInfoDeviceCapability_push_attribute');

}

function SystemInfoDeviceCapability_secureElement_attribute() {
//==== TEST: SystemInfoDeviceCapability_secureElement_attribute
//==== LABEL Check attribute secureElement of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:secureElement A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "secureElement",
        "SystemInfoDeviceCapability does not own secureElement property.");
    check_readonly(deviceCapabilities, "secureElement",
        deviceCapabilities.secureElement, "boolean", null);
}, 'SystemInfoDeviceCapability_secureElement_attribute');

}

function SystemInfoDeviceCapability_speechSynthesis_attribute() {
//==== TEST: SystemInfoDeviceCapability_speechSynthesis_attribute
//==== LABEL Check attribute speechSynthesis of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:speechSynthesis A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "speechSynthesis",
        "SystemInfoDeviceCapability does not own speechSynthesis property.");
    check_readonly(deviceCapabilities, "speechSynthesis",
        deviceCapabilities.speechSynthesis, "boolean", null);
}, 'SystemInfoDeviceCapability_speechSynthesis_attribute');

}

function SystemInfoDeviceCapability_telephonyMms_attribute() {
//==== TEST: SystemInfoDeviceCapability_telephonyMms_attribute
//==== LABEL Check attribute telephonyMms of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:telephonyMms A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {


    assert_own_property(deviceCapabilities, "telephonyMms", "SystemInfoDeviceCapability does not own telephonyMms property.");


    check_readonly(deviceCapabilities, "telephonyMms", deviceCapabilities.telephonyMms, "boolean", null);


}, 'SystemInfoDeviceCapability_telephonyMms_attribute');

}

function SystemInfoDeviceCapability_telephonySms_attribute() {
//==== TEST: SystemInfoDeviceCapability_telephonySms_attribute
//==== LABEL Check attribute telephonySms of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:telephonySms A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {


    assert_own_property(deviceCapabilities, "telephonySms", "SystemInfoDeviceCapability does not own telephonySms property.");


    check_readonly(deviceCapabilities, "telephonySms", deviceCapabilities.telephonySms, "boolean", null);


}, 'SystemInfoDeviceCapability_telephonySms_attribute');

}

function SystemInfoDeviceCapability_telephony_attribute() {
//==== TEST: SystemInfoDeviceCapability_telephony_attribute
//==== LABEL Check attribute telephony of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:telephony A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {


    assert_own_property(deviceCapabilities, "telephony", "SystemInfoDeviceCapability does not own telephony property.");


    check_readonly(deviceCapabilities, "telephony", deviceCapabilities.telephony, "boolean", null);


}, 'SystemInfoDeviceCapability_telephony_attribute');

}

function SystemInfoDeviceCapability_tiltmeterWakeup_attribute() {
//==== TEST: SystemInfoDeviceCapability_tiltmeterWakeup_attribute
//==== LABEL Check attribute tiltmeterWakeup of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:tiltmeterWakeup A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "tiltmeterWakeup",
        "SystemInfoDeviceCapability does not own tiltmeterWakeup property.");
    check_readonly(deviceCapabilities, "tiltmeterWakeup",
        deviceCapabilities.tiltmeterWakeup, "boolean", null);
}, 'SystemInfoDeviceCapability_tiltmeterWakeup_attribute');

}

function SystemInfoDeviceCapability_tiltmeter_attribute() {
//==== TEST: SystemInfoDeviceCapability_tiltmeter_attribute
//==== LABEL Check attribute tiltmeter of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:tiltmeter A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {


    assert_own_property(deviceCapabilities, "tiltmeter", "SystemInfoDeviceCapability does not own tiltmeter property.");


    check_readonly(deviceCapabilities, "tiltmeter", deviceCapabilities.tiltmeter, "boolean", null);


}, 'SystemInfoDeviceCapability_tiltmeter_attribute');

}

function SystemInfoDeviceCapability_visionFaceRecognition_attribute() {
//==== TEST: SystemInfoDeviceCapability_visionFaceRecognition_attribute
//==== LABEL Check attribute visionFaceRecognition of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:visionFaceRecognition A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "visionFaceRecognition",
        "SystemInfoDeviceCapability does not own visionFaceRecognition property.");
    check_readonly(deviceCapabilities, "visionFaceRecognition",
        deviceCapabilities.visionFaceRecognition, "boolean", null);
}, 'SystemInfoDeviceCapability_visionFaceRecognition_attribute');

}

function SystemInfoDeviceCapability_visionImageRecognition_attribute() {
//==== TEST: SystemInfoDeviceCapability_visionImageRecognition_attribute
//==== LABEL Check attribute visionImageRecognition of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:visionImageRecognition A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "visionImageRecognition",
        "SystemInfoDeviceCapability does not own visionImageRecognition property.");
    check_readonly(deviceCapabilities, "visionImageRecognition",
        deviceCapabilities.visionImageRecognition, "boolean", null);
}, 'SystemInfoDeviceCapability_visionImageRecognition_attribute');

}

function SystemInfoDeviceCapability_visionQrcodeGeneration_attribute() {
//==== TEST: SystemInfoDeviceCapability_visionQrcodeGeneration_attribute
//==== LABEL Check attribute visionQrcodeGeneration of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:visionQrcodeGeneration A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "visionQrcodeGeneration",
        "SystemInfoDeviceCapability does not own visionQrcodeGeneration property.");
    check_readonly(deviceCapabilities, "visionQrcodeGeneration",
        deviceCapabilities.visionQrcodeGeneration, "boolean", null);
}, 'SystemInfoDeviceCapability_visionQrcodeGeneration_attribute');

}

function SystemInfoDeviceCapability_visionQrcodeRecognition_attribute() {
//==== TEST: SystemInfoDeviceCapability_visionQrcodeRecognition_attribute
//==== LABEL Check attribute visionQrcodeRecognition of SystemInfoDeviceCapability
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:visionQrcodeRecognition A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "visionQrcodeRecognition",
        "SystemInfoDeviceCapability does not own visionQrcodeRecognition property.");
    check_readonly(deviceCapabilities, "visionQrcodeRecognition",
        deviceCapabilities.visionQrcodeRecognition, "boolean", null);
}, 'SystemInfoDeviceCapability_visionQrcodeRecognition_attribute');

}

function SystemInfo_removePropertyValueChangeListener_all_properties() {
//==== TEST: SystemInfo_removePropertyValueChangeListener_all_properties
//==== LABEL Check whether removePropertyValueChangeListener() method properly unsubscribes notifications for property changes
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:removePropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MMINA

var lId, addPropertyValueChangeListenerSuccess, i;

test(function () {
    addPropertyValueChangeListenerSuccess = function () {};

    for (i = 0; i < systemInfoPropertyId.length; i++) {
        lId = tizen.systeminfo.addPropertyValueChangeListener(systemInfoPropertyId[i],
            addPropertyValueChangeListenerSuccess);

        tizen.systeminfo.removePropertyValueChangeListener(lId);
    }
}, 'SystemInfo_removePropertyValueChangeListener_all_properties');

}

function SystemInfoPropertySuccessCallback_onsuccess_CPU() {
//==== TEST: SystemInfoPropertySuccessCallback_onsuccess_CPU
//==== LABEL Check if getPropertyValue('CPU', successCB, errorCB) calls successCallback + results' attributes
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPropertySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA CBT CBOA
//==== ONLOAD_DELAY 90

var t = async_test('SystemInfoPropertySuccessCallback_onsuccess_CPU', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
setup({timeout: 90000});
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (cpu) {
        assert_equals(typeof(cpu.load), "number", "load attribute ");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("CPU", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoPropertySuccessCallback_onsuccess_DeviceOrientation() {
//==== TEST: SystemInfoPropertySuccessCallback_onsuccess_DeviceOrientation
//==== LABEL Check if getPropertyValue('DEVICE_ORIENTATION', successCB, errorCB) calls successCallback + results' attributes
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPropertySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA CBOA
//==== ONLOAD_DELAY 90

var t = async_test('SystemInfoPropertySuccessCallback_onsuccess_DeviceOrientation', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
setup({timeout: 90000});
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (deviceorientation) {
        assert_type(deviceorientation.status, "string", "status type check");

        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DEVICE_ORIENTATION", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoDisplay_constructor_display() {
//==== TEST: SystemInfoDisplay_constructor_display
//==== LABEL Check if getPropertyValue('Display', successCB, errorCB) calls successCallback + results' attributes
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDisplay:resolutionWidth A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AT
//==== ONLOAD_DELAY 90
var t = async_test('SystemInfoDisplay_constructor_display', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
setup({timeout: 90000});
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (display) {
        assert_type(display.resolutionWidth, "unsigned long", "resolutionWidth");
        assert_type(display.resolutionHeight, "unsigned long", "resolutionHeight");
        assert_type(display.dotsPerInchWidth, "unsigned long", "dotsPerInchWidth");
        assert_type(display.dotsPerInchHeight, "unsigned long", "dotsPerInchHeight");
        assert_type(display.physicalWidth, "double", "physicalWidth");
        assert_type(display.physicalHeight, "double", "physicalHeight");
        assert_type(display.brightness, "double", "brightness");
        t.done();
    });

    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DISPLAY", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoPropertySuccessCallback_onsuccess_Storage() {

//==== TEST: SystemInfoPropertySuccessCallback_onsuccess_Storage
//==== LABEL Check if getPropertyValue('Storage', successCB, errorCB) calls successCallback + results' attributes
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPropertySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA CBT CBOA
//==== ONLOAD_DELAY 90

var t = async_test('SystemInfoPropertySuccessCallback_onsuccess_Storage', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
setup({timeout: 90000});
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "units", "No units property.");
        assert_true(Array.isArray(property.units),
            "SystemInfoStorage_units is not an array");
        assert_true(property.units.length > 0, "No available units.");
        assert_type(property.units[0].type, "string", "type attribute");
        assert_type(property.units[0].capacity, "unsigned long long", "capacity attribute");
        assert_type(property.units[0].availableCapacity, "unsigned long long", "availableCapacity attribute");
        assert_type(property.units[0].isRemovable, "boolean", "isRemovable attribute");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfo_addPropertyValueChangeListener() {
//==== TEST: SystemInfo_addPropertyValueChangeListener
//==== LABEL Check method addPropertyValueChangeListener of SystemInfo
//==== SPEC Tizen Web API:Tizen Specification:SystemInfo:SystemInfo:addPropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MMINA MAST MR
//==== ONLOAD_DELAY 90
var t = async_test('SystemInfo_addPropertyValueChangeListener', {timeout: 90000}),
    addPropertyValueChangeListenerSuccess, addPropertyValueChangeListenerError, retValue = null;

setup({timeout: 90000});

t.step(function () {
    addPropertyValueChangeListenerError = t.step_func(function (error) {
        assert_unreached("addPropertyValueChangeListener() error callback invoked: name:" + error.name + ", msg:"  + error.message);
    });

    addPropertyValueChangeListenerSuccess = t.step_func(function (property) {
        assert_own_property(property, "load", "CPU does not own load property.");
        assert_type(retValue, "unsigned long", "addPropertyValueChangeListener returns wrong value");

        t.done();
    });

    retValue = tizen.systeminfo.addPropertyValueChangeListener("CPU", addPropertyValueChangeListenerSuccess);
});

}

function SystemInfo_addPropertyValueChangeListener_with_options() {
//==== TEST: SystemInfo_addPropertyValueChangeListener_with_options
//==== LABEL Check with optional arguments addPropertyValueChangeListener(valid_property, valid_successCallback, valid_options)
//==== SPEC Tizen Web API:Tizen Specification:SystemInfo:SystemInfo:addPropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MOA MAST
//==== ONLOAD_DELAY 90
var t = async_test('SystemInfo_addPropertyValueChangeListener_with_options', {timeout: 90000}),
    addPropertyValueChangeListenerSuccess, lId;

setup({timeout: 90000});

t.step(function () {
    addPropertyValueChangeListenerSuccess = t.step_func(function (property) {
        t.done();
    });

    lId = tizen.systeminfo.addPropertyValueChangeListener("CPU", addPropertyValueChangeListenerSuccess,
        {highThreshold: 0, lowThreshold: 1});
});

}

function SystemInfo_removePropertyValueChangeListener() {
//==== TEST: SystemInfo_removePropertyValueChangeListener
//==== LABEL Check method removePropertyValueChangeListener of SystemInfo
//==== ONLOAD_DELAY 90
//==== SPEC: Tizen Web API:System:SystemInfo:SystemInfo:removePropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MMINA MAST MR
setup({timeout: 90000});
var t = async_test('SystemInfo_removePropertyValueChangeListener', {timeout: 90000}),
    addPropertyValueChangeListenerSuccess, lId, retValue = null;

t.step(function () {
    addPropertyValueChangeListenerSuccess = t.step_func(function (property) {
        assert_unreached("Method removePropertyValueChangeListener does not remove listener.");
    });

    lId = tizen.systeminfo.addPropertyValueChangeListener("CPU", addPropertyValueChangeListenerSuccess);
    retValue = tizen.systeminfo.removePropertyValueChangeListener(lId);
    setTimeout(t.step_func(function () {
        assert_equals(retValue, undefined, "removePropertyValueChangeListener returns wrong value");

        t.done();
    }), 3000);
});

}

function SystemInfo_getPropertyValue_successCallback_missarg() {
//==== TEST: SystemInfo_getPropertyValue_successCallback_missarg
//==== LABEL Check if getPropertyValue(SystemInfoPropertyId) (no success callback) throws an exception
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getPropertyValue M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MMA
var i;

test(function () {
    for (i = 0;  i < systemInfoPropertyId.length; i++) {
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                tizen.systeminfo.getPropertyValue(systemInfoPropertyId[i]);
            }, TYPE_MISMATCH_ERR + " should be thrown");
    }
}, 'SystemInfo_getPropertyValue_successCallback_missarg');

}

function SystemInfo_addPropertyValueChangeListener_successCallback_missarg() {
//==== TEST: SystemInfo_addPropertyValueChangeListener_successCallback_missarg
//==== LABEL Check if addPropertyValueChangeListener(SystemInfoPropertyId) (no success callback) throws an exception when successCallback is missing
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:addPropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MMA

var lId, i;

test(function () {
    for (i = 0; i < systemInfoPropertyId.length; i++) {
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                lId = tizen.systeminfo.addPropertyValueChangeListener(systemInfoPropertyId[i]);
                tizen.systeminfo.removePropertyValueChangeListener(lId);
            });
    }
}, 'SystemInfo_addPropertyValueChangeListener_successCallback_missarg');

}

function SystemInfo_getPropertyValue_successCallback_TypeMismatch() {
//==== TEST: SystemInfo_getPropertyValue_successCallback_TypeMismatch
//==== LABEL Check if getPropertyValue throws exception when successCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:getPropertyValue M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MC
setup({timeout: 90000});

var t = async_test('SystemInfo_getPropertyValue_successCallback_TypeMismatch', {timeout: 90000}),
    getPropertyValueSuccess, exceptionName, getPropertyValueError, i, conversionTable;

t.step(function () {
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name:" +
            error.name + ", msg: " + error.message);
    });

    conversionTable = getTypeConversionExceptions("functionObject", false);

    for(i = 0; i < conversionTable.length; i++) {
        getPropertyValueSuccess = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systeminfo.getPropertyValue("STORAGE", getPropertyValueSuccess,
                    getPropertyValueError);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
    t.done();
});

}

function SystemInfoPropertySuccessCallback_onsuccess_Battery() {
//==== TEST: SystemInfoPropertySuccessCallback_onsuccess_Battery
//==== LABEL Check if getPropertyValue('BATTERY', successCB, errorCB) calls successCallback + results' attributes
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPropertySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA CBT CBOA
//==== ONLOAD_DELAY 90

var t = async_test('SystemInfoPropertySuccessCallback_onsuccess_Battery', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
setup({timeout: 90000});
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (battery) {
        assert_type(battery.level, "double", "level type check");
        assert_type(battery.isCharging, "boolean", "isCharging type check");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("BATTERY", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoPropertySuccessCallback_onsuccess_Build() {
//==== TEST: SystemInfoPropertySuccessCallback_onsuccess_Build
//==== LABEL Check if getPropertyValue('BUILD', successCB, errorCB) calls successCallback + results' attributes
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPropertySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA CBOA
//==== ONLOAD_DELAY 90

var t = async_test('SystemInfoPropertySuccessCallback_onsuccess_Build', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
setup({timeout: 90000});
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (build) {
        assert_type(build.model, "string", "model type check");
        assert_type(build.manufacturer, "string", "manufacturer type check");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("BUILD", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoPropertySuccessCallback_onsuccess_Display() {
//==== TEST: SystemInfoPropertySuccessCallback_onsuccess_Display
//==== LABEL Check if getPropertyValue('DISPLAY', successCB, errorCB) calls successCallback + results' attributes
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPropertySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA CBT CBOA
//==== ONLOAD_DELAY 90

var t = async_test('SystemInfoPropertySuccessCallback_onsuccess_Display', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
setup({timeout: 90000});
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (display) {
        assert_type(display.resolutionWidth, "unsigned long", "resolutionWidth type check");
        assert_type(display.resolutionHeight, "unsigned long", "resolutionHeight type check");
        assert_type(display.dotsPerInchWidth, "unsigned long", "dotsPerInchWidth type check");
        assert_type(display.dotsPerInchHeight, "unsigned long", "dotsPerInchHeight type check");
        assert_type(display.physicalWidth, "double", "physicalWidth type check");
        assert_type(display.physicalHeight, "double", "physicalHeight type check");
        assert_type(display.brightness, "double", "brightness type check");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DISPLAY", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoPropertySuccessCallback_onsuccess_Peripheral() {
//==== TEST: SystemInfoPropertySuccessCallback_onsuccess_Peripheral
//==== LABEL Check if getPropertyValue('PERIPHERAL', successCB, errorCB) calls successCallback + results' attributes
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoPropertySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA CBT CBOA
//==== ONLOAD_DELAY 90

var t = async_test('SystemInfoPropertySuccessCallback_onsuccess_Peripheral', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;
setup({timeout: 90000});
t.step(function () {
    getPropertyValueSuccess = t.step_func(function (peripheral) {
        assert_type(peripheral.isVideoOutputOn, "boolean", "isVideoOutputOn type check");
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("PERIPHERAL", getPropertyValueSuccess,
        getPropertyValueError);
});

}

function SystemInfoBuild_buildVersion_attribute() {
//==== TEST: SystemInfoBuild_buildVersion_attribute
//==== LABEL Check attribute buildVersion of SystemInfoBuild
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoBuild:buildVersion A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('SystemInfoBuild_buildVersion_attribute', {timeout: 90000}), getPropertyValueSuccess,
    getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (cellular) {
        assert_own_property(cellular, "buildVersion",
            "SystemInfoBuild doesn't own buildVersion property.");
        check_readonly(cellular, "buildVersion", cellular.buildVersion,
            "string", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.systeminfo.getPropertyValue("BUILD", getPropertyValueSuccess, getPropertyValueError);
});

}

function SystemInfoDeviceCapability_profile_attribute() {
//==== TEST: SystemInfoDeviceCapability_profile_attribute
//==== LABEL Check if attribute profile of SystemInfoDeviceCapability exists, has type SystemInfoProfile and is readonly
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:profile A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

var deviceCapabilities = tizen.systeminfo.getCapabilities();
test(function () {
    assert_own_property(deviceCapabilities, "profile",
        "SystemInfoDeviceCapability does not own profile property.");
    check_readonly(deviceCapabilities, "profile", deviceCapabilities.profile,
        "string", null);
    assert_in_array(deviceCapabilities.profile, SYSTEM_INFO_PROFILE,
        "profile isn't type of SystemInfoProfile");
}, 'SystemInfoDeviceCapability_profile_attribute');

}

function SystemInfoDeviceOrientation_isAutoRotation_attribute() {
//==== TEST: SystemInfoDeviceOrientation_isAutoRotation_attribute
//==== LABEL Check isAutoRotation attribute of SystemInfoDeviceOrientation
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceOrientation:isAutoRotation A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA AE AT ARO

setup({timeout: 90000});

var t = async_test('SystemInfoDeviceOrientation_isAutoRotation_attribute', {timeout: 90000}),
    getPropertyValueSuccess, getPropertyValueError;

t.step(function () {
    getPropertyValueSuccess = t.step_func(function (property) {
        assert_own_property(property, "isAutoRotation",
            "SystemInfoDeviceOrientation doesn't own isAutoRotation property.");
        check_readonly(property, "isAutoRotation", property.isAutoRotation,
            "boolean", null);
        t.done();
    });
    getPropertyValueError = t.step_func(function (error) {
        assert_unreached("getPropertyValue() error callback invoked: name: " +
            error.name + ", msg: " + error.message);
    });

    tizen.systeminfo.getPropertyValue("DEVICE_ORIENTATION",
        getPropertyValueSuccess, getPropertyValueError);
}, "SystemInfoDeviceOrientation_status_attribute");

}

function SystemInfo_addPropertyValueChangeListener_property_empty() {
//==== TEST: SystemInfo_addPropertyValueChangeListener_property_empty
//==== LABEL Check with empty SystemInfoPropertyId argument of addPropertyValueChangeListener
//==== PRIORITY: P2
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfo:addPropertyValueChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA MTD
setup({timeout: 90000});

var t = async_test('SystemInfo_addPropertyValueChangeListener_property_empty', {timeout: 90000}), addPropertyValueChangeListenerSuccess;

t.step(function () {
    addPropertyValueChangeListenerSuccess = t.step_func(function (property) {
        t.done();
    });

    tizen.systeminfo.addPropertyValueChangeListener("CPU", addPropertyValueChangeListenerSuccess, {});
});

}

function SystemInfoDeviceCapability_accelerometer_dependency() {
//==== TEST: SystemInfoDeviceCapability_accelerometer_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.accelerometer* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.accelerometer === false && info.accelerometerWakeup === true,
        "invalid dependency between capabilities"
    );
}, 'SystemInfoDeviceCapability_accelerometer_dependency');

}

function SystemInfoDeviceCapability_barometer_dependency() {
//==== TEST: SystemInfoDeviceCapability_barometer_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.barometer* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.barometer === false && info.barometerWakeup === true,
        "invalid dependency between capabilities"
    );

}, 'SystemInfoDeviceCapability_barometer_dependency');

}

function SystemInfoDeviceCapability_cameraBack_dependency() {
//==== TEST: SystemInfoDeviceCapability_cameraBack_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.cameraBack* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.camera === true && info.cameraBack === false && info.cameraBackFlash === true,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.camera === false && info.cameraBack === true && info.cameraBackFlash === true,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.camera === false && info.cameraBack === true && info.cameraBackFlash === false,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.camera === false && info.cameraBack === false && info.cameraBackFlash === true,
        "invalid dependency between capabilities"
    );
}, 'SystemInfoDeviceCapability_cameraBack_dependency');

}

function SystemInfoDeviceCapability_inputKeyboard_dependency() {
//==== TEST: SystemInfoDeviceCapability_inputKeyboard_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.inputKeyboard* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.inputKeyboard === false && info.inputKeyboardLayout === true,
        "invalid dependency between capabilities"
    );
}, 'SystemInfoDeviceCapability_inputKeyboard_dependency');

}

function SystemInfoDeviceCapability_location_dependency() {
//==== TEST: SystemInfoDeviceCapability_location_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.location* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.location === true && info.locationGps === false && info.locationWps === false,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.location === false && info.locationGps === true && info.locationWps === true,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.location === false && info.locationGps === true && info.locationWps === false,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.location === false && info.locationGps === false && info.locationWps === true,
        "invalid dependency between capabilities"
    );
}, 'SystemInfoDeviceCapability_location_dependency');

}

function SystemInfoDeviceCapability_nfc_dependency() {
//==== TEST: SystemInfoDeviceCapability_nfc_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.nfc* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.nfc === false && info.nfcReservedPush === true,
        "invalid dependency between capabilities"
    );

}, 'SystemInfoDeviceCapability_nfc_dependency');

}

function SystemInfoDeviceCapability_openglesVersion_dependency() {
//==== TEST: SystemInfoDeviceCapability_openglesVersion_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.openglesVersion* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.opengles === true && info.openglesVersion1_1 === false && info.openglesVersion2_0 === false,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.opengles === false && info.openglesVersion1_1 === true && info.openglesVersion2_0 === true,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.opengles === false && info.openglesVersion1_1 === true && info.openglesVersion2_0 === false,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.opengles === false && info.openglesVersion1_1 === false && info.openglesVersion2_0 === true,
        "invalid dependency between capabilities"
    );
}, 'SystemInfoDeviceCapability_openglesVersion_dependency');

}

function SystemInfoDeviceCapability_telephony_dependency() {
//==== TEST: SystemInfoDeviceCapability_telephony_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.telephony* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.telephony === true && info.telephonyMms === true && info.telephonySms === false,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.telephony === true && info.telephonyMms === false && info.telephonySms === false,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.telephony === false && info.telephonyMms === true && info.telephonySms === true,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.telephony === false && info.telephonyMms === true && info.telephonySms === false,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.telephony === false && info.telephonyMms === false && info.telephonySms === true,
        "invalid dependency between capabilities"
    );
}, 'SystemInfoDeviceCapability_telephony_dependency');

}

function SystemInfoDeviceCapability_wifi_dependency() {
//==== TEST: SystemInfoDeviceCapability_wifi_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.wifi* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.wifi === false && info.wifiDirect === true,
        "invalid dependency between capabilities"
    );

}, 'SystemInfoDeviceCapability_wifi_dependency');

}

function SystemInfoDeviceCapability_cameraFront_dependency() {
//==== TEST: SystemInfoDeviceCapability_cameraFront_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.cameraFront* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.camera === true && info.cameraFront === false && info.cameraFrontFlash === true,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.camera === false && info.cameraFront === true && info.cameraFrontFlash === true,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.camera === false && info.cameraFront === true && info.cameraFrontFlash === false,
        "invalid dependency between capabilities"
    );

    assert_false(
        info.camera === false && info.cameraFront === false && info.cameraFrontFlash === true,
        "invalid dependency between capabilities"
    );

}, 'SystemInfoDeviceCapability_cameraFront_dependency');

}

function SystemInfoDeviceCapability_openglestextureFormat_dependency() {
//==== TEST: SystemInfoDeviceCapability_openglestextureFormat_dependency
//==== LABEL Check invalid dependency on SystemInfoDeviceCapability.openglestextureFormat attribute
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.opengles === false && typeof(info.openglestextureFormat) === "string" && info.openglestextureFormat !== "",
        "invalid dependency between capabilities"
    );

}, 'SystemInfoDeviceCapability_openglestextureFormat_dependency');

}

function SystemInfoDeviceCapability_gyroscope_dependency() {
//==== TEST: SystemInfoDeviceCapability_gyroscope_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.gyroscope* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.gyroscope === false && info.gyroscopeWakeup === true,
        "invalid dependency between capabilities"
    );

}, 'SystemInfoDeviceCapability_gyroscope_dependency');

}

function SystemInfoDeviceCapability_magnetometer_dependency() {
//==== TEST: SystemInfoDeviceCapability_magnetometer_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.magnetometer* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.magnetometer === false && info.magnetometerWakeup === true,
        "invalid dependency between capabilities"
    );

}, 'SystemInfoDeviceCapability_magnetometer_dependency');

}

function SystemInfoDeviceCapability_photometer_dependency() {
//==== TEST: SystemInfoDeviceCapability_photometer_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.photometer* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.photometer === false && info.photometerWakeup === true,
        "invalid dependency between capabilities"
    );

}, 'SystemInfoDeviceCapability_photometer_dependency');

}

function SystemInfoDeviceCapability_proximity_dependency() {
//==== TEST: SystemInfoDeviceCapability_proximity_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.proximity* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.proximity === false && info.proximityWakeup === true,
        "invalid dependency between capabilities"
    );

}, 'SystemInfoDeviceCapability_proximity_dependency');

}

function SystemInfoDeviceCapability_tiltmeter_dependency() {
//==== TEST: SystemInfoDeviceCapability_tiltmeter_dependency
//==== LABEL Check invalid dependency between SystemInfoDeviceCapability.tiltmeter* attributes
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:SystemInfo:SystemInfoDeviceCapability:SystemInfoDeviceCapability U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systeminfo.html
//==== TEST_CRITERIA

test(function () {
    var info = tizen.systeminfo.getCapabilities();

    assert_false(
        info.tiltmeter === false && info.tiltmeterWakeup === true,
        "invalid dependency between capabilities"
    );

}, 'SystemInfoDeviceCapability_tiltmeter_dependency');

}

var moduleName = "tct-systeminfo-tizen-tests";
add_test_case(moduleName, SystemInfo_getPropertyValue_exist);
add_test_case(moduleName, SystemInfo_getPropertyValue);
add_test_case(moduleName, SystemInfo_addPropertyValueChangeListener_exist);
add_test_case(moduleName, SystemInfo_SystemInfoObject_systeminfo_attribute);
add_test_case(moduleName, SystemInfoBattery_notexist);
add_test_case(moduleName, SystemInfoBuild_notexist);
add_test_case(moduleName, SystemInfoCpu_notexist);
add_test_case(moduleName, SystemInfoDeviceCapability_notexist);
add_test_case(moduleName, SystemInfoDeviceOrientation_notexist);
add_test_case(moduleName, SystemInfoDisplay_notexist);
add_test_case(moduleName, SystemInfoObject_notexist);
add_test_case(moduleName, SystemInfoPeripheral_notexist);
add_test_case(moduleName, SystemInfoPropertySuccessCallback_notexist);
add_test_case(moduleName, SystemInfoProperty_notexist);
add_test_case(moduleName, SystemInfoStorageUnit_notexist);
add_test_case(moduleName, SystemInfoStorage_notexist);
add_test_case(moduleName, SystemInfo_notexist);
add_test_case(moduleName, SystemInfoDeviceCapability_bluetooth_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_extend);
add_test_case(moduleName, SystemInfoDeviceCapability_nfc_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_multiTouchCount_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_inputKeyboard_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_wifi_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_wifiDirect_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_fmRadio_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_openglesVersion1_1_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_openglesVersion2_0_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_platformName_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_platformVersion_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_webApiVersion_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_accelerometer_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_barometer_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_cameraBackFlash_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_cameraBack_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_cameraFrontFlash_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_cameraFront_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_gyroscope_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_locationGps_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_locationWps_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_location_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_magnetometer_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_microphone_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_platformCoreCpuArch_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_platformCoreFpuArch_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_proximity_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_screenOutputHdmi_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_screenOutputRca_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_sipVoip_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_speechRecognition_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_usbAccessory_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_usbHost_attribute);
add_test_case(moduleName, SystemInfoBattery_extend);
add_test_case(moduleName, SystemInfoBattery_level_attribute);
add_test_case(moduleName, SystemInfoBattery_isCharging_attribute);
add_test_case(moduleName, SystemInfo_extend);
add_test_case(moduleName, SystemInfo_getCapabilities_exist);
add_test_case(moduleName, SystemInfo_getCapabilities);
add_test_case(moduleName, SystemInfo_getCapabilities_extra_argument);
add_test_case(moduleName, SystemInfoDisplay_brightness_attribute);
add_test_case(moduleName, SystemInfoDisplay_dotsPerInchHeight_attribute);
add_test_case(moduleName, SystemInfoDisplay_dotsPerInchWidth_attribute);
add_test_case(moduleName, SystemInfoDisplay_physicalHeight_attribute);
add_test_case(moduleName, SystemInfoDisplay_physicalWidth_attribute);
add_test_case(moduleName, SystemInfoDisplay_resolutionHeight_attribute);
add_test_case(moduleName, SystemInfoDisplay_resolutionWidth_attribute);
add_test_case(moduleName, SystemInfoPeripheral_isVideoOutputOn_attribute);
add_test_case(moduleName, SystemInfoCpu_load_attribute);
add_test_case(moduleName, SystemInfoStorage_units_attribute);
add_test_case(moduleName, SystemInfoDeviceOrientation_status_attribute);
add_test_case(moduleName, SystemInfoCpu_extend);
add_test_case(moduleName, SystemInfoDisplay_extend);
add_test_case(moduleName, SystemInfoPeripheral_extend);
add_test_case(moduleName, SystemInfoStorageUnit_availableCapacity_attribute);
add_test_case(moduleName, SystemInfoStorageUnit_capacity_attribute);
add_test_case(moduleName, SystemInfoStorageUnit_isRemovable_attribute);
add_test_case(moduleName, SystemInfoStorageUnit_isRemoveable_attribute);
add_test_case(moduleName, SystemInfoStorageUnit_type_attribute);
add_test_case(moduleName, SystemInfoStorageUnit_extend);
add_test_case(moduleName, SystemInfoBuild_extend);
add_test_case(moduleName, SystemInfoBuild_manufacturer_attribute);
add_test_case(moduleName, SystemInfoBuild_model_attribute);
add_test_case(moduleName, SystemInfoDeviceOrientation_extend);
add_test_case(moduleName, SystemInfoStorage_extend);
add_test_case(moduleName, SystemInfo_in_tizen);
add_test_case(moduleName, SystemInfo_getPropertyValue_missarg);
add_test_case(moduleName, SystemInfo_getPropertyValue_with_errorCallback);
add_test_case(moduleName, SystemInfo_getPropertyValue_property_TypeMismatch);
add_test_case(moduleName, SystemInfo_getPropertyValue_successCallback_invalid_cb);
add_test_case(moduleName, SystemInfo_getPropertyValue_errorCallback_TypeMismatch);
add_test_case(moduleName, SystemInfo_getPropertyValue_errorCallback_invalid_cb);
add_test_case(moduleName, SystemInfo_addPropertyValueChangeListener_options_TypeMismatch);
add_test_case(moduleName, SystemInfo_addPropertyValueChangeListener_property_TypeMismatch);
add_test_case(moduleName, SystemInfo_addPropertyValueChangeListener_missarg);
add_test_case(moduleName, SystemInfo_addPropertyValueChangeListener_successCallback_TypeMismatch);
add_test_case(moduleName, SystemInfo_addPropertyValueChangeListener_successCallback_invalid_cb);
add_test_case(moduleName, SystemInfo_removePropertyValueChangeListener_exist);
add_test_case(moduleName, SystemInfoPropertySuccessCallback_onsuccess);
add_test_case(moduleName, SystemInfoDeviceCapability_accelerometerWakeup_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_autoRotation_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_barometerWakeup_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_camera_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_dataEncryption_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_graphicsAcceleration_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_gyroscopeWakeup_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_inputKeyboardLayout_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_magnetometerWakeup_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_nfcReservedPush_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_opengles_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_openglestextureFormat_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_photometerWakeup_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_photometer_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_proximityWakeup_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_push_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_secureElement_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_speechSynthesis_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_telephonyMms_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_telephonySms_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_telephony_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_tiltmeterWakeup_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_tiltmeter_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_visionFaceRecognition_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_visionImageRecognition_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_visionQrcodeGeneration_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_visionQrcodeRecognition_attribute);
add_test_case(moduleName, SystemInfo_removePropertyValueChangeListener_all_properties);
add_test_case(moduleName, SystemInfoPropertySuccessCallback_onsuccess_CPU);
add_test_case(moduleName, SystemInfoPropertySuccessCallback_onsuccess_DeviceOrientation);
add_test_case(moduleName, SystemInfoDisplay_constructor_display);
add_test_case(moduleName, SystemInfoPropertySuccessCallback_onsuccess_Storage);
add_test_case(moduleName, SystemInfo_addPropertyValueChangeListener);
add_test_case(moduleName, SystemInfo_addPropertyValueChangeListener_with_options);
add_test_case(moduleName, SystemInfo_removePropertyValueChangeListener);
add_test_case(moduleName, SystemInfo_getPropertyValue_successCallback_missarg);
add_test_case(moduleName, SystemInfo_addPropertyValueChangeListener_successCallback_missarg);
add_test_case(moduleName, SystemInfo_getPropertyValue_successCallback_TypeMismatch);
add_test_case(moduleName, SystemInfoPropertySuccessCallback_onsuccess_Battery);
add_test_case(moduleName, SystemInfoPropertySuccessCallback_onsuccess_Build);
add_test_case(moduleName, SystemInfoPropertySuccessCallback_onsuccess_Display);
add_test_case(moduleName, SystemInfoPropertySuccessCallback_onsuccess_Peripheral);
add_test_case(moduleName, SystemInfoBuild_buildVersion_attribute);
add_test_case(moduleName, SystemInfoDeviceCapability_profile_attribute);
add_test_case(moduleName, SystemInfoDeviceOrientation_isAutoRotation_attribute);
add_test_case(moduleName, SystemInfo_addPropertyValueChangeListener_property_empty);
add_test_case(moduleName, SystemInfoDeviceCapability_accelerometer_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_barometer_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_cameraBack_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_inputKeyboard_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_location_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_nfc_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_openglesVersion_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_telephony_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_wifi_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_cameraFront_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_openglestextureFormat_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_gyroscope_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_magnetometer_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_photometer_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_proximity_dependency);
add_test_case(moduleName, SystemInfoDeviceCapability_tiltmeter_dependency);
