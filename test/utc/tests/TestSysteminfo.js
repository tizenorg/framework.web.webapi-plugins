/*
 * 
 * Copyright (c) 2011 Samsung Electronics Co., Ltd All Rights Reserved
 * PROPRIETARY/CONFIDENTIAL
 * 
 * This software is the confidential and proprietary information of SAMSUNG 
 * ELECTRONICS ("Confidential Information"). You agree and acknowledge that 
 * this software is owned by Samsung and you shall not disclose such 
 * Confidential Information and shall use it only in accordance with the terms 
 * of the license agreement you entered into with SAMSUNG ELECTRONICS. SAMSUNG 
 * make no representations or warranties about the suitability of the software, 
 * either express or implied, including but not limited to the implied 
 * warranties of merchantability, fitness for a particular purpose, or 
 * non-infringement. SAMSUNG shall not be liable for any damages suffered by 
 * licensee arising out of or related to this software.
 * 
 */

var SysteminfoObj = tizen.systeminfo;

var TYPE_MISMATCH_ERR = "TypeMismatchError";
var INVALID_VALUES_ERR = "InvalidValuesError";
var NOT_FOUND_ERR = "NotFoundError";
var UNKNOWN_ERR = "UnknownError";
var NOT_SUPPORTED_ERR = "NotSupportedError";
var PERMISSION_DENIED_ERR = "SecurityError";

function UTC_systeminfo_presence_P_001()
{
    TestEngine.test("Checking tizen object", tizen);
    TestEngine.test("Checking Systeminfo object", SysteminfoObj);
    TestEngine.test("Checking type of isSupported", isFunction(SysteminfoObj.getCapabilities));
    TestEngine.test("Checking type of getPropertyValue", isFunction(SysteminfoObj.getPropertyValue));
    TestEngine.test("Checking type of addPropertyValueChangeListener", isFunction(SysteminfoObj.addPropertyValueChangeListener));
    TestEngine.test("Checking type of removePropertyValueChangeListener", isFunction(SysteminfoObj.removePropertyValueChangeListener));
}

function systeminfoErrorCallback(err) {
	TestEngine.test("ErrCB : err.name [" + err.name + "] err.msg[" + err.message + "]", false);
}

function systeminfoBatterySuccessCallback(battery) {
	TestEngine.test("level attribute ", isNumber(battery.level));
	TestEngine.test("isCharging attribute ", isBoolean(battery.isCharging));
}

function systeminfoCpuSuccessCallback(cpu) {
	TestEngine.test("load attribute ", isNumber(cpu.load));
}

function systeminfoStorageSuccessCallback(storage) {
	TestEngine.test("type attribute ", isString(storage.units[0].type));
	TestEngine.test("capacity attribute ", isNumber(storage.units[0].capacity));
	TestEngine.test("availableCapacity attribute ", isNumber(storage.units[0].availableCapacity));
	TestEngine.test("isRemoveable attribute ", isBoolean(storage.units[0].isRemoveable));
}

function systeminfoDisplaySuccessCallback(display) {
	TestEngine.test("resolutionWidth ", isNumber(display.resolutionWidth));
	TestEngine.test("resolutionHeight ", isNumber(display.resolutionHeight));
	TestEngine.test("dotsPerInchWidth ", isNumber(display.dotsPerInchWidth));
	TestEngine.test("dotsPerInchHeight ", isNumber(display.dotsPerInchHeight));
	TestEngine.test("physicalWidth ", isNumber(display.physicalWidth));
	TestEngine.test("physicalHeight ", isNumber(display.physicalHeight));
	TestEngine.test("brightness ", isNumber(display.brightness));
}

function systeminfoDeviceOrientationSuccessCallback(deviceorientation) {
	TestEngine.test("status ", isString(deviceorientation.status));
}

function systeminfoWifiNetworkSuccessCallback(wifinetwork) {
	TestEngine.test("status ", isString(wifinetwork.status));
	TestEngine.test("ipAddress ", isString(wifinetwork.ipAddress));
	TestEngine.test("ipv6Address ", isString(wifinetwork.ipv6Address));	
	TestEngine.test("ssid ", isString(wifinetwork.ssid));
	TestEngine.test("signalStrength ", isNumber(wifinetwork.signalStrength));
}

function systeminfoCellularNetworkSuccessCallback(cellularnetwork) {
	TestEngine.test("status ", isString(cellularnetwork.status));
	TestEngine.test("ipAddress ", isString(cellularnetwork.ipAddress));
	TestEngine.test("ipv6Address ", isString(cellularnetwork.ipv6Address));	
	TestEngine.test("apn ", isString(cellularnetwork.apn));
	TestEngine.test("mcc ", isNumber(cellularnetwork.mcc));
	TestEngine.test("mnc ", isNumber(cellularnetwork.mnc));
	TestEngine.test("lac ", isNumber(cellularnetwork.lac));
	TestEngine.test("cellId ", isNumber(cellularnetwork.cellId));
	TestEngine.test("isRoaming ", isBoolean(cellularnetwork.isRoaming));
	TestEngine.test("isFlightMode ", isBoolean(cellularnetwork.isFlightMode));
	TestEngine.test("imei ", isString(cellularnetwork.imei));
}

function systeminfoNetworkSuccessCallback(network) {
	TestEngine.test("networkType ", isString(network.networkType));
}

function systeminfoSIMSuccessCallback(sim) {
	TestEngine.test("operatorName ", isString(sim.operatorName));
	TestEngine.test("msisdn ", isString(sim.msisdn));
	TestEngine.test("iccid ", isString(sim.iccid));
	TestEngine.test("mcc ", isNumber(sim.mcc));
	TestEngine.test("mnc ", isNumber(sim.mnc));
	TestEngine.test("msin ", isString(sim.msin));
	TestEngine.test("spn ", isString(sim.spn));	
}

function systeminfoBuildSuccessCallback(build) {
	TestEngine.test("model ", isString(build.model));
	TestEngine.test("manufacturer ", isString(build.manufacturer));
}

function systeminfoLocaleSuccessCallback(locale) {
	TestEngine.test("language ", isString(locale.country));
	TestEngine.test("country ", isString(locale.country));
}

function systeminfoPeripheralSuccessCallback(peripheral) {
	TestEngine.test("isVideoOutputOn ", isBoolean(peripheral.isVideoOutputOn));
}

function systeminfoInvalidSuccessCallback(value) {
	TestEngine.logErr("Invaild test is failed");
}

function systeminfoInvalidValueErrorCallback(err) {
	TestEngine.assertEqual("Exception check", INVALID_VALUES_ERR, err.name);
}

function systeminfoInvalidErrorCallback(err) {
	TestEngine.logErr("Invaild test is failed");
}

//==============================================================================================================================================
function UTC_systeminfo_getCapabilities_P_001()
{
	try {
		var deviceCapability = SysteminfoObj.getCapabilities();
		TestEngine.test("bluetooth ", isBoolean(deviceCapability.bluetooth));
		TestEngine.test("nfc ", isBoolean(deviceCapability.nfc));
		TestEngine.test("multiTouchCount ", isNumber(deviceCapability.multiTouchCount));
		TestEngine.test("inputKeyboard ", isBoolean(deviceCapability.inputKeyboard));
		TestEngine.test("wifi ", isBoolean(deviceCapability.wifi));
		TestEngine.test("wifiDirect ", isBoolean(deviceCapability.wifiDirect));
		TestEngine.test("openglesVersion1_1 ", isBoolean(deviceCapability.openglesVersion1_1));
		TestEngine.test("openglesVersion2_0 ", isBoolean(deviceCapability.openglesVersion2_0));
		TestEngine.test("fmRadio ", isBoolean(deviceCapability.fmRadio));
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getCapabilities_P_002()
{
	try {
		var deviceCapability = SysteminfoObj.getCapabilities();
		TestEngine.test("platformVersion ", isString(deviceCapability.platformVersion));
		TestEngine.test("platformName ", isString(deviceCapability.platformName));
		//This capability is not supported in wearables
		//TestEngine.test("nativeApiVersion ", isString(deviceCapability.nativeApiVersion));
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getCapabilities_P_003()
{
	try {
		var deviceCapability = SysteminfoObj.getCapabilities();
		TestEngine.test("cameraFrontFlash ", isBoolean(deviceCapability.cameraFrontFlash));
		TestEngine.test("cameraBack ", isBoolean(deviceCapability.cameraBack));
		TestEngine.test("cameraBackFlash ", isBoolean(deviceCapability.cameraBackFlash));
		TestEngine.test("location ", isBoolean(deviceCapability.location));
		TestEngine.test("locationGps ", isBoolean(deviceCapability.locationGps));
		TestEngine.test("locationWps ", isBoolean(deviceCapability.locationWps));
		TestEngine.test("microphone ", isBoolean(deviceCapability.microphone));
		TestEngine.test("usbHost ", isBoolean(deviceCapability.usbHost));
		TestEngine.test("usbAccessory ", isBoolean(deviceCapability.usbAccessory));
		TestEngine.test("screenOutputRca ", isBoolean(deviceCapability.screenOutputRca));
		TestEngine.test("screenOutputHdmi ", isBoolean(deviceCapability.screenOutputHdmi));
		TestEngine.test("platformCoreCpuArch ", isString(deviceCapability.platformCoreCpuArch));
		TestEngine.test("platformCoreFpuArch ", isString(deviceCapability.platformCoreFpuArch));
		TestEngine.test("sipVoip ", isBoolean(deviceCapability.sipVoip));
		//This capability is not supported in wearables
		//TestEngine.test("duid ", isString(deviceCapability.duid));
		TestEngine.test("speechRecognition ", isBoolean(deviceCapability.speechRecognition));
		TestEngine.test("accelerometer ", isBoolean(deviceCapability.accelerometer));
		TestEngine.test("barometer ", isBoolean(deviceCapability.barometer));
		TestEngine.test("gyroscope ", isBoolean(deviceCapability.gyroscope));
		TestEngine.test("magnetometer ", isBoolean(deviceCapability.magnetometer));
		TestEngine.test("proximity ", isBoolean(deviceCapability.proximity));		
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_001()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoBatterySuccessCallback, systeminfoErrorCallback);
	try {
		SysteminfoObj.getPropertyValue("BATTERY", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_002()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoCpuSuccessCallback, systeminfoErrorCallback);
	try {
		SysteminfoObj.getPropertyValue("CPU", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_003()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoStorageSuccessCallback, systeminfoErrorCallback);
	try {
		SysteminfoObj.getPropertyValue("STORAGE", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_004()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoDisplaySuccessCallback, systeminfoErrorCallback);
	try {
		SysteminfoObj.getPropertyValue("DISPLAY", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_005()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoDeviceOrientationSuccessCallback, null);
	try {
		SysteminfoObj.getPropertyValue("DEVICE_ORIENTATION", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_006()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoWifiNetworkSuccessCallback, undefined);
	try {
		SysteminfoObj.getPropertyValue("WIFI_NETWORK", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_007()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoCellularNetworkSuccessCallback, null);
	try {
		SysteminfoObj.getPropertyValue("CELLULAR_NETWORK", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_008()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoNetworkSuccessCallback, null);
	try {
		SysteminfoObj.getPropertyValue("NETWORK", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_009()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoSIMSuccessCallback, null);
	try {
		SysteminfoObj.getPropertyValue("SIM", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_010()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoBuildSuccessCallback, null);
	try {
		SysteminfoObj.getPropertyValue("BUILD", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_011()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoLocaleSuccessCallback, null);
	try {
		SysteminfoObj.getPropertyValue("LOCALE", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_P_012()
{
	var cb = TestEngine.registerCallback("getPropertyValue", systeminfoPeripheralSuccessCallback, null);
	try {
		SysteminfoObj.getPropertyValue("PERIPHERAL", cb.successCallback, cb.errorCallback); 
	} catch(err) {
		TestEngine.test("Exception : getPropertyValueTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_getPropertyValue_N_001()
{
	try {
		SysteminfoObj.getPropertyValue("Test", systeminfoInvalidSuccessCallback, null); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_002()
{
	try {
		SysteminfoObj.getPropertyValue("", systeminfoInvalidSuccessCallback, null); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_003()
{
	try {
		SysteminfoObj.getPropertyValue(0, systeminfoInvalidSuccessCallback, null); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_004()
{
	try {
		SysteminfoObj.getPropertyValue(true, systeminfoInvalidSuccessCallback, null); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_005()
{
	try {
		SysteminfoObj.getPropertyValue(['a'], systeminfoInvalidSuccessCallback, null); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_006()
{
	try {
		SysteminfoObj.getPropertyValue(undefined, systeminfoInvalidSuccessCallback, null); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_007()
{
	try {
		SysteminfoObj.getPropertyValue(null, systeminfoInvalidSuccessCallback); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_008()
{
	try {
		SysteminfoObj.getPropertyValue("BATTERY"); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_009()
{
	try {
		SysteminfoObj.getPropertyValue(); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_010()
{
	try {
		SysteminfoObj.getPropertyValue("BATTERY", "", systeminfoInvalidValueErrorCallback); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_011()
{
	try {
		SysteminfoObj.getPropertyValue("BATTERY", 0, systeminfoInvalidValueErrorCallback); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_012()
{
	try {
		SysteminfoObj.getPropertyValue(true, systeminfoInvalidValueErrorCallback, "BATTERY"); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_013()
{
	try {
		SysteminfoObj.getPropertyValue("BATTERY", ['a'], systeminfoInvalidValueErrorCallback); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_014()
{
	try {
		SysteminfoObj.getPropertyValue("BATTERY", undefined, systeminfoInvalidValueErrorCallback); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_015()
{
	try {
		SysteminfoObj.getPropertyValue("BATTERY", null, systeminfoInvalidValueErrorCallback); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_016()
{
	try {
		SysteminfoObj.getPropertyValue("BATTERY", systeminfoInvalidSuccessCallback, ""); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_017()
{
	try {
		SysteminfoObj.getPropertyValue("BATTERY", systeminfoInvalidSuccessCallback, 0); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_018()
{
	try {
		SysteminfoObj.getPropertyValue("BATTERY", systeminfoInvalidSuccessCallback, true); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_getPropertyValue_N_019()
{
	try {
		SysteminfoObj.getPropertyValue("BATTERY", systeminfoInvalidSuccessCallback, ['a']); 
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_001()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoBatterySuccessCallback, systeminfoErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_002()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("DISPLAY", systeminfoDisplaySuccessCallback, systeminfoErrorCallback, {lowThreshold: 0.3});
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_003()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("CPU", systeminfoCpuSuccessCallback, systeminfoErrorCallback, {timeout: 10000});
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_004()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("STORAGE", systeminfoStorageSuccessCallback, systeminfoErrorCallback);
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_005()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("DEVICE_ORIENTATION", systeminfoDeviceOrientationSuccessCallback, systeminfoErrorCallback, null);
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_006()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("LOCALE", systeminfoLocaleSuccessCallback, systeminfoErrorCallback, undefined);
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_007()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("NETWORK", systeminfoNetworkSuccessCallback, null, null);
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_008()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("WIFI_NETWORK", systeminfoWifiNetworkSuccessCallback, null, null);
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_009()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("CELLULAR_NETWORK", systeminfoCellularNetworkSuccessCallback, null, null);
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_010()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("PERIPHERAL", systeminfoPeripheralSuccessCallback, null, null);
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_P_011()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("SIM", systeminfoSIMSuccessCallback, null, null);
		if (value > 0) {
			TestEngine.logOK("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logErr("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_001()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("Test", systeminfoInvalidSuccessCallback, systeminfoInvalidErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_002()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("", systeminfoInvalidSuccessCallback, systeminfoInvalidErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_003()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener(0, systeminfoInvalidSuccessCallback, systeminfoInvalidErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_004()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener(true, systeminfoInvalidSuccessCallback, systeminfoInvalidErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_005()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener(['a'], systeminfoInvalidSuccessCallback, systeminfoInvalidErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_006()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener(undefined, systeminfoInvalidSuccessCallback, systeminfoInvalidErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_007()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener(null, systeminfoInvalidSuccessCallback, systeminfoInvalidErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_008()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoInvalidSuccessCallback, "", {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_009()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoInvalidSuccessCallback, 0, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_010()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoInvalidSuccessCallback, true, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_011()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", "", systeminfoErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_012()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", 0, systeminfoErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_013()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", true, systeminfoErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_014()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", ['a'], systeminfoErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_015()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", undefined, systeminfoErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_016()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", null, systeminfoErrorCallback, {highThreshold: 0.9});
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_017()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY");
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_addPropertyValueChangeListener_N_018()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener();
		if (value > 0) {
			TestEngine.logErr("Identifier (" + value + ") is valid");
			SysteminfoObj.removePropertyValueChangeListener(value);
		} else {
			TestEngine.logOK("Identifier (" + value + ") is not valid");
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", TYPE_MISMATCH_ERR, err.name);
	}
}

function UTC_systeminfo_removePropertyValueChangeListener_P_001()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoBatterySuccessCallback, systeminfoErrorCallback);
		if (value > 0) {
			try {
				SysteminfoObj.removePropertyValueChangeListener(value);
				TestEngine.logOK("listener is removed");
			} catch(err) {
				TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
			}				
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_removePropertyValueChangeListener_P_002()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("CELLULAR_NETWORK", systeminfoCellularNetworkSuccessCallback, systeminfoErrorCallback);
		if (value > 0) {
			try {
				SysteminfoObj.removePropertyValueChangeListener(value);
				TestEngine.logOK("listener is removed");
			} catch(err) {
				TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
			}				
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_removePropertyValueChangeListener_P_003()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("SIM", systeminfoSIMSuccessCallback, systeminfoErrorCallback);
		if (value > 0) {
			try {
				SysteminfoObj.removePropertyValueChangeListener(value);
				TestEngine.logOK("listener is removed");
			} catch(err) {
				TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
			}				
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_removePropertyValueChangeListener_N_001()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoBatterySuccessCallback, systeminfoErrorCallback);
		if (value > 0) {
			try {
				SysteminfoObj.removePropertyValueChangeListener("");
			} catch(err) {
				TestEngine.assertEqual("Exception check", INVALID_VALUES_ERR, err.name);
				SysteminfoObj.removePropertyValueChangeListener(value);				
			}
		}
	} catch(err) {
		TestEngine.assertEqual("Exception check", INVALID_VALUES_ERR, err.name);
	}
}

function UTC_systeminfo_removePropertyValueChangeListener_N_002()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoBatterySuccessCallback, systeminfoErrorCallback);
		if (value > 0) {
			try {
				SysteminfoObj.removePropertyValueChangeListener(0);
			} catch(err) {
				TestEngine.assertEqual("Exception check", INVALID_VALUES_ERR, err.name);
				SysteminfoObj.removePropertyValueChangeListener(value);				
			}
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_removePropertyValueChangeListener_N_003()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoBatterySuccessCallback, systeminfoErrorCallback);
		if (value > 0) {
			try {
				SysteminfoObj.removePropertyValueChangeListener(false);
			} catch(err) {
				TestEngine.assertEqual("Exception check", INVALID_VALUES_ERR, err.name);
				SysteminfoObj.removePropertyValueChangeListener(value);				
			}
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_removePropertyValueChangeListener_N_004()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoBatterySuccessCallback, systeminfoErrorCallback);
		if (value > 0) {
			try {
				SysteminfoObj.removePropertyValueChangeListener(['a']);
			} catch(err) {
				TestEngine.assertEqual("Exception check", INVALID_VALUES_ERR, err.name);
				SysteminfoObj.removePropertyValueChangeListener(value);				
			}
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_removePropertyValueChangeListener_N_005()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoBatterySuccessCallback, systeminfoErrorCallback);
		if (value > 0) {
			try {
				SysteminfoObj.removePropertyValueChangeListener(undefined);
			} catch(err) {
				TestEngine.assertEqual("Exception check", INVALID_VALUES_ERR, err.name);
				SysteminfoObj.removePropertyValueChangeListener(value);				
			}
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}

function UTC_systeminfo_removePropertyValueChangeListener_N_006()
{
	try {
		var value = SysteminfoObj.addPropertyValueChangeListener("BATTERY", systeminfoBatterySuccessCallback, systeminfoErrorCallback);
		if (value > 0) {
			try {
				SysteminfoObj.removePropertyValueChangeListener(null);
			} catch(err) {
				TestEngine.assertEqual("Exception check", INVALID_VALUES_ERR, err.name);
				SysteminfoObj.removePropertyValueChangeListener(value);				
			}
		}
	} catch(err) {
		TestEngine.test("Exception : addPropertyValueChangeListenerTest() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
}
