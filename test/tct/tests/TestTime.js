/*
Copyright (c) 2012 Intel Corporation.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of works must retain the original copyright notice, this list
  of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the original copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.
* Neither the name of Intel Corporation nor the names of its contributors
  may be used to endorse or promote products derived from this work without
  specific prior written permission.

THIS SOFTWARE IS PROVIDED BY INTEL CORPORATION "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL INTEL CORPORATION BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Authors:


*/

var NOT_SUPPORTED_ERR     = "NotSupportedError";
var UNKNOWN_ERR           = "UnknownError";
var TYPE_MISMATCH_ERR     = "TypeMismatchError";
var INVALID_VALUES_ERR    = "InvalidValuesError";
var NOT_FOUND_ERR         = "NotFoundError";
var PERMISSION_DENIED_ERR = "SecurityError";
var IO_ERR                = "IOError";
var ERROR_STR             = "Error";
var ERROR_NUM             = 3;

var expected_year         = 2011;
var expected_month        = 10;
var expected_date         = 11;
var expected_hours        = 4;
var expected_minutes      = 55;
var expected_seconds      = 54;
var expected_milliseconds = 12;
var expected_time_zone    = "Asia/Seoul";//GMT+9
var expected_time_zone_offset = 9;

var date = new tizen.TZDate(
    expected_year,          //year
    expected_month,         //month
    expected_date,          //day
    expected_hours,         //hours
    expected_minutes,       //minutes
    expected_seconds,       //seconds
    expected_milliseconds,  //milliseconds
    expected_time_zone      //timeZone
);

var testAdditionalParamArray = [ERROR_NUM, null, undefined];

function Time_TZDate_toLocaleDateString() {
//==== TEST: Time_TZDate_toLocaleDateString
//==== LABEL Check if TZDate::ToLocaleDateString() method returns string
//==== SPEC Tizen Web API:System:Time:TZDate:toLocaleDateString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var tz = tizen.time.getCurrentDateTime(), ldateS;
    ldateS = tz.toLocaleDateString();
    assert_not_equals(ldateS, null, "null check");
    assert_type(ldateS, "string", "type check");
}, 'Time_TZDate_toLocaleDateString');

}

function Time_TZDate_getUTCSeconds() {
//==== TEST: Time_TZDate_getUTCSeconds
//==== LABEL Check if TZDate.getUTCSeconds() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date1 = new Date(),
        secs = tizen.time.getCurrentDateTime().getUTCSeconds(),
        date2 = new Date();
    assert_true(secs === date1.getUTCSeconds() || secs === date2.getUTCSeconds(), "seconds check");
}, 'Time_TZDate_getUTCSeconds');

}

function Time_TZDate_getHours() {
//==== TEST: Time_TZDate_getHours
//==== LABEL Check if TZDate.getHours() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), expHours, hours;

    expHours = myDate.getHours();
    hours = tizen.time.getCurrentDateTime().getHours();
    assert_equals(hours, expHours, "hours check");
}, 'Time_TZDate_getHours');

}

function Time_TZDate_getUTCMilliseconds() {
//==== TEST: Time_TZDate_getUTCMilliseconds
//==== LABEL Check if TZDate.getUTCMilliseconds() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), exputcMs, utcMs;

    exputcMs = myDate.getUTCMilliseconds();
    utcMs = tizen.time.getCurrentDateTime().getUTCMilliseconds();

    assert_approx_equals(utcMs, exputcMs, 10, "milliseconds check");
}, 'Time_TZDate_getUTCMilliseconds');

}

function Time_TZDate_toUTC() {
//==== TEST: Time_TZDate_toUTC
//==== LABEL Check if TZDate::toUTC() method returns string
//==== SPEC Tizen Web API:System:Time:TZDate:toUTC M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var utz, utzd, utzy, utzm, myDate, expUd, expUy, expUm;
    utz = tizen.time.getCurrentDateTime().toUTC();
    utzd = utz.getUTCDate();
    utzy = utz.getUTCFullYear();
    utzm = utz.getUTCMonth();
    myDate = new Date();
    expUd = myDate.getUTCDate();
    expUy = myDate.getUTCFullYear();
    expUm = myDate.getUTCMonth();
    assert_equals(utzd, expUd, "day check");
    assert_equals(utzy, expUy, "year check");
    assert_equals(utzm, expUm, "month check");
    assert_type(utzd, "long", "type getUTCDate check");
    assert_type(utzy, "long", "type getUTCFullYear check");
    assert_type(utzm, "long", "type getUTCMonth check");
}, 'Time_TZDate_toUTC');

}

function Time_TZDate_setSeconds_normal() {
//==== TEST: Time_TZDate_setSeconds_normal
//==== LABEL Check if TZDate.setSeconds() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setSecs = 35,
        dt = tizen.time.getCurrentDateTime(),
        secsAfterSet;

    dt.setSeconds(setSecs);
    secsAfterSet = dt.getSeconds();

    assert_equals(secsAfterSet, setSecs, "normal secs could be set correctly");
}, 'Time_TZDate_setSeconds_normal');

}

function Time_TZDate_earlierThan_true() {
//==== TEST: Time_TZDate_earlierThan_true
//==== LABEL Check if TZDate.earlierThan() with future date returns true
//==== SPEC Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var tzOther = tizen.time.getCurrentDateTime(), res;

    tzOther.setFullYear(tzOther.getFullYear() + 1);
    res = tizen.time.getCurrentDateTime().earlierThan(tzOther);

    assert_equals(res, true, "TZDate is earlier than another, result should be true");
}, 'Time_TZDate_earlierThan_true');

}

function Time_TZDate_difference_compareWithEqual() {
//==== TEST: Time_TZDate_difference_compareWithEqual
//==== LABEL Check if TZDate.difference() with equal dates works
//==== SPEC Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tzEqual = tizen.time.getCurrentDateTime(),
        tzEqual1, diff;

    tzEqual1 = tzEqual;
    diff = tzEqual1.difference(tzEqual);
    assert_equals(diff.length, 0, "time should be equal");
}, 'Time_TZDate_difference_compareWithEqual');

}

function Time_TZDate_setMilliseconds_normal() {
//==== TEST: Time_TZDate_setMilliseconds_normal
//==== LABEL Check if TZDate.setMilliseconds() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setMs = 555,
        dt = tizen.time.getCurrentDateTime(),
        msAfterSet;

    dt.setMilliseconds(setMs);
    msAfterSet = dt.getMilliseconds();
    assert_approx_equals(msAfterSet, setMs, 10, "getMilliseconds()");
}, 'Time_TZDate_setMilliseconds_normal');

}

function Time_TZDate_getUTCFullYear() {
//==== TEST: Time_TZDate_getUTCFullYear
//==== LABEL Check if TZDate.getUTCFullYear() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), expUTCFullYear, utcFullYear;

    expUTCFullYear = myDate.getUTCFullYear();
    utcFullYear = tizen.time.getCurrentDateTime().getUTCFullYear();

    assert_equals(utcFullYear, expUTCFullYear, "fullYear check");
}, 'Time_TZDate_getUTCFullYear');

}

function Time_TZDate_secondsFromUTC() {
//==== TEST: Time_TZDate_secondsFromUTC
//==== LABEL Check if TZDate.secondsFromUTC works properly
//==== SPEC Tizen Web API:System:Time:TZDate:secondsFromUTC M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var offset = tizen.time.getCurrentDateTime().secondsFromUTC(),
        myDate = new Date(), expOffset;

    expOffset = myDate.getTimezoneOffset() * 60;
    assert_equals(offset, expOffset, "secondsFromUTC check");
}, 'Time_TZDate_secondsFromUTC');

}

function Time_TZDate_toLocaleString() {
//==== TEST: Time_TZDate_toLocaleString
//==== LABEL Check if TZDate::ToLocaleString() method returns string
//==== SPEC Tizen Web API:System:Time:TZDate:toLocaleString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var tz = tizen.time.getCurrentDateTime(), localS;
    localS = tz.toLocaleString();
    assert_not_equals(localS, null, "null check");
    assert_type(localS, "string", "type check");
}, 'Time_TZDate_toLocaleString');

}

function Time_TZDate_setUTCFullYear_normal() {
//==== TEST: Time_TZDate_setUTCFullYear_normal
//==== LABEL Check if TZDate.setUTCFullYear() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCFullYear = 2008,
        dt = tizen.time.getCurrentDateTime(),
        yearAfterSet;

    dt.setUTCFullYear(setUTCFullYear);
    yearAfterSet = dt.getUTCFullYear();

    assert_equals(yearAfterSet, setUTCFullYear, "years should be equal");
}, 'Time_TZDate_setUTCFullYear_normal');

}

function Time_TZDate_setFullYear_normal() {
//==== TEST: Time_TZDate_setFullYear_normal
//==== LABEL Check if TZDate.setFullYear_normal() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setFullYear = 2008,
        tizenDate = tizen.time.getCurrentDateTime(),
        yearAfterSet;

    tizenDate.setFullYear(setFullYear);
    yearAfterSet = tizenDate.getFullYear();

    assert_equals(yearAfterSet, setFullYear, "year after set should be equal to set one");
}, 'Time_TZDate_setFullYear_normal');

}

function Time_TZDate_getMinutes() {
//==== TEST: Time_TZDate_getMinutes
//==== LABEL Check if TZDate.getMinutes() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), expMins, mins;

    expMins = myDate.getMinutes();
    mins = tizen.time.getCurrentDateTime().getMinutes();
    assert_equals(mins, expMins, "minutes check");
}, 'Time_TZDate_getMinutes');

}

function Time_TZDate_getPreviousDSTTransition() {
//==== TEST: Time_TZDate_getPreviousDSTTransition
//==== LABEL Check if TZDate.getPreviousDSTTransition() works properly
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:getPreviousDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2012, 12, 1, 1, 1, 1, 1, "Europe/Berlin"),
        prevTr, day, month;
    prevTr = td.getPreviousDSTTransition();
    day = prevTr.getDate();
    month = prevTr.getMonth();
    assert_equals(month, 9, "month check");
    assert_equals(day, 28, "day check");
}, 'Time_TZDate_getPreviousDSTTransition');

}

function Time_TZDate_setDate_normal() {
//==== TEST: Time_TZDate_setDate_normal
//==== LABEL Check if TZDate.setDate() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tz, setDate, expd;

    tz = tizen.time.getCurrentDateTime();
    setDate = 20;
    tz.setDate(setDate);
    expd = tz.getDate();

    assert_equals(expd, setDate, "expd check");
}, 'Time_TZDate_setDate_normal');

}

function Time_TZDate_setMinutes_normal() {
//==== TEST: Time_TZDate_setMinutes_normal
//==== LABEL Check if TZDate.setMinutes() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setMins = 29,
        dt = tizen.time.getCurrentDateTime(),
        minsAfterSet;

    dt.setMinutes(setMins);
    minsAfterSet = dt.getMinutes();

    assert_equals(minsAfterSet, setMins, "minutes should be equals");
}, 'Time_TZDate_setMinutes_normal');

}

function Time_TZDate_getTimezoneAbbreviation_summerMonth() {
//==== TEST: Time_TZDate_getTimezoneAbbreviation_summerMonth
//==== LABEL Check if TZDate.getTimezoneAbbreviation() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getTimezoneAbbreviation M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2013, 8, 1, 1, 1, 1, 1, "America/New_York");
    assert_equals(td.getTimezoneAbbreviation(), "EDT", "timezoneAbbreviation check");
}, 'Time_TZDate_getTimezoneAbbreviation_summerMonth');

}

function Time_TZDate_setUTCMilliseconds_normal() {
//==== TEST: Time_TZDate_setUTCMilliseconds_normal
//==== LABEL Check if TZDate.setUTCMilliseconds() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCMs = 1,
        dt = tizen.time.getCurrentDateTime(),
        utcMsAfterSet;

    dt.setUTCMilliseconds(setUTCMs);
    utcMsAfterSet = dt.getUTCMilliseconds();

    assert_equals(utcMsAfterSet, setUTCMs, "getUTCMilliseconds check");
}, 'Time_TZDate_setUTCMilliseconds_normal');

}

function Time_TZDate_toDateString() {
//==== TEST: Time_TZDate_toDateString
//==== LABEL Check if TZDate::ToDateString() method returns string
//==== PRIORITY P0
//==== SPEC Tizen Web API:System:Time:TZDate:toDateString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var tz = tizen.time.getCurrentDateTime(), dateS;
    dateS = tz.toDateString();
    assert_not_equals(dateS, null, "null check");
    assert_type(dateS, "string", "type check");
}, 'Time_TZDate_toDateString');

}

function Time_TZDate_getTimezone() {
//==== TEST: Time_TZDate_getTimezone
//==== LABEL Check if TZDate.getTimezone() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var tzs = tizen.time.getCurrentDateTime().getTimezone();
    assert_regexp_match(tzs, /(.+?)\/(.+?)/, "timezone check");
}, 'Time_TZDate_getTimezone');

}

function Time_TZDate_toTimeString() {
//==== TEST: Time_TZDate_toTimeString
//==== LABEL Check if TZDate::ToTimeString() method returns string
//==== SPEC Tizen Web API:System:Time:TZDate:toTimeString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var tz = tizen.time.getCurrentDateTime(), timeS;
    timeS = tz.toTimeString();
    assert_not_equals(timeS, null, "null check");
    assert_type(timeS, "string", "type check");
}, 'Time_TZDate_toTimeString');

}

function Time_TZDate_toString() {
//==== TEST: Time_TZDate_toString
//==== LABEL Check if TZDate::ToString() method returns string
//==== SPEC Tizen Web API:System:Time:TZDate:toString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var tz = tizen.time.getCurrentDateTime(), toS;
    toS = tz.toString();
    assert_not_equals(toS, null, "null check");
    assert_type(toS, "string", "type check");
}, 'Time_TZDate_toString');

}

function Time_TZDate_getUTCHours() {
//==== TEST: Time_TZDate_getUTCHours
//==== LABEL Check if TZDate.getUTCHours() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), expUTCHours, utcHours;

    expUTCHours = myDate.getUTCHours();
    utcHours = tizen.time.getCurrentDateTime().getUTCHours();

    assert_equals(utcHours, expUTCHours, "hours check");
}, 'Time_TZDate_getUTCHours');

}

function Time_TZDate_setUTCMinutes_normal() {
//==== TEST: Time_TZDate_setUTCMinutes_normal
//==== LABEL Check if TZDate.setUTCMinutes() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCMins = 31,
        dt = tizen.time.getCurrentDateTime(),
        utcMinsAfterSet;

    dt.setUTCMinutes(setUTCMins);
    utcMinsAfterSet  = dt.getUTCMinutes();

    assert_equals(utcMinsAfterSet, setUTCMins, "minutes should be equal");
}, 'Time_TZDate_setUTCMinutes_normal');

}

function Time_TZDate_getDay() {
//==== TEST: Time_TZDate_getDay
//==== LABEL Check if TZDate.getDay() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getDay M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(),
        expDay, day;

    expDay = myDate.getDay();
    day = tizen.time.getCurrentDateTime().getDay();
    assert_equals(day, expDay, "day check");
}, 'Time_TZDate_getDay');

}

function Time_TZDate_setUTCMonth_normal() {
//==== TEST: Time_TZDate_setUTCMonth_normal
//==== LABEL Check if TZDate.setUTCMonth() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCMonth = 6, dt, utcMonthAfterSet;
    dt = tizen.time.getCurrentDateTime();
    dt.setUTCMonth(setUTCMonth);
    utcMonthAfterSet = dt.getUTCMonth();
    assert_equals(utcMonthAfterSet, setUTCMonth, "normal UTCMonth could be set correctly");
}, 'Time_TZDate_setUTCMonth_normal');

}

function Time_TZDate_getUTCDay() {
//==== TEST: Time_TZDate_getUTCDay
//==== LABEL Check if TZDate.getUTCDay() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCDay M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), exputcday, utcday;

    exputcday = myDate.getUTCDay();
    utcday = tizen.time.getCurrentDateTime().getUTCDay();

    assert_equals(utcday, exputcday, "day check");
}, 'Time_TZDate_getUTCDay');

}

function Time_TZDate_getMilliseconds() {
//==== TEST: Time_TZDate_getMilliseconds
//==== LABEL Check if TZDate.getMilliseconds() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), expMs, ms;

    expMs = myDate.getMilliseconds();
    ms = tizen.time.getCurrentDateTime().getMilliseconds();
    assert_approx_equals(ms, expMs, 10, "getMilliseconds()");
}, 'Time_TZDate_getMilliseconds');

}

function Time_TZDate_getUTCMinutes() {
//==== TEST: Time_TZDate_getUTCMinutes
//==== LABEL Check if TZDate.getUTCMinutes() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), exputcMins, utcMins;

    exputcMins = myDate.getUTCMinutes();
    utcMins = tizen.time.getCurrentDateTime().getUTCMinutes();

    assert_equals(utcMins, exputcMins, "minutes check");
}, 'Time_TZDate_getUTCMinutes');

}

function Time_TZDate_laterThan_true() {
//==== TEST: Time_TZDate_laterThan_true
//==== LABEL Check if TZDate.laterThan() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var tzOther = tizen.time.getCurrentDateTime(),
        tzyCur, tzyOther, res;

    tzyCur = tzOther.getFullYear();
    tzOther.setFullYear(tzOther.getFullYear() - 1);
    tzyOther = tzOther.getFullYear();
    res = tizen.time.getCurrentDateTime().laterThan(tzOther);

    assert_equals(tzyCur-1, tzyOther, "laterThan check");
    assert_true(res, "laterThan check");
}, 'Time_TZDate_laterThan_true');

}

function Time_TZDate_equalsTo_equal() {
//==== TEST: Time_TZDate_equalsTo_equal
//==== LABEL Check if TZDate.equalsTo() called with equal object returns true
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var tzEqual, tzEqual1, res;

    tzEqual = tizen.time.getCurrentDateTime();
    tzEqual1 = tzEqual;
    res = tzEqual1.equalsTo(tzEqual);
    assert_equals(res, true, "Two same tzDate obj compare result should be true");
}, 'Time_TZDate_equalsTo_equal');

}

function Time_TZDate_getMonth() {
//==== TEST: Time_TZDate_getMonth
//==== LABEL Check if TZDate.getMonth() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), expMonth, month;
    expMonth = myDate.getMonth();
    month = tizen.time.getCurrentDateTime().getMonth();
    assert_equals(month, expMonth, "month check");
}, 'Time_TZDate_getMonth');

}

function Time_TZDate_getNextDSTTransition() {
//==== TEST: Time_TZDate_getNextDSTTransition
//==== LABEL Check if TZDate.getNextDSSTTransition() works properly
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:getNextDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2012, 1, 1, 1, 1, 1, 1, "Europe/Berlin"),
        nextTr, day, month;

    nextTr = td.getNextDSTTransition();
    day = nextTr.getDate();
    month = nextTr.getMonth();
    assert_equals(month, 2, "month check");
    assert_equals(day, 25, "day check");
}, 'Time_TZDate_getNextDSTTransition');

}

function Time_TZDate_getUTCMonth() {
//==== TEST: Time_TZDate_getUTCMonth
//==== LABEL Check if TZDate.getUTCMonth() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), expUTCMonth, utcMonth;

    expUTCMonth = myDate.getUTCMonth();
    utcMonth = tizen.time.getCurrentDateTime().getUTCMonth();

    assert_equals(utcMonth, expUTCMonth, "month check");
}, 'Time_TZDate_getUTCMonth');

}

function Time_TZDate_toTimezone() {
//==== TEST: Time_TZDate_toTimezone
//==== LABEL Check if TZDate::toTimezone() method returns string
//==== SPEC Tizen Web API:System:Time:TZDate:toTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var tzID = "Asia/Shanghai", tz;
    tz = tizen.time.getCurrentDateTime().toTimezone(tzID);
    assert_equals(tz.getTimezone(), tzID, "check getTimezone");
    assert_type(tz.getTimezone(), "string", "type check");
}, 'Time_TZDate_toTimezone');

}

function Time_TZDate_isDST_true() {
//==== TEST: Time_TZDate_isDST_true
//==== LABEL Check if TZDate.isDST() returns true on DST date
//==== SPEC Tizen Web API:System:Time:TZDate:isDST M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2012, 5, 1, 1, 1, 1, 1, "Europe/Berlin");
    assert_true(td.isDST(), "isDST check");
}, 'Time_TZDate_isDST_true');

}

function Time_TZDate_setUTCSeconds_normal() {
//==== TEST: Time_TZDate_setUTCSeconds_normal
//==== LABEL Check if TZDate.setUTCSeconds() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCSecs = 35, dt, utcSecsAfterSet;
    dt = tizen.time.getCurrentDateTime();
    dt.setUTCSeconds(setUTCSecs);
    utcSecsAfterSet = dt.getUTCSeconds();
    assert_equals(utcSecsAfterSet, setUTCSecs, "normal UTCSecs could be set correctly");
    assert_type(utcSecsAfterSet, "long", "type check");
}, 'Time_TZDate_setUTCSeconds_normal');

}

function Time_TZDate_getUTCDate() {
//==== TEST: Time_TZDate_getUTCDate
//==== LABEL Check if TZDate.getUTCDate() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), expUTCdate, actUTCdate;

    expUTCdate = myDate.getUTCDate();
    actUTCdate = tizen.time.getCurrentDateTime().getUTCDate();

    assert_equals(actUTCdate, expUTCdate, "date check");
}, 'Time_TZDate_getUTCDate');

}

function Time_TZDate_toLocaleTimeString() {
//==== TEST: Time_TZDate_toLocaleTimeString
//==== LABEL Check if TZDate::ToLocaleTimeString() method returns string
//==== SPEC Tizen Web API:System:Time:TZDate:toLocaleTimeString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var tz = tizen.time.getCurrentDateTime(), ltimeS;
    ltimeS = tz.toLocaleTimeString();
    assert_not_equals(ltimeS, null, "null check");
    assert_type(ltimeS, "string", "type check");
}, 'Time_TZDate_toLocaleTimeString');

}

function Time_TZDate_setMonth_normal() {
//==== TEST: Time_TZDate_setMonth_normal
//==== LABEL Check if TZDate.setMonth() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setMonth = 6,
        dt = tizen.time.getCurrentDateTime(),
        monthAfterSet;

    dt.setMonth(setMonth);
    monthAfterSet = dt.getMonth();

    assert_equals(monthAfterSet, setMonth, "normal month could be set correctly");
}, 'Time_TZDate_setMonth_normal');

}

function Time_TZDate_setUTCHours_normal() {
//==== TEST: Time_TZDate_setUTCHours_normal
//==== LABEL Check if TZDate.setUTCHours() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCHours = 15,
        dt = tizen.time.getCurrentDateTime(),
        utcHoursAfterSet;

    dt.setUTCHours(setUTCHours);
    utcHoursAfterSet = dt.getUTCHours();

    assert_equals(utcHoursAfterSet, setUTCHours, "hours should be equal");
}, 'Time_TZDate_setUTCHours_normal');

}

function Time_TZDate_getSeconds() {
//==== TEST: Time_TZDate_getSeconds
//==== LABEL Check if TZDate.getSeconds() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date1 = new Date(),
        secs = tizen.time.getCurrentDateTime().getSeconds(),
        date2 = new Date();
    assert_true(secs === date1.getSeconds() || secs === date2.getSeconds(), "seconds check");
}, 'Time_TZDate_getSeconds');

}

function Time_TZDate_getDate() {
//==== TEST: Time_TZDate_getDate
//==== LABEL Check if TZDate.getDate() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var actDate = tizen.time.getCurrentDateTime().getDate(),
        myDate = new Date(), expDate;

    expDate = myDate.getDate();
    assert_equals(actDate, expDate, "data check");
}, 'Time_TZDate_getDate');

}

function Time_TZDate_getFullYear() {
//==== TEST: Time_TZDate_getFullYear
//==== LABEL Check if TZDate.getFullYear() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:getFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var myDate = new Date(), expFullYear, fullYear;

    expFullYear = myDate.getFullYear();
    fullYear = tizen.time.getCurrentDateTime().getFullYear();
    assert_equals(fullYear, expFullYear, "fullYear check");
}, 'Time_TZDate_getFullYear');

}

function Time_TZDate_setHours_normal() {
//==== TEST: Time_TZDate_setHours_normal
//==== LABEL Check if TZDate.setHours() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setHours = 15,
        tizenDate = tizen.time.getCurrentDateTime(),
        hoursAfterSet;

    tizenDate.setHours(setHours);
    hoursAfterSet = tizenDate.getHours();
    assert_equals(hoursAfterSet, setHours, "hours should be set");
}, 'Time_TZDate_setHours_normal');

}

function Time_TZDate_setUTCDate_normal() {
//==== TEST: Time_TZDate_setUTCDate_normal
//==== LABEL Check if TZDate.setUTCDate() works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCdate = 11,
        tizenDate = tizen.time.getCurrentDateTime(),
        utcdateAfterSet;

    tizenDate.setUTCDate(setUTCdate);
    utcdateAfterSet = tizenDate.getUTCDate();

    assert_equals(utcdateAfterSet, setUTCdate, "dates should be equal");
}, 'Time_TZDate_setUTCDate_normal');

}

function Time_TZDate_difference_compareWithFutureDate() {
//==== TEST: Time_TZDate_difference_compareWithFutureDate
//==== LABEL Check if TZDate.difference() with future date works
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tzNow = new tizen.TZDate(2013, 1, 8),
        tzFuture = new tizen.TZDate(2013, 1, 10),
        diff;

    diff = tzNow.difference(tzFuture);
    assert_equals(diff.length, -2, "diff.length check");
    assert_equals(diff.unit, "DAYS", "diff.unit check");
}, 'Time_TZDate_difference_compareWithFutureDate');

}

function Time_TZDate_difference_compareWithFutureHour() {
//==== TEST: Time_TZDate_difference_compareWithFutureHour
//==== LABEL Check if TZDate.difference() with date hour later works
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tzNow = new tizen.TZDate(2013, 1, 8, 5),
        tzFuture = new tizen.TZDate(2013, 1, 8, 6),
        diff;

    diff = tzNow.difference(tzFuture);
    assert_equals(diff.length, -3600000, "diff.unit check");
    assert_equals(diff.unit, "MSECS", "diff.unit check");
}, 'Time_TZDate_difference_compareWithFutureHour');

}

function Time_TZDate_difference_compareWithFutureSeconds() {
//==== TEST: Time_TZDate_difference_compareWithFutureSeconds
//==== LABEL Check if TZDate.difference() with date seconds later works
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tzNow = new tizen.TZDate(2013, 1, 8, 12, 20, 30),
        tzFuture = new tizen.TZDate(2013, 1, 8, 12, 20, 50),
        diff;

    diff = tzNow.difference(tzFuture);
    assert_equals(diff.length, -20000, "diff.length check");
    assert_equals(diff.unit, "MSECS", "diff.unit check");
}, 'Time_TZDate_difference_compareWithFutureSeconds');

}

function Time_TZDate_difference_compareWithFutureYear() {
//==== TEST: Time_TZDate_difference_compareWithFutureYear
//==== LABEL Check if TZDate.difference() with date one year later works
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tzNow = new tizen.TZDate(2001, 1, 8),
        tzFuture = new tizen.TZDate(2002, 1, 8),
        diff;

    diff = tzNow.difference(tzFuture);
    assert_equals(diff.length, -365, "diff.length check");
    assert_equals(diff.unit, "DAYS", "diff.unit check");
}, 'Time_TZDate_difference_compareWithFutureYear');

}

function Time_TZDate_difference_compareWithCharacter() {
//==== TEST: Time_TZDate_difference_compareWithCharacter
//==== LABEL Check if TZDate.difference() with wrong string argument throws exception
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.time.getCurrentDateTime().difference("abcd");
        }, "Specific TypeMismatchError exception.");
}, 'Time_TZDate_difference_compareWithCharacter');

}

function Time_TZDate_earlierThan_falseEqual() {
//==== TEST: Time_TZDate_earlierThan_falseEqual
//==== LABEL Check if TZDate.earlierThan() with same date returns false
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var tzOther = tizen.time.getCurrentDateTime(), res;

    res = tzOther.earlierThan(tzOther);
    assert_equals(res, false, "TZDate is equal to another, result should be false");
}, 'Time_TZDate_earlierThan_falseEqual');

}

function Time_TZDate_earlierThan_falseLater() {
//==== TEST: Time_TZDate_earlierThan_falseLater
//==== LABEL Check if TZDate.earlierThan() with past date returns false
//==== SPEC Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var tzOther, tzyCur, tzyOther, res;

    tzOther = tizen.time.getCurrentDateTime();
    tzyCur = tzOther.getFullYear();
    tzOther.setFullYear(tzyCur - 1);
    tzyOther = tzOther.getFullYear();
    res = tizen.time.getCurrentDateTime().earlierThan(tzOther);

    assert_equals(tzyCur - 1, tzyOther, "getFullYear check");
    assert_equals(res, false, "TZDate is later than another, result should be false");
}, 'Time_TZDate_earlierThan_falseLater');

}

function Time_TZDate_earlierThan_stringTZDate() {
//==== TEST: Time_TZDate_earlierThan_stringTZDate
//==== LABEL Check if TZDate.earlierThan() with string representation of date throws an error
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    var tzStr = tizen.time.getCurrentDateTime().toString();
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.time.getCurrentDateTime().earlierThan(tzStr);
        }, "Specific TypeMismatchError exception.");
}, 'Time_TZDate_earlierThan_stringTZDate');

}

function Time_TZDate_earlierThan_number() {
//==== TEST: Time_TZDate_earlierThan_number
//==== LABEL Check if TZDate.earlierThan() with number argument throws an error
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.time.getCurrentDateTime().earlierThan(123);
        }, "Specific TypeMismatchError exception.");
}, 'Time_TZDate_earlierThan_number');

}

function Time_TZDate_earlierThan_character() {
//==== TEST: Time_TZDate_earlierThan_character
//==== LABEL Check if TZDate.earlierThan() with wrong string argument throws an exception
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.time.getCurrentDateTime().earlierThan("abcd");
        }, "Specific TypeMismatchError exception.");
}, 'Time_TZDate_earlierThan_character');

}

function Time_TZDate_earlierThan_timezone() {
//==== TEST: Time_TZDate_earlierThan_timezone
//==== LABEL Check if TZDate.earlierThan() with past date converted to local timezone returns true
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tzOther = tizen.time.getCurrentDateTime().toLocalTimezone(),
        res = tizen.time.getCurrentDateTime().earlierThan(tzOther);

    assert_false(res, "earlierThan check");
}, 'Time_TZDate_earlierThan_timezone');

}

function Time_TZDate_equalsTo_diff() {
//==== TEST: Time_TZDate_equalsTo_diff
//==== LABEL Check if TZDate.equalsTo() called with different object returns false
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var tzDiff, tzyCur, res;

    tzDiff = tizen.time.getCurrentDateTime();
    tzyCur = tzDiff.getFullYear();
    tzDiff.setFullYear(tzyCur - 1);
    res = tizen.time.getCurrentDateTime().equalsTo(tzDiff);

    assert_equals(res, false, "Two different tzDate obj compare should be different.");
}, 'Time_TZDate_equalsTo_diff');

}

function Time_TZDate_equalsTo_number() {
//==== TEST: Time_TZDate_equalsTo_number
//==== LABEL Check if TZDate.equalsTo() with number argument throws an exception
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.time.getCurrentDateTime().equalsTo(123);
        }, "Specific TypeMismatchError exception.");
}, 'Time_TZDate_equalsTo_number');

}

function Time_TZDate_equalsTo_character() {
//==== TEST: Time_TZDate_equalsTo_character
//==== LABEL Check if TZDate.equalsTo() with string argument throws an exception
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.time.getCurrentDateTime().equalsTo("abcd");
        }, "Specific TypeMismatchError exception.");
}, 'Time_TZDate_equalsTo_character');

}

function Time_TZDate_laterThan_falseEarlier() {
//==== TEST: Time_TZDate_laterThan_falseEarlier
//==== LABEL Check if TZDate.laterThan() with future date returns false
//==== SPEC Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var tzOther = tizen.time.getCurrentDateTime(),
        tzyCur, tzyOther, res;

    tzyCur = tzOther.getFullYear();
    tzOther.setFullYear(tzOther.getFullYear() + 1);
    tzyOther = tzOther.getFullYear();
    res = tizen.time.getCurrentDateTime().laterThan(tzOther);

    assert_equals(tzyCur+1, tzyOther, "laterThan check");
    assert_false(res, "TZDate is earlier than another, result should be false");
}, 'Time_TZDate_laterThan_falseEarlier');

}

function Time_TZDate_laterThan_falseEqual() {
//==== TEST: Time_TZDate_laterThan_falseEqual
//==== LABEL Check if TZDate.laterThan() with same date returns false
//==== SPEC Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var td1 = new tizen.TZDate(2012, 5, 1, 1, 1, 1, 1),
        td2 = new tizen.TZDate(2012, 5, 1, 1, 1, 1, 1);
    assert_false(td2.laterThan(td1), "date should not be later than the same date");
}, 'Time_TZDate_laterThan_falseEqual');

}

function Time_TZDate_laterThan_number() {
//==== TEST: Time_TZDate_laterThan_number
//==== LABEL Check if TZDate.laterThan() with wrong number argument throws an exception
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.time.getCurrentDateTime().laterThan(123);
        }, "Specific TypeMismatchError exception.");
}, 'Time_TZDate_laterThan_number');

}

function Time_TZDate_laterThan_character() {
//==== TEST: Time_TZDate_laterThan_character
//==== LABEL Check if TZDate.laterThan() with wrong string argument throws an exception
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.time.getCurrentDateTime().laterThan("abcd");
        }, "Specific TypeMismatchError exception.");
}, 'Time_TZDate_laterThan_character');

}

function Time_TZDate_laterThan_timezone() {
//==== TEST: Time_TZDate_laterThan_timezone
//==== LABEL Check if TZDate.laterThan() works properly with local timezone
//==== SPEC Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var tzOther = tizen.time.getCurrentDateTime().toLocalTimezone(),
        tz = tizen.time.getCurrentDateTime(), res;

    tz.setSeconds(tz.getSeconds() + 1);
    res = tz.laterThan(tzOther);

    assert_true(res, "laterThan check");
}, 'Time_TZDate_laterThan_timezone');

}

function Time_TZDate_setDate_abnormalDecimal() {
//==== TEST: Time_TZDate_setDate_abnormalDecimal
//==== LABEL Check if TZDate.setDate() works properly with abnormal decimal as argument
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setDate = 15.5,
        tz = tizen.time.getCurrentDateTime(),
        expD;

    tz.setDate(setDate);
    expD = tz.getDate();

    assert_not_equals(expD, setDate, "decimal 15.5 shouldn't be set to system date");
}, 'Time_TZDate_setDate_abnormalDecimal');

}

function Time_TZDate_setDate_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setDate_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setDate() called with number bigger than upper boundary doesn't set the date
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setDate = 32, tz, afterDate;

    tz = tizen.time.getCurrentDateTime();
    tz.setDate(setDate);
    afterDate = tz.getDate();

    assert_not_equals(afterDate, setDate, "32 shouldn't be set to system date");
}, 'Time_TZDate_setDate_boundaryBiggerThanUpper');

}

function Time_TZDate_setDate_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setDate_boundaryLessThanLower
//==== LABEL Check if TZDate.setDate() called with number less than lower boundary doesn't set the date
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setDate = -1, tz, afterDate;

    tz = tizen.time.getCurrentDateTime();
    tz.setDate(setDate);
    afterDate = tz.getDate();

    assert_not_equals(afterDate, setDate, "-1 shouldn't be set to system date");
}, 'Time_TZDate_setDate_boundaryLessThanLower');

}

function Time_TZDate_setDate_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setDate_boundaryLowerLimit
//==== LABEL Check if TZDate.setDate() with argument equal to lower boundary works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setDate = 1,
        tz = tizen.time.getCurrentDateTime(),
        dateAfterSet;

    tz.setDate(setDate);
    dateAfterSet = tz.getDate();

    assert_equals(dateAfterSet, setDate, "getDate check");
}, 'Time_TZDate_setDate_boundaryLowerLimit');

}

function Time_TZDate_setDate_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setDate_boundaryUpperLimit
//==== LABEL Check if TZDate.setDate() with argument equal to upper boundary works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setMonth = 7, setDate = 31,
        tz = tizen.time.getCurrentDateTime(),
        monthAfterSet, dateAfterSet;

    tz.setMonth(setMonth);
    tz.setDate(setDate);
    monthAfterSet = tz.getMonth();
    dateAfterSet = tz.getDate();

    assert_equals(monthAfterSet, setMonth, "monthAfterSet check");
    assert_equals(dateAfterSet, setDate, "dateAfterSet check");
}, 'Time_TZDate_setDate_boundaryUpperLimit');

}

function Time_TZDate_setDate_invalidDate() {
//==== TEST: Time_TZDate_setDate_invalidDate
//==== LABEL Check if TZDate.setDate() called with wrong string argument doesn't set the date
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setDate = "a", dateAfterSet,
        tz = tizen.time.getCurrentDateTime();

    tz.setDate(setDate);
    dateAfterSet = tz.getDate();

    assert_not_equals(dateAfterSet, setDate, "a shouldn't be set to system date");
}, 'Time_TZDate_setDate_invalidDate');

}

function Time_TZDate_setDate_notExistDayForCertainMonth() {
//==== TEST: Time_TZDate_setDate_notExistDayForCertainMonth
//==== LABEL Check if TZDate.setDate() called with date grater than days in the month sets the next month date
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST
test(function () {
    var setYear = 2013, setMonth = 5, setDate = 30,
        tz, yearAfterSet, monthAfterSet, dateAfterSet;

    tz = new tizen.TZDate(setYear, setMonth, setDate);
    tz.setDate(31);

    yearAfterSet = tz.getFullYear();
    monthAfterSet = tz.getMonth();
    dateAfterSet = tz.getDate();

    assert_equals(yearAfterSet, setYear, "year should not change");
    assert_equals(monthAfterSet, setMonth + 1, "month should be a next month");
    assert_equals(dateAfterSet, 1, "date should be 1");
}, 'Time_TZDate_setDate_notExistDayForCertainMonth');

}

function Time_TZDate_setDate_notExistDayForFebruaryLeapYear() {
//==== TEST: Time_TZDate_setDate_notExistDayForFebruaryLeapYear
//==== LABEL Check if TZDate.setDate() called with argument with non existing date leap year, sets the next month date
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setYear = 2000, setMonth = 1, setDate = 29,
        myDate, yearAfterSet, monthAfterSet, dateAfterSet;

    myDate = new tizen.TZDate(setYear, setMonth, setDate);
    myDate.setUTCDate(30);

    yearAfterSet = myDate.getUTCFullYear();
    monthAfterSet = myDate.getUTCMonth();
    dateAfterSet = myDate.getUTCDate();

    assert_equals(yearAfterSet, setYear, "years should be equal");
    assert_equals(monthAfterSet, setMonth + 1, "month should be next-one");
    assert_equals(dateAfterSet, 1, "date should be 1st");
}, 'Time_TZDate_setDate_notExistDayForFebruaryLeapYear');

}

function Time_TZDate_setDate_notExistDayForFebruaryNotLeapYear() {
//==== TEST: Time_TZDate_setDate_notExistDayForFebruaryNotLeapYear
//==== LABEL Check if TZDate.setDate() called with argument with non existing date non-leap year, sets the next month date
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setYear = 2001, // non-leap year
        setMonth = 1, setDate = 28,
        myDate, yearAfterSet, monthAfterSet, dateAfterSet;

    myDate = new tizen.TZDate(setYear, setMonth, setDate);
    myDate.setUTCDate(29);

    yearAfterSet = myDate.getUTCFullYear();
    monthAfterSet = myDate.getUTCMonth();
    dateAfterSet = myDate.getUTCDate();

    assert_equals(yearAfterSet, setYear, "years should be equal");
    assert_equals(monthAfterSet, setMonth + 1, "month should be next-one");
    assert_equals(dateAfterSet, 1, "date should be 1st");
}, 'Time_TZDate_setDate_notExistDayForFebruaryNotLeapYear');

}

function Time_TZDate_setFullYear_abnormalDecimal() {
//==== TEST: Time_TZDate_setFullYear_abnormalDecimal
//==== LABEL Check if TZDate.setFullYear() sets proper year when argument is a floating point number
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setFullYear = 1998.55,
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet, myDate, expFullYear;

    tz.setFullYear(setFullYear);
    yearAfterSet = tz.getFullYear();
    myDate = new Date();
    expFullYear = myDate.getFullYear();

    assert_not_equals(yearAfterSet, expFullYear, "years should not be equal");
    assert_not_equals(yearAfterSet, setFullYear, "years should be integer number");
}, 'Time_TZDate_setFullYear_abnormalDecimal');

}

function Time_TZDate_setFullYear_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setFullYear_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setFullYear() called with year greater than upper boundary works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setFullYear = 10000,
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet, myDate, expFullYear;

    tz.setFullYear(setFullYear);
    yearAfterSet = tz.getFullYear();
    myDate = new Date();
    expFullYear = myDate.getFullYear();

    assert_not_equals(yearAfterSet, expFullYear, "years should change");
    assert_equals(yearAfterSet, setFullYear, "years should be equal");
}, 'Time_TZDate_setFullYear_boundaryBiggerThanUpper');

}

function Time_TZDate_setFullYear_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setFullYear_boundaryLowerLimit
//==== LABEL Check if TZDate.setFullYear() called with the lowest possible value don't set the year
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setFullYear = 1,
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet, myDate, expFullYear;

    tz.setFullYear(setFullYear);
    yearAfterSet = tz.getFullYear();
    myDate = new Date();
    expFullYear = myDate.getFullYear();

    assert_not_equals(expFullYear, yearAfterSet, "1 is a invalid year");
}, 'Time_TZDate_setFullYear_boundaryLowerLimit');

}

function Time_TZDate_setFullYear_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setFullYear_boundaryUpperLimit
//==== LABEL Check if TZDate.setHours() called with the highest possible value works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setFullYear = 9999,
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet, myDate, expFullYear;

    tz.setFullYear(setFullYear);
    yearAfterSet = tz.getFullYear();
    myDate = new Date();
    expFullYear = myDate.getFullYear();

    assert_not_equals(yearAfterSet, expFullYear, "years should be not equal");
    assert_equals(yearAfterSet, setFullYear, "year should be current one");
}, 'Time_TZDate_setFullYear_boundaryUpperLimit');

}

function Time_TZDate_setFullYear_invalidYear() {
//==== TEST: Time_TZDate_setFullYear_invalidYear
//==== LABEL Check if TZDate.setFullYear() do not set the invalid date
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setFullYear = -1, myDate = new Date(), expFullYear;

    expFullYear = myDate.getFullYear();

    assert_not_equals(expFullYear, setFullYear, "-1 is a invalid year");
}, 'Time_TZDate_setFullYear_invalidYear');

}

function Time_TZDate_setFullYear_invalidCharYear() {
//==== TEST: Time_TZDate_setFullYear_invalidCharYear
//==== LABEL Check if TZDate.setFullYear() called with invalid string argument works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setFullYear = "a",
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet, myDate, expFullYear;

    tz.setFullYear(setFullYear);
    yearAfterSet = tz.getFullYear();
    myDate = new Date();
    expFullYear = myDate.getFullYear();

    assert_not_equals(yearAfterSet, expFullYear, "expFullYear check");
    assert_not_equals(yearAfterSet, setFullYear, "setFullYear check");
}, 'Time_TZDate_setFullYear_invalidCharYear');

}

function Time_TZDate_setHours_abnormalDecimal() {
//==== TEST: Time_TZDate_setHours_abnormalDecimal
//==== LABEL Check if TZDate.setHours() doesn't set decimal number
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setHours = 8.45,
        tz = tizen.time.getCurrentDateTime(),
        myDate, hoursAfterSet;

    tz.setHours(setHours);
    myDate = new Date();
    hoursAfterSet = myDate.getHours();
    assert_not_equals(hoursAfterSet, setHours, "decimal shouldn't be set to system's hour");
}, 'Time_TZDate_setHours_abnormalDecimal');

}

function Time_TZDate_setHours_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setHours_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setHours() doesn't set hour greater than 23
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setHours = 24,
        tz = tizen.time.getCurrentDateTime(),
        myDate, hoursAfterSet;

    tz.setHours(setHours);
    myDate = new Date();
    hoursAfterSet = myDate.getHours();

    assert_not_equals(hoursAfterSet, setHours, "24 shouldn't be set to system's hour");
}, 'Time_TZDate_setHours_boundaryBiggerThanUpper');

}

function Time_TZDate_setHours_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setHours_boundaryLessThanLower
//==== LABEL Check if TZDate.setHours() doesn't set hour less than 0
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setHours = -1,
        tz = tizen.time.getCurrentDateTime(),
        myDate, hoursAfterSet;

    tz.setHours(setHours);
    myDate = new Date();
    hoursAfterSet = myDate.getHours();

    assert_not_equals(hoursAfterSet, setHours, "-1 shouldn't be set to system's hour");
}, 'Time_TZDate_setHours_boundaryLessThanLower');

}

function Time_TZDate_setHours_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setHours_boundaryLowerLimit
//==== LABEL Check if TZDate.setHours() called with the lowest possible value works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setHours = 0,
        tz = tizen.time.getCurrentDateTime(),
        hoursAfterSet;

    tz.setHours(setHours);
    hoursAfterSet = tz.getHours();
    assert_equals(hoursAfterSet, setHours, "hours should be set");
}, 'Time_TZDate_setHours_boundaryLowerLimit');

}

function Time_TZDate_setHours_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setHours_boundaryUpperLimit
//==== LABEL Check if TZDate.setHours() called with the greatest possible value works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setHours = 23,
        tz = tizen.time.getCurrentDateTime(),
        hoursAfterSet;

    tz.setHours(setHours);
    hoursAfterSet = tz.getHours();
    assert_equals(hoursAfterSet, setHours, "hours should be set");
}, 'Time_TZDate_setHours_boundaryUpperLimit');

}

function Time_TZDate_setHours_invalidHours() {
//==== TEST: Time_TZDate_setHours_invalidHours
//==== LABEL Check if TZDate.setHours() called with wrong string argument doesn't set the hours
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setHours = "abcd",
        tz = tizen.time.getCurrentDateTime(),
        hoursAfterSet;

    tz.setHours(setHours);
    hoursAfterSet = tz.getHours();
    assert_not_equals(hoursAfterSet, setHours, "string abcd shouldn't be set to system's hour");
}, 'Time_TZDate_setHours_invalidHours');

}

function Time_TZDate_setMilliseconds_abnormalDecimal() {
//==== TEST: Time_TZDate_setMilliseconds_abnormalDecimal
//==== LABEL Check if TZDate.setMilliseconds() called with decimal don't set the milliseconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMs = 100.5, tz, msAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setMilliseconds(setMs);
    msAfterSet = tz.getMilliseconds();
    assert_not_equals(msAfterSet, setMs, "decimal shouldn't be set to system's ms");
}, 'Time_TZDate_setMilliseconds_abnormalDecimal');

}

function Time_TZDate_setMilliseconds_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setMilliseconds_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setMilliseconds() called with value greater than upper boundary works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMs = 1000, tz, msAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setMilliseconds(setMs);
    msAfterSet = tz.getMilliseconds();
    assert_not_equals(msAfterSet, setMs, "1000 shouldn't be set to system's ms");
}, 'Time_TZDate_setMilliseconds_boundaryBiggerThanUpper');

}

function Time_TZDate_setMilliseconds_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setMilliseconds_boundaryLessThanLower
//==== LABEL Check if TZDate.setMilliseconds() called with value less than lower boundary works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMs = -1, tz, msAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setMilliseconds(setMs);
    msAfterSet = tz.getMilliseconds();
    assert_not_equals(msAfterSet, setMs, "-1 shouldn't be set to system's ms");
}, 'Time_TZDate_setMilliseconds_boundaryLessThanLower');

}

function Time_TZDate_setMilliseconds_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setMilliseconds_boundaryLowerLimit
//==== LABEL Check if TZDate.setMilliseconds() called with the lowest value possible works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setMs = 0, tz, msAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setMilliseconds(setMs);
    msAfterSet = tz.getMilliseconds();
    assert_equals(msAfterSet, setMs, "value after set sould be equal to set one");
}, 'Time_TZDate_setMilliseconds_boundaryLowerLimit');

}

function Time_TZDate_setMilliseconds_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setMilliseconds_boundaryUpperLimit
//==== LABEL Check if TZDate.setMilliseconds() called with the highest value possible works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setMs = 999, tz, msAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setMilliseconds(setMs);
    msAfterSet = tz.getMilliseconds();
    assert_equals(msAfterSet, setMs, "value after set sould be equal to set one");
}, 'Time_TZDate_setMilliseconds_boundaryUpperLimit');

}

function Time_TZDate_setMilliseconds_invalidMilliseconds() {
//==== TEST: Time_TZDate_setMilliseconds_invalidMilliseconds
//==== LABEL Check if TZDate.setMilliseconds() called with invalid string argument don't set the milliseconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMs = "abcd", tz, msAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setMilliseconds(setMs);
    msAfterSet = tz.getMilliseconds();
    assert_not_equals(msAfterSet, setMs, "abcd shouldn't be set to system's ms");
}, 'Time_TZDate_setMilliseconds_invalidMilliseconds');

}

function Time_TZDate_setMinutes_abnormalDecimal() {
//==== TEST: Time_TZDate_setMinutes_abnormalDecimal
//==== LABEL Check if TZDate.setMinutes() called with decimal number don't set the minutes
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMins = 25.6,
        tz = tizen.time.getCurrentDateTime(),
        myDate, minsAfterSet;

    tz.setMinutes(setMins);
    myDate = new Date();
    minsAfterSet  = myDate.getMinutes();

    assert_not_equals(minsAfterSet, setMins, "decimal shouldn't be set to system's minute");
}, 'Time_TZDate_setMinutes_abnormalDecimal');

}

function Time_TZDate_setMinutes_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setMinutes_boundaryLessThanLower
//==== LABEL Check if TZDate.setMinutes() called with value less than lower limit don't set the minutes
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMins = -1,
        tz = tizen.time.getCurrentDateTime(),
        myDate, minsAfterSet;

    tz.setMinutes(setMins);
    myDate = new Date();
    minsAfterSet  = myDate.getMinutes();

    assert_not_equals(minsAfterSet, setMins, "-1 shouldn't be set to system's minute");
}, 'Time_TZDate_setMinutes_boundaryLessThanLower');

}

function Time_TZDate_setMinutes_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setMinutes_boundaryLowerLimit
//==== LABEL Check if TZDate.setMinutes() called with lowest value possible works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setMins = 0, tz, minsAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setMinutes(setMins);
    minsAfterSet = tz.getMinutes();

    assert_equals(minsAfterSet, setMins, "Lower limit minutes 0 could be set correctly");
}, 'Time_TZDate_setMinutes_boundaryLowerLimit');

}

function Time_TZDate_setMinutes_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setMinutes_boundaryUpperLimit
//==== LABEL Check if TZDate.setMinutes() called with highest value possible works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setMins = 59, tz, minsAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setMinutes(setMins);
    minsAfterSet = tz.getMinutes();

    assert_equals(minsAfterSet, setMins, "Lower limit minutes 0 could be set correctly");
}, 'Time_TZDate_setMinutes_boundaryUpperLimit');

}

function Time_TZDate_setMinutes_invalidMinutes() {
//==== TEST: Time_TZDate_setMinutes_invalidMinutes
//==== LABEL Check if TZDate.setMinutes() called with invalid string argument don't set the minutes
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMins = "ab",
        tz = tizen.time.getCurrentDateTime(),
        myDate, minsAfterSet;

    tz.setMinutes(setMins);
    myDate = new Date();
    minsAfterSet  = myDate.getMinutes();

    assert_not_equals(minsAfterSet, setMins, "ab shouldn't be set to system's minute");
}, 'Time_TZDate_setMinutes_invalidMinutes');

}

function Time_TZDate_setMonth_abnormalDecimal() {
//==== TEST: Time_TZDate_setMonth_abnormalDecimal
//==== LABEL Check if TZDate.setMonth() called with decimal number don't set the month
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMonth = 5.5,
        tz = tizen.time.getCurrentDateTime(),
        myDate, monthAfterSet;

    tz.setMonth(setMonth);
    myDate = new Date();
    monthAfterSet = myDate.getMonth();

    assert_not_equals(monthAfterSet, setMonth, "decimal shouldn't be set to system's month");
}, 'Time_TZDate_setMonth_abnormalDecimal');

}

function Time_TZDate_setMonth_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setMonth_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setMonth() called with value greater than upper limit don't set the month
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMonth = 12,
        tz = tizen.time.getCurrentDateTime(),
        myDate, monthAfterSet;

    tz.setMonth(setMonth);
    myDate = new Date();
    monthAfterSet = myDate.getMonth();

    assert_not_equals(monthAfterSet, setMonth, "12 shouldn't be set to system's month");
}, 'Time_TZDate_setMonth_boundaryBiggerThanUpper');

}

function Time_TZDate_setMonth_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setMonth_boundaryLessThanLower
//==== LABEL Check if TZDate.setMonth() called with value less than lower limit don't set the month
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMonth = -1,
        tz = tizen.time.getCurrentDateTime(),
        myDate, monthAfterSet;

    tz.setMonth(setMonth);
    myDate = new Date();
    monthAfterSet = myDate.getMonth();

    assert_not_equals(monthAfterSet, setMonth, "-1 shouldn't be set to system's month");
}, 'Time_TZDate_setMonth_boundaryLessThanLower');

}

function Time_TZDate_setMonth_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setMonth_boundaryLowerLimit
//==== LABEL Check if TZDate.setMonth() called with lowest value possible works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setMonth = 0, tz, monthAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setMonth(setMonth);
    monthAfterSet = tz.getMonth();

    assert_equals(monthAfterSet, setMonth, "Lower limit 0 month could be set correctly");
}, 'Time_TZDate_setMonth_boundaryLowerLimit');

}

function Time_TZDate_setMonth_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setMonth_boundaryUpperLimit
//==== LABEL Check if TZDate.setMonth() called with highest value possible works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setMonth = 11, tz, monthAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setMonth(setMonth);
    monthAfterSet = tz.getMonth();

    assert_equals(monthAfterSet, setMonth, "getMonth check");
}, 'Time_TZDate_setMonth_boundaryUpperLimit');

}

function Time_TZDate_setMonth_invalidMonth() {
//==== TEST: Time_TZDate_setMonth_invalidMonth
//==== LABEL Check if TZDate.setMonth() called with invalid string argument don't set the month
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setMonth = "0100",
        tz = tizen.time.getCurrentDateTime(),
        myDate, monthAfterSet;

    tz.setMonth(setMonth);
    myDate = new Date();
    monthAfterSet = myDate.getMonth();

    assert_not_equals(monthAfterSet, setMonth, "0100 shouldn't be set to system's month");
}, 'Time_TZDate_setMonth_invalidMonth');

}

function Time_TZDate_setSeconds_abnormalDecimal() {
//==== TEST: Time_TZDate_setSeconds_abnormalDecimal
//==== LABEL Check if TZDate.setSeconds() called with decimal number don't set the seconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setSecs = 5.5,
        tz = tizen.time.getCurrentDateTime(),
        myDate, secsAfterSet;

    tz.setSeconds(setSecs);
    myDate = new Date();
    secsAfterSet = myDate.getSeconds();

    assert_not_equals(secsAfterSet, setSecs, "decimal shouldn't be set to system's seconds");
}, 'Time_TZDate_setSeconds_abnormalDecimal');

}

function Time_TZDate_setSeconds_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setSeconds_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setSeconds() called with value greater than upper limit don't set the seconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setSecs = 60, myDate, secsAfterSet;

    tizen.time.getCurrentDateTime().setSeconds(setSecs);
    myDate = new Date();
    secsAfterSet = myDate.getSeconds();

    assert_not_equals(secsAfterSet, setSecs, "BiggerThanUpper boundary value 60 shouldn't be set to system's seconds");
}, 'Time_TZDate_setSeconds_boundaryBiggerThanUpper');

}

function Time_TZDate_setSeconds_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setSeconds_boundaryLessThanLower
//==== LABEL Check if TZDate.setSeconds() called with value less than lower limit don't set the seconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setSecs = -1, myDate, secsAfterSet;

    tizen.time.getCurrentDateTime().setSeconds(setSecs);
    myDate = new Date();
    secsAfterSet = myDate.getSeconds();

    assert_not_equals(secsAfterSet, setSecs, "LessThanLower boundary value -1 shouldn't be set to system's seconds");
}, 'Time_TZDate_setSeconds_boundaryLessThanLower');

}

function Time_TZDate_setSeconds_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setSeconds_boundaryLowerLimit
//==== LABEL Check if TZDate.setSeconds() called with lowest value possible works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setSecs = 0,
        dt = tizen.time.getCurrentDateTime(),
        secsAfterSet;

    dt.setSeconds(setSecs);
    secsAfterSet = dt.getSeconds();

    assert_equals(secsAfterSet, setSecs, "lower secs could be set correctly");
}, 'Time_TZDate_setSeconds_boundaryLowerLimit');

}

function Time_TZDate_setSeconds_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setSeconds_boundaryUpperLimit
//==== LABEL Check if TZDate.setSeconds() called with highest value possible works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setSecs = 59,
        dt = tizen.time.getCurrentDateTime(),
        secsAfterSet;

    dt.setSeconds(setSecs);
    secsAfterSet = dt.getSeconds();
    assert_equals(secsAfterSet, setSecs, "upper secs could be set correctly");
}, 'Time_TZDate_setSeconds_boundaryUpperLimit');

}

function Time_TZDate_setSeconds_invalidSeconds() {
//==== TEST: Time_TZDate_setSeconds_invalidSeconds
//==== LABEL Check if TZDate.setSeconds() called with invalid string argument don't set the seconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setSecs = "abc01", myDate, secsAfterSet;

    tizen.time.getCurrentDateTime().setSeconds(setSecs);
    myDate = new Date(2013, 2, 27, 18, 42, 48, 100);
    secsAfterSet = myDate.getSeconds();

    assert_not_equals(secsAfterSet, setSecs, "getSeconds check");
}, 'Time_TZDate_setSeconds_invalidSeconds');

}

function Time_TZDate_setUTCDate_abnormalDecimal() {
//==== TEST: Time_TZDate_setUTCDate_abnormalDecimal
//==== LABEL Check if TZDate.setUTCDate() works properly with abnormal decimal as argument
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCdate = 15.5, tz, utcdateAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setUTCDate(setUTCdate);
    utcdateAfterSet = tz.getUTCDate();

    assert_not_equals(utcdateAfterSet, setUTCdate, "decimal 15.5 shouldn't be set to system UTCdate");
}, 'Time_TZDate_setUTCDate_abnormalDecimal');

}

function Time_TZDate_setUTCDate_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setUTCDate_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setUTCDate() called with number bigger than upper boundary doesn't set the date
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCdate = 32, tz, utcdateAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setUTCDate(setUTCdate);
    utcdateAfterSet = tz.getUTCDate();

    assert_not_equals(utcdateAfterSet, setUTCdate, "decimal 32 shouldn't be set to system UTCdate");
}, 'Time_TZDate_setUTCDate_boundaryBiggerThanUpper');

}

function Time_TZDate_setUTCDate_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setUTCDate_boundaryLessThanLower
//==== LABEL Check if TZDate.setUTCDate() called with number less than lower boundary doesn't set the date
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCdate = -1, tz, utcdateAfterSet;

    tz = tizen.time.getCurrentDateTime();
    tz.setUTCDate(setUTCdate);
    utcdateAfterSet = tz.getUTCDate();

    assert_not_equals(utcdateAfterSet, setUTCdate, "decimal -1 shouldn't be set to system UTCdate");
}, 'Time_TZDate_setUTCDate_boundaryLessThanLower');

}

function Time_TZDate_setUTCDate_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setUTCDate_boundaryLowerLimit
//==== LABEL Check if TZDate.setUTCDate() with argument equal to lower boundary works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCdate = 1,
        tz = tizen.time.getCurrentDateTime(),
        myDate, utcdateAfterSet;

    tz.setUTCDate(setUTCdate);
    myDate = new Date();
    utcdateAfterSet = tz.getUTCDate();

    assert_equals(utcdateAfterSet, setUTCdate, "dates should be equal");
}, 'Time_TZDate_setUTCDate_boundaryLowerLimit');

}

function Time_TZDate_setUTCDate_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setUTCDate_boundaryUpperLimit
//==== LABEL Check if TZDate.setUTCDate() with argument equal to upper boundary works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCmonth = 7, setUTCdate = 31,
        tz = tizen.time.getCurrentDateTime(),
        myDate, utcdateAfterSet;

    tz.setUTCMonth(setUTCmonth);
    tz.setUTCDate(setUTCdate);
    myDate = new Date();
    utcdateAfterSet = tz.getUTCDate();

    assert_equals(utcdateAfterSet, setUTCdate, "dates should be equal");
}, 'Time_TZDate_setUTCDate_boundaryUpperLimit');

}

function Time_TZDate_setUTCDate_invalidDate() {
//==== TEST: Time_TZDate_setUTCDate_invalidDate
//==== LABEL Check if TZDate.setUTCDate() called with wrong string argument doesn't set the date
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCdate = "a",
        tz = tizen.time.getCurrentDateTime(),
        myDate, utcdateAfterSet;

    tz.setUTCDate(setUTCdate);
    myDate = new Date();
    utcdateAfterSet = tz.getUTCDate();

    assert_not_equals(utcdateAfterSet, setUTCdate, "decimal a shouldn't be set to system UTCdate");
}, 'Time_TZDate_setUTCDate_invalidDate');

}

function Time_TZDate_setUTCDate_notExistDayForCertainMonth() {
//==== TEST: Time_TZDate_setUTCDate_notExistDayForCertainMonth
//==== LABEL Check if TZDate.setUTCDate() called with date greater than days in the month sets the next month date
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST
test(function () {
    var setYear = 2013, setMonth = 5, setDate = 30,
        tz, yearAfterSet, monthAfterSet, dateAfterSet;

    tz = new tizen.TZDate(setYear, setMonth, setDate);
    tz.setUTCDate(31);

    yearAfterSet = tz.getUTCFullYear();
    monthAfterSet = tz.getUTCMonth();
    dateAfterSet = tz.getUTCDate();

    assert_equals(yearAfterSet, setYear, "year should be set");
    assert_equals(monthAfterSet, setMonth + 1, "month should be set to next one");
    assert_equals(dateAfterSet, 1, "date should be set to 1st of next month");
}, 'Time_TZDate_setUTCDate_notExistDayForCertainMonth');

}

function Time_TZDate_setUTCDate_notExistDayForFebruaryLeapYear() {
//==== TEST: Time_TZDate_setUTCDate_notExistDayForFebruaryLeapYear
//==== LABEL Check if TZDate.setUTCDate() called with argument with non existing date leap year, sets the next month date
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST
test(function () {
    var setYear = 2000, // leap year
        setMonth = 1, setDate = 29,
        myDate, yearAfterSet, monthAfterSet, dateAfterSet;

    myDate = new tizen.TZDate(setYear, setMonth, setDate);
    myDate.setUTCDate(30);

    yearAfterSet = myDate.getUTCFullYear();
    monthAfterSet = myDate.getUTCMonth();
    dateAfterSet = myDate.getUTCDate();

    assert_equals(yearAfterSet, setYear, "year should be set");
    assert_equals(monthAfterSet, setMonth + 1, "month should be the next one");
    assert_equals(dateAfterSet, 1, "date should be 1st of next month");
}, 'Time_TZDate_setUTCDate_notExistDayForFebruaryLeapYear');

}

function Time_TZDate_setUTCDate_notExistDayForFebruaryNotLeapYear() {
//==== TEST: Time_TZDate_setUTCDate_notExistDayForFebruaryNotLeapYear
//==== LABEL Check if TZDate.setUTCDate() called with argument with non existing date non-leap year, sets the next month date
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST
test(function () {
    var setYear = 2001, // non-leap year
        setMonth = 1, setDate = 28,
        myDate, yearAfterSet, monthAfterSet, dateAfterSet;

    myDate = new tizen.TZDate(setYear, setMonth, setDate);
    myDate.setUTCDate(29);

    yearAfterSet = myDate.getUTCFullYear();
    monthAfterSet = myDate.getUTCMonth();
    dateAfterSet = myDate.getUTCDate();

    assert_equals(yearAfterSet, setYear, "year should be set");
    assert_equals(monthAfterSet, setMonth + 1, "month should be the next one");
    assert_equals(dateAfterSet, 1, "day should be 1st of next month");
}, 'Time_TZDate_setUTCDate_notExistDayForFebruaryNotLeapYear');

}

function Time_TZDate_setUTCFullYear_abnormalDecimal() {
//==== TEST: Time_TZDate_setUTCFullYear_abnormalDecimal
//==== LABEL Check if TZDate.setUTCFullYear() works properly with abnormal decimal as argument
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCFullYear = 1998.55,
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet;

    tz.setUTCFullYear(setUTCFullYear);
    yearAfterSet = tz.getUTCFullYear();

    assert_not_equals(yearAfterSet, setUTCFullYear, "decimal shouldn't be set to system date's year");
}, 'Time_TZDate_setUTCFullYear_abnormalDecimal');

}

function Time_TZDate_setUTCFullYear_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setUTCFullYear_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setUTCFullYear() called with year greater than upper boundary works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCFullYear = 10000,
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet;

    tz.setUTCFullYear(setUTCFullYear);
    yearAfterSet = tz.getUTCFullYear();

    assert_equals(yearAfterSet, setUTCFullYear, "10000 should be set to system date's year");
}, 'Time_TZDate_setUTCFullYear_boundaryBiggerThanUpper');

}

function Time_TZDate_setUTCFullYear_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setUTCFullYear_boundaryLowerLimit
//==== LABEL Check if TZDate.setUTCFullYear() called with the lowest possible value works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCFullYear = 1,
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet;

    tz.setUTCFullYear(setUTCFullYear);
    yearAfterSet = tz.getUTCFullYear();

    assert_equals(yearAfterSet, setUTCFullYear, "years should be equal");
}, 'Time_TZDate_setUTCFullYear_boundaryLowerLimit');

}

function Time_TZDate_setUTCFullYear_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setUTCFullYear_boundaryUpperLimit
//==== LABEL Check if TZDate.setUTCFullYear() called with the highest possible value works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCFullYear = 9999,
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet;

    tz.setUTCFullYear(setUTCFullYear);
    yearAfterSet = tz.getUTCFullYear();

    assert_equals(yearAfterSet, setUTCFullYear, "year should be equal");
}, 'Time_TZDate_setUTCFullYear_boundaryUpperLimit');

}

function Time_TZDate_setUTCFullYear_invalidYear() {
//==== TEST: Time_TZDate_setUTCFullYear_invalidYear
//==== LABEL Check if TZDate.setUTCFullYear() do not set the invalid date
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCFullYear = "-1abs10",
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet;

    tz.setUTCFullYear(setUTCFullYear);
    yearAfterSet = tz.getUTCFullYear();

    assert_not_equals(yearAfterSet, setUTCFullYear, "getUTCFullYear check");
}, 'Time_TZDate_setUTCFullYear_invalidYear');

}

function Time_TZDate_setUTCFullYear_invalidCharYear() {
//==== TEST: Time_TZDate_setUTCFullYear_invalidCharYear
//==== LABEL Check if TZDate.setUTCFullYear() called with invalid string argument works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCFullYear = "a",
        tz = tizen.time.getCurrentDateTime(),
        yearAfterSet;

    tz.setUTCFullYear(setUTCFullYear);
    yearAfterSet = tz.getUTCFullYear();

    assert_not_equals(yearAfterSet, setUTCFullYear, "a shouldn't be set to system date's year");
}, 'Time_TZDate_setUTCFullYear_invalidCharYear');

}

function Time_TZDate_setUTCHours_abnormalDecimal() {
//==== TEST: Time_TZDate_setUTCHours_abnormalDecimal
//==== LABEL Check if TZDate.setUTCHours() doesn't set decimal number
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCHours = 8.45,
        tz = tizen.time.getCurrentDateTime(),
        utcHoursAfterSet;

    tz.setUTCHours(setUTCHours);
    utcHoursAfterSet = tz.getUTCHours();

    assert_not_equals(utcHoursAfterSet, setUTCHours, "decimal shouldn't be set to system's UTCHour");
}, 'Time_TZDate_setUTCHours_abnormalDecimal');

}

function Time_TZDate_setUTCHours_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setUTCHours_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setUTCHours() doesn't set hour greater than 23
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCHours = 24,
        tz = tizen.time.getCurrentDateTime(),
        utcHoursAfterSet;

    tz.setUTCHours(setUTCHours);
    utcHoursAfterSet = tz.getUTCHours();

    assert_not_equals(utcHoursAfterSet, setUTCHours, "24 shouldn't be set to system's UTCHour");
}, 'Time_TZDate_setUTCHours_boundaryBiggerThanUpper');

}

function Time_TZDate_setUTCHours_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setUTCHours_boundaryLessThanLower
//==== LABEL Check if TZDate.setUTCHours() doesn't set hour less than 0
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCHours = -1,
        tz = tizen.time.getCurrentDateTime(),
        utcHoursAfterSet;

    tz.setUTCHours(setUTCHours);
    utcHoursAfterSet = tz.getUTCHours();

    assert_not_equals(utcHoursAfterSet, setUTCHours, "-1 shouldn't be set to system's UTCHour");
}, 'Time_TZDate_setUTCHours_boundaryLessThanLower');

}

function Time_TZDate_setUTCHours_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setUTCHours_boundaryLowerLimit
//==== LABEL Check if TZDate.setUTCHours() called with the lowest possible value works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCHours = 0,
        tz = tizen.time.getCurrentDateTime(),
        utcHoursAfterSet;

    tz.setUTCHours(setUTCHours);
    utcHoursAfterSet = tz.getUTCHours();

    assert_equals(utcHoursAfterSet, setUTCHours, "hours should be equal");
}, 'Time_TZDate_setUTCHours_boundaryLowerLimit');

}

function Time_TZDate_setUTCHours_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setUTCHours_boundaryUpperLimit
//==== LABEL Check if TZDate.setUTCHours() called with the greatest possible value works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCHours = 23,
        tz = tizen.time.getCurrentDateTime(),
        utcHoursAfterSet;

    tz.setUTCHours(setUTCHours);
    utcHoursAfterSet = tz.getUTCHours();

    assert_equals(utcHoursAfterSet, setUTCHours, "hours should be equal");
}, 'Time_TZDate_setUTCHours_boundaryUpperLimit');

}

function Time_TZDate_setUTCHours_invalidHours() {
//==== TEST: Time_TZDate_setUTCHours_invalidHours
//==== LABEL Check if TZDate.setUTCHours() called with wrong string argument doesn't set the hours
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCHours = "abcd",
        tz = tizen.time.getCurrentDateTime(),
        utcHoursAfterSet;

    tz.setUTCHours(setUTCHours);
    utcHoursAfterSet = tz.getUTCHours();

    assert_not_equals(utcHoursAfterSet, setUTCHours, "abcd shouldn't be set to system's UTCHour");
}, 'Time_TZDate_setUTCHours_invalidHours');

}

function Time_TZDate_setUTCMilliseconds_abnormalDecimal() {
//==== TEST: Time_TZDate_setUTCMilliseconds_abnormalDecimal
//==== LABEL Check if TZDate.setUTCMilliseconds() called with decimal don't set the milliseconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMs = 100.5,
        tz = tizen.time.getCurrentDateTime(),
        utcMsAfterSet;

    tz.setUTCMilliseconds(setUTCMs);
    utcMsAfterSet = tz.getUTCMilliseconds();

    assert_not_equals(utcMsAfterSet, setUTCMs, "decimal shouldn't be set to system's utcMs");
}, 'Time_TZDate_setUTCMilliseconds_abnormalDecimal');

}

function Time_TZDate_setUTCMilliseconds_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setUTCMilliseconds_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setUTCMilliseconds() called with value greater than upper boundary works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMs = 1000,
        tz = tizen.time.getCurrentDateTime(),
        utcMsAfterSet;

    tz.setUTCMilliseconds(setUTCMs);
    utcMsAfterSet = tz.getUTCMilliseconds();

    assert_not_equals(utcMsAfterSet, setUTCMs, "1000 shouldn't be set to system's utcMs");
}, 'Time_TZDate_setUTCMilliseconds_boundaryBiggerThanUpper');

}

function Time_TZDate_setUTCMilliseconds_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setUTCMilliseconds_boundaryLessThanLower
//==== LABEL Check if TZDate.setUTCMilliseconds() called with value less than lower boundary works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMs = -1,
        tz = tizen.time.getCurrentDateTime(),
        utcMsAfterSet;

    tz.setUTCMilliseconds(setUTCMs);
    utcMsAfterSet = tz.getUTCMilliseconds();

    assert_not_equals(utcMsAfterSet, setUTCMs, "-1 shouldn't be set to system's utcMs");
}, 'Time_TZDate_setUTCMilliseconds_boundaryLessThanLower');

}

function Time_TZDate_setUTCMilliseconds_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setUTCMilliseconds_boundaryLowerLimit
//==== LABEL Check if TZDate.setUTCMilliseconds() called with the lowest value possible works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCMs = 0,
        tz = tizen.time.getCurrentDateTime(),
        utcMsAfterSet;

    tz.setUTCMilliseconds(setUTCMs);
    utcMsAfterSet = tz.getUTCMilliseconds();

    assert_equals(utcMsAfterSet, setUTCMs, "milliseconds should be equal");
}, 'Time_TZDate_setUTCMilliseconds_boundaryLowerLimit');

}

function Time_TZDate_setUTCMilliseconds_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setUTCMilliseconds_boundaryUpperLimit
//==== LABEL Check if TZDate.setUTCMilliseconds() called with the highest value possible works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCMs = 999,
        tz = tizen.time.getCurrentDateTime(),
        utcMsAfterSet;

    tz.setUTCMilliseconds(setUTCMs);
    utcMsAfterSet = tz.getUTCMilliseconds();

    assert_equals(utcMsAfterSet, setUTCMs, "milliseconds should be equal");
}, 'Time_TZDate_setUTCMilliseconds_boundaryUpperLimit');

}

function Time_TZDate_setUTCMilliseconds_invalidMilliseconds() {
//==== TEST: Time_TZDate_setUTCMilliseconds_invalidMilliseconds
//==== LABEL Check if TZDate.setUTCMilliseconds() called with invalid string argument don't set the milliseconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMs = "abcd",
        tz = tizen.time.getCurrentDateTime(),
        utcMsAfterSet;

    tz.setUTCMilliseconds(setUTCMs);
    utcMsAfterSet = tz.getUTCMilliseconds();

    assert_not_equals(utcMsAfterSet, setUTCMs, "abcd shouldn't be set to system's utcMs");
}, 'Time_TZDate_setUTCMilliseconds_invalidMilliseconds');

}

function Time_TZDate_setUTCMinutes_abnormalDecimal() {
//==== TEST: Time_TZDate_setUTCMinutes_abnormalDecimal
//==== LABEL Check if TZDate.setUTCMinutes() called with decimal don't set the milliseconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMins = 25.6,
        tz = tizen.time.getCurrentDateTime(),
        myDate, utcMinsAfterSet;

    tz.setUTCMinutes(setUTCMins);
    myDate = new Date();
    utcMinsAfterSet  = myDate.getUTCMinutes();

    assert_not_equals(utcMinsAfterSet, setUTCMins, "decimal shouldn't be set to system's UTCMinute");
}, 'Time_TZDate_setUTCMinutes_abnormalDecimal');

}

function Time_TZDate_setUTCMinutes_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setUTCMinutes_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setUTCMinutes() called with value greater than upper limit don't set the minutes
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMins = 60,
        tz = tizen.time.getCurrentDateTime(),
        myDate, utcMinsAfterSet;

    tz.setUTCMinutes(setUTCMins);
    myDate = new Date();
    utcMinsAfterSet  = myDate.getUTCMinutes();

    assert_not_equals(utcMinsAfterSet, setUTCMins, "60 shouldn't be set to system's UTCMinute");
}, 'Time_TZDate_setUTCMinutes_boundaryBiggerThanUpper');

}

function Time_TZDate_setUTCMinutes_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setUTCMinutes_boundaryLessThanLower
//==== LABEL Check if TZDate.setUTCMinutes() called with value less than lower limit don't set the minutes
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMins = -1,
        tz = tizen.time.getCurrentDateTime(),
        myDate, utcMinsAfterSet;

    tz.setUTCMinutes(setUTCMins);
    myDate = new Date();
    utcMinsAfterSet  = myDate.getUTCMinutes();

    assert_not_equals(utcMinsAfterSet, setUTCMins, "getUTCMinutes check");
}, 'Time_TZDate_setUTCMinutes_boundaryLessThanLower');

}

function Time_TZDate_setUTCMinutes_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setUTCMinutes_boundaryLowerLimit
//==== LABEL Check if TZDate.setUTCMinutes() called with lowest value possible works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCMins = 0,
        tz = tizen.time.getCurrentDateTime(),
        utcMinsAfterSet;

    tz.setUTCMinutes(setUTCMins);
    utcMinsAfterSet  = tz.getUTCMinutes();

    assert_equals(utcMinsAfterSet, setUTCMins, "Lower limit UTCMinutes 0 could be set correctly");
}, 'Time_TZDate_setUTCMinutes_boundaryLowerLimit');

}

function Time_TZDate_setUTCMinutes_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setUTCMinutes_boundaryUpperLimit
//==== LABEL Check if TZDate.setUTCMinutes() called with highest value possible works properly
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCMins = 59,
        tz = tizen.time.getCurrentDateTime(),
        utcMinsAfterSet;

    tz.setUTCMinutes(setUTCMins);
    utcMinsAfterSet  = tz.getUTCMinutes();

    assert_equals(utcMinsAfterSet, setUTCMins, "uppeer limit UTCMinutes 59 could be set correctly");
}, 'Time_TZDate_setUTCMinutes_boundaryUpperLimit');

}

function Time_TZDate_setUTCMinutes_invalidMinutes() {
//==== TEST: Time_TZDate_setUTCMinutes_invalidMinutes
//==== LABEL Check if TZDate.setUTCMinutes() called with invalid string argument don't set the minutes
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMins = "ab",
        tz = tizen.time.getCurrentDateTime(),
        utcMinsAfterSet;

    tz.setUTCMinutes(setUTCMins);
    utcMinsAfterSet = tz.getUTCMinutes();

    assert_not_equals(utcMinsAfterSet, setUTCMins, "Invalid value ab shouldn't be set to system's UTCMinute");
}, 'Time_TZDate_setUTCMinutes_invalidMinutes');

}

function Time_TZDate_setUTCMonth_abnormalDecimal() {
//==== TEST: Time_TZDate_setUTCMonth_abnormalDecimal
//==== LABEL Check if TZDate.setUTCMonth() called with decimal don't set the milliseconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMonth = 5.5, tz, utcMonthAfterSet;
    tz = tizen.time.getCurrentDateTime();
    tz.setUTCMonth(setUTCMonth);
    utcMonthAfterSet = tz.getUTCMonth();
    assert_not_equals(utcMonthAfterSet, setUTCMonth, "Invalid UTCMonth 5.5 shouldn't be set to system's UTCMonth");
}, 'Time_TZDate_setUTCMonth_abnormalDecimal');

}

function Time_TZDate_setUTCMonth_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setUTCMonth_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setUTCMonth() called with value greater than upper limit don't set the minutes
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMonth = 12, tz = tizen.time.getCurrentDateTime(), utcMonthAfterSet;
    tz.setUTCMonth(setUTCMonth);
    utcMonthAfterSet = tz.getUTCMonth();
    assert_not_equals(utcMonthAfterSet, setUTCMonth, "Invalid UTCMonth 12 shouldn't be set to system's UTCMonth");
}, 'Time_TZDate_setUTCMonth_boundaryBiggerThanUpper');

}

function Time_TZDate_setUTCMonth_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setUTCMonth_boundaryLessThanLower
//==== LABEL Check if TZDate.setUTCMonth() called with number less than lower boundary doesn't set the date
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMonth = -1, utcMonthAfterSet, tz;
    tz = tizen.time.getCurrentDateTime();
    tz.setUTCMonth(setUTCMonth);
    utcMonthAfterSet = tz.getUTCMonth();
    assert_not_equals(utcMonthAfterSet, setUTCMonth, "Invalid UTCMonth -1 shouldn't be set to system's UTCMonth");
}, 'Time_TZDate_setUTCMonth_boundaryLessThanLower');

}

function Time_TZDate_setUTCMonth_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setUTCMonth_boundaryLowerLimit
//==== LABEL Check if TZDate.setUTCMonth() called with lowest value possible works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCMonth = 0, tz, utcMonthAfterSet;
    tz = tizen.time.getCurrentDateTime();
    tz.setUTCMonth(setUTCMonth);
    utcMonthAfterSet = tz.getUTCMonth();
    assert_equals(utcMonthAfterSet, setUTCMonth, "Lower limit 0 UTCMonth could be set correctly");
}, 'Time_TZDate_setUTCMonth_boundaryLowerLimit');

}

function Time_TZDate_setUTCMonth_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setUTCMonth_boundaryUpperLimit
//==== LABEL Check if TZDate.setUTCMonth() called with highest value possible works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCMonth = 11, tz, utcMonthAfterSet;
    tz = tizen.time.getCurrentDateTime();
    tz.setUTCMonth(setUTCMonth);
    utcMonthAfterSet = tz.getUTCMonth();
    assert_equals(utcMonthAfterSet, setUTCMonth, "upper limit 11 UTCMonth could be set correctly");
}, 'Time_TZDate_setUTCMonth_boundaryUpperLimit');

}

function Time_TZDate_setUTCMonth_invalidMonth() {
//==== TEST: Time_TZDate_setUTCMonth_invalidMonth
//==== LABEL Check if TZDate.setUTCMonth() called with invalid string argument don't set the month
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCMonth = "0100", tz, utcMonthAfterSet;
    tz = tizen.time.getCurrentDateTime();
    tz.setUTCMonth(setUTCMonth);
    utcMonthAfterSet = tz.getUTCMonth();

    assert_not_equals(utcMonthAfterSet, setUTCMonth, "Invalid UTCMonth 0100 shouldn't be set to system's UTCMonth");
}, 'Time_TZDate_setUTCMonth_invalidMonth');

}

function Time_TZDate_setUTCSeconds_abnormalDecimal() {
//==== TEST: Time_TZDate_setUTCSeconds_abnormalDecimal
//==== LABEL Check if TZDate.setUTCSeconds() called with decimal don't set the milliseconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCSecs = 5.5, utcSecsAfterSet, tz;
    tz = tizen.time.getCurrentDateTime();
    tz.setUTCSeconds(setUTCSecs);
    utcSecsAfterSet = tz.getUTCSeconds();
    assert_not_equals(utcSecsAfterSet, setUTCSecs, "decimal shouldn't be set to system's UTCSeconds");
}, 'Time_TZDate_setUTCSeconds_abnormalDecimal');

}

function Time_TZDate_setUTCSeconds_boundaryBiggerThanUpper() {
//==== TEST: Time_TZDate_setUTCSeconds_boundaryBiggerThanUpper
//==== LABEL Check if TZDate.setUTCSeconds() called with value greater than upper limit don't set the minutes
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCSecs = 59, utcSecsAfterSet,
        tz = tizen.time.getCurrentDateTime();
    tz.setUTCSeconds(setUTCSecs);
    utcSecsAfterSet = tz.getUTCSeconds();
    assert_equals(utcSecsAfterSet, setUTCSecs, "BiggerThanUpper boundary value 60 shouldn't be set to system's UTCSeconds");
}, 'Time_TZDate_setUTCSeconds_boundaryBiggerThanUpper');

}

function Time_TZDate_setUTCSeconds_boundaryLessThanLower() {
//==== TEST: Time_TZDate_setUTCSeconds_boundaryLessThanLower
//==== LABEL Check if TZDate.setUTCSeconds() called with number less than lower boundary doesn't set the date
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCSecs = -1, myDate, utcSecsAfterSet;
    tizen.time.getCurrentDateTime().setUTCSeconds(setUTCSecs);
    myDate = new Date();
    utcSecsAfterSet = myDate.getUTCSeconds();
    assert_not_equals(utcSecsAfterSet, setUTCSecs, "LessThanLower boundary value -1 shouldn't be set to system's UTCSeconds");
}, 'Time_TZDate_setUTCSeconds_boundaryLessThanLower');

}

function Time_TZDate_setUTCSeconds_boundaryLowerLimit() {
//==== TEST: Time_TZDate_setUTCSeconds_boundaryLowerLimit
//==== LABEL Check if TZDate.setUTCSeconds() called with lowest value possible works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCSecs = 0, tz, utcSecsAfterSet;
    tz = tizen.time.getCurrentDateTime();
    tz.setUTCSeconds(0);
    utcSecsAfterSet = tz.getUTCSeconds();
    assert_equals(utcSecsAfterSet, setUTCSecs, "Lower limit UTCSecs 0 could be set correctly");
    assert_type(utcSecsAfterSet, "long", "type check");
}, 'Time_TZDate_setUTCSeconds_boundaryLowerLimit');

}

function Time_TZDate_setUTCSeconds_boundaryUpperLimit() {
//==== TEST: Time_TZDate_setUTCSeconds_boundaryUpperLimit
//==== LABEL Check if TZDate.setUTCSeconds() called with highest value possible works properly
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var setUTCSecs = 59, tz, utcSecsAfterSet;
    tz = tizen.time.getCurrentDateTime();
    tz.setUTCSeconds(59);
    utcSecsAfterSet = tz.getUTCSeconds();
    assert_equals(utcSecsAfterSet, setUTCSecs, "upper limit UTCSecs 59 could be set correctly");
    assert_type(utcSecsAfterSet, "long", "type check");
}, 'Time_TZDate_setUTCSeconds_boundaryUpperLimit');

}

function Time_TZDate_setUTCSeconds_invalidSeconds() {
//==== TEST: Time_TZDate_setUTCSeconds_invalidSeconds
//==== LABEL Check if TZDate.setUTCSeconds() called with invalid string argument don't set the seconds
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var setUTCSecs = "abc01", utcSecsAfterSet,
        tz = tizen.time.getCurrentDateTime();
    tz.setUTCSeconds(setUTCSecs);
    utcSecsAfterSet = tz.getUTCSeconds();
    assert_not_equals(utcSecsAfterSet, setUTCSecs, "Invalid UTCSeconds abc01 shouldn't be set to system's UTCSeconds");
    assert_type(utcSecsAfterSet, "long", "type check");
}, 'Time_TZDate_setUTCSeconds_invalidSeconds');

}

function Time_TZDate_toTimezone_invalid() {
//==== TEST: Time_TZDate_toTimezone_invalid
//==== LABEL Check if TZDate::toTimezone(invalid) method reports error
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:toTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var tzid, timezone;
    assert_throws(INVALID_VALUES_EXCEPTION, function () {
        tzid = "ab";
        timezone = tizen.time.getCurrentDateTime().toTimezone(tzid);
    });
}, 'Time_TZDate_toTimezone_invalid');

}

function Time_TZDate_toTimezone_null() {
//==== TEST: Time_TZDate_toTimezone_null
//==== LABEL Check if TZDate::toTimezone(null) method reports error
//==== PRIORITY P2
//==== SPEC Tizen Web API:System:Time:TZDate:toTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var tzid, timezone;
    assert_throws(INVALID_VALUES_EXCEPTION, function () {
        tzid = null;
        timezone = tizen.time.getCurrentDateTime().toTimezone(tzid);
    });
}, 'Time_TZDate_toTimezone_null');

}

function Time_TZDate_isDST_false() {
//==== TEST: Time_TZDate_isDST_false
//==== LABEL Check if TZDate.isDST() returns false on non DST date
//==== SPEC Tizen Web API:System:Time:TZDate:isDST M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2012, 1, 1, 1, 1, 1, 1, "Europe/Berlin");
    assert_false(td.isDST(), "isDST check");
}, 'Time_TZDate_isDST_false');

}

function Time_TZDate_isDST_boundaryLowerLimit_true() {
//==== TEST: Time_TZDate_isDST_boundaryLowerLimit-true
//==== LABEL Check if TZDate.isDST() returns true on lower DST boundary
//==== SPEC Tizen Web API:System:Time:TZDate:isDST M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2012, 2, 25, 2, 0, 0, 0, "Europe/Berlin");
    assert_true(td.isDST(), "isDST check");
}, 'Time_TZDate_isDST_boundaryLowerLimit_true');

}

function Time_TZDate_isDST_boundaryUpperLimit_true() {
//==== TEST: Time_TZDate_isDST_boundaryUpperLimit-true
//==== LABEL Check if TZDate.isDST() returns true on upper DST boundary
//==== SPEC Tizen Web API:System:Time:TZDate:isDST M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2012, 9, 28, 1, 1, 1, 1, "Europe/Berlin");
    assert_true(td.isDST(), "isDST check");
}, 'Time_TZDate_isDST_boundaryUpperLimit_true');

}

function Time_TZDate_getPreviousDSTTransition_number() {
//==== TEST: Time_TZDate_getPreviousDSTTransition_number
//==== LABEL Check if TZDate.getPreviousDSTTransition() with extra number argument works properly
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:getPreviousDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2012, 12, 1, 1, 1, 1, 1, "Europe/Berlin"),
        prevTr, day, month;

    prevTr = td.getPreviousDSTTransition(123);
    day = prevTr.getDate();
    month = prevTr.getMonth();
    assert_equals(month, 9, "month check");
    assert_equals(day, 28, "day check");
}, 'Time_TZDate_getPreviousDSTTransition_number');

}

function Time_TZDate_getPreviousDSTTransition_character() {
//==== TEST: Time_TZDate_getPreviousDSTTransition_character
//==== LABEL Check if TZDate.getPreviousDSTTransition() with extra string argument works properly
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:getPreviousDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2012, 12, 1, 1, 1, 1, 1, "Europe/Berlin"),
        prevTr, day, month;

    prevTr = td.getPreviousDSTTransition("abc");
    day = prevTr.getDate();
    month = prevTr.getMonth();
    assert_equals(month, 9, "month check");
    assert_equals(day, 28, "day check");
}, 'Time_TZDate_getPreviousDSTTransition_character');

}

function Time_TZDate_getNextDSTTransition_character() {
//==== TEST: Time_TZDate_getNextDSTTransition_character
//==== LABEL Check if TZDate.getNextDSSTTransition() works properly with extra string argument
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:getNextDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2012, 1, 1, 1, 1, 1, 1, "Europe/Berlin"),
        nextTr, day, month;

    nextTr = td.getNextDSTTransition("abc");
    day = nextTr.getDate();
    month = nextTr.getMonth();
    assert_equals(month, 2, "month check");
    assert_equals(day, 25, "day check");
}, 'Time_TZDate_getNextDSTTransition_character');

}

function Time_TZDate_getNextDSTTransition_number() {
//==== TEST: Time_TZDate_getNextDSTTransition_number
//==== LABEL Check if TZDate.getNextDSSTTransition() works properly with extra number argument
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:getNextDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var td = new tizen.TZDate(2012, 1, 1, 1, 1, 1, 1, "Europe/Berlin"),
        nextTr, day, month;

    nextTr = td.getNextDSTTransition(123);
    day = nextTr.getDate();
    month = nextTr.getMonth();
    assert_equals(month, 2, "month check");
    assert_equals(day, 25, "day check");
}, 'Time_TZDate_getNextDSTTransition_number');

}

function TimeDuration_difference_checkDurationDifference() {
//==== TEST: TimeDuration_difference_checkDurationDifference
//==== LABEL Check difference method TimeDuration interface works successfully
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TimeDuration:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var d1 = null, d2 = null;
    d1 = new tizen.TimeDuration(1, "DAYS");
    d2 = new tizen.TimeDuration(2, "DAYS");
    assert_true(d2.difference(d1) instanceof tizen.TimeDuration, "check type tizen.TimeDuration");
}, 'TimeDuration_difference_checkDurationDifference');

}

function TimeDuration_equalsTo_checkDurationEqual() {
//==== TEST: TimeDuration_equalsTo_checkDurationEqual
//==== LABEL Check equalsTo method TimeDuration interface works successfully
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TimeDuration:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var d1 = null, d2 = null, ret = null;
    d1 = new tizen.TimeDuration(60, "MINS");
    d2 = new tizen.TimeDuration(1, "HOURS");
    ret = d1.equalsTo(d2);
    assert_equals(ret, true, "equalsTo check");
}, 'TimeDuration_equalsTo_checkDurationEqual');

}

function TimeDuration_lessThan_checkDurationLower() {
//==== TEST: TimeDuration_lessThan_checkDurationLower
//==== LABEL Check lessThan method TimeDuration interface works successfully
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TimeDuration:lessThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var d1 = null, d2 = null, ret = null;
    d1 = new tizen.TimeDuration(120, "HOURS");
    d2 = new tizen.TimeDuration(1, "MINS");
    ret = d1.lessThan(d2);
    assert_equals(ret, false, "lessThan check");
}, 'TimeDuration_lessThan_checkDurationLower');

}

function TimeDuration_greaterThan_checkDurationGreater() {
//==== TEST: TimeDuration_greaterThan_checkDurationGreater
//==== LABEL Check greaterThan method TimeDuration interface works successfully
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TimeDuration:greaterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var d1 = null, d2 = null, ret = null;
    d1 = new tizen.TimeDuration(120, "MINS");  // 120 minutes
    d2 = new tizen.TimeDuration(1, "HOURS");   // 1 hour
    ret = d1.greaterThan(d2);
    assert_equals(ret, true, "greaterThan check");
}, 'TimeDuration_greaterThan_checkDurationGreater');

}

function TimeUtil_isLeapYear_allZero() {
//==== TEST: TimeUtil_isLeapYear_allZero
//==== LABEL Check TimeUtil interface isLeapYear method with parameter zero
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TimeUtil:isLeapYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var isLeap = null;
    isLeap = tizen.time.isLeapYear(0);
    assert_true(isLeap, "check isLeap");
}, 'TimeUtil_isLeapYear_allZero');

}

function TimeUtil_isLeapYear_negative() {
//==== TEST: TimeUtil_isLeapYear_negative
//==== LABEL Check TimeUtil interface isLeapYear method with parameter negative
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TimeUtil:isLeapYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var isLeap = null;
    isLeap = tizen.time.isLeapYear(-2000);
    assert_true(isLeap, "check isLeap");
}, 'TimeUtil_isLeapYear_negative');

}

function TimeUtil_getAvailableTimezones_checkEuropeBerlin() {
//==== TEST: TimeUtil_getAvailableTimezones_checkEuropeBerlin
//==== LABEL Check EuropeBerlin is included in available timezones
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TimeUtil:getAvailableTimezones M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA
test(function () {
    var tzids = null, timeZone, i;
    timeZone = false;
    tzids = tizen.time.getAvailableTimezones();
    assert_not_equals(tzids.length, 0, "check if tzids.length is greater than 0");
    for (i = 0; i < tzids.length; i ++) {
        if (tzids[i] === "Europe/Berlin") {
            timeZone = true;
            break;
        }
    }
    assert_true(timeZone, "Europe/Berlin is a time zone");
}, 'TimeUtil_getAvailableTimezones_checkEuropeBerlin');

}

function TZDate_getDate_checkEqualWithSetDate() {
//==== TEST: TZDate_getDate_checkEqualWithSetDate
//==== LABEL Check if getDate value is equal to setDate
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, day = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setDate(9);
    day = currentDate.getDate();
    assert_equals(day, 9, "day chceck");
}, 'TZDate_getDate_checkEqualWithSetDate');

}

function TZDate_getFullYear_checkEqualWithSetFullYear() {
//==== TEST: TZDate_getFullYear_checkEqualWithSetFullYear
//==== LABEL Check if getFullYear value is equal to setFullYear
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, year = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setFullYear(2012);
    year = currentDate.getFullYear();
    assert_equals(year, 2012, "year check");
}, 'TZDate_getFullYear_checkEqualWithSetFullYear');

}

function TZDate_getHours_checkEqualWithSetHours() {
//==== TEST: TZDate_getHours_checkEqualWithSetHours
//==== LABEL Check if getHours value is equal to setHours
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, hour = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setHours(16);
    hour = currentDate.getHours();
    assert_equals(hour, 16, "hour check");
}, 'TZDate_getHours_checkEqualWithSetHours');

}

function TZDate_getMilliseconds_checkEqualWithSetMilliseconds() {
//==== TEST: TZDate_getMilliseconds_checkEqualWithSetMilliseconds
//==== LABEL Check if getMilliseconds value is equal to setMilliseconds
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, milliSeconds = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setMilliseconds(666);
    milliSeconds = currentDate.getMilliseconds();
    assert_equals(milliSeconds, 666, "milliSeconds check");
}, 'TZDate_getMilliseconds_checkEqualWithSetMilliseconds');

}

function TZDate_getMinutes_checkEqualWithSetMinutes() {
//==== TEST: TZDate_getMinutes_checkEqualWithSetMinutes
//==== LABEL Check if getMinutes value is equal to setMinutes
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, minute = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setMinutes(50);
    minute = currentDate.getMinutes();
    assert_equals(minute, 50, "minute check");
}, 'TZDate_getMinutes_checkEqualWithSetMinutes');

}

function TZDate_getMonth_checkEqualWithSetMonth() {
//==== TEST: TZDate_getMonth_checkEqualWithSetMonth
//==== LABEL Check if getMonth value is equal to setMonth
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, month = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setMonth(0);
    month = currentDate.getMonth();
    assert_equals(month, 0, "month check");
}, 'TZDate_getMonth_checkEqualWithSetMonth');

}

function TZDate_getSeconds_checkEqualWithSetSeconds() {
//==== TEST: TZDate_getSeconds_checkEqualWithSetSeconds
//==== LABEL Check if getSeconds value is equal to setSeconds
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, second = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setSeconds(0);
    second = currentDate.getSeconds();
    assert_equals(second, 0, "second check");
}, 'TZDate_getSeconds_checkEqualWithSetSeconds');

}

function TZDate_getUTCDate_checkEqualWithSetUTCDate() {
//==== TEST: TZDate_getUTCDate_checkEqualWithSetUTCDate
//==== LABEL Check if getUTCDate value is equal to setUTCDate
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, day = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setUTCDate(9);
    day = currentDate.getUTCDate();
    assert_equals(day, 9, "day check");
}, 'TZDate_getUTCDate_checkEqualWithSetUTCDate');

}

function TZDate_getUTCFullYear_checkEqualWithSetUTCFullYear() {
//==== TEST: TZDate_getUTCFullYear_checkEqualWithSetUTCFullYear
//==== LABEL Check if getUTCFullYear value is equal to setUTCFullYear
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, year = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setUTCFullYear(2012);
    year = currentDate.getUTCFullYear();
    assert_equals(year, 2012, "year check");
}, 'TZDate_getUTCFullYear_checkEqualWithSetUTCFullYear');

}

function TZDate_getUTCHours_checkEqualWithSetUTCHours() {
//==== TEST: TZDate_getUTCHours_checkEqualWithSetUTCHours
//==== LABEL Check if getUTCHours value is equal to setUTCHours
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, hour = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setUTCHours(16);
    hour = currentDate.getUTCHours();
    assert_equals(hour, 16, "hour check");
}, 'TZDate_getUTCHours_checkEqualWithSetUTCHours');

}

function TZDate_getUTCMilliseconds_checkEqualWithSetUTCMilliseconds() {
//==== TEST: TZDate_getUTCMilliseconds_checkEqualWithSetUTCMilliseconds
//==== LABEL Check if getUTCMilliseconds value is equal to setUTCMilliseconds
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, milliSeconds = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setUTCMilliseconds(666);
    milliSeconds = currentDate.getUTCMilliseconds();
    assert_equals(milliSeconds, 666, "milliSeconds check");
}, 'TZDate_getUTCMilliseconds_checkEqualWithSetUTCMilliseconds');

}

function TZDate_getUTCMinutes_checkEqualWithSetUTCMinutes() {
//==== TEST: TZDate_getUTCMinutes_checkEqualWithSetUTCMinutes
//==== LABEL Check if getUTCMinutes value is equal to setUTCMinutes
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, minute = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setUTCMinutes(50);
    minute = currentDate.getUTCMinutes();
    assert_equals(minute, 50, "minute check");
}, 'TZDate_getUTCMinutes_checkEqualWithSetUTCMinutes');

}

function TZDate_getUTCMonth_checkEqualWithSetUTCMonth() {
//==== TEST: TZDate_getUTCMonth_checkEqualWithSetUTCMonth
//==== LABEL Check if getUTCMonth value is equal to setUTCMonth
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, month = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setUTCMonth(0);
    month = currentDate.getUTCMonth();
    assert_equals(month, 0, "month check");
}, 'TZDate_getUTCMonth_checkEqualWithSetUTCMonth');

}

function TZDate_getUTCSeconds_checkEqualWithSetUTCSeconds() {
//==== TEST: TZDate_getUTCSeconds_checkEqualWithSetUTCSeconds
//==== LABEL Check if getUTCSeconds value is equal to getUTCSeconds
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:setUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var currentDate = null, second = null;
    currentDate = tizen.time.getCurrentDateTime();
    currentDate.setUTCSeconds(0);
    second = currentDate.getUTCSeconds();
    assert_equals(second, 0, "second check");
}, 'TZDate_getUTCSeconds_checkEqualWithSetUTCSeconds');

}

function TZDate_addDuration() {
//==== TEST: TZDate_addDuration
//==== LABEL Check if method TZDate::addDuration() works properly
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var currentTZDate, duration, returnedValue;
    currentTZDate = new tizen.TZDate(2013, 6, 8);
    duration = new tizen.TimeDuration(1, "DAYS");
    returnedValue = currentTZDate.addDuration(duration);
    assert_equals(returnedValue.getDate(), 9, "returnedValue.getDay() check");
    assert_true(returnedValue instanceof tizen.TZDate, "TZDate check");
}, 'TZDate_addDuration');

}

function TZDate_addDuration_duration_TypeMismatch() {
//==== TEST: TZDate_addDuration_duration_TypeMismatch
//==== LABEL Check if TZDate::addDuration() throws exception when duration argument has wrong type
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    var currentTZDate, conversionTable, duration, exceptionName, i;

    currentTZDate = tizen.time.getCurrentDateTime();
    conversionTable = getTypeConversionExceptions("functionObject", false);
    for (i = 0; i < conversionTable.length; i++) {
        duration = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                currentTZDate.addDuration(duration);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
}, 'TZDate_addDuration_duration_TypeMismatch');

}

function TZDate_addDuration_duration_invalid_obj() {
//==== TEST: TZDate_addDuration_duration_invalid_obj
//==== LABEL Check if TZDate::addDuration() throws exception when duration is regular object
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MTO
test(function () {
    var currentTZDate, currentTimeDuration = [], exceptionName = TYPE_MISMATCH_ERR;

    currentTimeDuration[0] = {length: 2, unit: "MINS"};
    currentTZDate = tizen.time.getCurrentDateTime();
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTZDate.addDuration(currentTimeDuration[0]);
        }, exceptionName + " should be thrown - given incorrect argument.");
}, 'TZDate_addDuration_duration_invalid_obj');

}

function TZDate_addDuration_exist() {
//==== TEST: TZDate_addDuration_exist
//==== LABEL Check if addDuration() method exists in TimeManager
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("addDuration" in currentTZDate, "addDuration method exists");
    check_method_exists(currentTZDate, "addDuration");
}, 'TZDate_addDuration_exist');

}

function TZDate_addDuration_missarg() {
//==== TEST: TZDate_addDuration_missarg
//==== LABEL Check if TZDate::addDuration() method throws exception with missing mandatory argument
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMA
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTZDate.addDuration();
        });
}, 'TZDate_addDuration_missarg');

}

function TZDate_constructor_maximal_with_nonoptional_arguments() {
//==== TEST: TZDate_constructor_maximal_with_nonoptional_arguments
//==== LABEL Test whether TZDate(y, m, d, h, m, s, m, timezone) constructor works
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA CONSTRM CONSTRA
test(function () {
    var year = 2013, month = 2, day = 26, tzdate, hours = 4, minutes = 34,
        seconds = 12, milliseconds = 100, timezone = "Europe/Berlin";
    tzdate = new tizen.TZDate(year, month, day, hours, minutes, seconds, milliseconds, timezone);
    assert_type(tzdate, "object", "type check");
    assert_equals(tzdate.getFullYear(), 2013, "year check");
    assert_equals(tzdate.getMonth(), 2, "month check");
    assert_equals(tzdate.getDay(), 2, "day check");
    assert_equals(tzdate.getHours(), 4, "hours check");
    assert_equals(tzdate.getMinutes(), 34, "minutes check");
    assert_equals(tzdate.getSeconds(), 12, "seconds check");
    assert_equals(tzdate.getMilliseconds(), 100, "milliseconds check");
    assert_equals(tzdate.getTimezone(), "Europe/Berlin", "timezone check");
}, 'TZDate_constructor_maximal_with_nonoptional_arguments');

}

function TZDate_constructor_maximal_with_optional_arguments() {
//==== TEST: TZDate_constructor_maximal_with_optional_arguments
//==== LABEL Test whether TZDate(date, timezone) constructor works
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA CONSTRM CONSTRA
test(function () {
    var timezone = "Europe/Warsaw", date = new Date(2020, 2, 1), tzdate;
    tzdate = new tizen.TZDate(date, timezone);
    assert_type(tzdate, "object", "type check");
    assert_equals(tzdate.getFullYear(), 2020, "date check");
    assert_equals(tzdate.getTimezone(), "Europe/Warsaw", "timezone check");
}, 'TZDate_constructor_maximal_with_optional_arguments');

}

function TZDate_constructor_minimal_with_nonoptional_arguments() {
//==== TEST: TZDate_constructor_minimal_with_nonoptional_arguments
//==== LABEL Test whether TZDate(y, m, d) constructor works
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA CONSTRM CONSTRA
test(function () {
    var year = 2013, month = 2, day = 26, tzdate;
    tzdate = new tizen.TZDate(year, month, day);
    assert_type(tzdate, "object", "type check");
    assert_equals(tzdate.getFullYear(), 2013, "year check");
    assert_equals(tzdate.getMonth(), 2, "month check");
    assert_equals(tzdate.getDay(), 2, "day check");
}, 'TZDate_constructor_minimal_with_nonoptional_arguments');

}

function TZDate_constructor_minimal_without_optional_arguments() {
//==== TEST: TZDate_constructor_minimal_without_optional_arguments
//==== LABEL Test whether TZDate() constructor without arguments works
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA CONSTRM
test(function () {
    var tzdate = new tizen.TZDate();
    assert_type(tzdate, "object", "type check");
}, 'TZDate_constructor_minimal_without_optional_arguments');

}

function TZDate_difference() {
//==== TEST: TZDate_difference
//==== LABEL Check if TZDate::difference() method works
//==== SPEC: Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var currentTZDate, other, returnedValue, date;
    currentTZDate = new tizen.TZDate(2013, 6, 8);
    date = new Date(2013, 3, 4);
    other = new tizen.TZDate(date);
    returnedValue = currentTZDate.difference(other);
    assert_equals(returnedValue.length, 95, "returnedValue.length check");
    assert_true(returnedValue instanceof tizen.TimeDuration, "TimeDuration chceck");
}, 'TZDate_difference');

}

function TZDate_difference_exist() {
//==== TEST: TZDate_difference_exist
//==== LABEL Check if difference() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("difference" in currentTZDate, "difference method exists");
    check_method_exists(currentTZDate, "difference");
}, 'TZDate_difference_exist');

}

function TZDate_difference_missarg() {
//==== TEST: TZDate_difference_missarg
//==== LABEL Check if TZDate::difference() throws exception with missing missing mandatory argument
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMA
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTZDate.difference();
        });
}, 'TZDate_difference_missarg');

}

function TZDate_difference_other_TypeMismatch() {
//==== TEST: TZDate_difference_other_TypeMismatch
//==== LABEL Check if TZDate::difference() throws exception when other has wrong type
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    var currentTZDate, conversionTable, other, exceptionName, i;

    currentTZDate = tizen.time.getCurrentDateTime();
    conversionTable = getTypeConversionExceptions("enum", false);
    for (i = 0; i < conversionTable.length; i++) {
        other = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                currentTZDate.difference(other);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
}, 'TZDate_difference_other_TypeMismatch');

}

function TZDate_difference_other_invalid_obj() {
//==== TEST: TZDate_difference_other_invalid_obj
//==== LABEL Check if TZDate::difference() throws exception when other is regural object
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MTO
test(function () {
    var currentTZDate = [], exceptionName = TYPE_MISMATCH_ERR;

    currentTZDate[0] = tizen.time.getCurrentDateTime();
    currentTZDate[1] = {};
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTZDate[0].difference(currentTZDate[1]);
        }, exceptionName + " should be thrown - given incorrect argument.");
}, 'TZDate_difference_other_invalid_obj');

}

function TZDate_earlierThan() {
//==== TEST: TZDate_earlierThan
//==== LABEL Check if TZDate::earlierThan() method works
//==== SPEC: Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var currentTZDate, other, returnedValue, date;
    currentTZDate = tizen.time.getCurrentDateTime();
    date = new Date(2013, 3, 4);
    other = new tizen.TZDate(date);
    returnedValue = currentTZDate.earlierThan(other);
    assert_false(returnedValue, "false check");
}, 'TZDate_earlierThan');

}

function TZDate_earlierThan_exist() {
//==== TEST: TZDate_earlierThan_exist
//==== LABEL Check if earlierThan() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("earlierThan" in currentTZDate, "earlierThan method exists");
    check_method_exists(currentTZDate, "earlierThan");
}, 'TZDate_earlierThan_exist');

}

function TZDate_earlierThan_missarg() {
//==== TEST: TZDate_earlierThan_missarg
//==== LABEL Check if TZDate::earlierThan() throws exception with missing mandatory argument
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMA
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTZDate.earlierThan();
        });
}, 'TZDate_earlierThan_missarg');

}

function TZDate_earlierThan_other_TypeMismatch() {
//==== TEST: TZDate_earlierThan_other_TypeMismatch
//==== LABEL Check if TZDate::earlierThan() throws exception when other has wrong type
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    var currentTZDate, conversionTable, other, exceptionName, i;

    currentTZDate = tizen.time.getCurrentDateTime();
    conversionTable = getTypeConversionExceptions("functionObject", false);
    for (i = 0; i < conversionTable.length; i++) {
        other = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                currentTZDate.earlierThan(other);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
}, 'TZDate_earlierThan_other_TypeMismatch');

}

function TZDate_earlierThan_other_invalid_obj() {
//==== TEST: TZDate_earlierThan_other_invalid_obj
//==== LABEL Check if TZDate::earlierThan() throws exception when other is regular object
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:earlierThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MTO
test(function () {
    var currentTZDate = [], exceptionName = TYPE_MISMATCH_ERR;

    currentTZDate[0] = tizen.time.getCurrentDateTime();
    currentTZDate[1] = {};
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTZDate[0].earlierThan(currentTZDate[1]);
        }, exceptionName + " should be thrown - given incorrect argument.");
}, 'TZDate_earlierThan_other_invalid_obj');

}

function TZDate_equalsTo() {
//==== TEST: TZDate_equalsTo
//==== LABEL Check if TZDate::equalsTo() method works
//==== SPEC: Tizen Web API:System:Time:TZDate:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var currentTZDate, other, returnedValue, date;
    currentTZDate = tizen.time.getCurrentDateTime();
    date = new Date(2013, 3, 4);
    other = new tizen.TZDate(date);
    returnedValue = currentTZDate.equalsTo(other);
    assert_false(returnedValue, "false check");
}, 'TZDate_equalsTo');

}

function TZDate_equalsTo_exist() {
//==== TEST: TZDate_equalsTo_exist
//==== LABEL Check if equalsTo() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("equalsTo" in currentTZDate, "equalsTo method exists");
    check_method_exists(currentTZDate, "equalsTo");
}, 'TZDate_equalsTo_exist');

}

function TZDate_equalsTo_missarg() {
//==== TEST: TZDate_equalsTo_missarg
//==== LABEL Check if TZDate::equalsTo() throws exception with missing mandatory argument
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMA
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTZDate.equalsTo();
        });
}, 'TZDate_equalsTo_missarg');

}

function TZDate_equalsTo_other_TypeMismatch() {
//==== TEST: TZDate_equalsTo_other_TypeMismatch
//==== LABEL Check if TZDate::equalsTo() throws exception when other has wrong type
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    var currentTZDate, conversionTable, other, exceptionName, i;

    currentTZDate = tizen.time.getCurrentDateTime();
    conversionTable = getTypeConversionExceptions("functionObject", false);
    for (i = 0; i < conversionTable.length; i++) {
        other = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                currentTZDate.equalsTo(other);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
}, 'TZDate_equalsTo_other_TypeMismatch');

}

function TZDate_equalsTo_other_invalid_obj() {
//==== TEST: TZDate_equalsTo_other_invalid_obj
//==== LABEL Check if TZDate::equalsTo() throws exception when other is regural object
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MTO
test(function () {
    var currentTZDate = [], exceptionName = TYPE_MISMATCH_ERR;

    currentTZDate[0] = tizen.time.getCurrentDateTime();
    currentTZDate[1] = {};
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTZDate[0].equalsTo(currentTZDate[1]);
        }, exceptionName + " should be thrown - given incorrect argument.");
}, 'TZDate_equalsTo_other_invalid_obj');

}

function TZDate_exist() {
//==== TEST: TZDate_exist
//==== LABEL Test whether the constructor of the TZDate interface is defined
//==== PRIORITY: P0
//==== SPEC: Tizen Web API:System:Time:TZDate:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA CONSTRF
test(function () {
    check_constructor("TZDate");
}, 'TZDate_exist');

}

function TZDate_extend() {
//==== TEST: TZDate_extend
//==== LABEL Test whether the TZDate object can have new attribute added
//==== PRIORITY: P3
//==== SPEC: Tizen Web API:System:Time:TZDate:TZDate U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA OBX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    check_extensibility(currentTZDate);
}, 'TZDate_extend');

}

function TZDate_getDate() {
//==== TEST: TZDate_getDate
//==== LABEL Check if TZDate::getDate() method returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true((date.getDate() >= 1 && date.getDate() <= 31), "date check");
    assert_type(date.getDate(), "long", "type check");
}, 'TZDate_getDate');

}

function TZDate_getDate_for_specific_date() {
//==== TEST: TZDate_getDate_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getDate() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA 
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 3, 4);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getDate();
    assert_equals(returnedValue, 4, "date check");
}, 'TZDate_getDate_for_specific_date');

}

function TZDate_getDate_exist() {
//==== TEST: TZDate_getDate_exist
//==== LABEL Check if getDate() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getDate" in currentTZDate, "getDate method exists");
    check_method_exists(currentTZDate, "getDate");
}, 'TZDate_getDate_exist');

}

function TZDate_getDate_extra_argument() {
//==== TEST: TZDate_getDate_extra_argument
//==== LABEL Check if TZDate::getDate() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getDate");
}, 'TZDate_getDate_extra_argument');

}

function TZDate_getDay() {
//==== TEST: TZDate_getDay
//==== LABEL Check if TZDate::getDay() method returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getDay M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true((date.getDay() >= 0 && date.getDay() <= 6), "data check");
    assert_type(date.getDay(), "long", "type check");
}, 'TZDate_getDay');

}

function TZDate_getDay_for_specific_date() {
//==== TEST: TZDate_getDay_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getDay() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getDay M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getDay();
    assert_equals(returnedValue, 3, "day check");
}, 'TZDate_getDay_for_specific_date');

}

function TZDate_getDay_exist() {
//==== TEST: TZDate_getDay_exist
//==== LABEL Check if getDay() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getDay M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getDay" in currentTZDate, "getDay method exists");
    check_method_exists(currentTZDate, "getDay");
}, 'TZDate_getDay_exist');

}

function TZDate_getDay_extra_argument() {
//==== TEST: TZDate_getDay_extra_argument
//==== LABEL Check if TZDate::getDay() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getDay M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getDay");
}, 'TZDate_getDay_extra_argument');

}

function TZDate_getFullYear() {
//==== TEST: TZDate_getFullYear
//==== LABEL Check if TZDate::getFullYear() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getFullYear() >= 1000 && date.getFullYear() <= 9999, "data check");
    assert_type(date.getFullYear(), "long", "type check");
}, 'TZDate_getFullYear');

}

function TZDate_getFullYear_for_specific_date() {
//==== TEST: TZDate_getFullYear_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getFullYear() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getFullYear();
    assert_equals(returnedValue, 2013, "year check");
}, 'TZDate_getFullYear_for_specific_date');

}

function TZDate_getFullYear_exist() {
//==== TEST: TZDate_getFullYear_exist
//==== LABEL Check if getFullYear() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getFullYear" in currentTZDate, "getFullYear method exists");
    check_method_exists(currentTZDate, "getFullYear");
}, 'TZDate_getFullYear_exist');

}

function TZDate_getFullYear_extra_argument() {
//==== TEST: TZDate_getFullYear_extra_argument
//==== LABEL Check if TZDate::getFullYear() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getFullYear");
}, 'TZDate_getFullYear_extra_argument');

}

function TZDate_getHours() {
//==== TEST: TZDate_getHours
//==== LABEL Check if TZDate::getHours() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getHours() >= 0 && date.getHours() <= 23, "data check");
    assert_type(date.getHours(), "long", "type check");
}, 'TZDate_getHours');

}

function TZDate_getHours_for_specific_date() {
//==== TEST: TZDate_getHours_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getHours() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27, 13);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getHours();
    assert_equals(returnedValue, 13, "hours check");
}, 'TZDate_getHours_for_specific_date');

}

function TZDate_getHours_exist() {
//==== TEST: TZDate_getHours_exist
//==== LABEL Check if TZDate::getHours() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getHours" in currentTZDate, "getHours method exists");
    check_method_exists(currentTZDate, "getHours");
}, 'TZDate_getHours_exist');

}

function TZDate_getHours_extra_argument() {
//==== TEST: TZDate_getHours_extra_argument
//==== LABEL Check if TZDate::getHours() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getHours");
}, 'TZDate_getHours_extra_argument');

}

function TZDate_getMilliseconds() {
//==== TEST: TZDate_getMilliseconds
//==== LABEL Check if TZDate::getMilliseconds() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getMilliseconds() >= 0 && date.getMilliseconds() <= 999, "data check");
    assert_type(date.getMilliseconds(), "long", "type check");
}, 'TZDate_getMilliseconds');

}

function TZDate_getMilliseconds_for_specific_date() {
//==== TEST: TZDate_getMilliseconds_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getMilliseconds() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27, 13, 14, 32, 200);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getMilliseconds();
    assert_equals(returnedValue, 200, "milliseconds check");
}, 'TZDate_getMilliseconds_for_specific_date');

}

function TZDate_getMilliseconds_exist() {
//==== TEST: TZDate_getMilliseconds_exist
//==== LABEL Check if getMilliseconds() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getMilliseconds" in currentTZDate, "getMilliseconds method exists");
    check_method_exists(currentTZDate, "getMilliseconds");
}, 'TZDate_getMilliseconds_exist');

}

function TZDate_getMilliseconds_extra_argument() {
//==== TEST: TZDate_getMilliseconds_extra_argument
//==== LABEL Check if TZDate::getMilliseconds() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getMilliseconds");
}, 'TZDate_getMilliseconds_extra_argument');

}

function TZDate_getMinutes() {
//==== TEST: TZDate_getMinutes
//==== LABEL Check if TZDate::getMinutes() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getMinutes() >= 0 && date.getMinutes() <= 59, "data check");
    assert_type(date.getMinutes(), "long", "type check");
}, 'TZDate_getMinutes');

}

function TZDate_getMinutes_for_specific_date() {
//==== TEST: TZDate_getMinutes_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getMinutes() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27, 13, 32);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getMinutes();
    assert_equals(returnedValue, 32, "minutes check");
}, 'TZDate_getMinutes_for_specific_date');

}

function TZDate_getMinutes_exist() {
//==== TEST: TZDate_getMinutes_exist
//==== LABEL Check if getMinutes() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getMinutes" in currentTZDate, "getMinutes method exists");
    check_method_exists(currentTZDate, "getMinutes");
}, 'TZDate_getMinutes_exist');

}

function TZDate_getMinutes_extra_argument() {
//==== TEST: TZDate_getMinutes_extra_argument
//==== LABEL Check if TZDate::getMinutes() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getMinutes");
}, 'TZDate_getMinutes_extra_argument');

}

function TZDate_getMonth() {
//==== TEST: TZDate_getMonth
//==== LABEL Check if TZDate::getMonth() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getMonth() >= 0 && date.getMonth() <= 11, "data check");
    assert_type(date.getMonth(), "long", "type check");
}, 'TZDate_getMonth');

}

function TZDate_getMonth_for_specific_date() {
//==== TEST: TZDate_getMonth_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getMonth() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getMonth();
    assert_equals(returnedValue, 2, "month check");
}, 'TZDate_getMonth_for_specific_date');

}

function TZDate_getMonth_exist() {
//==== TEST: TZDate_getMonth_exist
//==== LABEL Check if getMonth() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getMonth" in currentTZDate, "getMonth method exists");
    check_method_exists(currentTZDate, "getMonth");
}, 'TZDate_getMonth_exist');

}

function TZDate_getMonth_extra_argument() {
//==== TEST: TZDate_getMonth_extra_argument
//==== LABEL Check if TZDate::getMonth() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getMonth");
}, 'TZDate_getMonth_extra_argument');

}

function TZDate_getNextDSTTransition() {
//==== TEST: TZDate_getNextDSTTransition
//==== LABEL Check if TZDate::getNextDSTTransition() returns a either date or null
//==== SPEC: Tizen Web API:System:Time:TZDate:getNextDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getNextDSTTransition();
    assert_true(returnedValue instanceof tizen.TZDate || returnedValue === null, "data check");
}, 'TZDate_getNextDSTTransition');

}

function TZDate_getNextDSTTransition_exist() {
//==== TEST: TZDate_getNextDSTTransition_exist
//==== LABEL Check if getNextDSTTransition() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getNextDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getNextDSTTransition" in currentTZDate, "getNextDSTTransition method exists");
    check_method_exists(currentTZDate, "getNextDSTTransition");
}, 'TZDate_getNextDSTTransition_exist');

}

function TZDate_getNextDSTTransition_extra_argument() {
//==== TEST: TZDate_getNextDSTTransition_extra_argument
//==== LABEL Check if TZDate::getNextDSTTransition() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getNextDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getNextDSTTransition");
}, 'TZDate_getNextDSTTransition_extra_argument');

}

function TZDate_getPreviousDSTTransition() {
//==== TEST: TZDate_getPreviousDSTTransition
//==== LABEL Check if TZDate::getPreviousDSTTransition() returns a either date or null
//==== SPEC: Tizen Web API:System:Time:TZDate:getPreviousDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getPreviousDSTTransition();
    assert_true(returnedValue instanceof tizen.TZDate || returnedValue === null, "data check");
}, 'TZDate_getPreviousDSTTransition');

}

function TZDate_getPreviousDSTTransition_exist() {
//==== TEST: TZDate_getPreviousDSTTransition_exist
//==== LABEL Check if getPreviousDSTTransition() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getPreviousDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getPreviousDSTTransition" in currentTZDate, "getPreviousDSTTransition method exists");
    check_method_exists(currentTZDate, "getPreviousDSTTransition");
}, 'TZDate_getPreviousDSTTransition_exist');

}

function TZDate_getPreviousDSTTransition_extra_argument() {
//==== TEST: TZDate_getPreviousDSTTransition_extra_argument
//==== LABEL Check if TZDate::getPreviousDSTTransition() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getPreviousDSTTransition M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getPreviousDSTTransition");
}, 'TZDate_getPreviousDSTTransition_extra_argument');

}

function TZDate_getSeconds() {
//==== TEST: TZDate_getSeconds
//==== LABEL Check if TZDate::getSeconds() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getSeconds() >= 0 && date.getSeconds() <= 59, "data check");
    assert_type(date.getSeconds(), "long", "type check");
}, 'TZDate_getSeconds');

}

function TZDate_getSeconds_for_specific_date() {
//==== TEST: TZDate_getSeconds_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getSeconds() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27, 11, 32, 25);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getSeconds();
    assert_equals(returnedValue, 25, "seconds check");
}, 'TZDate_getSeconds_for_specific_date');

}

function TZDate_getSeconds_exist() {
//==== TEST: TZDate_getSeconds_exist
//==== LABEL Check if getSeconds() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getSeconds" in currentTZDate, "getSeconds method exists");
    check_method_exists(currentTZDate, "getSeconds");
}, 'TZDate_getSeconds_exist');

}

function TZDate_getSeconds_extra_argument() {
//==== TEST: TZDate_getSeconds_extra_argument
//==== LABEL Check if TZDate::getSeconds() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getSeconds");
}, 'TZDate_getSeconds_extra_argument');

}

function TZDate_getTimezone() {
//==== TEST: TZDate_getTimezone
//==== LABEL Check if TZDate::getTimezone() returns a string
//==== SPEC: Tizen Web API:System:Time:TZDate:getTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA
test(function () {
    var date = new tizen.TZDate();
    assert_type(date.getTimezone(), "string", "type check");
}, 'TZDate_getTimezone');

}

function TZDate_getTimezoneAbbreviation() {
//==== TEST: TZDate_getTimezoneAbbreviation
//==== LABEL Check if TZDate::getTimezoneAbbreviation() returns a string
//==== SPEC: Tizen Web API:System:Time:TZDate:getTimezoneAbbreviation M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA

test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue;
    returnedValue = currentTZDate.getTimezoneAbbreviation();
    assert_type(returnedValue, "string", "type check");
    assert_not_equals(returnedValue, null, "null check");
}, 'TZDate_getTimezoneAbbreviation');

}

function TZDate_getTimezoneAbbreviation_exist() {
//==== TEST: TZDate_getTimezoneAbbreviation_exist
//==== LABEL Check if getTimezoneAbbreviation() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getTimezoneAbbreviation M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getTimezoneAbbreviation" in currentTZDate, "getTimezoneAbbreviation method exists");
    check_method_exists(currentTZDate, "getTimezoneAbbreviation");
}, 'TZDate_getTimezoneAbbreviation_exist');

}

function TZDate_getTimezoneAbbreviation_extra_argument() {
//==== TEST: TZDate_getTimezoneAbbreviation_extra_argument
//==== LABEL Check if TZDate::getTimezoneAbbreviation() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getTimezoneAbbreviation M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getTimezoneAbbreviation");
}, 'TZDate_getTimezoneAbbreviation_extra_argument');

}

function TZDate_getTimezone_for_specific_timezone() {
//==== TEST: TZDate_getTimezone_for_specific_timezone
//==== LABEL Check whether Tizen.TZDate.getTimezone() for specific timezone
//==== SPEC Tizen Web API:System:Time:TZDate:getTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR

test(function () {
    var currentTZDate, returnedValue;
    currentTZDate = new tizen.TZDate(null, "Europe/Berlin");
    returnedValue = currentTZDate.getTimezone();
    assert_equals(returnedValue, "Europe/Berlin", "timezone check");
}, 'TZDate_getTimezone_for_specific_timezone');

}

function TZDate_getTimezone_exist() {
//==== TEST: TZDate_getTimezone_exist
//==== LABEL Check if getTimezone() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getTimezone" in currentTZDate, "getTimezone method exists");
    check_method_exists(currentTZDate, "getTimezone");
}, 'TZDate_getTimezone_exist');

}

function TZDate_getTimezone_extra_argument() {
//==== TEST: TZDate_getTimezone_extra_argument
//==== LABEL Check if TZDate::getTimezone() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getTimezone");
}, 'TZDate_getTimezone_extra_argument');

}

function TZDate_getUTCDate() {
//==== TEST: TZDate_getUTCDate
//==== LABEL Check if TZDate::getUTCDate() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getUTCDate() >= 1 && date.getUTCDate() <= 31, "data check");
    assert_type(date.getUTCDate(), "long", "type check");
}, 'TZDate_getUTCDate');

}

function TZDate_getUTCDate_for_specific_date() {
//==== TEST: TZDate_getUTCDate_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getUTCDate() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27, 8);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getUTCDate();
    assert_equals(returnedValue, 26, "date check");
}, 'TZDate_getUTCDate_for_specific_date');

}

function TZDate_getUTCDate_exist() {
//==== TEST: TZDate_getUTCDate_exist
//==== LABEL Check if getUTCDate() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getUTCDate" in currentTZDate, "getUTCDate method exists");
    check_method_exists(currentTZDate, "getUTCDate");
}, 'TZDate_getUTCDate_exist');

}

function TZDate_getUTCDate_extra_argument() {
//==== TEST: TZDate_getUTCDate_extra_argument
//==== LABEL Check if TZDate::getUTCDate() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getUTCDate");
}, 'TZDate_getUTCDate_extra_argument');

}

function TZDate_getUTCDay() {
//==== TEST: TZDate_getUTCDay
//==== LABEL Check if TZDate::getUTCDay() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCDay M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getUTCDay() >= 0 && date.getUTCDay() <= 6, "data check");
    assert_type(date.getUTCDay(), "long", "type check");
}, 'TZDate_getUTCDay');

}

function TZDate_getUTCDay_for_specific_date() {
//==== TEST: TZDate_getUTCDay_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getUTCDay() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCDay M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getUTCDay();
    assert_equals(returnedValue, 2, "day check");
}, 'TZDate_getUTCDay_for_specific_date');

}

function TZDate_getUTCDay_exist() {
//==== TEST: TZDate_getUTCDay_exist
//==== LABEL Check if getUTCDay() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCDay M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getUTCDay" in currentTZDate, "getUTCDay method exists");
    check_method_exists(currentTZDate, "getUTCDay");
}, 'TZDate_getUTCDay_exist');

}

function TZDate_getUTCDay_extra_argument() {
//==== TEST: TZDate_getUTCDay_extra_argument
//==== LABEL Check if TZDate::getUTCDay() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCDay M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getUTCDay");
}, 'TZDate_getUTCDay_extra_argument');

}

function TZDate_getUTCFullYear() {
//==== TEST: TZDate_getUTCFullYear
//==== LABEL Check if TZDate::getUTCFullYear() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getUTCFullYear() >= 1000 && date.getUTCFullYear() <= 9999, "data check");
    assert_type(date.getUTCFullYear(), "long", "type check");
}, 'TZDate_getUTCFullYear');

}

function TZDate_getUTCFullYear_for_specific_date() {
//==== TEST: TZDate_getUTCFullYear_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getUTCFullYear() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getUTCFullYear();
    assert_equals(returnedValue, 2013, "year check");
}, 'TZDate_getUTCFullYear_for_specific_date');

}

function TZDate_getUTCFullYear_exist() {
//==== TEST: TZDate_getUTCFullYear_exist
//==== LABEL Check if getUTCFullYear() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getUTCFullYear" in currentTZDate, "getUTCFullYear method exists");
    check_method_exists(currentTZDate, "getUTCFullYear");
}, 'TZDate_getUTCFullYear_exist');

}

function TZDate_getUTCFullYear_extra_argument() {
//==== TEST: TZDate_getUTCFullYear_extra_argument
//==== LABEL Check if TZDate::getUTCFullYear() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getUTCFullYear");
}, 'TZDate_getUTCFullYear_extra_argument');

}

function TZDate_getUTCHours() {
//==== TEST: TZDate_getUTCHours
//==== LABEL Check if TZDate::getUTCHours() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getUTCHours() >= 0 && date.getUTCHours() <= 23, "data check");
    assert_type(date.getUTCHours(), "long", "type check");
}, 'TZDate_getUTCHours');

}

function TZDate_getUTCHours_for_specific_date() {
//==== TEST: TZDate_getUTCHours_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getUTCHours() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date, hour = 18;
    date = new Date(2013, 2, 27, hour);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getUTCHours();
    assert_equals(returnedValue, hour - expected_time_zone_offset, "hours check");
}, 'TZDate_getUTCHours_for_specific_date');

}

function TZDate_getUTCHours_exist() {
//==== TEST: TZDate_getUTCHours_exist
//==== LABEL Check if getUTCHours() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getUTCHours" in currentTZDate, "getUTCHours method exists");
    check_method_exists(currentTZDate, "getUTCHours");
}, 'TZDate_getUTCHours_exist');

}

function TZDate_getUTCHours_extra_argument() {
//==== TEST: TZDate_getUTCHours_extra_argument
//==== LABEL Check if method TZDate::getUTCHours() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getUTCHours");
}, 'TZDate_getUTCHours_extra_argument');

}

function TZDate_getUTCMilliseconds() {
//==== TEST: TZDate_getUTCMilliseconds
//==== LABEL Check if TZDate::getUTCMilliseconds() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getUTCMilliseconds() >= 0 && date.getUTCMilliseconds() <= 999, "data check");
    assert_type(date.getUTCMilliseconds(), "long", "type check");
}, 'TZDate_getUTCMilliseconds');

}

function TZDate_getUTCMilliseconds_for_specific_date() {
//==== TEST: TZDate_getUTCMilliseconds_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getUTCMilliseconds() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27, 18, 43, 26, 78);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getUTCMilliseconds();
    assert_equals(returnedValue, 78, "milliseconds check");
}, 'TZDate_getUTCMilliseconds_for_specific_date');

}

function TZDate_getUTCMilliseconds_exist() {
//==== TEST: TZDate_getUTCMilliseconds_exist
//==== LABEL Check if getUTCMilliseconds() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getUTCMilliseconds" in currentTZDate, "getUTCMilliseconds method exists");
    check_method_exists(currentTZDate, "getUTCMilliseconds");
}, 'TZDate_getUTCMilliseconds_exist');

}

function TZDate_getUTCMilliseconds_extra_argument() {
//==== TEST: TZDate_getUTCMilliseconds_extra_argument
//==== LABEL Check if TZDate::getUTCMilliseconds() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getUTCMilliseconds");
}, 'TZDate_getUTCMilliseconds_extra_argument');

}

function TZDate_getUTCMinutes() {
//==== TEST: TZDate_getUTCMinutes
//==== LABEL Check if TZDate::getUTCMinutes() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getUTCMinutes() >= 0 && date.getUTCMinutes() <= 59, "data check");
    assert_type(date.getUTCMinutes(), "long", "type check");
}, 'TZDate_getUTCMinutes');

}

function TZDate_getUTCMinutes_for_specific_date() {
//==== TEST: TZDate_getUTCMinutes_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getUTCMinutes() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27, 18, 43);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getUTCMinutes();
    assert_equals(returnedValue, 43, "minutes check");
}, 'TZDate_getUTCMinutes_for_specific_date');

}

function TZDate_getUTCMinutes_exist() {
//==== TEST: TZDate_getUTCMinutes_exist
//==== LABEL Check if getUTCMinutes() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getUTCMinutes" in currentTZDate, "getUTCMinutes method exists");
    check_method_exists(currentTZDate, "getUTCMinutes");
}, 'TZDate_getUTCMinutes_exist');

}

function TZDate_getUTCMinutes_extra_argument() {
//==== TEST: TZDate_getUTCMinutes_extra_argument
//==== LABEL Check if TZDate::getUTCMinutes() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getUTCMinutes");
}, 'TZDate_getUTCMinutes_extra_argument');

}

function TZDate_getUTCMonth() {
//==== TEST: TZDate_getUTCMonth
//==== LABEL Check if TZDate::getUTCMonth() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getUTCMonth() >= 0 && date.getUTCMonth() <= 11, "data check");
    assert_type(date.getUTCMonth(), "long", "type check");
}, 'TZDate_getUTCMonth');

}

function TZDate_getUTCMonth_for_specific_date() {
//==== TEST: TZDate_getUTCMonth_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getUTCMonth() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getUTCMonth();
    assert_equals(returnedValue, 2, "month check");
}, 'TZDate_getUTCMonth_for_specific_date');

}

function TZDate_getUTCMonth_exist() {
//==== TEST: TZDate_getUTCMonth_exist
//==== LABEL Check if getUTCMonth() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getUTCMonth" in currentTZDate, "getUTCMonth method exists");
    check_method_exists(currentTZDate, "getUTCMonth");
}, 'TZDate_getUTCMonth_exist');

}

function TZDate_getUTCMonth_extra_argument() {
//==== TEST: TZDate_getUTCMonth_extra_argument
//==== LABEL Check if TZDate::getUTCMonth() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getUTCMonth");
}, 'TZDate_getUTCMonth_extra_argument');

}

function TZDate_getUTCSeconds() {
//==== TEST: TZDate_getUTCSeconds
//==== LABEL Check if TZDate::getUTCSeconds() returns valid number
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    assert_true(date.getUTCSeconds() >= 0 && date.getUTCSeconds() <= 59, "data check");
    assert_type(date.getUTCSeconds(), "long", "type check");
}, 'TZDate_getUTCSeconds');

}

function TZDate_getUTCSeconds_for_specific_date() {
//==== TEST: TZDate_getUTCSeconds_for_specific_date
//==== LABEL Check whether Tizen.TZDate.getUTCSeconds() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:getUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var currentTZDate, returnedValue, date;
    date = new Date(2013, 2, 27, 13, 23, 43);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.getUTCSeconds();
    assert_equals(returnedValue, 43, "seconds check");
}, 'TZDate_getUTCSeconds_for_specific_date');

}

function TZDate_getUTCSeconds_exist() {
//==== TEST: TZDate_getUTCSeconds_exist
//==== LABEL Check if getUTCSeconds() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("getUTCSeconds" in currentTZDate, "getUTCSeconds method exists");
    check_method_exists(currentTZDate, "getUTCSeconds");
}, 'TZDate_getUTCSeconds_exist');

}

function TZDate_getUTCSeconds_extra_argument() {
//==== TEST: TZDate_getUTCSeconds_extra_argument
//==== LABEL Check if TZDate::getUTCSeconds() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:getUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "getUTCSeconds");
}, 'TZDate_getUTCSeconds_extra_argument');

}

function TZDate_isDST() {
//==== TEST: TZDate_isDST
//==== LABEL Check if TZDate::isDST() method returns boolean
//==== SPEC: Tizen Web API:System:Time:TZDate:isDST M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var date = new tizen.TZDate();
    assert_type(date.isDST(), "boolean", "type check");
}, 'TZDate_isDST');

}

function TZDate_isDST_for_specific_date() {
//==== TEST: TZDate_isDST_for_specific_date
//==== LABEL Check whether Tizen.TZDate.isDST() for specific date
//==== SPEC Tizen Web API:System:Time:TZDate:isDST M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MNA
test(function () {
    var dateTZDate = new tizen.TZDate(2013, 2, 27, 18, 33), returnedValue;
    returnedValue = dateTZDate.isDST();
    assert_false(returnedValue, "false check");
}, 'TZDate_isDST_for_specific_date');

}

function TZDate_isDST_exist() {
//==== TEST: TZDate_isDST_exist
//==== LABEL Check if isDST() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:isDST M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("isDST" in currentTZDate, "isDST method exists");
    check_method_exists(currentTZDate, "isDST");
}, 'TZDate_isDST_exist');

}

function TZDate_isDST_extra_argument() {
//==== TEST: TZDate_isDST_extra_argument
//==== LABEL Check if TZDate::isDST() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:isDST M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "isDST");
}, 'TZDate_isDST_extra_argument');

}

function TZDate_laterThan() {
//==== TEST: TZDate_laterThan
//==== LABEL Check if TZDate::laterThan() method returns that current date after 2013-03-04
//==== SPEC: Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR MMINA
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), date, returnedValue, other;
    date = new Date(2013, 3, 4);
    other = new tizen.TZDate(date);
    returnedValue = currentTZDate.laterThan(other);
    assert_true(returnedValue, "true check");
}, 'TZDate_laterThan');

}

function TZDate_laterThan_with_null() {
//==== TEST: TZDate_laterThan_with_null
//==== LABEL Check if TZDate::laterThan() throws exception when other is null
//==== SPEC Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMA
test(function () {
    var date = new tizen.TZDate();
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        date.laterThan();
    });
}, 'TZDate_laterThan_with_null');

}

function TZDate_laterThan_exist() {
//==== TEST: TZDate_laterThan_exist
//==== LABEL Check if TZDate::laterThan() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("laterThan" in currentTZDate, "laterThan method exists");
    check_method_exists(currentTZDate, "laterThan");
}, 'TZDate_laterThan_exist');

}

function TZDate_laterThan_missarg() {
//==== TEST: TZDate_laterThan_missarg
//==== LABEL Check if TZDate::laterThan() method accepts extra argument
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMA
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTZDate.laterThan();
        });
}, 'TZDate_laterThan_missarg');

}

function TZDate_laterThan_other_TypeMismatch() {
//==== TEST: TZDate_laterThan_other_TypeMismatch
//==== LABEL Check if TZDate::laterThan() throws exception when other has wrong type
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    var currentTZDate, conversionTable, other, exceptionName, i;

    currentTZDate = tizen.time.getCurrentDateTime();
    conversionTable = getTypeConversionExceptions("functionObject", false);
    for (i = 0; i < conversionTable.length; i++) {
        other = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                currentTZDate.laterThan(other);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
}, 'TZDate_laterThan_other_TypeMismatch');

}

function TZDate_laterThan_other_invalid_obj() {
//==== TEST: TZDate_laterThan_other_invalid_obj
//==== LABEL Check if TZDate::laterThan() throws exception when other is regular object
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:laterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MTO
test(function () {
    var currentTZDate = [], exceptionName = TYPE_MISMATCH_ERR;

    currentTZDate[0] = tizen.time.getCurrentDateTime();
    currentTZDate[1] = {};
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTZDate[0].laterThan(currentTZDate[1]);
        }, exceptionName + " should be thrown - given incorrect argument.");
}, 'TZDate_laterThan_other_invalid_obj');

}

function TZDate_secondsFromUTC() {
//==== TEST: TZDate_secondsFromUTC
//==== LABEL Check if TZDate::secondsFromUTC() returns number
//==== SPEC: Tizen Web API:System:Time:TZDate:secondsFromUTC M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue = null;
    returnedValue = currentTZDate.secondsFromUTC();
    assert_type(returnedValue, "long", "type check");
    assert_not_equals(returnedValue, null, "null check");
}, 'TZDate_secondsFromUTC');

}

function TZDate_secondsFromUTC_for_specific_date() {
//==== TEST: TZDate_secondsFromUTC_for_specific_date
//==== LABEL Check whether secondsFromUTC() method correctly gets the number of seconds from UTC offset for the time zone
//==== SPEC Tizen Web API:System:Time:TZDate:secondsFromUTC M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MR
test(function () {
    var expectedData = -1 * expected_time_zone_offset * 60 * 60, i = 0;
    assert_equals(date.secondsFromUTC(), expectedData, "secondsFromUTC check");
    for (i = 0; i < testAdditionalParamArray.length; i++) {
        assert_equals(date.secondsFromUTC(testAdditionalParamArray[i]), expectedData, "secondsFromUTC check " + i);
    }
}, 'TZDate_secondsFromUTC_for_specific_date');

}

function TZDate_secondsFromUTC_exist() {
//==== TEST: TZDate_secondsFromUTC_exist
//==== LABEL Check if secondsFromUTC() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:secondsFromUTC M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("secondsFromUTC" in currentTZDate, "secondsFromUTC method exists");
    check_method_exists(currentTZDate, "secondsFromUTC");
}, 'TZDate_secondsFromUTC_exist');

}

function TZDate_secondsFromUTC_extra_argument() {
//==== TEST: TZDate_secondsFromUTC_extra_argument
//==== LABEL Check if TZDate::secondsFromUTC() method accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:secondsFromUTC M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "secondsFromUTC");
}, 'TZDate_secondsFromUTC_extra_argument');

}

function TZDate_setDate() {
//==== TEST: TZDate_setDate
//==== LABEL Check if TZDate::setDate() method sets day of the month and returns nothing
//==== SPEC: Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setDate(15);
    assert_equals(returnedValue, undefined, "setDate() should return undefined.");
    assert_equals(currentTZDate.getDate(), 15, "value check");
}, 'TZDate_setDate');

}

function TZDate_setDate_for_specific_date() {
//==== TEST: TZDate_setDate_for_specific_date
//==== LABEL Check various arguments for setDate() method
//==== SPEC Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MAST MMINA
test(function () {
    var tmpDate = new tizen.TZDate(2000, 4, 3),
        cmpDate = new Date(2000, 4, 3),
        testDataArray           = [1, 12, 21, 30, 31],
        testInvalidDataArray    = [-1, 32, 123],
        testName  = "testSetDate()",
        i;

    for (i = 0; i < testDataArray.length; i++) {
        tmpDate.setDate(testDataArray[i]);
        assert_equals(tmpDate.getDate(), testDataArray[i], testName + " data value " + testDataArray[i]);
    }

    for (i = 0; i < testAdditionalParamArray.length; i++) {
        tmpDate.setDate(testDataArray[i], testAdditionalParamArray[i]);
        assert_equals(tmpDate.getDate(), testDataArray[i], testName + " data value " + testDataArray[i]);
    }

    for (i = 0; i < testInvalidDataArray.length; i++) {
        tmpDate.setDate(testInvalidDataArray[i]);
        cmpDate.setDate(testInvalidDataArray[i]);
        assert_equals(tmpDate.getDate(), cmpDate.getDate(), testName + " data value " + testInvalidDataArray[i]);
    }
}, 'TZDate_setDate_for_specific_date');

}

function TZDate_setDate_exist() {
//==== TEST: TZDate_setDate_exist
//==== LABEL Check if setDate() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setDate" in currentTZDate, "setDate method exists");
    check_method_exists(currentTZDate, "setDate");
}, 'TZDate_setDate_exist');

}

function TZDate_setFullYear() {
//==== TEST: TZDate_setFullYear
//==== LABEL Check if TZDate::setFullYear() method sets year and returns nothing
//==== SPEC: Tizen Web API:System:Time:TZDate:setFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setFullYear(2000);
    assert_equals(returnedValue, undefined, "setFullYear() should return undefined.");
    assert_equals(currentTZDate.getFullYear(), 2000, "value check");
}, 'TZDate_setFullYear');

}

function TZDate_setFullYear_exist() {
//==== TEST: TZDate_setFullYear_exist
//==== LABEL Check if setFullYear() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setFullYear" in currentTZDate, "setFullYear method exists");
    check_method_exists(currentTZDate, "setFullYear");
}, 'TZDate_setFullYear_exist');

}

function TZDate_setHours() {
//==== TEST: TZDate_setHours
//==== LABEL Check if TZDate::setHours() method sets hour and returns nothing
//==== SPEC: Tizen Web API:System:Time:TZDate:setHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27, 18);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setHours(11);
    assert_equals(returnedValue, undefined, "setHours() should return undefined.");
    assert_equals(currentTZDate.getHours(), 11, "value check");
}, 'TZDate_setHours');

}

function TZDate_setHours_exist() {
//==== TEST: TZDate_setHours_exist
//==== LABEL Check if setHours() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setHours" in currentTZDate, "setHours method exists");
    check_method_exists(currentTZDate, "setHours");
}, 'TZDate_setHours_exist');

}

function TZDate_setMilliseconds() {
//==== TEST: TZDate_setMilliseconds
//==== LABEL Check if TZDate::setMilliseconds() method sets milliseconds and returns nothing
//==== SPEC: Tizen Web API:System:Time:TZDate:setMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27, 18, 42, 48, 100);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setMilliseconds(431);
    assert_equals(returnedValue, undefined, "setMilliseconds() should return undefined.");
    assert_equals(currentTZDate.getMilliseconds(), 431, "value check");
}, 'TZDate_setMilliseconds');

}

function TZDate_setMilliseconds_exist() {
//==== TEST: TZDate_setMilliseconds_exist
//==== LABEL Check if setMilliseconds() method exists in TZDate
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setMilliseconds" in currentTZDate, "setMilliseconds method exists");
    check_method_exists(currentTZDate, "setMilliseconds");
}, 'TZDate_setMilliseconds_exist');

}

function TZDate_setMinutes() {
//==== TEST: TZDate_setMinutes
//==== LABEL Check if method setMinutes of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:setMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27, 18, 42);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setMinutes(31);
    assert_equals(returnedValue, undefined, "setMinutes() should return undefined.");
    assert_equals(currentTZDate.getMinutes(), 31, "value check");
}, 'TZDate_setMinutes');

}

function TZDate_setMinutes_exist() {
//==== TEST: TZDate_setMinutes_exist
//==== LABEL Check if setMinutes method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setMinutes" in currentTZDate, "setMinutes method exists");
    check_method_exists(currentTZDate, "setMinutes");
}, 'TZDate_setMinutes_exist');

}

function TZDate_setMonth() {
//==== TEST: TZDate_setMonth
//==== LABEL Check if method setMonth of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:setMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setMonth(5);
    assert_equals(returnedValue, undefined, "setMonth() should return undefined.");
    assert_equals(currentTZDate.getMonth(), 5, "value check");
}, 'TZDate_setMonth');

}

function TZDate_setMonth_exist() {
//==== TEST: TZDate_setMonth_exist
//==== LABEL Check if setMonth method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setMonth" in currentTZDate, "setMonth method exists");
    check_method_exists(currentTZDate, "setMonth");
}, 'TZDate_setMonth_exist');

}

function TZDate_setSeconds() {
//==== TEST: TZDate_setSeconds
//==== LABEL Check if method setSeconds of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:setSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27, 3, 23, 54);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setSeconds(5);
    assert_equals(returnedValue, undefined, "setSeconds() should return undefined.");
    assert_equals(currentTZDate.getSeconds(), 5, "value check");
}, 'TZDate_setSeconds');

}

function TZDate_setSeconds_exist() {
//==== TEST: TZDate_setSeconds_exist
//==== LABEL Check if setSeconds method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setSeconds" in currentTZDate, "setSeconds method exists");
    check_method_exists(currentTZDate, "setSeconds");
}, 'TZDate_setSeconds_exist');

}

function TZDate_setUTCDate() {
//==== TEST: TZDate_setUTCDate
//==== LABEL Check if method setUTCDate of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setUTCDate(31);
    assert_equals(returnedValue, undefined, "setUTCDate() should return undefined.");
    assert_equals(currentTZDate.getUTCDate(), 31, "value check");
}, 'TZDate_setUTCDate');

}

function TZDate_setUTCDate_exist() {
//==== TEST: TZDate_setUTCDate_exist
//==== LABEL Check if setUTCDate method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCDate M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setUTCDate" in currentTZDate, "setUTCDate method exists");
    check_method_exists(currentTZDate, "setUTCDate");
}, 'TZDate_setUTCDate_exist');

}

function TZDate_setUTCFullYear() {
//==== TEST: TZDate_setUTCFullYear
//==== LABEL Check if method setUTCFullYear of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setUTCFullYear(1999);
    assert_equals(returnedValue, undefined, "setUTCFullYear() should return undefined.");
    assert_equals(currentTZDate.getUTCFullYear(), 1999, "value check");
}, 'TZDate_setUTCFullYear');

}

function TZDate_setUTCFullYear_exist() {
//==== TEST: TZDate_setUTCFullYear_exist
//==== LABEL Check if setUTCFullYear method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCFullYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setUTCFullYear" in currentTZDate, "setUTCFullYear method exists");
    check_method_exists(currentTZDate, "setUTCFullYear");
}, 'TZDate_setUTCFullYear_exist');

}

function TZDate_setUTCHours() {
//==== TEST: TZDate_setUTCHours
//==== LABEL Check if method setUTCHours of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27, 11);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setUTCHours(23);
    assert_equals(returnedValue, undefined, "setUTCHours() should return undefined.");
    assert_equals(currentTZDate.getUTCHours(), 23, "value check");
}, 'TZDate_setUTCHours');

}

function TZDate_setUTCHours_exist() {
//==== TEST: TZDate_setUTCHours_exist
//==== LABEL Check if setUTCHours method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCHours M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setUTCHours" in currentTZDate, "setUTCHours method exists");
    check_method_exists(currentTZDate, "setUTCHours");
}, 'TZDate_setUTCHours_exist');

}

function TZDate_setUTCMilliseconds() {
//==== TEST: TZDate_setUTCMilliseconds
//==== LABEL Check if method setUTCMilliseconds of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27, 11, 32, 12, 543);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setUTCMilliseconds(999);
    assert_equals(returnedValue, undefined, "setUTCMilliseconds() should return undefined.");
    assert_equals(currentTZDate.getUTCMilliseconds(), 999, "value check");
}, 'TZDate_setUTCMilliseconds');

}

function TZDate_setUTCMilliseconds_exist() {
//==== TEST: TZDate_setUTCMilliseconds_exist
//==== LABEL Check if setUTCMilliseconds method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCMilliseconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setUTCMilliseconds" in currentTZDate, "setUTCMilliseconds method exists");
    check_method_exists(currentTZDate, "setUTCMilliseconds");
}, 'TZDate_setUTCMilliseconds_exist');

}

function TZDate_setUTCMinutes() {
//==== TEST: TZDate_setUTCMinutes
//==== LABEL Check if method setUTCMinutes of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27, 11, 32);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setUTCMinutes(59);
    assert_equals(returnedValue, undefined, "setUTCMinutes() should return undefined.");
    assert_equals(currentTZDate.getUTCMinutes(), 59, "value check");
}, 'TZDate_setUTCMinutes');

}

function TZDate_setUTCMinutes_exist() {
//==== TEST: TZDate_setUTCMinutes_exist
//==== LABEL Check if setUTCMinutes method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCMinutes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setUTCMinutes" in currentTZDate, "setUTCMinutes method exists");
    check_method_exists(currentTZDate, "setUTCMinutes");
}, 'TZDate_setUTCMinutes_exist');

}

function TZDate_setUTCMonth() {
//==== TEST: TZDate_setUTCMonth
//==== LABEL Check if method setUTCMonth of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setUTCMonth(11);
    assert_equals(returnedValue, undefined, "setUTCMonth() should return undefined.");
    assert_equals(currentTZDate.getUTCMonth(), 11, "value check");
}, 'TZDate_setUTCMonth');

}

function TZDate_setUTCMonth_exist() {
//==== TEST: TZDate_setUTCMonth_exist
//==== LABEL Check if setUTCMonth method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCMonth M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setUTCMonth" in currentTZDate, "setUTCMonth method exists");
    check_method_exists(currentTZDate, "setUTCMonth");
}, 'TZDate_setUTCMonth_exist');

}

function TZDate_setUTCSeconds() {
//==== TEST: TZDate_setUTCSeconds
//==== LABEL Check if method setUTCSeconds of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MAST MR
test(function () {
    var currentTZDate, date, returnedValue = null;
    date = new Date(2013, 2, 27, 11, 34, 11);
    currentTZDate = new tizen.TZDate(date);
    returnedValue = currentTZDate.setUTCSeconds(0);
    assert_equals(returnedValue, undefined, "setUTCSeconds() should return undefined.");
    assert_equals(currentTZDate.getUTCSeconds(), 0, "value check");
}, 'TZDate_setUTCSeconds');

}

function TZDate_setUTCSeconds_exist() {
//==== TEST: TZDate_setUTCSeconds_exist
//==== LABEL Check if setUTCSeconds method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:setUTCSeconds M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("setUTCSeconds" in currentTZDate, "setUTCSeconds method exists");
    check_method_exists(currentTZDate, "setUTCSeconds");
}, 'TZDate_setUTCSeconds_exist');

}

function TZDate_toDateString() {
//==== TEST: TZDate_toDateString
//==== LABEL Check if TZDate::ToDateString() method returns non-empty string
//==== SPEC: Tizen Web API:System:Time:TZDate:toDateString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue = null;
    returnedValue = currentTZDate.toDateString();
    assert_type(returnedValue, "string", "type check");
    assert_not_equals(returnedValue, "", "returned");
}, 'TZDate_toDateString');

}

function TZDate_toDateString_for_specific_date() {
//==== TEST: TZDate_toDateString_for_specific_date
//==== LABEL Check whether toDateString() method correctly returns the date portion of a TZDate object as a string
//==== SPEC Tizen Web API:System:Time:TZDate:toDateString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA
test(function () {
    var expectedDateString = "Friday, November 11, 2011", i = 0, date;
    date = new tizen.TZDate(2011, 10, 11);
    assert_equals(date.toDateString(), expectedDateString, this.name);
    for (i = 0; i < testAdditionalParamArray.length; i++) {
        assert_equals(date.toDateString(testAdditionalParamArray[i]), expectedDateString, this.name);
    }
}, 'TZDate_toDateString_for_specific_date');

}

function TZDate_toDateString_exist() {
//==== TEST: TZDate_toDateString_exist
//==== LABEL Check if toDateString method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:toDateString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("toDateString" in currentTZDate, "toDateString method exists");
    check_method_exists(currentTZDate, "toDateString");
}, 'TZDate_toDateString_exist');

}

function TZDate_toDateString_extra_argument() {
//==== TEST: TZDate_toDateString_extra_argument
//==== LABEL Check if method toDateString of TZDate accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:toDateString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "toDateString");
}, 'TZDate_toDateString_extra_argument');

}

function TZDate_toLocalTimezone() {
//==== TEST: TZDate_toLocalTimezone
//==== LABEL Check if method toLocalTimezone of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocalTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue = null;
    returnedValue = currentTZDate.toLocalTimezone();
    assert_true(returnedValue instanceof tizen.TZDate, "TZDate check");
}, 'TZDate_toLocalTimezone');

}

function TZDate_toLocalTimezone_for_specific_date() {
//==== TEST: TZDate_toLocalTimezone_for_specific_date
//==== LABEL Tizen.TZDate.toLocalTimezone (null) WRONG argument(s)
//==== SPEC Tizen Web API:System:Time:TZDate:toLocalTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var date = new tizen.TZDate();
    date.toLocalTimezone(null);
}, 'TZDate_toLocalTimezone_for_specific_date');

}

function TZDate_toLocalTimezone_exist() {
//==== TEST: TZDate_toLocalTimezone_exist
//==== LABEL Check if toLocalTimezone method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocalTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("toLocalTimezone" in currentTZDate, "toLocalTimezone method exists");
    check_method_exists(currentTZDate, "toLocalTimezone");
}, 'TZDate_toLocalTimezone_exist');

}

function TZDate_toLocalTimezone_extra_argument() {
//==== TEST: TZDate_toLocalTimezone_extra_argument
//==== LABEL Check if method toLocalTimezone of TZDate accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocalTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "toLocalTimezone");
}, 'TZDate_toLocalTimezone_extra_argument');

}

function TZDate_toLocaleDateString() {
//==== TEST: TZDate_toLocaleDateString
//==== LABEL Check if TZDate::ToLocaleDateString() method returns non-empty string
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocaleDateString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue = null;
    returnedValue = currentTZDate.toLocaleDateString();
    assert_type(returnedValue, "string", "type check");
    assert_not_equals(returnedValue, "", "returned");
}, 'TZDate_toLocaleDateString');

}

function TZDate_toLocaleDateString_exist() {
//==== TEST: TZDate_toLocaleDateString_exist
//==== LABEL Check if toLocaleDateString method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocaleDateString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("toLocaleDateString" in currentTZDate, "toLocaleDateString method exists");
    check_method_exists(currentTZDate, "toLocaleDateString");
}, 'TZDate_toLocaleDateString_exist');

}

function TZDate_toLocaleDateString_extra_argument() {
//==== TEST: TZDate_toLocaleDateString_extra_argument
//==== LABEL Check if method toLocaleDateString of TZDate accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocaleDateString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "toLocaleDateString");
}, 'TZDate_toLocaleDateString_extra_argument');

}

function TZDate_toLocaleString() {
//==== TEST: TZDate_toLocaleString
//==== LABEL Check if TZDate::ToLocaleString() method returns non-empty string
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocaleString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue = null;
    returnedValue = currentTZDate.toLocaleString();
    assert_type(returnedValue, "string", "type check");
    assert_not_equals(returnedValue, "", "returned");
}, 'TZDate_toLocaleString');

}

function TZDate_toLocaleString_exist() {
//==== TEST: TZDate_toLocaleString_exist
//==== LABEL Check if toLocaleString method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocaleString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("toLocaleString" in currentTZDate, "toLocaleString method exists");
    check_method_exists(currentTZDate, "toLocaleString");
}, 'TZDate_toLocaleString_exist');

}

function TZDate_toLocaleString_extra_argument() {
//==== TEST: TZDate_toLocaleString_extra_argument
//==== LABEL Check if method toLocaleString of TZDate accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocaleString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "toLocaleString");
}, 'TZDate_toLocaleString_extra_argument');

}

function TZDate_toLocaleTimeString() {
//==== TEST: TZDate_toLocaleTimeString
//==== LABEL Check if TZDate::ToLocaleTimeString() method returns non-empty string
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocaleTimeString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue = null;
    returnedValue = currentTZDate.toLocaleTimeString();
    assert_type(returnedValue, "string", "type check");
    assert_not_equals(returnedValue, "", "returned");
}, 'TZDate_toLocaleTimeString');

}

function TZDate_toLocaleTimeString_exist() {
//==== TEST: TZDate_toLocaleTimeString_exist
//==== LABEL Check if toLocaleTimeString method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocaleTimeString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("toLocaleTimeString" in currentTZDate, "toLocaleTimeString method exists");
    check_method_exists(currentTZDate, "toLocaleTimeString");
}, 'TZDate_toLocaleTimeString_exist');

}

function TZDate_toLocaleTimeString_extra_argument() {
//==== TEST: TZDate_toLocaleTimeString_extra_argument
//==== LABEL Check if method toLocaleTimeString of TZDate accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:toLocaleTimeString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "toLocaleTimeString");
}, 'TZDate_toLocaleTimeString_extra_argument');

}

function TZDate_toString() {
//==== TEST: TZDate_toString
//==== LABEL Check if TZDate::ToString() method returns non-empty string
//==== SPEC: Tizen Web API:System:Time:TZDate:toString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue = null;
    returnedValue = currentTZDate.toString();
    assert_type(returnedValue, "string", "type check");
    assert_not_equals(returnedValue, "", "returned");
}, 'TZDate_toString');

}

function TZDate_toString_exist() {
//==== TEST: TZDate_toString_exist
//==== LABEL Check if toString method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:toString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("toString" in currentTZDate, "toString method exists");
    check_method_exists(currentTZDate, "toString");
}, 'TZDate_toString_exist');

}

function TZDate_toString_extra_argument() {
//==== TEST: TZDate_toString_extra_argument
//==== LABEL Check if method toString of TZDate accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:toString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "toString");
}, 'TZDate_toString_extra_argument');

}

function TZDate_toTimeString() {
//==== TEST: TZDate_toTimeString
//==== LABEL Check if TZDate::ToTimeString() method returns non-empty string
//==== SPEC: Tizen Web API:System:Time:TZDate:toTimeString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue = null;
    returnedValue = currentTZDate.toTimeString();
    assert_type(returnedValue, "string", "type check");
    assert_not_equals(returnedValue, "", "returned");
}, 'TZDate_toTimeString');

}

function TZDate_toTimeString_for_specific_date() {
//==== TEST: TZDate_toTimeString_for_specific_date
//==== LABEL Check whether toTimeString() method correctly returns the time portion of a TZDate object as a string
//==== SPEC Tizen Web API:System:Time:TZDate:toTimeString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    assert_regexp_match(date.toTimeString(), /0?4:55:54( AM)? GMT\+0900 South Korea Time/, this.name);
}, 'TZDate_toTimeString_for_specific_date');

}

function TZDate_toTimeString_exist() {
//==== TEST: TZDate_toTimeString_exist
//==== LABEL Check if toTimeString method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:toTimeString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("toTimeString" in currentTZDate, "toTimeString method exists");
    check_method_exists(currentTZDate, "toTimeString");
}, 'TZDate_toTimeString_exist');

}

function TZDate_toTimeString_extra_argument() {
//==== TEST: TZDate_toTimeString_extra_argument
//==== LABEL Check whether Tizen.TZDate.getMonth() extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:toTimeString M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "toTimeString");
}, 'TZDate_toTimeString_extra_argument');

}

function TZDate_toTimezone() {
//==== TEST: TZDate_toTimezone
//==== LABEL Check if method toTimezone of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:toTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue = null;
    returnedValue = currentTZDate.toTimezone("Europe/Berlin");
    assert_true(returnedValue instanceof tizen.TZDate, "TZDate check");
}, 'TZDate_toTimezone');

}

function TZDate_toTimezone_exist() {
//==== TEST: TZDate_toTimezone_exist
//==== LABEL Check if toTimezone method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:toTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("toTimezone" in currentTZDate, "toTimezone method exists");
    check_method_exists(currentTZDate, "toTimezone");
}, 'TZDate_toTimezone_exist');

}

function TZDate_toUTC() {
//==== TEST: TZDate_toUTC
//==== LABEL Check if method toUTC of TZDate works properly.
//==== SPEC: Tizen Web API:System:Time:TZDate:toUTC M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime(), returnedValue = null;
    returnedValue = currentTZDate.toUTC();
    assert_true(returnedValue instanceof tizen.TZDate, "TZDate check");
}, 'TZDate_toUTC');

}

function TZDate_toUTC_exist() {
//==== TEST: TZDate_toUTC_exist
//==== LABEL Check if toUTC method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TZDate:toUTC M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    assert_true("toUTC" in currentTZDate, "toUTC method exists");
    check_method_exists(currentTZDate, "toUTC");
}, 'TZDate_toUTC_exist');

}

function TZDate_toUTC_extra_argument() {
//==== TEST: TZDate_toUTC_extra_argument
//==== LABEL Check if method toUTC of TZDate accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TZDate:toUTC M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    var currentTZDate = tizen.time.getCurrentDateTime();
    checkExtraArgument(currentTZDate, "toUTC");
}, 'TZDate_toUTC_extra_argument');

}

function TimeDuration_constructor_maximal() {
//==== TEST: TimeDuration_constructor_maximal
//==== LABEL Test whether the maximal constructor of the TimeDuration interface is defined or not.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeDuration:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA CONSTRM CONSTRA
test(function () {
    var timeduration = new tizen.TimeDuration(20, "DAYS");
    assert_true(timeduration instanceof tizen.TimeDuration, "TimeDuration check");
    assert_type(timeduration, "object", "type check");
    assert_equals(timeduration.length, 20, "length attribute value check");
    assert_equals(timeduration.unit, "DAYS", "unit attribute value check");
}, 'TimeDuration_constructor_maximal');

}

function TimeDuration_constructor_minimal() {
//==== TEST: TimeDuration_constructor_minimal
//==== LABEL Test whether the minimal constructor of the TimeDuration interface is defined or not.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeDuration:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA CONSTRM CONSTRA
test(function () {
    var timeduration = new tizen.TimeDuration(20);
    assert_true(timeduration instanceof tizen.TimeDuration, "TimeDuration check");
    assert_type(timeduration, "object", "type check");
    assert_equals(timeduration.length, 20, "length attribute value check");
}, 'TimeDuration_constructor_minimal');

}

function TimeDuration_difference() {
//==== TEST: TimeDuration_difference
//==== LABEL Check if method difference of TimeDuration works properly.
//==== SPEC: Tizen Web API:System:Time:TimeDuration:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var timeDuration1, timeDuration2, returnedValue;
    timeDuration1 = new tizen.TimeDuration(1, "DAYS");
    timeDuration2 = new tizen.TimeDuration(60, "DAYS");
    returnedValue = timeDuration1.difference(timeDuration2);
    assert_true(returnedValue instanceof tizen.TimeDuration, "TimeDuration check");
    assert_equals(returnedValue.length, -59, "length check");
    assert_equals(returnedValue.unit, "DAYS", "length check");
}, 'TimeDuration_difference');

}

function TimeDuration_difference_exist() {
//==== TEST: TimeDuration_difference_exist
//==== LABEL Check if difference method exists in TimeDuration.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeDuration:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    assert_true("difference" in currentTimeDuration, "difference method exists");
    check_method_exists(currentTimeDuration, "difference");
}, 'TimeDuration_difference_exist');

}

function TimeDuration_difference_missarg() {
//==== TEST: TimeDuration_difference_missarg
//==== LABEL Check if difference method with missing non-optional argument works in TimeDuration
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMA
test(function () {
    var currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTimeDuration.difference();
        });
}, 'TimeDuration_difference_missarg');

}

function TimeDuration_difference_other_TypeMismatch() {
//==== TEST: TimeDuration_difference_other_TypeMismatch
//==== LABEL Check argument difference conversions exception in TimeDuration.
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    var currentTimeDuration, conversionTable, other, exceptionName, i;

    currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    conversionTable = getTypeConversionExceptions("functionObject", false);
    for (i = 0; i < conversionTable.length; i++) {
        other = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                currentTimeDuration.difference(other);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
}, 'TimeDuration_difference_other_TypeMismatch');

}

function TimeDuration_difference_other_invalid_obj() {
//==== TEST: TimeDuration_difference_other_invalid_obj
//==== LABEL Check argument validation in difference method in TimeDuration.
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MTO
test(function () {
    var currentTimeDuration = [], exceptionName = TYPE_MISMATCH_ERR;

    currentTimeDuration[0] = new tizen.TimeDuration(1, "DAYS");
    currentTimeDuration[1] = {length: 2, unit: "MINS"};
    assert_throws({name: exceptionName},
        function () {
            currentTimeDuration[0].difference(currentTimeDuration[1]);
        }, exceptionName + " should be thrown - given incorrect argument.");
}, 'TimeDuration_difference_other_invalid_obj');

}

function TimeDuration_equalsTo() {
//==== TEST: TimeDuration_equalsTo
//==== LABEL Check if method equalsTo of TimeDuration works properly.
//==== SPEC: Tizen Web API:System:Time:TimeDuration:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var timeDuration1, timeDuration2, returnedValue;
    timeDuration1 = new tizen.TimeDuration(1, "DAYS");
    timeDuration2 = new tizen.TimeDuration(60, "DAYS");
    returnedValue = timeDuration1.equalsTo(timeDuration2);
    assert_equals(returnedValue, false, "equalsTo value check");
}, 'TimeDuration_equalsTo');

}

function TimeDuration_equalsTo_exist() {
//==== TEST: TimeDuration_equalsTo_exist
//==== LABEL Check if equalsTo method exists in TimeDuration.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeDuration:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    assert_true("equalsTo" in currentTimeDuration, "equalsTo method exists");
    check_method_exists(currentTimeDuration, "equalsTo");
}, 'TimeDuration_equalsTo_exist');

}

function TimeDuration_equalsTo_missarg() {
//==== TEST: TimeDuration_equalsTo_missarg
//==== LABEL Check if equalsTo method with missing non-optional argument works in TimeDuration
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMA
test(function () {
    var currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTimeDuration.equalsTo();
        });
}, 'TimeDuration_equalsTo_missarg');

}

function TimeDuration_equalsTo_other_TypeMismatch() {
//==== TEST: TimeDuration_equalsTo_other_TypeMismatch
//==== LABEL Check argument equalsTo conversions exception in TimeDuration.
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    var currentTimeDuration, conversionTable, other, exceptionName, i;

    currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    conversionTable = getTypeConversionExceptions("functionObject", false);
    for (i = 0; i < conversionTable.length; i++) {
        other = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                currentTimeDuration.equalsTo(other);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
}, 'TimeDuration_equalsTo_other_TypeMismatch');

}

function TimeDuration_equalsTo_other_invalid_obj() {
//==== TEST: TimeDuration_equalsTo_other_invalid_obj
//==== LABEL Check argument validation in equalsTo method in TimeDuration.
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:equalsTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MTO
test(function () {
    var currentTimeDuration = [], exceptionName = TYPE_MISMATCH_ERR;

    currentTimeDuration[0] = new tizen.TimeDuration(1, "DAYS");
    currentTimeDuration[1] = {length: 2, unit: "MINS"};
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTimeDuration[0].equalsTo(currentTimeDuration[1]);
        }, exceptionName + " should be thrown - given incorrect argument.");
}, 'TimeDuration_equalsTo_other_invalid_obj');

}

function TimeDuration_exist() {
//==== TEST: TimeDuration_exist
//==== LABEL Test whether the constructor of the TimeDuration interface is defined or not.
//==== PRIORITY: P0
//==== SPEC: Tizen Web API:System:Time:TimeDuration:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA CONSTRF
test(function () {
    check_constructor("TimeDuration");
}, 'TimeDuration_exist');

}

function TimeDuration_extend() {
//==== TEST: TimeDuration_extend
//==== LABEL Test whether TimeDuration the object can have new attribute added
//==== PRIORITY: P3
//==== SPEC: Tizen Web API:System:Time:TimeDuration:TimeDuration U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA OBX
test(function () {
    var currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    check_extensibility(currentTimeDuration);
}, 'TimeDuration_extend');

}

function TimeDuration_greaterThan() {
//==== TEST: TimeDuration_greaterThan
//==== LABEL Check if method greaterThan of TimeDuration works properly.
//==== SPEC: Tizen Web API:System:Time:TimeDuration:greaterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var timeDuration1, timeDuration2, returnedValue;
    timeDuration1 = new tizen.TimeDuration(1, "DAYS");
    timeDuration2 = new tizen.TimeDuration(60, "DAYS");
    returnedValue = timeDuration1.greaterThan(timeDuration2);
    assert_equals(returnedValue, false, "equalsTo value check");
}, 'TimeDuration_greaterThan');

}

function TimeDuration_greaterThan_exist() {
//==== TEST: TimeDuration_greaterThan_exist
//==== LABEL Check if greaterThan method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeDuration:greaterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    assert_true("greaterThan" in currentTimeDuration, "greaterThan method exists");
    check_method_exists(currentTimeDuration, "greaterThan");
}, 'TimeDuration_greaterThan_exist');

}

function TimeDuration_greaterThan_missarg() {
//==== TEST: TimeDuration_greaterThan_missarg
//==== LABEL Check if greaterThan method with missing non-optional argument works
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:greaterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMA
test(function () {
    var currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTimeDuration.greaterThan();
        });
}, 'TimeDuration_greaterThan_missarg');

}

function TimeDuration_greaterThan_other_TypeMismatch() {
//==== TEST: TimeDuration_greaterThan_other_TypeMismatch
//==== LABEL Check argument greaterThan conversions exception.
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:greaterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    var currentTimeDuration, conversionTable, other, exceptionName, i;

    currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    conversionTable = getTypeConversionExceptions("functionObject", false);
    for (i = 0; i < conversionTable.length; i++) {
        other = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                currentTimeDuration.greaterThan(other);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
}, 'TimeDuration_greaterThan_other_TypeMismatch');

}

function TimeDuration_greaterThan_other_invalid_obj() {
//==== TEST: TimeDuration_greaterThan_other_invalid_obj
//==== LABEL Check argument validation in greaterThan method in TimeDuration.
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:greaterThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MTO
test(function () {
    var currentTimeDuration = [], exceptionName = TYPE_MISMATCH_ERR;

    currentTimeDuration[0] = new tizen.TimeDuration(1, "DAYS");
    currentTimeDuration[1] = {length: 2, unit: "MINS"};
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTimeDuration[0].greaterThan(currentTimeDuration[1]);
        }, exceptionName + " should be thrown - given incorrect argument.");
}, 'TimeDuration_greaterThan_other_invalid_obj');

}

function TimeDuration_length_attribute() {
//==== TEST: TimeDuration_length_attribute
//==== LABEL Check existent and type attribute length
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeDuration:length A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA AE AT ASG AN
var timeDuration;
test(function () {
    timeDuration = new tizen.TimeDuration(1);
    assert_equals(timeDuration.length, 1, "Default value is incorrect");
    check_attribute(timeDuration, "length", 1, "number", 5);
    timeDuration.length = null;
    assert_not_equals(timeDuration.length, null, "operation no accept null");
}, 'TimeDuration_length_attribute');

}

function TimeDuration_lessThan() {
//==== TEST: TimeDuration_lessThan
//==== LABEL Check if method lessThan of TimeDuration works properly.
//==== SPEC: Tizen Web API:System:Time:TimeDuration:lessThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var timeDuration1, timeDuration2, returnedValue;
    timeDuration1 = new tizen.TimeDuration(1, "DAYS");
    timeDuration2 = new tizen.TimeDuration(60, "DAYS");
    returnedValue = timeDuration1.lessThan(timeDuration2);
    assert_equals(returnedValue, true, "equalsTo value check");
}, 'TimeDuration_lessThan');

}

function TimeDuration_lessThan_exist() {
//==== TEST: TimeDuration_lessThan_exist
//==== LABEL Check if lessThan method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeDuration:lessThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    var currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    assert_true("lessThan" in currentTimeDuration, "lessThan method exists");
    check_method_exists(currentTimeDuration, "lessThan");
}, 'TimeDuration_lessThan_exist');

}

function TimeDuration_lessThan_missarg() {
//==== TEST: TimeDuration_lessThan_missarg
//==== LABEL Check if lessThan method with missing non-optional argument works
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:lessThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMA
test(function () {
    var currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTimeDuration.lessThan();
        });
}, 'TimeDuration_lessThan_missarg');

}

function TimeDuration_lessThan_other_TypeMismatch() {
//==== TEST: TimeDuration_lessThan_other_TypeMismatch
//==== LABEL Check argument lessThan conversions exception.
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:lessThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MC
test(function () {
    var currentTimeDuration, conversionTable, other, exceptionName, i;

    currentTimeDuration = new tizen.TimeDuration(1, "DAYS");
    conversionTable = getTypeConversionExceptions("functionObject", false);
    for (i = 0; i < conversionTable.length; i++) {
        other = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                currentTimeDuration.lessThan(other);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }
}, 'TimeDuration_lessThan_other_TypeMismatch');

}

function TimeDuration_lessThan_other_invalid_obj() {
//==== TEST: TimeDuration_lessThan_other_invalid_obj
//==== LABEL Check argument validation in lessThan method in TimeDuration.
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TimeDuration:lessThan M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MTO
test(function () {
    var currentTimeDuration = [], exceptionName = TYPE_MISMATCH_ERR;

    currentTimeDuration[0] = new tizen.TimeDuration(1, "DAYS");
    currentTimeDuration[1] = {length: 2, unit: "MINS"};
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            currentTimeDuration[0].lessThan(currentTimeDuration[1]);
        }, exceptionName + " should be thrown - given incorrect argument.");
}, 'TimeDuration_lessThan_other_invalid_obj');

}

function TimeDuration_unit_attribute() {
//==== TEST: TimeDuration_unit_attribute
//==== LABEL Check existent and type attribute unit
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeDuration:unit A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA AE AT ASG ADV AN
var timeDuration;
test(function () {
    timeDuration = new tizen.TimeDuration(1, null);
    assert_equals(timeDuration.unit, "MSECS", "Default value is incorrect");
    timeDuration = new tizen.TimeDuration(1, "DAYS");
    assert_equals(timeDuration.unit, "DAYS", "Get value is incorrect");
    check_attribute(timeDuration, "unit", "DAYS", "string", "SECS");
    timeDuration.unit = null;
    assert_not_equals(timeDuration.unit, null, "operation no accept null");
}, 'TimeDuration_unit_attribute');

}

function TimeUtil_extend() {
//==== TEST: TimeUtil_extend
//==== LABEL Test whether the TimeManager object can have new attribute added
//==== PRIORITY: P3
//==== SPEC: Tizen Web API:System:Time:TimeUtil:TimeUtil U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA OBX
test(function () {
    check_extensibility(tizen.time);
}, 'TimeUtil_extend');

}

function TimeUtil_getAvailableTimezones() {
//==== TEST: TimeUtil_getAvailableTimezones
//==== LABEL Check if method getAvailableTimezones of TimeUtil works properly.
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getAvailableTimezones M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var returnedValue = null, i;
    returnedValue = tizen.time.getAvailableTimezones();
    assert_type(returnedValue, "array", "Timezone array type");
    assert_not_equals(returnedValue, null, "null check");
    for (i = 0; i < returnedValue.length; i++) {
        assert_type(returnedValue[i], "string", "Timezone type - " + i);
    }
}, 'TimeUtil_getAvailableTimezones');

}

function TimeUtil_getAvailableTimezones_exist() {
//==== TEST: TimeUtil_getAvailableTimezones_exist
//==== LABEL Check if getAvailableTimezones method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getAvailableTimezones M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("getAvailableTimezones" in tizen.time, "getAvailableTimezones method exists");
    check_method_exists(tizen.time, "getAvailableTimezones");
}, 'TimeUtil_getAvailableTimezones_exist');

}

function TimeUtil_getAvailableTimezones_extra_argument() {
//==== TEST: TimeUtil_getAvailableTimezones_extra_argument
//==== LABEL Check if method getAvailableTimezones of TimeUtil accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getAvailableTimezones M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.time, "getAvailableTimezones");
}, 'TimeUtil_getAvailableTimezones_extra_argument');

}

function TimeUtil_getCurrentDateTime() {
//==== TEST: TimeUtil_getCurrentDateTime
//==== LABEL Check if method getCurrentDateTime of TimeUtil works properly.
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getCurrentDateTime M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA
test(function () {
    var returnedValue;
    returnedValue = tizen.time.getCurrentDateTime();
    assert_type(returnedValue, "object", "value type");
    assert_not_equals(returnedValue, null, "null check");
}, 'TimeUtil_getCurrentDateTime');

}

function TimeUtil_getCurrentDateTime_instanceof() {
//==== TEST: TimeUtil_getCurrentDateTime_instanceof
//==== LABEL Check whether getCurrentDateTime() method returns the current date / time correctly
//==== SPEC Tizen Web API:System:Time:TimeUtil:getCurrentDateTime M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var currentDate = tizen.time.getCurrentDateTime(), i;

    assert_true(currentDate instanceof tizen.TZDate, "testGetCurrentDateTime() date:");
    for (i = 0; i < testAdditionalParamArray.length; i++) {
        assert_true(tizen.time.getCurrentDateTime(testAdditionalParamArray[i])  instanceof tizen.TZDate, "testGetCurrentDateTime() date:");
    }
}, 'TimeUtil_getCurrentDateTime_instanceof');

}

function TimeUtil_getCurrentDateTime_exist() {
//==== TEST: TimeUtil_getCurrentDateTime_exist
//==== LABEL Check if getCurrentDateTime method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getCurrentDateTime M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("getCurrentDateTime" in tizen.time, "getCurrentDateTime method exists");
    check_method_exists(tizen.time, "getCurrentDateTime");
}, 'TimeUtil_getCurrentDateTime_exist');

}

function TimeUtil_getCurrentDateTime_extra_argument() {
//==== TEST: TimeUtil_getCurrentDateTime_extra_argument
//==== LABEL Check if method getCurrentDateTime of TimeUtil accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getCurrentDateTime M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.time, "getCurrentDateTime");
}, 'TimeUtil_getCurrentDateTime_extra_argument');

}

function TimeUtil_getDateFormat() {
//==== TEST: TimeUtil_getDateFormat
//==== LABEL Check if method getDateFormat of TimeUtil works properly.
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getDateFormat M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MOA MR
test(function () {
    var returnedValue, def = "d/m/y", shortformat = true;
    returnedValue = tizen.time.getDateFormat(shortformat);
    assert_type(returnedValue, "string", "Timezone type");
}, 'TimeUtil_getDateFormat');

}

function TimeUtil_getDateFormat_exist() {
//==== TEST: TimeUtil_getDateFormat_exist
//==== LABEL Check if getDateFormat method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getDateFormat M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("getDateFormat" in tizen.time, "getDateFormat method exists");
    check_method_exists(tizen.time, "getDateFormat");
}, 'TimeUtil_getDateFormat_exist');

}

function TimeUtil_getLocalTimezone() {
//==== TEST: TimeUtil_getLocalTimezone
//==== LABEL Check if method getLocalTimezone of TimeUtil works properly.
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getLocalTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNA MR
test(function () {
    var returnedValue;
    returnedValue = tizen.time.getLocalTimezone();
    assert_type(returnedValue, "string", "Value type");
    assert_equals(returnedValue, "Asia/Seoul", "Local timezone value");
}, 'TimeUtil_getLocalTimezone');

}

function TimeUtil_getLocalTimezone_exist() {
//==== TEST: TimeUtil_getLocalTimezone_exist
//==== LABEL Check if getLocalTimezone method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getLocalTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("getLocalTimezone" in tizen.time, "getLocalTimezone method exists");
    check_method_exists(tizen.time, "getLocalTimezone");
}, 'TimeUtil_getLocalTimezone_exist');

}

function TimeUtil_getLocalTimezone_extra_argument() {
//==== TEST: TimeUtil_getLocalTimezone_extra_argument
//==== LABEL Check if method getLocalTimezone of TimeUtil accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getLocalTimezone M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.time, "getLocalTimezone");
}, 'TimeUtil_getLocalTimezone_extra_argument');

}

function TimeUtil_getTimeFormat_exist() {
//==== TEST: TimeUtil_getTimeFormat_exist
//==== LABEL Check if getTimeFormat method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getTimeFormat M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("getTimeFormat" in tizen.time, "getTimeFormat method exists");
    check_method_exists(tizen.time, "getTimeFormat");
}, 'TimeUtil_getTimeFormat_exist');

}

function TimeUtil_getTimeFormat_extra_argument() {
//==== TEST: TimeUtil_getTimeFormat_extra_argument
//==== LABEL Check if method getTimeFormat of TimeUtil accepts extra argument
//==== SPEC: Tizen Web API:System:Time:TimeUtil:getTimeFormat M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.time, "getTimeFormat");
}, 'TimeUtil_getTimeFormat_extra_argument');

}

function TimeUtil_isLeapYear() {
//==== TEST: TimeUtil_isLeapYear
//==== LABEL Check if method isLeapYear of TimeUtil works properly.
//==== SPEC: Tizen Web API:System:Time:TimeUtil:isLeapYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var returnedValue, yearL = 2012, yearNl = 2013;
    returnedValue = tizen.time.isLeapYear(yearL);
    assert_equals(returnedValue, true, "Is leap year");
    returnedValue = tizen.time.isLeapYear(yearNl);
    assert_equals(returnedValue, false, "Is not leap year");
}, 'TimeUtil_isLeapYear');

}

function TimeUtil_isLeapYear_exist() {
//==== TEST: TimeUtil_isLeapYear_exist
//==== LABEL Check if isLeapYear method exists in TimeManager.
//==== PRIORITY: P1
//==== SPEC: Tizen Web API:System:Time:TimeUtil:isLeapYear M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("isLeapYear" in tizen.time, "isLeapYear method exists");
    check_method_exists(tizen.time, "isLeapYear");
}, 'TimeUtil_isLeapYear_exist');

}

function TimeUtil_notexist() {
//==== TEST: TimeUtil_notexist
//==== LABEL Check if interface TimeUtil exists, it should not.
//==== PRIORITY: P3
//==== SPEC: Tizen Web API:System:Time:TimeUtil:TimeUtil U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("TimeUtil");
}, 'TimeUtil_notexist');

}

function TZDate_addDuration_invalidLength() {
//==== TEST: TZDate_addDuration_invalidLength
//==== LABEL Check TZDate::addDuration() method called with invalid length
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 4.5, f_unit: "HOURS", diff_length: -14400000, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_invalidLength');

}

function TZDate_addDuration_unitDAYS_negative() {
//==== TEST: TZDate_addDuration_unitDAYS_negative
//==== LABEL Check addDuration method for unit DAYS and negative length
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: -1, f_unit: "DAYS", diff_length: 1, diff_unit: "DAYS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitDAYS_negative');

}

function TZDate_addDuration_unitDAYS_one() {
//==== TEST: TZDate_addDuration_unitDAYS_one
//==== LABEL Check addDuration method for unit DAYS and one day
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 1, f_unit: "DAYS", diff_length: -1, diff_unit: "DAYS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitDAYS_one');

}

function TZDate_addDuration_unitDAYS_week() {
//==== TEST: TZDate_addDuration_unitDAYS_week
//==== LABEL Check addDuration method for unit DAYS adding week
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 7, f_unit: "DAYS", diff_length: -7, diff_unit: "DAYS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitDAYS_week');

}

function TZDate_addDuration_unitDAYS_year() {
//==== TEST: TZDate_addDuration_unitDAYS_year
//==== LABEL Check addDuration method for unit DAYS adding year
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 365, f_unit: "DAYS", diff_length: -365, diff_unit: "DAYS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitDAYS_year');

}

function TZDate_addDuration_unitHOURS() {
//==== TEST: TZDate_addDuration_unitHOURS
//==== LABEL Check addDuration method for unit HOURS
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 2, f_unit: "HOURS", diff_length: -7200000, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitHOURS');

}

function TZDate_addDuration_unitHOURS_moreThanOneDay() {
//==== TEST: TZDate_addDuration_unitHOURS_moreThanOneDay
//==== LABEL Check addDuration method for unit HOURS adding 25 hours
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 25, f_unit: "HOURS", diff_length: -90000000, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitHOURS_moreThanOneDay');

}

function TZDate_addDuration_unitHOURS_negative() {
//==== TEST: TZDate_addDuration_unitHOURS_negative
//==== LABEL Check addDuration method for unit HOURS and negative length
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: -1, f_unit: "HOURS", diff_length: 3600000, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitHOURS_negative');

}

function TZDate_addDuration_unitMINS() {
//==== TEST: TZDate_addDuration_unitMINS
//==== LABEL Check addDuration method for unit MINS
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 1, f_unit: "MINS", diff_length: -60000, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitMINS');

}

function TZDate_addDuration_unitMINS_complexNum() {
//==== TEST: TZDate_addDuration_unitMINS_complexNum
//==== LABEL Check addDuration method for unit MINS and length of 5
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 5, f_unit: "MINS", diff_length: -300000, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitMINS_complexNum');

}

function TZDate_addDuration_unitMINS_negative() {
//==== TEST: TZDate_addDuration_unitMINS_negative
//==== LABEL Check addDuration method for unit MINS and negative length
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: -1, f_unit: "MINS", diff_length: 60000, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitMINS_negative');

}

function TZDate_addDuration_unitMSECS() {
//==== TEST: TZDate_addDuration_unitMSECS
//==== LABEL Check addDuration method for unit MSECS
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 1, f_unit: "MSECS", diff_length: -1, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitMSECS');

}

function TZDate_addDuration_unitMSECS_complexNum() {
//==== TEST: TZDate_addDuration_unitMSECS_complexNum
//==== LABEL Check addDuration method for unit MSECS and length of 45
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 45, f_unit: "MSECS", diff_length: -45, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
            timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitMSECS_complexNum');

}

function TZDate_addDuration_unitMSECS_negative() {
//==== TEST: TZDate_addDuration_unitMSECS_negative
//==== LABEL Check addDuration method for unit MSECS and negative length
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: -1, f_unit: "MSECS", diff_length: 1, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitMSECS_negative');

}

function TZDate_addDuration_unitSECS() {
//==== TEST: TZDate_addDuration_unitSECS
//==== LABEL Check addDuration method for unit SECS
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 1, f_unit: "SECS", diff_length: -1000, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitSECS');

}

function TZDate_addDuration_unitSECS_complexNum() {
//==== TEST: TZDate_addDuration_unitSECS_complexNum
//==== LABEL Check addDuration method for unit SECS and length of 45
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: 45, f_unit: "SECS", diff_length: -45000, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitSECS_complexNum');

}

function TZDate_addDuration_unitSECS_negative() {
//==== TEST: TZDate_addDuration_unitSECS_negative
//==== LABEL Check addDuration method for unit SECS and negative length
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:System:Time:TZDate:addDuration M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
var diff, timeTesting, tz, tdur, tzAfterAdd;
timeTesting = {f_value: -1, f_unit: "SECS", diff_length: 1000, diff_unit: "MSECS"};
test(function () {
    tz = tizen.time.getCurrentDateTime();
    tdur = new tizen.TimeDuration(timeTesting.f_value, timeTesting.f_unit);
    tzAfterAdd = tz.addDuration(tdur);
    diff = tz.difference(tzAfterAdd);
    assert_equals(diff.length, timeTesting.diff_length, "TimeDuration: wrong length difference for " +
        timeTesting.f_value + " " + timeTesting.f_unit);
    assert_equals(diff.unit, timeTesting.diff_unit, "TimeDuration: wrong unit difference for " + timeTesting.f_value + " " + timeTesting.f_unit);
}, 'TZDate_addDuration_unitSECS_negative');

}

function Time_TZDate_difference_compareWithPastDate() {
//==== TEST: Time_TZDate_difference_compareWithPastDate
//==== LABEL Check if TZDate.difference() with past date works
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tzNow = new tizen.TZDate(2013, 1, 8),
        tzPast = new tizen.TZDate(2013, 1, 6),
        diff;

    diff = tzNow.difference(tzPast);
    assert_equals(diff.length, 2, "diff.length check");
    assert_equals(diff.unit, "DAYS", "diff.unit check");
}, 'Time_TZDate_difference_compareWithPastDate');

}

function Time_TZDate_difference_compareWithPastHour() {
//==== TEST: Time_TZDate_difference_compareWithPastHour
//==== LABEL Check if TZDate.difference() with date hour earlier works
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tzNow = new tizen.TZDate(2013, 1, 8, 10),
        tzPast = new tizen.TZDate(2013, 1, 8, 5),
        diff;

    diff = tzNow.difference(tzPast);
    assert_equals(diff.length, 18000000, "diff.length check"); // 5 hours in msecs
    assert_equals(diff.unit, "MSECS", "diff.unit check");
}, 'Time_TZDate_difference_compareWithPastHour');

}

function Time_TZDate_difference_compareWithPastSeconds() {
//==== TEST: Time_TZDate_difference_compareWithPastSeconds
//==== LABEL Check if TZDate.difference() with date seconds earlier works
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tzNow = new tizen.TZDate(2013, 1, 8, 12, 20, 30),
        tzPast = new tizen.TZDate(2013, 1, 8, 12, 20, 10),
        diff;

    diff = tzNow.difference(tzPast);
    assert_equals(diff.length, 20000, "diff.length check");
    assert_equals(diff.unit, "MSECS", "diff.unit check");
}, 'Time_TZDate_difference_compareWithPastSeconds');

}

function Time_TZDate_difference_compareWithPastYear() {
//==== TEST: Time_TZDate_difference_compareWithPastYear
//==== LABEL Check if TZDate.difference() with date year earlier works
//==== PRIORITY P1
//==== SPEC Tizen Web API:System:Time:TZDate:difference M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA MMINA
test(function () {
    var tzNow = new tizen.TZDate(2002, 5, 20),
        tzPast = new tizen.TZDate(2001, 5, 20),
        diff;

    diff = tzNow.difference(tzPast);
    assert_equals(diff.length, 365, "diff.length check");
    assert_equals(diff.unit, "DAYS", "diff.unit check");
}, 'Time_TZDate_difference_compareWithPastYear');

}

function Time_in_tizen() {
//==== TEST: Time_in_tizen
//==== LABEL Check existent and type attribute time
//==== PRIORITY: P3
//==== SPEC: Tizen Web API:System:Time:TimeUtil:TimeUtil U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA OBME
test(function () {
    assert_true("time" in tizen, "No time in tizen.");
    check_readonly(tizen, "time", tizen.time, "object", "Tizen");
}, 'Time_in_tizen');

}

function TimeManagerObject_notexist() {
//==== TEST: TimeManagerObject_notexist
//==== LABEL Check if interface TimeManagerObject exists, it should not.
//==== PRIORITY: P3
//==== SPEC: Tizen Web API:System:Time:TimeManagerObject:TimeManagerObject U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/time.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("TimeManagerObject");
}, 'TimeManagerObject_notexist');

}

var moduleName = "tct-time-tizen-tests";
add_test_case(moduleName, Time_TZDate_toLocaleDateString);
add_test_case(moduleName, Time_TZDate_getUTCSeconds);
add_test_case(moduleName, Time_TZDate_getHours);
add_test_case(moduleName, Time_TZDate_getUTCMilliseconds);
add_test_case(moduleName, Time_TZDate_toUTC);
add_test_case(moduleName, Time_TZDate_setSeconds_normal);
add_test_case(moduleName, Time_TZDate_earlierThan_true);
add_test_case(moduleName, Time_TZDate_difference_compareWithEqual);
add_test_case(moduleName, Time_TZDate_setMilliseconds_normal);
add_test_case(moduleName, Time_TZDate_getUTCFullYear);
add_test_case(moduleName, Time_TZDate_secondsFromUTC);
add_test_case(moduleName, Time_TZDate_toLocaleString);
add_test_case(moduleName, Time_TZDate_setUTCFullYear_normal);
add_test_case(moduleName, Time_TZDate_setFullYear_normal);
add_test_case(moduleName, Time_TZDate_getMinutes);
add_test_case(moduleName, Time_TZDate_getPreviousDSTTransition);
add_test_case(moduleName, Time_TZDate_setDate_normal);
add_test_case(moduleName, Time_TZDate_setMinutes_normal);
add_test_case(moduleName, Time_TZDate_getTimezoneAbbreviation_summerMonth);
add_test_case(moduleName, Time_TZDate_setUTCMilliseconds_normal);
add_test_case(moduleName, Time_TZDate_toDateString);
add_test_case(moduleName, Time_TZDate_getTimezone);
add_test_case(moduleName, Time_TZDate_toTimeString);
add_test_case(moduleName, Time_TZDate_toString);
add_test_case(moduleName, Time_TZDate_getUTCHours);
add_test_case(moduleName, Time_TZDate_setUTCMinutes_normal);
add_test_case(moduleName, Time_TZDate_getDay);
add_test_case(moduleName, Time_TZDate_setUTCMonth_normal);
add_test_case(moduleName, Time_TZDate_getUTCDay);
add_test_case(moduleName, Time_TZDate_getMilliseconds);
add_test_case(moduleName, Time_TZDate_getUTCMinutes);
add_test_case(moduleName, Time_TZDate_laterThan_true);
add_test_case(moduleName, Time_TZDate_equalsTo_equal);
add_test_case(moduleName, Time_TZDate_getMonth);
add_test_case(moduleName, Time_TZDate_getNextDSTTransition);
add_test_case(moduleName, Time_TZDate_getUTCMonth);
add_test_case(moduleName, Time_TZDate_toTimezone);
add_test_case(moduleName, Time_TZDate_isDST_true);
add_test_case(moduleName, Time_TZDate_setUTCSeconds_normal);
add_test_case(moduleName, Time_TZDate_getUTCDate);
add_test_case(moduleName, Time_TZDate_toLocaleTimeString);
add_test_case(moduleName, Time_TZDate_setMonth_normal);
add_test_case(moduleName, Time_TZDate_setUTCHours_normal);
add_test_case(moduleName, Time_TZDate_getSeconds);
add_test_case(moduleName, Time_TZDate_getDate);
add_test_case(moduleName, Time_TZDate_getFullYear);
add_test_case(moduleName, Time_TZDate_setHours_normal);
add_test_case(moduleName, Time_TZDate_setUTCDate_normal);
add_test_case(moduleName, Time_TZDate_difference_compareWithFutureDate);
add_test_case(moduleName, Time_TZDate_difference_compareWithFutureHour);
add_test_case(moduleName, Time_TZDate_difference_compareWithFutureSeconds);
add_test_case(moduleName, Time_TZDate_difference_compareWithFutureYear);
add_test_case(moduleName, Time_TZDate_difference_compareWithCharacter);
add_test_case(moduleName, Time_TZDate_earlierThan_falseEqual);
add_test_case(moduleName, Time_TZDate_earlierThan_falseLater);
add_test_case(moduleName, Time_TZDate_earlierThan_stringTZDate);
add_test_case(moduleName, Time_TZDate_earlierThan_number);
add_test_case(moduleName, Time_TZDate_earlierThan_character);
add_test_case(moduleName, Time_TZDate_earlierThan_timezone);
add_test_case(moduleName, Time_TZDate_equalsTo_diff);
add_test_case(moduleName, Time_TZDate_equalsTo_number);
add_test_case(moduleName, Time_TZDate_equalsTo_character);
add_test_case(moduleName, Time_TZDate_laterThan_falseEarlier);
add_test_case(moduleName, Time_TZDate_laterThan_falseEqual);
add_test_case(moduleName, Time_TZDate_laterThan_number);
add_test_case(moduleName, Time_TZDate_laterThan_character);
add_test_case(moduleName, Time_TZDate_laterThan_timezone);
add_test_case(moduleName, Time_TZDate_setDate_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setDate_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setDate_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setDate_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setDate_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setDate_invalidDate);
add_test_case(moduleName, Time_TZDate_setDate_notExistDayForCertainMonth);
add_test_case(moduleName, Time_TZDate_setDate_notExistDayForFebruaryLeapYear);
add_test_case(moduleName, Time_TZDate_setDate_notExistDayForFebruaryNotLeapYear);
add_test_case(moduleName, Time_TZDate_setFullYear_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setFullYear_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setFullYear_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setFullYear_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setFullYear_invalidYear);
add_test_case(moduleName, Time_TZDate_setFullYear_invalidCharYear);
add_test_case(moduleName, Time_TZDate_setHours_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setHours_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setHours_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setHours_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setHours_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setHours_invalidHours);
add_test_case(moduleName, Time_TZDate_setMilliseconds_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setMilliseconds_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setMilliseconds_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setMilliseconds_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setMilliseconds_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setMilliseconds_invalidMilliseconds);
add_test_case(moduleName, Time_TZDate_setMinutes_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setMinutes_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setMinutes_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setMinutes_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setMinutes_invalidMinutes);
add_test_case(moduleName, Time_TZDate_setMonth_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setMonth_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setMonth_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setMonth_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setMonth_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setMonth_invalidMonth);
add_test_case(moduleName, Time_TZDate_setSeconds_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setSeconds_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setSeconds_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setSeconds_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setSeconds_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setSeconds_invalidSeconds);
add_test_case(moduleName, Time_TZDate_setUTCDate_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setUTCDate_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setUTCDate_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setUTCDate_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setUTCDate_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setUTCDate_invalidDate);
add_test_case(moduleName, Time_TZDate_setUTCDate_notExistDayForCertainMonth);
add_test_case(moduleName, Time_TZDate_setUTCDate_notExistDayForFebruaryLeapYear);
add_test_case(moduleName, Time_TZDate_setUTCDate_notExistDayForFebruaryNotLeapYear);
add_test_case(moduleName, Time_TZDate_setUTCFullYear_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setUTCFullYear_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setUTCFullYear_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setUTCFullYear_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setUTCFullYear_invalidYear);
add_test_case(moduleName, Time_TZDate_setUTCFullYear_invalidCharYear);
add_test_case(moduleName, Time_TZDate_setUTCHours_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setUTCHours_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setUTCHours_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setUTCHours_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setUTCHours_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setUTCHours_invalidHours);
add_test_case(moduleName, Time_TZDate_setUTCMilliseconds_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setUTCMilliseconds_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setUTCMilliseconds_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setUTCMilliseconds_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setUTCMilliseconds_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setUTCMilliseconds_invalidMilliseconds);
add_test_case(moduleName, Time_TZDate_setUTCMinutes_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setUTCMinutes_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setUTCMinutes_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setUTCMinutes_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setUTCMinutes_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setUTCMinutes_invalidMinutes);
add_test_case(moduleName, Time_TZDate_setUTCMonth_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setUTCMonth_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setUTCMonth_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setUTCMonth_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setUTCMonth_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setUTCMonth_invalidMonth);
add_test_case(moduleName, Time_TZDate_setUTCSeconds_abnormalDecimal);
add_test_case(moduleName, Time_TZDate_setUTCSeconds_boundaryBiggerThanUpper);
add_test_case(moduleName, Time_TZDate_setUTCSeconds_boundaryLessThanLower);
add_test_case(moduleName, Time_TZDate_setUTCSeconds_boundaryLowerLimit);
add_test_case(moduleName, Time_TZDate_setUTCSeconds_boundaryUpperLimit);
add_test_case(moduleName, Time_TZDate_setUTCSeconds_invalidSeconds);
add_test_case(moduleName, Time_TZDate_toTimezone_invalid);
add_test_case(moduleName, Time_TZDate_toTimezone_null);
add_test_case(moduleName, Time_TZDate_isDST_false);
add_test_case(moduleName, Time_TZDate_isDST_boundaryLowerLimit_true);
add_test_case(moduleName, Time_TZDate_isDST_boundaryUpperLimit_true);
add_test_case(moduleName, Time_TZDate_getPreviousDSTTransition_number);
add_test_case(moduleName, Time_TZDate_getPreviousDSTTransition_character);
add_test_case(moduleName, Time_TZDate_getNextDSTTransition_character);
add_test_case(moduleName, Time_TZDate_getNextDSTTransition_number);
add_test_case(moduleName, TimeDuration_difference_checkDurationDifference);
add_test_case(moduleName, TimeDuration_equalsTo_checkDurationEqual);
add_test_case(moduleName, TimeDuration_lessThan_checkDurationLower);
add_test_case(moduleName, TimeDuration_greaterThan_checkDurationGreater);
add_test_case(moduleName, TimeUtil_isLeapYear_allZero);
add_test_case(moduleName, TimeUtil_isLeapYear_negative);
add_test_case(moduleName, TimeUtil_getAvailableTimezones_checkEuropeBerlin);
add_test_case(moduleName, TZDate_getDate_checkEqualWithSetDate);
add_test_case(moduleName, TZDate_getFullYear_checkEqualWithSetFullYear);
add_test_case(moduleName, TZDate_getHours_checkEqualWithSetHours);
add_test_case(moduleName, TZDate_getMilliseconds_checkEqualWithSetMilliseconds);
add_test_case(moduleName, TZDate_getMinutes_checkEqualWithSetMinutes);
add_test_case(moduleName, TZDate_getMonth_checkEqualWithSetMonth);
add_test_case(moduleName, TZDate_getSeconds_checkEqualWithSetSeconds);
add_test_case(moduleName, TZDate_getUTCDate_checkEqualWithSetUTCDate);
add_test_case(moduleName, TZDate_getUTCFullYear_checkEqualWithSetUTCFullYear);
add_test_case(moduleName, TZDate_getUTCHours_checkEqualWithSetUTCHours);
add_test_case(moduleName, TZDate_getUTCMilliseconds_checkEqualWithSetUTCMilliseconds);
add_test_case(moduleName, TZDate_getUTCMinutes_checkEqualWithSetUTCMinutes);
add_test_case(moduleName, TZDate_getUTCMonth_checkEqualWithSetUTCMonth);
add_test_case(moduleName, TZDate_getUTCSeconds_checkEqualWithSetUTCSeconds);
add_test_case(moduleName, TZDate_addDuration);
add_test_case(moduleName, TZDate_addDuration_duration_TypeMismatch);
add_test_case(moduleName, TZDate_addDuration_duration_invalid_obj);
add_test_case(moduleName, TZDate_addDuration_exist);
add_test_case(moduleName, TZDate_addDuration_missarg);
add_test_case(moduleName, TZDate_constructor_maximal_with_nonoptional_arguments);
add_test_case(moduleName, TZDate_constructor_maximal_with_optional_arguments);
add_test_case(moduleName, TZDate_constructor_minimal_with_nonoptional_arguments);
add_test_case(moduleName, TZDate_constructor_minimal_without_optional_arguments);
add_test_case(moduleName, TZDate_difference);
add_test_case(moduleName, TZDate_difference_exist);
add_test_case(moduleName, TZDate_difference_missarg);
add_test_case(moduleName, TZDate_difference_other_TypeMismatch);
add_test_case(moduleName, TZDate_difference_other_invalid_obj);
add_test_case(moduleName, TZDate_earlierThan);
add_test_case(moduleName, TZDate_earlierThan_exist);
add_test_case(moduleName, TZDate_earlierThan_missarg);
add_test_case(moduleName, TZDate_earlierThan_other_TypeMismatch);
add_test_case(moduleName, TZDate_earlierThan_other_invalid_obj);
add_test_case(moduleName, TZDate_equalsTo);
add_test_case(moduleName, TZDate_equalsTo_exist);
add_test_case(moduleName, TZDate_equalsTo_missarg);
add_test_case(moduleName, TZDate_equalsTo_other_TypeMismatch);
add_test_case(moduleName, TZDate_equalsTo_other_invalid_obj);
add_test_case(moduleName, TZDate_exist);
add_test_case(moduleName, TZDate_extend);
add_test_case(moduleName, TZDate_getDate);
add_test_case(moduleName, TZDate_getDate_for_specific_date);
add_test_case(moduleName, TZDate_getDate_exist);
add_test_case(moduleName, TZDate_getDate_extra_argument);
add_test_case(moduleName, TZDate_getDay);
add_test_case(moduleName, TZDate_getDay_for_specific_date);
add_test_case(moduleName, TZDate_getDay_exist);
add_test_case(moduleName, TZDate_getDay_extra_argument);
add_test_case(moduleName, TZDate_getFullYear);
add_test_case(moduleName, TZDate_getFullYear_for_specific_date);
add_test_case(moduleName, TZDate_getFullYear_exist);
add_test_case(moduleName, TZDate_getFullYear_extra_argument);
add_test_case(moduleName, TZDate_getHours);
add_test_case(moduleName, TZDate_getHours_for_specific_date);
add_test_case(moduleName, TZDate_getHours_exist);
add_test_case(moduleName, TZDate_getHours_extra_argument);
add_test_case(moduleName, TZDate_getMilliseconds);
add_test_case(moduleName, TZDate_getMilliseconds_for_specific_date);
add_test_case(moduleName, TZDate_getMilliseconds_exist);
add_test_case(moduleName, TZDate_getMilliseconds_extra_argument);
add_test_case(moduleName, TZDate_getMinutes);
add_test_case(moduleName, TZDate_getMinutes_for_specific_date);
add_test_case(moduleName, TZDate_getMinutes_exist);
add_test_case(moduleName, TZDate_getMinutes_extra_argument);
add_test_case(moduleName, TZDate_getMonth);
add_test_case(moduleName, TZDate_getMonth_for_specific_date);
add_test_case(moduleName, TZDate_getMonth_exist);
add_test_case(moduleName, TZDate_getMonth_extra_argument);
add_test_case(moduleName, TZDate_getNextDSTTransition);
add_test_case(moduleName, TZDate_getNextDSTTransition_exist);
add_test_case(moduleName, TZDate_getNextDSTTransition_extra_argument);
add_test_case(moduleName, TZDate_getPreviousDSTTransition);
add_test_case(moduleName, TZDate_getPreviousDSTTransition_exist);
add_test_case(moduleName, TZDate_getPreviousDSTTransition_extra_argument);
add_test_case(moduleName, TZDate_getSeconds);
add_test_case(moduleName, TZDate_getSeconds_for_specific_date);
add_test_case(moduleName, TZDate_getSeconds_exist);
add_test_case(moduleName, TZDate_getSeconds_extra_argument);
add_test_case(moduleName, TZDate_getTimezone);
add_test_case(moduleName, TZDate_getTimezoneAbbreviation);
add_test_case(moduleName, TZDate_getTimezoneAbbreviation_exist);
add_test_case(moduleName, TZDate_getTimezoneAbbreviation_extra_argument);
add_test_case(moduleName, TZDate_getTimezone_for_specific_timezone);
add_test_case(moduleName, TZDate_getTimezone_exist);
add_test_case(moduleName, TZDate_getTimezone_extra_argument);
add_test_case(moduleName, TZDate_getUTCDate);
add_test_case(moduleName, TZDate_getUTCDate_for_specific_date);
add_test_case(moduleName, TZDate_getUTCDate_exist);
add_test_case(moduleName, TZDate_getUTCDate_extra_argument);
add_test_case(moduleName, TZDate_getUTCDay);
add_test_case(moduleName, TZDate_getUTCDay_for_specific_date);
add_test_case(moduleName, TZDate_getUTCDay_exist);
add_test_case(moduleName, TZDate_getUTCDay_extra_argument);
add_test_case(moduleName, TZDate_getUTCFullYear);
add_test_case(moduleName, TZDate_getUTCFullYear_for_specific_date);
add_test_case(moduleName, TZDate_getUTCFullYear_exist);
add_test_case(moduleName, TZDate_getUTCFullYear_extra_argument);
add_test_case(moduleName, TZDate_getUTCHours);
add_test_case(moduleName, TZDate_getUTCHours_for_specific_date);
add_test_case(moduleName, TZDate_getUTCHours_exist);
add_test_case(moduleName, TZDate_getUTCHours_extra_argument);
add_test_case(moduleName, TZDate_getUTCMilliseconds);
add_test_case(moduleName, TZDate_getUTCMilliseconds_for_specific_date);
add_test_case(moduleName, TZDate_getUTCMilliseconds_exist);
add_test_case(moduleName, TZDate_getUTCMilliseconds_extra_argument);
add_test_case(moduleName, TZDate_getUTCMinutes);
add_test_case(moduleName, TZDate_getUTCMinutes_for_specific_date);
add_test_case(moduleName, TZDate_getUTCMinutes_exist);
add_test_case(moduleName, TZDate_getUTCMinutes_extra_argument);
add_test_case(moduleName, TZDate_getUTCMonth);
add_test_case(moduleName, TZDate_getUTCMonth_for_specific_date);
add_test_case(moduleName, TZDate_getUTCMonth_exist);
add_test_case(moduleName, TZDate_getUTCMonth_extra_argument);
add_test_case(moduleName, TZDate_getUTCSeconds);
add_test_case(moduleName, TZDate_getUTCSeconds_for_specific_date);
add_test_case(moduleName, TZDate_getUTCSeconds_exist);
add_test_case(moduleName, TZDate_getUTCSeconds_extra_argument);
add_test_case(moduleName, TZDate_isDST);
add_test_case(moduleName, TZDate_isDST_for_specific_date);
add_test_case(moduleName, TZDate_isDST_exist);
add_test_case(moduleName, TZDate_isDST_extra_argument);
add_test_case(moduleName, TZDate_laterThan);
add_test_case(moduleName, TZDate_laterThan_with_null);
add_test_case(moduleName, TZDate_laterThan_exist);
add_test_case(moduleName, TZDate_laterThan_missarg);
add_test_case(moduleName, TZDate_laterThan_other_TypeMismatch);
add_test_case(moduleName, TZDate_laterThan_other_invalid_obj);
add_test_case(moduleName, TZDate_secondsFromUTC);
add_test_case(moduleName, TZDate_secondsFromUTC_for_specific_date);
add_test_case(moduleName, TZDate_secondsFromUTC_exist);
add_test_case(moduleName, TZDate_secondsFromUTC_extra_argument);
add_test_case(moduleName, TZDate_setDate);
add_test_case(moduleName, TZDate_setDate_for_specific_date);
add_test_case(moduleName, TZDate_setDate_exist);
add_test_case(moduleName, TZDate_setFullYear);
add_test_case(moduleName, TZDate_setFullYear_exist);
add_test_case(moduleName, TZDate_setHours);
add_test_case(moduleName, TZDate_setHours_exist);
add_test_case(moduleName, TZDate_setMilliseconds);
add_test_case(moduleName, TZDate_setMilliseconds_exist);
add_test_case(moduleName, TZDate_setMinutes);
add_test_case(moduleName, TZDate_setMinutes_exist);
add_test_case(moduleName, TZDate_setMonth);
add_test_case(moduleName, TZDate_setMonth_exist);
add_test_case(moduleName, TZDate_setSeconds);
add_test_case(moduleName, TZDate_setSeconds_exist);
add_test_case(moduleName, TZDate_setUTCDate);
add_test_case(moduleName, TZDate_setUTCDate_exist);
add_test_case(moduleName, TZDate_setUTCFullYear);
add_test_case(moduleName, TZDate_setUTCFullYear_exist);
add_test_case(moduleName, TZDate_setUTCHours);
add_test_case(moduleName, TZDate_setUTCHours_exist);
add_test_case(moduleName, TZDate_setUTCMilliseconds);
add_test_case(moduleName, TZDate_setUTCMilliseconds_exist);
add_test_case(moduleName, TZDate_setUTCMinutes);
add_test_case(moduleName, TZDate_setUTCMinutes_exist);
add_test_case(moduleName, TZDate_setUTCMonth);
add_test_case(moduleName, TZDate_setUTCMonth_exist);
add_test_case(moduleName, TZDate_setUTCSeconds);
add_test_case(moduleName, TZDate_setUTCSeconds_exist);
add_test_case(moduleName, TZDate_toDateString);
add_test_case(moduleName, TZDate_toDateString_for_specific_date);
add_test_case(moduleName, TZDate_toDateString_exist);
add_test_case(moduleName, TZDate_toDateString_extra_argument);
add_test_case(moduleName, TZDate_toLocalTimezone);
add_test_case(moduleName, TZDate_toLocalTimezone_for_specific_date);
add_test_case(moduleName, TZDate_toLocalTimezone_exist);
add_test_case(moduleName, TZDate_toLocalTimezone_extra_argument);
add_test_case(moduleName, TZDate_toLocaleDateString);
add_test_case(moduleName, TZDate_toLocaleDateString_exist);
add_test_case(moduleName, TZDate_toLocaleDateString_extra_argument);
add_test_case(moduleName, TZDate_toLocaleString);
add_test_case(moduleName, TZDate_toLocaleString_exist);
add_test_case(moduleName, TZDate_toLocaleString_extra_argument);
add_test_case(moduleName, TZDate_toLocaleTimeString);
add_test_case(moduleName, TZDate_toLocaleTimeString_exist);
add_test_case(moduleName, TZDate_toLocaleTimeString_extra_argument);
add_test_case(moduleName, TZDate_toString);
add_test_case(moduleName, TZDate_toString_exist);
add_test_case(moduleName, TZDate_toString_extra_argument);
add_test_case(moduleName, TZDate_toTimeString);
add_test_case(moduleName, TZDate_toTimeString_for_specific_date);
add_test_case(moduleName, TZDate_toTimeString_exist);
add_test_case(moduleName, TZDate_toTimeString_extra_argument);
add_test_case(moduleName, TZDate_toTimezone);
add_test_case(moduleName, TZDate_toTimezone_exist);
add_test_case(moduleName, TZDate_toUTC);
add_test_case(moduleName, TZDate_toUTC_exist);
add_test_case(moduleName, TZDate_toUTC_extra_argument);
add_test_case(moduleName, TimeDuration_constructor_maximal);
add_test_case(moduleName, TimeDuration_constructor_minimal);
add_test_case(moduleName, TimeDuration_difference);
add_test_case(moduleName, TimeDuration_difference_exist);
add_test_case(moduleName, TimeDuration_difference_missarg);
add_test_case(moduleName, TimeDuration_difference_other_TypeMismatch);
add_test_case(moduleName, TimeDuration_difference_other_invalid_obj);
add_test_case(moduleName, TimeDuration_equalsTo);
add_test_case(moduleName, TimeDuration_equalsTo_exist);
add_test_case(moduleName, TimeDuration_equalsTo_missarg);
add_test_case(moduleName, TimeDuration_equalsTo_other_TypeMismatch);
add_test_case(moduleName, TimeDuration_equalsTo_other_invalid_obj);
add_test_case(moduleName, TimeDuration_exist);
add_test_case(moduleName, TimeDuration_extend);
add_test_case(moduleName, TimeDuration_greaterThan);
add_test_case(moduleName, TimeDuration_greaterThan_exist);
add_test_case(moduleName, TimeDuration_greaterThan_missarg);
add_test_case(moduleName, TimeDuration_greaterThan_other_TypeMismatch);
add_test_case(moduleName, TimeDuration_greaterThan_other_invalid_obj);
add_test_case(moduleName, TimeDuration_length_attribute);
add_test_case(moduleName, TimeDuration_lessThan);
add_test_case(moduleName, TimeDuration_lessThan_exist);
add_test_case(moduleName, TimeDuration_lessThan_missarg);
add_test_case(moduleName, TimeDuration_lessThan_other_TypeMismatch);
add_test_case(moduleName, TimeDuration_lessThan_other_invalid_obj);
add_test_case(moduleName, TimeDuration_unit_attribute);
add_test_case(moduleName, TimeUtil_extend);
add_test_case(moduleName, TimeUtil_getAvailableTimezones);
add_test_case(moduleName, TimeUtil_getAvailableTimezones_exist);
add_test_case(moduleName, TimeUtil_getAvailableTimezones_extra_argument);
add_test_case(moduleName, TimeUtil_getCurrentDateTime);
add_test_case(moduleName, TimeUtil_getCurrentDateTime_instanceof);
add_test_case(moduleName, TimeUtil_getCurrentDateTime_exist);
add_test_case(moduleName, TimeUtil_getCurrentDateTime_extra_argument);
add_test_case(moduleName, TimeUtil_getDateFormat);
add_test_case(moduleName, TimeUtil_getDateFormat_exist);
add_test_case(moduleName, TimeUtil_getLocalTimezone);
add_test_case(moduleName, TimeUtil_getLocalTimezone_exist);
add_test_case(moduleName, TimeUtil_getLocalTimezone_extra_argument);
add_test_case(moduleName, TimeUtil_getTimeFormat_exist);
add_test_case(moduleName, TimeUtil_getTimeFormat_extra_argument);
add_test_case(moduleName, TimeUtil_isLeapYear);
add_test_case(moduleName, TimeUtil_isLeapYear_exist);
add_test_case(moduleName, TimeUtil_notexist);
add_test_case(moduleName, TZDate_addDuration_invalidLength);
add_test_case(moduleName, TZDate_addDuration_unitDAYS_negative);
add_test_case(moduleName, TZDate_addDuration_unitDAYS_one);
add_test_case(moduleName, TZDate_addDuration_unitDAYS_week);
add_test_case(moduleName, TZDate_addDuration_unitDAYS_year);
add_test_case(moduleName, TZDate_addDuration_unitHOURS);
add_test_case(moduleName, TZDate_addDuration_unitHOURS_moreThanOneDay);
add_test_case(moduleName, TZDate_addDuration_unitHOURS_negative);
add_test_case(moduleName, TZDate_addDuration_unitMINS);
add_test_case(moduleName, TZDate_addDuration_unitMINS_complexNum);
add_test_case(moduleName, TZDate_addDuration_unitMINS_negative);
add_test_case(moduleName, TZDate_addDuration_unitMSECS);
add_test_case(moduleName, TZDate_addDuration_unitMSECS_complexNum);
add_test_case(moduleName, TZDate_addDuration_unitMSECS_negative);
add_test_case(moduleName, TZDate_addDuration_unitSECS);
add_test_case(moduleName, TZDate_addDuration_unitSECS_complexNum);
add_test_case(moduleName, TZDate_addDuration_unitSECS_negative);
add_test_case(moduleName, Time_TZDate_difference_compareWithPastDate);
add_test_case(moduleName, Time_TZDate_difference_compareWithPastHour);
add_test_case(moduleName, Time_TZDate_difference_compareWithPastSeconds);
add_test_case(moduleName, Time_TZDate_difference_compareWithPastYear);
add_test_case(moduleName, Time_in_tizen);
add_test_case(moduleName, TimeManagerObject_notexist);
