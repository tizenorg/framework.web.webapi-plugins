
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

/**
 * 		Tizen SystemSetting UNIT test
 */

 
var testModuleName = "[SystemSetting]";
var SystemSettingObj = tizen.systemsetting;
var mp3Path = "/opt/usr/media/Sounds/Over the horizon.mp3"

function presenceTest(){
	TestEngine.test("Checking tizen object", tizen);
	TestEngine.test("Checking tizen systemsetting object", SystemSettingObj);
	TestEngine.test("Checking of systemsetting setProperty", isFunction(SystemSettingObj.setProperty));	//check setProperty Function
	TestEngine.test("Checking of systemsetting getProperty", isFunction(SystemSettingObj.getProperty));	//check getProperty Function
}

// Test getProperty 1. Argument - vaild Case
function UTC_systemsetting_getProperty_P_001() {
	var testName = "getProperty test V01";

	function getPropertyCallback(resultValue) {
		TestEngine.log("resultValue:" + resultValue);
		TestEngine.test(testName + " getProperty Success Callback arrived", true);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", false);
	}
	
	try
	{
		var callbackObject = TestEngine.registerCallback("getProperty ", getPropertyCallback, errorCallback);
		tizen.systemsetting.getProperty("HOME_SCREEN", callbackObject.successCallback, callbackObject.errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
}

// Test getProperty 1. Argument - vaild Case
function UTC_systemsetting_getProperty_P_002() {
	var testName = "getProperty test V02";

	function getPropertyCallback(resultValue) {
		TestEngine.log("resultValue:" + resultValue);
		TestEngine.test(testName + " getProperty Success Callback arrived", true);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", false);
	}
	
	try
	{
		var callbackObject = TestEngine.registerCallback("getProperty ", getPropertyCallback, errorCallback);
		tizen.systemsetting.getProperty("LOCK_SCREEN", callbackObject.successCallback, callbackObject.errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
}
// Test getProperty 1. Argument - vaild Case
function UTC_systemsetting_getProperty_P_003() {
	var testName = "getProperty test V03";

	function getPropertyCallback(resultValue) {
		TestEngine.log("resultValue:" + resultValue);
		TestEngine.test(testName + " getProperty Success Callback arrived", true);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", false);
	}
	
	try
	{
		var callbackObject = TestEngine.registerCallback("getProperty ", getPropertyCallback, errorCallback);
		tizen.systemsetting.getProperty("INCOMING_CALL", callbackObject.successCallback, callbackObject.errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}

}
// Test getProperty 1. Argument - vaild Case
function UTC_systemsetting_getProperty_P_004() {
	var testName = "getProperty test V04";
	function getPropertyCallback(resultValue) {
		TestEngine.log("resultValue:" + resultValue);
		TestEngine.test(testName + " getProperty Success Callback arrived", true);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", false);
	}
	
	try
	{
		var callbackObject = TestEngine.registerCallback("getProperty ", getPropertyCallback, errorCallback);
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", callbackObject.successCallback, callbackObject.errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
}

function UTC_systemsetting_getProperty_P_005() {
	var testName = "getProperty test V05";
	function getPropertyCallback(resultValue) {
		TestEngine.log("resultValue:" + resultValue);
		TestEngine.test(testName + " getProperty Success Callback arrived", true);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", false);
	}
	
	try
	{
//		var callbackObject = TestEngine.registerCallback("getProperty ", getPropertyCallback, errorCallback);
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", getPropertyCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
}

function UTC_systemsetting_getProperty_P_006() {
	var testName = "getProperty test V06";
	function getPropertyCallback(resultValue) {
		TestEngine.log("resultValue:" + resultValue);
		TestEngine.test(testName + " getProperty Success Callback arrived", true);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", false);
	}
	
	try
	{
//		var callbackObject = TestEngine.registerCallback("getProperty ", getPropertyCallback, errorCallback);
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", getPropertyCallback, null);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
}

function UTC_systemsetting_getProperty_N_001() {
	var testName = "getProperty test V05";

	function getPropertyCallback() {
		TestEngine.log("resultValue:" + resultValue);
			TestEngine.test(testName + " getProperty Success Callback arrived", true);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", false);
	}
	
	try
	{
		tizen.systemsetting.getProperty("HELLO", getPropertyCallback, errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " getProperty exception arrived", true);
	}
		
}

function UTC_systemsetting_getProperty_N_002() {
	var testName = "getProperty test Argument 2, Invaild Test 01 : input [null] to argument 2";
	
	function getPropertyCallback() {
		TestEngine.test(testName + " getProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.getProperty("HOME_SCREEN", null, errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}

function UTC_systemsetting_getProperty_N_003() {
	var testName = "getProperty test Argument 3, Invaild Test 01 : input [number] to argument 2";
	
	function getPropertyCallback() {
		TestEngine.test(testName + " getProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", 1, errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}

function UTC_systemsetting_getProperty_N_004() {
	var testName = "getProperty test Argument 3, Invaild Test 01 : input [string] to argument 2";
	
	function getPropertyCallback() {
		TestEngine.test(testName + " getProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", "test", errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}

function UTC_systemsetting_getProperty_N_005() {
	var testName = "getProperty test Argument 3, Invaild Test 01 : input [number] to argument 3";
	
	function getPropertyCallback() {
		TestEngine.test(testName + " getProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", getPropertyCallback, 1);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}
function UTC_systemsetting_getProperty_N_006() {
	var testName = "getProperty test Argument 3, Invaild Test 01 : input [string] to argument 3";
	
	function getPropertyCallback() {
		TestEngine.test(testName + " getProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", getPropertyCallback, "test");
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}
function UTC_systemsetting_getProperty_N_007() {
	var testName = "getProperty test Argument 3, Invaild Test 01 : input argument one";
	
	function getPropertyCallback() {
		TestEngine.test(testName + " getProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL");
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}

// Test setProperty 1. Argument - vaild Case
function UTC_systemsetting_setProperty_P_001() {
	var testName = "setProperty test V01";
	var path = null;

	function getPropertyCallback(value) {
		path = value;
		TestEngine.test(testName + " getProperty Success Callback arrived", true);

		function setPropertyCallback() {
			TestEngine.test(testName + " setProperty Success Callback arrived", true);
		}
		
		function errorCallback(error) {
			TestEngine.test(testName + " errorCallback arrived", false);
		}			

		try
		{
			tizen.systemsetting.setProperty("HOME_SCREEN", path, setPropertyCallback, errorCallback);			
		}
		catch(exception)
		{
			TestEngine.test(testName + " exception occored", false);
		}
	}	
	
	try
	{
		tizen.systemsetting.getProperty("HOME_SCREEN", getPropertyCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
		
}

// Test setProperty 1. Argument - vaild Case
function UTC_systemsetting_setProperty_P_002() {
	var testName = "setProperty test V02";
	var path = null;

	function getPropertyCallback(value) {
		path = value;
		TestEngine.test(testName + " getProperty Success Callback arrived", true);

		function setPropertyCallback() {
			TestEngine.test(testName + " setProperty Success Callback arrived", true);
		}
		
		function errorCallback(error) {
			TestEngine.test(testName + " errorCallback arrived", false);
		}			

		try
		{
			tizen.systemsetting.setProperty("LOCK_SCREEN", path, setPropertyCallback, errorCallback);			
		}
		catch(exception)
		{
			TestEngine.test(testName + " exception occored", false);
		}
	}	
	
	try
	{
		tizen.systemsetting.getProperty("LOCK_SCREEN", getPropertyCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
		
}

// Test setProperty 1. Argument - vaild Case
function UTC_systemsetting_setProperty_P_003() {
	var testName = "setProperty test V03";
	var path = null;

	function getPropertyCallback(value) {
		path = value;
		TestEngine.test(testName + " getProperty Success Callback arrived", true);

		function setPropertyCallback() {
			TestEngine.test(testName + " setProperty Success Callback arrived", true);
		}
		
		function errorCallback(error) {
			TestEngine.test(testName + " errorCallback arrived", false);
		}			

		try
		{
			tizen.systemsetting.setProperty("INCOMING_CALL", path, setPropertyCallback, errorCallback);			
		}
		catch(exception)
		{
			TestEngine.test(testName + " exception occored", false);
		}
	}	
	
	try
	{
		tizen.systemsetting.getProperty("INCOMING_CALL", getPropertyCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
		
}

// Test setProperty 1. Argument - vaild Case
function UTC_systemsetting_setProperty_P_004() {
	var testName = "setProperty test V04";
	var path = null;

	function getPropertyCallback(value) {
		path = value;
		TestEngine.test(testName + " getProperty Success Callback arrived", true);

		function setPropertyCallback() {
			TestEngine.test(testName + " setProperty Success Callback arrived", true);
		}
		
		function errorCallback(error) {
			TestEngine.test(testName + " errorCallback arrived", false);
		}			

		try
		{
			tizen.systemsetting.setProperty("NOTIFICATION_EMAIL", path, setPropertyCallback, errorCallback);
		}
		catch(exception)
		{
			TestEngine.test(testName + " exception occored", false);
		}
	}	
	
	try
	{
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", getPropertyCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
		
}

//Test setProperty 1. Argument - vaild Case
function UTC_systemsetting_setProperty_P_005() {
	var testName = "setProperty test V05";
	var path = null;

	function getPropertyCallback(value) {
		path = value;
		TestEngine.test(testName + " getProperty Success Callback arrived", true);

		function setPropertyCallback() {
			TestEngine.test(testName + " setProperty Success Callback arrived", true);
		}
		
		function errorCallback(error) {
			TestEngine.test(testName + " errorCallback arrived", false);
		}			

		try
		{
			tizen.systemsetting.setProperty("NOTIFICATION_EMAIL", path, setPropertyCallback);
		}
		catch(exception)
		{
			TestEngine.test(testName + " exception occored", false);
		}
	}	
	
	try
	{
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", getPropertyCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
		
}

function UTC_systemsetting_setProperty_P_006() {
	var testName = "setProperty test V05";
	var path = null;

	function getPropertyCallback(value) {
		path = value;
		TestEngine.test(testName + " getProperty Success Callback arrived", true);

		function setPropertyCallback() {
			TestEngine.test(testName + " setProperty Success Callback arrived", true);
		}
		
		function errorCallback(error) {
			TestEngine.test(testName + " errorCallback arrived", false);
		}			

		try
		{
			tizen.systemsetting.setProperty("NOTIFICATION_EMAIL", path, setPropertyCallback, null);
		}
		catch(exception)
		{
			TestEngine.test(testName + " exception occored", false);
		}
	}	
	
	try
	{
		tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", getPropertyCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occored", false);
	}
		
}

function UTC_systemsetting_setProperty_N_001() {
	var testName = "setProperty test V05";

	function setPropertyCallback() {
		TestEngine.log("resultValue:" + resultValue);
			TestEngine.test(testName + " setProperty Success Callback arrived", true);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", false);
	}
	
	try
	{
		tizen.systemsetting.setProperty("HELLO", mp3Path, setPropertyCallback, errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " setProperty exception arrived", true);
	}
		
}

function UTC_systemsetting_setProperty_N_002() {
	var testName = "setProperty test Argument 2, Invaild Test 01 : input [null] to argument 3";
	
	function setPropertyCallback() {
		TestEngine.test(testName + " setProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.setProperty("HOME_SCREEN", mp3Path, null, errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}

function UTC_systemsetting_setProperty_N_003() {
	var testName = "setProperty test Argument 3, Invaild Test 01 : input [number] to argument 3";
	
	function setPropertyCallback() {
		TestEngine.test(testName + " setProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.setProperty("NOTIFICATION_EMAIL", mp3Path, 1, errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}

function UTC_systemsetting_setProperty_N_004() {
	var testName = "setProperty test Argument 3, Invaild Test 01 : input [string] to argument 3";
	
	function setPropertyCallback() {
		TestEngine.test(testName + " setProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.setProperty("NOTIFICATION_EMAIL", mp3Path, "test", errorCallback);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}

function UTC_systemsetting_setProperty_N_005() {
	var testName = "setProperty test Argument 3, Invaild Test 01 : input [number] to argument 4";
	
	function setPropertyCallback() {
		TestEngine.test(testName + " setProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.setProperty("NOTIFICATION_EMAIL", mp3Path, setPropertyCallback, 1);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}
function UTC_systemsetting_setProperty_N_006() {
	var testName = "setProperty test Argument 3, Invaild Test 01 : input [string] to argument 4";

	function setPropertyCallback() {
		TestEngine.test(testName + " setProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.setProperty("NOTIFICATION_EMAIL", mp3Path, setPropertyCallback,"test");
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}

function UTC_systemsetting_setProperty_N_007() {
	var testName = "setProperty test Argument 3, Invaild Test 01 : input argument two";
	
	function setPropertyCallback() {
		TestEngine.test(testName + " setProperty Success Callback arrived", false);
	}
	
	function errorCallback(error) {
		TestEngine.test(testName + " errorCallback arrived", true);
	}

	try
	{
		tizen.systemsetting.setProperty("NOTIFICATION_EMAIL", mp3Path);
	}
	catch(exception)
	{
		TestEngine.test(testName + " exception occured", true);
	}
}
