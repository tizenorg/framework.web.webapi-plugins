/*
Copyright (c) 2013 Samsung Electronics Co., Ltd.

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
        Junghyuk Park <junghyuk.park@samsung.com>

*/

var TCT_PACKAGE_TIZEN_TESTS_PACKAGE_ID = "tizenutc00";
var TCT_PACKAGE_TIZEN_TESTS_PACKAGE_NAME = "WebServiceTest";
var TCT_PACKAGE_TIZEN_TESTS_PACKAGE_APP_ID = "tizenutc00.UnitTest";
var TCT_PACKAGE_TIZEN_TESTS_PACKAGE_APP_ID_2 = "tizenutcmp.MsgPortSvr";
var TCT_PACKAGE_TIZEN_TESTS_PACKAGE_APP_ID_3 = "tizenutc00.WebServiceTest";
var TCT_PACKAGE_TIZEN_TESTS_PACKAGE_AUTHOR = "";
var TCT_PACKAGE_TIZEN_TESTS_PACKAGE_DESCRIPTION = "";


var TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH = "/opt/usr/media/Downloads/TCTPackageManagerTest1.1.1.wgt";
var TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH_2 = "/opt/usr/media/Downloads/TCTPackageManagerTest2.2.2.wgt";
var TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID = "api1pack10";
var TCT_PACKAGE_MANAGER_TEST_PACKAGE_NAME = "TCTPackageManagerTest";
var TCT_PACKAGE_MANAGER_TEST_PACKAGE_APP_ID = "api1pack10.TCTPackageManagerTest";
var TCT_PACKAGE_MANAGER_TEST_PACKAGE_VERSION_1 = "1.1.1";
var TCT_PACKAGE_MANAGER_TEST_PACKAGE_VERSION_2 = "2.2.2";
var TCT_PACKAGE_MANAGER_TEST_PACKAGE_AUTHOR = "The author of TCTPackageManagerTest";
var TCT_PACKAGE_MANAGER_TEST_PACKAGE_DESCRIPTION = "The description of TCTPackageManagerTest";


var TCT_PACKAGE_INFO_TEST_PACKAGE_ID = "api1pack20";
var TCT_PACKAGE_INFO_TEST_PACKAGE_NAME = "TCTPackageInfoTest";
var TCT_PACKAGE_INFO_TEST_PACKAGE_ICON_PATH = "icon.png";
var TCT_PACKAGE_INFO_TEST_PACKAGE_VERSION = "1.2.3";
var TCT_PACKAGE_INFO_TEST_PACKAGE_AUTHOR = "The author of TCTPackageInfoTest";
var TCT_PACKAGE_INFO_TEST_PACKAGE_DESCRIPTION = "The description of TCTPackageInfoTest";
var TCT_PACKAGE_INFO_TEST_PACKAGE_APP_ID = "api1pack20.TCTPackageInfoTest";

var NOT_EXISTING_PACKAGE_ID = "api1dummy0";
function PackageInformationArraySuccessCallback_notexist() {
//==== TEST: PackageInformationArraySuccessCallback_notexist
//==== PRIORITY P3
//==== LABEL Check if interface PackageInformationArraySuccessCallback exists, it should not
//==== SPEC Tizen Web API:Application:Package:PackageInformationArraySuccessCallback:PackageInformationArraySuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("PackageInformationArraySuccessCallback");
}, 'PackageInformationArraySuccessCallback_notexist');

}

function PackageInformationArraySuccessCallback_onsuccess() {
//==== TEST: PackageInformationArraySuccessCallback_onsuccess
//==== LABEL Check if PackageInformationArraySuccessCallback works
//==== SPEC Tizen Web API:Application:Package:PackageInformationArraySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 30000});

var t = async_test('PackageInformationArraySuccessCallback_onsuccess', {timeout: 30000}), packageInformation,
    packageInformationArraySuccessCallback, errorCallback;

t.step(function () {
    packageInformationArraySuccessCallback = t.step_func(function (informationArray) {

        assert_true(Array.isArray(informationArray), "informationArray is not an array.");
        assert_greater_than(informationArray.length, 0, "Incorrect length of informationArray.");

        packageInformation = informationArray[0];

        assert_type(packageInformation.id, "string", "PackageInformation.id attribute is not a string.");
        assert_not_equals(packageInformation.id, "", "PackageInformation.id is empty string.");

        assert_type(packageInformation.name, "string", "PackageInformation.name attribute is not a string.");
        assert_not_equals(packageInformation.name, "", "PackageInformation.name is empty string.");

        assert_type(packageInformation.iconPath, "string", "PackageInformation.iconPath attribute is not a string.");
        assert_not_equals(packageInformation.iconPath, "", "PackageInformation.iconPath is empty string.");

        assert_type(packageInformation.version, "string", "PackageInformation.version attribute is not a string.");

        assert_type(packageInformation.totalSize, "long", "PackageInformation.totalSize is not a number");

        assert_type(packageInformation.dataSize, "long", "PackageInformation.dataSize is not a number");

        assert_greater_than_equal(packageInformation.totalSize, packageInformation.dataSize,
            "PackageInformation.dataSize is bigger than packageInformation.totalSize.");

        assert_true(packageInformation.lastModified instanceof Date, "PackageInformation.lastModified is not a Date");
        assert_true(packageInformation.lastModified < new Date(),
            "PackageInformation.lastModified is from present ot future.");

        assert_type(packageInformation.author, "string", "PackageInformation.author attribute is not a string");

        assert_type(packageInformation.appIds, "array", "PackageInformation.appIds is not an array.");

        assert_type(packageInformation.description, "string", "PackageInformation.description attribute is not a string.");
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("ErrorCallback invoked. Exception name:" + error.name + ", message: " + error.message);
    });

    tizen.package.getPackagesInfo(packageInformationArraySuccessCallback, errorCallback);
});

}

function PackageInformationEventCallback_notexist() {
//==== TEST: PackageInformationEventCallback_notexist
//==== PRIORITY P3
//==== LABEL Check if interface PackageInformationEventCallback exists, it should not
//==== SPEC Tizen Web API:Application:Package:PackageInformationEventCallback:PackageInformationEventCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("PackageInformationEventCallback");
}, 'PackageInformationEventCallback_notexist');

}

function PackageInformation_appIds_attribute() {
//==== TEST: PackageInformation_appIds_attribute
//==== LABEL Check if attribute appIds of PackageInformation exists, has type Array and is readonly
//==== SPEC Tizen Web API:Application:Package:PackageInformation:appIds A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA AE ARO AT
test(function () {
    var packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID), newValue = ["newValue"],
        expectedValue = [TCT_PACKAGE_INFO_TEST_PACKAGE_APP_ID];
    assert_own_property(packageInformation, "appIds" , "PackageInformation does not own appIds property.");

    assert_type(packageInformation.appIds, "array", "Not an array");
    assert_array_equals(packageInformation.appIds, expectedValue, "PackageInformation.appIds is incorrect.");

    packageInformation.appIds = newValue;
    assert_array_equals(packageInformation.appIds, expectedValue, "PackageInformation.appIds is incorrect.");

    packageInformation.appIds = null;
    assert_array_equals(packageInformation.appIds, expectedValue, "PackageInformation.appIds is incorrect.");
}, 'PackageInformation_appIds_attribute');

}

function PackageInformation_author_attribute() {
//==== TEST: PackageInformation_author_attribute
//==== LABEL Check if attribute author of PackageInformation exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:Application:Package:PackageInformation:author A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID);
    assert_own_property(packageInformation, "author" , "PackageInformation does not own author property.");
    check_readonly(packageInformation, "author", TCT_PACKAGE_INFO_TEST_PACKAGE_AUTHOR, "string", "newValue");
}, 'PackageInformation_author_attribute');

}

function PackageInformation_dataSize_attribute() {
//==== TEST: PackageInformation_dataSize_attribute
//==== LABEL Check if attribute dataSize of PackageInformation exists, has type Number and is readonly
//==== SPEC Tizen Web API:Application:Package:PackageInformation:dataSize A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var originalValue, packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID), newValue = 1234567;
    assert_own_property(packageInformation, "dataSize" , "PackageInformation does not own dataSize property.");

    assert_type(packageInformation.dataSize, "long", "Incorrect type for PackageInformation.dataSize attribute.");

    originalValue = packageInformation.dataSize;
    packageInformation.dataSize = newValue;
    assert_type(packageInformation.dataSize, "long", "Incorrect type for PackageInformation.dataSize after assignment.");
    assert_not_equals(packageInformation.dataSize, newValue, "PackageInformation.dataSize can be modified.");
    assert_equals(packageInformation.dataSize, originalValue, "PackageInformation.dataSize can be modified.");

    packageInformation.dataSize = null;
    assert_type(packageInformation.dataSize, "long", "Incorrect type for PackageInformation.dataSize after assignment.");
    assert_not_equals(packageInformation.dataSize, null, "PackageInformation.dataSize can be modified.");
    assert_equals(packageInformation.dataSize, originalValue, "PackageInformation.dataSize can be modified.");
}, 'PackageInformation_dataSize_attribute');

}

function PackageInformation_description_attribute() {
//==== TEST: PackageInformation_description_attribute
//==== LABEL Check if attribute description of PackageInformation exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:Application:Package:PackageInformation:description A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID);
    assert_own_property(packageInformation, "description" , "PackageInformation does not own description property.");
    check_readonly(packageInformation, "description", TCT_PACKAGE_INFO_TEST_PACKAGE_DESCRIPTION, "string", "newValue");
}, 'PackageInformation_description_attribute');

}

function PackageInformation_extend() {
//==== TEST: PackageInformation_extend
//==== LABEL Check if PackageInformation is extendable
//==== SPEC Tizen Web API:Application:Package:PackageInformation:PackageInformation U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX
test(function () {
    var packageInformation = tizen.package.getPackageInfo();
    check_extensibility(packageInformation);
}, 'PackageInformation_extend');

}

function PackageInformation_iconPath_attribute() {
//==== TEST: PackageInformation_iconPath_attribute
//==== LABEL Check if attribute iconPath of PackageInformation exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:Application:Package:PackageInformation:iconPath A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var originalValue, packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID), newValue = "newValue";
    assert_own_property(packageInformation, "iconPath" , "PackageInformation does not own iconPath property.");

    assert_type(packageInformation.iconPath, "string", "Incorrect type for PackageInformation.iconPath attribute.");
    assert_not_equals(packageInformation.iconPath, "", "PackageInformation.iconPath is an empty string.");

    originalValue = packageInformation.iconPath;
    packageInformation.iconPath = newValue;
    assert_type(packageInformation.iconPath, "string", "Incorrect type for PackageInformation.iconPath after assignment.");
    assert_not_equals(packageInformation.iconPath, newValue, "PackageInformation.iconPath can be modified.");
    assert_equals(packageInformation.iconPath, originalValue, "PackageInformation.iconPath can be modified.");

    packageInformation.iconPath = null;
    assert_type(packageInformation.iconPath, "string", "Incorrect type for PackageInformation.iconPath after assignment.");
    assert_not_equals(packageInformation.iconPath, null, "PackageInformation.iconPath can be modified.");
    assert_equals(packageInformation.iconPath, originalValue, "PackageInformation.iconPath can be modified.");

}, 'PackageInformation_iconPath_attribute');

}

function PackageInformation_id_attribute() {
//==== TEST: PackageInformation_id_attribute
//==== LABEL Check if attribute id of PackageInformation exists, has type PackageId and is readonly
//==== SPEC Tizen Web API:Application:Package:PackageInformation:id A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID);
    assert_own_property(packageInformation, "id" , "PackageInformation does not own id property.");
    check_readonly(packageInformation, "id", TCT_PACKAGE_INFO_TEST_PACKAGE_ID, "string", "newValue");
}, 'PackageInformation_id_attribute');

}

function PackageInformation_lastModified_attribute() {
//==== TEST: PackageInformation_lastModified_attribute
//==== LABEL Check if attribute lastModified of PackageInformation exists, has type Date and is readonly
//==== SPEC Tizen Web API:Application:Package:PackageInformation:lastModified A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var originalValue, packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID), newValue = new Date();
    assert_own_property(packageInformation, "lastModified" , "PackageInformation does not own lastModified property.");

    assert_true(packageInformation.lastModified instanceof Date, "PackageInformation.lastModified is not a Date");

    originalValue = packageInformation.lastModified;
    packageInformation.lastModified = newValue;
    assert_true(packageInformation.lastModified instanceof Date, "PackageInformation.lastModified is not a Date");
    assert_not_equals(packageInformation.lastModified.getTime(), newValue.getTime(), "PackageInformation.lastModified can be modified.");
    assert_equals(packageInformation.lastModified.getTime(), originalValue.getTime(), "PackageInformation.lastModified can be modified.");

    packageInformation.lastModified = null;
    assert_true(packageInformation.lastModified instanceof Date, "PackageInformation.lastModified is not a Date");
    assert_not_equals(packageInformation.lastModified, null, "PackageInformation.lastModified can be modified.");
    assert_equals(packageInformation.lastModified.getTime(), originalValue.getTime(), "PackageInformation.lastModified can be modified.");

}, 'PackageInformation_lastModified_attribute');

}

function PackageInformation_name_attribute() {
//==== TEST: PackageInformation_name_attribute
//==== LABEL Check if attribute name of PackageInformation exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:Application:Package:PackageInformation:name A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID);
    assert_own_property(packageInformation, "name" , "PackageInformation does not own name property.");
    check_readonly(packageInformation, "name", TCT_PACKAGE_INFO_TEST_PACKAGE_NAME, "string", "newValue");
}, 'PackageInformation_name_attribute');

}

function PackageInformation_notexist() {
//==== TEST: PackageInformation_notexist
//==== PRIORITY P3
//==== LABEL Check if interface PackageInformation exists, it should not
//==== SPEC Tizen Web API:Application:Package:PackageInformation:PackageInformation U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("PackageInformation");
}, 'PackageInformation_notexist');

}

function PackageInformation_totalSize_attribute() {
//==== TEST: PackageInformation_totalSize_attribute
//==== LABEL Check if attribute totalSize of PackageInformation exists, has type Number and is readonly
//==== SPEC Tizen Web API:Application:Package:PackageInformation:totalSize A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var originalValue, packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID), newValue = 1234567;
    assert_own_property(packageInformation, "totalSize" , "PackageInformation does not own totalSize property.");

    assert_type(packageInformation.totalSize, "long", "Incorrect type for PackageInformation.totalSize attribute.");

    originalValue = packageInformation.totalSize;
    packageInformation.totalSize = newValue;
    assert_type(packageInformation.totalSize, "long", "Incorrect type for PackageInformation.totalSize after assignment.");
    assert_not_equals(packageInformation.totalSize, newValue, "PackageInformation.totalSize can be modified.");
    assert_equals(packageInformation.totalSize, originalValue, "PackageInformation.totalSize can be modified.");

    packageInformation.totalSize = null;
    assert_type(packageInformation.totalSize, "long", "Incorrect type for PackageInformation.totalSize after assignment.");
    assert_not_equals(packageInformation.totalSize, null, "PackageInformation.totalSize can be modified.");
    assert_equals(packageInformation.totalSize, originalValue, "PackageInformation.totalSize can be modified.");
}, 'PackageInformation_totalSize_attribute');

}

function PackageInformation_version_attribute() {
//==== TEST: PackageInformation_version_attribute
//==== LABEL Check if attribute version of PackageInformation exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:Application:Package:PackageInformation:version A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID);
    assert_own_property(packageInformation, "version" , "PackageInformation does not own version property.");
    check_readonly(packageInformation, "version", TCT_PACKAGE_INFO_TEST_PACKAGE_VERSION, "string", "newValue");
}, 'PackageInformation_version_attribute');

}

function PackageManagerObject_notexist() {
//==== TEST: PackageManagerObject_notexist
//==== PRIORITY P3
//==== LABEL Check if interface PackageManagerObject exists, it should not
//==== SPEC Tizen Web API:Application:Package:PackageManagerObject:PackageManagerObject U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("PackageManagerObject");
}, 'PackageManagerObject_notexist');

}

function PackageManager_extend() {
//==== TEST: PackageManager_extend
//==== LABEL Check if PackageManager is extendable
//==== SPEC Tizen Web API:Application:Package:PackageManager:PackageManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX
test(function () {
    check_extensibility(tizen.package);
}, 'PackageManager_extend');

}

function PackageManager_getPackageInfo() {
//==== TEST: PackageManager_getPackageInfo
//==== LABEL Check if method getPackageInfo of PackageManager works properly
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackageInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var packageInformation;
    packageInformation = tizen.package.getPackageInfo();

    assert_equals(packageInformation.id, TCT_PACKAGE_TIZEN_TESTS_PACKAGE_ID, "PackageInformation.id is incorrect.");
    assert_equals(packageInformation.name, TCT_PACKAGE_TIZEN_TESTS_PACKAGE_NAME, "PackageInformation.name is incorrect.");

    assert_type(packageInformation.iconPath, "string", "Incorrect type for PackageInformation.iconPath attribute.");
    assert_not_equals(packageInformation.iconPath, "", "PackageInformation.iconPath is an empty string.");

    assert_type(packageInformation.version, "string", "Incorrect type of PackageInformation.version");
    assert_not_equals(packageInformation.version, "", "PackageInformation.version is an empty string");

    assert_type(packageInformation.totalSize, "long", "Incorrect type of PackageInformation.totalSize");
    assert_type(packageInformation.dataSize, "long", "Incorrect type of PackageInformation.dataSize");
    assert_greater_than_equal(packageInformation.totalSize, packageInformation.dataSize,
        "PackageInformation.dataSize is bigger than packageInformation.totalSize.");

    assert_true(packageInformation.lastModified instanceof Date, "PackageInformation.lastModified is not a Date");

    assert_equals(packageInformation.author, TCT_PACKAGE_TIZEN_TESTS_PACKAGE_AUTHOR, "PackageInformation.author is incorrect.");

    assert_array_equals(packageInformation.appIds, [TCT_PACKAGE_TIZEN_TESTS_PACKAGE_APP_ID, TCT_PACKAGE_TIZEN_TESTS_PACKAGE_APP_ID_2, TCT_PACKAGE_TIZEN_TESTS_PACKAGE_APP_ID_3],
        "packageInformation.appIds is incorrect");

    assert_equals(packageInformation.description, TCT_PACKAGE_TIZEN_TESTS_PACKAGE_DESCRIPTION,
        "PackageInformation.description is incorect.");

}, 'PackageManager_getPackageInfo');

}

function PackageManager_getPackageInfo_exist() {
//==== TEST: PackageManager_getPackageInfo_exist
//==== LABEL Check if method getPackageInfo of PackageManager exists
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackageInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("getPackageInfo" in tizen.package, "No getPackageInfo method in tizen.package");
    check_method_exists(tizen.package, "getPackageInfo");
}, 'PackageManager_getPackageInfo_exist');

}

function PackageManager_getPackageInfo_with_id() {
//==== TEST: PackageManager_getPackageInfo_with_id
//==== LABEL Check if method getPackageInfo of PackageManager works properly with id
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackageInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MOA MR
test(function () {
    var packageInformation;
    packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_INFO_TEST_PACKAGE_ID);

    assert_equals(packageInformation.id, TCT_PACKAGE_INFO_TEST_PACKAGE_ID, "PackageInformation.id is incorrect.");
    assert_equals(packageInformation.name, TCT_PACKAGE_INFO_TEST_PACKAGE_NAME, "PackageInformation.name is incorrect.");

    assert_type(packageInformation.iconPath, "string", "Incorrect type for PackageInformation.iconPath attribute.");
    assert_not_equals(packageInformation.iconPath, "", "PackageInformation.iconPath is an empty string.");

    assert_equals(packageInformation.version, TCT_PACKAGE_INFO_TEST_PACKAGE_VERSION, "PackageInformation.version is incorrect.");

    assert_type(packageInformation.totalSize, "long", "Incorrect type of PackageInformation.totalSize");
    assert_type(packageInformation.dataSize, "long", "Incorrect type of PackageInformation.dataSize");
    assert_greater_than_equal(packageInformation.totalSize, packageInformation.dataSize,
        "PackageInformation.dataSize is bigger than packageInformation.totalSize.");

    assert_true(packageInformation.lastModified instanceof Date,
        "PackageInformation.lastModified is not a Date");

    assert_equals(packageInformation.author, TCT_PACKAGE_INFO_TEST_PACKAGE_AUTHOR, "PackageInformation.author is incorrect.");

    assert_array_equals(packageInformation.appIds, [TCT_PACKAGE_INFO_TEST_PACKAGE_APP_ID],
        "packageInformation.appIds is incorrect");

    assert_equals(packageInformation.description, TCT_PACKAGE_INFO_TEST_PACKAGE_DESCRIPTION,
        "PackageInformation.description is incorect.");

}, 'PackageManager_getPackageInfo_with_id');

}

function PackageManager_getPackagesInfo() {
//==== TEST: PackageManager_getPackagesInfo
//==== LABEL Check if method getPackagesInfo of PackageManager works properly
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackagesInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA MMINA MR
setup({timeout: 90000});

var t = async_test('PackageManager_getPackagesInfo', {timeout: 90000}),
    packageInformationArraySuccessCallback, returnedValue = null;

t.step(function () {
    packageInformationArraySuccessCallback = t.step_func(function (informationArray) {
        assert_equals(returnedValue, undefined, "Incorect returned value from getPackagesInfo method");

        assert_true(Array.isArray(informationArray), "informationArray is not an array.");
        assert_greater_than(informationArray.length, 0, "Incorrect length of informationArray.");

        t.done();
    });

    returnedValue = tizen.package.getPackagesInfo(packageInformationArraySuccessCallback);
});

}

function PackageManager_getPackagesInfo_errorCallback_TypeMismatch() {
//==== TEST: PackageManager_getPackagesInfo_errorCallback_TypeMismatch
//==== LABEL Check if getPackagesInfo throws exception when errorCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackagesInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('PackageManager_getPackagesInfo_errorCallback_TypeMismatch', {timeout: 30000}), conversionTable,
    packageInformationArraySuccessCallback, exceptionName, errorCallback, i;

t.step(function () {
    packageInformationArraySuccessCallback = t.step_func(function (informationArray) {
        assert_unreached("Success callback invoked");
    });

    conversionTable = getTypeConversionExceptions("functionObject", true);

    for(i = 0; i < conversionTable.length; i++) {
        errorCallback  = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.package.getPackagesInfo(packageInformationArraySuccessCallback, errorCallback);
            }, exceptionName + " should be thrown - given incorrect errorCallback: " + errorCallback + ".");
    }
    t.done();
});

}

function PackageManager_getPackagesInfo_errorCallback_invalid_cb() {
//==== TEST: PackageManager_getPackagesInfo_errorCallback_invalid_cb
//==== LABEL Check if getPackagesInfo throws exception when errorCallback is invalid
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackagesInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MTCB
setup({timeout: 30000});

var t = async_test('PackageManager_getPackagesInfo_errorCallback_invalid_cb', {timeout: 30000}), exceptionName = "TypeMismatchError",
    invalidCallback, packageInformationArraySuccessCallback;

t.step(function () {
    packageInformationArraySuccessCallback = t.step_func(function (informationArray) {
        assert_unreached("Success callback invoked");
    });

    invalidCallback = {
        onerror: t.step_func(function (error) {
            assert_unreached("Invalid error callback invoked");
        })
    };

    assert_throws({name: exceptionName},
        function () {
            tizen.package.getPackagesInfo(packageInformationArraySuccessCallback, invalidCallback);
        }, exceptionName + " should be thrown - given incorrect error callback - object.");
    t.done();
});

}

function PackageManager_getPackagesInfo_exist() {
//==== TEST: PackageManager_getPackagesInfo_exist
//==== LABEL Check if method getPackagesInfo of PackageManager exists
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackagesInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("getPackagesInfo" in tizen.package, "No getPackagesInfo method in tizen.package");
    check_method_exists(tizen.package, "getPackagesInfo");
}, 'PackageManager_getPackagesInfo_exist');

}

function PackageManager_getPackagesInfo_missarg() {
//==== TEST: PackageManager_getPackagesInfo_missarg
//==== LABEL Check if getPackagesInfo throws exception when non-optional argument is missing
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackagesInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MMA
setup({timeout: 30000});

var t = async_test('PackageManager_getPackagesInfo_missarg', {timeout: 30000}),
    exceptionName = "TypeMismatchError";

t.step(function () {
    assert_throws({name: exceptionName},
        function () {
            tizen.package.getPackagesInfo();
        }, exceptionName + " should be thrown - missing successCallback.");

    t.done();
});

}

function PackageManager_getPackagesInfo_successCallback_TypeMismatch() {
//==== TEST: PackageManager_getPackagesInfo_successCallback_TypeMismatch
//==== LABEL Check if getPackagesInfo throws exception when successCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackagesInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('PackageManager_getPackagesInfo_successCallback_TypeMismatch', {timeout: 30000}), conversionTable,
    packageInformationArraySuccessCallback, exceptionName, errorCallback, i;

t.step(function () {
    errorCallback = t.step_func(function (error) {
        assert_unreached("getPackagesInfo() error callback: name:" + error.name + ", msg:" + error.message);
    });

    conversionTable = getTypeConversionExceptions("functionObject", false);

    for(i = 0; i < conversionTable.length; i++) {
        packageInformationArraySuccessCallback  = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.package.getPackagesInfo(packageInformationArraySuccessCallback, errorCallback);
            }, exceptionName + " should be thrown - given incorrect successCallback: " + packageInformationArraySuccessCallback + ".");
    }
    t.done();
});

}

function PackageManager_getPackagesInfo_successCallback_invalid_cb() {
//==== TEST: PackageManager_getPackagesInfo_successCallback_invalid_cb
//==== LABEL Check if getPackagesInfo throws exception when successCallback is invalid
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackagesInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MTCB
setup({timeout: 30000});

var t = async_test('PackageManager_getPackagesInfo_successCallback_invalid_cb', {timeout: 30000}), exceptionName = "TypeMismatchError",
    errorCallback, invalidCallback;

t.step(function () {
    invalidCallback = {
        onsuccess: t.step_func(function (informationArray) {
            assert_unreached("Invalid success callback invoked");
        })
    };

    errorCallback = t.step_func(function (error) {
        assert_unreached("ErrorCallback invoked: " + error.name + ": " + error.message);
    });

    assert_throws({name: exceptionName},
        function () {
            tizen.package.getPackagesInfo(invalidCallback, errorCallback);
        }, exceptionName + " should be thrown - given incorrect successCallback - object.");
    t.done();
});

}

function PackageManager_getPackagesInfo_with_errorCallback() {
//==== TEST: PackageManager_getPackagesInfo_with_errorCallback
//==== LABEL Check if method getPackagesInfo of PackageManager works properly with errorCallback
//==== SPEC Tizen Web API:Application:Package:PackageManager:getPackagesInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA MOA
setup({timeout: 90000});

var t = async_test('PackageManager_getPackagesInfo_with_errorCallback', {timeout: 90000}),
    packageInformationArraySuccessCallback, errorCallback;

t.step(function () {
    packageInformationArraySuccessCallback = t.step_func(function (informationArray) {

        assert_true(Array.isArray(informationArray), "informationArray is not an array.");
        assert_greater_than(informationArray.length, 0, "Incorrect length of informationArray.");

        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("ErrorCallback invoked. Exception name:" + error.name + ", message: " + error.message);
    });

    tizen.package.getPackagesInfo(packageInformationArraySuccessCallback, errorCallback);
});

}

function PackageManager_in_tizen() {
//==== TEST: PackageManager_in_tizen
//==== PRIORITY P3
//==== LABEL Check if package exists in tizen
//==== SPEC Tizen Web API:Application:Package:PackageManager:PackageManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA OBME
test(function () {
    assert_true("package" in tizen, "No package in tizen.");
    check_readonly(tizen, "package", tizen.package, "object", "dummyValue");
}, 'PackageManager_in_tizen');

}

function PackageManager_install_exist() {
//==== TEST: PackageManager_install_exist
//==== LABEL Check if method install of PackageManager exists
//==== SPEC Tizen Web API:Application:Package:PackageManager:install M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("install" in tizen.package, "No install method in tizen.package");
    check_method_exists(tizen.package, "install");
}, 'PackageManager_install_exist');

}

function PackageManager_notexist() {
//==== TEST: PackageManager_notexist
//==== PRIORITY P3
//==== LABEL Check if interface PackageManager exists, it should not
//==== SPEC Tizen Web API:Application:Package:PackageManager:PackageManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("PackageManager");
}, 'PackageManager_notexist');

}

function PackageManager_setPackageInfoEventListener_exist() {
//==== TEST: PackageManager_setPackageInfoEventListener_exist
//==== LABEL Check if method setPackageInfoEventListener of PackageManager exists
//==== SPEC Tizen Web API:Application:Package:PackageManager:setPackageInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("setPackageInfoEventListener" in tizen.package, "No setPackageInfoEventListener method in tizen.package");
    check_method_exists(tizen.package, "setPackageInfoEventListener");
}, 'PackageManager_setPackageInfoEventListener_exist');

}

function PackageManager_uninstall_exist() {
//==== TEST: PackageManager_uninstall_exist
//==== LABEL Check if method uninstall of PackageManager exists
//==== SPEC Tizen Web API:Application:Package:PackageManager:uninstall M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("uninstall" in tizen.package, "No uninstall method in tizen.package");
    check_method_exists(tizen.package, "uninstall");
}, 'PackageManager_uninstall_exist');

}

function PackageManager_unsetPackageInfoEventListener_exist() {
//==== TEST: PackageManager_unsetPackageInfoEventListener_exist
//==== LABEL Check if method unsetPackageInfoEventListener of PackageManager exists
//==== SPEC Tizen Web API:Application:Package:PackageManager:unsetPackageInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("unsetPackageInfoEventListener" in tizen.package, "No unsetPackageInfoEventListener method in tizen.package");
    check_method_exists(tizen.package, "unsetPackageInfoEventListener");
}, 'PackageManager_unsetPackageInfoEventListener_exist');

}

function PackageManager_unsetPackageInfoEventListener_extra_argument() {
//==== TEST: PackageManager_unsetPackageInfoEventListener_extra_argument
//==== LABEL Check if method unsetPackageInfoEventListener of PackageManager accepts extra argument
//==== SPEC Tizen Web API:Application:Package:PackageManager:unsetPackageInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.package, "unsetPackageInfoEventListener");
}, 'PackageManager_unsetPackageInfoEventListener_extra_argument');

}

function PackageManager_setPackageInfoEventListener_eventCallback_TypeMismatch() {
//==== TEST: PackageManager_setPackageInfoEventListener_eventCallback_TypeMismatch
//==== LABEL Check if setPackageInfoEventListener throws exception when successCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:setPackageInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('PackageManager_setPackageInfoEventListener_eventCallback_TypeMismatch', {timeout: 30000}), conversionTable,
    packageInformationEventCallback, exceptionName, i;

t.step(function () {
    conversionTable = getTypeConversionExceptions("object", false);

    for(i = 0; i < conversionTable.length; i++) {
        packageInformationEventCallback  = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.package.setPackageInfoEventListener(packageInformationEventCallback);
            }, exceptionName + " should be thrown - given incorrect listener: " + packageInformationEventCallback + ".");
    }
    t.done();
});

}

function PackageManager_setPackageInfoEventListener_eventCallback_invalid_cb() {
//==== TEST: PackageManager_setPackageInfoEventListener_eventCallback_invalid_cb
//==== LABEL Check if setPackageInfoEventListener throws exception when successCallback is invalid
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:setPackageInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MTL
setup({timeout: 30000});

var t = async_test('PackageManager_setPackageInfoEventListener_eventCallback_invalid_cb', {timeout: 30000}), exceptionName,
    incorrectListeners, i, packageInformationEventCallback;

t.step(function () {
    incorrectListeners = getListenerConversionExceptions(["oninstalled", "onupdated", "onuninstalled"]);
    for(i = 0; i < incorrectListeners.length; i++) {
        packageInformationEventCallback  = incorrectListeners[i][0];
        exceptionName = incorrectListeners[i][1];
        assert_throws({name: exceptionName},
            function () {
                tizen.package.setPackageInfoEventListener(packageInformationEventCallback);
            }, exceptionName + " should be thrown - given incorrect successCallback.");
    }

    t.done();
});

}

function PackageManager_setPackageInfoEventListener_misarg() {
//==== TEST: PackageManager_setPackageInfoEventListener_misarg
//==== LABEL Check if setPackageInfoEventListener throws exception when successCallback is missing
//==== SPEC Tizen Web API:Application:Package:PackageManager:setPackageInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MMA
test(function () {
    var exceptionName = "TypeMismatchError";

    assert_throws({name: exceptionName},
        function () {
            tizen.package.setPackageInfoEventListener();
        }, exceptionName + " should be thrown - not given any argument.");
}, 'PackageManager_setPackageInfoEventListener_misarg');

}

function PackageProgressCallback_notexist() {
//==== TEST: PackageProgressCallback_notexist
//==== PRIORITY P3
//==== LABEL Check if interface PackageProgressCallback exists, it should not
//==== SPEC Tizen Web API:Application:Package:PackageProgressCallback:PackageProgressCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("PackageProgressCallback");
}, 'PackageProgressCallback_notexist');

}

function PackageManager_setPackageInfoEventListener() {
//==== TEST: PackageManager_setPackageInfoEventListener
//==== LABEL Check if method setPackageInfoEventListener of PackageManager returns properly value
//==== SPEC Tizen Web API:Application:Package:PackageManager:setPackageInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var returnedValue = null;
    try {
        returnedValue = tizen.package.setPackageInfoEventListener({});
        assert_equals(returnedValue, undefined, "Incorrect returned value from setPackageInfoEventListener method");
    } finally {
        tizen.package.unsetPackageInfoEventListener();
    }
}, 'PackageManager_setPackageInfoEventListener');

}

function PackageManager_install_missarg() {
//==== TEST: PackageManager_install_missarg
//==== LABEL Check with missing non-optional argument - PackageManager.install
//==== SPEC Tizen Web API:Application:Package:PackageManager:install M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MMA
test(function () {
    var exceptionName = "TypeMismatchError";
    assert_throws({name: exceptionName}, function () {
        tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH);
    }, exceptionName + " should be thrown - missing argument.");
}, 'PackageManager_install_missarg');

}

function PackageManager_uninstall_missarg() {
//==== TEST: PackageManager_uninstall_missarg
//==== LABEL Check with missing non-optional argument - PackageManager.uninstall
//==== SPEC Tizen Web API:Application:Package:PackageManager:uninstall M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MMA
test(function () {
    var exceptionName = "TypeMismatchError";
    assert_throws({name: exceptionName}, function () {
        tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH);
    }, exceptionName + " should be thrown - missing argument.");
}, 'PackageManager_uninstall_missarg');

}

function PackageManager_install_errorCallback_TypeMismatch() {
//==== TEST: PackageManager_install_errorCallback_TypeMismatch
//==== LABEL Check argument errorCallback conversions exception - install
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:install M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('PackageManager_install_errorCallback_TypeMismatch', {timeout: 30000}), exceptionName,
    incorrectCallback, installProgressCallback, conversionTable, i;

t.step(function () {
    installProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            assert_unreached("onprogress invoked.");
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_unreached("oncomplete invoked, ");
        })
    };

    conversionTable = getTypeConversionExceptions("functionObject", true);
    for(i = 0; i < conversionTable.length; i++) {
        incorrectCallback  = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
        function () {
            tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, installProgressCallback, incorrectCallback);
        }, exceptionName + " should be thrown - given incorrect errorCallback: " + incorrectCallback + ".");
    }
    t.done();
});

}

function PackageManager_install_errorCallback_invalid_cb() {
//==== TEST: PackageManager_install_errorCallback_invalid_cb
//==== LABEL Check argument errorCallback validation - install
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:install M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MTCB
setup({timeout: 30000});

var t = async_test('PackageManager_install_errorCallback_invalid_cb', {timeout: 30000}), exceptionName = "TypeMismatchError",
    invalidCallback, installProgressCallback;

t.step(function () {
    installProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            assert_unreached("onprogress invoked.");
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_unreached("oncomplete invoked, ");
        })
    };

    invalidCallback = {
        onerror: t.step_func(function (error) {
            assert_unreached("Invalid error callback invoked");
        })
    };

    assert_throws({name: exceptionName},
        function () {
            tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, installProgressCallback, invalidCallback);
        }, exceptionName + " should be thrown - given incorrect errorCallback - object.");
    t.done();
});

}

function PackageManager_install_progressCallback_TypeMismatch() {
//==== TEST: PackageManager_install_progressCallback_TypeMismatch
//==== LABEL Check argument progressCallback conversions exception - install
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:install M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('PackageManager_install_progressCallback_TypeMismatch', {timeout: 30000}), installProgressCallback, installError,
    exceptionName, i, conversionTable;

t.step(function () {
    installError = t.step_func(function (error) {
        assert_unreached("install() error callback: name:" + error.name + ", msg:" + error.message);
    });

    conversionTable = getTypeConversionExceptions("object", false);

    for(i = 0; i < conversionTable.length; i++) {
        installProgressCallback  = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, installProgressCallback, installError);
            }, exceptionName + " should be thrown - given incorrect listener: " + installProgressCallback + ".");
    }
    t.done();
});

}

function PackageManager_install_progressCallback_invalid_cb() {
//==== TEST: PackageManager_install_progressCallback_invalid_cb
//==== LABEL Check argument progressCallback validation - install
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:install M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MTL
setup({timeout: 30000});

var t = async_test('PackageManager_install_progressCallback_invalid_cb', {timeout: 30000}), exceptionName,
    incorrectListeners, i, installError, installProgressCallback;

t.step(function () {
    installError = t.step_func(function (error) {
        assert_unreached("install() error callback: name:" + error.name + ", msg:" + error.message);
    });

    incorrectListeners = getListenerConversionExceptions(["onprogress", "oncomplete"]);
    for(i = 0; i < incorrectListeners.length; i++) {
        installProgressCallback  = incorrectListeners[i][0];
        exceptionName = incorrectListeners[i][1];
        assert_throws({name: exceptionName},
            function () {
                tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, installProgressCallback, installError);
            }, exceptionName + " should be thrown - given incorrect listener.");
    }

    t.done();
});

}

function PackageManager_uninstall_errorCallback_TypeMismatch() {
//==== TEST: PackageManager_uninstall_errorCallback_TypeMismatch
//==== LABEL Check argument errorCallback conversions exception - uninstall
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:uninstall M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('PackageManager_uninstall_errorCallback_TypeMismatch', {timeout: 30000}),
    exceptionName, incorrectCallback, uninstallProgressCallback, conversionTable, i;

t.step(function () {
    uninstallProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            assert_unreached("onprogress invoked.");
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_unreached("oncomplete invoked, ");
        })
    };

    conversionTable = getTypeConversionExceptions("functionObject", true);
    for(i = 0; i < conversionTable.length; i++) {
        incorrectCallback  = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
        function () {
            tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, uninstallProgressCallback, incorrectCallback);
        }, exceptionName + " should be thrown - given incorrect errorCallback: " + incorrectCallback + ".");
    }
    t.done();
});

}

function PackageManager_uninstall_errorCallback_invalid_cb() {
//==== TEST: PackageManager_uninstall_errorCallback_invalid_cb
//==== LABEL Check argument errorCallback validation - uninstall
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:uninstall M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MTCB
setup({timeout: 30000});

var t = async_test('PackageManager_uninstall_errorCallback_invalid_cb', {timeout: 30000}),
    exceptionName = "TypeMismatchError", invalidCallback, uninstallProgressCallback;

t.step(function () {
    uninstallProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            assert_unreached("onprogress invoked.");
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_unreached("oncomplete invoked.");
        })
    };

    invalidCallback = {
        onerror: t.step_func(function (error) {
            assert_unreached("Invalid error callback invoked");
        })
    };

    assert_throws({name: exceptionName},
        function () {
            tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, uninstallProgressCallback, invalidCallback);
        }, exceptionName + " should be thrown - given incorrect errorCallback - object.");
    t.done();
});

}

function PackageManager_uninstall_progressCallback_TypeMismatch() {
//==== TEST: PackageManager_uninstall_progressCallback_TypeMismatch
//==== LABEL Check argument progressCallback conversions exception - uninstall
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:uninstall M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('PackageManager_uninstall_progressCallback_TypeMismatch', {timeout: 30000}), uninstallProgressCallback, uninstallError,
    exceptionName, i, conversionTable;

t.step(function () {
    uninstallError = t.step_func(function (error) {
        assert_unreached("uninstall() error callback: name:" + error.name + ", msg:" + error.message);
    });

    conversionTable = getTypeConversionExceptions("object", false);

    for(i = 0; i < conversionTable.length; i++) {
        uninstallProgressCallback  = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, uninstallProgressCallback, uninstallError);
            }, exceptionName + " should be thrown - given incorrect listener: " + uninstallProgressCallback + ".");
    }
    t.done();
});

}

function PackageManager_uninstall_progressCallback_invalid_cb() {
//==== TEST: PackageManager_uninstall_progressCallback_invalid_cb
//==== LABEL Check argument progressCallback validation - uninstall
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Package:PackageManager:uninstall M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== TEST_CRITERIA MTL
setup({timeout: 30000});

var t = async_test('PackageManager_uninstall_progressCallback_invalid_cb', {timeout: 30000}), exceptionName,
    incorrectListeners, i, uninstallError, uninstallProgressCallback;

t.step(function () {
    uninstallError = t.step_func(function (error) {
        assert_unreached("uninstall() error callback: name:" + error.name + ", msg:" + error.message);
    });

    incorrectListeners = getListenerConversionExceptions(["onprogress", "oncomplete"]);
    for(i = 0; i < incorrectListeners.length; i++) {
        uninstallProgressCallback  = incorrectListeners[i][0];
        exceptionName = incorrectListeners[i][1];
        assert_throws({name: exceptionName},
            function () {
                tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, uninstallProgressCallback, uninstallError);
            }, exceptionName + " should be thrown - given incorrect listener.");
    }

    t.done();
});

}

function PackageManager_install_errorCallback_invoked() {
//==== TEST: PackageManager_install_errorCallback_invoked
//==== LABEL Check exception in error callback of install method
//==== SPEC Tizen Web API:Application:Package:PackageManager:install M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MERRCB
setup({timeout: 30000});

var t = async_test('PackageManager_install_errorCallback_invoked', {timeout: 30000}), installProgressCallback, installError;

t.step(function () {
    installProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            assert_unreached("onprogress invoked, packageId = " + packageId + ", progress = " + progress);
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_unreached("oncomplete invoked, packageId = " + packageId);
        })
    };

    installError = t.step_func(function (error) {
        assert_equals(error.code, 8, "Incorrect error code.");
        assert_equals(error.name, "NotFoundError", "Incorrect error name.");
        assert_type(error.message, "string", "Error message is not a string");
        assert_not_equals(error.message, "", "Error message is empty");

        t.done();
    });

    tizen.package.install(NOT_EXISTING_PACKAGE_ID, installProgressCallback, installError);
});

}

function PackageManager_uninstall_errorCallback_invoked() {
//==== TEST: PackageManager_uninstall_errorCallback_invoked
//==== LABEL Check exception in error callback of uninstall method
//==== SPEC Tizen Web API:Application:Package:PackageManager:uninstall M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MERRCB
setup({timeout: 30000});

var t = async_test('PackageManager_uninstall_errorCallback_invoked', {timeout: 30000}),
    uninstallProgressCallback, uninstallError;

t.step(function () {
    uninstallProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            assert_unreached("onprogress invoked, packageId = " + packageId + ", progress = " + progress);
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_unreached("oncomplete invoked, packageId = " + packageId);
        })
    };

    uninstallError = t.step_func(function (error) {
        assert_equals(error.code, 8, "Incorrect error code.");
        assert_equals(error.name, "NotFoundError", "Incorrect error name.");
        assert_type(error.message, "string", "Error message is not a string");
        assert_not_equals(error.message, "", "Error message is empty");

        t.done();
    });

    tizen.package.uninstall(NOT_EXISTING_PACKAGE_ID, uninstallProgressCallback, uninstallError);
});

}

function PackageInformationEventCallback_oninstalled() {
//==== TEST: PackageInformationEventCallback_oninstalled
//==== LABEL Check if PackageInformationEventCallback.oninstalled works properly
//==== SPEC Tizen Web API:Application:Package:PackageInformationEventCallback:oninstalled M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is not installed.
//==== STEP Run the test
//==== EXPECT Pass.
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 90000});

var packageInformationEventCallback, installation, installError,
    t = async_test('PackageInformationEventCallback_oninstalled',  {timeout: 90000});

t.step(function () {
    packageInformationEventCallback = {
        oninstalled: t.step_func(function (packageInformation) {
            try {
                assert_equals(packageInformation.id, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "PackageInformation.id is incorrect.");
                assert_equals(packageInformation.name, TCT_PACKAGE_MANAGER_TEST_PACKAGE_NAME, "PackageInformation.name is incorrect.");

                assert_type(packageInformation.iconPath, "string", "Incorrect type for PackageInformation.iconPath attribute.");
                assert_not_equals(packageInformation.iconPath, "", "PackageInformation.iconPath is an empty string.");

                assert_equals(packageInformation.version, TCT_PACKAGE_MANAGER_TEST_PACKAGE_VERSION_1, "PackageInformation.version is incorrect.");

                assert_type(packageInformation.totalSize, "long", "Incorrect type of PackageInformation.totalSize");
                assert_type(packageInformation.dataSize, "long", "Incorrect type of PackageInformation.dataSize");
                assert_greater_than_equal(packageInformation.totalSize, packageInformation.dataSize,
                    "PackageInformation.dataSize is bigger than packageInformation.totalSize.");

                assert_true(packageInformation.lastModified instanceof Date,
                    "PackageInformation.lastModified is not a Date");
                assert_true(packageInformation.lastModified < new Date(),
                    "PackageInformation.lastModified is from present ot future.");

                assert_equals(packageInformation.author, TCT_PACKAGE_MANAGER_TEST_PACKAGE_AUTHOR, "PackageInformation.author is incorrect.");

                assert_array_equals(packageInformation.appIds, [TCT_PACKAGE_MANAGER_TEST_PACKAGE_APP_ID],
                    "packageInformation.appIds is incorrect");

                assert_equals(packageInformation.description, TCT_PACKAGE_MANAGER_TEST_PACKAGE_DESCRIPTION,
                    "PackageInformation.description is incorect.");
            } finally {
                tizen.package.unsetPackageInfoEventListener();
            }
            t.done();
        }),
        onupdated: t.step_func(function (packageInformation) {
            tizen.package.unsetPackageInfoEventListener();
            assert_unreached("onupdated invoked.");
        }),
        onuninstalled: t.step_func(function (packageId) {
            tizen.package.unsetPackageInfoEventListener();
            assert_unreached("onuninstalled invoked.");
        })
    };
    installation = {
        oncomplete : function(packageId){
            //do nothing here
        }
    };
    installError = t.step_func(function (error) {
        assert_unreached("install() error callback: name:" + error.name + ", msg:" + error.message);
    });
    tizen.package.unsetPackageInfoEventListener();
    tizen.package.setPackageInfoEventListener(packageInformationEventCallback);

    tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, installation, installError);
});

}

function PackageInformationEventCallback_onupdated() {
//==== TEST: PackageInformationEventCallback_onupdated
//==== LABEL Check if PackageInformationEventCallback.onupdated works properly
//==== SPEC Tizen Web API:Application:Package:PackageInformationEventCallback:onupdated M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is installed.
//==== STEP Run the test
//==== EXPECT Pass.
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 90000});

var packageInformationEventCallback, installation, installError,
    t = async_test('PackageInformationEventCallback_onupdated',  {timeout: 90000});

t.step(function () {
    packageInformationEventCallback = {
        oninstalled: t.step_func(function (packageInformation) {
            tizen.package.unsetPackageInfoEventListener();
            assert_unreached("oninstalled invoked.");
        }),
        onupdated: t.step_func(function (packageInformation) {
            try {
                assert_equals(packageInformation.id, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "PackageInformation.id is incorrect.");
                assert_equals(packageInformation.name, TCT_PACKAGE_MANAGER_TEST_PACKAGE_NAME, "PackageInformation.name is incorrect.");

                assert_type(packageInformation.iconPath, "string", "Incorrect type for PackageInformation.iconPath attribute.");
                assert_not_equals(packageInformation.iconPath, "", "PackageInformation.iconPath is an empty string.");

                assert_equals(packageInformation.version, TCT_PACKAGE_MANAGER_TEST_PACKAGE_VERSION_2, "PackageInformation.version is incorrect.");

                assert_type(packageInformation.totalSize, "long", "Incorrect type of PackageInformation.totalSize");
                assert_type(packageInformation.dataSize, "long", "Incorrect type of PackageInformation.dataSize");
                assert_greater_than_equal(packageInformation.totalSize, packageInformation.dataSize,
                    "PackageInformation.dataSize is bigger than packageInformation.totalSize.");

                assert_true(packageInformation.lastModified instanceof Date,
                    "PackageInformation.lastModified is not a Date");
                assert_true(packageInformation.lastModified < new Date(),
                    "PackageInformation.lastModified is from present ot future.");

                assert_equals(packageInformation.author, TCT_PACKAGE_MANAGER_TEST_PACKAGE_AUTHOR, "PackageInformation.author is incorrect.");

                assert_array_equals(packageInformation.appIds, [TCT_PACKAGE_MANAGER_TEST_PACKAGE_APP_ID],
                    "packageInformation.appIds is incorrect");

                assert_equals(packageInformation.description, TCT_PACKAGE_MANAGER_TEST_PACKAGE_DESCRIPTION,
                    "PackageInformation.description is incorect.");
            } finally {
                tizen.package.unsetPackageInfoEventListener();
            }
            t.done();
        }),
        onuninstalled: t.step_func(function (packageId) {
            tizen.package.unsetPackageInfoEventListener();
            assert_unreached("onuninstalled invoked.");
        })
    };
    installation = {
        oncomplete : function(packageId){
            //do nothing here
        }
    };
    installError = t.step_func(function (error) {
        assert_unreached("install() error callback: name:" + error.name + ", msg:" + error.message);
    });
    tizen.package.unsetPackageInfoEventListener();
    tizen.package.setPackageInfoEventListener(packageInformationEventCallback);

    tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH_2, installation, installError);
});

}

function PackageInformationEventCallback_onuninstalled() {
//==== TEST: PackageInformationEventCallback_onuninstalled
//==== LABEL Check if PackageInformationEventCallback.onuninstalled works properly
//==== SPEC Tizen Web API:Application:Package:PackageInformationEventCallback:onuninstalled M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is installed (You can install it from My files app (Phone/Others directory)).
//==== STEP Run the test and uninstall TCTPackageManagerTest1.1.1.wgt application.
//==== EXPECT Pass.
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 90000});

var packageInformationEventCallback, uninstallation, uninstallError,
    t = async_test('PackageInformationEventCallback_onuninstalled',  {timeout: 90000});

t.step(function () {
    packageInformationEventCallback = {
        oninstalled: t.step_func(function (packageInformation) {
            tizen.package.unsetPackageInfoEventListener();
            assert_unreached("oninstalled invoked.");
        }),
        onupdated: t.step_func(function (packageInformation) {
            tizen.package.unsetPackageInfoEventListener();
            assert_unreached("onupdated invoked.");
        }),
        onuninstalled: t.step_func(function (packageId) {
            try {
                assert_equals(packageId, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "PackageInformation.id is incorrect.");
            } finally {
                tizen.package.unsetPackageInfoEventListener();
            }
            t.done();
        })
    };
    uninstallation = {
        oncomplete : function(packageId){
            //do nothing here
        }
    };
    uninstallError = t.step_func(function (error) {
        assert_unreached("uninstall() error callback: name:" + error.name + ", msg:" + error.message);
    });
    tizen.package.unsetPackageInfoEventListener();
    tizen.package.setPackageInfoEventListener(packageInformationEventCallback);

    tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, uninstallation, uninstallError);
});

}

function PackageManager_install() {
//==== TEST: PackageManager_install
//==== LABEL Check install method of package
//==== SPEC Tizen Web API:Application:Package:PackageManager:install M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is NOT installed.
//==== STEP Run the test.
//==== EXPECT Pass.
//==== TEST_CRITERIA MOA MR MAST
setup({timeout: 90000});

var t = async_test('PackageManager_install', {timeout: 90000}), wasInProgress = false, installProgressCallback, installError,
    returnedValue = null, packageInformation;

t.step(function () {
    installProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            wasInProgress = true;
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_equals(returnedValue, undefined, "Incorrect returned value");

            assert_true(wasInProgress, "onprogress callback was not invoked.");
            assert_equals(packageId, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "Incorrect packageId.");

            packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID);
            assert_equals(packageInformation.id, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "Not installed.");
            t.done();
        })
    };

    installError = t.step_func(function (error) {
        assert_unreached("install() error callback: name:" + error.name + ", msg:" + error.message);
    });

    returnedValue = tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, installProgressCallback, installError);
});

}

function PackageManager_uninstall() {
//==== TEST: PackageManager_uninstall
//==== LABEL Check uninstall method of package
//==== SPEC Tizen Web API:Application:Package:PackageManager:uninstall M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is installed (You can install it from My files app (Phone/Others directory)).
//==== STEP Run the test.
//==== EXPECT Pass.
//==== TEST_CRITERIA MOA MR MAST
setup({timeout: 90000});

var t = async_test('PackageManager_uninstall', {timeout: 90000}), wasInProgress = false,
    uninstallProgressCallback, uninstallError, returnedValue = null;

t.step(function () {
    uninstallProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            wasInProgress = true;
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_equals(returnedValue, undefined, "Incorrect returned value");

            assert_true(wasInProgress, "onprogress callback was not invoked.");
            assert_equals(packageId, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "Incorrect packageId.");

            assert_throws(NOT_FOUND_EXCEPTION,
                function () {
                    tizen.package.getPackageInfo(TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID);
                }, "Package is still installed.");
            t.done();
        })
    };

    uninstallError = t.step_func(function (error) {
        assert_unreached("uninstall() error callback: name:" + error.name + ", msg:" + error.message);
    });

    returnedValue = tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, uninstallProgressCallback, uninstallError);
});

}

function PackageManager_install_without_errorCallback() {
//==== TEST: PackageManager_install_without_errorCallback
//==== LABEL Check install method without errorCallback
//==== SPEC Tizen Web API:Application:Package:PackageManager:install M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is NOT installed.
//==== STEP Run the test.
//==== EXPECT Pass.
//==== TEST_CRITERIA MMINA MR MAST
setup({timeout: 90000});

var t = async_test('PackageManager_install_without_errorCallback', {timeout: 90000}), wasInProgress = false, installProgressCallback,
    returnedValue = null, packageInformation;

t.step(function () {
    installProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            wasInProgress = true;
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_equals(returnedValue, undefined, "Incorrect returned value");

            assert_true(wasInProgress, "onprogress callback was not invoked.");
            assert_equals(packageId, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "Incorrect packageId.");

            packageInformation = tizen.package.getPackageInfo(TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID);
            assert_equals(packageInformation.id, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "Not installed.");
            t.done();
        })
    };

    returnedValue = tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, installProgressCallback);
});

}

function PackageManager_uninstall_without_errorCallback() {
//==== TEST: PackageManager_uninstall_without_errorCallback
//==== LABEL Check uninstall method without errorCallback
//==== SPEC Tizen Web API:Application:Package:PackageManager:uninstall M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is installed (You can install it from My files app (Phone/Others directory)).
//==== STEP Run the test.
//==== EXPECT Pass.
//==== TEST_CRITERIA MMINA MR MAST
setup({timeout: 90000});

var t = async_test('PackageManager_uninstall_without_errorCallback', {timeout: 90000}), wasInProgress = false,
    uninstallProgressCallback, returnedValue = null;

t.step(function () {
    uninstallProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            wasInProgress = true;
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_equals(returnedValue, undefined, "Incorrect returned value");

            assert_true(wasInProgress, "onprogress callback was not invoked.");
            assert_equals(packageId, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "Incorrect packageId.");

            assert_throws(NOT_FOUND_EXCEPTION,
                function () {
                    tizen.package.getPackageInfo(TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID);
                }, "Package is still installed.");
            t.done();
        })
    };

    returnedValue = tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, uninstallProgressCallback);
});

}

function PackageProgressCallback_onprogress_install() {
//==== TEST: PackageProgressCallback_onprogress_install
//==== LABEL Check if PackageProgressCallback.onprogress - install
//==== SPEC Tizen Web API:Application:Package:PackageProgressCallback:onprogress M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is NOT installed.
//==== STEP Run the test.
//==== EXPECT Pass.
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 90000});

var t = async_test('PackageProgressCallback_onprogress_install', {timeout: 90000}), wasInProgress = false,
    installProgressCallback, installError;

t.step(function () {
    installProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            wasInProgress = true;
            assert_equals(packageId, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "Incorrect packageId.");
            assert_type(progress, "short" , "Incorrect type for progress.");
            assert_greater_than_equal(progress, 0, "Progress is less than zero.");
            assert_less_than_equal(progress, 100, "Progress is greater than 100.");
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_true(wasInProgress, "onprogress callback was not invoked.");
            t.done();
        })
    };

    installError = t.step_func(function (error) {
        assert_unreached("install() error callback: name:" + error.name + ", msg:" + error.message);
    });

    tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, installProgressCallback, installError);
});

}

function PackageProgressCallback_onprogress_uninstall() {
//==== TEST: PackageProgressCallback_onprogress_uninstall
//==== LABEL Check if PackageProgressCallback.onprogress - uninstall
//==== SPEC Tizen Web API:Application:Package:PackageProgressCallback:onprogress M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is installed (You can install it from My files app (Phone/Others directory)).
//==== STEP Run the test.
//==== EXPECT Pass.
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 90000});

var t = async_test('PackageProgressCallback_onprogress_uninstall', {timeout: 90000}), wasInProgress = false,
    uninstallProgressCallback, uninstallError;

t.step(function () {
    uninstallProgressCallback = {
        onprogress: t.step_func(function (packageId, progress) {
            wasInProgress = true;
            assert_equals(packageId, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "Incorrect packageId.");
            assert_type(progress, "short" , "Incorrect type for progress.");
            assert_greater_than_equal(progress, 0, "Progress is less than zero.");
            assert_less_than_equal(progress, 100, "Progress is greater than 100.");
        }),
        oncomplete: t.step_func(function (packageId) {
            assert_true(wasInProgress, "onprogress callback was not invoked.");
            t.done();
        })
    };

    uninstallError = t.step_func(function (error) {
        assert_unreached("uninstall() error callback: name:" + error.name + ", msg:" + error.message);
    });

    tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, uninstallProgressCallback, uninstallError);
});

}

function PackageProgressCallback_oncomplete_install() {
//==== TEST: PackageProgressCallback_oncomplete_install
//==== LABEL Check if PackageProgressCallback.oncomplete - install
//==== SPEC Tizen Web API:Application:Package:PackageProgressCallback:oncomplete M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is NOT installed.
//==== STEP Run the test.
//==== EXPECT Pass.
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 90000});

var t = async_test('PackageProgressCallback_oncomplete_install', {timeout: 90000}), installProgressCallback, installError;

t.step(function () {
    installProgressCallback = {
        oncomplete: t.step_func(function (packageId) {
            assert_equals(packageId, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "Incorrect packageId.");
            t.done();
        })
    };

    installError = t.step_func(function (error) {
        assert_unreached("install() error callback: name:" + error.name + ", msg:" + error.message);
    });

    tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, installProgressCallback, installError);
});

}

function PackageProgressCallback_oncomplete_uninstall() {
//==== TEST: PackageProgressCallback_oncomplete_uninstall
//==== LABEL Check if PackageProgressCallback.oncomplete - uninstall
//==== SPEC Tizen Web API:Application:Package:PackageProgressCallback:oncomplete M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is installed (You can install it from My files app (Phone/Others directory)).
//==== STEP Run the test.
//==== EXPECT Pass.
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 90000});

var t = async_test('PackageProgressCallback_oncomplete_uninstall', {timeout: 90000}),
    uninstallProgressCallback, uninstallError;

t.step(function () {
    uninstallProgressCallback = {
        oncomplete: t.step_func(function (packageId) {
            assert_equals(packageId, TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, "Incorrect packageId.");
            t.done();
        })
    };

    uninstallError = t.step_func(function (error) {
        assert_unreached("uninstall() error callback: name:" + error.name + ", msg:" + error.message);
    });

    tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, uninstallProgressCallback, uninstallError);
});

}

function PackageManager_unsetPackageInfoEventListener() {
//==== TEST: PackageManager_unsetPackageInfoEventListener
//==== LABEL Check if method unsetPackageInfoEventListener works correctly
//==== SPEC Tizen Web API:Application:Package:PackageManager:unsetPackageInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/package.html
//==== EXECUTION_TYPE manual
//==== PRE Make sure that TCTPackageManagerTest1.1.1.wgt application is not installed.
//==== STEP Run the test.
//==== EXPECT Pass.
//==== TEST_CRITERIA MNA MNAST MR
setup({timeout: 90000});

var packageInformationEventCallback, uninstallation, installation, installError, uninstallError, returnedValue = null,
     t = async_test('PackageManager_unsetPackageInfoEventListener',  {timeout: 90000});

t.step(function () {
    add_result_callback(function () {
        try {
            tizen.package.uninstall(TCT_PACKAGE_MANAGER_TEST_PACKAGE_ID, uninstallation, uninstallError);
        } catch (err) {
            // do nothing in case stop throw an exception
        }
    });

    packageInformationEventCallback = {
        oninstalled: t.step_func(function (packageInformation) {
            assert_unreached("oninstalled invoked.");
        }),
        onupdated: t.step_func(function (packageInformation) {
            assert_unreached("onupdated invoked.");
        }),
        onuninstalled: t.step_func(function (packageId) {
            assert_unreached("onuninstalled invoked.");
        })
    };
    uninstallation = {
        oncomplete : t.step_func(function (packageId){
            //do nothing here
        })
    };
    installation = {
        oncomplete : t.step_func(function (packageId){
            t.done();
        })
    };
    installError = t.step_func(function (error) {
        assert_unreached("install() error callback: name:" + error.name + ", msg:" + error.message);
    });
    uninstallError = t.step_func(function (error) {
        assert_unreached("uninstall() error callback: name:" + error.name + ", msg:" + error.message);
    });
    tizen.package.setPackageInfoEventListener(packageInformationEventCallback);
    returnedValue = tizen.package.unsetPackageInfoEventListener();
    assert_equals(returnedValue, undefined, "Incorrect returned value from unsetPackageInfoEventListener method");

    tizen.package.install(TCT_PACKAGE_MANAGER_TEST_PACKAGE_PATH, installation, installError);
});

}

var moduleName = "tct-package-tizen-tests";
add_test_case(moduleName, PackageInformationArraySuccessCallback_notexist);
add_test_case(moduleName, PackageInformationArraySuccessCallback_onsuccess);
add_test_case(moduleName, PackageInformationEventCallback_notexist);
add_test_case(moduleName, PackageInformation_appIds_attribute);
add_test_case(moduleName, PackageInformation_author_attribute);
add_test_case(moduleName, PackageInformation_dataSize_attribute);
add_test_case(moduleName, PackageInformation_description_attribute);
add_test_case(moduleName, PackageInformation_extend);
add_test_case(moduleName, PackageInformation_iconPath_attribute);
add_test_case(moduleName, PackageInformation_id_attribute);
add_test_case(moduleName, PackageInformation_lastModified_attribute);
add_test_case(moduleName, PackageInformation_name_attribute);
add_test_case(moduleName, PackageInformation_notexist);
add_test_case(moduleName, PackageInformation_totalSize_attribute);
add_test_case(moduleName, PackageInformation_version_attribute);
add_test_case(moduleName, PackageManagerObject_notexist);
add_test_case(moduleName, PackageManager_extend);
add_test_case(moduleName, PackageManager_getPackageInfo);
add_test_case(moduleName, PackageManager_getPackageInfo_exist);
add_test_case(moduleName, PackageManager_getPackageInfo_with_id);
add_test_case(moduleName, PackageManager_getPackagesInfo);
add_test_case(moduleName, PackageManager_getPackagesInfo_errorCallback_TypeMismatch);
add_test_case(moduleName, PackageManager_getPackagesInfo_errorCallback_invalid_cb);
add_test_case(moduleName, PackageManager_getPackagesInfo_exist);
add_test_case(moduleName, PackageManager_getPackagesInfo_missarg);
add_test_case(moduleName, PackageManager_getPackagesInfo_successCallback_TypeMismatch);
add_test_case(moduleName, PackageManager_getPackagesInfo_successCallback_invalid_cb);
add_test_case(moduleName, PackageManager_getPackagesInfo_with_errorCallback);
add_test_case(moduleName, PackageManager_in_tizen);
add_test_case(moduleName, PackageManager_install_exist);
add_test_case(moduleName, PackageManager_notexist);
add_test_case(moduleName, PackageManager_setPackageInfoEventListener_exist);
add_test_case(moduleName, PackageManager_uninstall_exist);
add_test_case(moduleName, PackageManager_unsetPackageInfoEventListener_exist);
add_test_case(moduleName, PackageManager_unsetPackageInfoEventListener_extra_argument);
add_test_case(moduleName, PackageManager_setPackageInfoEventListener_eventCallback_TypeMismatch);
add_test_case(moduleName, PackageManager_setPackageInfoEventListener_eventCallback_invalid_cb);
add_test_case(moduleName, PackageManager_setPackageInfoEventListener_misarg);
add_test_case(moduleName, PackageProgressCallback_notexist);
add_test_case(moduleName, PackageManager_setPackageInfoEventListener);
add_test_case(moduleName, PackageManager_install_missarg);
add_test_case(moduleName, PackageManager_uninstall_missarg);
add_test_case(moduleName, PackageManager_install_errorCallback_TypeMismatch);
add_test_case(moduleName, PackageManager_install_errorCallback_invalid_cb);
add_test_case(moduleName, PackageManager_install_progressCallback_TypeMismatch);
add_test_case(moduleName, PackageManager_install_progressCallback_invalid_cb);
add_test_case(moduleName, PackageManager_uninstall_errorCallback_TypeMismatch);
add_test_case(moduleName, PackageManager_uninstall_errorCallback_invalid_cb);
add_test_case(moduleName, PackageManager_uninstall_progressCallback_TypeMismatch);
add_test_case(moduleName, PackageManager_uninstall_progressCallback_invalid_cb);
add_test_case(moduleName, PackageManager_install_errorCallback_invoked);
add_test_case(moduleName, PackageManager_uninstall_errorCallback_invoked);
add_test_case(moduleName, PackageInformationEventCallback_oninstalled);
add_test_case(moduleName, PackageInformationEventCallback_onupdated);
add_test_case(moduleName, PackageInformationEventCallback_onuninstalled);
add_test_case(moduleName, PackageManager_install);
add_test_case(moduleName, PackageManager_uninstall);
add_test_case(moduleName, PackageManager_install_without_errorCallback);
add_test_case(moduleName, PackageManager_uninstall_without_errorCallback);
add_test_case(moduleName, PackageProgressCallback_onprogress_install);
add_test_case(moduleName, PackageProgressCallback_onprogress_uninstall);
add_test_case(moduleName, PackageProgressCallback_oncomplete_install);
add_test_case(moduleName, PackageProgressCallback_oncomplete_uninstall);
add_test_case(moduleName, PackageManager_unsetPackageInfoEventListener);
