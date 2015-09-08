
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

TestEngine.setTestSuiteName("[Clock]", 10*1000); //2min time out for callbacks

TestEngine.addTest(true, presenceTest,						"UTC_clock_presence_test_P_001");
TestEngine.addTest(true, testTZDate_001,						"UTC_clock_TZDate_P_001");
TestEngine.addTest(true, testTZDate_002,						"UTC_clock_TZDate_P_002")
TestEngine.addTest(true, checkValidParamTZDate,				"UTC_clock_checkValidParamTZDate_P_001");
TestEngine.addTest(true, testTimeDuration,					"UTC_clock_TimeDuration_P_001");
TestEngine.addTest(true, checkValidParamTimeDuration,		"UTC_clock_checkValidParamTimeDuration_P_001");

TestEngine.addTest(true, testGetCurrentDateTime,			"UTC_clock_getCurrentDateTime_P_001");
/*TestEngine.addTest(true, testsetCurrentDateTime,			"UTC_clock_setCurrentDateTime_P_001");
TestEngine.addTest(true, testsetCurrentDateTime_N,			"UTC_clock_setCurrentDateTime_N_001");*/
TestEngine.addTest(true, testGetLocalTimeZone,				"UTC_clock_getLocalTimeZone_P_001");
TestEngine.addTest(true, testGetAvailableTimeZones,			"UTC_clock_getAvailableTimeZones_P_001");
TestEngine.addTest(true, testGetDateFormat,					"UTC_clock_getDateFormat_P_001");
TestEngine.addTest(true, testGetTimeFormat,					"UTC_clock_getTimeFormat_P_001");
TestEngine.addTest(true, testIsLeapYear,					"UTC_clock_isLeapYear_P_001");
TestEngine.addTest(true, testIsLeapYear_N,					"UTC_clock_isLeapYear_N_001");
TestEngine.addTest(true, testDifference,					"UTC_clock_difference_P_001");
TestEngine.addTest(true, testDifference_N,					"UTC_clock_difference_N_001");

TestEngine.addTest(true, testGetDate,						"UTC_clock_getDate_P_001");
TestEngine.addTest(true, testSetDate,						"UTC_clock_setDate_P_001");
TestEngine.addTest(true, testGetDay,						"UTC_clock_getDay_P_001");
TestEngine.addTest(true, testGetFullYear,					"UTC_clock_getFullYear_P_001");
TestEngine.addTest(true, testSetFullYear,					"UTC_clock_setFullYear_P_001");
TestEngine.addTest(true, testGetHours,						"UTC_clock_getHours_P_001");
TestEngine.addTest(true, testSetHours,						"UTC_clock_setHours_P_001");
TestEngine.addTest(true, testGetMilliseconds,				"UTC_clock_getMilliseconds_P_001");
TestEngine.addTest(true, testSetMilliseconds,				"UTC_clock_setMilliseconds_P_001");
TestEngine.addTest(true, testSetMinutes,					"UTC_clock_setMinutes_P_001");
TestEngine.addTest(true, testGetMinute,						"UTC_clock_getMinute_P_001");
TestEngine.addTest(true, testGetMonth,						"UTC_clock_getMonth_P_001");
TestEngine.addTest(true, testSetMonth,						"UTC_clock_setMonth_P_001");
TestEngine.addTest(true, testGetSeconds,					"UTC_clock_getSeconds_P_001");
TestEngine.addTest(true, testSetSeconds,					"UTC_clock_setSeconds_P_001");
TestEngine.addTest(true, testGetUTCDate,					"UTC_clock_getUTCDate_P_001");
TestEngine.addTest(true, testSetUTCDate,					"UTC_clock_setUTCDate_P_001");
TestEngine.addTest(true, testGetUTCDay,						"UTC_clock_getUTCDay_P_001");
TestEngine.addTest(true, testGetUTCFullYear,				"UTC_clock_getUTCFullYear_P_001");
TestEngine.addTest(true, testSetUTCFullYear,				"UTC_clock_setUTCFullYear_P_001");
TestEngine.addTest(true, testGetUTCHours,					"UTC_clock_getUTCHours_P_001");
TestEngine.addTest(true, testSetUTCHours,					"UTC_clock_setUTCHours_P_001");
TestEngine.addTest(true, testGetUTCMilliseconds,			"UTC_clock_getUTCMilliseconds_P_001");
TestEngine.addTest(true, testSetUTCMilliseconds,			"UTC_clock_setUTCMilliseconds_P_001");
TestEngine.addTest(true, testGetUTCMinutes,					"UTC_clock_getUTCMinutes_P_001");
TestEngine.addTest(true, testSetUTCMinutes,					"UTC_clock_setUTCMinutes_P_001");
TestEngine.addTest(true, testGetUTCMonth,					"UTC_clock_getUTCMonth_P_001");
TestEngine.addTest(true, testSetUTCMonth,					"UTC_clock_setUTCMonth_P_001");
TestEngine.addTest(true, testGetUTCSeconds,					"UTC_clock_getUTCSeconds_P_001");
TestEngine.addTest(true, testSetUTCSeconds,					"UTC_clock_setUTCSeconds_P_001");

TestEngine.addTest(true, testGetTimezone,					"UTC_clock_getTimezone_P_001");
TestEngine.addTest(true, testToTimezone,					"UTC_clock_toTimezone_P_001");
TestEngine.addTest(true, testToTimezone_N,					"UTC_clock_toTimezone_N_001");
TestEngine.addTest(true, testToLocalTimezone,				"UTC_clock_toLocalTimezone_P_001");
TestEngine.addTest(true, testToUTC,							"UTC_clock_toUTC_P_001");
TestEngine.addTest(true, testTimeDurationDifference,		"UTC_clock_timeDurationDifference_P_001");
TestEngine.addTest(true, testTimeDurationDifference_N,		"UTC_clock_timeDurationDifference_N_001");
TestEngine.addTest(true, testTimeDurationEqualsTo,			"UTC_clock_timeDurationEqualsTo_P_001");
TestEngine.addTest(true, testTimeDurationEqualsTo_N,		"UTC_clock_timeDurationEqualsTo_N_001");
TestEngine.addTest(true, testTimeDurationLessThan,			"UTC_clock_timeDurationLessThan_P_001");
TestEngine.addTest(true, testTimeDurationLessThan_N,		"UTC_clock_timeDurationLessThan_N_001");
TestEngine.addTest(true, testTimeDurationGreaterThan,		"UTC_clock_timeDurationGreaterThan_P_001");
TestEngine.addTest(true, testTimeDurationGreaterThan_N,		"UTC_clock_timeDurationGreaterThan_N_001");

TestEngine.addTest(true, testEqualsTo,						"UTC_clock_equalsTo_P_001");
TestEngine.addTest(true, testEqualsTo_N,					"UTC_clock_equalsTo_N_001");
TestEngine.addTest(true, testEarlierThan,					"UTC_clock_earlierThan_P_001");
TestEngine.addTest(true, testEarlierThan_N,					"UTC_clock_earlierThan_N_001");
TestEngine.addTest(true, testLaterThan,						"UTC_clock_laterThan_P_001");
TestEngine.addTest(true, testLaterThan_N,					"UTC_clock_laterThan_N_001");
TestEngine.addTest(true, testAddDuration,					"UTC_clock_addDuration_P_001");
TestEngine.addTest(true, testAddDuration_N,					"UTC_clock_addDuration_N_001");

TestEngine.addTest(true, testToLocaleDateString,			"UTC_clock_toLocaleDateString_P_001");
TestEngine.addTest(true, testToLocaleTimeString,			"UTC_clock_toLocaleTimeString_P_001");
TestEngine.addTest(true, testToLocaleString,				"UTC_clock_toLocaleString_P_001");
TestEngine.addTest(true, testToDateString,					"UTC_clock_toDateString_P_001");
TestEngine.addTest(true, testToTimeString,					"UTC_clock_toTimeString_P_001")
TestEngine.addTest(true, testToString,						"UTC_clock_toString_P_001");
TestEngine.addTest(true, testSecondsFromUTC,				"UTC_clock_secondsFromUTC_P_001");
TestEngine.addTest(true, testGetTimezoneAbbreviation,				"UTC_clock_GetTimezoneAbbreviation_P_001");
TestEngine.addTest(true, testIsDST,							"UTC_clock_isDST_P_001");

TestEngine.addTest(true, UTC_setDateTimeChangeListener_P_001, "UTC_setDateTimeChangeListener_P_001");
TestEngine.addTest(true, UTC_setDateTimeChangeListener_N_001, "UTC_setDateTimeChangeListener_N_001");
TestEngine.addTest(true, UTC_unsetDateTimeChangeListener_P_001, "UTC_unsetDateTimeChangeListener_P_001");
TestEngine.addTest(true, UTC_setTimezoneChangeListener_P_001, "UTC_setTimezoneChangeListener_P_001");
TestEngine.addTest(true, UTC_setTimezoneChangeListener_N_001, "UTC_setTimezoneChangeListener_N_001");
TestEngine.addTest(true, UTC_unsetTimezoneChangeListener_P_001, "UTC_unsetTimezoneChangeListener_P_001");
