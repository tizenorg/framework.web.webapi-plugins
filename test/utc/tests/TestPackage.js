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

var TYPE_MISMATCH_ERR = 'TypeMismatchError';
var NOT_FOUND_ERR = 'NotFoundError';

var CURR_PKG_ID = 'tizenutc00';
var CURR_APP_ID = 'tizenutc00.PackageUnitTest';
var TEST_NUM = 1234;
var TEST_STR = "UTC_TEST_STRING";
var TEST_OBJ = new tizen.ApplicationControl("TEST_OPERATION");
var TEST_FUN = function() {};

var TEST_PKG_PATH_1 = '/opt/usr/media/Downloads/PkgTest001.wgt';
var TEST_PKG_ID_1 = 'PkgTest001';
var TEST_PKG_PATH_2 = '/opt/usr/media/Downloads/PkgTest002.wgt';
var TEST_PKG_ID_2 = 'PkgTest002';
var TEST_PKG_PATH_3 = '/opt/usr/media/Downloads/PkgTest003.wgt';
var TEST_PKG_ID_3 = 'PkgTest003';
var TEST_ILLEGAL_PKG_PATH = '/opt/usr/media/Downloads/illegal_widget.wgt';
var TEST_ILLEGAL_ID = 'illegal';

/********************************************************************
 *   Package Interface
 ********************************************************************/

function onSuccessCB()
{
	TestEngine.test("[Package]", true);
}

function onErrorCB(err)
{
	TestEngine.log("error name: " + err.name);
	TestEngine.log("error code: " + err.code);
	TestEngine.log("description: " + err.description);
	TestEngine.log("message: " + err.message);

	TestEngine.test("[Package]", false);
}

var onInstallSuccessCB =
{
	onprogress: function(pkg, progress) {
		TestEngine.log("on progress : " + pkg + " progress : " + progress);
	},
	oncomplete: function(pkg) {
		TestEngine.log("Completed : " + pkg);
		TestEngine.test("[Package]", true);
	}
};


function UTC_package_presence_P_001()
{
	TestEngine.log("[Package] UTC_package_presence_P_001 START");
	try {
		TestEngine.test("Tizen presence", tizen);
	    TestEngine.test("PackageManager presence", tizen.package);
		TestEngine.testPresence("install", tizen.package.install);
		TestEngine.testPresence("uninstall", tizen.package.uninstall);
		TestEngine.testPresence("getPackagesInfo", tizen.package.getPackagesInfo);
		TestEngine.testPresence("getPackageInfo", tizen.package.getPackageInfo);
		TestEngine.testPresence("setPackageInfoEventListener", tizen.package.setPackageInfoEventListener);
		TestEngine.testPresence("unsetPackageInfoEventListener", tizen.package.unsetPackageInfoEventListener);
	} catch (err) {
		TestEngine.test("[Package] UTC_package_presence_P_001 error : " + err);
		TestEngine.test("", false);
	}

	TestEngine.log("[Package] UTC_package_presence_P_001 END");
}

function UTC_package_install_P_001()
{
	TestEngine.log("[Package] UTC_package_install_P_001 START");
	var cbObj = TestEngine.registerCallback("install", onSuccessCB, onErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			//TestEngine.test("[Package]", true);
			cbObj.successCallback();
		}
	};	
	
	try {
		tizen.package.install(TEST_PKG_PATH_1, onInstallSuccessCB, null);
	} catch (err) {
		TestEngine.test("[Package] UTC_package_install_P_001 error", false);
	}
	
	TestEngine.log("[Package] UTC_package_install_P_001 END");
}

function UTC_package_install_P_002()
{
	TestEngine.log("[Package] UTC_package_install_P_002 START");
	var cbObj = TestEngine.registerCallback("install", onSuccessCB, onErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			//TestEngine.test("[Package]", true);
			setTimeout("cbObj.successCallback()", 3000);
		}
	};	
		
	try {
		setTimeout("tizen.package.install(TEST_PKG_PATH_2, onInstallSuccessCB, cbObj.errorCallback)", 2000);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_install_P_002 END");
}

function UTC_package_install_P_003()
{
	TestEngine.log("[Package] UTC_package_install_P_003 START");
	var cbObj = TestEngine.registerCallback("install", onSuccessCB, onErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			//TestEngine.test("[Package]", true);
			setTimeout("cbObj.successCallback()", 3000);
		}
	};		
	try {
		tizen.package.install(TEST_PKG_PATH_3, onInstallSuccessCB, undefined);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_install_P_003 END");
 }

function UTC_package_install_P_004()
{
	TestEngine.log("[Package] UTC_package_install_P_004 START");

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
		}
	};	
	
	try {
		tizen.package.install(TEST_PKG_PATH_1, onInstallSuccessCB);
	} catch (err) {
		TestEngine.test("[Package] UTC_package_install_P_004 error", false);
	}
	
	TestEngine.test("[Package] UTC_package_install_P_004 error", true);
	TestEngine.log("[Package] UTC_package_install_P_004 END");
}

function UTC_package_install_P_005()
{
	TestEngine.log("[Package] UTC_package_install_P_005 START");

	var onInstallSuccessCB =
	{
		oncomplete: function(pkg, progress) {
		}
	};	
	
	try {
		tizen.package.install(TEST_PKG_PATH_1, onInstallSuccessCB);
	} catch (err) {
		TestEngine.test("[Package] UTC_package_install_P_005 error", false);
	}

	TestEngine.test("[Package] UTC_package_install_P_005", true);
	TestEngine.log("[Package] UTC_package_install_P_005 END");
}


function UTC_package_install_N_001()
{
	TestEngine.log("[Package] UTC_package_install_N_001 START");

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "install", TEST_PKG_PATH_1, TEST_NUM,	null);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "install", TEST_PKG_PATH_1, TEST_STR,	null);
	//TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "install", TEST_PKG_PATH_1, TEST_OBJ,	null);

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "install", TEST_PKG_PATH_1, onInstallSuccessCB, TEST_NUM);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "install", TEST_PKG_PATH_1, onInstallSuccessCB, TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "install", TEST_PKG_PATH_1, onInstallSuccessCB, TEST_OBJ);

	TestEngine.log("[Package] UTC_package_install_N_001 END");
}


function UTC_package_install_N_002()
{
	TestEngine.log("[Package] UTC_package_install_N_002 START");
	var cbObj = TestEngine.registerCallback("install", onSuccessCB, notFoundErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			cbObj.successCallback();
		}
	};

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Package] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		tizen.package.install(TEST_ILLEGAL_PKG_PATH, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_install_N_002 END");
}

function UTC_package_install_N_003()
{
	TestEngine.log("[Package] UTC_package_install_N_003 START");
	var cbObj = TestEngine.registerCallback("install", onSuccessCB, notFoundErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			cbObj.successCallback();
		}
	};

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Package] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		tizen.package.install(undefined, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_install_N_003 END");
}

function UTC_package_install_N_004()
{
	TestEngine.log("[Package] UTC_package_install_N_004 START");
	var cbObj = TestEngine.registerCallback("install", onSuccessCB, notFoundErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			cbObj.successCallback();
		}
	};

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Package] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		tizen.package.install(null, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_install_N_004 END");
}

function UTC_package_install_N_005()
{
	TestEngine.log("[Package] UTC_package_install_N_005 START");
	var cbObj = TestEngine.registerCallback("install", onSuccessCB, notFoundErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			cbObj.successCallback();
		}
	};

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Package] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		tizen.package.install(TEST_OBJ, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_install_N_005 END");
}

function UTC_package_install_N_006()
{
	TestEngine.log("[Package] UTC_package_install_N_005 START");
	var cbObj = TestEngine.registerCallback("install", onSuccessCB, notFoundErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			cbObj.successCallback();
		}
	};

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Package] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		tizen.package.install(TEST_FUN, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}

	TestEngine.log("[Package] UTC_package_install_N_006 END");
}



function UTC_package_uninstall_P_001()
{
	TestEngine.log("[Package] UTC_package_uninstall_P_001 START");
	var cbObj = TestEngine.registerCallback("uninstall", onSuccessCB, onErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			//TestEngine.test("[Package]", true);
			cbObj.successCallback();
		}
	};	
	
	try {
		tizen.package.uninstall(TEST_PKG_ID_1, onInstallSuccessCB, null);
	} catch (err) {
		TestEngine.test("[Package] UTC_package_install_P_001 error", false);
	}
	TestEngine.log("[Package] UTC_package_uninstall_P_001 END");
}

function UTC_package_uninstall_P_002()
{
	TestEngine.log("[Package] UTC_package_uninstall_P_002 START");
	var cbObj = TestEngine.registerCallback("uninstall", onSuccessCB, onErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			//TestEngine.test("[Package]", true);
			cbObj.successCallback();
		}
	};	
	
	try {
		tizen.package.uninstall(TEST_PKG_ID_2, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("[Package] UTC_package_install_P_001 error", false);
	}
	TestEngine.log("[Package] UTC_package_uninstall_P_002 END");
}

function UTC_package_uninstall_P_003()
{
	TestEngine.log("[Package] UTC_package_uninstall_P_003 START");
	var cbObj = TestEngine.registerCallback("uninstall", onSuccessCB, onErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			//TestEngine.test("[Package]", true);
			cbObj.successCallback();
		}
	};	
	
	try {
		tizen.package.uninstall(TEST_PKG_ID_3, onInstallSuccessCB, undefined);
	} catch (err) {
		TestEngine.test("[Package] UTC_package_install_P_001 error", false);
	}
	TestEngine.log("[Package] UTC_package_uninstall_P_003 END");
 }

function UTC_package_uninstall_P_004()
{
	TestEngine.log("[Package] UTC_package_uninstall_P_004 START");

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
		}
	};	
	
	try {
		tizen.package.uninstall(TEST_PKG_PATH_1, onInstallSuccessCB);
	} catch (err) {
		TestEngine.test("[Package] UTC_package_uninstall_P_004 error", false);
	}
	
	TestEngine.test("[Package] UTC_package_uninstall_P_004 error", true);
	TestEngine.log("[Package] UTC_package_uninstall_P_004 END");
}

function UTC_package_uninstall_P_005()
{
	TestEngine.log("[Package] UTC_package_uninstall_P_005 START");

	var onInstallSuccessCB =
	{
		oncomplete: function(pkg, progress) {
		}
	};	
	
	try {
		tizen.package.uninstall(TEST_PKG_PATH_1, onInstallSuccessCB);
	} catch (err) {
		TestEngine.test("[Package] UTC_package_uninstall_P_005 error", false);
	}
	
	TestEngine.test("[Package] UTC_package_uninstall_P_005 error", true);
	TestEngine.log("[Package] UTC_package_uninstall_P_005 END");
}

function UTC_package_uninstall_N_001()
{
	TestEngine.log("[Package] UTC_package_uninstall_N_001 START");

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "uninstall", TEST_PKG_ID_1, TEST_NUM,	null);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "uninstall", TEST_PKG_ID_1, TEST_STR,	null);
	//TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "uninstall", TEST_PKG_ID_1, TEST_OBJ,	null);

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "uninstall", TEST_PKG_ID_1, onInstallSuccessCB, TEST_NUM);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "uninstall", TEST_PKG_ID_1, onInstallSuccessCB, TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "uninstall", TEST_PKG_ID_1, onInstallSuccessCB, TEST_OBJ);

	TestEngine.log("[Package] UTC_package_uninstall_N_001 END");
}


function UTC_package_uninstall_N_002()
{
	TestEngine.log("[Package] UTC_package_uninstall_N_002 START");
	var cbObj = TestEngine.registerCallback("uninstall", onSuccessCB, notFoundErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			cbObj.successCallback();
		}
	};

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Package] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		tizen.package.uninstall(TEST_ILLEGAL_ID, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_uninstall_N_002 END");
}

function UTC_package_uninstall_N_003()
{
	TestEngine.log("[Package] UTC_package_uninstall_N_003 START");
	var cbObj = TestEngine.registerCallback("uninstall", onSuccessCB, notFoundErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			cbObj.successCallback();
		}
	};

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Package] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		tizen.package.uninstall(undefined, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_uninstall_N_003 END");
}

function UTC_package_uninstall_N_004()
{
	TestEngine.log("[Package] UTC_package_uninstall_N_004 START");
	var cbObj = TestEngine.registerCallback("uninstall", onSuccessCB, notFoundErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			cbObj.successCallback();
		}
	};

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Package] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		tizen.package.uninstall(null, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_uninstall_N_004 END");
}

function UTC_package_uninstall_N_005()
{
	TestEngine.log("[Package] UTC_package_uninstall_N_005 START");
	var cbObj = TestEngine.registerCallback("uninstall", onSuccessCB, notFoundErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			cbObj.successCallback();
		}
	};

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Package] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		tizen.package.uninstall(TEST_OBJ, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_uninstall_N_005 END");
}

function UTC_package_uninstall_N_006()
{
	TestEngine.log("[Package] UTC_package_uninstall_N_005 START");
	var cbObj = TestEngine.registerCallback("uninstall", onSuccessCB, notFoundErrorCB);

	var onInstallSuccessCB =
	{
		onprogress: function(pkg, progress) {
			TestEngine.log("on progress : " + pkg + " progress : " + progress);
		},
		oncomplete: function(pkg) {
			TestEngine.log("Completed : " + pkg);
			cbObj.successCallback();
		}
	};

	function notFoundErrorCB(err)
	{
		if (err.name == NOT_FOUND_ERR) {
			TestEngine.test("[Package] cannot found", true);
		} else {
			TestEngine.test("", false);
		}
	}

	try {
		tizen.package.uninstall(TEST_FUN, onInstallSuccessCB, cbObj.errorCallback);
	} catch (err) {
		TestEngine.test("", false);
	}
	
	TestEngine.log("[Package] UTC_package_uninstall_N_006 END");
}

function infolist(infos)
{
	TestEngine.log("[infolist][START]");

	try {
		TestEngine.log("PackageInfo Array Length = " + infos.length);
/*
		for(var num=0; num < infos.length; num++)
		{
			TestEngine.log("PackageInfo["+num+"].name = "+infos[num].name);
			TestEngine.log("PackageInfo["+num+"].id = "+infos[num].id);
		}
*/		
	} catch (ex) {
		TestEngine.test("[Package] UTC_package_getAppsInfo error: " + ex, false);
	}
	TestEngine.test("UTC_package_getPackagesInfo", true);
	TestEngine.log("[infolist][END]");
}

function UTC_package_getPackagesInfo_P_001()
{
	TestEngine.log("[Package] UTC_package_getPackagesInfo_P_001 START");

	try {
		var cbObj = TestEngine.registerCallback("getPackagesInfo", infolist, onErrorCB);
		tizen.package.getPackagesInfo(cbObj.successCallback, cbObj.errorCallback);
	} catch(err) {
		TestEngine.test("[Package] UTC_package_getPackagesInfo_P_001 err : " + err, false);
	}

	TestEngine.log("[Package] UTC_package_getPackagesInfo_P_001 END");
}

function UTC_package_getPackagesInfo_P_002()
{
	TestEngine.log("[Package] UTC_package_getPackagesInfo_P_002 START");

	try {
		var cbObj = TestEngine.registerCallback("getPackagesInfo", infolist, onErrorCB);
		tizen.package.getPackagesInfo(cbObj.successCallback);
	} catch(err) {
		TestEngine.test("[Package] UTC_package_getPackagesInfo_P_002 err : " + err, false);
	}

	TestEngine.log("[Package] UTC_package_getPackagesInfo_P_002 END");
}

function UTC_package_getPackagesInfo_P_003()
{
	TestEngine.log("[Package] UTC_package_getPackagesInfo_P_003 START");

	try {
		var cbObj = TestEngine.registerCallback("getPackagesInfo", infolist, onErrorCB);
		tizen.package.getPackagesInfo(cbObj.successCallback, null);
	} catch(err) {
		TestEngine.test("[Package] UTC_package_getPackagesInfo_P_003 err : " + err, false);
	}

	TestEngine.log("[Package] UTC_package_getPackagesInfo_P_003 END");
}

function UTC_package_getPackagesInfo_N_001()
{
	TestEngine.log("[Package] UTC_package_getPackagesInfo_N_001 START");

	try {
		// first parameter
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "getPackagesInfo", null,		onErrorCB);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "getPackagesInfo", undefined,	onErrorCB);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "getPackagesInfo", TEST_STR,	onErrorCB);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "getPackagesInfo", TEST_NUM,	onErrorCB);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "getPackagesInfo", TEST_OBJ,	onErrorCB);
	
		// second parameter
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "getPackagesInfo", infolist, TEST_STR);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "getPackagesInfo", infolist, TEST_NUM);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "getPackagesInfo", infolist, TEST_OBJ);
	} catch (err) {
		TestEngine.test("[Package] UTC_package_getPackagesInfo_N_001 err : " + err, false);
	}
	TestEngine.log("[Package] UTC_package_getPackagesInfo_N_001 END");
}

function UTC_package_getPackageInfo_P_001()
{
	TestEngine.log("[Package] UTC_package_getPackageInfo_P_001 START");

	try {
		var info = tizen.package.getPackageInfo(CURR_PKG_ID);
		//TestEngine.log("PackageInfo.name = "+info.name);
		//TestEngine.log("PackageInfo.id = "+info.id);
		if (info.id != CURR_PKG_ID) {
			TestEngine.test("[Package] UTC_package_getPackageInfo_P_001 err : current context is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Package] UTC_package_getPackageInfo_P_001 err : " + err, false);
	}
	TestEngine.test("[Package] UTC_package_getPackageInfo_P_001", true);

	TestEngine.log("[Package] UTC_package_getPackageInfo_P_001 END");
}

function UTC_package_getPackageInfo_P_002()
{
	TestEngine.log("[Package] UTC_package_getPackageInfo_P_002 START");

	try {
		var info = tizen.package.getPackageInfo(null);
		//TestEngine.log("PackageInfo.name = "+info.name);
		//TestEngine.log("PackageInfo.id = "+info.id);
		if (info.id != CURR_PKG_ID) {
			TestEngine.test("[Package] UTC_package_getPackageInfo_P_002 err : current context is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Package] UTC_package_getPackageInfo_P_002 err : " + err, false);
	}
	TestEngine.test("[Package] UTC_package_getPackageInfo_P_002", true);

	TestEngine.log("[Package] UTC_package_getPackageInfo_P_002 END");
}

function UTC_package_getPackageInfo_P_003()
{
	TestEngine.log("[Package] UTC_package_getPackageInfo_P_002 START");

	try {
		var info = tizen.package.getPackageInfo();
		//TestEngine.log("PackageInfo.name = "+info.name);
		//TestEngine.log("PackageInfo.id = "+info.id);
		if (info.id != CURR_PKG_ID) {
			TestEngine.test("[Package] UTC_package_getPackageInfo_P_002 err : current context is not same", false);
		}
	} catch(err) {
		TestEngine.test("[Package] UTC_package_getPackageInfo_P_002 err : " + err, false);
	}
	TestEngine.test("[Package] UTC_package_getPackageInfo_P_002", true);

	TestEngine.log("[Package] UTC_package_getPackageInfo_P_002 END");
}

function UTC_package_getPackageInfo_N_001()
{
	TestEngine.log("[Package] UTC_package_getPackageInfo_N_001 START");

	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.package, "getPackageInfo", TEST_ILLEGAL_ID);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.package, "getPackageInfo", TEST_OBJ);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.package, "getPackageInfo", TEST_FUN);
	TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.package, "getPackageInfo", TEST_NUM);

	TestEngine.log("[Package] UTC_package_getPackageInfo_N_001 END");
}


function printPackageInformation(pkginfo) {
	TestEngine.log("[printPackageInformation][START]");

	try {
		TestEngine.log("pkginfo.name = "+pkginfo.name);
		TestEngine.log("pkginfo.appId = "+pkginfo.appId);
		TestEngine.log("pkginfo.iconPath = "+pkginfo.iconPath);
		TestEngine.log("pkginfo.version = "+pkginfo.version);
	} catch (ex){
		onErrorCB(ex);
	}

	TestEngine.log("[printPackageInformation][END]");
}

var onInstallSuccessCB_2 =
{
	onprogress: function(pkg, progress) {
		TestEngine.log("on progress : " + pkg + " progress : " + progress);
	},
	oncomplete: function(pkg) {
		TestEngine.log("Completed : " + pkg);
	}
};


function UTC_package_setPackageInfoEventListener_P_001()
{
	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_001 START");

	var onPackageInfoEventCB = {
		oninstalled : function(pkginfo) {},
 		onupdated : function(pkginfo) {},
 		onuninstalled : function(pkgid) {}
	};

	try {
		tizen.package.setPackageInfoEventListener(onPackageInfoEventCB);
	} catch(err) {
		TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_001 err : " + err, false);
	}
	TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_001", true);

	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_001 END");
}

function UTC_package_setPackageInfoEventListener_P_002()
{
	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_002 START");
	var cbObj = TestEngine.registerCallback("setPackageInfoEventListener", onSuccessCB, onErrorCB);
	
	var onPackageInfoEventCB = {
		oninstalled : function(pkginfo) {
			TestEngine.log("[onInstalled][START]");
			try {
				printPackageInformation(pkginfo);
				cbObj.successCallback();
				//TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_002", true);
			} catch (ex) {
				onErrorCB(ex);
			}
			TestEngine.log("[onInstalled][END]");
		},
 		onupdated : function(pkginfo) {
			TestEngine.log("[onupdated][START]");
			cbObj.errorCallback();
			//TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_002", false);
		},
 		onuninstalled : function(pkgid) {
			TestEngine.log("[onuninstalled][START]");
			cbObj.errorCallback();
			//TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_002", false);
		}
	};

	try {
		tizen.package.setPackageInfoEventListener(onPackageInfoEventCB);
		tizen.package.install(TEST_PKG_PATH_1, onInstallSuccessCB_2);

	} catch(err) {
		TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_002 err : " + err, false);
	}
 
	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_002 END");
}

function UTC_package_setPackageInfoEventListener_P_003()
{
	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_003 START");
	var cbObj = TestEngine.registerCallback("setPackageInfoEventListener", onSuccessCB, onErrorCB);
	
	var onPackageInfoEventCB = {
		oninstalled : function(pkginfo) {
			TestEngine.log("[oninstalled][START]");
			cbObj.errorCallback();
			//TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_003", false);
		},
 		onupdated : function(pkginfo) {
			TestEngine.log("[onupdated][START]");
			cbObj.errorCallback();
			//TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_003", false);
		},
 		onuninstalled : function(pkgid) {
 			TestEngine.log("[onuninstalled][START]");
			try {
				TestEngine.log("[onuninstalled] pkgid : " + pkgid);
				//TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_003", true);
				cbObj.successCallback();
			} catch (ex) {
				onErrorCB(ex);
			}
			TestEngine.log("[onuninstalled][END]");		
 		}
	};

	try {
		tizen.package.setPackageInfoEventListener(onPackageInfoEventCB);
		tizen.package.uninstall("PkgTest001", onInstallSuccessCB_2);

	} catch(err) {
		TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_003 err : " + err, false);
	}
 
	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_003 END");
}


function UTC_package_setPackageInfoEventListener_P_004()
{
	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_004 START");

	var onPackageInfoEventCB = {
		oninstalled : function(pkginfo) {}
	};

	try {
		tizen.package.setPackageInfoEventListener(onPackageInfoEventCB);
	} catch(err) {
		TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_004 err : " + err, false);
	}
	TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_004", true);

	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_004 END");
}

function UTC_package_setPackageInfoEventListener_P_005()
{
	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_005 START");

	var onPackageInfoEventCB = {
 		onupdated : function(pkginfo) {}
	};

	try {
		tizen.package.setPackageInfoEventListener(onPackageInfoEventCB);
	} catch(err) {
		TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_005 err : " + err, false);
	}
	TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_005", true);

	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_005 END");
}

function UTC_package_setPackageInfoEventListener_P_006()
{
	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_006 START");

	var onPackageInfoEventCB = {
 		onuninstalled : function(pkgid) {}
	};

	try {
		tizen.package.setPackageInfoEventListener(onPackageInfoEventCB);
	} catch(err) {
		TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_006 err : " + err, false);
	}
	TestEngine.test("[Package] UTC_package_setPackageInfoEventListener_P_006", true);

	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_P_006 END");
}

function UTC_package_setPackageInfoEventListener_N_001()
{
	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_N_001 START");

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "setPackageInfoEventListener", null);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "setPackageInfoEventListener", undefined);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "setPackageInfoEventListener", TEST_STR);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "setPackageInfoEventListener", TEST_NUM);
	//TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.package, "setPackageInfoEventListener", TEST_OBJ);

	TestEngine.log("[Package] UTC_package_setPackageInfoEventListener_N_001 END");
}

// NO unsetPackageInfoEventListener test.

function UTC_package_unsetPackageInfoEventListener_P_001()
{
	TestEngine.log("[Package] UTC_package_unsetPackageInfoEventListener_P_001 START");

	var onPackageInfoEventCB = {
		oninstalled : function(pkginfo) {},
 		onupdated : function(pkginfo) {},
 		onuninstalled : function(pkgid) {}
	};

	try {
		tizen.package.setPackageInfoEventListener(onPackageInfoEventCB);
		tizen.package.unsetPackageInfoEventListener();

	} catch(err) {
		TestEngine.test("[Package] UTC_package_unsetPackageInfoEventListener_P_001 err : " + err, false);
	}
	TestEngine.test("[Package] UTC_package_unsetPackageInfoEventListener_P_001", true);

	TestEngine.log("[Package] UTC_package_unsetPackageInfoEventListener_P_001 END");
}

function UTC_package_field_PackageInformation_N_001()
{
	TestEngine.log("[Package] UTC_package_field_PackageInformation_N_001 START");

	var info = tizen.package.getPackageInfo();

	printPackageInformation(info);

	var id = info.id;
	var name = info.name;
	var iconPath = info.iconPath;
	var version = info.version;

	try {
		info.id = "test";
		info.name = "UTC_package_N_00ame";
		info.iconPath = "/tmp";
		info.version = "12345";
	} catch(err) {
		TestEngine.test("[Package] UTC_package_field_PackageInformation_N_001 error : " + err, false);
	}

	if ((info.id != id) || (info.name != name) || (info.version != version) || (info.iconPath != iconPath)) {
		TestEngine.test("[Package] UTC_package_field_PackageInformation_N_001 the value is changed!", false);
	}

	TestEngine.test("[Package] UTC_package_field_PackageInformation_N_001 success", true);
	TestEngine.log("[Package] UTC_package_field_PackageInformation_N_001 END");
}

