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


var alarmManager = tizen.alarm;

var TYPE_MISMATCH_ERR = 'TypeMismatchError';
var INVALID_VALUES_ERR = 'InvalidValuesError';
var NOT_SUPPORTED_ERR = 'NotSupportedError';
var NOT_FOUND_ERR = 'NotFoundError';
//var UNKNOWN_ERR = 'UnknownError';
//var PERMISSION_DENIED_ERR = 'PermissionDeniedError';

function UTC_alarm_constants_P_001() {
	TestEngine.log("UTC_alarm_constants_P_001");
	TestEngine.assertEqual("tizen.alarm.PERIOD_MINUTE ", 60,  alarmManager.PERIOD_MINUTE );
	TestEngine.assertEqual("tizen.alarm.PERIOD_HOUR ", 3600,  alarmManager.PERIOD_HOUR );
	TestEngine.assertEqual("tizen.alarm.PERIOD_DAY ", 86400,  alarmManager.PERIOD_DAY );
	TestEngine.assertEqual("tizen.alarm.PERIOD_WEEK ", 604800,  alarmManager.PERIOD_WEEK );
}

function UTC_alarm_presence_P_001()
{
	TestEngine.log("UTC_alarm_presence_P_001");
	try {
		TestEngine.test("Tizen presence", tizen);
		TestEngine.test("application presence", tizen.alarm);
		TestEngine.testPresence("add", tizen.alarm.add);
		TestEngine.testPresence("remove", tizen.alarm.remove);
		TestEngine.testPresence("removeAll", tizen.alarm.removeAll);
		TestEngine.testPresence("get", tizen.alarm.get);
		TestEngine.testPresence("getAll", tizen.alarm.getAll);
		TestEngine.testPresence(60, tizen.alarm.PERIOD_MINUTE);
		TestEngine.testPresence(3600, tizen.alarm.PERIOD_HOUR);
		TestEngine.testPresence(86400, tizen.alarm.PERIOD_DAY);
		TestEngine.testPresence(604800, tizen.alarm.PERIOD_WEEK);
	} catch (err) {
		TestEngine.test("[Alarm] test_application_presence_p error : " + err.name);
		TestEngine.test("", false);
	}
}

function UTC_alarm_AlarmAbsolute_Constructor_P_001()
{
	TestEngine.log("UTC_alarm_AlarmAbsolute_Constructor_P_001");
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	var alarm1, alarm2, alarm3, alarm4;
	try {
		alarm1 = new tizen.AlarmAbsolute(myDate);
		alarm2 = new tizen.AlarmAbsolute(myDate, 10);
		alarm3 = new tizen.AlarmAbsolute(myDate, ["SA", "SU"]);
		alarm4 = new tizen.AlarmAbsolute(myDate, ["SA", "SU"], 10);
	} catch(err) {
		TestEngine.test("Exception : err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}

	TestEngine.test("new tizen.AlarmAbsolute()  result = ", !isUndefined(alarm1));
	TestEngine.test("new tizen.AlarmAbsolute()  result = ", !isUndefined(alarm2));
	TestEngine.test("new tizen.AlarmAbsolute()  result = ", !isUndefined(alarm3));
	TestEngine.test("new tizen.AlarmAbsolute()  result = ", !isUndefined(alarm4));

	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_Constructor_N_004() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_Constructor_N_004");
	var alarm;
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	try {
		// set period as -1
		alarm = new tizen.AlarmAbsolute(myDate, -1);
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		alarmManager.removeAll();
		return;
	}
	TestEngine.test("Exception is not occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_Constructor_N_005() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_Constructor_N_005");
	var alarm;
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	try {
		alarm = new tizen.AlarmAbsolute(myDate, undefined);
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		alarmManager.removeAll();
		return;
	}
	TestEngine.test("Exception is not occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_Constructor_N_006() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_Constructor_N_006");
	var alarm;
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	try {
		alarm = new tizen.AlarmAbsolute(myDate, null);
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		alarmManager.removeAll();
		return;
	}
	TestEngine.test("Exception is not occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_Constructor_N_007() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_Constructor_N_007");
	var alarm;
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	try {
		alarm = new tizen.AlarmAbsolute(1, 10);
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		alarmManager.removeAll();
		return;
	}
	TestEngine.test("Exception is not occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_Constructor_N_008() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_Constructor_N_008");
	var alarm;
	var myDate = new Date();

	myDate.setSeconds(myDate.getSeconds()+60);
	try {
		alarm = new tizen.AlarmAbsolute(undefined, 10);
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		alarmManager.removeAll();
		return;
	}
	TestEngine.test("Exception is not occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_Constructor_N_009() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_Constructor_N_009");
	var alarm;
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	try {
		alarm = new tizen.AlarmAbsolute(null, 10);
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		alarmManager.removeAll();
		return;
	}
	TestEngine.test("Exception is not occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_date_P_001() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_date_P_001");
	var myDate = new Date();
	myDate.setMilliseconds(0);
	myDate.setSeconds(myDate.getSeconds()+60);
	var alarm1, alarm2, alarm3;
	try {
		alarm1 = new tizen.AlarmAbsolute(myDate);
		alarm2 = new tizen.AlarmAbsolute(myDate, 10);
		alarm3 = new tizen.AlarmAbsolute(myDate, ["SA", "SU"]);
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}

	TestEngine.test("Check AlarmAbsolute object date atttribute is not undefined result = ", !isUndefined(alarm1.date));
	TestEngine.test("Check AlarmAbsolute object date atttribute is not undefined result = ", !isUndefined(alarm2.date));
	TestEngine.test("Check AlarmAbsolute object date atttribute is not undefined result = ", !isUndefined(alarm3.date));
	TestEngine.test("Check AlarmAbsolute object date atttribute is not null result = ", !isNull(alarm1.date));
	TestEngine.test("Check AlarmAbsolute object date atttribute is not null result = ", !isNull(alarm2.date));
	TestEngine.test("Check AlarmAbsolute object date atttribute is not null result = ", !isNull(alarm3.date));

	TestEngine.assertEqual("Check date attirbute value result = ", alarm1.date.getTime(), myDate.getTime());
	TestEngine.assertEqual("Check date attirbute value result = ", alarm2.date.getTime(), myDate.getTime());
	TestEngine.assertEqual("Check date attirbute value result = ", alarm3.date.getTime(), myDate.getTime());

	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_id_P_001() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_id_P_001");
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	var alarm1, alarm2, alarm3;
	var alarm4, alarm5, alarm6;
	try {
		alarm1 = new tizen.AlarmAbsolute(myDate);
		alarm2 = new tizen.AlarmAbsolute(myDate, 10);
		alarm3 = new tizen.AlarmAbsolute(myDate, ["SA", "SU"]);

		alarm4 = new tizen.AlarmAbsolute(myDate);
		alarm5 = new tizen.AlarmAbsolute(myDate, 10);
		alarm6 = new tizen.AlarmAbsolute(myDate, ["SA", "SU"]);

		alarmManager.add(alarm4, "tizenutc01.TizenUnitTCApp1");
		alarmManager.add(alarm5, "tizenutc01.TizenUnitTCApp1");
		alarmManager.add(alarm6, "tizenutc01.TizenUnitTCApp1");

	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}

	TestEngine.assertEqual("check AlarmAbsolute object id is null", null, alarm1.id);
	TestEngine.assertEqual("check AlarmAbsolute object id is null", null, alarm2.id);
	TestEngine.assertEqual("check AlarmAbsolute object id is null", null, alarm3.id);

	TestEngine.test("check AlarmAbsolute object id is not null", !isNull(alarm4.id));
	TestEngine.test("check AlarmAbsolute object id is not null", !isNull(alarm5.id));
	TestEngine.test("check AlarmAbsolute object id is not null", !isNull(alarm6.id));

	TestEngine.test("check AlarmAbsolute object id is not undefined", !isUndefined(alarm4.id));
	TestEngine.test("check AlarmAbsolute object id is not undefined", !isUndefined(alarm5.id));
	TestEngine.test("check AlarmAbsolute object id is not undefined", !isUndefined(alarm6.id));

	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_period_P_001() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_period_P_001");
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	var alarm1, alarm2;
	try {
		alarm1 = new tizen.AlarmAbsolute(myDate, 10);
		alarm2 = new tizen.AlarmAbsolute(myDate, ["SU"]);
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}

	TestEngine.assertEqual("check AlarmAbsolute object period attribute", 10,  alarm1.period);
	TestEngine.assertEqual("check AlarmAbsolute object period attribute", null,  alarm2.period);

	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_daysOfTheWeek_P_001() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_daysOfTheWeek_P_001");
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	var alarm1, alarm2;
	try {
		alarm1 = new tizen.AlarmAbsolute(myDate, ["SU"]);
		alarm2 = new tizen.AlarmAbsolute(myDate, 10);
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}

	TestEngine.test("check AlarmAbsolute object daysOfTheWeek attribute is not nul result = ", !isNull(alarm1.daysOfTheWeek));
	TestEngine.test("check AlarmAbsolute object daysOfTheWeek attribute is not nul result = ", !isUndefined(alarm1.daysOfTheWeek));
	TestEngine.test("check AlarmAbsolute object daysOfTheWeek attribute is array result = ",   isArray(alarm2.daysOfTheWeek));
	TestEngine.assertEqual("check AlarmAbsolute object daysOfTheWeek attribute", alarm1.daysOfTheWeek[0] , "SU");
	TestEngine.assertEqual("check AlarmAbsolute object daysOfTheWeek attribute", alarm2.daysOfTheWeek.length , 0);

	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_getNextScheduledDate_P_001() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_getNextScheduledDate_P_001");
	var myDate = new Date();
	myDate.setMilliseconds(0);
	myDate.setSeconds(myDate.getSeconds()+60);

	var alarm;
	try {
		alarm = new tizen.AlarmAbsolute(myDate);

		alarmManager.add(alarm, "tizenutc01.TizenUnitTCApp1");
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	TestEngine.assertEqual("check AlarmAbsolute object getNextScheduledDate function()", alarm.getNextScheduledDate().getTime(), myDate.getTime());

	alarmManager.removeAll();
}

function UTC_alarm_AlarmAbsolute_getNextScheduledDate_N_001() {
	TestEngine.log("UTC_alarm_AlarmAbsolute_getNextScheduledDate_N_001");
	var alarm;
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	try {
		alarm = new tizen.AlarmAbsolute(myDate);
		//call getNextScheduleDate() before add for negative
		//getNextSceduledDate() must return null
		TestEngine.assertEqual("new tizen.AlarmAbsolute() alarm.daysOfTheWeek", alarm.getNextScheduledDate(), null);
	} catch(err) {
		TestEngine.test("Exception : new tizen.AlarmAbsolute() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}

function UTC_alarm_add_P_001() {
	TestEngine.log("UTC_alarm_add_P_001");
	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	var alarm1, alarm2, alarm3;
	try {
		alarm1 = new tizen.AlarmAbsolute(myDate);
		alarm2 = new tizen.AlarmAbsolute(myDate, 10);
		alarm3 = new tizen.AlarmAbsolute(myDate, ["SA", "SU"]);

		TestEngine.test("new tizen.AlarmAbsolute()  result = ", !isUndefined(alarm1));
		TestEngine.test("new tizen.AlarmAbsolute()  result = ", !isUndefined(alarm2));
		TestEngine.test("new tizen.AlarmAbsolute()  result = ", !isUndefined(alarm3));

		alarmManager.add(alarm1, "tizenutc01.TizenUnitTCApp1");
		alarmManager.add(alarm2, "tizenutc01.TizenUnitTCApp1");
		alarmManager.add(alarm3, "tizenutc01.TizenUnitTCApp1");

		TestEngine.test("tizen.alarm.add AlarmAbsolute result = ", !isNull(alarm1.id));
		TestEngine.test("tizen.alarm.add AlarmAbsolute result = ", !isNull(alarm2.id));
		TestEngine.test("tizen.alarm.add AlarmAbsolute result = ", !isNull(alarm3.id));
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.add() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}

function UTC_alarm_add_P_002() {
	TestEngine.log("UTC_alarm_add_P_002");
	try {
		var alarm1 = new tizen.AlarmRelative(10);

		TestEngine.test("new tizen.AlarmRelative()  result = ", !isUndefined(alarm1));

		alarmManager.add(alarm1, "tizenutc01.TizenUnitTCApp1", null);
		TestEngine.test("tizen.alarm.add AlarmRelative result1 = ", !isNull(alarm1.id));
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.add() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}

function UTC_alarm_add_N_001() {
	TestEngine.log("UTC_alarm_add_N_001");
	var alarm;
	try {
		alarmManager.add(1, "tizenutc01.TizenUnitTCApp1");
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.add() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		alarmManager.removeAll();
		return;
	}
	TestEngine.test("Exception is nut occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_add_N_002() {
	TestEngine.log("UTC_alarm_add_N_002");
	try {
		alarmManager.add(undefined, "tizenutc01.TizenUnitTCApp1");
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.add() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		alarmManager.removeAll();
		return;
	}
	TestEngine.test("Exception is nut occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_add_N_003() {
	TestEngine.log("UTC_alarm_add_N_003");
	var obj;
	try {
		alarmManager.add(null, "tizenutc01.TizenUnitTCApp1");
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.add() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		alarmManager.removeAll();
		return;
	}
	TestEngine.test("Exception is not occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_add_N_004() {
	TestEngine.log("UTC_alarm_add_N_004");
	var alarm = new tizen.AlarmRelative(30);
	TestEngine.test("new tizen.AlarmRelative() result = ", !isUndefined(alarm));

    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, alarmManager, "add", alarm, "tizenutc01.TizenUnitTCApp1", "");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, alarmManager, "add", alarm, "tizenutc01.TizenUnitTCApp1", "GG");

	alarmManager.removeAll();
}

function UTC_alarm_AlarmRelative_Constructor_P_001() {
	TestEngine.log("UTC_alarm_AlarmRelative_Constructor_P_001");
	var alarm1, alarm2, alarm3, alarm4;
	try {
		alarm1 = new tizen.AlarmRelative(10);
		alarm2 = new tizen.AlarmRelative(10, 10);
		alarm3 = new tizen.AlarmRelative(10, 10, 10);
		alarm4 = new tizen.AlarmRelative(10, undefined);
	} catch(err) {
		TestEngine.test("Exception :new tizen.AlarmRelative() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	TestEngine.test("new tizen.AlarmRelative()  result = ", !isUndefined(alarm1));
	alarmManager.removeAll();
}

function UTC_alarm_AlarmRelative_delay_P_001() {
	TestEngine.log("UTC_alarm_AlarmRelative_delay_P_001");
	var alarm1, alarm2, alarm3;
	try {
	alarm1 = new tizen.AlarmRelative(10);
	alarm2 = new tizen.AlarmRelative(20);
	alarm3 = new tizen.AlarmRelative(30);
	} catch(err) {
		TestEngine.test("Exception :new tizen.AlarmRelative() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}

	TestEngine.test("new tizen.AlarmRelative() result = ", !isUndefined(alarm1));
	TestEngine.test("new tizen.AlarmRelative() result = ", !isUndefined(alarm2));
	TestEngine.test("new tizen.AlarmRelative() result = ", !isUndefined(alarm3));
	TestEngine.assertEqual("new tizen.AlarmRelative() alarm.delay", 10,  alarm1.delay);
	TestEngine.assertEqual("new tizen.AlarmRelative() alarm.delay", 20,  alarm2.delay);
	TestEngine.assertEqual("new tizen.AlarmRelative() alarm.delay", 30,  alarm3.delay);

	alarmManager.removeAll();
}

function UTC_alarm_AlarmRelative_id_P_001() {
	TestEngine.log("UTC_alarm_AlarmRelative_id_P_001");
	var alarm1, alarm2;
	try {
		alarm1 = new tizen.AlarmRelative(10);
		alarm2 = new tizen.AlarmRelative(10, 10);
		TestEngine.test("new tizen.AlarmRelative() result = ", !isUndefined(alarm1));
		TestEngine.test("new tizen.AlarmRelative() result = ", !isUndefined(alarm2));

		alarmManager.add(alarm1, "tizenutc01.TizenUnitTCApp1");
		alarmManager.add(alarm2, "tizenutc01.TizenUnitTCApp1");

		TestEngine.test("tizen.alarm.add AlarmRelative result = ", !isNull(alarm1.id));
		TestEngine.test("tizen.alarm.add AlarmRelative result = ", !isNull(alarm2.id));
	} catch(err) {
		TestEngine.test("Exception : tizen.AlarmRelative() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}

function UTC_alarm_AlarmRelative_period_P_001() {
	TestEngine.log("UTC_alarm_AlarmRelative_period_P_001");
	var alarm1, alarm2;
	try {
		alarm1 = new tizen.AlarmRelative(10, 10);
		alarm2 = new tizen.AlarmRelative(10);
		TestEngine.test("new tizen.AlarmRelative()  result = ", !isUndefined(alarm1));
		TestEngine.test("new tizen.AlarmRelative()  result = ", !isUndefined(alarm2));
		alarmManager.add(alarm1, "tizenutc01.TizenUnitTCApp1");
		TestEngine.assertEqual("new tizen.AlarmRelative() alarm.date", alarm1.period,  10);
		TestEngine.test("Check AlarmRelative object.period is null result = ", isNull(alarm2.period));
	} catch(err) {
		TestEngine.test("Exception : tizen.AlarmRelative() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}

function UTC_alarm_AlarmRelative_getRemainingSeconds_P_001() {
	TestEngine.log("UTC_alarm_AlarmRelative_getRemainingSeconds_P_001");
	var alarm;
	try {
		alarm = new tizen.AlarmRelative(10);
		TestEngine.test("new tizen.AlarmRelative()  result = ", !isUndefined(alarm));
		alarmManager.add(alarm, "tizenutc01.TizenUnitTCApp1");
		TestEngine.test("new tizen.AlarmRelative()  result = ", !isUndefined(alarm.getRemainingSeconds()));
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.AlarmRelative getRemainingSeconds err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}

function UTC_alarm_AlarmRelative_getRemainingSeconds_N_001() {
	TestEngine.log("UTC_alarm_AlarmRelative_getRemainingSeconds_N_001");
	var alarm;
	try {
		alarm = new tizen.AlarmRelative(10);
		TestEngine.test("new tizen.AlarmRelative()  result = ", isNull(alarm.getRemainingSeconds()));
		TestEngine.test("new tizen.AlarmRelative()  result = ", isNull(alarm.getRemainingSeconds(10)));
	} catch(err) {
		TestEngine.test("Exception : tizen.AlarmRelative getRemainingSeconds err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}

function UTC_alarm_remove_P_001() {
	TestEngine.log("UTC_alarm_remove_P_001");
	var alarm1, alarm2;
	try {
		alarm1 = new tizen.AlarmRelative(10, 10);
		alarm2 = new tizen.AlarmRelative(20, 10);
		alarmManager.add(alarm1, "tizenutc01.TizenUnitTCApp1");
		alarmManager.add(alarm2, "tizenutc01.TizenUnitTCApp1");
		var alarms = tizen.alarm.getAll();
		TestEngine.assertEqual("Current alarm size", alarms.length,  2);
		TestEngine.test("testRemoveAlarm = ", !isUndefined(alarm1));
		TestEngine.test("testRemoveAlarm = ", !isUndefined(alarm2));
		tizen.alarm.remove(alarm1.id);
		tizen.alarm.remove(alarm2.id);
		var alarms2 = tizen.alarm.getAll();
		TestEngine.assertEqual("Current alarm size", alarms2.length,  0);
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.remove() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}

function UTC_alarm_remove_N_001() {
	TestEngine.log("UTC_alarm_remove_N_001");
	var alarm;
	try {
		tizen.alarm.remove("ABC");
		var alarms2 = tizen.alarm.getAll();
		TestEngine.assertEqual("Current alarm size", alarms.length,  0);
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.remove() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		return;
	}
	TestEngine.test("Exception is not occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_remove_N_002() {
	TestEngine.log("UTC_alarm_remove_N_002");
	var alarm;
	try {
		tizen.alarm.remove(undefined);
		var alarms2 = tizen.alarm.getAll();
		TestEngine.assertEqual("Current alarm size", alarms.length,  0);
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.remove() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		return;
	}
	TestEngine.test("Exception is not occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_remove_N_003() {
	TestEngine.log("UTC_alarm_remove_N_003");
	var alarm;
	try {
		tizen.alarm.remove(null);
		var alarms2 = tizen.alarm.getAll();
		TestEngine.assertEqual("Current alarm size", alarms.length,  0);
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.remove() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		return;
	}
	TestEngine.test("Exception is not occured", false);
	alarmManager.removeAll();
}

function UTC_alarm_removeAll_P_001() {
	TestEngine.log("UTC_alarm_removeAll_P_001");
	var alarm;
	try {
		alarm = new tizen.AlarmRelative(10, 10);
		alarmManager.add(alarm, "tizenutc01.TizenUnitTCApp1");
		var alarms = tizen.alarm.getAll();
		TestEngine.assertEqual("Current alarm size", alarms.length,  1);
		TestEngine.test("testRemoveAlarm = ", !isUndefined(alarm));
		tizen.alarm.removeAll(1);
		tizen.alarm.removeAll();
		var alarms2 = tizen.alarm.getAll();
		TestEngine.assertEqual("Current alarm size", alarms2.length,  0);
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.removeAll() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}

function UTC_alarm_get_P_001() {
	TestEngine.log("UTC_alarm_get_P_001");
	var alarm;
	try {
		alarm = new tizen.AlarmRelative(10, 10);
		alarmManager.add(alarm, "tizenutc01.TizenUnitTCApp1");
		TestEngine.test("testGetAlarm = ", !isUndefined(alarm));

		TestEngine.log("[Alarm] testGetAlarmP #1");
		var alarm2 = tizen.alarm.get(alarm.id);
		TestEngine.log("[Alarm] testGetAlarmP #1");
		var alarm3 = tizen.alarm.get(alarm.id, 1);
		TestEngine.test("testGetAlarm = ", !isUndefined(alarm2));
		TestEngine.test("testGetAlarm = ", !isUndefined(alarm3));
		TestEngine.assertEqual("Compare id", alarm.id,  alarm2.id);
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.get() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}

function UTC_alarm_get_N_001() {
	TestEngine.log("UTC_alarm_get_N_001");
	try {
		var alarm = tizen.alarm.get("ABCD");
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.get() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		return;
	}
	alarmManager.removeAll();
}

function UTC_alarm_get_N_002() {
	TestEngine.log("UTC_alarm_get_N_002");
	try {
		var alarm = tizen.alarm.get(undefined);
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.get() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		return;
	}
	alarmManager.removeAll();
}

function UTC_alarm_get_N_003() {
	TestEngine.log("UTC_alarm_get_N_003");
	try {
		var alarm = tizen.alarm.get(null);
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.get() err.name [" + err.name + "] err.msg[" + err.message + "]", true);
		return;
	}
	alarmManager.removeAll();
}

function UTC_alarm_getAll_P_001() {
	TestEngine.log("UTC_alarm_getAll_P_001");
	var alarm;
	try {
		alarm = new tizen.AlarmRelative(10, 10);
		alarmManager.add(alarm, "tizenutc01.TizenUnitTCApp1");
		var alarms = tizen.alarm.getAll();
		var alarms2 = tizen.alarm.getAll(1);
		TestEngine.assertEqual("Current alarm size", alarms.length,  1);
		TestEngine.assertEqual("Compare id", alarm.id,  alarms[0].id);
		TestEngine.test("testGetAllAlarm = ", !isUndefined(alarm));
	} catch(err) {
		TestEngine.test("Exception : tizen.alarm.getAll() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}
	alarmManager.removeAll();
}


function UTC_alarm_NP() {
	TestEngine.log("UTC_alarm_NP");

	var myDate = new Date();
	myDate.setSeconds(myDate.getSeconds()+60);
	var alarm1, alarm2, alarm3;
	try {
		alarm1 = new tizen.AlarmAbsolute(myDate);
		alarm2 = new tizen.AlarmAbsolute(myDate, 10);
		alarm3 = new tizen.AlarmAbsolute(myDate, ["SA", "SU"]);
	} catch(err) {
		TestEngine.test("Exception : err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}

	TestEngine.test("Check AlarmAbsolute object date atttribute is not undefined result = ", !isUndefined(alarm1.date));
	TestEngine.test("check AlarmAbsolute object id is null", isNull(alarm1.id));
	TestEngine.assertEqual("check AlarmAbsolute object period attribute", 10,  alarm2.period);
	TestEngine.assertEqual("check AlarmAbsolute object daysOfTheWeek attribute", alarm3.daysOfTheWeek[0] , "SA");

	var scheduledDate = alarm1.getNextScheduledDate();

	var alarm4, alarm5, alarm6;
	try {
		alarm4 = new tizen.AlarmRelative(10);
		alarm5 = new tizen.AlarmRelative(10, 10);
	} catch(err) {
		TestEngine.test("Exception :new tizen.AlarmRelative() err.name [" + err.name + "] err.msg[" + err.message + "]", false);
	}

	TestEngine.assertEqual("new tizen.AlarmRelative() alarm.delay", 10,  alarm4.delay);
	TestEngine.test("tizen.alarm.add AlarmRelative result = ", isNull(alarm4.id));
	TestEngine.assertEqual("new tizen.AlarmRelative() alarm.period", alarm5.period,  10);

	var remaingSeconds = alarm4.getRemainingSeconds();

	var alarms = tizen.alarm.getAll();
	TestEngine.assertEqual("Current alarm size", alarms.length,  0);
	
}

