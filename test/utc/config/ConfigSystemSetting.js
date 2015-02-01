
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

/**
 * 		Tizen SystemSetting UNIT test
 */

TestEngine.setTestSuiteName(testModuleName, 30*1000); //2min time out for callbacks
//TestEngine.addTest(true, presenceTest,	testModuleName + " presence test");

//##### GetServiceMessage Vaild TC
TestEngine.addTest(true, UTC_systemsetting_getProperty_P_001,	testModuleName + " UTC_systemsetting_getProperty_P_001");
TestEngine.addTest(true, UTC_systemsetting_getProperty_P_002,	testModuleName + " UTC_systemsetting_getProperty_P_002");
TestEngine.addTest(true, UTC_systemsetting_getProperty_P_003,	testModuleName + " UTC_systemsetting_getProperty_P_003");
TestEngine.addTest(true, UTC_systemsetting_getProperty_P_004,	testModuleName + " UTC_systemsetting_getProperty_P_004");
TestEngine.addTest(true, UTC_systemsetting_getProperty_P_005,	testModuleName + " UTC_systemsetting_getProperty_P_005");
TestEngine.addTest(true, UTC_systemsetting_getProperty_P_006,	testModuleName + " UTC_systemsetting_getProperty_P_006");
TestEngine.addTest(true, UTC_systemsetting_getProperty_N_001,	testModuleName + " UTC_systemsetting_getProperty_N_001");
TestEngine.addTest(true, UTC_systemsetting_getProperty_N_002,	testModuleName + " UTC_systemsetting_getProperty_N_002");
TestEngine.addTest(true, UTC_systemsetting_getProperty_N_003,	testModuleName + " UTC_systemsetting_getProperty_N_003");
TestEngine.addTest(true, UTC_systemsetting_getProperty_N_004,	testModuleName + " UTC_systemsetting_getProperty_N_004");
TestEngine.addTest(true, UTC_systemsetting_getProperty_N_005,	testModuleName + " UTC_systemsetting_getProperty_N_005");
TestEngine.addTest(true, UTC_systemsetting_getProperty_N_006,	testModuleName + " UTC_systemsetting_getProperty_N_006");
TestEngine.addTest(true, UTC_systemsetting_getProperty_N_007,	testModuleName + " UTC_systemsetting_getProperty_N_007");
TestEngine.addTest(true, UTC_systemsetting_setProperty_P_001,	testModuleName + " UTC_systemsetting_setProperty_P_001");
TestEngine.addTest(true, UTC_systemsetting_setProperty_P_002,	testModuleName + " UTC_systemsetting_setProperty_P_002");
TestEngine.addTest(true, UTC_systemsetting_setProperty_P_003,	testModuleName + " UTC_systemsetting_setProperty_P_003");
TestEngine.addTest(true, UTC_systemsetting_setProperty_P_004,	testModuleName + " UTC_systemsetting_setProperty_P_004");
TestEngine.addTest(true, UTC_systemsetting_setProperty_P_005,	testModuleName + " UTC_systemsetting_setProperty_P_005");
TestEngine.addTest(true, UTC_systemsetting_setProperty_P_006,	testModuleName + " UTC_systemsetting_setProperty_P_006");
TestEngine.addTest(true, UTC_systemsetting_setProperty_N_001,	testModuleName + " UTC_systemsetting_setProperty_N_001");
TestEngine.addTest(true, UTC_systemsetting_setProperty_N_002,	testModuleName + " UTC_systemsetting_setProperty_N_002");
TestEngine.addTest(true, UTC_systemsetting_setProperty_N_003,	testModuleName + " UTC_systemsetting_setProperty_N_003");
TestEngine.addTest(true, UTC_systemsetting_setProperty_N_004,	testModuleName + " UTC_systemsetting_setProperty_N_004");
TestEngine.addTest(true, UTC_systemsetting_setProperty_N_005,	testModuleName + " UTC_systemsetting_setProperty_N_005");
TestEngine.addTest(true, UTC_systemsetting_setProperty_N_006,	testModuleName + " UTC_systemsetting_setProperty_N_006");
TestEngine.addTest(true, UTC_systemsetting_setProperty_N_007,	testModuleName + " UTC_systemsetting_setProperty_N_007");