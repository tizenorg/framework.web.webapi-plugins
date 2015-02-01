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



Authors:

*/
var IMAGE_FILE_PATH = "/opt/usr/media/tct-systemsetting-tizen-tests/tct-systemsetting-tizen-tests_image.jpg";
var SOUND_FILE_PATH = "/opt/usr/media/tct-systemsetting-tizen-tests/tct-systemsetting-tizen-tests_audio.mp3";

function SystemSettingManager_getProperty_exist() {
//==== TEST: SystemSettingManager_getProperty_exist
//==== LABEL Check if exists of getProperty
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("getProperty" in tizen.systemsetting, "No getProperty method in tizen.");
    check_method_exists(tizen.systemsetting, "getProperty");
}, 'SystemSettingManager_getProperty_exist');

}

function SystemSettingManager_setProperty_exist() {
//==== TEST: SystemSettingManager_setProperty_exist
//==== LABEL Check if exists of setProperty
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("setProperty" in tizen.systemsetting, "No setProperty method in tizen.systemsetting");
    check_method_exists(tizen.systemsetting, "setProperty");
}, 'SystemSettingManager_setProperty_exist');

}

function SystemSettingManager_extend() {

//==== TEST: SystemSettingManager_extend
//==== LABEL Check if SystemSettingManager is extendable
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:SystemSettingManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX
test(function () {
    check_extensibility(tizen.systemsetting);
}, 'SystemSettingManager_extend');

}

function SystemSettingManager_getProperty_HOME_SCREEN() {

//==== TEST: SystemSettingManager_getProperty_HOME_SCREEN
//==== LABEL Check if getProperty works for HOME_SCREEN
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MOA MR
var t = async_test('SystemSettingManager_getProperty_HOME_SCREEN'),
    successCallback, errorCallback, returnedValue = null;

t.step(function () {
    successCallback = t.step_func(function (value) {
        assert_equals(returnedValue, undefined, "Incorrect value returned from getProperty method.");
        assert_type(value, "string", "Incorrect type.");
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Should not be here: " + error.name + ": " + error.message);
    });

    returnedValue = tizen.systemsetting.getProperty("HOME_SCREEN", successCallback, errorCallback);
});

}

function SystemSettingManager_getProperty_INCOMING_CALL() {

//==== TEST: SystemSettingManager_getProperty_INCOMING_CALL
//==== LABEL Check if getProperty works for INCOMING_CALL
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MOA MR
var t = async_test('SystemSettingManager_getProperty_INCOMING_CALL'),
    successCallback, errorCallback, returnedValue = null;

t.step(function () {
    successCallback = t.step_func(function (value) {
        assert_equals(returnedValue, undefined, "Incorrect value returned from getProperty method.");
        assert_type(value, "string", "Incorrect type.");
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Should not be here: " + error.name + ": " + error.message);
    });

    returnedValue = tizen.systemsetting.getProperty("INCOMING_CALL", successCallback, errorCallback);
});

}

function SystemSettingManager_getProperty_type_TypeMismatch() {

//==== TEST: SystemSettingManager_getProperty_type_TypeMismatch
//==== LABEL Check if getProperty throws exception when type is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MC
var t = async_test('SystemSettingManager_getProperty_type_TypeMismatch'), i, conversionTable,
    systemSettingType, exceptionName, successCallback, errorCallback;

t.step(function () {
    successCallback = t.step_func(function (value) {
        assert_unreached("Should not be here. Value = " + value);
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Should not be here: " + error.name + ": " + error.message);
    });

    conversionTable = getTypeConversionExceptions("enum", false);

    for(i = 0; i < conversionTable.length; i++) {
        systemSettingType = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systemsetting.getProperty(systemSettingType, successCallback, errorCallback);
            }, exceptionName + " should be thrown - given incorrect SystemSettingType - " + systemSettingType);
    }

    t.done();
});

}

function SystemSettingManager_getProperty_LOCK_SCREEN() {

//==== TEST: SystemSettingManager_getProperty_LOCK_SCREEN
//==== LABEL Check if getProperty works for LOCK_SCREEN
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MOA MR
var t = async_test('SystemSettingManager_getProperty_LOCK_SCREEN'),
    successCallback, errorCallback, returnedValue = null;

t.step(function () {
    successCallback = t.step_func(function (value) {
        assert_equals(returnedValue, undefined, "Incorrect value returned from getProperty method.");
        assert_type(value, "string", "Incorrect type.");
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Should not be here: " + error.name + ": " + error.message);
    });

    returnedValue = tizen.systemsetting.getProperty("LOCK_SCREEN", successCallback, errorCallback);
});

}

function SystemSettingManager_getProperty_no_errorCallback() {

//==== TEST: SystemSettingManager_getProperty_no_errorCallback
//==== LABEL Check if getProperty works without error callback
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MMINA MR
var t = async_test('SystemSettingManager_getProperty_no_errorCallback'),
    successCallback, returnedValue = null;

t.step(function () {
    successCallback = t.step_func(function (value) {
        assert_equals(returnedValue, undefined, "Incorrect value returned from getProperty method.");
        assert_type(value, "string", "Incorrect type.");
        t.done();
    });

    returnedValue = tizen.systemsetting.getProperty("HOME_SCREEN", successCallback);
});

}

function SystemSettingManager_setProperty_HOME_SCREEN() {

//==== TEST: SystemSettingManager_setProperty_HOME_SCREEN
//==== LABEL Check if setProperty works for HOME_SCREEN
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MOA MAST MR
var t = async_test('SystemSettingManager_setProperty_HOME_SCREEN'), type = "HOME_SCREEN",
    previousValue, getPreviousValueCallback, newValue = IMAGE_FILE_PATH,
    setNewValueSuccessCallback, getNewValueSuccessCallback, returnedValue = null,
    setPreviousValueSuccessCallback, exception, getPropertyError, setPropertyNewError,
    getPropertyNewError, setPropertyPreviousError;

t.step(function () {
    setPropertyPreviousError = t.step_func(function (error) {
        assert_unreached("setPropertyPreviousError() error: " + error.name + ": " + error.message);
    });

    setPreviousValueSuccessCallback = t.step_func(function () {
        if (exception !== undefined){
            throw exception;
        }
        t.done();
    });

    getNewValueSuccessCallback = t.step_func(function (value) {
        try {
            assert_not_equals(value, previousValue, "New value set incorrectly.");
            assert_equals(value, newValue, "New value set incorrectly.");
        } catch (e) {
            exception = e;
        } finally {
            tizen.systemsetting.setProperty(type, previousValue, setPreviousValueSuccessCallback, setPropertyPreviousError);
        }
    });

    getPropertyNewError = t.step_func(function (error) {
        assert_unreached("getPropertyNewError() error: " + error.name + ": " + error.message);
    });

    setNewValueSuccessCallback = t.step_func(function () {
        assert_equals(returnedValue, undefined, "Incorrect value returned from setProperty method.");
        tizen.systemsetting.getProperty(type, getNewValueSuccessCallback, getPropertyNewError);
    });

    setPropertyNewError = t.step_func(function (error) {
        assert_unreached("setPropertyNewError() error: " + error.name + ": " + error.message);
    });

    getPreviousValueCallback = t.step_func(function (value) {
        previousValue = value;
        returnedValue = tizen.systemsetting.setProperty(type, newValue, setNewValueSuccessCallback, setPropertyNewError);
    });

    getPropertyError = t.step_func(function (error) {
        assert_unreached("getProperty() error: " + error.name + ": " + error.message);
    });

    tizen.systemsetting.getProperty(type, getPreviousValueCallback, getPropertyError);
});

}

function SystemSettingManager_setProperty_INCOMING_CALL() {

//==== TEST: SystemSettingManager_setProperty_INCOMING_CALL
//==== LABEL Check if setProperty works for INCOMING_CALL
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MOA MAST MR
var t = async_test('SystemSettingManager_setProperty_INCOMING_CALL'), type = "INCOMING_CALL",
    previousValue, getPreviousValueCallback, newValue = SOUND_FILE_PATH,
    setNewValueSuccessCallback, getNewValueSuccessCallback, returnedValue = null,
    setPreviousValueSuccessCallback, exception, getPropertyError, setPropertyNewError,
    getPropertyNewError, setPropertyPreviousError;

t.step(function () {
    setPropertyPreviousError = t.step_func(function (error) {
        assert_unreached("setPropertyPreviousError() error: " + error.name + ": " + error.message);
    });

    setPreviousValueSuccessCallback = t.step_func(function () {
        if (exception !== undefined){
            throw exception;
        }
        t.done();
    });

    getNewValueSuccessCallback = t.step_func(function (value) {
        try {
            assert_not_equals(value, previousValue, "New value set incorrectly.");
            assert_equals(value, newValue, "New value set incorrectly.");
        } catch (e) {
            exception = e;
        } finally {
            tizen.systemsetting.setProperty(type, previousValue, setPreviousValueSuccessCallback, setPropertyPreviousError);
        }
    });

    getPropertyNewError = t.step_func(function (error) {
        assert_unreached("getPropertyNewError() error: " + error.name + ": " + error.message);
    });

    setNewValueSuccessCallback = t.step_func(function () {
        assert_equals(returnedValue, undefined, "Incorrect value returned from setProperty method.");
        tizen.systemsetting.getProperty(type, getNewValueSuccessCallback, getPropertyNewError);
    });

    setPropertyNewError = t.step_func(function (error) {
        assert_unreached("setPropertyNewError() error: " + error.name + ": " + error.message);
    });

    getPreviousValueCallback = t.step_func(function (value) {
        previousValue = value;
        returnedValue = tizen.systemsetting.setProperty(type, newValue, setNewValueSuccessCallback, setPropertyNewError);
    });

    getPropertyError = t.step_func(function (error) {
        assert_unreached("getProperty() error: " + error.name + ": " + error.message);
    });

    tizen.systemsetting.getProperty(type, getPreviousValueCallback, getPropertyError);
});

}

function SystemSettingManager_setProperty_errorCallback_invalid_cb() {

//==== TEST: SystemSettingManager_setProperty_errorCallback_invalid_cb
//==== LABEL Check if setProperty throws exception when error callback is invalid
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MTCB
var t = async_test('SystemSettingManager_setProperty_errorCallback_invalid_cb'),
    exceptionName = "TypeMismatchError", successCallback, incorrectCallback;


t.step(function () {

    incorrectCallback = {
        onerror: t.step_func(function (error) {
            assert_unreached("Invalid errorCallback invoked: " + error.name + ": " + error.message);
        })
    };

    successCallback = t.step_func(function () {
        assert_unreached("Should not be here.");
    });

    assert_throws({name: exceptionName},
        function () {
            tizen.systemsetting.setProperty("HOME_SCREEN", IMAGE_FILE_PATH,
                successCallback, incorrectCallback);
        }, exceptionName + " should be thrown - given incorrect error callback.");
    t.done();
});

}

function SystemSettingManager_setProperty_successCallback_invalid_cb() {

//==== TEST: SystemSettingManager_setProperty_successCallback_invalid_cb
//==== LABEL Check if setProperty throws exception when success callback is invalid
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MTCB
var t = async_test('SystemSettingManager_setProperty_successCallback_invalid_cb'),
    exceptionName = "TypeMismatchError", errorCallback, incorrectCallback;

t.step(function () {

    incorrectCallback = {
        onsuccess: t.step_func(function () {
            assert_unreached("Invalid successCallback invoked");
        })
    };

    errorCallback = t.step_func(function (error) {
        assert_unreached("ErrorCallback invoked: " + error.name + ": " + error.message);
    });

    assert_throws({name: exceptionName},
        function () {
            tizen.systemsetting.setProperty("HOME_SCREEN", IMAGE_FILE_PATH,
                incorrectCallback, errorCallback);
        }, exceptionName + " should be thrown - given incorrect success callback.");
    t.done();
});

}

function SystemSettingManager_setProperty_type_TypeMismatch() {

//==== TEST: SystemSettingManager_setProperty_type_TypeMismatch
//==== LABEL Check if setProperty throws exception when type is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MC
var t = async_test('SystemSettingManager_setProperty_type_TypeMismatch'), i, conversionTable,
    systemSettingType, exceptionName, successCallback, errorCallback;


t.step(function () {
    successCallback = t.step_func(function () {
        assert_unreached("Should not be here.");
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Should not be here: " + error.name + ": " + error.message);
    });

    conversionTable = getTypeConversionExceptions("enum", false);

    for(i = 0; i < conversionTable.length; i++) {
        systemSettingType = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systemsetting.setProperty(systemSettingType,
                    IMAGE_FILE_PATH, successCallback, errorCallback);
            }, exceptionName + " should be thrown - given incorrect SystemSettingType.");
    }

    t.done();
});

}

function SystemSettingManager_setProperty_LOCK_SCREEN() {

//==== TEST: SystemSettingManager_setProperty_LOCK_SCREEN
//==== LABEL Check if setProperty works for LOCK_SCREEN
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MOA MAST MR
var t = async_test('SystemSettingManager_setProperty_LOCK_SCREEN'), type = "LOCK_SCREEN",
    previousValue, getPreviousValueCallback, newValue = IMAGE_FILE_PATH,
    setNewValueSuccessCallback, getNewValueSuccessCallback, returnedValue = null,
    setPreviousValueSuccessCallback, exception, getPropertyError, setPropertyNewError,
    getPropertyNewError, setPropertyPreviousError;

t.step(function () {
    setPropertyPreviousError = t.step_func(function (error) {
        assert_unreached("setPropertyPreviousError() error: " + error.name + ": " + error.message);
    });

    setPreviousValueSuccessCallback = t.step_func(function () {
        if (exception !== undefined){
            throw exception;
        }
        t.done();
    });

    getNewValueSuccessCallback = t.step_func(function (value) {
        try {
            assert_not_equals(value, previousValue, "New value set incorrectly.");
            assert_equals(value, newValue, "New value set incorrectly.");
        } catch (e) {
            exception = e;
        } finally {
            tizen.systemsetting.setProperty(type, previousValue, setPreviousValueSuccessCallback, setPropertyPreviousError);
        }
    });

    getPropertyNewError = t.step_func(function (error) {
        assert_unreached("getPropertyNewError() error: " + error.name + ": " + error.message);
    });

    setNewValueSuccessCallback = t.step_func(function () {
        assert_equals(returnedValue, undefined, "Incorrect value returned from setProperty method.");
        tizen.systemsetting.getProperty(type, getNewValueSuccessCallback, getPropertyNewError);
    });

    setPropertyNewError = t.step_func(function (error) {
        assert_unreached("setPropertyNewError() error: " + error.name + ": " + error.message);
    });

    getPreviousValueCallback = t.step_func(function (value) {
        previousValue = value;
        returnedValue = tizen.systemsetting.setProperty(type, newValue, setNewValueSuccessCallback, setPropertyNewError);
    });

    getPropertyError = t.step_func(function (error) {
        assert_unreached("getProperty() error: " + error.name + ": " + error.message);
    });

    tizen.systemsetting.getProperty(type, getPreviousValueCallback, getPropertyError);
});

}

function SystemSettingManager_setProperty_no_errorCallback() {

//==== TEST: SystemSettingManager_setProperty_no_errorCallback
//==== LABEL Check if setProperty works for home_screen without error_callback
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MMINA MAST MR
var t = async_test('SystemSettingManager_setProperty_no_errorCallback'), type = "HOME_SCREEN",
    previousValue, getPreviousValueCallback, newValue = IMAGE_FILE_PATH,
    setNewValueSuccessCallback, getNewValueSuccessCallback, returnedValue = null,
    getNewValueSuccessCallback, setPreviousValueSuccessCallback, exception, getPropertyError,
    setPropertyPreviousError;

t.step(function () {
    setPropertyPreviousError = t.step_func(function (error) {
        assert_unreached("setPropertyPreviousError() error: " + error.name + ": " + error.message);
    });

    setPreviousValueSuccessCallback = t.step_func(function () {
        if (exception !== undefined){
            throw exception;
        }
        t.done();
    });

    getNewValueSuccessCallback = t.step_func(function (value) {
        try {
            assert_not_equals(value, previousValue, "New value set incorrectly.");
            assert_equals(value, newValue, "New value set incorrectly.");
        } catch (e) {
            exception = e;
        } finally {
            tizen.systemsetting.setProperty(type, previousValue, setPreviousValueSuccessCallback, setPropertyPreviousError);
        }
    });

    setNewValueSuccessCallback = t.step_func(function () {
        assert_equals(returnedValue, undefined, "Incorrect value returned from setProperty method.");
        tizen.systemsetting.getProperty(type, getNewValueSuccessCallback);
    });

    getPreviousValueCallback = t.step_func(function (value) {
        previousValue = value;
        returnedValue = tizen.systemsetting.setProperty(type, newValue, setNewValueSuccessCallback);
    });

    getPropertyError = t.step_func(function (error) {
        assert_unreached("getProperty() error: " + error.name + ": " + error.message);
    });

    tizen.systemsetting.getProperty(type, getPreviousValueCallback, getPropertyError);
});

}

function SystemSettingManager_setProperty_NOTIFICATION_EMAIL() {

//==== TEST: SystemSettingManager_setProperty_NOTIFICATION_EMAIL
//==== LABEL Check if setProperty works for NOTIFICATION_EMAIL
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MOA MAST MR
var t = async_test('SystemSettingManager_setProperty_NOTIFICATION_EMAIL'), type = "NOTIFICATION_EMAIL",
    previousValue, getPreviousValueCallback, newValue = SOUND_FILE_PATH,
    setNewValueSuccessCallback, getNewValueSuccessCallback, returnedValue = null,
    setPreviousValueSuccessCallback, exception, getPropertyError, setPropertyNewError,
    getPropertyNewError, setPropertyPreviousError;

t.step(function () {
    setPropertyPreviousError = t.step_func(function (error) {
        assert_unreached("setPropertyPreviousError() error: " + error.name + ": " + error.message);
    });

    setPreviousValueSuccessCallback = t.step_func(function () {
        if (exception !== undefined){
            throw exception;
        }
        t.done();
    });

    getNewValueSuccessCallback = t.step_func(function (value) {
        try {
            assert_not_equals(value, previousValue, "New value set incorrectly.");
            assert_equals(value, newValue, "New value set incorrectly.");
        } catch (e) {
            exception = e;
        } finally {
            tizen.systemsetting.setProperty(type, previousValue, setPreviousValueSuccessCallback, setPropertyPreviousError);
        }
    });

    getPropertyNewError = t.step_func(function (error) {
        assert_unreached("getPropertyNewError() error: " + error.name + ": " + error.message);
    });

    setNewValueSuccessCallback = t.step_func(function () {
        assert_equals(returnedValue, undefined, "Incorrect value returned from setProperty method.");
        tizen.systemsetting.getProperty(type, getNewValueSuccessCallback, getPropertyNewError);
    });

    setPropertyNewError = t.step_func(function (error) {
        assert_unreached("setPropertyNewError() error: " + error.name + ": " + error.message);
    });

    getPreviousValueCallback = t.step_func(function (value) {
        previousValue = value;
        returnedValue = tizen.systemsetting.setProperty(type, newValue, setNewValueSuccessCallback, setPropertyNewError);
    });

    getPropertyError = t.step_func(function (error) {
        assert_unreached("getProperty() error: " + error.name + ": " + error.message);
    });

    tizen.systemsetting.getProperty(type, getPreviousValueCallback, getPropertyError);
});

}

function SystemSettingManager_notexist() {

//==== TEST: SystemSettingManager_notexist
//==== LABEL Check if SystemSettingManage doesn't exist
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:SystemSettingManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("SystemSettingManager");
}, 'SystemSettingManager_notexist');

}

function SystemSettingObject_notexist() {

//==== TEST: SystemSettingObject_notexist
//==== LABEL Check if SystemSettingObject is undefined
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingObject:SystemSettingObject U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("SystemSettingObject");
}, 'SystemSettingObject_notexist');

}

function SystemSettingSuccessCallback_notexist() {

//==== TEST: SystemSettingSuccessCallback_notexist
//==== LABEL Check if SystemSettingSuccessCallback doesn't exist
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingSuccessCallback:SystemSettingSuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== PRIORITY P3
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("SystemSettingSuccessCallback");
}, 'SystemSettingSuccessCallback_notexist');

}

function SystemSettingManager_getProperty_NOTIFICATION_EMAIL() {

//==== TEST: SystemSettingManager_getProperty_NOTIFICATION_EMAIL
//==== LABEL Check if getProperty works for NOTIFICATION_EMAIL
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MOA MR
var t = async_test('SystemSettingManager_getProperty_NOTIFICATION_EMAIL'),
    successCallback, errorCallback, returnedValue = null;

t.step(function () {
    successCallback = t.step_func(function (value) {
        assert_equals(returnedValue, undefined, "Incorrect value returned from getProperty method.");
        assert_type(value, "string", "Incorrect type.");
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Should not be here: " + error.name + ": " + error.message);
    });

    returnedValue = tizen.systemsetting.getProperty("NOTIFICATION_EMAIL", successCallback, errorCallback);
});

}

function SystemSettingManager_in_tizen() {

//==== TEST: SystemSettingManager_in_tizen
//==== LABEL Check if tizen.systemsetting can be overwritten
//==== PRIORITY: P3
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:SystemSettingManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA OBME
test(function () {
    assert_true("systemsetting" in tizen, "No systemsetting in tizen.");
    check_readonly(tizen, "systemsetting", tizen.systemsetting, "object", "dummyValue");
}, 'SystemSettingManager_in_tizen');

}

function SystemSettingSuccessCallback_onsuccess() {
//==== TEST: SystemSettingSuccessCallback_onsuccess
//==== LABEL Check if SystemSettingSuccessCallback works
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingSuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA CBT CBOA

var t = async_test('SystemSettingSuccessCallback_onsuccess'), successCallback;

t.step(function () {

    successCallback = t.step_func(function (value) {
        assert_type(value, "string", "Incorrect type.");
        t.done();
    });

    tizen.systemsetting.getProperty("HOME_SCREEN", successCallback);
});

}

function SystemSettingManager_setProperty_successCallback_TypeMismatch() {

//==== TEST: SystemSettingManager_setProperty_successCallback_TypeMismatch
//==== LABEL Check if setProperty throws exception when successCallback is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MC
var t = async_test('SystemSettingManager_setProperty_successCallback_TypeMismatch'),
    type = "HOME_SCREEN", successCallback, exceptionName, errorCallback, i, conversionTable;


t.step(function () {
    errorCallback = t.step_func(function () {
        assert_unreached("ErrorCallback invoked.");
    });

    conversionTable = getTypeConversionExceptions("functionObject", false);

    for(i = 0; i < conversionTable.length; i++) {
        successCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systemsetting.setProperty(type,
                    IMAGE_FILE_PATH, successCallback, errorCallback);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
    t.done();
});

}

function SystemSettingManager_setProperty_missarg() {

//==== TEST: SystemSettingManager_setProperty_missarg
//==== LABEL Check if setProperty throws exception when non-optional argument is missing
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MMA
var t = async_test('SystemSettingManager_setProperty_missarg'),
    exceptionName = "TypeMismatchError";

t.step(function () {

    assert_throws({name: exceptionName},
        function () {
            tizen.systemsetting.setProperty("HOME_SCREEN",
                IMAGE_FILE_PATH);
        }, exceptionName + " should be thrown - missing successCallback.");

    t.done();
});

}

function SystemSettingManager_setProperty_errorCallback_TypeMismatch() {

//==== TEST: SystemSettingManager_setProperty_errorCallback_TypeMismatch
//==== LABEL Check if setProperty throws exception when errorCallback is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:setProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MC
var t = async_test('SystemSettingManager_setProperty_errorCallback_TypeMismatch'),
    type = "HOME_SCREEN", propertyValue = IMAGE_FILE_PATH,
    successCallback, exceptionName, errorCallback, i, conversionTable,
    getDeviceValueCallback, getDeviceValueErrorCallback, deviceValue;

t.step(function () {
    successCallback = t.step_func(function () {
        assert_unreached("SuccessCallback invoked.");
    });

    getDeviceValueCallback = t.step_func(function (value) {
        deviceValue = value;
        conversionTable = getTypeConversionExceptions("functionObject", true);

        for(i = 0; i < conversionTable.length; i++) {
            errorCallback = conversionTable[i][0];
            exceptionName = conversionTable[i][1];


            assert_throws({name: exceptionName},
                function () {
                    tizen.systemsetting.setProperty(type,
                        propertyValue, successCallback, errorCallback);
                    //if test fail - restore the homescreen background image
                    tizen.systemsetting.setProperty(type, deviceValue, successCallback);
                }, exceptionName + " should be thrown - given incorrect errorCallback - " + errorCallback + ".");
        }

        t.done();
    });
    getDeviceValueErrorCallback = t.step_func(function (error) {
        assert_unreached("getDeviceValueErrorCallback: " + error.name + ": " + error.message);
    });

    tizen.systemsetting.getProperty(type, getDeviceValueCallback, getDeviceValueErrorCallback);
});

}

function SystemSettingManager_getProperty_missarg() {

//==== TEST: SystemSettingManager_getProperty_missarg
//==== LABEL Check if getProperty throws exception when non-optional argument is missing
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MMA
var t = async_test('SystemSettingManager_getProperty_missarg'),
    exceptionName = "TypeMismatchError";

t.step(function () {

    assert_throws({name: exceptionName},
        function () {
            tizen.systemsetting.getProperty("HOME_SCREEN");
        }, exceptionName + " should be thrown - missing successCallback.");

    t.done();
});

}

function SystemSettingManager_getProperty_successCallback_TypeMismatch() {

//==== TEST: SystemSettingManager_getProperty_successCallback_TypeMismatch
//==== LABEL Check if getProperty throws exception when successCallback is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MC
var t = async_test('SystemSettingManager_getProperty_successCallback_TypeMismatch'),
    type = "HOME_SCREEN", successCallback, exceptionName, errorCallback, i, conversionTable;

t.step(function () {
    errorCallback = t.step_func(function (error) {
        assert_unreached("ErrorCallback invoked: " + error.name + ": " + error.message);
    });

    conversionTable = getTypeConversionExceptions("functionObject", false);

    for(i = 0; i < conversionTable.length; i++) {
        successCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systemsetting.getProperty(type, successCallback, errorCallback);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
    t.done();
});

}

function SystemSettingManager_getProperty_errorCallback_TypeMismatch() {
//==== TEST: SystemSettingManager_getProperty_errorCallback_TypeMismatch
//==== LABEL Check if getProperty throws exception when errorCallback is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MC
var t = async_test('SystemSettingManager_getProperty_errorCallback_TypeMismatch'),
    type = "HOME_SCREEN", successCallback, exceptionName, errorCallback, i, conversionTable;

t.step(function () {
    successCallback = t.step_func(function () {
        assert_unreached("SuccessCallback invoked.");
    });

    conversionTable = getTypeConversionExceptions("functionObject", true);

    for(i = 0; i < conversionTable.length; i++) {
        errorCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.systemsetting.getProperty(type, successCallback, errorCallback);
            }, exceptionName + " should be thrown - given incorrect errorCallback - " + errorCallback);
    }
    t.done();
});

}

function SystemSettingManager_getProperty_errorCallback_invalid_cb() {
//==== TEST: SystemSettingManager_getProperty_errorCallback_invalid_cb
//==== LABEL Check if getProperty throws exception when error callback is invalid
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MTCB
var t = async_test('SystemSettingManager_getProperty_errorCallback_invalid_cb'),
    exceptionName = "TypeMismatchError", successCallback, incorrectCallback;

t.step(function () {

    incorrectCallback = {
        onerror: t.step_func(function (error) {
            assert_unreached("Invalid errorCallback invoked: " + error.name + ": " + error.message);
        })
    };

    successCallback = t.step_func(function () {
        assert_unreached("Should not be here.");
    });

    assert_throws({name: exceptionName},
        function () {
            tizen.systemsetting.getProperty("HOME_SCREEN", successCallback, incorrectCallback);
        }, exceptionName + " should be thrown - given incorrect error callback.");
    t.done();
});

}

function SystemSettingManager_getProperty_successCallback_invalid_cb() {

//==== TEST: SystemSettingManager_getProperty_successCallback_invalid_cb
//==== LABEL Check if getProperty throws exception when success callback is invalid
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:SystemSetting:SystemSettingManager:getProperty M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/systemsetting.html
//==== TEST_CRITERIA MTCB
var t = async_test('SystemSettingManager_getProperty_successCallback_invalid_cb'),
    exceptionName = "TypeMismatchError", errorCallback, incorrectCallback;

t.step(function () {

    incorrectCallback = {
        onsuccess: t.step_func(function () {
            assert_unreached("Incorrect callback invoked.");
        })
    };

    errorCallback = t.step_func(function (error) {
        assert_unreached("ErrorCallback invoked: " + error.name + ": " + error.message);
    });

    assert_throws({name: exceptionName},
        function () {
            tizen.systemsetting.getProperty("HOME_SCREEN",
                incorrectCallback, errorCallback);
        }, exceptionName + " should be thrown - given incorrect success callback.");
    t.done();
});

}

var moduleName = "tct-systemsetting-tizen-tests";
add_test_case(moduleName, SystemSettingManager_getProperty_exist);
add_test_case(moduleName, SystemSettingManager_setProperty_exist);
add_test_case(moduleName, SystemSettingManager_extend);
add_test_case(moduleName, SystemSettingManager_getProperty_HOME_SCREEN);
add_test_case(moduleName, SystemSettingManager_getProperty_INCOMING_CALL);
add_test_case(moduleName, SystemSettingManager_getProperty_type_TypeMismatch);
add_test_case(moduleName, SystemSettingManager_getProperty_LOCK_SCREEN);
add_test_case(moduleName, SystemSettingManager_getProperty_no_errorCallback);
add_test_case(moduleName, SystemSettingManager_setProperty_HOME_SCREEN);
add_test_case(moduleName, SystemSettingManager_setProperty_INCOMING_CALL);
add_test_case(moduleName, SystemSettingManager_setProperty_errorCallback_invalid_cb);
add_test_case(moduleName, SystemSettingManager_setProperty_successCallback_invalid_cb);
add_test_case(moduleName, SystemSettingManager_setProperty_type_TypeMismatch);
add_test_case(moduleName, SystemSettingManager_setProperty_LOCK_SCREEN);
add_test_case(moduleName, SystemSettingManager_setProperty_no_errorCallback);
add_test_case(moduleName, SystemSettingManager_setProperty_NOTIFICATION_EMAIL);
add_test_case(moduleName, SystemSettingManager_notexist);
add_test_case(moduleName, SystemSettingObject_notexist);
add_test_case(moduleName, SystemSettingSuccessCallback_notexist);
add_test_case(moduleName, SystemSettingManager_getProperty_NOTIFICATION_EMAIL);
add_test_case(moduleName, SystemSettingManager_in_tizen);
add_test_case(moduleName, SystemSettingSuccessCallback_onsuccess);
add_test_case(moduleName, SystemSettingManager_setProperty_successCallback_TypeMismatch);
add_test_case(moduleName, SystemSettingManager_setProperty_missarg);
add_test_case(moduleName, SystemSettingManager_setProperty_errorCallback_TypeMismatch);
add_test_case(moduleName, SystemSettingManager_getProperty_missarg);
add_test_case(moduleName, SystemSettingManager_getProperty_successCallback_TypeMismatch);
add_test_case(moduleName, SystemSettingManager_getProperty_errorCallback_TypeMismatch);
add_test_case(moduleName, SystemSettingManager_getProperty_errorCallback_invalid_cb);
add_test_case(moduleName, SystemSettingManager_getProperty_successCallback_invalid_cb);
