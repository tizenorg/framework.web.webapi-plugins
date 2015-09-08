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


TestEngine.setTestSuiteName("[Package]", 60 * 1000);

TestEngine.addTest(true, UTC_package_presence_P_001,	"[Package]UTC_package_presence_P_001");

//TestEngine.addTest(true, UTC_package_install_P_001, 	"[Package]UTC_package_install_P_001");
// Install operation is related to user confirm action. That makes some delay and that is why comment out below test.
//TestEngine.addTest(true, UTC_package_install_P_002, 	"[Package]UTC_package_install_P_002");
//TestEngine.addTest(true, UTC_package_install_P_003, 	"[Package]UTC_package_install_P_003");
TestEngine.addTest(true, UTC_package_install_N_001, 	"[Package]UTC_package_install_N_001");
TestEngine.addTest(true, UTC_package_install_N_002, 	"[Package]UTC_package_install_N_002");
TestEngine.addTest(true, UTC_package_install_N_003, 	"[Package]UTC_package_install_N_003");
TestEngine.addTest(true, UTC_package_install_N_004, 	"[Package]UTC_package_install_N_004");
TestEngine.addTest(true, UTC_package_install_N_005, 	"[Package]UTC_package_install_N_005");
TestEngine.addTest(true, UTC_package_install_N_006, 	"[Package]UTC_package_install_N_006");

TestEngine.addTest(true, UTC_package_getPackagesInfo_P_001, 	"[Package]UTC_package_getPackagesInfo_P_001");
TestEngine.addTest(true, UTC_package_getPackagesInfo_P_002, 	"[Package]UTC_package_getPackagesInfo_P_002");

//TestEngine.addTest(true, UTC_package_uninstall_P_001, 	"[Package]UTC_package_uninstall_P_001");
//Install operation is related to user confirm action. That makes some delay and that is why comment out below test.
//TestEngine.addTest(true, UTC_package_uninstall_P_002, 	"[Package]UTC_package_uninstall_P_002");
//TestEngine.addTest(true, UTC_package_uninstall_P_003, 	"[Package]UTC_package_uninstall_P_003");
TestEngine.addTest(true, UTC_package_uninstall_N_001, 	"[Package]UTC_package_uninstall_N_001");
TestEngine.addTest(true, UTC_package_uninstall_N_002, 	"[Package]UTC_package_uninstall_N_002");
TestEngine.addTest(true, UTC_package_uninstall_N_003, 	"[Package]UTC_package_uninstall_N_003");
TestEngine.addTest(true, UTC_package_uninstall_N_004, 	"[Package]UTC_package_uninstall_N_004");
TestEngine.addTest(true, UTC_package_uninstall_N_005, 	"[Package]UTC_package_uninstall_N_005");
TestEngine.addTest(true, UTC_package_uninstall_N_006, 	"[Package]UTC_package_uninstall_N_006");

TestEngine.addTest(true, UTC_package_getPackagesInfo_P_003, 	"[Package]UTC_package_getPackagesInfo_P_003");
TestEngine.addTest(true, UTC_package_getPackagesInfo_N_001, 	"[Package]UTC_package_getPackagesInfo_N_001");

TestEngine.addTest(true, UTC_package_getPackageInfo_P_001,	"[Package]UTC_package_getPackageInfo_P_001");
TestEngine.addTest(true, UTC_package_getPackageInfo_P_002,	"[Package]UTC_package_getPackageInfo_P_002");
TestEngine.addTest(true, UTC_package_getPackageInfo_P_003,	"[Package]UTC_package_getPackageInfo_P_003");
TestEngine.addTest(true, UTC_package_getPackageInfo_N_001,	"[Package]UTC_package_getPackageInfo_N_001");

TestEngine.addTest(true, UTC_package_setPackageInfoEventListener_P_001,	"[Package]UTC_package_setPackageInfoEventListener_P_001");
//TestEngine.addTest(true, UTC_package_setPackageInfoEventListener_P_002,	"[Package]UTC_package_setPackageInfoEventListener_P_002");
//TestEngine.addTest(true, UTC_package_setPackageInfoEventListener_P_003,	"[Package]UTC_package_setPackageInfoEventListener_P_003");
TestEngine.addTest(true, UTC_package_setPackageInfoEventListener_P_004,	"[Package]UTC_package_setPackageInfoEventListener_P_004");
TestEngine.addTest(true, UTC_package_setPackageInfoEventListener_P_005,	"[Package]UTC_package_setPackageInfoEventListener_P_005");
TestEngine.addTest(true, UTC_package_setPackageInfoEventListener_P_006,	"[Package]UTC_package_setPackageInfoEventListener_P_006");
TestEngine.addTest(true, UTC_package_setPackageInfoEventListener_N_001,	"[Package]UTC_package_setPackageInfoEventListener_N_001");

TestEngine.addTest(true, UTC_package_unsetPackageInfoEventListener_P_001,	"[Package]UTC_package_unsetPackageInfoEventListener_P_001");

TestEngine.addTest(true, UTC_package_field_PackageInformation_N_001,	"[Package]UTC_package_field_PackageInformation_N_001");