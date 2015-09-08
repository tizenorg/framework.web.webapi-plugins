/*

Copyright (c) 2014 Samsung Electronics Co., Ltd.

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

SERVICE_NOT_AVAILABLE_ERR = "ServiceNotAvailableError";
NOT_SUPPORTED_EXCEPTION = "NotSupportedError";

var PEDOMETER_STEP_STATUS = [
    "NOT_MOVING", "WALKING", "RUNNING"
];


function check_humanactivitymonitor_pedometer_info(pedometer_info) {
    check_readonly(pedometer_info, "stepStatus", pedometer_info.stepStatus, "string", "dummyValue");
    assert_in_array(pedometer_info.stepStatus, PEDOMETER_STEP_STATUS, "stepStatus has wrong enum value");
    check_readonly(pedometer_info, "speed", pedometer_info.speed, "double", 0.1);
    check_readonly(pedometer_info, "walkingFrequency", pedometer_info.walkingFrequency, "double", 0.1);
    check_readonly(pedometer_info, "cumulativeDistance", pedometer_info.cumulativeDistance, "double", 0.1);
    check_readonly(pedometer_info, "cumulativeCalorie", pedometer_info.cumulativeCalorie, "double", 0.1);
    check_readonly(pedometer_info, "cumulativeTotalStepCount", pedometer_info.cumulativeTotalStepCount, "double", 0.1);
    check_readonly(pedometer_info, "cumulativeWalkStepCount", pedometer_info.cumulativeWalkStepCount, "double", 0.1);
    check_readonly(pedometer_info, "cumulativeRunStepCount", pedometer_info.cumulativeRunStepCount, "double", 0.1);
}

function check_humanactivitymonitor_wrist_up_info(wrist_up_info) {
    assert_equals(wrist_up_info, null, "wrist_up_info should be null");
}

function check_humanactivitymonitor_hrm_info(hrm_info) {
    check_readonly(hrm_info, "heartRate", hrm_info.heartRate, "long", -1);
    check_readonly(hrm_info, "rRInterval", hrm_info.rRInterval, "long", -1);
}

function check_err_name() {
    assert_equal
}


function HumanActivityMonitorManagerObject_notexist() {
//==== TEST: HumanActivityMonitorManagerObject_notexist
//==== LABEL Check if HumanActivityMonitorManagerObject notexist
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    check_no_interface_object('HumanActivityMonitorManagerObject');
}, 'HumanActivityMonitorManagerObject_notexist');
}

function HumanActivityMonitorManager_notexist() {
//==== TEST: HumanActivityMonitorManager_notexist
//==== LABEL Check if HumanActivityMonitorManager notexist
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    check_no_interface_object("HumanActivityMonitorManager");
}, 'HumanActivityMonitorManager_notexist');
}

function HumanActivityMonitorManager_in_tizen() {
//==== TEST: HumanActivityMonitorManager_in_tizen
//==== LABEL Check if HumanActivityMonitorManager exists in tizen
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    assert_true("humanactivitymonitor" in tizen, "tizen should implement HumanActivityMonitorManager.");
    assert_equals(typeof(tizen.humanactivitymonitor), "object", "tizen.humanactivitymonitor should be object.");
    check_readonly(tizen, "humanactivitymonitor", tizen.humanactivitymonitor, "object", "dummyValue");
}, 'HumanActivityMonitorManager_in_tizen');
}

function HumanActivityMonitorManagerObject_extend() {
//==== TEST: HumanActivityMonitorManagerObject_extend
//==== LABEL Check if instance of interface HumanActivityMonitorManagerObject can be extended with new property
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    check_extensibility(tizen.humanactivitymonitor);
}, 'HumanActivityMonitorManagerObject_extend');

}

function HumanActivityMonitorManagerObject_start_type_PEDOMETER() {
//==== TEST: HumanActivityMonitorManagerObject_start_type_PEDOMETER
//==== LABEL Check if method start for pedometer returns properly value
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    var returnedValue = null, activityType = "PEDOMETER";
    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value from start method");
        tizen.humanactivitymonitor.stop(activityType);
    } catch (e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            //do nothing here
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }
}, 'HumanActivityMonitorManagerObject_start_type_PEDOMETER');

}

function HumanActivityMonitorManagerObject_start_type_WRIST_UP() {
//==== TEST: HumanActivityMonitorManagerObject_start_type_WRIST_UP
//==== LABEL Check if method start for wrist-up returns properly value
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    var returnedValue = null, activityType = "WRIST_UP";
    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value from start method");

        tizen.humanactivitymonitor.stop(activityType);
    } catch (e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            //do nothing here
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }
}, 'HumanActivityMonitorManagerObject_start_type_WRIST_UP');

}

function HumanActivityMonitorManagerObject_start_type_HRM() {
//==== TEST: HumanActivityMonitorManagerObject_start_type_HRM
//==== LABEL Check if method start for HRM returns properly value
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    var returnedValue = null, activityType = "HRM";
    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value from start method");
        
        tizen.humanactivitymonitor.stop(activityType);
    } catch (e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            //do nothing here
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }
}, 'HumanActivityMonitorManagerObject_start_type_HRM');

}

function HumanActivityMonitorManagerObject_start_misarg() {
//==== TEST: HumanActivityMonitorManagerObject_start_misarg
//==== LABEL Check if start throws exception when arguments are missing
//==== SPEC 
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.humanactivitymonitor.start();
    });
}, 'HumanActivityMonitorManagerObject_start_misarg');

}

function HumanActivityMonitorManagerObject_start_exist() {
//==== TEST: HumanActivityMonitorManagerObject_start_exist
//==== LABEL Check if method start of PackageManager exists
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    assert_true("start" in tizen.humanactivitymonitor, "No start method in tizen.humanactivitymonitor");
    check_method_exists(tizen.humanactivitymonitor, "start");
}, 'HumanActivityMonitorManagerObject_start_exist');

}

function HumanActivityMonitorManagerObject_start_type_TypeMismatch() {
//==== TEST: HumanActivityMonitorManagerObject_start_type_TypeMismatch
//==== LABEL Check if start throws exception when type is incorrect
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout:90000});

var t = async_test('HumanActivityMonitorManagerObject_start_type_TypeMismatch',
    {timeout: 90000}), successCallback, conversionTable, exceptionName, activityType, i;

t.step(function () {
    successCallback = t.step_func(function (motionInfo) {
	    assert_unreached("Should not be here.");
    });

    conversionTable = getTypeConversionExceptions("enum", false);

    for(i = 0; i < conversionTable.length; i++) {
        activityType = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name : exceptionName}, function () {
            tizen.humanactivitymonitor.start(activityType, successCallback);
        }, exceptionName + " should be thrown - given incorrect activityType.");
    }

    t.done();
});

}

function HumanActivityMonitorManagerObject_start_HumanActivityMonitorSuccessCallback_invalid_cb() {
//==== TEST: HumanActivityMonitorManagerObject_start_HumanActivityMonitorSuccessCallback_invalid_cb
//==== LABEL Check if start throws exception when successCallback is invalid
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_start_HumanActivityMonitorSuccessCallback_invalid_cb',
    {timeout: 90000}), invalidCallback, activityType = "PEDOMETER";

t.step(function () {
    invalidCallback = {
        onsuccess: t.step_func(function (motionInfo) {
            assert_unreached("Invalid success callback invoked");
        })
    };

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.humanactivitymonitor.start(activityType, invalidCallback);
    });

    t.done();
});

}

function HumanActivityMonitorManagerObject_start_HumanActivityMonitorSuccessCallback_TypeMismatch() {
//==== TEST: HumanActivityMonitorManagerObject_start_HumanActivityMonitorSuccessCallback_TypeMismatch
//==== LABEL Check if start throws exception when successCallback is incorrect
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_start_HumanActivityMonitorSuccessCallback_TypeMismatch',
    {timeout: 90000}), successCallback, conversionTable, i, activityType = "PEDOMETER";

t.step(function () {

    conversionTable = getTypeConversionExceptions("functionObject", true);

    for(i = 0; i < conversionTable.length; i++) {
        successCallback  = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.humanactivitymonitor.start(activityType, successCallback);
            }, exceptionName + " should be thrown - given incorrect successCallback: " + successCallback + ".");
    }

    t.done();
});

}

function HumanActivityMonitorSuccessCallback_notexist() {
//==== TEST: HumanActivityMonitorSuccessCallback_notexist
//==== LABEL Check if HumanActivityMonitorSuccessCallback notexist
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    check_no_interface_object("HumanActivityMonitorSuccessCallback");
}, 'HumanActivityMonitorSuccessCallback_notexist');

}

function HumanActivityMonitorSuccessCallback_onsuccess() {
//==== TEST: HumanActivityMonitorSuccessCallback_onsuccess
//==== LABEL Check if HumanActivityMonitorSuccessCallback.onsuccess works properly
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorSuccessCallback_onsuccess',
    {timeout: 90000}), successCallback, errorCallback, returnedValue = null, activityType = "PEDOMETER";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    successCallback = t.step_func(function (motionInfo) {
        assert_equals(returnedValue, undefined, "Incorrect returned value");
        check_humanactivitymonitor_pedometer_info(motionInfo);
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    returnedValue = tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback, errorCallback);

});

}

function HumanActivityMonitorManagerObject_stop_type_PEDOMETER() {
//==== TEST: HumanActivityMonitorManagerObject_stop_type_PEDOMETER
//==== LABEL Check if method stop for pedometer returns properly value
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    var returnedValue = null, activityType = "PEDOMETER";

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");

        returnedValue = tizen.humanactivitymonitor.stop(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value from stop method");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            //do nothing here;
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

}, 'HumanActivityMonitorManagerObject_stop_type_PEDOMETER');

}

function HumanActivityMonitorManagerObject_stop_type_WRIST_UP() {
//==== TEST: HumanActivityMonitorManagerObject_stop_type_WRIST_UP
//==== LABEL Check if method stop for wrist-up returns properly value
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    var returnedValue = null, activityType = "WRIST_UP";

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");

        returnedValue = tizen.humanactivitymonitor.stop(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value from stop method");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            // do nothing here
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

}, 'HumanActivityMonitorManagerObject_stop_type_WRIST_UP');

}

function HumanActivityMonitorManagerObject_stop_type_HRM() {
//==== TEST: HumanActivityMonitorManagerObject_stop_type_HRM
//==== LABEL Check if method stop for HRM returns properly value
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    var returnedValue = null, activityType = "HRM";

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");

        returnedValue = tizen.humanactivitymonitor.stop(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value from stop method");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            //do nothing here
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

}, 'HumanActivityMonitorManagerObject_stop_type_HRM');

}

function HumanActivityMonitorManagerObject_stop_misarg() {
//==== TEST: HumanActivityMonitorManagerObject_stop_misarg
//==== LABEL Check if stop throws exception when argument is missing
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.humanactivitymonitor.stop();
    });
}, 'HumanActivityMonitorManagerObject_stop_misarg');

}

function HumanActivityMonitorManagerObject_stop_exist() {
//==== TEST: HumanActivityMonitorManagerObject_stop_exist
//==== LABEL Check if method stop of PackageManager exists
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    assert_true("stop" in tizen.humanactivitymonitor, "No stop method in tizen.humanactivitymonitor");
    check_method_exists(tizen.humanactivitymonitor, "stop");
}, 'HumanActivityMonitorManagerObject_stop_exist');

}

function HumanActivityMonitorManagerObject_getHumanActivityData_misarg() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_misarg
//==== LABEL Check if getHumanActivityData throws exception when arguments are missing
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    var returnedValue = null, activityType = "PEDOMETER";

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");

        assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
            tizen.humanactivitymonitor.getHumanActivityData();
        });

        tizen.humanactivitymonitor.stop(activityType);
    } catch (e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            //do nothing here
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }
}, 'HumanActivityMonitorManagerObject_getHumanActivityData_misarg');

}

function HumanActivityMonitorManagerObject_getHumanActivityData_exist() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_exist
//==== LABEL Check if method getHumanActivityData of PackageManager exists
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    assert_true("getHumanActivityData" in tizen.humanactivitymonitor, "No getHumanActivityData method in tizen.humanactivitymonitor");
    check_method_exists(tizen.humanactivitymonitor, "getHumanActivityData");
}, 'HumanActivityMonitorManagerObject_getHumanActivityData_exist');

}

function HumanActivityMonitorManagerObject_stop_type_TypeMismatch() {
//==== TEST: HumanActivityMonitorManagerObject_stop_type_TypeMismatch
//==== LABEL Check if stop throws exception when type is incorrect
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_stop_type_TypeMismatch',
    {timeout: 90000}), conversionTable, exceptionName, returnedValue = null, activityType, i;

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop("PEDOMETER");
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    try {
        returnedValue = tizen.humanactivitymonitor.start("PEDOMETER");
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    conversionTable = getTypeConversionExceptions("enum", false);

    for(i = 0; i < conversionTable.length; i++) {
        activityType = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name : exceptionName}, function () {
            tizen.humanactivitymonitor.stop(activityType);
        }, exceptionName + " should be thrown - given incorrect activityType.");
    }
    t.done();
});

}

function HumanActivityMonitorManagerObject_getHumanActivityData() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData
//==== LABEL Check if method getHumanActivityData of HumanActivityMonitorManagerObject returns properly value
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    var returnedValue = null, activityType = "PEDOMETER";
    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");

        returnedValue = tizen.humanactivitymonitor.getHumanActivityData(activityType, function(){});
        assert_equals(returnedValue, undefined, "Incorrect returned value");

        tizen.humanactivitymonitor.stop(activityType);
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            //do nothing here
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }
}, 'HumanActivityMonitorManagerObject_getHumanActivityData');

}

function HumanActivityMonitorManagerObject_getHumanActivityData_type_PEDOMETER() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_type_PEDOMETER
//==== LABEL Check if getHumanActivityData for pedometer works properly
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_getHumanActivityData_type_PEDOMETER',
    {timeout: 90000}), successCallback, returnedValue = null, activityType = "PEDOMETER";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    successCallback = t.step_func(function (motionInfo) {
        assert_equals(returnedValue, undefined, "Incorrect returned value");
        check_humanactivitymonitor_pedometer_info(motionInfo);
        t.done();
    });

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    returnedValue = tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback);
});

}

function HumanActivityMonitorManagerObject_getHumanActivityData_type_HRM() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_type_HRM
//==== LABEL Check if getHumanActivityData for HRM throws an exception
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_getHumanActivityData_type_HRM',
    {timeout: 90000}), successCallback, returnedValue = null, activityType = "HRM";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    successCallback = t.step_func(function (motionInfo) {
        assert_unreached("Should not be here");
    });

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback);
    }, "exception should be thrown - given incorrect activityType.");

    t.done();
});

}

function HumanActivityMonitorManagerObject_getHumanActivityData_type_WRIST_UP() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_type_WRIST_UP
//==== LABEL Check if getHumanActivityData for WRIST_UP throws an exception
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_getHumanActivityData_type_WRIST_UP',
    {timeout: 90000}), successCallback, returnedValue = null, activityType = "WRIST_UP";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    successCallback = t.step_func(function (motionInfo) {
        assert_unreached("Should not be here");
    });

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback);
    }, "exception should be thrown - given incorrect activityType.");
    t.done();

});
}

function HumanActivityMonitorManagerObject_getHumanActivityData_type_PEDOMETER_without_start() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_type_PEDOMETER_without_start
//==== LABEL Check if getHumanActivityData for pedometer invokes error callback without calling start
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_getHumanActivityData_type_PEDOMETER_without_start',
    {timeout: 90000}), successCallback, errorCallback, activityType = "PEDOMETER";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    successCallback = t.step_func(function (motionInfo) {
        assert_unreached("Should not be here");
    });

    errorCallback = t.step_func(function (err) {
        assert_equals(err.name, SERVICE_NOT_AVAILABLE_ERR, "Incorrect result from getMotion method");
        t.done();
    });


    try {
        tizen.humanactivitymonitor.stop(activityType);
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }
    tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback, errorCallback);
});

}

function HumanActivityMonitorManagerObject_getHumanActivityData_type_TypeMismatch() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_type_TypeMismatch
//==== LABEL Check if getHumanActivityData throws exception when type is incorrect
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_getHumanActivityData_type_TypeMismatch',
    {timeout: 90000}), successCallback, exceptionName, conversionTable, returnedValue = null, activityType = "PEDOMETER";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop("PEDOMETER");
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    successCallback = t.step_func(function (motionInfo) {
        assert_unreached("Should not be here.");
    });

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    conversionTable = getTypeConversionExceptions("enum", false);

    for(i = 0; i < conversionTable.length; i++) {
        activityType = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name : exceptionName}, function () {
            tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback);
        }, exceptionName + " should be thrown - given incorrect activityType.");
    }
    t.done();
});

}

function HumanActivityMonitorManagerObject_getHumanActivityData_HumanActivityMonitorSuccessCallback_invalid_cb() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_HumanActivityMonitorSuccessCallback_invalid_cb
//==== LABEL Check if getHumanActivityData throws exception when successCallback is invalid
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_getHumanActivityData_HumanActivityMonitorSuccessCallback_invalid_cb',
    {timeout: 90000}), invalidCallback, returnedValue = null, activityType = "PEDOMETER";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    invalidCallback = {
        onsuccess: t.step_func(function (motionInfo) {
            assert_unreached("Invalid success callback invoked");
        })
    };

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.humanactivitymonitor.getHumanActivityData(activityType, invalidCallback);
    });

    t.done();
});

}

function HumanActivityMonitorManagerObject_getHumanActivityData_HumanActivityMonitorSuccessCallback_TypeMismatch() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_HumanActivityMonitorSuccessCallback_TypeMismatch
//==== LABEL Check if start throws exception when successCallback is incorrect
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_getHumanActivityData_HumanActivityMonitorSuccessCallback_TypeMismatch',
    {timeout: 90000}), successCallback, conversionTable, exceptionName, i, returnedValue = null, activityType = "PEDOMETER";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    conversionTable = getTypeConversionExceptions("functionObject", false);

    for(i = 0; i < conversionTable.length; i++) {
        successCallback  = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback);
            }, exceptionName + " should be thrown - given incorrect successCallback: " + successCallback + ".");
    }

    t.done();
});

}

function HumanActivityMonitorManagerObject_getHumanActivityData_errorCallback_invalid_cb() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_errorCallback_invalid_cb
//==== LABEL Check if getHumanActivityData throws exception when successCallback is invalid
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_getHumanActivityData_errorCallback_invalid_cb',
    {timeout: 90000}), successCallback, invalidCallback, returnedValue = null, activityType = "PEDOMETER";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    successCallback = t.step_func(function (motionInfo) {
        assert_unreached("Should not be here.");
    });

    invalidCallback = {
        onerror: t.step_func(function (error) {
            assert_unreached("Invalid errorCallback should not be invoked: " + error.name + ": " + error.message);
        })
    };

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback, invalidCallback);
    });

    t.done();
});

}

function HumanActivityMonitorManagerObject_getHumanActivityData_errorCallback_TypeMismatch() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_errorCallback_TypeMismatch
//==== LABEL Check if start throws exception when errorCallback is incorrect
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_getHumanActivityData_errorCallback_TypeMismatch',
    {timeout: 90000}), successCallback, errorCallback, conversionTable, exceptionName, i, returnedValue = null, activityType = "PEDOMETER";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    successCallback = t.step_func(function (motionInfo) {
        assert_unreached("Should not be here.");
    });

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    conversionTable = getTypeConversionExceptions("functionObject", true);

    for(i = 0; i < conversionTable.length; i++) {
        errorCallback  = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback, errorCallback);
            }, exceptionName + " should be thrown - given incorrect errorCallback: " + successCallback + ".");
    }

    t.done();
});

}

function HumanActivityMonitorManagerObject_getHumanActivityData_with_errorCallback() {
//==== TEST: HumanActivityMonitorManagerObject_getHumanActivityData_with_errorCallback
//==== LABEL Check if getHumanActivityDataworks properly with errorCallback
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityMonitorManagerObject_getHumanActivityData_with_errorCallback',
    {timeout: 90000}), successCallback, errorCallback, returnedValue = null, activityType = "PEDOMETER";

t.step(function () {

    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    successCallback = t.step_func(function (motionInfo) {
        assert_equals(returnedValue, undefined, "Incorrect returned value");
        check_humanactivitymonitor_pedometer_info(motionInfo);
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    returnedValue = tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback, errorCallback);
});

}

function HumanActivityPedometerData_notexist() {
//==== TEST: HumanActivityPedometerData_notexist
//==== LABEL Check if HumanActivityPedometerData notexist
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    check_no_interface_object("HumanActivityPedometerData");
}, 'HumanActivityPedometerData_notexist');

}

function HumanActivityPedometerData_extend() {
//==== TEST: HumanActivityPedometerData_extend
//==== LABEL Check if HumanActivityPedometerData is extendable
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

setup({timeout: 90000});

var t = async_test('HumanActivityPedometerData_extend',
    {timeout: 90000}), successCallback, errorCallback, returnedValue = null, activityType = "PEDOMETER";

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.humanactivitymonitor.stop(activityType);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    successCallback = t.step_func(function (pedometerData) {
        assert_equals(returnedValue, undefined, "Incorrect returned value");
        check_extensibility(pedometerData);
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    try {
        returnedValue = tizen.humanactivitymonitor.start(activityType);
        assert_equals(returnedValue, undefined, "Incorrect returned value");
    } catch(e) {
        if(e.name === NOT_SUPPORTED_EXCEPTION) {
            t.done();
        } else {
            assert_unreached("unexpected exception is thrown" + e.name + ", msg: " + e.message);
        }
    }

    returnedValue = tizen.humanactivitymonitor.getHumanActivityData(activityType, successCallback, errorCallback);
});

}

function HumanActivityHRMData_notexist() {
//==== TEST: HumanActivityHRMData_notexist
//==== LABEL Check if HumanActivityHRMData notexist
//==== SPEC
//==== SPEC_
//==== PRIORITY
//==== TEST_CRITERIA

test(function () {
    check_no_interface_object("HumanActivityHRMData");
}, 'HumanActivityHRMData_notexist');

}

var moduleName = "tct-humanactivitymonitor-tizen-tests";
add_test_case(moduleName, HumanActivityMonitorManagerObject_notexist);
add_test_case(moduleName, HumanActivityMonitorManager_notexist);
add_test_case(moduleName, HumanActivityMonitorManager_in_tizen);
add_test_case(moduleName, HumanActivityMonitorManagerObject_extend);
add_test_case(moduleName, HumanActivityMonitorManagerObject_start_type_PEDOMETER);
add_test_case(moduleName, HumanActivityMonitorManagerObject_start_type_WRIST_UP);
add_test_case(moduleName, HumanActivityMonitorManagerObject_start_type_HRM);
add_test_case(moduleName, HumanActivityMonitorManagerObject_start_misarg);
add_test_case(moduleName, HumanActivityMonitorManagerObject_start_exist);
add_test_case(moduleName, HumanActivityMonitorManagerObject_start_type_TypeMismatch);
add_test_case(moduleName, HumanActivityMonitorManagerObject_start_HumanActivityMonitorSuccessCallback_invalid_cb);
add_test_case(moduleName, HumanActivityMonitorManagerObject_start_HumanActivityMonitorSuccessCallback_TypeMismatch);
add_test_case(moduleName, HumanActivityMonitorSuccessCallback_notexist);
add_test_case(moduleName, HumanActivityMonitorSuccessCallback_onsuccess);
add_test_case(moduleName, HumanActivityMonitorManagerObject_stop_type_PEDOMETER);
add_test_case(moduleName, HumanActivityMonitorManagerObject_stop_type_WRIST_UP);
add_test_case(moduleName, HumanActivityMonitorManagerObject_stop_type_HRM);
add_test_case(moduleName, HumanActivityMonitorManagerObject_stop_misarg);
add_test_case(moduleName, HumanActivityMonitorManagerObject_stop_exist);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_misarg);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_exist);
add_test_case(moduleName, HumanActivityMonitorManagerObject_stop_type_TypeMismatch);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_type_PEDOMETER);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_type_HRM);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_type_WRIST_UP);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_type_PEDOMETER_without_start);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_type_TypeMismatch);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_HumanActivityMonitorSuccessCallback_invalid_cb);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_HumanActivityMonitorSuccessCallback_TypeMismatch);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_errorCallback_invalid_cb);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_errorCallback_TypeMismatch);
add_test_case(moduleName, HumanActivityMonitorManagerObject_getHumanActivityData_with_errorCallback);
add_test_case(moduleName, HumanActivityPedometerData_notexist);
add_test_case(moduleName, HumanActivityPedometerData_extend);
add_test_case(moduleName, HumanActivityHRMData_notexist);
