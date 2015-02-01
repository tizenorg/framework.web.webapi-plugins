/*
 * Copyright (c) 2012 Intel Corporation.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * *Redistributions of works must retain the original copyright notice, this list
 * of conditions and the following disclaimer.
 * *Redistributions in binary form must reproduce the original copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * *Neither the name of Intel Corporation nor the names of its contributors
 * may be used to endorse or promote products derived from this work without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY INTEL CORPORATION "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL INTEL CORPORATION BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Authors:
 *         Jenny Cao <jenny.q.cao@intel.com>
 *
 *         Revision history:
 *
 */

var UNKNOWN_ERR         = "UnknownError";
var TYPE_MISMATCH_ERR   = "TypeMismatchError";
var IO_ERR              = "IOError";
var INVALID_VALUES_ERR  = "InvalidValuesError";
var SECURITY_ERR        = "SecurityError";
var NOT_FOUND_ERR       = "NotFoundError";
var NOT_SUPPORT_ERR     = "NotSupportedError";

var APPLICATION_ID = "testalar00.alarmTestApp";

add_result_callback(function () {
    try {
        tizen.alarm.removeAll();
    } catch (err) {
        // do nothing in case removeAll throw an exception
    }
});

function createAbsAlarm() {
    var absAlarm1, date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    absAlarm1 = new tizen.AlarmAbsolute(date);
    return absAlarm1;
}

function createRelAlarm() {
    var alarmRel1 = new tizen.AlarmRelative(3 * tizen.alarm.PERIOD_HOUR);
    return alarmRel1;
}

function cleanAlarms() {
    tizen.alarm.removeAll();
}

function AlarmAbsolute_constructor_date() {

//==== TEST: AlarmAbsolute_constructor_date
//==== LABEL Test whether the constructor with date parameter are supported
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRA CONSTRM

test(function () {
    var alarm, date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    date.setMilliseconds(0);
    alarm = new tizen.AlarmAbsolute(date);
    assert_true(alarm instanceof tizen.AlarmAbsolute, "object was not created properly");
    assert_equals(alarm.date.getTime(), date.getTime(), "date passed as constructor parameter is different than date in the object");
}, 'AlarmAbsolute_constructor_date');

}

function AlarmAbsolute_constructor_date_daysOfTheWeek() {

//==== TEST: AlarmAbsolute_constructor_date_daysOfTheWeek
//==== LABEL Test whether the constructor with date parameter and day of the week parameter are supported
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRA CONSTRM

test(function () {
    var i, alarm, date = new Date(),
        daysOfTheWeekPossibilities = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],
        daysOfTheWeek = [];
    date.setFullYear(date.getFullYear() + 1);
    date.setMilliseconds(0);
    for (i = 0; i < daysOfTheWeekPossibilities.length; i++) {
        daysOfTheWeek.push(daysOfTheWeekPossibilities[i]);
        alarm = new tizen.AlarmAbsolute(date, daysOfTheWeek);
        assert_true(alarm instanceof tizen.AlarmAbsolute, "object was not created properly");
        assert_equals(alarm.date.getTime(), date.getTime(), "date passed as constructor parameter is different than date in the object");
        assert_array_equals(alarm.daysOfTheWeek, daysOfTheWeek,
            "days of the week array passed as constructor parameter is different than days of the week array in the object");
    }
}, 'AlarmAbsolute_constructor_date_daysOfTheWeek');

}

function AlarmAbsolute_constructor_date_period() {

//==== TEST: AlarmAbsolute_constructor_date_period
//==== LABEL Test whether the constructor with date parameter and period parameter are supported
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRA CONSTRM

test(function () {
    var alarm, date = new Date(), period = 300;
    date.setFullYear(date.getFullYear() + 1);
    date.setMilliseconds(0);
    alarm = new tizen.AlarmAbsolute(date, period);
    assert_true(alarm instanceof tizen.AlarmAbsolute, "object was not created properly");
    assert_equals(alarm.date.getTime(), date.getTime(), "date passed as constructor parameter is different than date in the object");
    assert_array_equals(alarm.period, period, "period passed as constructor parameter is different than period in the object");
}, 'AlarmAbsolute_constructor_date_period');

}

function AlarmAbsolute_date_attribute() {

//==== TEST: AlarmAbsolute_date_attribute
//==== LABEL Check AlarmAbsolute for date attribute
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:date A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO

test(function () {
    var alarm, tmp, date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    date.setMilliseconds(0);
    alarm = new tizen.AlarmAbsolute(date);
    assert_true("date" in alarm, "date doesn't exist in provided object.");
    assert_type(alarm.date, "object", "type of date is different.");
    assert_equals(alarm.date.getTime(), date.getTime(), "date passed as constructor parameter is different than date in the object");
    tmp = alarm.date.getTime();
    alarm.date.setSeconds(50, 0);
    assert_equals(tmp, alarm.date.getTime(), "date can be modified");
}, 'AlarmAbsolute_date_attribute');

}

function AlarmAbsolute_daysOfTheWeek_attribute() {

//==== TEST: AlarmAbsolute_daysOfTheWeek_attribute
//==== LABEL Check AlarmAbsolute for daysOfTheWeek attribute
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:daysOfTheWeek A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO ADV

test(function () {
    var alarm1, alarm2, tmp, date = new Date(), daysOfTheWeek = ["MO", "TU"];
    date.setFullYear(date.getFullYear() + 1);
    alarm1 = new tizen.AlarmAbsolute(date);
    assert_array_equals(alarm1.daysOfTheWeek, [], "default value should be an empty array");
    alarm2 = new tizen.AlarmAbsolute(date, daysOfTheWeek);
    assert_true("daysOfTheWeek" in alarm2, "daysOfTheWeek doesn't exist in provided object.");
    assert_type(alarm2.daysOfTheWeek, "array", "type of daysOfTheWeek is different.");
    assert_array_equals(alarm2.daysOfTheWeek, daysOfTheWeek,
        "daysOfTheWeek passed as constructor parameter is different than daysOfTheWeek in the object");
    tmp = alarm2.daysOfTheWeek;
    alarm2.daysOfTheWeek = ["WE", "TH", "FR"];
    assert_array_equals(tmp, alarm2.daysOfTheWeek, "daysOfTheWeek can be modified");
}, 'AlarmAbsolute_daysOfTheWeek_attribute');

}

function AlarmAbsolute_exist() {

//==== TEST: AlarmAbsolute_exist
//==== LABEL Check if AlarmAbsolute exist
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRF

test(function () {
    check_constructor("AlarmAbsolute");
}, 'AlarmAbsolute_exist');

}

function AlarmAbsolute_extend() {

//==== TEST: AlarmAbsolute_extend
//==== LABEL Check if AlarmAbsolute possible extend
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:AlarmAbsolute U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX

test(function () {
    var alarm = createAbsAlarm();
    check_extensibility(alarm);
}, 'AlarmAbsolute_extend');

}

function AlarmAbsolute_getNextScheduledDate() {

//==== TEST: AlarmAbsolute_getNextScheduledDate
//==== LABEL Check using getNextScheduledDate method
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:getNextScheduledDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MNA MR
test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm, nextScheduledDate, myDate = new Date();
    myDate.setFullYear(myDate.getFullYear() + 1);
    myDate.setMilliseconds(0);
    alarm = new tizen.AlarmAbsolute(myDate);
    tizen.alarm.add(alarm, APPLICATION_ID);
    nextScheduledDate = alarm.getNextScheduledDate();
    assert_type(nextScheduledDate, "date", "type of the returned value is not a date");
    assert_equals(nextScheduledDate.getTime(), myDate.getTime(), "the returned date is not the same which was added");
    assert_equals(nextScheduledDate.getTime(), alarm.date.getTime(), "the returned date is not the same which is in the object");
}, 'AlarmAbsolute_getNextScheduledDate');

}

function AlarmAbsolute_getNextScheduledDate_exist() {

//==== TEST: AlarmAbsolute_getNextScheduledDate_exist
//==== LABEL Check if method getNextScheduledDate exists
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:getNextScheduledDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    var alarm = createAbsAlarm();
    check_method_exists(alarm, "getNextScheduledDate");
}, 'AlarmAbsolute_getNextScheduledDate_exist');

}

function AlarmAbsolute_getNextScheduledDate_extra_argument() {

//==== TEST: AlarmAbsolute_getNextScheduledDate_extra_argument
//==== LABEL Check using getNextScheduledDate method with extra argument
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:getNextScheduledDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MR MNAEX

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm, myDate = new Date();
    myDate.setFullYear(myDate.getFullYear() + 1);
    myDate.setMilliseconds(0);
    alarm = new tizen.AlarmAbsolute(myDate);
    tizen.alarm.add(alarm, APPLICATION_ID);
    checkExtraArgument(alarm, "getNextScheduledDate");
}, 'AlarmAbsolute_getNextScheduledDate_extra_argument');

}

function AlarmAbsolute_getNextScheduledDate_return_null() {

//==== TEST: AlarmAbsolute_getNextScheduledDate_return_null
//==== LABEL Check using getNextScheduledDate method for null return
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:getNextScheduledDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MNA MR

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm, nextScheduledDate, myDate = new Date();
    myDate.setFullYear(myDate.getFullYear() - 1);
    alarm = new tizen.AlarmAbsolute(myDate);
    tizen.alarm.add(alarm, APPLICATION_ID);
    nextScheduledDate = alarm.getNextScheduledDate();
    assert_equals(nextScheduledDate, null, "nextScheduledDate do not returns null");
}, 'AlarmAbsolute_getNextScheduledDate_return_null');

}

function AlarmAbsolute_period_attribute() {

//==== TEST: AlarmAbsolute_period_attribute
//==== LABEL Check AlarmAbsolute for period attribute
//==== SPEC Tizen Web API:Application:Alarm:AlarmAbsolute:period A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO ADV

test(function () {
    var alarm1, alarm2, date = new Date(), period = 60;
    date.setFullYear(date.getFullYear() + 1);
    alarm1 = new tizen.AlarmAbsolute(date);
    assert_true("period" in alarm1, "attribute period doesn't exist in provided object");
    assert_type(alarm1.period, "null", "default value should be null");
    alarm2 = new tizen.AlarmAbsolute(date, period);
    check_readonly(alarm2, "period", alarm2.period, "number", 1);
    assert_equals(alarm2.period, period, "period passed as constructor parameter is different than period in the object");
}, 'AlarmAbsolute_period_attribute');

}

function AlarmManagerObject_notexist() {

//==== TEST: AlarmManagerObject_notexist
//==== LABEL Check if AlarmManagerObject not exist
//==== SPEC Tizen Web API:Application:Alarm:AlarmManagerObject:AlarmManagerObject U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("AlarmManagerObject");
}, 'AlarmManagerObject_notexist');

}

function AlarmManager_PERIOD_DAY_const() {

//==== TEST: AlarmManager_PERIOD_DAY_const
//==== LABEL Check if PERIOD_DAY is constant
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:PERIOD_DAY A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== TEST_CRITERIA CONSTE CONSTT CONSTV CONSTRO

test(function () {
    check_const(tizen.alarm, "PERIOD_DAY", 86400, "number", 43200);
}, 'AlarmManager_PERIOD_DAY_const');

}

function AlarmManager_PERIOD_HOUR_const() {

//==== TEST: AlarmManager_PERIOD_HOUR_const
//==== LABEL Check if PERIOD_HOUR is constant
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:PERIOD_HOUR A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTE CONSTT CONSTV CONSTRO

test(function () {
    check_const(tizen.alarm, "PERIOD_HOUR", 3600, "number", 1300);
}, 'AlarmManager_PERIOD_HOUR_const');

}

function AlarmManager_PERIOD_MINUTE_const() {

//==== TEST: AlarmManager_PERIOD_MINUTE_const
//==== LABEL Check if PERIOD_MINUTE is constant
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:PERIOD_MINUTE A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTE CONSTT CONSTV CONSTRO

test(function () {
    check_const(tizen.alarm, "PERIOD_MINUTE", 60, "number", 120);
}, 'AlarmManager_PERIOD_MINUTE_const');

}

function AlarmManager_PERIOD_WEEK_const() {

//==== TEST: AlarmManager_PERIOD_WEEK_const
//==== LABEL Check if PERIOD_WEEK is constant
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:PERIOD_WEEK A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTE CONSTT CONSTV CONSTRO

test(function () {
    check_const(tizen.alarm, "PERIOD_WEEK", 604800, "number", 302400);
}, 'AlarmManager_PERIOD_WEEK_const');

}

function AlarmManager_add_absolute_alarm() {

//==== TEST: AlarmManager_add_absolute_alarm
//==== LABEL Check using add method (with non-optional arguments) in AlarmManager interface to add absolute alarm
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:add M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MAST MMINA MR

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm1, alarm2, retVal;
    alarm1 = createAbsAlarm();
    retVal = tizen.alarm.add(alarm1, APPLICATION_ID);
    assert_type(retVal, "undefined", "method returned value");
    assert_not_equals(alarm1.id, null, "object was not added properly");
    alarm2 = tizen.alarm.get(alarm1.id);
    assert_equals(alarm1.id, alarm2.id, "the object is not the same which was added");
}, 'AlarmManager_add_absolute_alarm');

}

function AlarmManager_add_absolute_alarm_with_appControl() {

//==== TEST: AlarmManager_add_absolute_alarm_with_appControl
//==== LABEL Check using add method (with optional argument) in AlarmManager interface to add absolute alarm
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:add M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MOA MR MAST

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm1, alarm2, appControl, returnVal;
    alarm1 = createAbsAlarm();
    appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view", "http://www.tizen.org");
    returnVal = tizen.alarm.add(alarm1, APPLICATION_ID, appControl);
    assert_type(returnVal, "undefined", "method returned value");
    assert_not_equals(alarm1.id, null, "object was not added properly");
    alarm2 = tizen.alarm.get(alarm1.id);
    assert_equals(alarm1.id, alarm2.id, "the object is not the same which was added");
}, 'AlarmManager_add_absolute_alarm_with_appControl');

}

function AlarmManager_add_alarm_TypeMismatch() {

//==== TEST: AlarmManager_add_alarm_TypeMismatch
//==== LABEL Check argument 'alarm' type conversion
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:add M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P2
//==== TEST_CRITERIA MC

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var i, conversionTable = getTypeConversionExceptions("object");
    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.alarm.add(conversionTable[i][0], APPLICATION_ID);
        }, "exception should was thrown");
    }
}, 'AlarmManager_add_alarm_TypeMismatch');

}

function AlarmManager_add_appControl_TypeMismatch() {

//==== TEST: AlarmManager_add_appControl_TypeMismatch
//==== LABEL Check argument 'appControl' type conversion
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:add M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P2
//==== TEST_CRITERIA MC

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var i, conversionTable = getTypeConversionExceptions("object", true),
        alarm = createAbsAlarm();
    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.alarm.add(alarm, APPLICATION_ID, conversionTable[i][0]);
        }, "exception should was thrown");
    }
}, 'AlarmManager_add_appControl_TypeMismatch');

}

function AlarmManager_add_appControl_invalid() {

//==== TEST: AlarmManager_add_appControl_invalid
//==== LABEL Check if an exception was thrown when a wrong appControl was passed
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:add M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MC

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var absAlarm1 = createAbsAlarm();
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.alarm.add(absAlarm1, APPLICATION_ID, [12, 34]);
    }, "TypeMismatchError exception should be thrown - given wrong appControl");
}, 'AlarmManager_add_appControl_invalid');

}

function AlarmManager_add_appControl_invalid_obj() {

//==== TEST: AlarmManager_add_appControl_invalid_obj
//==== LABEL Check if an exception was thrown when a fake system object was passed
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:add M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P2
//==== TEST_CRITERIA MTO

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm, appControl;

    alarm = createAbsAlarm();

    appControl = {
        operation: "http://tizen.org/appcontrol/operation/share",
        uri: "share.html",
        mime: "image/*",
        category: "",
        data: []
    };

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.alarm.add(alarm, APPLICATION_ID, appControl);
    }, "fake system object was pased but exception wasn't thrown");
}, 'AlarmManager_add_appControl_invalid_obj');

}

function AlarmManager_add_exist() {

//==== TEST: AlarmManager_add_exist
//==== LABEL Check if method add exists
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:add M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.alarm, "add");
}, 'AlarmManager_add_exist');

}

function AlarmManager_add_missarg() {

//==== TEST: AlarmManager_add_missarg
//==== LABEL Check with missing non-optional argument
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:add M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P2
//==== TEST_CRITERIA MMA

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.alarm.add();
    }, "Method was called without arguments but exception was not thrown");

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.alarm.add(undefined, APPLICATION_ID);
    }, "Method was called without Alarm but exception was not thrown");
}, 'AlarmManager_add_missarg');

}

function AlarmManager_add_relative_alarm() {

//==== TEST: AlarmManager_add_relative_alarm
//==== LABEL Check using add method (with non-optional arguments) in AlarmManager interface to add relative alarm
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:add M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MR MAST
test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm1 = createRelAlarm(), alarm2, retVal;
    retVal = tizen.alarm.add(alarm1, APPLICATION_ID);
    alarm2 = tizen.alarm.get(alarm1.id);
    assert_type(retVal, "undefined", "method returned value");
    assert_not_equals(alarm1.id, null, "object was not added properly");
    assert_equals(alarm1.id, alarm2.id, "the object is not the same which was added");
}, 'AlarmManager_add_relative_alarm');

}

function AlarmManager_add_relative_alarm_with_appControl() {

//==== TEST: AlarmManager_add_relative_alarm_with_appControl
//==== LABEL Check using add method (with optional argument) in AlarmManager interface to add relative alarm
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:add M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MOA MR MAST
test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm1, alarm2, appControl, returnVal;
    alarm1 = createRelAlarm();
    appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view", "http://www.tizen.org");
    returnVal = tizen.alarm.add(alarm1, APPLICATION_ID, appControl);
    assert_type(returnVal, "undefined", "method returned value");
    assert_not_equals(alarm1.id, null, "object was not added properly");
    alarm2 = tizen.alarm.get(alarm1.id);
    assert_equals(alarm1.id, alarm2.id, "the object is not the same which was added");
}, 'AlarmManager_add_relative_alarm_with_appControl');

}

function AlarmManager_extend() {

//==== TEST: AlarmManager_extend
//==== LABEL Check if AlarmManager possible extend
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:AlarmManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX

test(function () {
    check_extensibility(tizen.alarm);
}, 'AlarmManager_extend');

}

function AlarmManager_get() {

//==== TEST: AlarmManager_get
//==== LABEL Check using get method in AlarmManager interface to get alarm
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:get M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MR MMINA

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm1, alarm2;
    alarm1 = createAbsAlarm();
    tizen.alarm.add(alarm1, APPLICATION_ID);
    alarm2 = tizen.alarm.get(alarm1.id);
    assert_true(alarm2 instanceof tizen.AlarmAbsolute, "object was not get properly");
    assert_equals(alarm1.id, alarm2.id, "the object is not the same which was added");
}, 'AlarmManager_get');

}

function AlarmManager_getAll() {

//==== TEST: AlarmManager_getAll
//==== LABEL Check using getAll method in AlarmManager interface to get all alarms
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:getAll M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MR MNA

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var i, absAlarm, relAlarm, alarmAll = [];
    cleanAlarms();
    absAlarm = createAbsAlarm();
    tizen.alarm.add(absAlarm, APPLICATION_ID);
    relAlarm = createRelAlarm();
    tizen.alarm.add(relAlarm, APPLICATION_ID);
    alarmAll = tizen.alarm.getAll();
    assert_equals(alarmAll.length, 2, "number of added alarms should be 2");
    for (i = 0; i < alarmAll.length; i++) {
        if (alarmAll[i] instanceof tizen.AlarmAbsolute) {
            assert_equals(alarmAll[i].id, absAlarm.id, "object is not the same which was added");
        } else if (alarmAll[i] instanceof tizen.AlarmRelative) {
            assert_equals(alarmAll[i].id, relAlarm.id, "object is not the same which was added");
        } else {
            assert_unreached("object was not get properly");
        }
    }
}, 'AlarmManager_getAll');

}

function AlarmManager_getAll_exist() {

//==== TEST: AlarmManager_getAll_exist
//==== LABEL Check if method getAll exists
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:getAll M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.alarm, "getAll");
}, 'AlarmManager_getAll_exist');

}

function AlarmManager_getAll_extra_argument() {

//==== TEST: AlarmManager_getAll_extra_argument
//==== LABEL Check using getAll withe extra argument to get all alarms
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:getAll M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MNAEX MR

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var i, absAlarm, alarmAll = [], argumentsList = [null, undefined, "string", 1, false, ["one", "two"], {arg: 1}, function () {}];
    cleanAlarms();
    absAlarm = createAbsAlarm();
    tizen.alarm.add(absAlarm, APPLICATION_ID);
    for (i = 0; i < argumentsList.length; i++) {
        alarmAll = tizen.alarm.getAll(argumentsList[i]);
        assert_equals(alarmAll.length, 1, "number of added alarms should be 1");
        assert_true(alarmAll[0] instanceof tizen.AlarmAbsolute, "object was not get properly");
        assert_equals(alarmAll[0].id, absAlarm.id, "the first object is not the same which was added");
        alarmAll = [];
    }
}, 'AlarmManager_getAll_extra_argument');

}

function AlarmManager_get_AlarmRelative() {

//==== TEST: AlarmManager_get_AlarmRelative
//==== LABEL Check using get method in AlarmManager interface to get AlarmRelative
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:get M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MR

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm1, alarm2;
    alarm1 = createRelAlarm();
    tizen.alarm.add(alarm1, APPLICATION_ID);
    alarm2 = tizen.alarm.get(alarm1.id);
    assert_true(alarm2 instanceof tizen.AlarmRelative, "object was not get properly");
    assert_equals(alarm1.id, alarm2.id, "the object is not the same which was added");
}, 'AlarmManager_get_AlarmRelative');

}

function AlarmManager_get_exist() {

//==== TEST: AlarmManager_get_exist
//==== LABEL Check if method get exists
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:get M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.alarm, "get");
}, 'AlarmManager_get_exist');

}

function AlarmManager_in_tizen() {

//==== TEST: AlarmManager_in_tizen
//==== LABEL Check if AlarmManager exist in tizen
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:AlarmManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBME

test(function () {
    assert_true("alarm" in tizen, "no alarm in tizen");
    check_readonly(tizen, "alarm", tizen.alarm, "object", "dummyValue");
}, 'AlarmManager_in_tizen');

}

function AlarmManager_notexist() {

//==== TEST: AlarmManager_notexist
//==== LABEL Check if AlarmManager notexist
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:AlarmManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("AlarmManager");
}, 'AlarmManager_notexist');

}

function AlarmManager_removeAll() {

//==== TEST: AlarmManager_removeAll
//==== LABEL Check using removeAll method in AlarmManager interface to remove all alarms
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:removeAll M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MR MNA MNAST

test(function (){
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var absAlarm, relAlarm, retVal, alarmAll = [];

    tizen.alarm.removeAll();

    absAlarm = createAbsAlarm();
    tizen.alarm.add(absAlarm, APPLICATION_ID);

    relAlarm = createRelAlarm();
    tizen.alarm.add(relAlarm, APPLICATION_ID);

    alarmAll = tizen.alarm.getAll();
    assert_equals(alarmAll.length, 2 , "number of added alarms should be 2");

    retVal = tizen.alarm.removeAll();
    assert_type(retVal, "undefined", "method returned value");

    assert_throws(NOT_FOUND_EXCEPTION, function () {
        tizen.alarm.get(relAlarm.id);
    }, "exception wasn't thrown");

    assert_throws(NOT_FOUND_EXCEPTION, function () {
        tizen.alarm.get(absAlarm.id);
    }, "exception wasn't thrown");

    alarmAll = tizen.alarm.getAll();
    assert_equals(alarmAll.length, 0, "items not removed properly");
}, 'AlarmManager_removeAll');

}

function AlarmManager_removeAll_exist() {

//==== TEST: AlarmManager_removeAll_exist
//==== LABEL Check if method removeAll exists
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:removeAll M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.alarm, "removeAll");
}, 'AlarmManager_removeAll_exist');

}

function AlarmManager_removeAll_extra_argument() {

//==== TEST: AlarmManager_removeAll_extra_argument
//==== LABEL Check using removeAll with extra argument to remove all alarms
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:removeAll M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MNAEX

test(function (){
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var i, alarm, alarmAll, retVal, argumentsList = [null, undefined, "string", 1, false, ["one", "two"], {arg: 1}, function () {}];
    tizen.alarm.removeAll();
    alarm =  createAbsAlarm();
    for (i = 0; i < argumentsList.length; i++) {
        tizen.alarm.add(alarm, APPLICATION_ID);
        alarmAll = tizen.alarm.getAll();
        assert_equals(alarmAll.length, 1 , "number of added alarms should be 1");
        retVal = tizen.alarm.removeAll(argumentsList[i]);
        assert_type(retVal, "undefined", "method returned value");
        assert_throws(NOT_FOUND_EXCEPTION, function () {
            tizen.alarm.get(alarm.id);
        }, "exception wasn't thrown");
        alarmAll = tizen.alarm.getAll();
        assert_equals(alarmAll.length, 0, "items not removed properly");
    }
}, 'AlarmManager_removeAll_extra_argument');

}

function AlarmManager_remove_absolute_alarm() {

//==== TEST: AlarmManager_remove_absolute_alarm
//==== LABEL Check using remove method in AlarmManager interface to remove absolute alarm
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:remove M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MR MMINA MAST

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm, retVal;
    tizen.alarm.removeAll();
    alarm = createAbsAlarm();
    tizen.alarm.add(alarm, APPLICATION_ID);
    retVal=tizen.alarm.remove(alarm.id);
    assert_type(retVal, "undefined", "method returned value");
    assert_throws(NOT_FOUND_EXCEPTION, function () {
        tizen.alarm.get(alarm.id);
    }, "exception wasn't thrown");
    assert_equals(tizen.alarm.getAll().length, 0, "item not removed properly");
}, 'AlarmManager_remove_absolute_alarm');

}

function AlarmManager_remove_exist() {

//==== TEST: AlarmManager_remove_exist
//==== LABEL Check if method remove exists
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:remove M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.alarm, "remove");
}, 'AlarmManager_remove_exist');

}

function AlarmManager_remove_relative_alarm() {

//==== TEST: AlarmManager_remove_relative_alarm
//==== LABEL Check using remove method in AlarmManager interface to remove relative alarm
//==== SPEC Tizen Web API:Application:Alarm:AlarmManager:remove M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MR MMINA MAST

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm, retVal;
    tizen.alarm.removeAll();
    alarm = createRelAlarm();
    tizen.alarm.add(alarm, APPLICATION_ID);
    retVal=tizen.alarm.remove(alarm.id);
    assert_type(retVal, "undefined", "method returned value");
    assert_throws(NOT_FOUND_EXCEPTION, function () {
        tizen.alarm.get(alarm.id);
    }, "exception wasn't thrown");
    assert_equals(tizen.alarm.getAll().length, 0, "item not removed properly");
}, 'AlarmManager_remove_relative_alarm');

}

function AlarmRelative_constructor_delay() {

//==== TEST: AlarmRelative_constructor_delay
//==== LABEL Test whether the constructor with delay parameter are supported
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRA CONSTRM

test(function () {
    var alarm, delay = 3600;
    alarm = new tizen.AlarmRelative(delay);
    assert_true(alarm instanceof tizen.AlarmRelative, "object was not created properly");
    assert_equals(alarm.delay, delay, "delay passed as constructor parameter is different than delay in the object");
}, 'AlarmRelative_constructor_delay');

}

function AlarmRelative_constructor_delay_convert() {

//==== TEST: AlarmRelative_constructor_delay_convert
//==== LABEL Check conversion of delay parameter of AlarmRelative constructor
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRA CONSTRM

test(function () {
    var i, alarm1, alarm2, period = 300, delay = ["ABCD", null, undefined];
    for (i = 0; i < delay.length; i++) {
        alarm1 = new tizen.AlarmRelative(delay[i]);
        assert_true(alarm1 instanceof tizen.AlarmRelative, "object was not created properly");
        assert_equals(alarm1.delay, 0, "bad delay in the object");

        alarm2 = new tizen.AlarmRelative(delay[i], period);
        assert_true(alarm2 instanceof tizen.AlarmRelative, "object was not created properly");
        assert_equals(alarm2.delay, 0, "bad delay in the object");
    }
}, 'AlarmRelative_constructor_delay_convert');

}

function AlarmRelative_constructor_delay_period() {

//==== TEST: AlarmRelative_constructor_delay_period
//==== LABEL Test whether the constructor with delay parameter and period parameter are supported
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRA  CONSTRM

test(function () {
    var alarm, delay = 3600, period = 300;
    alarm = new tizen.AlarmRelative(delay, period);
    assert_true(alarm instanceof tizen.AlarmRelative, "object was not created properly");
    assert_equals(alarm.delay, delay, "delay passed as constructor parameter is different than delay in the object");
    assert_equals(alarm.period, period, "period passed as constructor parameter is different than period in the object");
}, 'AlarmRelative_constructor_delay_period');

}

function AlarmRelative_constructor_period_convert() {

//==== TEST: AlarmRelative_constructor_period_convert
//==== LABEL Check conversion of period parameter of AlarmRelative constructor
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRA CONSTRM

test(function () {
    var i, alarm, delay = 3600, period1 = [undefined, "ABCD"], period2 = null;

    for (i = 0; i < period1.length; i++) {
        alarm = new tizen.AlarmRelative(delay, period1[i]);
        assert_true(alarm instanceof tizen.AlarmRelative, "object was not created properly");
        assert_equals(alarm.period, 0, "bad period in the object");
    }

    alarm = new tizen.AlarmRelative(delay, period2);
    assert_true(alarm instanceof tizen.AlarmRelative, "object was not created properly");
    assert_type(alarm.period, "null", "wrong type of period variable");

}, 'AlarmRelative_constructor_period_convert');

}

function AlarmRelative_delay_attribute() {

//==== TEST: AlarmRelative_delay_attribute
//==== LABEL Check delay attribute in AlarmRelative
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:delay A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO

test(function () {
    var alarm, delay = 3600;
    alarm = new tizen.AlarmRelative(delay);
    assert_true("delay" in alarm, "attribute delay doesn't exist in provided object");
    check_readonly(alarm, "delay", alarm.delay, "number", 7200);
    assert_equals(alarm.delay, delay, "delay passed as constructor parameter is different than delay in the object");
}, 'AlarmRelative_delay_attribute');

}

function AlarmRelative_exist() {

//==== TEST: AlarmRelative_exist
//==== LABEL Check if AlarmRelative exist
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRF

test(function () {
    check_constructor("AlarmRelative");
}, 'AlarmRelative_exist');

}

function AlarmRelative_extend() {

//==== TEST: AlarmRelative_extend
//==== LABEL Check if AlarmRelative possible extend
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:AlarmRelative U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX

test(function () {
    var alarm = createRelAlarm();
    check_extensibility(alarm);
}, 'AlarmRelative_extend');

}

function AlarmRelative_getRemainingSeconds() {

//==== TEST: AlarmRelative_getRemainingSeconds
//==== LABEL Check using getRemainingSeconds method
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:getRemainingSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MR MNA

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm, remainingSeconds, delay = 3600;
    alarm = new tizen.AlarmRelative(delay);
    tizen.alarm.add(alarm, APPLICATION_ID);
    remainingSeconds = alarm.getRemainingSeconds();
    assert_type(remainingSeconds, "long", "type of the returned value is not a number");
    assert_approx_equals(remainingSeconds, alarm.delay, 1, "the returned value is not properly");
}, 'AlarmRelative_getRemainingSeconds');

}

function AlarmRelative_getRemainingSeconds_exist() {

//==== TEST: AlarmRelative_getRemainingSeconds_exist
//==== LABEL Check if method getRemainingSeconds exists
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:getRemainingSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    var alarm = createRelAlarm();
    check_method_exists(alarm, "getRemainingSeconds");
}, 'AlarmRelative_getRemainingSeconds_exist');

}

function AlarmRelative_getRemainingSeconds_extra_argument() {

//==== TEST: AlarmRelative_getRemainingSeconds_extra_argument
//==== LABEL Check using getRemainingSeconds with extra argument
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:getRemainingSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MNAEX MR

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var i, alarm, remainingSeconds, delay = 3600,
        argumentsList = [null, undefined, "string", 1, false, ["one", "two"], {arg: 1}, function () {}];
    alarm = new tizen.AlarmRelative(delay);
    tizen.alarm.add(alarm, APPLICATION_ID);
    for (i = 0; i < argumentsList.length; i++) {
        remainingSeconds = alarm.getRemainingSeconds(argumentsList[i]);
        assert_type(remainingSeconds, "long", "type of the returned value is not a number");
        assert_approx_equals(remainingSeconds, alarm.delay, 1, "the returned value is not properly");
    }
}, 'AlarmRelative_getRemainingSeconds_extra_argument');

}

function AlarmRelative_getRemainingSeconds_return_null() {
//==== TEST: AlarmRelative_getRemainingSeconds_return_null
//==== LABEL Check if method AlarmRelative::getRemainingSeconds() return null for already fired alarm
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:getRemainingSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA MR MNA
//==== ONLOAD_DELAY 30

setup({timeout: 30000});

var t = async_test('AlarmRelative_getRemainingSeconds_return_null', {timeout: 30000}),
    alarm, returnedValue;

t.step(function () {
    alarm = new tizen.AlarmRelative(5);

    tizen.alarm.add(alarm, APPLICATION_ID);

    setTimeout(t.step_func(function () {
        returnedValue = alarm.getRemainingSeconds();
        assert_equals(returnedValue, null, "getRemainingSeconds do not returns null");
        t.done();
    }), 10000);
});

}

function AlarmRelative_period_attribute() {

//==== TEST: AlarmRelative_period_attribute
//==== LABEL Check period attribute in AlarmRelative
//==== SPEC Tizen Web API:Application:Alarm:AlarmRelative:period A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO ADV

test(function () {
    var alarm1, alarm2, delay = 3600, period = 60;
    alarm1 = new tizen.AlarmRelative(delay);
    assert_true("period" in alarm1, "attribute period doesn't exist in provided object");
    assert_type(alarm1.period, "null", "default value should be null");
    alarm2 = new tizen.AlarmRelative(delay, period);
    check_readonly(alarm2, "period", alarm2.period, "number", 120);
    assert_equals(alarm2.period, period, "period passed as constructor parameter is different than period in the object");
}, 'AlarmRelative_period_attribute');

}

function Alarm_id_attribute_absolute_alarm() {

//==== TEST: Alarm_id_attribute_absolute_alarm
//==== LABEL Check Alarm.id attribute of AlarmAbsolute
//==== SPEC Tizen Web API:Application:Alarm:Alarm:id A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm, date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    alarm = new tizen.AlarmAbsolute(date);
    assert_true("id" in alarm, "attribute id doesn't exist in provided object");
    assert_type(alarm.id, "null", "default value should be null");
    tizen.alarm.add(alarm, APPLICATION_ID);
    check_readonly(alarm, "id", alarm.id, "string", "dummyValue");
}, 'Alarm_id_attribute_absolute_alarm');

}

function Alarm_id_attribute_relative_alarm() {

//==== TEST: Alarm_id_attribute_relative_alarm
//==== LABEL Check Alarm.id attribute of AlarmRelative
//==== SPEC Tizen Web API:Application:Alarm:Alarm:id A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO

test(function () {
//    add_result_callback(function () {
//        try {
//            tizen.alarm.removeAll();
//        } catch (err) {
//            // do nothing in case removeAll throw an exception
//        }
//    });

    var alarm, delay = 3600;
    alarm = new tizen.AlarmRelative(delay);
    assert_true("id" in alarm, "attribute id doesn't exist in provided object");
    assert_type(alarm.id, "null", "default value should be null");
    tizen.alarm.add(alarm, APPLICATION_ID);
    check_readonly(alarm, "id", alarm.id, "string", "dummyValue");
}, 'Alarm_id_attribute_relative_alarm');

}

function Alarm_notexist() {

//==== TEST: Alarm_notexist
//==== LABEL Check if Alarm notexist
//==== SPEC Tizen Web API:Application:Alarm:Alarm:Alarm U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/alarm.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("Alarm");
}, 'Alarm_notexist');

}

var moduleName = "tct-alarm-tizen-tests";
add_test_case(moduleName, AlarmAbsolute_constructor_date);
add_test_case(moduleName, AlarmAbsolute_constructor_date_daysOfTheWeek);
add_test_case(moduleName, AlarmAbsolute_constructor_date_period);
add_test_case(moduleName, AlarmAbsolute_date_attribute);
add_test_case(moduleName, AlarmAbsolute_daysOfTheWeek_attribute);
add_test_case(moduleName, AlarmAbsolute_exist);
add_test_case(moduleName, AlarmAbsolute_extend);
add_test_case(moduleName, AlarmAbsolute_getNextScheduledDate);
add_test_case(moduleName, AlarmAbsolute_getNextScheduledDate_exist);
add_test_case(moduleName, AlarmAbsolute_getNextScheduledDate_extra_argument);
add_test_case(moduleName, AlarmAbsolute_getNextScheduledDate_return_null);
add_test_case(moduleName, AlarmAbsolute_period_attribute);
add_test_case(moduleName, AlarmManagerObject_notexist);
add_test_case(moduleName, AlarmManager_PERIOD_DAY_const);
add_test_case(moduleName, AlarmManager_PERIOD_HOUR_const);
add_test_case(moduleName, AlarmManager_PERIOD_MINUTE_const);
add_test_case(moduleName, AlarmManager_PERIOD_WEEK_const);
add_test_case(moduleName, AlarmManager_add_absolute_alarm);
add_test_case(moduleName, AlarmManager_add_absolute_alarm_with_appControl);
add_test_case(moduleName, AlarmManager_add_alarm_TypeMismatch);
add_test_case(moduleName, AlarmManager_add_appControl_TypeMismatch);
add_test_case(moduleName, AlarmManager_add_appControl_invalid);
add_test_case(moduleName, AlarmManager_add_appControl_invalid_obj);
add_test_case(moduleName, AlarmManager_add_exist);
add_test_case(moduleName, AlarmManager_add_missarg);
add_test_case(moduleName, AlarmManager_add_relative_alarm);
add_test_case(moduleName, AlarmManager_add_relative_alarm_with_appControl);
add_test_case(moduleName, AlarmManager_extend);
add_test_case(moduleName, AlarmManager_get);
add_test_case(moduleName, AlarmManager_getAll);
add_test_case(moduleName, AlarmManager_getAll_exist);
add_test_case(moduleName, AlarmManager_getAll_extra_argument);
add_test_case(moduleName, AlarmManager_get_AlarmRelative);
add_test_case(moduleName, AlarmManager_get_exist);
add_test_case(moduleName, AlarmManager_in_tizen);
add_test_case(moduleName, AlarmManager_notexist);
add_test_case(moduleName, AlarmManager_removeAll);
add_test_case(moduleName, AlarmManager_removeAll_exist);
add_test_case(moduleName, AlarmManager_removeAll_extra_argument);
add_test_case(moduleName, AlarmManager_remove_absolute_alarm);
add_test_case(moduleName, AlarmManager_remove_exist);
add_test_case(moduleName, AlarmManager_remove_relative_alarm);
add_test_case(moduleName, AlarmRelative_constructor_delay);
add_test_case(moduleName, AlarmRelative_constructor_delay_convert);
add_test_case(moduleName, AlarmRelative_constructor_delay_period);
add_test_case(moduleName, AlarmRelative_constructor_period_convert);
add_test_case(moduleName, AlarmRelative_delay_attribute);
add_test_case(moduleName, AlarmRelative_exist);
add_test_case(moduleName, AlarmRelative_extend);
add_test_case(moduleName, AlarmRelative_getRemainingSeconds);
add_test_case(moduleName, AlarmRelative_getRemainingSeconds_exist);
add_test_case(moduleName, AlarmRelative_getRemainingSeconds_extra_argument);
add_test_case(moduleName, AlarmRelative_getRemainingSeconds_return_null);
add_test_case(moduleName, AlarmRelative_period_attribute);
add_test_case(moduleName, Alarm_id_attribute_absolute_alarm);
add_test_case(moduleName, Alarm_id_attribute_relative_alarm);
add_test_case(moduleName, Alarm_notexist);
