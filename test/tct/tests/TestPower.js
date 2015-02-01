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

var TYPE_MISMATCH_ERR = 'TypeMismatchError';
var INVALID_VALUES_ERR = 'InvalidValuesError';
var NOT_SUPPORTED_ERR = 'NotSupportedError';
var NOT_FOUND_ERR = 'NotFoundError';

var PowerScreenStates = [ "SCREEN_OFF", "SCREEN_DIM", "SCREEN_NORMAL" ];


function PowerManager_turnScreenOn_method_exists() {
//==== TEST: PowerManager_turnScreenOn_method_exists
//==== LABEL Check if turnScreenOn method exists
//==== SPEC Tizen Web API:System:Power:PowerManager:turnScreenOn M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
var powerMgr;
test(function () {
    powerMgr = tizen.power;
    assert_true("turnScreenOn" in powerMgr, "turnScreenOn method sould be implemented");
}, 'PowerManager_turnScreenOn_method_exists');

}

function PowerManager_request_missarg() {
//==== TEST: PowerManager_request_missarg
//==== LABEL Check if request() method called without all obligatory arguments throws an exception
//==== SPEC Tizen Web API:System:Power:PowerManager:request M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request();
    });
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request("SCREEN");
    });
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request("CPU");
    });
}, 'PowerManager_request_missarg');

}

function PowerManagerObject_notexist() {
//==== TEST: PowerManagerObject_notexist
//==== LABEL Check if interface PowerManagerObject exists, it should not
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:Power:PowerManagerObject:PowerManagerObject U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("PowerManagerObject");
}, 'PowerManagerObject_notexist');

}

function PowerManager_notexist() {
//==== TEST: PowerManager_notexist
//==== LABEL Check if interface PowerManager exists, it should not
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:Power:PowerManager:PowerManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("PowerManager");
}, 'PowerManager_notexist');

}

function ScreenStateChangeCallback_notexist() {
//==== TEST: ScreenStateChangeCallback_notexist
//==== LABEL Check if interface ScreenStateChangeCallback exists, it should not
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:Power:ScreenStateChangeCallback:ScreenStateChangeCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("ScreenStateChangeCallback");
}, 'ScreenStateChangeCallback_notexist');

}

function PowerManager_extend() {

//==== TEST: PowerManager_extend
//==== LABEL Check if tizen.power can have new properties added, it should not
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:Power:PowerManager:PowerManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA OBX
test(function () {
    check_extensibility(tizen.power);
}, 'PowerManager_extend');

}

function PowerManager_in_tizen() {
//==== TEST: PowerManager_in_tizen
//==== LABEL Check if Tizen implements interface PowerManagerObject and has attribute power
//==== PRIORITY P3
//==== SPEC Tizen Web API:System:Power:PowerManager:PowerManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA OBME
test(function () {
    assert_own_property(tizen, "power", "Tizen should implement PowerManagerObject");
    assert_equals(typeof(tizen.power), "object", "tizen.power should be object");
}, 'PowerManager_in_tizen');

}

function PowerManager_request_exist() {
//==== TEST: PowerManager_request_exist
//==== LABEL Check if method request of PowerManager exists
//==== SPEC Tizen Web API:System:Power:PowerManager:request M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("request" in tizen.power, "No request method in tizen.power.");
    check_method_exists(tizen.power, "request");
}, 'PowerManager_request_exist');

}

function PowerManager_request_CPU_AWAKE() {
//==== TEST: PowerManager_request_CPU_AWAKE
//==== LABEL Check whether request() method with CPU resource and CPU_AWAKE state does not throw exception
//==== SPEC Tizen Web API:System:Power:PowerManager:request M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MMINA
test(function () {
        tizen.power.request("CPU", "CPU_AWAKE");
        tizen.power.release("CPU");
    }, 'PowerManager_request_CPU_AWAKE');

}

function PowerManager_request_SCREEN_DIM() {
//==== TEST: PowerManager_request_SCREEN_DIM
//==== LABEL Check whether request() method with SCREEN resource and SCREEN_DIM state does not throw exception
//==== SPEC Tizen Web API:System:Power:PowerManager:request M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MMINA
test(function () {
        tizen.power.request("SCREEN",  "SCREEN_DIM" );
        tizen.power.release("SCREEN");
    }, 'PowerManager_request_SCREEN_DIM');

}

function PowerManager_request_SCREEN_NORMAL() {
//==== TEST: PowerManager_request_SCREEN_NORMAL
//==== LABEL Check whether request() method with SCREEN resource and SCREEN_NORMAL state does not throw exception
//==== SPEC Tizen Web API:System:Power:PowerManager:request M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MMINA
test(function () {
        tizen.power.request("SCREEN", "SCREEN_NORMAL");
        tizen.power.release("SCREEN");
    }, 'PowerManager_request_SCREEN_NORMAL');

}

function PowerManager_request_resource_TypeMismatch() {
//==== TEST: PowerManager_request_resource_TypeMismatch
//==== LABEL Check if request() method throws TypeMismatchException when incorrect resource given
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:Power:PowerManager:request M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MC
var i;

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request(true, "SCREEN_NORMAL");
    });

    for (i = 0; i< PowerScreenStates.length; i++) {
        assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
            tizen.power.request(1, PowerScreenStates[i]);
        });
    }
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request(1, "CPU_AWAKE");
    });

    for (i = 0; i< PowerScreenStates.length; i++) {
        assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
            tizen.power.request(null, PowerScreenStates[i]);
        });
    }
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request(null, "CPU_AWAKE");
    });

    for (i = 0; i< PowerScreenStates.length; i++) {
        assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
            tizen.power.request(undefined, PowerScreenStates[i]);
        });
    }
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request(undefined, "CPU_AWAKE");
    });

}, 'PowerManager_request_resource_TypeMismatch');

}

function PowerManager_request_state_TypeMismatch() {
//==== TEST: PowerManager_request_state_TypeMismatch
//==== LABEL Check if request() method throws TypeMismatchException when incorrect state given
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:Power:PowerManager:request M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MC
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request(true, "SCREEN_NORMAL");
    });

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request("SCREEN", 1);
    });
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request("CPU", 1);
    });

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request("SCREEN", null);
    });
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request("CPU", null);
    });

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request("SCREEN", undefined);
    });
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.request("CPU", undefined);
    });

}, 'PowerManager_request_state_TypeMismatch');

}

function PowerManager_release() {
//==== TEST: PowerManager_release
//==== LABEL Check if release() method called with proper argument does not throw exceptions
//==== SPEC Tizen Web API:System:Power:PowerManager:release M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MMINA MR
var ret1Value = null, ret2Value = null;

test(function () {
        ret1Value = tizen.power.release("SCREEN");
        ret2Value = tizen.power.release("CPU");

        assert_equals(ret1Value, undefined, "release returns wrong value");
        assert_equals(ret2Value, undefined, "release returns wrong value");
    }, 'PowerManager_release');

}

function PowerManager_release_exist() {
//==== TEST: PowerManager_release_exist
//==== LABEL Check if method release of PowerManager exists
//==== SPEC Tizen Web API:System:Power:PowerManager:release M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("request" in tizen.power, "No release method in tizen.power.");
    check_method_exists(tizen.power, "request");
}, 'PowerManager_release_exist');

}

function PowerManager_release_missarg() {
//==== TEST: PowerManager_release_missarg
//==== LABEL Check if release() method called without all obligatory arguments throws an exception
//==== SPEC Tizen Web API:System:Power:PowerManager:release M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.release();
    });
}, 'PowerManager_release_missarg');

}

function PowerManager_release_resource_TypeMismatch() {
//==== TEST: PowerManager_release_resource_TypeMismatch
//==== LABEL Check if release() method throws TypeMismatchException when incorrect resource given
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:Power:PowerManager:release M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MC
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.release(true);
    });

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.release(1);
    });

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.release(null);
    });

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.release(undefined);
    });
}, 'PowerManager_release_resource_TypeMismatch');

}

function PowerManager_getScreenBrightness() {
//==== TEST: PowerManager_getScreenBrightness
//==== LABEL Check if getScreenBrightness method called with non-optional arguments does what it should
//==== SPEC Tizen Web API:System:Power:PowerManager:getScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var retVal = tizen.power.getScreenBrightness();
    assert_type(retVal, "double", "Method getScreenBrightness returns wrong type");
    assert_true(retVal <= 1 && retVal >= 0, "brigthness should be in range from 0 to 1, but was: " + retVal);
}, 'PowerManager_getScreenBrightness');

}

function PowerManager_getScreenBrightness_exist() {
//==== TEST: PowerManager_getScreenBrightness_exist
//==== LABEL Check if getScreenBrightness exists
//==== SPEC Tizen Web API:System:Power:PowerManager:getScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("getScreenBrightness" in tizen.power, "getScreenBrightness method sould be implemented");
    check_method_exists(tizen.power, "getScreenBrightness");
}, 'PowerManager_getScreenBrightness_exist');

}

function PowerManager_getScreenBrightness_extra_argument() {
//==== TEST: PowerManager_getScreenBrightness_extra_argument
//==== LABEL Check if getScreenBrightness method can be invoked with extra argument
//==== SPEC Tizen Web API:System:Power:PowerManager:getScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.power, "getScreenBrightness");
}, 'PowerManager_getScreenBrightness_extra_argument');

}

function PowerManager_isScreenOn() {
//==== TEST: PowerManager_isScreenOn
//==== LABEL Check if isScreenOn method called with non-optional arguments does what it should
//==== SPEC Tizen Web API:System:Power:PowerManager:isScreenOn M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var retVal = tizen.power.isScreenOn();
    assert_type(retVal, "boolean", "Method isScreenOn returns wrong type");
}, 'PowerManager_isScreenOn');

}

function PowerManager_isScreenOn_exist() {
//==== TEST: PowerManager_isScreenOn_exist
//==== LABEL Check if isScreenOn exists
//==== SPEC Tizen Web API:System:Power:PowerManager:isScreenOn M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("isScreenOn" in tizen.power, "isScreenOn method sould be implemented");
    check_method_exists(tizen.power, "isScreenOn");
}, 'PowerManager_isScreenOn_exist');

}

function PowerManager_isScreenOn_extra_argument() {
//==== TEST: PowerManager_isScreenOn_extra_argument
//==== LABEL Check if isScreenOn method can be invoked with extra argument
//==== SPEC Tizen Web API:System:Power:PowerManager:isScreenOn M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.power, "isScreenOn");
}, 'PowerManager_isScreenOn_extra_argument');

}

function PowerManager_restoreScreenBrightness() {
//==== TEST: PowerManager_restoreScreenBrightness
//==== LABEL Check if restoreScreenBrightness method called with non-optional arguments does what it should
//==== SPEC Tizen Web API:System:Power:PowerManager:restoreScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var retVal = tizen.power.restoreScreenBrightness();
    assert_equals(retVal, undefined, "method should return nothing");
}, 'PowerManager_restoreScreenBrightness');

}

function PowerManager_restoreScreenBrightness_exist() {
//==== TEST: PowerManager_restoreScreenBrightness_exist
//==== LABEL Check if restoreScreenBrightness exists
//==== SPEC Tizen Web API:System:Power:PowerManager:restoreScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("restoreScreenBrightness" in tizen.power, "restoreScreenBrightness method sould be implemented");
    check_method_exists(tizen.power, "restoreScreenBrightness");
}, 'PowerManager_restoreScreenBrightness_exist');

}

function PowerManager_restoreScreenBrightness_extra_argument() {
//==== TEST: PowerManager_restoreScreenBrightness_extra_argument
//==== LABEL Check if restoreScreenBrightness method can be invoked with extra argument
//==== SPEC Tizen Web API:System:Power:PowerManager:restoreScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.power, "restoreScreenBrightness");
}, 'PowerManager_restoreScreenBrightness_extra_argument');

}

function PowerManager_setScreenBrightness() {
//==== TEST: PowerManager_setScreenBrightness
//==== LABEL Check if setScreenBrightness method called with non-optional arguments does what it should
//==== SPEC Tizen Web API:System:Power:PowerManager:setScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MMINA MAST MR
var initialValue, defaultValue, currentValue, returnedValue;

test(function () {
    add_result_callback(function () {
        try {
            tizen.power.setScreenBrightness(initialValue);
        } catch (err) {
            // do nothing in case setScreenBrightness throw an exception
        }
    });

    initialValue = tizen.power.getScreenBrightness();

    tizen.power.restoreScreenBrightness();

    defaultValue = tizen.power.getScreenBrightness();

    if (defaultValue > 0.5) {
        tizen.power.setScreenBrightness(0);
    } else {
        tizen.power.setScreenBrightness(1);
    }

    currentValue = tizen.power.getScreenBrightness();
    assert_not_equals(currentValue, defaultValue, "screen brightness was not changed");

    returnedValue = tizen.power.setScreenBrightness(defaultValue);
    assert_equals(returnedValue, undefined, "incorrect value returned");

    currentValue = tizen.power.getScreenBrightness();

    assert_equals(currentValue, defaultValue, "screen brightness was not changed");
}, 'PowerManager_setScreenBrightness');

}

function PowerManager_setScreenBrightness_brightness_TypeMismatch() {
//==== TEST: PowerManager_setScreenBrightness_brightness_TypeMismatch
//==== LABEL Check if setScreenBrightness throws exception when brightness is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:Power:PowerManager:setScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MC
test(function () {
    var conversionTable, brightness, exceptionName, i;

    conversionTable = getTypeConversionExceptions("double", false);

    for(i = 0; i < conversionTable.length; i++) {
        brightness = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.power.setScreenBrightness(brightness);
            }, exceptionName + " should be thrown.");
    }
}, 'PowerManager_setScreenBrightness_brightness_TypeMismatch');

}

function PowerManager_setScreenBrightness_exist() {
//==== TEST: PowerManager_setScreenBrightness_exist
//==== LABEL Check if setScreenBrightness exists
//==== SPEC Tizen Web API:System:Power:PowerManager:setScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("setScreenBrightness" in tizen.power, "setScreenBrightness method sould be implemented");
    check_method_exists(tizen.power, "setScreenBrightness");
}, 'PowerManager_setScreenBrightness_exist');

}

function PowerManager_setScreenBrightness_missarg() {
//==== TEST: PowerManager_setScreenBrightness_missarg
//==== LABEL Check if setScreenBrightness method called with missing non-optional argument throws an exception
//==== SPEC Tizen Web API:System:Power:PowerManager:setScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.setScreenBrightness();
    }, "Method should throw an exception");
}, 'PowerManager_setScreenBrightness_missarg');

}

function PowerManager_setScreenStateChangeListener() {
//==== TEST: PowerManager_setScreenStateChangeListener
//==== LABEL Check if setScreenStateChangeListener method called with non-optional arguments does what it should
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:Power:PowerManager:setScreenStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MMINA MAST MR
setup({timeout: 90000});

var t = async_test('PowerManager_setScreenStateChangeListener', {timeout: 90000}), changeCallback, retValue = null;

t.step(function () {
    changeCallback = t.step_func(function (previousState, changedState) {
        assert_not_equals(previousState, changedState, "Screen States should be different.");
        assert_equals(retValue, undefined, "setScreenStateChangeListener returns wrong value");
        t.done();
    });

    retValue = tizen.power.setScreenStateChangeListener(changeCallback);

    if (tizen.power.isScreenOn()) {
        tizen.power.turnScreenOff();
    } else {
        tizen.power.turnScreenOn();
    }
});

}

function PowerManager_setScreenStateChangeListener_exist() {
//==== TEST: PowerManager_setScreenStateChangeListener_exist
//==== LABEL Check if setScreenStateChangeListener exists
//==== SPEC Tizen Web API:System:Power:PowerManager:setScreenStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("setScreenStateChangeListener" in tizen.power, "setScreenStateChangeListener method sould be implemented");
    check_method_exists(tizen.power, "setScreenStateChangeListener");
}, 'PowerManager_setScreenStateChangeListener_exist');

}

function PowerManager_setScreenStateChangeListener_listener_TypeMismatch() {
//==== TEST: PowerManager_setScreenStateChangeListener_listener_TypeMismatch
//==== LABEL Check if setScreenStateChangeListener throws exception when listener is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:System:Power:PowerManager:setScreenStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MC
test(function () {
    var conversionTable, changeCallback, exceptionName, i;

    conversionTable = getTypeConversionExceptions("functionObject", false);

    for(i = 0; i < conversionTable.length; i++) {
        changeCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.power.setScreenStateChangeListener(changeCallback);
            }, exceptionName + " should be thrown.");
    }
}, 'PowerManager_setScreenStateChangeListener_listener_TypeMismatch');

}

function PowerManager_setScreenStateChangeListener_listener_invalid_cb() {
//==== TEST: PowerManager_setScreenStateChangeListener_listener_invalid_cb
//==== LABEL Check if setScreenStateChangeListener throws exception when success callback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:Power:PowerManager:setScreenStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MTCB
setup({timeout: 90000});

var t = async_test('PowerManager_setScreenStateChangeListener_listener_invalid_cb', {timeout: 90000}),
    exceptionName = "TypeMismatchError", incorrectCallback;

t.step(function () {
    incorrectCallback = {
        onchanged: t.step_func(function () {
            assert_unreached("Invalid listener invoked.");
        })
    };

    assert_throws({name: exceptionName},
        function () {
            tizen.power.setScreenStateChangeListener(incorrectCallback);
        }, exceptionName + " should be thrown - given incorrect success callback.");

    t.done();
});

}

function PowerManager_setScreenStateChangeListener_missarg() {
//==== TEST: PowerManager_setScreenStateChangeListener_missarg
//==== LABEL Check if setScreenStateChangeListener method called with missing non-optional argument throws an exception
//==== SPEC Tizen Web API:System:Power:PowerManager:setScreenStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.power.setScreenStateChangeListener();
    }, "Method should throw an exception");
}, 'PowerManager_setScreenStateChangeListener_missarg');

}

function PowerManager_turnScreenOff() {
//==== TEST: PowerManager_turnScreenOff
//==== LABEL Check if turnScreenOff method called with non-optional arguments does what it should
//==== SPEC Tizen Web API:System:Power:PowerManager:turnScreenOff M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var retVal = tizen.power.turnScreenOff();
    assert_equals(retVal, undefined, "method should return nothing");
}, 'PowerManager_turnScreenOff');

}

function PowerManager_turnScreenOff_exist() {
//==== TEST: PowerManager_turnScreenOff_exist
//==== LABEL Check if turnScreenOff exists
//==== SPEC Tizen Web API:System:Power:PowerManager:turnScreenOff M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("turnScreenOff" in tizen.power, "turnScreenOff method sould be implemented");
    check_method_exists(tizen.power, "turnScreenOff");
}, 'PowerManager_turnScreenOff_exist');

}

function PowerManager_turnScreenOff_extra_argument() {
//==== TEST: PowerManager_turnScreenOff_extra_argument
//==== LABEL Check if turnScreenOff method can be invoked with extra argument
//==== SPEC Tizen Web API:System:Power:PowerManager:turnScreenOff M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.power, "turnScreenOff");
}, 'PowerManager_turnScreenOff_extra_argument');

}

function PowerManager_turnScreenOn() {
//==== TEST: PowerManager_turnScreenOn
//==== LABEL Check if turnScreenOn method called with non-optional arguments does what it should
//==== SPEC Tizen Web API:System:Power:PowerManager:turnScreenOn M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var retVal = tizen.power.turnScreenOn();
    assert_equals(retVal, undefined, "method should return nothing");
}, 'PowerManager_turnScreenOn');

}

function PowerManager_turnScreenOn_exist() {
//==== TEST: PowerManager_turnScreenOn_exist
//==== LABEL Check if turnScreenOn exists
//==== SPEC Tizen Web API:System:Power:PowerManager:turnScreenOn M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("turnScreenOn" in tizen.power, "turnScreenOn method sould be implemented");
    check_method_exists(tizen.power, "turnScreenOn");
}, 'PowerManager_turnScreenOn_exist');

}

function PowerManager_turnScreenOn_extra_argument() {
//==== TEST: PowerManager_turnScreenOn_extra_argument
//==== LABEL Check if turnScreenOn method can be invoked with extra argument
//==== SPEC Tizen Web API:System:Power:PowerManager:turnScreenOn M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.power, "turnScreenOn");
}, 'PowerManager_turnScreenOn_extra_argument');

}

function PowerManager_unsetScreenStateChangeListener() {
//==== TEST: PowerManager_unsetScreenStateChangeListener
//==== LABEL Check if unsetScreenStateChangeListener method called with non-optional arguments does what it should
//==== SPEC Tizen Web API:System:Power:PowerManager:unsetScreenStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var retVal = tizen.power.unsetScreenStateChangeListener();
    assert_equals(retVal, undefined, "unsetScreenStateChangeListener should not return anything");
}, 'PowerManager_unsetScreenStateChangeListener');

}

function PowerManager_unsetScreenStateChangeListener_exist() {
//==== TEST: PowerManager_unsetScreenStateChangeListener_exist
//==== LABEL Check if unsetScreenStateChangeListener exists
//==== SPEC Tizen Web API:System:Power:PowerManager:unsetScreenStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("unsetScreenStateChangeListener" in tizen.power, "unsetScreenStateChangeListener method sould be implemented");
    check_method_exists(tizen.power, "unsetScreenStateChangeListener");
}, 'PowerManager_unsetScreenStateChangeListener_exist');

}

function PowerManager_unsetScreenStateChangeListener_extra_argument() {
//==== TEST: PowerManager_unsetScreenStateChangeListener_extra_argument
//==== LABEL Check if unsetScreenStateChangeListener method can be invoked with extra argument
//==== SPEC Tizen Web API:System:Power:PowerManager:unsetScreenStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.power, "unsetScreenStateChangeListener");
}, 'PowerManager_unsetScreenStateChangeListener_extra_argument');

}

function ScreenStateChangeCallback_onchanged() {
//==== TEST: ScreenStateChangeCallback_onchanged
//==== LABEL Check if ContentScanSuccessCallback onchanged is called and if its arguments have proper type
//==== ONLOAD_DELAY 90
//==== SPEC Tizen Web API:System:Power:ScreenStateChangeCallback:onchanged M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 90000});

var t = async_test('ScreenStateChangeCallback_onchanged', {timeout: 90000}), changeCallback;

t.step(function () {
    changeCallback = t.step_func(function (previousState, changedState) {
        assert_type(previousState, "string", "previousState has wrong type");
        assert_type(changedState, "string", "changedState has wrong type");
        assert_in_array( previousState, PowerScreenStates, "previousState isn't type of PowerScreenState" );
        assert_in_array( changedState, PowerScreenStates, "changedState isn't type of PowerScreenState" );
        assert_not_equals(previousState, changedState, "states should be different");

        t.done();
    });

    tizen.power.setScreenStateChangeListener(changeCallback);

    if(tizen.power.isScreenOn()) {
        tizen.power.turnScreenOff();
    } else {
        tizen.power.turnScreenOn();
    }
});

}

function PowerManager_setScreenBrightness_brightness_invalid_val() {

//==== TEST: PowerManager_setScreenBrightness_brightness_invalid_val
//==== LABEL Check if setScreenBrightness() method doesn't set out of range screen brightness
//==== SPEC Tizen Web API:System:Power:PowerManager:setScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== PRIORITY P2
//==== TEST_CRITERIA
test(function () {
    var exceptionName = "InvalidValuesError";

    assert_throws({name: exceptionName},
        function () {
            tizen.power.setScreenBrightness(1.5);
        }, "exception should be thrown");
    assert_not_equals(tizen.power.getScreenBrightness(), 1.5, "check if screen brightness was set out of range");

    assert_throws({name: exceptionName},
        function () {
            tizen.power.setScreenBrightness(-1);
        }, "exception should be thrown");
    assert_not_equals(tizen.power.getScreenBrightness(), -1, "check if screen brightness was set out of range");

}, 'PowerManager_setScreenBrightness_brightness_invalid_val');

}

function PowerManager_getScreenBrightness_check_change() {

//==== TEST: PowerManager_getScreenBrightness_check_change
//==== LABEL Check whether getScreenBrightness() method gets the screen brightness level correctly
//==== SPEC Tizen Web API:System:Power:PowerManager:getScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== PRIORITY P1
//==== TEST_CRITERIA MNA
var initialValue, defaultValue, currentValue;

test(function () {
    add_result_callback(function () {
        try {
            tizen.power.setScreenBrightness(initialValue);
        } catch (err) {
            // do nothing in case removeChangeListener throw an exception
        }
    });

    initialValue = tizen.power.getScreenBrightness();

    tizen.power.restoreScreenBrightness();

    defaultValue = tizen.power.getScreenBrightness();

    if (defaultValue > 0.5) {
        tizen.power.setScreenBrightness(0);
    } else {
        tizen.power.setScreenBrightness(1);
    }

    currentValue = tizen.power.getScreenBrightness();
    assert_not_equals(currentValue, defaultValue, "screen brightness was not changed");
}, 'PowerManager_getScreenBrightness_check_change');

}

function PowerManager_isScreenOn_check_change() {

//==== TEST: PowerManager_isScreenOn_check_change
//==== LABEL Check whether isScreenOn() method gets the screen state correctly
//==== SPEC Tizen Web API:System:Power:PowerManager:isScreenOn M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== PRIORITY P1
//==== TEST_CRITERIA MNA MR
test(function () {
    var isScreenOn;

    tizen.power.turnScreenOn();
    isScreenOn = tizen.power.isScreenOn();
    assert_type(isScreenOn, "boolean", "isScreenOn() return type check");
    assert_true(isScreenOn, "Check if screen is on");

    tizen.power.turnScreenOff();
    isScreenOn = tizen.power.isScreenOn();
    assert_type(isScreenOn, "boolean", "isScreenOn() return type check");
    assert_false(isScreenOn, "Check if screen is off");
}, 'PowerManager_isScreenOn_check_change');

}

function PowerManager_turnScreenOff_successful() {
//==== TEST: PowerManager_turnScreenOff_successful
//==== LABEL Check if turnScreenOff method works correctly
//==== EXECUTION_TYPE manual
//==== STEP Click 'Run'
//==== EXPECT The screen should be turned off
//==== STEP Unlock the screen and display the test application
//==== EXPECT The result should be 'Pass'
//==== SPEC Tizen Web API:System:Power:PowerManager:turnScreenOff M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNA MNAST
var powerMgr = tizen.power, isScreenOn;

test(function () {
    powerMgr.turnScreenOn();
    powerMgr.turnScreenOff();

    isScreenOn = powerMgr.isScreenOn();
    assert_false(isScreenOn, "The screen should be turned off.");

}, 'PowerManager_turnScreenOff_successful');

}

function PowerManager_turnScreenOn_successful() {
//==== TEST: PowerManager_turnScreenOn_successful
//==== LABEL Check if turnScreenOn method works correctly
//==== EXECUTION_TYPE manual
//==== STEP Click 'Run'
//==== EXPECT The screen should be turned locked
//==== STEP Unlock the screen and display the test application
//==== EXPECT The result should be 'Pass'
//==== SPEC Tizen Web API:System:Power:PowerManager:turnScreenOn M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNA MNAST
setup({timeout: 90000});

var t = async_test('PowerManager_turnScreenOn_successful', {timeout: 90000}), isScreenOn = tizen.power.isScreenOn();
t.step(function () {
    tizen.power.turnScreenOff();
    tizen.power.turnScreenOn();
    setTimeout(t.step_func(function () {
        assert_true(isScreenOn, "The screen should be turned on");
        t.done();
    }), 500);
});

}

function PowerManager_unsetScreenStateChangeListener_successful() {
//==== TEST: PowerManager_unsetScreenStateChangeListener_successful
//==== LABEL Check if unsetScreenStateChangeListener method works correctly
//==== EXECUTION_TYPE manual
//==== STEP the test application will turn off and on screen
//==== EXPECT (None)
//==== STEP Click 'Run', do not touch the screen, wait until the screen is on
//==== EXPECT The screen should be off
//==== STEP the test applicationturn on the screen 
//==== EXPECT The result should be 'Pass'
//==== SPEC Tizen Web API:System:Power:PowerManager:unsetScreenStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== TEST_CRITERIA MNA MNAST
setup({timeout: 90000});

var t = async_test('PowerManager_unsetScreenStateChangeListener_successful', {timeout: 90000}), changeDetected = false;
t.step(function () {
    function onScreenStateChanged(previousState, changedState) {
        t.step(function () {
            changeDetected = true;
            assert_unreached("OnScreenStateChanged callback shouldn't " +
                "be invoked!");
        });
    }

    tizen.power.release("SCREEN");
    tizen.power.release("CPU");
    tizen.power.setScreenStateChangeListener(onScreenStateChanged);
    tizen.power.unsetScreenStateChangeListener();
    tizen.power.turnScreenOff();
    
    setTimeout(function () {
        t.step(function () {
            assert_false(changeDetected, "screen state change shouldn't be " +
                "detected.");
            tizen.power.turnScreenOn();
            t.done();
        })}, 5000);

});

}

function PowerManager_restoreScreenBrightness_check_effect() {

//==== TEST: PowerManager_restoreScreenBrightness_check_effect
//==== LABEL Check if restoreScreenBrightness() method restores the screen brightness to the system default setting value
//==== SPEC Tizen Web API:System:Power:PowerManager:restoreScreenBrightness M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/power.html
//==== STEP Check if restoreScreenBrightness method called with non-optional arguments does what it should
//==== EXPECT method does what it should to do
//==== EXECUTION_TYPE manual
//==== PRIORITY P1
//==== TEST_CRITERIA MNA MNAST
var initialValue, defaultValue, currentValue, restoredValue;

test(function () {
    add_result_callback(function () {
        try {
            tizen.power.setScreenBrightness(initialValue);
        } catch (err) {
            // do nothing in case removeChangeListener throw an exception
        }
    });

    initialValue = tizen.power.getScreenBrightness();

    tizen.power.restoreScreenBrightness();

    defaultValue = tizen.power.getScreenBrightness();

    if (defaultValue > 0.5) {
        tizen.power.setScreenBrightness(0);
    } else {
        tizen.power.setScreenBrightness(1);
    }

    currentValue = tizen.power.getScreenBrightness();
    assert_not_equals(currentValue, defaultValue, "screen brightness was not changed");

    tizen.power.restoreScreenBrightness();

    restoredValue = tizen.power.getScreenBrightness();
    assert_equals(restoredValue, defaultValue, "screen brightness was not restored");
}, 'PowerManager_restoreScreenBrightness_check_effect');

}

var moduleName = "tct-power-tizen-tests";
add_test_case(moduleName, PowerManager_turnScreenOn_method_exists);
add_test_case(moduleName, PowerManager_request_missarg);
add_test_case(moduleName, PowerManagerObject_notexist);
add_test_case(moduleName, PowerManager_notexist);
add_test_case(moduleName, ScreenStateChangeCallback_notexist);
add_test_case(moduleName, PowerManager_extend);
add_test_case(moduleName, PowerManager_in_tizen);
add_test_case(moduleName, PowerManager_request_exist);
add_test_case(moduleName, PowerManager_request_CPU_AWAKE);
add_test_case(moduleName, PowerManager_request_SCREEN_DIM);
add_test_case(moduleName, PowerManager_request_SCREEN_NORMAL);
add_test_case(moduleName, PowerManager_request_resource_TypeMismatch);
add_test_case(moduleName, PowerManager_request_state_TypeMismatch);
add_test_case(moduleName, PowerManager_release);
add_test_case(moduleName, PowerManager_release_exist);
add_test_case(moduleName, PowerManager_release_missarg);
add_test_case(moduleName, PowerManager_release_resource_TypeMismatch);
add_test_case(moduleName, PowerManager_getScreenBrightness);
add_test_case(moduleName, PowerManager_getScreenBrightness_exist);
add_test_case(moduleName, PowerManager_getScreenBrightness_extra_argument);
add_test_case(moduleName, PowerManager_isScreenOn);
add_test_case(moduleName, PowerManager_isScreenOn_exist);
add_test_case(moduleName, PowerManager_isScreenOn_extra_argument);
add_test_case(moduleName, PowerManager_restoreScreenBrightness);
add_test_case(moduleName, PowerManager_restoreScreenBrightness_exist);
add_test_case(moduleName, PowerManager_restoreScreenBrightness_extra_argument);
add_test_case(moduleName, PowerManager_setScreenBrightness);
add_test_case(moduleName, PowerManager_setScreenBrightness_brightness_TypeMismatch);
add_test_case(moduleName, PowerManager_setScreenBrightness_exist);
add_test_case(moduleName, PowerManager_setScreenBrightness_missarg);
add_test_case(moduleName, PowerManager_setScreenStateChangeListener);
add_test_case(moduleName, PowerManager_setScreenStateChangeListener_exist);
add_test_case(moduleName, PowerManager_setScreenStateChangeListener_listener_TypeMismatch);
add_test_case(moduleName, PowerManager_setScreenStateChangeListener_listener_invalid_cb);
add_test_case(moduleName, PowerManager_setScreenStateChangeListener_missarg);
add_test_case(moduleName, PowerManager_turnScreenOff);
add_test_case(moduleName, PowerManager_turnScreenOff_exist);
add_test_case(moduleName, PowerManager_turnScreenOff_extra_argument);
add_test_case(moduleName, PowerManager_turnScreenOn);
add_test_case(moduleName, PowerManager_turnScreenOn_exist);
add_test_case(moduleName, PowerManager_turnScreenOn_extra_argument);
add_test_case(moduleName, PowerManager_unsetScreenStateChangeListener);
add_test_case(moduleName, PowerManager_unsetScreenStateChangeListener_exist);
add_test_case(moduleName, PowerManager_unsetScreenStateChangeListener_extra_argument);
add_test_case(moduleName, ScreenStateChangeCallback_onchanged);
add_test_case(moduleName, PowerManager_setScreenBrightness_brightness_invalid_val);
add_test_case(moduleName, PowerManager_getScreenBrightness_check_change);
add_test_case(moduleName, PowerManager_isScreenOn_check_change);
add_test_case(moduleName, PowerManager_turnScreenOff_successful);
add_test_case(moduleName, PowerManager_turnScreenOn_successful);
add_test_case(moduleName, PowerManager_unsetScreenStateChangeListener_successful);
add_test_case(moduleName, PowerManager_restoreScreenBrightness_check_effect);
