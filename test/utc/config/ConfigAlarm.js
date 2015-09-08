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

TestEngine.setTestSuiteName("[Alarm]", 60*1000);
TestEngine.addTest(true, UTC_alarm_constants_P_001, "UTC_alarm_constants_P_001");
TestEngine.addTest(true, UTC_alarm_presence_P_001, "UTC_alarm_presence_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmAbsolute_Constructor_P_001, "UTC_alarm_AlarmAbsolute_Constructor_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmAbsolute_date_P_001, "UTC_alarm_AlarmAbsolute_date_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmAbsolute_id_P_001, "UTC_alarm_AlarmAbsolute_id_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmAbsolute_period_P_001, "UTC_alarm_AlarmAbsolute_period_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmAbsolute_daysOfTheWeek_P_001, "UTC_alarm_AlarmAbsolute_daysOfTheWeek_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmAbsolute_getNextScheduledDate_P_001, "UTC_alarm_AlarmAbsolute_getNextScheduledDate_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmAbsolute_getNextScheduledDate_N_001, "UTC_alarm_AlarmAbsolute_getNextScheduledDate_N_001");
TestEngine.addTest(true, UTC_alarm_add_P_001, "UTC_alarm_add_P_001");
TestEngine.addTest(true, UTC_alarm_add_P_002, "UTC_alarm_add_P_002");
TestEngine.addTest(true, UTC_alarm_add_N_001, "UTC_alarm_add_N_001");
TestEngine.addTest(true, UTC_alarm_add_N_002, "UTC_alarm_add_N_002");
TestEngine.addTest(true, UTC_alarm_add_N_003, "UTC_alarm_add_N_003");
TestEngine.addTest(true, UTC_alarm_add_N_004, "UTC_alarm_add_N_004");
TestEngine.addTest(true, UTC_alarm_AlarmRelative_Constructor_P_001, "UTC_alarm_AlarmRelative_Constructor_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmRelative_delay_P_001, "UTC_alarm_AlarmRelative_delay_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmRelative_id_P_001, "UTC_alarm_AlarmRelative_id_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmRelative_period_P_001, "UTC_alarm_AlarmRelative_period_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmRelative_getRemainingSeconds_P_001, "UTC_alarm_AlarmRelative_getRemainingSeconds_P_001");
TestEngine.addTest(true, UTC_alarm_AlarmRelative_getRemainingSeconds_N_001, "UTC_alarm_AlarmRelative_getRemainingSeconds_N_001");
TestEngine.addTest(true, UTC_alarm_remove_P_001, "UTC_alarm_remove_P_001");
TestEngine.addTest(true, UTC_alarm_remove_N_001, "UTC_alarm_remove_N_001");
TestEngine.addTest(true, UTC_alarm_remove_N_002, "UTC_alarm_remove_N_002");
TestEngine.addTest(true, UTC_alarm_remove_N_003, "UTC_alarm_remove_N_003");
TestEngine.addTest(true, UTC_alarm_removeAll_P_001, "UTC_alarm_removeAll_P_001");
TestEngine.addTest(true, UTC_alarm_get_P_001, "UTC_alarm_get_P_001");
TestEngine.addTest(true, UTC_alarm_get_N_001, "UTC_alarm_get_N_001");
TestEngine.addTest(true, UTC_alarm_get_N_002, "UTC_alarm_get_N_002");
TestEngine.addTest(true, UTC_alarm_get_N_003, "UTC_alarm_get_N_003");
TestEngine.addTest(true, UTC_alarm_getAll_P_001, "UTC_alarm_getAll_P_001");
