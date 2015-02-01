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


var TYPE_MISMATCH_ERR = 'TypeMismatchError';
var INVALID_VALUES_ERR = 'InvalidValuesError';
var NOT_SUPPORTED_ERR = 'NotSupportedError';
var NOT_FOUND_ERR = 'NotFoundError';

var CURR_APP_ID = 'tizenutc00.UnitTest';
var CURR_APP_SHARED_DIR = 'file:///opt/usr/apps/tizenutc00/shared';
var TEST_APP_SHARED_DIR = 'file:///opt/usr/apps/tizenutc01/shared';
var TEST_NUM = 1234;
var TEST_STR = "UTC_application_string";
var TEST_OBJ = new tizen.ApplicationControl("TEST_OPERATION");
var TEST_FUN = function() {};

var TEST_APP_ID_1 = 'tizenutc01.TizenUnitTCApp1';
var TEST_APP_ID_2 = 'tizenutc02.TizenUnitTCApp2';
var TEST_APP_ID_3 = 'tizenutc03.TizenUnitTCApp3';
var TEST_ILLEGAL_APP_ID_3 = 'NOT_EXIST_APP_ID';

var TEST_APP_CONTROL_OPERATION_1 = "http://tizen.org/appcontrol/operation/test_appcontrol_1";
var TEST_APP_CONTROL_OPERATION_N = "http://tizen.org/appcontrol/operation/test_appcontrol_N";
var TEST_APP_CONTROL_OPERATION_2 = "http://tizen.org/appcontrol/operation/test_appcontrol_2";
var TEST_APP_CONTROL_OPERATION_3 = "http://tizen.org/appcontrol/operation/test_appcontrol_3";
var TEST_ILLEGAL_APP_CONTROL_OPERATION = "http://tizen.org/appcontrol/operation/no_exist_operation";

/********************************************************************
 *   Application Interface
 ********************************************************************/

function onSuccessCB()
{
	TestEngine.test("[Application]", true);
}

function onErrorCB(err)
{
	TestEngine.log("error name: " + err.name);
	TestEngine.log("error code: " + err.code);
	TestEngine.log("description: " + err.description);
	TestEngine.log("message: " + err.message);

	TestEngine.test("[Application]", false);
}

function UTC_application_presence_P_001()
{
	TestEngine.log("[Application] UTC_application_presence_P_001 START");
	try {
		TestEngine.test("Tizen presence", tizen);
	    TestEngine.test("ApplicationManager presence", tizen.application);
		TestEngine.testPresence("getCurrentApplication", tizen.application.getCurrentApplication);
		TestEngine.testPresence("kill", tizen.application.kill);
		TestEngine.testPresence("launch", tizen.application.launch);
		TestEngine.testPresence("launchAppcontrol", tizen.application.launchAppControl);
		TestEngine.testPresence("findAppControl", tizen.application.findAppControl);
		TestEngine.testPresence("getAppsContext", tizen.application.getAppsContext);
		TestEngine.testPresence("getAppContext", tizen.application.getAppContext);
		TestEngine.testPresence("getAppsInfo", tizen.application.getAppsInfo);
		TestEngine.testPresence("getAppInfo", tizen.application.getAppInfo);
		TestEngine.testPresence("getAppCerts", tizen.application.getAppCerts);
		TestEngine.testPresence("getAppSharedURI", tizen.application.getAppSharedURI);
		TestEngine.testPresence("getAppMetaData", tizen.application.getAppMetaData);
		TestEngine.testPresence("addAppInfoEventListener", tizen.application.addAppInfoEventListener);
		TestEngine.testPresence("removeAppInfoEventListener", tizen.application.removeAppInfoEventListener);
	} catch (err) {
		TestEngine.test("[Application] UTC_application_application_P_00resence_P_001 error : " + err);
		TestEngine.test("", false);
	}

	TestEngine.log("[Application] UTC_application_application_P_00resence_P_001 END");
}

function UTC_application_presence_P_002()
{
	TestEngine.log("[Application] UTC_application_presence_P_002 START");
	try {
		var app = tizen.application.getCurrentApplication();
	    TestEngine.test("Application presence", app);
		TestEngine.testPresence("exit", app.exit);
		TestEngine.testPresence("hide", app.hide);
		TestEngine.testPresence("getRequestedAppControl", app.getRequestedAppControl);
	} catch (err) {
		TestEngine.test("[Application] UTC_application_presence_P_002 error : " + err);
		TestEngine.test("", false);
	}

	TestEngine.log("[Application] UTC_application_application_P_00resence_P_001 END");
}


function UTC_application_getCurrentApplication_P_001()
{
	TestEngine.log("[Application] UTC_application_getCurrentApplication_P_001 START");
	try {
		var app = tizen.application.getCurrentApplication();
		                            
		TestEngine.log("App.appInfo.name = " + app.appInfo.name);
		TestEngine.log("App.appInfo.id = " + app.appInfo.id);

		if (app.appInfo.id != CURR_APP_ID) {
			TestEngine.test("[Application] UTC_application_getCurrentApplication_P_001 err : current id is not same", false);
		}

		TestEngine.test("[Application] UTC_application_getCurrentApplication_P_001", true);
	} catch (err) {
		TestEngine.test("[Application] UTC_application_getCurrentApplication_P_001 error", false);
	}
	TestEngine.log("[Application] UTC_application_getCurrentApplication_P_001 END");
}

function UTC_application_launch_P_001()
{
	TestEngine.log("[Application] UTC_application_launch_P_001 START");

	TestEngine.setInterval(1000);

	try {
		var cbObj = TestEngine.registerCallback("launch", onSuccessCB, onErrorCB);
		tizen.application.launch(TEST_APP_ID_1, cbObj.successCallback, null);
	} catch (err) {
		TestEngine.test("[Application] UTC_application_launch_P_001 error", false);
	}
	TestEngine.log("[Application] UTC_application_launch_P_001 END");
}

function UTC_application_launch_P_002()
{
	TestEngine.log("[Application] UTC_application_launch_P_002 START");

	TestEngine.setInterval(1000);

	try {
		var cbObj = TestEngine.registerCallback("launch", onSuccessCB, onErrorCB);
		tizen.application.launch(TEST_APP_ID_2, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	TestEngine.log("[Application] UTC_application_launch_P_002 END");
 }

function UTC_application_launch_P_003()
{
	TestEngine.log("[Application] UTC_application_launch_P_003 START");

	TestEngine.setInterval(1000);

	try {
		var cbObj = TestEngine.registerCallback("launch", onSuccessCB, onErrorCB);
		tizen.application.launch(TEST_APP_ID_3, cbObj.successCallback, cbObj.errorCallback, undefined);
	} catch (err) {
		TestEngine.test("", false);
	}
	TestEngine.log("[Application] UTC_application_launch_P_003 END");
}


function UTC_application_launch_N_001()
{
	TestEngine.log("[Application] UTC_application_launch_N_001 START");

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "launch", TEST_APP_ID_3, TEST_NUM,	null);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "launch", TEST_APP_ID_3, TEST_STR,	null);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "launch", TEST_APP_ID_3, TEST_OBJ,	null);

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "launch", TEST_APP_ID_3, onSuccessCB, TEST_NUM);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "launch", TEST_APP_ID_3, onSuccessCB, TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "launch", TEST_APP_ID_3, onSuccessCB, TEST_OBJ);

	TestEngine.log("[Application] UTC_application_launch_N_001 END");
}

function UTC_application_launch_N_002()
{
	TestEngine.log("[Application] UTC_application_launch_N_002 START");

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Application] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		var cbObj = TestEngine.registerCallback("launch", onSuccessCB, notFoundErrorCB);
		tizen.application.launch(TEST_ILLEGAL_APP_ID_3, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	TestEngine.log("[Application] UTC_application_launch_N_002 END");
}

function UTC_application_launch_N_003()
{
	TestEngine.log("[Application] UTC_application_launch_N_003 START");

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Application] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		var cbObj = TestEngine.registerCallback("launch", onSuccessCB, notFoundErrorCB);
		tizen.application.launch(undefined, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	TestEngine.log("[Application] UTC_application_launch_N_003 END");
 }

 function UTC_application_launch_N_004()
 {
	 TestEngine.log("[Application] UTC_application_launch_N_004 START");

	 function notFoundErrorCB(err)
	 {
		 if (err.name == NOT_FOUND_ERR) {
			 TestEngine.test("[Application] cannot found", true);
		 } else {
			 TestEngine.test("", false);
		 }
	 }

	 try {
		 var cbObj = TestEngine.registerCallback("launch", onSuccessCB, notFoundErrorCB);
		 tizen.application.launch(null, cbObj.successCallback, cbObj.errorCallback);
	 } catch (err) {
		 TestEngine.test("", false);
	 }
	 TestEngine.log("[Application] UTC_application_launch_N_004 END");
}

function UTC_application_launch_N_005()
{
	TestEngine.log("[Application] UTC_application_launch_N_005 START");

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Application] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		var cbObj = TestEngine.registerCallback("launch", onSuccessCB, notFoundErrorCB);
		tizen.application.launch(TEST_OBJ, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	TestEngine.log("[Application] UTC_application_launch_N_005 END");
}

function UTC_application_launch_N_006()
{
	TestEngine.log("[Application] UTC_application_launch_N_006 START");

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Application] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		var cbObj = TestEngine.registerCallback("launch", onSuccessCB, notFoundErrorCB);
		tizen.application.launch(TEST_FUN, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	TestEngine.log("[Application] UTC_application_launch_N_006 END");
}

var TEST_CONTEXT_ID_1;
var TEST_CONTEXT_ID_2;
var TEST_CONTEXT_ID_3;

function onAppContextArraySuccessCB(contexts)
{
	TestEngine.log("[onAppContextArraySuccessCB][START]");

	try {
		TestEngine.log("AppContext Array Length = " + contexts.length);

		for(var num=0; num < contexts.length; num++)
		{
			TestEngine.log("AppContext["+num+"].id = "+contexts[num].id);
			TestEngine.log("AppContext["+num+"].appId = "+contexts[num].appId);
			if (contexts[num].appId == TEST_APP_ID_1) {
				TestEngine.log("AppContext["+num+"] is selected");
				TEST_CONTEXT_ID_1 = contexts[num].id;
			}
			if (contexts[num].appId == TEST_APP_ID_2) {
				TestEngine.log("AppContext["+num+"] is selected");
				TEST_CONTEXT_ID_2 = contexts[num].id;
			}
			if (contexts[num].appId == TEST_APP_ID_3) {
				TestEngine.log("AppContext["+num+"] is selected");
				TEST_CONTEXT_ID_3 = contexts[num].id;
			}
		}
	} catch (ex) {
		TestEngine.test("[Application] getMemoContext error: " + ex, false);
	}
	TestEngine.test("getAppInfo", true);
	TestEngine.log("[onAppContextArraySuccessCB][END]");
}

function UTC_application_kill_P_000()
{
	TestEngine.log("[Application] UTC_application_kill_P_000 START");

	try {
		var cbObj = TestEngine.registerCallback("getAppsContext", onAppContextArraySuccessCB, onErrorCB);
		tizen.application.getAppsContext(cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("[Application] UTC_application_kill_P_000 error : " + err, false);
	}
	TestEngine.log("[Application] UTC_application_kill_P_001 END");
}

function UTC_application_kill_P_001()
{
	TestEngine.log("[Application] UTC_application_kill_P_001 START");

	try {
		var cbObj = TestEngine.registerCallback("kill", onSuccessCB, onErrorCB);

		tizen.application.kill(TEST_CONTEXT_ID_1, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("[Application] UTC_application_kill_P_001 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_kill_P_001 END");
}

function UTC_application_kill_P_002()
{
	TestEngine.log("[Application] UTC_application_kill_P_002 START");
	try {
		var cbObj = TestEngine.registerCallback("kill", onSuccessCB, onErrorCB);
		TestEngine.log("Context.id to kill: " + TEST_CONTEXT_ID_2);

		tizen.application.kill(TEST_CONTEXT_ID_2, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("[Application] UTC_application_kill_P_002 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_kill_P_002 END");
}

function UTC_application_kill_P_004()
{
	TestEngine.log("[Application] UTC_application_kill_P_004 START");
	try {
		var cbObj = TestEngine.registerCallback("kill", onSuccessCB, onErrorCB);

		function onAppContextArraySuccessCB(contexts)
		{
			TestEngine.log("[onAppContextArraySuccessCB][START]");
			var target_id;
			
			for(var num=0; num < contexts.length; num++)
			{
				if (contexts[num].appId == TEST_APP_ID_1) {
					TestEngine.log("AppContext["+num+"] is selected");
					target_id = contexts[num].id;
				}
			}
			
			tizen.application.kill(target_id, cbObj.successCallback);
		}
		
		tizen.application.getAppsContext(onAppContextArraySuccessCB);
	} catch (err) {
		TestEngine.test("[Application] UTC_application_kill_P_004 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_kill_P_004 END");
}

function UTC_application_kill_N_001()
{
	TestEngine.log("[Application] UTC_application_kill_N_001 START");

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "kill", TEST_CONTEXT_ID_2, TEST_NUM,	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "kill", TEST_CONTEXT_ID_2, TEST_STR,	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "kill", TEST_CONTEXT_ID_2 ,TEST_OBJ,	onErrorCB);

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "kill", TEST_CONTEXT_ID_2, onSuccessCB, TEST_NUM);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "kill", TEST_CONTEXT_ID_2, onSuccessCB, TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "kill", TEST_CONTEXT_ID_2, onSuccessCB, TEST_OBJ);

	TestEngine.log("[Application] UTC_application_kill_N_001 END");
}

function UTC_application_kill_N_002()
{
	TestEngine.log("[Application] UTC_application_kill_N_002 START");

	function foundSuccessCB(err)
	{
		TestEngine.test("", false);
	}

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Application] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		var cbObj = TestEngine.registerCallback("kill", foundSuccessCB, notFoundErrorCB);
		tizen.application.kill(TEST_ILLEGAL_APP_ID_3, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("UTC_application_kill_N_002 exception occrred!!!", false);
	}
	TestEngine.log("[Application] UTC_application_kill_N_002 END");
}

 function UTC_application_kill_N_003()
 {
	 TestEngine.log("[Application] UTC_application_kill_N_003 START");

	 function foundSuccessCB(err)
	 {
		 TestEngine.test("[Application] found success. Fail to test", false);
	 }

	 function notFoundErrorCB(err)
	 {
		 if (err.name == NOT_FOUND_ERR) {
			 TestEngine.test("[Application] cannot found", true);
		 } else {
			 TestEngine.test("[Application] found success. Fail to test", false);
		 }
	 }

	 try {
		 var cbObj = TestEngine.registerCallback("kill", foundSuccessCB, notFoundErrorCB);
		 tizen.application.kill(undefined, cbObj.successCallback, cbObj.errorCallback);
	 } catch (err) {
		 TestEngine.test("", false);
	 }
	 TestEngine.log("[Application] UTC_application_kill_N_003 END");
}

function UTC_application_kill_N_004()
{
	TestEngine.log("[Application] UTC_application_kill_N_004 START");

	function foundSuccessCB(err)
	{
		TestEngine.test("", false);
	}

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Application] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		var cbObj = TestEngine.registerCallback("kill", foundSuccessCB, notFoundErrorCB);
		tizen.application.kill(null, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	TestEngine.log("[Application] UTC_application_kill_N_004 END");
 }

function UTC_application_kill_N_005()
{
	TestEngine.log("[Application] UTC_application_kill_N_005 START");

	function foundSuccessCB(err)
	{
		TestEngine.test("", false);
	}

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Application] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		var cbObj = TestEngine.registerCallback("kill", foundSuccessCB, notFoundErrorCB);
		tizen.application.kill(TEST_OBJ, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	TestEngine.log("[Application] UTC_application_kill_N_005 END");
}

function UTC_application_kill_N_006()
{
	TestEngine.log("[Application] UTC_application_kill_N_006 START");

	function foundSuccessCB(err)
	{
		TestEngine.test("", false);
	}

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Application] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		var cbObj = TestEngine.registerCallback("kill", foundSuccessCB, notFoundErrorCB);
		tizen.application.kill(TEST_FUN, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	TestEngine.log("[Application] UTC_application_kill_N_006 END");
}

function UTC_application_exit()
{
	tizen.application.currentApplication().exit();
}

function UTC_application_hide()
{
	tizen.application.currentApplication().hide();
}

var appControl1 = new tizen.ApplicationControl(TEST_APP_CONTROL_OPERATION_1);
var appControl2 = new tizen.ApplicationControl(TEST_APP_CONTROL_OPERATION_2);
var appControl3 = new tizen.ApplicationControl(TEST_APP_CONTROL_OPERATION_3);

function UTC_application_findAppControl_P_001()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_001 START");
	try {
		var cbObj = TestEngine.registerCallback("findAppControl", onSuccessCB, onErrorCB);
		tizen.application.findAppControl(appControl1, cbObj.successCallback);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_001 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_001 END");
}

function UTC_application_findAppControl_P_002()
{
	TestEngine.log("[Application] UTC_application_findAppControl_P_002 START");
	try {
		var cbObj = TestEngine.registerCallback("findAppControl", onSuccessCB, onErrorCB);
		tizen.application.findAppControl(appControl2, cbObj.successCallback, cbObj.errorCallback);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_findAppControl_P_002 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_findAppControl_P_002 END");
}

function UTC_application_findAppControl_P_003()
{
	TestEngine.log("[Application] UTC_application_findAppControl_P_003 START");
	try {
		var cbObj = TestEngine.registerCallback("findAppControl", onSuccessCB, onErrorCB);
		tizen.application.findAppControl(appControl3, cbObj.successCallback, cbObj.errorCallback, undefined);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_findAppControl_P_003 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_findAppControl_P_003 END");
}

function UTC_application_findAppControl_N_001()
{
	TestEngine.log("[Application] UTC_application_findAppControl_N_001 START");

	TestEngine.log("First parameter check.");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "findAppControl", null, 		onSuccessCB, onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "findAppControl", undefined, 	onSuccessCB, onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "findAppControl", TEST_STR, 	onSuccessCB, onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "findAppControl", TEST_NUM, 	onSuccessCB, onErrorCB);

	TestEngine.log("Second parameter check.");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "findAppControl", appControl1, TEST_STR, 	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "findAppControl", appControl1, TEST_NUM, 	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "findAppControl", appControl1, TEST_OBJ, 	onErrorCB);

	TestEngine.log("Third parameter check.");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "findAppControl", appControl1, onSuccessCB, TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "findAppControl", appControl1, onSuccessCB, TEST_NUM);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "findAppControl", appControl1, onSuccessCB, TEST_OBJ);

	TestEngine.log("[Application] UTC_application_findAppControl_N_001 END");
}


function findAndKill(contexts)
{
	TestEngine.log("[findAndKill][START]");

	try {
		TestEngine.log("AppContext Array Length = " + contexts.length);

		for(var num=0; num < contexts.length; num++)
		{
			if ((contexts[num].appId == TEST_APP_ID_1) ||
				 (contexts[num].appId == TEST_APP_ID_2) ||
				 (contexts[num].appId == TEST_APP_ID_3)) {
				TestEngine.log("kill : id = "+contexts[num].id);
				tizen.application.kill(contexts[num].id);
			}
		}
	} catch (ex) {
		TestEngine.test("[Application] findAndKill error: " + ex, false);
	}
	TestEngine.log("[findAndKill][END]");
}

function UTC_application_launchAppControl_P_000()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_000 START");

	TestEngine.setInterval(1000);

	try {
		var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);
		tizen.application.launchAppControl(appControl1, undefined, cbObj.successCallback);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_000 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_000 END");
}

function UTC_application_launchAppControl_P_001()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_001 START");

	TestEngine.setInterval(1000);

	try {
		var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

		var onSuccess = function() {
			setTimeout(cbObj.successCallback, 1000);
		}
		
		tizen.application.launchAppControl(appControl1, null, onSuccess);
		
		//var cbObj2 = TestEngine.registerCallback("getAppsContext", findAndKill, onErrorCB);
		//tizen.application.getAppsContext(cbObj2.successCallback, cbObj2.errorCallback);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_001 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_001 END");
}

function UTC_application_launchAppControl_P_002()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_002 START");

	TestEngine.setInterval(1000);

	try {
		var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

		var onSuccess = function() {
			setTimeout(cbObj.successCallback, 1000);
		}
		
		tizen.application.launchAppControl(appControl2, null, onSuccess, cbObj.errorCallback);
		//var cbObj2 = TestEngine.registerCallback("getAppsContext", findAndKill, onErrorCB);
		//tizen.application.getAppsContext(cbObj2.successCallback, cbObj2.errorCallback);		
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_002 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_002 END");
}

function UTC_application_launchAppControl_P_003()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_003 START");

	TestEngine.setInterval(1000);

	try {
		var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

		var onSuccess = function() {
			setTimeout(cbObj.successCallback, 1000);
		}
		
		tizen.application.launchAppControl(appControl3, TEST_APP_ID_3, onSuccess, cbObj.errorCallback, null);
		//var cbObj2 = TestEngine.registerCallback("getAppsContext", findAndKill, onErrorCB);
		//tizen.application.getAppsContext(cbObj2.successCallback, cbObj2.errorCallback);		
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_003 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_003 END");
}

function UTC_application_launchAppControl_P_004()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_004 START");

	TestEngine.setInterval(1000);

	var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

	var data = [
		new tizen.ApplicationControlData("key1", ["data1"]),
		new tizen.ApplicationControlData("key2", ["data2", "data3"])
	];

	var replyCB = {
		onsuccess : function(reply) {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_004 replyCB : onSuccess");
			for (var i=0; i < reply.length; i++) {
				TestEngine.log("[UTC_application_launchAppControl_P_004][REPLY] key("+reply[i].key+"), data("+reply[i].value+")");
			}
			TestEngine.test("[Application] UTC_application_launchAppControl_P_004", true);
			cbObj.successCallback();
			//var cbObj2 = TestEngine.registerCallback("getAppsContext", findAndKill, onErrorCB);
			//tizen.application.getAppsContext(cbObj2.successCallback, cbObj2.errorCallback);			
		},
		onfailure : function() {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_004 replyCB : onFailed");
			TestEngine.test("[Application] failed to get the reply from the callee error : " + err, false);
			cbObj.errorCallback();
		}
	};

	try {
		var appControl = new tizen.ApplicationControl(
			TEST_APP_CONTROL_OPERATION_1,
			null,
			null,
			null,
			data);

		tizen.application.launchAppControl(appControl, null,
			function() {
				TestEngine.log("[Application] UTC_application_launchAppControl_P_004 call success");
			},
			onErrorCB,
			replyCB);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_004 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_004 END");
}

function UTC_application_launchAppControl_P_005()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_005 START");

	TestEngine.setInterval(1000);

	var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

	var data = [
		new tizen.ApplicationControlData("key1", ["data1"]),
		new tizen.ApplicationControlData("key2", ["data2", "data3"])
	];

	var replyCB = {
		onsuccess : function(reply) {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_005 replyCB : onSuccess");
			for (var i=0; i < reply.length; i++) {
				TestEngine.log("[UTC_application_launchAppControl_P_005][REPLY] key("+reply[i].key+"), data("+reply[i].value+")");
			}
			TestEngine.test("[Application] UTC_application_launchAppControl_P_005", true);
			cbObj.successCallback();
			//var cbObj2 = TestEngine.registerCallback("getAppsContext", findAndKill, onErrorCB);
			//tizen.application.getAppsContext(cbObj2.successCallback, cbObj2.errorCallback);
		},
		onfailure : function() {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_005 replyCB : onFailed");
			TestEngine.test("[Application] failed to get the reply from the callee error : " + err, false);
			cbObj.errorCallback();
		}
	};

	try {
		var appControl = new tizen.ApplicationControl(
			TEST_APP_CONTROL_OPERATION_2,
			null,
			null,
			null,
			data);

		tizen.application.launchAppControl(appControl, undefined,
			function() {
				TestEngine.log("[Application] UTC_application_launchAppControl_P_005 call success");
			},
			onErrorCB,
			replyCB);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_005 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_005 END");
}

function UTC_application_launchAppControl_P_006()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_006 START");

	TestEngine.setInterval(1000);

	var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

	var data = [
		new tizen.ApplicationControlData("key1", ["data1"]),
		new tizen.ApplicationControlData("key2", ["data2", "data3"])
	];

	var replyCB = {
		onsuccess : function(reply) {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_006 replyCB : onSuccess");
			for (var i=0; i < reply.length; i++) {
				TestEngine.log("[UTC_application_launchAppControl_P_004][REPLY] key("+reply[i].key+"), data("+reply[i].value+")");
			}
			TestEngine.test("[Application] UTC_application_launchAppControl_P_006", true);
			cbObj.successCallback();
			//var cbObj2 = TestEngine.registerCallback("getAppsContext", findAndKill, onErrorCB);
			//tizen.application.getAppsContext(cbObj2.successCallback, cbObj2.errorCallback);
		},
		onfailure : function() {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_006 replyCB : onFailed");
			TestEngine.test("[Application] failed to get the reply from the callee error : " + err, false);
			cbObj.errorCallback();
		}
	};

	try {
		var appControl = new tizen.ApplicationControl(
			TEST_APP_CONTROL_OPERATION_3,
			null,
			null,
			null,
			data);

		tizen.application.launchAppControl(appControl, null,
			function() {
				TestEngine.log("[Application] UTC_application_launchAppControl_P_006 call success");
			},
			onErrorCB,
			replyCB,
			undefined);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_006 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_006 END");
}

function UTC_application_launchAppControl_P_007()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_007 START");

	TestEngine.setInterval(1000);

	var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

	var data = [
		new tizen.ApplicationControlData("key1", ["data1"]),
		new tizen.ApplicationControlData("key2", ["data2", "data3"])
	];

	var replyCB = {
		onsuccess : function(reply) {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_009 replyCB : onSuccess");
			for (var i=0; i < reply.length; i++) {
				TestEngine.log("[UTC_application_launchAppControl_P_009][REPLY] key("+reply[i].key+"), data("+reply[i].value+")");
			}
			TestEngine.test("[Application] UTC_application_launchAppControl_P_009", true);
			cbObj.successCallback();
			//var cbObj2 = TestEngine.registerCallback("getAppsContext", findAndKill, onErrorCB);
			//tizen.application.getAppsContext(cbObj2.successCallback, cbObj2.errorCallback);			
		}
	};

	try {
		var appControl = new tizen.ApplicationControl(
			TEST_APP_CONTROL_OPERATION_1,
			null,
			null,
			null,
			data);

		tizen.application.launchAppControl(appControl, null,
			function() {
				TestEngine.log("[Application] UTC_application_launchAppControl_P_007 call success");
			},
			onErrorCB,
			replyCB);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_007 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_007 END");
}

function UTC_application_launchAppControl_P_008()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_008 START");

	TestEngine.setInterval(1000);

	var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

	var data = [
		new tizen.ApplicationControlData("key1", ["data1"]),
		new tizen.ApplicationControlData("key2", ["data2", "data3"])
	];

	var replyCB = {
	};

	try {
		var appControl = new tizen.ApplicationControl(
			TEST_APP_CONTROL_OPERATION_2,
			null,
			null,
			null,
			data);

		tizen.application.launchAppControl(appControl, null,
			function() {
				TestEngine.log("[Application] UTC_application_launchAppControl_P_008 call success");
			},
			onErrorCB,
			replyCB);

		cbObj.successCallback();
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_008 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_008 END");
}

function UTC_application_launchAppControl_P_009()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_009 START");

	TestEngine.setInterval(1000);

	var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

	var data = [
		new tizen.ApplicationControlData("key1", ["data1"]),
		new tizen.ApplicationControlData("key2", ["data2", "data3"])
	];

	var replyCB = {
		onfailure : function() {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_005 replyCB : onFailed");
			cbObj.successCallback();
		}
	};

	try {
		var appControl = new tizen.ApplicationControl(
			TEST_APP_CONTROL_OPERATION_3,
			null,
			null,
			null,
			data);

		tizen.application.launchAppControl(appControl, null,
			function() {
				TestEngine.log("[Application] UTC_application_launchAppControl_P_009 call success");
			},
			onErrorCB,
			replyCB);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_009 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_009 END");
}

function UTC_application_launchAppControl_P_010()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_010 START");

	TestEngine.setInterval(1000);

	var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

	var data = [
		new tizen.ApplicationControlData("key1", ["data1"]),
		new tizen.ApplicationControlData("key2", ["data2", "data3"])
	];

	var replyCB = {
		onsuccess : function(reply) {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_010 onsuccess : onFailed");
			TestEngine.test("[Application] this test should have to get onfailure", false);
			cbObj.errorCallback();
		},
		onfailure : function() {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_010 replyCB : onfailure");
			TestEngine.test("[Application] UTC_application_launchAppControl_P_010", true);
			cbObj.successCallback();
		}
	};

	try {
		var appControl = new tizen.ApplicationControl(
			TEST_APP_CONTROL_OPERATION_N,
			null,
			null,
			null,
			data);

		tizen.application.launchAppControl(appControl, null,
			function() {
				TestEngine.log("[Application] UTC_application_launchAppControl_P_010 call success");
			},
			onErrorCB,
			replyCB);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_010 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_010 END");
}

function UTC_application_launchAppControl_P_011()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_P_011 START");

	TestEngine.setInterval(1000);

	var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);

	var data = [
		new tizen.ApplicationControlData("key1", ["data1"]),
		new tizen.ApplicationControlData("key2", ["data2", "data3"])
	];

	var replyCB = {
		onsuccess : function(reply) {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_011 replyCB : onSuccess");
			for (var i=0; i < reply.length; i++) {
				TestEngine.log("[UTC_application_launchAppControl_P_011][REPLY] key("+reply[i].key+"), data("+reply[i].value+")");
			}
			TestEngine.test("[Application] UTC_application_launchAppControl_P_011", true);
			cbObj.successCallback();
		},
		onfailure : function() {
			TestEngine.log("[Application] UTC_application_launchAppControl_P_011 replyCB : onFailed");
			TestEngine.test("[Application] failed to get the reply from the callee error : " + err, false);
			cbObj.errorCallback();
		}
	};

	try {
		var appControl = new tizen.ApplicationControl(
			TEST_APP_CONTROL_OPERATION_2,
			null,
			null,
			null,
			data);

		tizen.application.launchAppControl(appControl, null,
			function() {
				TestEngine.log("[Application] UTC_application_launchAppControl_P_011 call success");
			},
			onErrorCB,
			replyCB);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_launchAppControl_P_011 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_launchAppControl_P_011 END");
}


function UTC_application_launchAppControl_N_001()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_N_001 START");

	TestEngine.log("First parameter check.");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", null, 		null, onSuccessCB, onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", undefined, 	null, onSuccessCB, onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", TEST_STR, 	null, onSuccessCB, onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", TEST_NUM, 	null, onSuccessCB, onErrorCB);

	TestEngine.log("Third parameter check.");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", appControl1, null, TEST_STR, 	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", appControl1, null, TEST_NUM, 	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", appControl1, null, TEST_OBJ, 	onErrorCB);

	TestEngine.log("Fourth parameter check.");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", appControl1, null, onSuccessCB, TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", appControl1, null, onSuccessCB, TEST_NUM);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", appControl1, null, onSuccessCB, TEST_OBJ);

	TestEngine.log("Fifth parameter check.");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", appControl1, null, onSuccessCB, onErrorCB, TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR , tizen.application, "launchAppControl", appControl1, null, onSuccessCB, onErrorCB, TEST_NUM);

	TestEngine.log("[Application] UTC_application_launchAppControl_N_001 END");
}

function UTC_application_launchAppControl_N_002()
{
	TestEngine.log("[Application] UTC_application_launchAppControl_N_002 START");

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Application] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

   var appControl = new tizen.ApplicationControl(
		   TEST_ILLEGAL_APP_CONTROL_OPERATION,
		   null,
		   null,
		   null);

	try {
		var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, notFoundErrorCB);
		tizen.application.launchAppControl(appControl, undefined, cbObj.successCallback, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	TestEngine.log("[Application] UTC_application_launchAppControl_N_002 END");
}

function UTC_application_getRequestedAppControl_P_001()
{
	TestEngine.log("[Application] UTC_application_getRequestedAppControl_P_001 START");

	try {
		var request = tizen.application.getCurrentApplication().getRequestedAppControl();
		if (request == null) {
			TestEngine.test("[Application] UTC_application_getRequestedAppControl_P_001 Success", true);
		} else {
			TestEngine.test("[Application] UTC_application_getRequestedAppControl_P_001 error : " + err, false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getRequestedAppControl_P_001 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_getRequestedAppControl_P_001 END");
}

function UTC_application_getRequestedAppControl_P_002()
{
	TestEngine.log("[Application] UTC_application_getRequestedAppControl_P_002 START");

	try {
		var request = tizen.application.getCurrentApplication().getRequestedAppControl(undefined);
		if (request == null) {
			TestEngine.test("[Application] UTC_application_getRequestedAppControl_P_002 Success", true);
		} else {
			TestEngine.test("[Application] UTC_application_getRequestedAppControl_P_002 error : " + err, false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getRequestedAppControl_P_002 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_getRequestedAppControl_P_002 END");
}

var TEST_CONTEXT_ID;

function contextlist(contexts)
{
	TestEngine.log("[contextlist][START]");

	try {
		TestEngine.log("AppContext Array Length = " + contexts.length);

		for(var num=0; num < contexts.length; num++)
		{
			if (num == 0) {
				TEST_CONTEXT_ID = contexts[num].id;
			}
			TestEngine.log("AppContext["+num+"].id = "+contexts[num].id);
			TestEngine.log("AppContext["+num+"].appId = "+contexts[num].appId);
		}
	} catch (ex) {
		TestEngine.test("[Application] contextlist error: " + ex, false);
	}
	TestEngine.test("contextlist", true);
	TestEngine.log("[contextlist][END]");
}

function UTC_application_getAppsContext_P_001()
{
	TestEngine.log("[Application] UTC_application_getAppsContext_P_001 START");

	try {
		var cbObj = TestEngine.registerCallback("getAppsContext", contextlist, onErrorCB);
		tizen.application.getAppsContext(cbObj.successCallback, cbObj.errorCallback);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppsContext_P_001 err : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_getAppsContext_P_001 END");
}

function UTC_application_getAppsContext_P_002()
{
	TestEngine.log("[Application] UTC_application_getAppsContext_P_002 START");

	try {
		var cbObj = TestEngine.registerCallback("getAppsContext", contextlist, onErrorCB);
		tizen.application.getAppsContext(cbObj.successCallback);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppsContext_P_002 err : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_getAppsContext_P_002 END");
}

function UTC_application_getAppsContext_P_003()
{
	TestEngine.log("[Application] UTC_application_getAppsContext_P_003 START");

	try {
		var cbObj = TestEngine.registerCallback("getAppsContext", contextlist, onErrorCB);
		tizen.application.getAppsContext(cbObj.successCallback, null);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppsContext_P_003 err : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_getAppsContext_P_003 END");
}

function UTC_application_getAppsContext_P_005()
{
	TestEngine.log("[Application] UTC_application_getAppsContext_P_005 START");

	try {
		var cbObj = TestEngine.registerCallback("getAppsContext", contextlist, onErrorCB);
		tizen.application.getAppsContext(cbObj.successCallback, null, undefined);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppsContext_P_005 err : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_getAppsContext_P_005 END");
}

function UTC_application_getAppsContext_N_001()
{
	TestEngine.log("[Application] UTC_application_getAppsContext_N_001 START");

	// first parameter
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsContext", null,		onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsContext", undefined,	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsContext", TEST_STR,	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsContext", TEST_NUM,	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsContext", TEST_OBJ,	onErrorCB);

	// second parameter
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsContext", contextlist, TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsContext", contextlist, TEST_NUM);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsContext", contextlist, TEST_OBJ);

	TestEngine.log("[Application] UTC_application_getAppsContext_N_001 END");
}

function infolist(infos)
{
	TestEngine.log("[infolist][START]");

	try {
		TestEngine.log("AppInfo Array Length = " + infos.length);

		for(var num=0; num < infos.length; num++)
		{
			TestEngine.log("AppInfo["+num+"].name = "+infos[num].name);
			TestEngine.log("AppInfo["+num+"].id = "+infos[num].id);
		}
	} catch (ex) {
		TestEngine.test("[Application] UTC_application_getAppsInfo error: " + ex, false);
	}
	TestEngine.test("UTC_application_getAppsInfo", true);
	TestEngine.log("[infolist][END]");
}

function UTC_application_getAppsInfo_P_001()
{
	TestEngine.log("[Application] UTC_application_getAppsInfo_P_001 START");

	try {
		var cbObj = TestEngine.registerCallback("getAppsInfo", infolist, onErrorCB);
		tizen.application.getAppsInfo(cbObj.successCallback, cbObj.errorCallback);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppsInfo_P_001 err : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_getAppsInfo_P_001 END");
}

function UTC_application_getAppsInfo_P_002()
{
	TestEngine.log("[Application] UTC_application_getAppsInfo_P_002 START");

	try {
		var cbObj = TestEngine.registerCallback("getAppsInfo", infolist, onErrorCB);
		tizen.application.getAppsInfo(cbObj.successCallback);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppsInfo_P_002 err : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_getAppsInfo_P_002 END");
}

function UTC_application_getAppsInfo_P_003()
{
	TestEngine.log("[Application] UTC_application_getAppsInfo_P_003 START");

	try {
		var cbObj = TestEngine.registerCallback("getAppsInfo", infolist, onErrorCB);
		tizen.application.getAppsInfo(cbObj.successCallback, null);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppsInfo_P_003 err : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_getAppsInfo_P_003 END");
}

function UTC_application_getAppsInfo_P_005()
{
	TestEngine.log("[Application] UTC_application_getAppsInfo_P_005 START");

	try {
		var cbObj = TestEngine.registerCallback("getAppsInfo", infolist, onErrorCB);
		tizen.application.getAppsInfo(cbObj.successCallback, null, undefined);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppsInfo_P_005 err : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_getAppsInfo_P_005 END");
}

function UTC_application_getAppsInfo_N_001()
{
	TestEngine.log("[Application] UTC_application_getAppsInfo_N_001 START");

	// first parameter
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsInfo", null,		onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsInfo", undefined,	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsInfo", TEST_STR,	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsInfo", TEST_NUM,	onErrorCB);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsInfo", TEST_OBJ,	onErrorCB);

	// second parameter
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsInfo", infolist, TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsInfo", infolist, TEST_NUM);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "getAppsInfo", infolist, TEST_OBJ);

	TestEngine.log("[Application] UTC_application_getAppsInfo_N_001 END");
}

function UTC_application_getAppContext_P_001()
{
	TestEngine.log("[Application] UTC_application_getCurrentApplicationcontext_P_001 START");

	try {
		var context = tizen.application.getAppContext();
		if (context.appId != CURR_APP_ID) {
			TestEngine.test("[Application] UTC_application_getAppContext_P_001 err : current context is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppContext_P_001 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getCurrentApplicationcontext_P_001", true);

	TestEngine.log("[Application] UTC_application_getCurrentApplicationcontext_P_001 END");
}

function UTC_application_getAppContext_P_003()
{
	TestEngine.log("[Application] UTC_application_getAppContext_P_003 START");

	try {
		var context = tizen.application.getAppContext(null);
		if (context.appId != CURR_APP_ID) {
			TestEngine.log("[Application] appId : " + context.appId);
			TestEngine.log("[Application] curr_app_id : " + CURR_APP_ID);
			TestEngine.test("[Application] UTC_application_getAppContext_P_003 err : current context is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppContext_P_003 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppContext_P_003", true);

	TestEngine.log("[Application] UTC_application_getAppContext_P_003 END");
}

function UTC_application_getAppContext_P_004()
{
	TestEngine.log("[Application] UTC_application_getAppContext_P_004 START");

	try {
		var context = tizen.application.getAppContext(TEST_CONTEXT_ID);
		if (context.id != TEST_CONTEXT_ID) {
			TestEngine.log("[Application] appId : " + context.appId);
			TestEngine.log("[Application] test context id : " + TEST_CONTEXT_ID);
			TestEngine.test("[Application] UTC_application_getAppContext_P_004 err : current context is not same", false);
		} else {
			TestEngine.log("[Application] appId : " + context.appId);
			TestEngine.log("[Application] test context id : " + TEST_CONTEXT_ID);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppContext_P_004 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppContext_P_004", true);

	TestEngine.log("[Application] UTC_application_getAppContext_P_004 END");
}

function UTC_application_getAppContext_N_001()
{
	TestEngine.log("[Application] UTC_application_getAppContext_N_001 START");

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppContext", TEST_OBJ);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppContext", TEST_FUN);

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppContext", "9999");
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppContext", "Hello");
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppContext", 9999);

	TestEngine.log("[Application] UTC_application_getAppContext_N_001 END");
}

function UTC_application_getAppInfo_P_001()
{
	TestEngine.log("[Application] UTC_application_getAppInfo_P_001 START");

	try {
		var info = tizen.application.getAppInfo(CURR_APP_ID);
		TestEngine.log("AppInfo.name = "+info.name);
		TestEngine.log("AppInfo.id = "+info.id);
		if (info.id != CURR_APP_ID) {
			TestEngine.test("[Application] UTC_application_getAppInfo_P_001 err : current context is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppInfo_P_001 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppInfo_P_001", true);

	TestEngine.log("[Application] UTC_application_getAppInfo_P_001 END");
}

function UTC_application_getAppInfo_P_002()
{
	TestEngine.log("[Application] UTC_application_getAppInfo_P_002 START");

	try {
		var info = tizen.application.getAppInfo(null);
		TestEngine.log("AppInfo.name = "+info.name);
		TestEngine.log("AppInfo.id = "+info.id);
		if (info.id != CURR_APP_ID) {
			TestEngine.test("[Application] UTC_application_getAppInfo_P_002 err : current context is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppInfo_P_002 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppInfo_P_002", true);

	TestEngine.log("[Application] UTC_application_getAppInfo_P_002 END");
}

function UTC_application_getAppInfo_P_003()
{
	TestEngine.log("[Application] UTC_application_getAppInfo_P_002 START");

	try {
		var info = tizen.application.getAppInfo();
		TestEngine.log("AppInfo.name = "+info.name);
		TestEngine.log("AppInfo.id = "+info.id);
		if (info.id != CURR_APP_ID) {
			TestEngine.test("[Application] UTC_application_getAppInfo_P_002 err : current context is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppInfo_P_002 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppInfo_P_002", true);

	TestEngine.log("[Application] UTC_application_getAppInfo_P_002 END");
}

function UTC_application_getAppInfo_N_001()
{
	TestEngine.log("[Application] UTC_application_getAppInfo_N_001 START");

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppInfo", TEST_OBJ);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppInfo", TEST_FUN);

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppInfo", "NO_APP");
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppInfo", TEST_NUM);

	TestEngine.log("[Application] UTC_application_getAppInfo_N_001 END");
}

function UTC_application_getAppCerts_P_001()
{
	TestEngine.log("[Application] UTC_application_getAppCerts_P_001 START");

	try {
		var certs = tizen.application.getAppCerts();
		TestEngine.log("Certs.length = " + certs.length);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppCerts_P_001 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppCerts_P_001", true);

	TestEngine.log("[Application] UTC_application_getAppCerts_P_001 END");
}

function UTC_application_getAppCerts_P_002()
{
	TestEngine.log("[Application] UTC_application_getAppCerts_P_002 START");

	try {
		var certs = tizen.application.getAppCerts(CURR_APP_ID);
		TestEngine.log("Certs.length = " + certs.length);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppCerts_P_002 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppCerts_P_002", true);

	TestEngine.log("[Application] UTC_application_getAppCerts_P_002 END");
}

function UTC_application_getAppCerts_P_003()
{
	TestEngine.log("[Application] UTC_application_getAppCerts_P_003 START");

	try {
		var certs = tizen.application.getAppCerts(null);
		TestEngine.log("Certs.length = " + certs.length);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppCerts_P_003 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppCerts_P_003", true);

	TestEngine.log("[Application] UTC_application_getAppCerts_P_003 END");
}

function UTC_application_getAppCerts_P_004()
{
	TestEngine.log("[Application] UTC_application_getAppCerts_P_004 START");

	try {
		var certs = tizen.application.getAppCerts();
		var count = 0;
		TestEngine.log("Cert length" + certs.length);		
		for (var i = 0; i < certs.length; i++) {
			if (certs[i].type == "AUTHOR_ROOT") {
				count++;
			}
			
			if (certs[i].type == "DISTRIBUTOR_ROOT") {
				count++;
			}
			
			if (certs[i].type == "DISTRIBUTOR2_ROOT") {
				count++;
			}
		}

		if (count == 3) {
			TestEngine.test("[Application] UTC_application_getAppCerts_P_004", true);
		} else {
			TestEngine.test("[Application] UTC_application_getAppCerts_P_004 count : " + count, false);
		}
		
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppCerts_P_004 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppCerts_P_004", true);

	TestEngine.log("[Application] UTC_application_getAppCerts_P_004 END");
}

function UTC_application_getAppCerts_N_001()
{
	TestEngine.log("[Application] UTC_application_getAppCerts_N_001 START");

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppCerts", TEST_OBJ);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppCerts", TEST_FUN);

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppCerts", "NO_APP");
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppCerts", TEST_NUM);

	TestEngine.log("[Application] UTC_application_getAppCerts_N_001 END");
}

function UTC_application_getAppSharedURI_P_001()
{
	TestEngine.log("[Application] UTC_application_getAppSharedURI_P_001 START");

	try {
		var sharedURI = tizen.application.getAppSharedURI();
		TestEngine.log("sharedURI = "+sharedURI);

		var currSharedURI = "file:///opt/usr/apps/" + tizen.application.getCurrentApplication().appInfo.packageId + "/shared/";
		if (sharedURI != currSharedURI) {
			TestEngine.test("[Application] UTC_application_getAppSharedURI_P_001 err : shared uri is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppSharedURI_P_001 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppSharedURI_P_001", true);

	TestEngine.log("[Application] UTC_application_getAppSharedURI_P_001 END");
}

function UTC_application_getAppSharedURI_P_002()
{
	TestEngine.log("[Application] UTC_application_getAppSharedURI_P_002 START");

	try {
		var sharedURI = tizen.application.getAppSharedURI(null);
		TestEngine.log("sharedURI = "+sharedURI);

		var currSharedURI = "file:///opt/usr/apps/" + tizen.application.getCurrentApplication().appInfo.packageId + "/shared/";
		if (sharedURI != currSharedURI) {
			TestEngine.test("[Application] UTC_application_getAppSharedURI_P_002 err : shared uri is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppSharedURI_P_002 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppSharedURI_P_002", true);

	TestEngine.log("[Application] UTC_application_getAppSharedURI_P_002 END");
}

function UTC_application_getAppSharedURI_P_003()
{
	TestEngine.log("[Application] UTC_application_getAppSharedURI_P_003 START");

	try {
		var sharedURI = tizen.application.getAppSharedURI(CURR_APP_ID);
		TestEngine.log("sharedURI = "+sharedURI);

		var currSharedURI = "file:///opt/usr/apps/" + tizen.application.getCurrentApplication().appInfo.packageId + "/shared/";
		if (sharedURI != currSharedURI) {
			TestEngine.test("[Application] UTC_application_getAppSharedURI_P_003 err : shared uri is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppSharedURI_P_003 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppSharedURI_P_003", true);

	TestEngine.log("[Application] UTC_application_getAppSharedURI_P_003 END");
}

function UTC_application_getAppSharedURI_P_004()
{
	TestEngine.log("[Application] UTC_application_getAppSharedURI_P_004 START");

	try {
		var sharedURI = tizen.application.getAppSharedURI(TEST_APP_ID_1);
		TestEngine.log("sharedURI = "+sharedURI);

		var currSharedURI = "file:///opt/usr/apps/" + tizen.application.getAppInfo(TEST_APP_ID_1).packageId + "/shared/";
		if (sharedURI != currSharedURI) {
			TestEngine.test("[Application] UTC_application_getAppSharedURI_P_004 err : shared uri is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppSharedURI_P_004 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppSharedURI_P_004", true);

	TestEngine.log("[Application] UTC_application_getAppSharedURI_P_004 END");
}

function UTC_application_getAppSharedURI_N_001()
{
	TestEngine.log("[Application] UTC_application_getAppSharedURI_N_001 START");

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppSharedURI", TEST_OBJ);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppSharedURI", TEST_FUN);

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppSharedURI", "NO_APP");
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppSharedURI", TEST_NUM);

	TestEngine.log("[Application] UTC_application_getAppSharedURI_N_001 END");
}

function UTC_application_getAppMetaData_P_001()
{
	TestEngine.log("[Application] UTC_application_getAppMetaData_P_001 START");

	try {
		var data = tizen.application.getAppMetaData();
		TestEngine.log("MetaData.length = " + data.length);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppMetaData_P_001 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppMetaData_P_001", true);

	TestEngine.log("[Application] UTC_application_getAppMetaData_P_001 END");
}

function UTC_application_getAppMetaData_P_002()
{
	TestEngine.log("[Application] UTC_application_getAppMetaData_P_002 START");

	try {
		var data = tizen.application.getAppMetaData(CURR_APP_ID);
		TestEngine.log("MetaData.length = " + data.length);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppMetaData_P_002 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppMetaData_P_002", true);

	TestEngine.log("[Application] UTC_application_getAppMetaData_P_002 END");
}

function UTC_application_getAppMetaData_P_003()
{
	TestEngine.log("[Application] UTC_application_getAppMetaData_P_003 START");

	try {
		var data = tizen.application.getAppMetaData(null);
		TestEngine.log("MetaData.length = " + data.length);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppMetaData_P_003 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppMetaData_P_003", true);

	TestEngine.log("[Application] UTC_application_getAppMetaData_P_003 END");
}

function UTC_application_getAppMetaData_P_004()
{
	TestEngine.log("[Application] UTC_application_getAppMetaData_P_004 START");

	try {
		var data = tizen.application.getAppMetaData();
		var count = 0;
		TestEngine.log("MetaData length" + data.length);

		if (data.length != 1) {
			TestEngine.test("[Application] UTC_application_getAppMetaData_P_004 : wrong meta data length : " + data.length, false);
		}

		if (data[0].key != "meta-key") {
			TestEngine.test("[Application] UTC_application_getAppMetaData_P_004 : bad key ", false);
		}

		if ( data[0].value != "meta-value") {
			TestEngine.test("[Application] UTC_application_getAppMetaData_P_004 : bad value ", false);
		}
		
	} catch(err) {
		TestEngine.test("[Application] UTC_application_getAppMetaData_P_004 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_getAppMetaData_P_004", true);

	TestEngine.log("[Application] UTC_application_getAppMetaData_P_004 END");
}

function UTC_application_getAppMetaData_N_001()
{
	TestEngine.log("[Application] UTC_application_getAppMetaData_N_001 START");

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppMetaData", TEST_OBJ);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppMetaData", TEST_FUN);

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppMetaData", "NO_APP");
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "getAppMetaData", TEST_NUM);

	TestEngine.log("[Application] UTC_application_getAppMetaData_N_001 END");
}


function printApplicationInformation(appinfo) {
	TestEngine.log("[printApplicationInformation][START]");

	try {
		TestEngine.log("appinfo.name = "+appinfo.name);
		TestEngine.log("appinfo.appId = "+appinfo.appId);
		TestEngine.log("appinfo.iconPath = "+appinfo.iconPath);
		TestEngine.log("appinfo.version = "+appinfo.version);
	} catch (ex){
		onErrorCB(ex);
	}

	TestEngine.log("[printApplicationInformation][END]");
}

var onAppInfoEventCB = {
	oninstalled : function(appinfo) {
		TestEngine.log("[onInstalled][START]");
		try {
			printApplicationInformation(appinfo);
		} catch (ex) {
			onErrorCB(ex);
		}
		TestEngine.log("[onInstalled][END]");
	},
	onupdated : function(appinfo) {
		TestEngine.log("[onUpdated][START]");
		try {
			printApplicationInformation(appinfo);
		} catch (ex) {
			onErrorCB(ex);
		}
		TestEngine.log("[onUpdated][END]");
	},
	onuninstalled : function(appid) {
		TestEngine.log("[onUninstalled][START]");
		try {
			TestEngine.log("[onUninstalled] appid = "+appid);
		} catch (ex) {
			onErrorCB(ex);
		}
		TestEngine.log("[onUninstalled][END]");
	}
};

function UTC_application_addAppInfoEventListener_P_000()
{
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_000 START");

	try {
		var id = tizen.application.addAppInfoEventListener(onAppInfoEventCB);
		TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_000 id : " + id);
		tizen.application.removeAppInfoEventListener(id);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_000 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_000", true);

	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_000 END");
}

function UTC_application_addAppInfoEventListener_P_001()
{
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_001 START");

	try {
		var id = tizen.application.addAppInfoEventListener(onAppInfoEventCB);
		TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_001 id : " + id);
		//tizen.application.removeAppInfoEventListener(id);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_001 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_001", true);

	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_001 END");
}

function UTC_application_addAppInfoEventListener_P_002()
{
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_002 START");

	try {
		var id = tizen.application.addAppInfoEventListener(onAppInfoEventCB, null);
		TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_002 id : " + id);

		//tizen.application.removeAppInfoEventListener(id);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_002 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_002", true);

	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_002 END");
}

function UTC_application_addAppInfoEventListener_P_003()
{
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_003 START");

	try {
		var id = tizen.application.addAppInfoEventListener(onAppInfoEventCB, onErrorCB);
		TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_003 id : " + id);
		//tizen.application.removeAppInfoEventListener(id);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_003 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_003", true);

	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_003 END");
}

function UTC_application_addAppInfoEventListener_P_004()
{
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_004 START");

	try {
		var id = tizen.application.addAppInfoEventListener(onAppInfoEventCB, undefined);
		TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_004 id : " + id);
		//tizen.application.removeAppInfoEventListener(id);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_004 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_004", true);

	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_004 END");
}

function UTC_application_addAppInfoEventListener_P_005()
{
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_005 START");

	try {
		var id = tizen.application.addAppInfoEventListener(onAppInfoEventCB, onErrorCB, undefined);
		TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_005 id : " + id);
		//tizen.application.removeAppInfoEventListener(id);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_005 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_005", true);

	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_005 END");
}

function UTC_application_addAppInfoEventListener_P_006()
{
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_006 START");

	try {

		var onAppInfoEventCB = {
			oninstalled : function(appinfo) {
				TestEngine.log("[onInstalled][START]");
				try {
					printApplicationInformation(appinfo);
				} catch (ex) {
					onErrorCB(ex);
				}
				TestEngine.log("[onInstalled][END]");
			}
		};
		
		var id = tizen.application.addAppInfoEventListener(onAppInfoEventCB);
		TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_006 id : " + id);
		//tizen.application.removeAppInfoEventListener(id);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_006 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_006", true);

	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_006 END");
}

function UTC_application_addAppInfoEventListener_P_007()
{
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_007 START");

	try {

		var onAppInfoEventCB = {

			onupdated : function(appinfo) {
				TestEngine.log("[onUpdated][START]");
				try {
					printApplicationInformation(appinfo);
				} catch (ex) {
					onErrorCB(ex);
				}
				TestEngine.log("[onUpdated][END]");
			}
		};
		
		var id = tizen.application.addAppInfoEventListener(onAppInfoEventCB);
		TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_007 id : " + id);
		//tizen.application.removeAppInfoEventListener(id);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_007 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_007", true);

	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_007 END");
}

function UTC_application_addAppInfoEventListener_P_008()
{
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_008 START");

	try {

		var onAppInfoEventCB = {
			onuninstalled : function(appid) {
				TestEngine.log("[onUninstalled][START]");
				try {
					TestEngine.log("[onUninstalled] appid = "+appid);
				} catch (ex) {
					onErrorCB(ex);
				}
				TestEngine.log("[onUninstalled][END]");
			}
		};
		
		var id = tizen.application.addAppInfoEventListener(onAppInfoEventCB);
		TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_008 id : " + id);
		//tizen.application.removeAppInfoEventListener(id);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_008 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_addAppInfoEventListener_P_008", true);

	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_P_008 END");
}

function UTC_application_addAppInfoEventListener_N_001()
{
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_N_001 START");

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "addAppInfoEventListener", null);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "addAppInfoEventListener", undefined);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "addAppInfoEventListener", TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.application, "addAppInfoEventListener", TEST_NUM);
	
	TestEngine.log("[Application] UTC_application_addAppInfoEventListener_N_001 END");
}

function UTC_application_removeAppInfoEventListener_N_001()
{
	TestEngine.log("[Application] UTC_application_removeAppInfoEventListener_N_001 START");
	var id = tizen.application.addAppInfoEventListener(onAppInfoEventCB, onErrorCB);

	TestEngine.log("Wrong integer value.");
	TestEngine.catchErrorType("name", NOT_FOUND_ERR , tizen.application, "removeAppInfoEventListener", -1);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR , tizen.application, "removeAppInfoEventListener", id+10);

	TestEngine.log("Wrong type.");
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "removeAppInfoEventListener", TEST_STR);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "removeAppInfoEventListener", TEST_OBJ);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.application, "removeAppInfoEventListener", TEST_FUN);

	TestEngine.log("[Application] UTC_application_removeAppInfoEventListener_N_001 END");
}

function UTC_application_construct_ApplicationControlData_P_001()
{
	TestEngine.log("[Application] UTC_application_construct_ApplicationControlData_P_001 START");

	try {
		var data = new tizen.ApplicationControlData("key", ["value"]);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_construct_ApplicationControlData_P_001 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_construct_ApplicationControlData_P_001", true);
	TestEngine.log("[Application] UTC_application_construct_ApplicationControlData_P_001 END");
}


function UTC_application_construct_ApplicationControlData_P_002()
{
	TestEngine.log("[Application] UTC_application_construct_ApplicationControlData_P_002 START");

	try {
		var data = new tizen.ApplicationControlData("key", ["value", "value2"]);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_construct_ApplicationControlData_P_002 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_construct_ApplicationControlData_P_002", true);
	TestEngine.log("[Application] UTC_application_construct_ApplicationControlData_P_002 END");
}

function UTC_application_construct_ApplicationControl_P_001()
{
	TestEngine.log("[Application] UTC_application_construct_ApplicationControl_P_001 START");

	try {
		var appControl = new tizen.ApplicationControl("operation");
	} catch(err) {
		TestEngine.test("[Application] UTC_application_construct_ApplicationControl_P_001 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_construct_ApplicationControl_P_001", true);
	TestEngine.log("[Application] UTC_application_construct_ApplicationControl_P_001 END");
}

function UTC_application_construct_ApplicationControl_P_002()
{
	TestEngine.log("[Application] UTC_application_construct_ApplicationControl_P_002 START");

	try {
		var appControl1 = new tizen.ApplicationControl("operation", "uri", "mime", "category", null);
		var appControl2 = new tizen.ApplicationControl("operation", null, "mime", "category", null);
		var appControl3 = new tizen.ApplicationControl("operation", null, null, "category", null);
		var appControl4 = new tizen.ApplicationControl("operation", null, null, null, null);
		var appControl5 = new tizen.ApplicationControl("operation", undefined, "mime", "category", null);
		var appControl6 = new tizen.ApplicationControl("operation", undefined, undefined, "category", null);
		var appControl7 = new tizen.ApplicationControl("operation", undefined, undefined, "category", null);
		var appControl8 = new tizen.ApplicationControl("operation", "uri", null,  "category", null);
		var appControl9 = new tizen.ApplicationControl("operation", "uri", undefined,  "category", null);
		var appControl10 = new tizen.ApplicationControl("operation", "uri", null, null, null);
		var appControl11 = new tizen.ApplicationControl("operation", "uri", "mime", null, null);
		var appControl12 = new tizen.ApplicationControl("operation", "uri", "mime", undefined, null);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_construct_ApplicationControl_P_002 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_construct_ApplicationControl_P_002", true);
	TestEngine.log("[Application] UTC_application_construct_ApplicationControl_P_002 END");
}

function UTC_application_construct_ApplicationControl_P_003()
{
	TestEngine.log("[Application] UTC_application_construct_ApplicationControl_P_003 START");

	try {
		var data = [
			new tizen.ApplicationControlData("key1", ["data1"]),
			new tizen.ApplicationControlData("key2", ["data2", "data3"])
		];
		var appControl = new tizen.ApplicationControl("operation", "uri", "mime", "category", null);
		var appControl2 = new tizen.ApplicationControl("operation", "uri", "mime", "category", data);
		var appControl4 = new tizen.ApplicationControl("operation", "uri", "mime", "category", data, data);

	} catch(err) {
		TestEngine.test("[Application] UTC_application_construct_ApplicationControl_P_003 err : " + err, false);
	}
	TestEngine.test("[Application] UTC_application_construct_ApplicationControl_P_003", true);
	TestEngine.log("[Application] UTC_application_construct_ApplicationControl_P_003 END");
}


function UTC_application_field_ApplicationInformation_N_001()
{
	TestEngine.log("[Application] UTC_application_field_ApplicationInformation_N_001 START");

	var info = tizen.application.getAppInfo();

	printApplicationInformation(info);

	var id = info.id;
	var name = info.name;
	var iconPath = info.iconPath;
	var show = info.show;
	var version = info.version;

	try {
		info.id = "test";
		info.name = "UTC_application_N_00ame";
		info.iconPath = "iconPath";
		info.version = "version";
		info.show = true;
	} catch(err) {
		TestEngine.test("[Application] UTC_application_field_ApplicationInformation_N_001 error : " + err, false);
	}

	if ((info.id != id) || (info.name != name) || (info.version != version) || (info.iconPath != iconPath) || (info.show != show)) {
		TestEngine.test("[Application] UTC_application_field_ApplicationInformation_N_001 the value is changed!", false);
	}

	printApplicationInformation(info);

	TestEngine.test("[Application] UTC_application_field_ApplicationInformation_N_001 success", true);
	TestEngine.log("[Application] UTC_application_field_ApplicationInformation_N_001 END");
}

function UTC_application_field_ApplicationContext_N_001()
{
	TestEngine.log("[Application] UTC_application_field_ApplicationContext_N_001 START");

	var context = tizen.application.getAppContext();
	var id = context.id;
	var appId = context.appId;

	try {
		context.id = "test";
		context.appId = "appId";
	} catch(err) {
		TestEngine.test("[Application] UTC_application_field_ApplicationContext_N_001 error : " + err, false);
	}

	if ((context.id != id) || (context.appId != appId)) {
		TestEngine.test("[Application] UTC_application_field_ApplicationContext_N_001 the value is changed!", false);
	}

	TestEngine.test("[Application] UTC_application_field_ApplicationContext_N_001 success", true);
	TestEngine.log("[Application] UTC_application_field_ApplicationContext_N_001 END");
}

function UTC_application_tmp()
{
	TestEngine.log("[Application] UTC_application_tmp START");
	try {
		var cbObj = TestEngine.registerCallback("launchAppControl", onSuccessCB, onErrorCB);
		var appControl = new tizen.ApplicationControl("slp.appcontrol.operation.TEST2", null, null);

		tizen.application.launchAppControl(cbObj.successCallback, cbObj.errorCallback, appControl, null);
	} catch(err) {
		TestEngine.test("[Application] UTC_application_tmp error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_tmp END");
}


function UTC_application_DCM_1456()
{
	TestEngine.log("[Application] UTC_application_DCM_1456 START");

	var cbObj = TestEngine.registerCallback("getAppsContext", onSuccessCB, onErrorCB);

	try {
		var beforeContextArray = new Array();

		var getAfterContextArray = function(ctxArr2) {
			TestEngine.log("AfterContextArray Enter");

			for (var i = 0; i < ctxArr2.length; i++) {
				if (beforeContextArray.indexOf(ctxArr2[i].id) == -1) {
					TestEngine.log("Launched App Found : " + ctxArr2[i].appId);
					tizen.application.kill(ctxArr2[i].id,
							function() {
								TestEngine.log("Success to Kill ");
								TestEngine.test("[Application] UTC_application_DCM_1456", true);
								cbObj.successCallback();
							},
							function(e) {
								TestEngine.log("error : "+e.name);
								TestEngine.test("[Application] UTC_application_DCM_1456", false);
								cbObj.onErrorCB();
							}
					);
				}
			}
		}

		var getPrevContextArray = function (contexts) {
			// save the current contexts
			for (var j = 0; j < contexts.length; j++) {
				beforeContextArray[j] = contexts[j].id;
			}

			// launch AppControl with aliased App ID
			var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/create_content", null, "image/jpeg", null, null);
			tizen.application.launchAppControl(appControl,
						"tizen.camera",
						function() {
							TestEngine.log("launch success");
							tizen.application.getAppsContext(getAfterContextArray,
								function(e) {
									TestEngine.log("error : "+e.name);
									TestEngine.test("[Application] UTC_application_DCM_1456", false);
									cbObj.onErrorCB();
								}
							);
						},
						function(e) {
							TestEngine.log("error : "+e.name);
							TestEngine.test("[Application] UTC_application_DCM_1456", false);
							cbObj.onErrorCB();
						}
			);
		}

		tizen.application.getAppsContext(getPrevContextArray,
				function(e) {
					TestEngine.log("error : "+e.name);
					TestEngine.test("[Application] UTC_application_DCM_1456", false);
					cbObj.onErrorCB();
				}
		);
	} catch (err) {
		TestEngine.test("[Application] UTC_application_DCM_1456 error : " + err, false);
	}

	TestEngine.log("[Application] UTC_application_DCM_1456 END");
}

