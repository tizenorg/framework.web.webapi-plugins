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


TestEngine.setTestSuiteName("[Application]");

TestEngine.addTest(true, UTC_application_presence_P_001,	"[Application]UTC_application_presence_P_001");
TestEngine.addTest(true, UTC_application_presence_P_002,	"[Application]UTC_application_presence_P_002");

TestEngine.addTest(true, UTC_application_getCurrentApplication_P_001,	"[Application]UTC_application_getCurrentApplication_P_001");

TestEngine.addTest(true, UTC_application_getAppsContext_P_001, 	"[Application]UTC_application_getAppsContext_P_001");
TestEngine.addTest(true, UTC_application_getAppsContext_P_002, 	"[Application]UTC_application_getAppsContext_P_002");
TestEngine.addTest(true, UTC_application_getAppsContext_P_003, 	"[Application]UTC_application_getAppsContext_P_003");
//TestEngine.addTest(true, UTC_application_getAppsContext_P_004, 	"[Application]UTC_application_getAppsContext_P_004");
TestEngine.addTest(true, UTC_application_getAppsContext_P_005, 	"[Application]UTC_application_getAppsContext_P_005");
TestEngine.addTest(true, UTC_application_getAppsContext_N_001, 	"[Application]UTC_application_getAppsContext_N_001");

TestEngine.addTest(true, UTC_application_getAppsInfo_P_001, 	"[Application]UTC_application_getAppsInfo_P_001");
TestEngine.addTest(true, UTC_application_getAppsInfo_P_002, 	"[Application]UTC_application_getAppsInfo_P_002");
TestEngine.addTest(true, UTC_application_getAppsInfo_P_003, 	"[Application]UTC_application_getAppsInfo_P_003");
//TestEngine.addTest(true, UTC_application_getAppsInfo_P_004, 	"[Application]UTC_application_getAppsInfo_P_004");
TestEngine.addTest(true, UTC_application_getAppsInfo_P_005, 	"[Application]UTC_application_getAppsInfo_P_005");
TestEngine.addTest(true, UTC_application_getAppsInfo_N_001, 	"[Application]UTC_application_getAppsInfo_N_001");

TestEngine.addTest(true, UTC_application_getAppContext_P_001, 	"[Application]UTC_application_getAppContext_P_001");
//TestEngine.addTest(true, UTC_application_getAppContext_P_002, 	"[Application]UTC_application_getAppContext_P_002");
TestEngine.addTest(true, UTC_application_getAppContext_P_003, 	"[Application]UTC_application_getAppContext_P_003");
TestEngine.addTest(true, UTC_application_getAppContext_P_004, 	"[Application]UTC_application_getAppContext_P_004");
TestEngine.addTest(true, UTC_application_getAppContext_N_001, 	"[Application]UTC_application_getAppContext_N_001");

TestEngine.addTest(true, UTC_application_getAppInfo_P_001,	"[Application]UTC_application_getAppInfo_P_001");
TestEngine.addTest(true, UTC_application_getAppInfo_P_002,	"[Application]UTC_application_getAppInfo_P_002");
TestEngine.addTest(true, UTC_application_getAppInfo_P_003,	"[Application]UTC_application_getAppInfo_P_003");
//TestEngine.addTest(true, UTC_application_getAppInfo_P_004,	"[Application]UTC_application_getAppInfo_P_004");
TestEngine.addTest(true, UTC_application_getAppInfo_N_001,	"[Application]UTC_application_getAppInfo_N_001");

TestEngine.addTest(true, UTC_application_getAppCerts_P_001,	"[Application]UTC_application_getAppCerts_P_001");
TestEngine.addTest(true, UTC_application_getAppCerts_P_002,	"[Application]UTC_application_getAppCerts_P_002");
TestEngine.addTest(true, UTC_application_getAppCerts_P_003,	"[Application]UTC_application_getAppCerts_P_003");
TestEngine.addTest(true, UTC_application_getAppCerts_P_004,	"[Application]UTC_application_getAppCerts_P_004");
TestEngine.addTest(true, UTC_application_getAppCerts_N_001,	"[Application]UTC_application_getAppCerts_N_001");

TestEngine.addTest(true, UTC_application_getAppSharedURI_P_001,	"[Application]UTC_application_getAppSharedURI_P_001");
TestEngine.addTest(true, UTC_application_getAppSharedURI_P_002,	"[Application]UTC_application_getAppSharedURI_P_002");
TestEngine.addTest(true, UTC_application_getAppSharedURI_P_003,	"[Application]UTC_application_getAppSharedURI_P_003");
TestEngine.addTest(true, UTC_application_getAppSharedURI_P_004,	"[Application]UTC_application_getAppSharedURI_P_004");
TestEngine.addTest(true, UTC_application_getAppSharedURI_N_001,	"[Application]UTC_application_getAppSharedURI_N_001");

TestEngine.addTest(true, UTC_application_getAppMetaData_P_001,	"[Application]UTC_application_getAppMetaData_P_001");
TestEngine.addTest(true, UTC_application_getAppMetaData_P_002,	"[Application]UTC_application_getAppMetaData_P_002");
TestEngine.addTest(true, UTC_application_getAppMetaData_P_003,	"[Application]UTC_application_getAppMetaData_P_003");
TestEngine.addTest(true, UTC_application_getAppMetaData_P_004,	"[Application]UTC_application_getAppMetaData_P_004");
TestEngine.addTest(true, UTC_application_getAppMetaData_N_001,	"[Application]UTC_application_getAppMetaData_N_001");

TestEngine.addTest(true, UTC_application_addAppInfoEventListener_P_001,	"[Application]UTC_application_addAppInfoEventListener_P_001");
TestEngine.addTest(true, UTC_application_addAppInfoEventListener_P_002,	"[Application]UTC_application_addAppInfoEventListener_P_002");
TestEngine.addTest(true, UTC_application_addAppInfoEventListener_P_003,	"[Application]UTC_application_addAppInfoEventListener_P_003");
TestEngine.addTest(true, UTC_application_addAppInfoEventListener_P_004,	"[Application]UTC_application_addAppInfoEventListener_P_004");
TestEngine.addTest(true, UTC_application_addAppInfoEventListener_P_005,	"[Application]UTC_application_addAppInfoEventListener_P_005");
TestEngine.addTest(true, UTC_application_addAppInfoEventListener_P_006,	"[Application]UTC_application_addAppInfoEventListener_P_006");
TestEngine.addTest(true, UTC_application_addAppInfoEventListener_P_007,	"[Application]UTC_application_addAppInfoEventListener_P_007");
TestEngine.addTest(true, UTC_application_addAppInfoEventListener_P_008,	"[Application]UTC_application_addAppInfoEventListener_P_008");
TestEngine.addTest(true, UTC_application_addAppInfoEventListener_N_001,	"[Application]UTC_application_addAppInfoEventListener_N_001");
TestEngine.addTest(true, UTC_application_removeAppInfoEventListener_N_001,	"[Application]UTC_application_removeAppInfoEventListener_N_001");

TestEngine.addTest(true, UTC_application_construct_ApplicationControlData_P_001,	"[Application]UTC_application_construct_ApplicationControlData_P_001");
TestEngine.addTest(true, UTC_application_construct_ApplicationControlData_P_002,	"[Application]UTC_application_construct_ApplicationControlData_P_002");

TestEngine.addTest(true, UTC_application_construct_ApplicationControl_P_001,	"[Application]UTC_application_construct_ApplicationControl_P_001");
TestEngine.addTest(true, UTC_application_construct_ApplicationControl_P_002,	"[Application]UTC_application_construct_ApplicationControl_P_002");
TestEngine.addTest(true, UTC_application_construct_ApplicationControl_P_003,	"[Application]UTC_application_construct_ApplicationControl_P_003");

TestEngine.addTest(true, UTC_application_field_ApplicationInformation_N_001,	"[Application]UTC_application_field_ApplicationInformation_N_001");
TestEngine.addTest(true, UTC_application_field_ApplicationContext_N_001,	"[Application]UTC_application_field_ApplicationContext_N_001");

TestEngine.addTest(true, UTC_application_launch_P_001, 	"[Application]UTC_application_launch_P_001");
TestEngine.addTest(true, UTC_application_launch_P_002, 	"[Application]UTC_application_launch_P_002");
TestEngine.addTest(true, UTC_application_launch_P_003, 	"[Application]UTC_application_launch_P_003");
TestEngine.addTest(true, UTC_application_launch_N_001, 	"[Application]UTC_application_launch_N_001");
TestEngine.addTest(true, UTC_application_launch_N_002, 	"[Application]UTC_application_launch_N_002");
TestEngine.addTest(true, UTC_application_launch_N_003, 	"[Application]UTC_application_launch_N_003");
TestEngine.addTest(true, UTC_application_launch_N_004, 	"[Application]UTC_application_launch_N_004");
TestEngine.addTest(true, UTC_application_launch_N_005, 	"[Application]UTC_application_launch_N_005");
TestEngine.addTest(true, UTC_application_launch_N_006, 	"[Application]UTC_application_launch_N_006");

TestEngine.addTest(true, UTC_application_kill_P_000, 	"[Application]UTC_application_kill_P_000");
TestEngine.addTest(true, UTC_application_kill_P_001, 	"[Application]UTC_application_kill_P_001");
TestEngine.addTest(true, UTC_application_kill_P_002, 	"[Application]UTC_application_kill_P_002");

TestEngine.addTest(true, UTC_application_kill_N_001, 	"[Application]UTC_application_kill_N_001");
TestEngine.addTest(true, UTC_application_kill_N_002, 	"[Application]UTC_application_kill_N_002");
TestEngine.addTest(true, UTC_application_kill_N_003, 	"[Application]UTC_application_kill_N_003");
TestEngine.addTest(true, UTC_application_kill_N_004, 	"[Application]UTC_application_kill_N_004");
TestEngine.addTest(true, UTC_application_kill_N_005, 	"[Application]UTC_application_kill_N_005");
TestEngine.addTest(true, UTC_application_kill_N_006, 	"[Application]UTC_application_kill_N_006");

TestEngine.addTest(true, UTC_application_findAppControl_P_001, 	"[Application]UTC_application_findAppControl_P_001");
TestEngine.addTest(true, UTC_application_findAppControl_P_002, 	"[Application]UTC_application_findAppControl_P_002");
TestEngine.addTest(true, UTC_application_findAppControl_P_003, 	"[Application]UTC_application_findAppControl_P_003");
TestEngine.addTest(true, UTC_application_findAppControl_N_001, 	"[Application]UTC_application_findAppControl_N_001");

TestEngine.addTest(true, UTC_application_launchAppControl_P_001, 	"[Application]UTC_application_launchAppControl_P_001");
TestEngine.addTest(true, UTC_application_launchAppControl_P_002, 	"[Application]UTC_application_launchAppControl_P_002");
TestEngine.addTest(true, UTC_application_launchAppControl_P_003, 	"[Application]UTC_application_launchAppControl_P_003");
TestEngine.addTest(true, UTC_application_launchAppControl_P_007, 	"[Application]UTC_application_launchAppControl_P_007");
TestEngine.addTest(true, UTC_application_launchAppControl_P_008, 	"[Application]UTC_application_launchAppControl_P_008");
//TestEngine.addTest(true, UTC_application_launchAppControl_P_009, 	"[Application]UTC_application_launchAppControl_P_009");
TestEngine.addTest(true, UTC_application_launchAppControl_N_001, 	"[Application]UTC_application_launchAppControl_N_001");
TestEngine.addTest(true, UTC_application_launchAppControl_N_002, 	"[Application]UTC_application_launchAppControl_N_002");

//TestEngine.addTest(true, UTC_application_DCM_1456, 	"[Application]UTC_application_DCM_1456");


//TestEngine.addTest(true, UTC_application_getRequestedAppControl_P_001, 	"[Application]UTC_application_getRequestedAppControl_P_001");
//TestEngine.addTest(true, UTC_application_getRequestedAppControl_P_002, 	"[Application]UTC_application_getRequestedAppControl_P_002");

//TestEngine.addTest(true, UTC_application_exit, 	"[Application]UTC_application_exit");
//TestEngine.addTest(true, UTC_application_hide, 	"[Application]UTC_application_hide");
