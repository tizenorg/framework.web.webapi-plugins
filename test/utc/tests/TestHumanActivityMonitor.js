
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


var UNKNOWN_ERR = "UnknownError";
var NOT_SUPPORTED_ERR   = "NotSupportedError";
var TYPE_MISMATCH_ERR   = "TypeMismatchError";
var INVALID_VALUES_ERR   = "InvalidValuesError";
var SERVICE_NOT_AVAILABLE_ERR = "ServiceNotAvailableError";
var NOT_FOUND_ERR       = "NotFoundError";
var ERROR_STR = "Error";
var ERROR_NUM = 3;


function UTC_humanactivitymonitor_presence_P_001()
{
    TestEngine.test("Checking bookmark object", tizen.humanactivitymonitor);
}


function onSuccessCB(resultSet){
    
    TestEngine.log("CB /Status "+resultSet.stepStatus
			+"/ speed "+resultSet.speed
			+"/ Frequency "+resultSet.walkingFrequency
			+"/ Distance "+resultSet.cumulativeDistance
			+"/ Calorie "+resultSet.cumulativeCalorie
			+"/ Total count "+resultSet.cumulativeTotalStepCount
			+"/ Walk count"+resultSet.cumulativeWalkStepCount
			+"/ Run count"+resultSet.cumulativeRunStepCount);
    
}

function onErrorCB(resultSet){
    TestEngine.log("Error CB");
}


function UTC_HumanActivityMonitor_PEDOMETER_Start_P_001() {
	try {
		var handle = tizen.humanactivitymonitor.start("PEDOMETER",onSuccessCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("PEDOMETER");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Pedometer Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}

function UTC_HumanActivityMonitor_PEDOMETER_Start_P_002() {
	try {
		var handle = tizen.humanactivitymonitor.start("PEDOMETER",onSuccessCB, onErrorCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("PEDOMETER");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Pedometer Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}


function UTC_HumanActivityMonitor_PEDOMETER_Start_P_003() {
	try {
		var handle = tizen.humanactivitymonitor.start("PEDOMETER",onSuccessCB, null);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("PEDOMETER");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Pedometer Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}

function UTC_HumanActivityMonitor_PEDOMETER_Start_P_004() {
	try {
		var handle = tizen.humanactivitymonitor.start("PEDOMETER",onSuccessCB, onErrorCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("PEDOMETER");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Pedometer Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}


function UTC_HumanActivityMonitor_Wrist_up_Start_P_001() {
	try {
		var handle = tizen.humanactivitymonitor.start("WRIST_UP",onSuccessCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("WRIST_UP");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Wrist_up Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}


function UTC_HumanActivityMonitor_Wrist_up_Start_P_002() {
	try {
		var handle = tizen.humanactivitymonitor.start("WRIST_UP",onSuccessCB,onErrorCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("WRIST_UP");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Wrist_up Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}


function UTC_HumanActivityMonitor_HRM_Start_P_001() {
	try {
		var handle = tizen.humanactivitymonitor.start("HRM",onSuccessCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("HRM");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("HRM Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}


function UTC_HumanActivityMonitor_HRM_Start_P_002() {
	try {
		var handle = tizen.humanactivitymonitor.start("HRM",onSuccessCB,onErrorCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("HRM");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("HRM Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}

function UTC_HumanActivityMonitor_PEDOMETER_Stop_P_001() {
	try {
		var handle = tizen.humanactivitymonitor.start("PEDOMETER",onSuccessCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("PEDOMETER");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Pedometer Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}



function UTC_HumanActivityMonitor_PEDOMETER_Stop_P_002() {
	try {
		var handle = tizen.humanactivitymonitor.start("PEDOMETER",onSuccessCB,onErrorCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("PEDOMETER");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Pedometer Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}


function UTC_HumanActivityMonitor_Wrist_up_Stop_P_001() {
	try {
		var handle = tizen.humanactivitymonitor.start("WRIST_UP",onSuccessCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("WRIST_UP");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Wrist_up Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}


function UTC_HumanActivityMonitor_Wrist_up_Stop_P_002() {
	try {
		var handle = tizen.humanactivitymonitor.start("WRIST_UP",onSuccessCB,onErrorCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("WRIST_UP");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Wrist_up Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}


function UTC_HumanActivityMonitor_HRM_Stop_P_001() {
	try {
		var handle = tizen.humanactivitymonitor.start("HRM",onSuccessCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("HRM");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("HRM Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}


function UTC_HumanActivityMonitor_HRM_Stop_P_002() {
	try {
		var handle = tizen.humanactivitymonitor.start("HRM",onSuccessCB,onErrorCB);
		TestEngine.test("start completed", true);
		var handle2 = tizen.humanactivitymonitor.stop("HRM");
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("HRM Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}

function UTC_HumanActivityMonitor_PEDOMETER_getHumanActivityData_P_001() {
	try {
		var handle = tizen.humanactivitymonitor.start("PEDOMETER",onSuccessCB);
		TestEngine.test("start completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Pedometer Not Supported", true);
			return;
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}


	function getSuccessCB(results) {
		TestEngine.test("getHumanActivityData completed", true);
		var handle = tizen.humanactivitymonitor.stop("PEDOMETER");
		TestEngine.test("stop completed", true);
	}

	function getErrorCB(err)
	{
		try {
			var handle = tizen.humanactivitymonitor.stop("PEDOMETER");
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		} catch(err) {
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

	var cb = TestEngine.registerCallback("addnRemoveListener_valid_08", getSuccessCB, getErrorCB);

	try {
		var handle2 = tizen.humanactivitymonitor.getHumanActivityData("PEDOMETER", cb.successCallback, cb.errorCallback);
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Pedometer Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}



function UTC_HumanActivityMonitor_PEDOMETER_getHumanActivityData_P_002() {
	try {
		var handle = tizen.humanactivitymonitor.start("PEDOMETER",onSuccessCB);
		TestEngine.test("start completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Pedometer Not Supported", true);
			return;
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}


	function getSuccessCB(results) {
		TestEngine.test("getHumanActivityData completed", true);
		var handle = tizen.humanactivitymonitor.stop("PEDOMETER");
		TestEngine.test("stop completed", true);
	}

	function getErrorCB(err)
	{
		try {
			var handle = tizen.humanactivitymonitor.stop("PEDOMETER");
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		} catch(err) {
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

	var cb = TestEngine.registerCallback("addnRemoveListener_valid_08", getSuccessCB, getErrorCB);

	try {
		var handle2 = tizen.humanactivitymonitor.getHumanActivityData("PEDOMETER", cb.successCallback);
		TestEngine.test("stop completed", true);
	} catch(err) {
		if(err.name == NOT_SUPPORTED_ERR){
			TestEngine.test("Pedometer Not Supported", true);
		}else{
			TestEngine.test("Exception name : "+ err.name + " message : " + err.message, false);
		}
	}

}



