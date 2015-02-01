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
//var UNKNOWN_ERR = 'UnknownError';
//var PERMISSION_DENIED_ERR = 'PermissionDeniedError';

var ERROR_STR = "GG";

function UTC_power_module_presence_P_001()
{
    TestEngine.log("UTC_power_module_presence_P_001");

    TestEngine.test("Tizen presence", tizen);
    TestEngine.test("Power manager presence", tizen.power);
    TestEngine.testPresence("request presence", tizen.power.request);
    TestEngine.testPresence("release presence", tizen.power.release);
    TestEngine.testPresence("setScreenStateChangeListener presence", tizen.power.setScreenStateChangeListener);
    TestEngine.testPresence("unsetScreenStateChangeListener presence", tizen.power.unsetScreenStateChangeListener);
    TestEngine.testPresence("getScreenBrightness presence", tizen.power.getScreenBrightness);
    TestEngine.testPresence("setScreenBrightness presence", tizen.power.setScreenBrightness);
    TestEngine.testPresence("isScreenOn presence", tizen.power.isScreenOn);
    TestEngine.testPresence("restoreScreenBrightness presence", tizen.power.restoreScreenBrightness);
    TestEngine.testPresence("turnScreenOn presence", tizen.power.turnScreenOn);
    TestEngine.testPresence("turnScreenOff presence", tizen.power.turnScreenOff);
}

function UTC_power_request_P_001()
{
    TestEngine.log("UTC_power_request_P_001");

    testNoExceptionWithMessage("test request display",
        function(){
            tizen.power.request("SCREEN", "SCREEN_DIM");
            tizen.power.request("SCREEN", "SCREEN_NORMAL");
            tizen.power.request("SCREEN", "SCREEN_BRIGHT");
        }
    );

    testNoExceptionWithMessage("test request cpu",
        function(){
            tizen.power.request("CPU", "CPU_AWAKE");
        }
    );

    testNoExceptionWithMessage("test request additional",
        function(){
            tizen.power.request("SCREEN", "SCREEN_BRIGHT", ERROR_STR);
        }
    );
}

function UTC_power_request_N_001()
{
    TestEngine.log("UTC_power_request_N_001");

    TestEngine.log("First parameter check.");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "request", ERROR_STR);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "request", null);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "request", undefined);

    TestEngine.log("Second parameter check.");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "request", "SCREEN", ERROR_STR);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "request", "SCREEN", null);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "request", "SCREEN", undefined);

    TestEngine.log("Invalid number of parameters check.");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "request");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "request", "SCREEN");
}

function UTC_power_release_P_001()
{
    TestEngine.log("UTC_power_release_P_001");

    testNoExceptionWithMessage("test release display",
            function(){
    			tizen.power.release("SCREEN");
            }
    );

    testNoExceptionWithMessage("test release display additional",
            function(){
    			tizen.power.release("SCREEN", 1);
            }
    );
}

function UTC_power_release_N_001()
{
    TestEngine.log("UTC_power_release_N_001");

    TestEngine.log("First parameter check.");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "release", ERROR_STR);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "release", null);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "release", undefined);

    TestEngine.log("Invalid number of parameters check.");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "release");
}

function onChanged(previousState, changedState) {
	TestEngine.log("State changed." + ", previousState: " + previousState + ", changedState: " + changedState);
}

function UTC_power_setScreenStateChangeListener_P_001()
{
    TestEngine.log("UTC_power_setScreenStateChangeListener_P_001");

    testNoExceptionWithMessage("test setScreenStateChangeListener",
        function(){
            tizen.power.setScreenStateChangeListener(onChanged);
        }
    );

    testNoExceptionWithMessage("test setScreenStateChangeListener additional",
        function(){
            tizen.power.setScreenStateChangeListener(onChanged, ERROR_STR);
        }
    );
}

function UTC_power_setScreenStateChangeListener_N_001()
{
    TestEngine.log("UTC_power_setScreenStateChangeListener_N_001");

    TestEngine.log("First parameter check.");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "setScreenStateChangeListener", ERROR_STR);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "setScreenStateChangeListener", null);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "setScreenStateChangeListener", undefined);

    TestEngine.log("Invalid number of parameters check.");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "setScreenStateChangeListener");
}

function UTC_power_unsetScreenStateChangeListener_P_001()
{
    TestEngine.log("UTC_power_unsetScreenStateChangeListener_P_001");

    testNoExceptionWithMessage("test unsetScreenStateChangeListener",
        function(){
            tizen.power.unsetScreenStateChangeListener();
        }
    );

    testNoExceptionWithMessage("test request additional",
        function(){
            tizen.power.unsetScreenStateChangeListener(ERROR_STR);
        }
    );
}

function UTC_power_getScreenBrightness_P_001()
{
    TestEngine.log("UTC_power_getScreenBrightness_P_001");

    testNoExceptionWithMessage("test getScreenBrightness",
        function(){
            tizen.power.getScreenBrightness();
        }
    );

    testNoExceptionWithMessage("test getScreenBrightness additional",
        function(){
            tizen.power.getScreenBrightness(ERROR_STR);
        }
    );
}

function UTC_power_setScreenBrightness_P_001()
{
    TestEngine.log("UTC_power_setScreenBrightness_P_001");

    testNoExceptionWithMessage("test setScreenBrightness",
        function(){
            tizen.power.setScreenBrightness(0.5);
        }
    );

    testNoExceptionWithMessage("test setScreenBrightness additional",
        function(){
            tizen.power.setScreenBrightness(0.1, ERROR_STR);
        }
    );
}

function UTC_power_setScreenBrightness_N_001()
{
    TestEngine.log("UTC_power_setScreenBrightness_N_001");

    TestEngine.log("First parameter check.");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.power, "setScreenBrightness", ERROR_STR);
}

function UTC_power_isScreenOn_P_001()
{
    TestEngine.log("UTC_power_isScreenOn_P_001");

    testNoExceptionWithMessage("test isScreenOn",
        function(){
            tizen.power.isScreenOn();
        }
    );

    testNoExceptionWithMessage("test isScreenOn additional",
        function(){
            tizen.power.isScreenOn(ERROR_STR);
        }
    );
}

function UTC_power_restoreScreenBrightness_P_001()
{
    TestEngine.log("UTC_power_restoreScreenBrightness_P_001");

    testNoExceptionWithMessage("test restoreScreenBrightness",
        function(){
            tizen.power.restoreScreenBrightness();
        }
    );

    testNoExceptionWithMessage("test restoreScreenBrightness additional",
        function(){
            tizen.power.restoreScreenBrightness(ERROR_STR);
        }
    );
}

function UTC_power_turnScreenOff_P_001()
{
    TestEngine.log("UTC_power_turnScreenOff_P_001");

    testNoExceptionWithMessage("test turnScreenOff",
        function(){
            tizen.power.turnScreenOff();
        }
    );

    testNoExceptionWithMessage("test turnScreenOff additional",
        function(){
            tizen.power.turnScreenOff(ERROR_STR);
        }
    );
}

function UTC_power_turnScreenOn_P_001()
{
    TestEngine.log("UTC_power_turnScreenOn_P_001");

    testNoExceptionWithMessage("test turnScreenOn",
        function(){
            tizen.power.turnScreenOn();
        }
    );

    testNoExceptionWithMessage("test turnScreenOn additional",
        function(){
            tizen.power.turnScreenOn(ERROR_STR);
        }
    );
}

function testNoExceptionWithMessage(message, fun) {
    var testResult = true;
    try
    {
        fun();
    }
    catch (e)
    {
        testResult = false;
    }
    TestEngine.test(message, testResult);
}
