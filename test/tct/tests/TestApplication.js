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
        Krzysztof Lachacz <k.lachacz@samsung.com>
        Mariusz Polasinski <m.polasinski@samsung.com>
        Junghyuk Park <junghyuk.park@samsung.com>

*/

var alert = console.log;

var METADATA_KEY = "meta-key";
var METADATA_VALUE = "meta-value";
var TCT_APPCONTROL_APPID_METADATA = {
    testKey1: "testValue1",
    testKey2: "testValue2"
}

var THIS_APP_ID = "tizenutc00.UnitTest";
var INVALID_APP_ID = "api1appli0.WebAPITizenApplicationTestsInvalid";
var APP_INFO_TEST_APP_ID = "api1appli3.TCTAppInfoEventTest";

var TCT_APPCONTROL_APPID = "api1appli1.TCTAppControl";
var TCT_APPCONTROL_MOCK_APPID = "api1appli2.TCTAppControlMock";

var TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION = "http://tizen.org/appcontrol/operation/tct/launch";
var TCT_APPCONTROL_LAUNCH_APPCONTROL_URI = "tct://launch_appcontrol.html";
var TCT_APPCONTROL_LAUNCH_APPCONTROL_MIME = "text/html";
var TCT_APPCONTROL_LAUNCH_APPCONTROL_MIME_INVALID = "invalid/invalid";

var TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_OPERATION = "http://tizen.org/appcontrol/operation/tct/launch/explicit";
var TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_URI = "tct://launch_appcontrol.html";
var TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_MIME = "text/html";

var TCT_APPCONTROL_REPLY_RESULT_OPERATION = "http://tizen.org/appcontrol/operation/tct/reply_result";
var TCT_APPCONTROL_REPLY_RESULT_WITH_DATA_OPERATION = "http://tizen.org/appcontrol/operation/tct/reply_result/data";
var TCT_APPCONTROL_REPLY_FAILURE_OPERATION = "http://tizen.org/appcontrol/operation/tct/reply_failure";

var TCT_APPCONTROL_RUN_TEST_OPERATION = "http://tizen.org/appcontrol/operation/tct/run_test";
var TCT_APPCONTROL_RUN_TEST_URI_PREFIX = "tct://";
var TCT_APPCONTROL_RUN_TEST_MIME = "application/javascript";

var TCT_APPCONTROL_EXIT_OPERATION = "http://tizen.org/appcontrol/operation/tct/exit";

var TYPE_MISMATCH_ERR = {name: 'TypeMismatchError'};

var TIMEOUT_AUTO_TEST = 30000;
setup({timeout: TIMEOUT_AUTO_TEST});

/**
 * Function runs test in other application (TCTAppControl) and receives
 * the results.
 *
 * @param testName name of the test
 */
function runTestAtTCTAppControl(testName) {
    var t = async_test(testName, { timeout: TIMEOUT_AUTO_TEST }),
    appControl, onreply, onerror, data;

    setup_launch(t, TCT_APPCONTROL_APPID, function () {
        appControl = new tizen.ApplicationControl(
                        TCT_APPCONTROL_RUN_TEST_OPERATION,
                        TCT_APPCONTROL_RUN_TEST_URI_PREFIX+testName,
                        TCT_APPCONTROL_RUN_TEST_MIME);

        onreply = {
            onsuccess: t.step_func(function (dataArray) {
                assert_true(dataArray.length == 2, "Unexpected dataArray");

                for (data in dataArray) {
                    if (dataArray[data].key === "status") {
                        t.status = parseInt(dataArray[data].value[0]);
                    } else if (dataArray[data].key === "message") {
                        t.message = dataArray[data].value[0];
                    } else {
                        assert_unreached("Unexpected key in data");
                        return;
                    }
                }

                t.done();
            }),
            onfailure: t.step_func(function () {
                assert_unreached("Unexpected onfailure");
            })
        };

        onerror = t.step_func(function (error) {
            assert_unreached("launchAppControl failure: " + error.message);
        });

        tizen.application.launchAppControl(appControl, null, null, onerror, onreply);
    });
}

function setup_launch(t, appId, onready) {
    t.step(function() {
        onready = t.step_func(onready);
      
        tizen.application.getAppsContext(
            t.step_func(function (contexts) {
                for (var i in contexts) {
                    if (contexts[i].appId === appId) {
                        tizen.application.kill(contexts[i].id, onready, onready);
                        return;
                    }
                }
                onready();
            }),
            t.step_func(function (error) {
                assert_unreached("setup_launch fails: " + error.name + " with message: " + error.message);
            })
        );  
    });
}

function assert_launch(t, appId, onsuccess) {
    var intervalId = setInterval(t.step_func(function() {
        tizen.application.getAppsContext(
            t.step_func(function (contexts) {
                for (var i in contexts) {
                    if (contexts[i].appId === appId) {
                        clearInterval(intervalId);
                        t.step_func(onsuccess)(contexts[i]);
                        return;
                    }
                }
            }),
            t.step_func(function (error) {
                assert_unreached("assert_launch fails: " + error.name + " with message: " + error.message);
            })
        );
    }), 1000);
}

function assert_not_launch(t, appId, onsuccess) {
    tizen.application.getAppsContext(
        t.step_func(function (contexts) {
            for (var i in contexts) {
                if (contexts[i].appId === appId) {
                    assert_unreached("assert_not_launch fails: "+appId+" has launched");
                    return;
                }
            }
            t.step_func(onsuccess)();
        }),
        t.step_func(function (error) {
            assert_unreached("assert_not_launch fails: " + error.name + " with message: " + error.message);
        })
    );
}

function assert_kill(t, appId, onsuccess) {
    var intervalId = setInterval(t.step_func(function() {
        tizen.application.getAppsContext(
            t.step_func(function (contexts) {
                for (var i in contexts) {
                    if (contexts[i].appId === appId) {
                        return;
                    }
                }
                clearInterval(intervalId);
                t.step_func(onsuccess)();
            }),
            t.step_func(function (error) {
                assert_unreached("assert_kill fails: " + error.name + " with message: " + error.message);
            })
        );
    }), 1000);
}

function assert_not_kill(t, appId, onsuccess) {
    tizen.application.getAppsContext(
        t.step_func(function (contexts) {
            for (var i in contexts) {
                if (contexts[i].appId === appId) {
                    t.step_func(onsuccess)();
                    return;
                }
            }
            assert_unreached("assert_not_kill fails: " + appId + " is not found");
        }),
        t.step_func(function (error) {
            assert_unreached("assert_not_kill fails: " + error.name + " with message: " + error.message);
        })
    );
}

function assert_exit(t, appId, onsuccess) {
    assert_kill(t, appId, onsuccess);
}

function ApplicationCertificate_extend() {

//==== TEST: ApplicationCertificate_extend
//==== LABEL Check if ApplicationCertificate possible extend
//==== SPEC Tizen Web API:Application:Application:ApplicationCertificate:ApplicationCertificate U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX

test(function () {
    var appCertificateArray = tizen.application.getAppCerts();
    check_extensibility(appCertificateArray[0]);
}, 'ApplicationCertificate_extend');

}

function ApplicationCertificate_notexist() {

//==== TEST: ApplicationCertificate_notexist
//==== LABEL Check if ApplicationCertificate notexist
//==== SPEC Tizen Web API:Application:Application:ApplicationCertificate:ApplicationCertificate U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("ApplicationCertificate");
}, 'ApplicationCertificate_notexist');

}

function ApplicationCertificate_type_attribute() {

//==== TEST: ApplicationCertificate_type_attribute
//==== LABEL Check attribute ApplicationCertificate::type existence and type
//==== SPEC Tizen Web API:Application:Application:ApplicationCertificate:type A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO

test(function () {
    var i, appCertificateArray = tizen.application.getAppCerts();
    for (i = 0; i < appCertificateArray.length; i++) {
        assert_true("type" in appCertificateArray[i], "type doesn't exist in provided object.");
        check_readonly(appCertificateArray[i], "type", appCertificateArray[i].type, "string", "dummyValue");
    }
}, 'ApplicationCertificate_type_attribute');

}

function ApplicationCertificate_value_attribute() {

//==== TEST: ApplicationCertificate_value_attribute
//==== LABEL Check attribute ApplicationCertificate::value existence and type
//==== SPEC Tizen Web API:Application:Application:ApplicationCertificate:value A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO

test(function () {
    var i, appCertificateArray = tizen.application.getAppCerts();
    for (i = 0; i < appCertificateArray.length; i++) {
        assert_true("value" in appCertificateArray[i], "value doesn't exist in provided object.");
        check_readonly(appCertificateArray[i], "value", appCertificateArray[i].value, "string", "dummyValue");
    }
}, 'ApplicationCertificate_value_attribute');

}

function ApplicationContextArraySuccessCallback_notexist() {

//==== TEST: ApplicationContextArraySuccessCallback_notexist
//==== LABEL Check if ApplicationContextArraySuccessCallback cannot be called as a function or in new expression
//==== SPEC Tizen Web API:Application:Application:ApplicationContextArraySuccessCallback:ApplicationContextArraySuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA CBNIO

test(function () {
    check_no_interface_object("ApplicationContextArraySuccessCallback");
}, 'ApplicationContextArraySuccessCallback_notexist');

}

function ApplicationContextArraySuccessCallback_onsuccess() {

//==== TEST: ApplicationContextArraySuccessCallback_onsuccess
//==== LABEL Check if ApplicationContextArraySuccessCallback onsuccess is called and if its arguments have proper type
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Application:Application:ApplicationContextArraySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA CBOA CBT

setup({timeout: 30000});

var t = async_test('ApplicationContextArraySuccessCallback_onsuccess', {timeout: 30000}),
    getSuccess, getError, context;

t.step(function () {
    getSuccess = t.step_func(function (contexts) {
        assert_type(contexts, "array", "wrong type of invoked callback argument");
        assert_true(contexts.length > 0, "contexts was not found");

        context = contexts[0];
        assert_true("id" in context, "context should have id property");
        check_readonly(context, "id", context.id, "string", "dummy");
        assert_true("appId" in context, "context should have appId property");
        check_readonly(context, "appId", context.appId, "string", "dummy");

        t.done();
    });

    getError = t.step_func(function (error) {
        assert_unreached("getAppsContext() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.application.getAppsContext(getSuccess, getError);
});

}

function ApplicationContext_appId_attribute() {

//==== TEST: ApplicationContext_appId_attribute
//==== LABEL Check attribute ApplicationContext::appId existence and type
//==== SPEC Tizen Web API:Application:Application:ApplicationContext:appId A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO

test(function () {
    var appContext = tizen.application.getAppContext(null);
    assert_true("appId" in appContext, "id doesn't exist in provided object.");
    check_readonly(appContext, "appId", appContext.appId, "string", 1);
}, 'ApplicationContext_appId_attribute');

}

function ApplicationContext_extend() {

//==== TEST: ApplicationContext_extend
//==== LABEL Check if ApplicationContext possible extend
//==== SPEC Tizen Web API:Application:Application:ApplicationContext:ApplicationContext U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX

test(function () {
    var appContext = tizen.application.getAppContext(null);
    check_extensibility(appContext);
}, 'ApplicationContext_extend');

}

function ApplicationContext_id_attribute() {

//==== TEST: ApplicationContext_id_attribute
//==== LABEL Check attribute ApplicationContext::id existence and type
//==== SPEC Tizen Web API:Application:Application:ApplicationContext:id A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO

test(function () {
    var appContext = tizen.application.getAppContext(null);
    assert_true("id" in appContext, "id doesn't exist in provided object.");
    check_readonly(appContext, "id", appContext.id, "string", 1);
}, 'ApplicationContext_id_attribute');

}

function ApplicationContext_notexist() {

//==== TEST: ApplicationContext_notexist
//==== LABEL Check if ApplicationContext notexist
//==== SPEC Tizen Web API:Application:Application:ApplicationContext:ApplicationContext U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("ApplicationContext");
}, 'ApplicationContext_notexist');

}

function ApplicationControlDataArrayReplyCallback_notexist() {

//==== TEST: ApplicationControlDataArrayReplyCallback_notexist
//==== LABEL Check if ApplicationControlDataArrayReplyCallback notexist
//==== SPEC Tizen Web API:Application:Application:ApplicationControlDataArrayReplyCallback:ApplicationControlDataArrayReplyCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA CBNIO

test(function () {
    check_no_interface_object("ApplicationControlDataArrayReplyCallback");
}, 'ApplicationControlDataArrayReplyCallback_notexist');

}

function ApplicationControlDataArrayReplyCallback_onfailure() {

//==== TEST: ApplicationControlDataArrayReplyCallback_onfailure
//==== LABEL Check onfailure listener in ApplicationControlDataArrayReplyCallback
//==== SPEC Tizen Web API:Application:Application:ApplicationControlDataArrayReplyCallback:onfailure M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA CBOA
setup({timeout: 30000});

var t = async_test('ApplicationControlDataArrayReplyCallback_onfailure', {timeout: 30000}),
    launchError, appControl, replyCB;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchError = t.step_func(function (error) {
        assert_unreached("launchAppControl() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    appControl = new tizen.ApplicationControl(TCT_APPCONTROL_REPLY_FAILURE_OPERATION);

    replyCB = {
        onsuccess: t.step_func(function () {
            assert_unreached("onsuccess callback called");
        }),
        onfailure: t.step_func(function () {
            t.done();
        })
    };

    tizen.application.launchAppControl(appControl, null, null, launchError, replyCB);
});

}

function ApplicationControlDataArrayReplyCallback_onsuccess() {

//==== TEST: ApplicationControlDataArrayReplyCallback_onsuccess
//==== LABEL Check argument passed into method who is onsuccess listener in ApplicationControlDataArrayReplyCallback
//==== SPEC Tizen Web API:Application:Application:ApplicationControlDataArrayReplyCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA CBT CBOA

setup({timeout: 30000});

var t = async_test('ApplicationControlDataArrayReplyCallback_onsuccess', {timeout: 30000}),
    launchError, dataSent, appControl, replyCB;

function create_appcontrol_data(size) {
    var dataArray = [], valueArray, key, value;

    for (key=1; key <= size; key++) {
        valueArray = [];
        for (value=1; value <= key; value++) {
            valueArray.push(value.toString());
        }
        dataArray.push(new tizen.ApplicationControlData(key.toString(), valueArray));
    }

    return dataArray;
}

function assert_appcontrol_data(t, dataReceived, dataExpected) {
    t.step(function () {
        var key, value, data, valueArray, sum, sumExpected;

        assert_type(dataReceived, "array", "wrong type of argument");
        assert_equals(dataReceived.length, dataExpected.length, "wrong length of data array");

        for (key = 0; key < dataReceived.length; key++) {
            data = dataReceived[key];
            valueArray = data.value;

            assert_true(data instanceof tizen.ApplicationControlData, "wrong type of array element");
            assert_equals(valueArray.length, parseInt(data.key, 10), "wrong length of value array");

            sum = 0;
            sumExpected = 0;

            for (value=0; value < valueArray.length; value++) {
                sumExpected = sumExpected + value + 1;
                sum += parseInt(valueArray[value], 10);
            }

            assert_equals(sum, sumExpected, "unexpected value array");
        }
    });
}


setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchError = t.step_func(function (error) {
        assert_unreached("launchAppControl() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    dataSent = create_appcontrol_data(8);

    appControl = new tizen.ApplicationControl(
                    TCT_APPCONTROL_REPLY_RESULT_WITH_DATA_OPERATION,
                    null, null, null, dataSent);

    replyCB = {
        onsuccess: t.step_func(function (dataReceived) {
            assert_appcontrol_data(t, dataReceived, dataSent);
            t.done();
        }),
        onfailure: t.step_func(function () {
            assert_unreached("onfailure callback called");
        })
    };

    tizen.application.launchAppControl(appControl, null, null, launchError, replyCB);
});

}

function ApplicationControlData_constructor() {

//==== TEST: ApplicationControlData_constructor
//==== LABEL Check if ApplicationControlData constructor works
//==== SPEC: Tizen Web API:Application:Application:ApplicationControlData:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRM CONSTRA

test(function () {
    var key = "image", value = ["photo.jpg"], appControlData;
    appControlData = new tizen.ApplicationControlData(key, value);
    assert_equals(appControlData.key, key, "key is different");
    assert_equals(appControlData.value.length, value.length, "value is different");
    assert_equals(appControlData.value[0], value[0], "value is different");
}, 'ApplicationControlData_constructor');

}

function ApplicationControlData_exist() {

//==== TEST: ApplicationControlData_exist
//==== LABEL Check if ApplicationControlData exist and is a constructor
//==== SPEC: Tizen Web API:Application:Application:ApplicationControlData:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRF

test(function () {
    check_constructor("ApplicationControlData");
}, 'ApplicationControlData_exist');

}

function ApplicationControlData_extend() {

//==== TEST: ApplicationControlData_extend
//==== LABEL Check if ApplicationControlData can have new properties added
//==== SPEC: Tizen Web API:Application:Application:ApplicationControlData:ApplicationControlData U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX

test(function () {
    var key = "image", value = ["photo.jpg"], appControlData;
    appControlData = new tizen.ApplicationControlData(key, value);
    check_extensibility(appControlData);
}, 'ApplicationControlData_extend');

}

function ApplicationControlData_key_attribute() {

//==== TEST: ApplicationControlData_key_attribute
//==== LABEL Check if ApplicationControlData have key attribute with proper type, writable, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationControlData:key A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ASG AN

test(function () {
    var key = "image", newKey = "photo", value = ["photo.jpg"], appControlData;
    appControlData = new tizen.ApplicationControlData(key, value);

    assert_true("key" in appControlData, "ApplicationControlData should have key attribute");
    check_attribute(appControlData, "key", appControlData.key, "string", "dummy");
    appControlData.key = null;
    assert_not_equals(appControlData.key, null, "can assign a null value");
    appControlData.key = newKey;
    assert_equals(appControlData.key, newKey, "can not assign a valid value");

}, 'ApplicationControlData_key_attribute');

}

function ApplicationControlData_value_attribute() {

//==== TEST: ApplicationControlData_value_attribute
//==== LABEL Check if ApplicationControlData have value attribute with proper type, writable, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationControlData:value A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT AN ASG

test(function () {
    var key = "image", value = ["photo.jpg"], appControlData, tmp;
    appControlData = new tizen.ApplicationControlData(key, value);

    assert_true("value" in appControlData, "ApplicationControlData should have value attribute");
    assert_type(appControlData.value, "array", "value should be an array");
    tmp = appControlData.value;
    appControlData.value = null;
    assert_equals(appControlData.value.length, tmp.length, "value is nullable");
    appControlData.value = ["one", "two"];
    assert_not_equals(appControlData.value.length, tmp.length, "value is readonly");

}, 'ApplicationControlData_value_attribute');

}

function ApplicationControl_category_attribute() {

//==== TEST: ApplicationControl_category_attribute
//==== LABEL Check attribute ApplicationControl::category existence and type
//==== SPEC Tizen Web API:Application:Application:ApplicationControl:category A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ASG

test(function () {
    var appControl1, appControl2, operation = "http://tizen.org/appcontrol/operation/share",
        uri = "share.html", mime = "image/*", category = "dummyValue", newCategory = "dummyValue2";
    appControl1 = new tizen.ApplicationControl(operation);
    assert_true("category" in appControl1, "category doesn't exist in provided object.");
    assert_type(appControl1.category, "null", "default value should be null");
    appControl2 = new tizen.ApplicationControl(operation, uri, mime, category);
    assert_type(appControl2.category, "string", "type of category is different");
    assert_equals(appControl2.category, category, "category passed as constructor parameter is different than category in the object");
    appControl2.category = newCategory;
    assert_equals(appControl2.category, newCategory, "category can not be assigned a valid value");
}, 'ApplicationControl_category_attribute');

}

function ApplicationControl_constructor() {

//==== TEST: ApplicationControl_constructor
//==== LABEL Test whether constructor with all arguments are supported
//==== SPEC Tizen Web API:Application:Application:ApplicationControl:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRM CONSTRA

test(function () {
    var appControl, operation = "http://tizen.org/appcontrol/operation/share",
        uri = "share.html", mime = "image/*", category = "dummyValue", i,
        data = [new tizen.ApplicationControlData("images", ["imagedata1", "imagedata2"])];

    appControl = new tizen.ApplicationControl(operation, uri, mime, category, data);
    assert_true(appControl instanceof tizen.ApplicationControl, "object was not created properly");
    assert_equals(appControl.operation, operation,
        "the operation argument passed as constructor parameter is different than the operation attribute in the object");
    assert_equals(appControl.uri, uri, "the uri argument passed as constructor parameter is different than the uri attribute in the object");
    assert_equals(appControl.mime, mime, "the mime argument passed as constructor parameter is different than the mime attribute in the object");
    assert_equals(appControl.category, category,
        "the category argument passed as constructor parameter is different than the category attribute in the object");

    for (i = 0; i < data[0].value.length; i++) {
        assert_equals(appControl.data[0].value[i], data[0].value[i], "data passed as constructor parameter is different than data in the object");
    }
}, 'ApplicationControl_constructor');

}

function ApplicationControl_constructor_minargs() {

//==== TEST: ApplicationControl_constructor_minargs
//==== LABEL Test whether constructor with non-optional argument are supported
//==== SPEC Tizen Web API:Application:Application:ApplicationControl:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRM CONSTRA

test(function () {
    var appControl, operation = "http://tizen.org/appcontrol/operation/share";

    appControl = new tizen.ApplicationControl(operation);
    assert_true(appControl instanceof tizen.ApplicationControl, "object was not created properly");
    assert_equals(appControl.operation, operation,
        "the operation argument passed as constructor parameter is different than the operation attribute in the object");

}, 'ApplicationControl_constructor_minargs');

}

function ApplicationControl_data_attribute() {

//==== TEST: ApplicationControl_data_attribute
//==== LABEL Check attribute ApplicationControl::data existence and type
//==== SPEC Tizen Web API:Application:Application:ApplicationControl:data A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT AN ASG

test(function () {
    var i, tmp, appControl1, appControl2, operation = "http://tizen.org/appcontrol/operation/share",
        uri = "share.html", mime = "image/*", category = "dummyValue",
        data = [new tizen.ApplicationControlData("images", ["imagedata1", "imagedata2"])],
        newData = [new tizen.ApplicationControlData("images", ["imagedata3", "imagedata4"])];

    appControl1 = new tizen.ApplicationControl(operation);
    assert_true("data" in appControl1, "data doesn't exist in provided object.");
    assert_array_equals(appControl1.data, [], "default value should be an empty array");
    appControl2 = new tizen.ApplicationControl(operation, uri, mime, category, data);
    assert_type(appControl2.data, "array", "type of data is different");
    for (i = 0; i < appControl2.data[0].length; i++) {
        assert_equals(appControl2.data[0].value[i], data[0].value[i], "data passed as constructor parameter is different than data in the object");
    }
    tmp = appControl2.data;
    appControl2.data = null;
    assert_not_equals(appControl2.data, null, "operation accept null");
    appControl2.data = newData;
    for (i = 0; i < appControl2.data[0].length; i++) {
        assert_equals(appControl2.data[0].value[i], newData[0].value[i], "data can not be assigned a valid value");
    }
}, 'ApplicationControl_data_attribute');

}

function ApplicationControl_exist() {

//==== TEST: ApplicationControl_exist
//==== LABEL Check if ApplicationControl exist
//==== SPEC Tizen Web API:Application:Application:ApplicationControl:constructor C
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA CONSTRF

test(function () {
    check_constructor("ApplicationControl");
}, 'ApplicationControl_exist');

}

function ApplicationControl_extend() {

//==== TEST: ApplicationControl_extend
//==== LABEL Check if ApplicationControl possible extend
//==== SPEC Tizen Web API:Application:Application:ApplicationControl:ApplicationControl U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX

test(function () {
    var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/share");
    check_extensibility(appControl);
}, 'ApplicationControl_extend');

}

function ApplicationControl_mime_attribute() {

//==== TEST: ApplicationControl_mime_attribute
//==== LABEL Check attribute ApplicationControl::mime existence and type
//==== SPEC Tizen Web API:Application:Application:ApplicationControl:mime A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ASG

test(function () {
    var appControl1, appControl2, operation = "http://tizen.org/appcontrol/operation/share",
        uri = "share.html", mime = "image/*", newMime = "text/*";
    appControl1 = new tizen.ApplicationControl(operation);
    assert_true("mime" in appControl1, "mime doesn't exist in provided object.");
    appControl2 = new tizen.ApplicationControl(operation, uri, mime);
    assert_type(appControl2.mime, "string", "type of mime is different");
    assert_equals(appControl2.mime, mime, "mime passed as constructor parameter is different than mime in the object");
    appControl2.mime = newMime;
    assert_equals(appControl2.mime, newMime, "mime can not be assigned a valid value");
}, 'ApplicationControl_mime_attribute');

}

function ApplicationControl_operation_attribute() {

//==== TEST: ApplicationControl_operation_attribute
//==== LABEL Check attribute ApplicationControl::operation existence and type
//==== SPEC Tizen Web API:Application:Application:ApplicationControl:operation A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ASG AN
test(function () {
    var appControl, operation = "http://tizen.org/appcontrol/operation/share", operationNewValue = "http://tizen.org/appcontrol/operation";
    appControl = new tizen.ApplicationControl(operation);
    assert_true("operation" in appControl, "operation doesn't exist in provided object.");
    assert_type(appControl.operation, "string", "type of operation is different");
    assert_equals(appControl.operation, operation, "operation passed as constructor parameter is different than operation in the object");
    appControl.operation = null;
    assert_not_equals(appControl.operation, null, "can assign a null value");
    appControl.operation = operationNewValue;
    assert_equals(appControl.operation, operationNewValue, "can not assign a valid value");
}, 'ApplicationControl_operation_attribute');

}

function ApplicationControl_uri_attribute() {

//==== TEST: ApplicationControl_uri_attribute
//==== LABEL Check attribute ApplicationControl::uri existence and type
//==== SPEC Tizen Web API:Application:Application:ApplicationControl:uri A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ASG
test(function () {
    var appControl1, appControl2, operation = "http://tizen.org/appcontrol/operation/share",
        uri = "share.html", newUri = "share2.html";
    appControl1 = new tizen.ApplicationControl(operation);
    assert_true("uri" in appControl1, "uri doesn't exist in provided object.");
    appControl2 = new tizen.ApplicationControl(operation, uri);
    assert_type(appControl2.uri, "string", "type of uri is different");
    assert_equals(appControl2.uri, uri, "uri passed as constructor parameter is different than uri in the object");
    appControl2.uri = newUri;
    assert_equals(appControl2.uri, newUri, "uri can not be assigned a valid value");
}, 'ApplicationControl_uri_attribute');

}

function ApplicationInformationArraySuccessCallback_notexist() {

//==== TEST: ApplicationInformationArraySuccessCallback_notexist
//==== LABEL Check if ApplicationInformationArraySuccessCallback cannot be called as a function or in new expression
//==== SPEC Tizen Web API:Application:Application:ApplicationInformationArraySuccessCallback:ApplicationInformationArraySuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA CBNIO

test(function () {
    check_no_interface_object("ApplicationInformationArraySuccessCallback");
}, 'ApplicationInformationArraySuccessCallback_notexist');

}

function ApplicationInformationArraySuccessCallback_onsuccess() {

//==== TEST: ApplicationInformationArraySuccessCallback_onsuccess
//==== LABEL Check if ApplicationInformationArraySuccessCallback onsuccess is called and if its arguments have proper type
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformationArraySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 90000});

var t = async_test('ApplicationInformationArraySuccessCallback_onsuccess', {timeout: 90000}),
    getSuccess, getError;

t.step(function () {
    getSuccess = t.step_func(function (appInfo) {
        assert_type(appInfo, "array", "type of the found value is not properly");
        assert_true(appInfo.length > 0, "information was not found");
        assert_true("id" in appInfo[0], "ApplicationInformation should have id property");
        assert_true("name" in appInfo[0], "ApplicationInformation should have name property");
        assert_true("iconPath" in appInfo[0], "ApplicationInformation should have iconPath property");
        assert_true("version" in appInfo[0], "ApplicationInformation should have version property");
        assert_true("show" in appInfo[0], "ApplicationInformation should have show property");
        assert_true("categories" in appInfo[0], "ApplicationInformation should have categories property");
        assert_true("installDate" in appInfo[0], "ApplicationInformation should have categories property");
        assert_true("size" in appInfo[0], "ApplicationInformation should have size property");
        assert_true("packageId" in appInfo[0], "ApplicationInformation should have packageId property");
        t.done();
    });

    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationInformationEventCallback_notexist() {

//==== TEST: ApplicationInformationEventCallback_notexist
//==== LABEL Check if ApplicationInformationEventCallback notexist
//==== SPEC Tizen Web API:Application:Application:ApplicationInformationEventCallback:ApplicationInformationEventCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA CBNIO

test(function () {
    check_no_interface_object("ApplicationInformationEventCallback");
}, 'ApplicationInformationEventCallback_notexist');

}

function ApplicationInformation_categories_attribute() {

//==== TEST: ApplicationInformation_categories_attribute
//==== LABEL Check if ApplicationInformation have categories attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformation:categories A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('ApplicationInformation_categories_attribute', {timeout: 90000}),
    getSuccess, getError, info, tmp, i;

t.step(function () {
    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getSuccess = t.step_func(function (informationArray) {
        assert_true(informationArray.length > 0, "information was not found");

        info = informationArray[0];
        assert_true("categories" in info, "AplicationInformation should have categories attribute");
        assert_type(info.categories, "array", "categories should be an array");
        tmp = info.categories;
        info.categories = ["one", "two"];
        assert_equals(info.categories.length, tmp.length, "categories is not readonly");
        for(i = 0; i < tmp.length; i++) {
            assert_type(info.categories[i], "string", "categories items sould be a string");
            assert_equals(info.categories[i], tmp[i], "categories is not readonly");
        }

        t.done();
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationInformation_extend() {

//==== TEST: ApplicationInformation_extend
//==== LABEL Check if ApplicationInformation can have new properties added
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformation:ApplicationInformation U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA OBX
setup({timeout: 90000});

var t = async_test('ApplicationInformation_extend', {timeout: 90000}),
    getSuccess, getError, info;

t.step(function () {
    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getSuccess = t.step_func(function (informationArray) {
        assert_true(informationArray.length > 0, "information was not found");

        info = informationArray[0];
        check_extensibility(info);

        t.done();
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationInformation_iconPath_attribute() {

//==== TEST: ApplicationInformation_iconPath_attribute
//==== LABEL Check if ApplicationInformation have iconPath attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformation:iconPath A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('ApplicationInformation_iconPath_attribute', {timeout: 90000}),
    getSuccess, getError, info;

t.step(function () {
    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getSuccess = t.step_func(function (informationArray) {
        assert_true(informationArray.length > 0, "information was not found");

        info = informationArray[0];
        assert_true("iconPath" in info, "AplicationInformation should have iconPath attribute");
        check_readonly(info, "iconPath", info.iconPath, "string", "dummy");

        t.done();
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationInformation_id_attribute() {

//==== TEST: ApplicationInformation_id_attribute
//==== LABEL Check if ApplicationInformation have id attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformation:id A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('ApplicationInformation_id_attribute', {timeout: 90000}),
    getSuccess, getError, info;

t.step(function () {
    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getSuccess = t.step_func(function (informationArray) {
        assert_true(informationArray.length > 0, "information was not found");

        info = informationArray[0];
        assert_true("id" in info, "AplicationInformation should have id attribute");
        check_readonly(info, "id", info.id, "string", "dummy");

        t.done();
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationInformation_installDate_attribute() {

//==== TEST: ApplicationInformation_installDate_attribute
//==== LABEL Check if ApplicationInformation have installDate attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformation:installDate A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('ApplicationInformation_installDate_attribute', {timeout: 90000}),
    getSuccess, getError, info, tmp;

t.step(function () {
    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getSuccess = t.step_func(function (informationArray) {
        assert_true(informationArray.length > 0, "information was not found");

        info = informationArray[0];
        assert_true("installDate" in info, "AplicationInformation should have installDate attribute");
        assert_type(info.installDate, "date", "installDate should be a date");
        tmp = info.installDate;
        info.installDate = new Date();
        assert_equals(info.installDate.getTime(), tmp.getTime(), "values are different");

        t.done();
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationInformation_name_attribute() {

//==== TEST: ApplicationInformation_name_attribute
//==== LABEL Check if ApplicationInformation have name attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformation:name A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('ApplicationInformation_name_attribute', {timeout: 90000}),
    getSuccess, getError, info;

t.step(function () {
    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getSuccess = t.step_func(function (informationArray) {
        assert_true(informationArray.length > 0, "information was not found");

        info = informationArray[0];
        assert_true("name" in info, "AplicationInformation should have name attribute");
        check_readonly(info, "name", info.name, "string", "dummy");

        t.done();
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationInformation_notexist() {

//==== TEST: ApplicationInformation_notexist
//==== LABEL Check if ApplicationInformation cannot be called as a function or in new expression
//==== SPEC Tizen Web API:Application:Application:ApplicationInformation:ApplicationInformation U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("ApplicationInformation");
}, 'ApplicationInformation_notexist');

}

function ApplicationInformation_packageId_attribute() {

//==== TEST: ApplicationInformation_packageId_attribute
//==== LABEL Check if ApplicationInformation have packageId attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformation:packageId A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('ApplicationInformation_packageId_attribute', {timeout: 90000}),
    getSuccess, getError, info;

t.step(function () {
    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getSuccess = t.step_func(function (informationArray) {
        assert_true(informationArray.length > 0, "information was not found");

        info = informationArray[0];
        assert_true("packageId" in info, "AplicationInformation should have packageId attribute");
        check_readonly(info, "packageId", info.packageId, "string", "dummy");

        t.done();
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationInformation_show_attribute() {

//==== TEST: ApplicationInformation_show_attribute
//==== LABEL Check if ApplicationInformation have show attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformation:show A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('ApplicationInformation_show_attribute', {timeout: 90000}),
    getSuccess, getError, info;

t.step(function () {
    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getSuccess = t.step_func(function (informationArray) {
        assert_true(informationArray.length > 0, "information was not found");

        info = informationArray[0];
        assert_true("show" in info, "AplicationInformation should have show attribute");
        check_readonly(info, "show", info.show, "boolean", !info.show);

        t.done();
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationInformation_size_attribute() {

//==== TEST: ApplicationInformation_size_attribute
//==== LABEL Check if ApplicationInformation have size attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformation:size A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('ApplicationInformation_size_attribute', {timeout: 90000}),
    getSuccess, getError, info;

t.step(function () {
    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getSuccess = t.step_func(function (informationArray) {
        assert_true(informationArray.length > 0, "information was not found");

        info = informationArray[0];
        assert_true("size" in info, "AplicationInformation should have size attribute");
        check_readonly(info, "size", info.size, "number", 2 + 3 * info.size / 2);

        t.done();
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationInformation_version_attribute() {

//==== TEST: ApplicationInformation_version_attribute
//==== LABEL Check if ApplicationInformation have version attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationInformation:version A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 90000});

var t = async_test('ApplicationInformation_version_attribute', {timeout: 90000}),
    getSuccess, getError, info;

t.step(function () {
    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getSuccess = t.step_func(function (informationArray) {
        assert_true(informationArray.length > 0, "information was not found");

        info = informationArray[0];
        assert_true("version" in info, "AplicationInformation should have version attribute");
        check_readonly(info, "version", info.version, "string", "dummy");

        t.done();
    });

    tizen.application.getAppsInfo(getSuccess, getError);
});

}

function ApplicationManagerObject_notexist() {

//==== TEST: ApplicationManagerObject_notexist
//==== LABEL Check if ApplicationManagerObject not exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManagerObject:ApplicationManagerObject U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("ApplicationManagerObject");
}, 'ApplicationManagerObject_notexist');

}

function ApplicationManager_addAppInfoEventListener_eventCallback_TypeMismatch() {

//==== TEST: ApplicationManager_addAppInfoEventListener_eventCallback_TypeMismatch
//==== LABEL Check non-optional argument 'ApplicationInformationEventCallback' type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:addAppInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MC

test(function () {
    var i, conversionTable = getTypeConversionExceptions("object");

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.addAppInfoEventListener(conversionTable[i][0]);
        }, "exception should be thrown");
    }

}, 'ApplicationManager_addAppInfoEventListener_eventCallback_TypeMismatch');

}

function ApplicationManager_addAppInfoEventListener_eventCallback_invalid_cb() {

//==== TEST: ApplicationManager_addAppInfoEventListener_eventCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback was passed into addAppInfoEventListener method
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:addAppInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MTL

test(function () {
    var i, conversionTable = getListenerConversionExceptions(["oninstalled", "onupdated", "onuninstalled"]);

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.addAppInfoEventListener(conversionTable[i][0]);
        }, "an exception should be thrown");
    }

}, 'ApplicationManager_addAppInfoEventListener_eventCallback_invalid_cb');

}

function ApplicationManager_addAppInfoEventListener_exist() {

//==== TEST: ApplicationManager_addAppInfoEventListener_exist
//==== LABEL Check if method addAppInfoEventListener exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:addAppInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "addAppInfoEventListener");
}, 'ApplicationManager_addAppInfoEventListener_exist');

}

function ApplicationManager_addAppInfoEventListener_missarg() {

//==== TEST: ApplicationManager_addAppInfoEventListener_missarg
//==== LABEL Check addAppInfoEventListener with missing non-optional ApplicationInformationEventCallback argument
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:addAppInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.addAppInfoEventListener();
    }, "method was called without ApplicationInformationEventCallback but exception was not thrown");
}, 'ApplicationManager_addAppInfoEventListener_missarg');

}

function ApplicationManager_extend() {

//==== TEST: ApplicationManager_extend
//==== LABEL Check if ApplicationManager possible extend
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:ApplicationManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX

test(function () {
    check_extensibility(tizen.application);
}, 'ApplicationManager_extend');

}

function ApplicationManager_findAppControl() {

//==== TEST: ApplicationManager_findAppControl
//==== LABEL Check using findAppControl method (with non-optional arguments) in ApplicationManager interface to get ApplicationsInformation of applications can be launched with the given application control
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MR

setup({timeout: 30000});

var t = async_test('ApplicationManager_findAppControl', {timeout: 30000}), i, findSuccess, appControl, retVal = null;

t.step(function () {
    appControl = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_OPERATION,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_URI,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_MIME
    );

    findSuccess = t.step_func(function (appInfos, appControl) {
        assert_equals(retVal, undefined, "incorrect returned value");
        assert_type(appInfos, "array", "incorrect type of the received value");
        assert_equals(appInfos.length, 2, "incorrect length of the received array");
        for (i = 0; i < appInfos.length; i++) {
            assert_type(appInfos[i], "object", "type of the found value is not properly");
            assert_true("id" in appInfos[i], "no id in returned value");
            assert_true("name" in appInfos[i], "no name in returned value");
            assert_true("iconPath" in appInfos[i], "no iconPath in returned value");
            assert_true("version" in appInfos[i], "no version in returned value");
            assert_true("show" in appInfos[i], "no show in returned value");
            assert_true("categories" in appInfos[i], "no categories in returned value");
            assert_true("installDate" in appInfos[i], "no installDate in returned value");
            assert_true("size" in appInfos[i], "no size in returned value");
            assert_true("packageId" in appInfos[i], "no packageId in returned value");
            if ((appInfos[i].id !== TCT_APPCONTROL_APPID) && (appInfos[i].id !== TCT_APPCONTROL_MOCK_APPID)) {
                assert_unreached("wrong Application was found");
            }
        }
        assert_true(appControl instanceof tizen.ApplicationControl, "wrong ApplicationControl");
        t.done();
    });

    retVal = tizen.application.findAppControl(appControl, findSuccess);
});

}

function ApplicationManager_findAppControl_appControl_TypeMismatch() {

//==== TEST: ApplicationManager_findAppControl_appControl_TypeMismatch
//==== LABEL Check non-optional argument ApplicationControl (findAppControl method) type conversion
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_findAppControl_appControl_TypeMismatch', {timeout: 30000}),
    i, findSuccess, conversionTable = getTypeConversionExceptions("object");

t.step(function () {
    findSuccess = t.step_func(function () {
        assert_unreached("this function should not be run");
    });

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.findAppControl(conversionTable[i][0], findSuccess);
        }, "exception should be thrown");
    }

    t.done();

}, "ApplicationManager_findAppControl_appControl_TypeMismatch");

}

function ApplicationManager_findAppControl_appControl_invalid_obj() {

//==== TEST: ApplicationManager_findAppControl_appControl_invalid_obj
//==== LABEL Check if an exception was thrown when a fake object (ApplicationControl) was passed into findAppControl method
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MTO

setup({timeout: 30000});

var t = async_test('ApplicationManager_findAppControl_appControl_invalid_obj', {timeout: 30000}), findSuccess, appControl;
t.step(function () {
    appControl = {
        operation: TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION,
        uri: TCT_APPCONTROL_LAUNCH_APPCONTROL_URI,
        mime: TCT_APPCONTROL_LAUNCH_APPCONTROL_MIME,
        category: "/opt",
        data: [new tizen.ApplicationControlData("key", ["value1", "value2"])]
    };

    findSuccess = t.step_func(function () {
        assert_unreached("this function should not be run");
    });

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.findAppControl(appControl, findSuccess);
    }, "exception should be thrown");

    t.done();
}, "ApplicationManager_findAppControl_appControl_invalid_obj");

}

function ApplicationManager_findAppControl_errorCallback_TypeMismatch() {

//==== TEST: ApplicationManager_findAppControl_errorCallback_TypeMismatch
//==== LABEL Check optional argument errorCallback (findAppControl method) type conversion
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_findAppControl_errorCallback_TypeMismatch', {timeout: 30000}),
    i, findSuccess, conversionTable = getTypeConversionExceptions("functionObject", true), appControl;

t.step(function () {
    appControl = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    findSuccess = t.step_func(function () {
        assert_unreached("this function should not be run");
    });

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.findAppControl(appControl, findSuccess, conversionTable[i][0]);
        }, "exception should be thrown");
    }

    t.done();

});

}

function ApplicationManager_findAppControl_errorCallback_invalid_cb() {

//==== TEST: ApplicationManager_findAppControl_errorCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onerror) was passed into findAppControl method
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_findAppControl_errorCallback_invalid_cb', {timeout: 30000}),
    findSuccess, findErrorFunc, findError, appControl;

t.step(function () {
    appControl = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    findSuccess = t.step_func(function () {
        assert_unreached("this function should not be run");
    });

    findErrorFunc = t.step_func(function (error) {
        assert_unreached("findAppControl() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    findError = {
        onerror: findErrorFunc
    };

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.findAppControl(appControl, findSuccess, findError);
    }, "exception should be thrown");

    t.done();
});

}

function ApplicationManager_findAppControl_exist() {

//==== TEST: ApplicationManager_findAppControl_exist
//==== LABEL Check if method findAppControl exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "findAppControl");
}, 'ApplicationManager_findAppControl_exist');

}

function ApplicationManager_findAppControl_missarg() {

//==== TEST: ApplicationManager_findAppControl_missarg
//==== LABEL Check findAppControl with missing non-optional argument
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.findAppControl();
    }, "Method was called without arguments but exception was not thrown");
}, 'ApplicationManager_findAppControl_missarg');

}

function ApplicationManager_findAppControl_successCallback_TypeMismatch() {

//==== TEST: ApplicationManager_findAppControl_successCallback_TypeMismatch
//==== LABEL Check non-optional argument successCallback (findAppControl method) type conversion
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_findAppControl_successCallback_TypeMismatch', {timeout: 30000}),
    i, conversionTable = getTypeConversionExceptions("functionObject"), appControl;
t.step(function () {
    appControl = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.findAppControl(appControl, conversionTable[i][0]);
        }, "exception should be thrown");
    }

    t.done();

}, "ApplicationManager_findAppControl_successCallback_TypeMismatch");

}

function ApplicationManager_findAppControl_successCallback_invalid_cb() {

//==== TEST: ApplicationManager_findAppControl_successCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onSuccess) was passed into findAppControl method
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_findAppControl_successCallback_invalid_cb', {timeout: 30000}),
    findSuccess, findSuccessFunc, appControl;

t.step(function () {
    appControl = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    findSuccessFunc = t.step_func(function () {
        assert_unreached("this function should not be used");
    });

    findSuccess = { onsuccess: findSuccessFunc };

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.findAppControl(appControl, findSuccess);
    }, "exception should be thrown");

    t.done();

}, "ApplicationManager_findAppControl_successCallback_invalid_cb");

}

function ApplicationManager_findAppControl_successCallback_missarg() {

//==== TEST: ApplicationManager_findAppControl_successCallback_missarg
//==== LABEL Check findAppControl with missing non-optional successCallback argument
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MMA

test(function () {
    var appControl = new tizen.ApplicationControl(TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION);
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.findAppControl(appControl);
    }, "Method was called without successCallback but exception was not thrown");
}, 'ApplicationManager_findAppControl_successCallback_missarg');

}

function ApplicationManager_findAppControl_with_errorCallback() {

//==== TEST: ApplicationManager_findAppControl_with_errorCallback
//==== LABEL Check using findAppControl method (with optional argument errorCallback) in ApplicationManager interface
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:findAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MOA

setup({timeout: 30000});

var t = async_test('ApplicationManager_findAppControl_with_errorCallback', {timeout: 30000}),
    i, findSuccess, findError, appControl;

t.step(function () {
    appControl = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_OPERATION,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_URI,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_MIME
    );

    findSuccess = t.step_func(function (appInfos, appControl) {
        assert_type(appInfos, "array", "incorrect type of the received value");
        assert_equals(appInfos.length, 2, "incorrect length of the received array");
        for (i = 0; i < appInfos.length; i++) {
            assert_type(appInfos[i], "object", "type of the found value is not properly");
            assert_true("id" in appInfos[i], "no id in returned value");
            assert_true("name" in appInfos[i], "no name in returned value");
            assert_true("iconPath" in appInfos[i], "no iconPath in returned value");
            assert_true("version" in appInfos[i], "no version in returned value");
            assert_true("show" in appInfos[i], "no show in returned value");
            assert_true("categories" in appInfos[i], "no categories in returned value");
            assert_true("installDate" in appInfos[i], "no installDate in returned value");
            assert_true("size" in appInfos[i], "no size in returned value");
            assert_true("packageId" in appInfos[i], "no packageId in returned value");
            if ((appInfos[i].id !== TCT_APPCONTROL_APPID) && (appInfos[i].id !== TCT_APPCONTROL_MOCK_APPID)) {
                assert_unreached("wrong Application was found");
            }
        }
        assert_true(appControl instanceof tizen.ApplicationControl, "wrong ApplicationControl");
        t.done();
    });

    findError = t.step_func(function (error) {
        assert_unreached("findAppControl() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.application.findAppControl(appControl, findSuccess, findError);

});

}

function ApplicationManager_getAppCerts() {

//==== TEST: ApplicationManager_getAppCerts
//==== LABEL Check using getAppCerts method (with non-optional arguments) in ApplicationManager interface to get application certificates for current application
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppCerts M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MR

test(function () {
    var i, appCerts = tizen.application.getAppCerts();
    assert_type(appCerts, "array", "type of the found value is not properly");
    assert_not_equals(appCerts.length, 0, "array length should be > 0");
    for (i = 0; i < appCerts.length; i++) {
        assert_type(appCerts[i], "object", "type of the element of the returned array is not properly");
        assert_true("type" in appCerts[i], "no type in returned value");
        assert_true("value" in appCerts[i], "no value in returned value");
    }
}, 'ApplicationManager_getAppCerts');

}

function ApplicationManager_getAppCerts_exist() {

//==== TEST: ApplicationManager_getAppCerts_exist
//==== LABEL Check if method getAppCerts exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppCerts M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "getAppCerts");
}, 'ApplicationManager_getAppCerts_exist');

}

function ApplicationManager_getAppCerts_with_id() {

//==== TEST: ApplicationManager_getAppCerts_with_id
//==== LABEL Check using getAppCerts method (with id argument) in ApplicationManager interface to get application certificates
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppCerts M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MOA MR

test(function () {
    var i, appCerts = tizen.application.getAppCerts(THIS_APP_ID);
    assert_type(appCerts, "array", "type of the found value is not properly");
    assert_not_equals(appCerts.length, 0, "array length should be > 0");
    for (i = 0; i < appCerts.length; i++) {
        assert_type(appCerts[i], "object", "type of the element of the returned array is not properly");
        assert_true("type" in appCerts[i], "no type in returned value");
        assert_true("value" in appCerts[i], "no value in returned value");
    }
}, 'ApplicationManager_getAppCerts_with_id');

}

function ApplicationManager_getAppContext() {

//==== TEST: ApplicationManager_getAppContext
//==== LABEL Check using getAppContext method (with non-optional arguments) in ApplicationManager interface to get ApplicationContext of current application
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MR

test(function () {
    var appContext = tizen.application.getAppContext();
    assert_type(appContext, "object", "type of the returned value is not properly");
    assert_true("id" in appContext, "no id in returned value");
    assert_true("appId" in appContext, "no appId in returned value");
    assert_equals(appContext.appId, THIS_APP_ID, "wrong ApplicationContext was returned");
}, 'ApplicationManager_getAppContext');

}

function ApplicationManager_getAppContext_exist() {

//==== TEST: ApplicationManager_getAppContext_exist
//==== LABEL Check if method getAppContext exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "getAppContext");
}, 'ApplicationManager_getAppContext_exist');

}

function ApplicationManager_getAppContext_with_contextId() {

//==== TEST: ApplicationManager_getAppContext_with_contextId
//==== LABEL Check using getAppContext method (with optional argument contextId) in ApplicationManager interface to get ApplicationContext with given contextId
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MOA MR

test(function () {
    var appContext1, appContext2;

    appContext1 = tizen.application.getAppContext();

    appContext2 = tizen.application.getAppContext(appContext1.id);
    assert_type(appContext2, "object", "type of the found first value is not properly");
    assert_true("id" in appContext2, "no id in returned value");
    assert_true("appId" in appContext2, "no appId in returned value");

    assert_equals(appContext1.id, appContext2.id, "wrong ApplicationContext was found");
    assert_equals(appContext1.appId, appContext2.appId, "wrong ApplicationContext was found");
}, 'ApplicationManager_getAppContext_with_contextId');

}

function ApplicationManager_getAppInfo() {

//==== TEST: ApplicationManager_getAppInfo
//==== LABEL Check using getAppInfo method (with non-optional arguments) in ApplicationManager interface to get ApplicationInformation of current application
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MR

test(function () {
    var appInfo = tizen.application.getAppInfo();
    assert_type(appInfo, "object", "type of the found value is not properly");
    assert_true("id" in appInfo, "no id in returned value");
    assert_true("name" in appInfo, "no name in returned value");
    assert_true("iconPath" in appInfo, "no iconPath in returned value");
    assert_true("version" in appInfo, "no version in returned value");
    assert_true("show" in appInfo, "no show in returned value");
    assert_true("categories" in appInfo, "no categories in returned value");
    assert_true("installDate" in appInfo, "no installDate in returned value");
    assert_true("size" in appInfo, "no size in returned value");
    assert_true("packageId" in appInfo, "no packageId in returned value");
    assert_equals(appInfo.id, THIS_APP_ID, "wrong ApplicationInformation was returned");
}, 'ApplicationManager_getAppInfo');

}

function ApplicationManager_getAppInfo_exist() {

//==== TEST: ApplicationManager_getAppInfo_exist
//==== LABEL Check if method getAppInfo exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "getAppInfo");
}, 'ApplicationManager_getAppInfo_exist');

}

function ApplicationManager_getAppInfo_with_id() {

//==== TEST: ApplicationManager_getAppInfo_with_id
//==== LABEL Check using getAppInfo method (with optional argument ApplicationId) in ApplicationManager interface to get ApplicationInformation with given ApplicationId
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MOA MR

test(function () {
    var i, appInfo1, appInfo2, requiredFields = ["id", "name", "iconPath", "version", "show", "categories", "installDate", "size", "packageId"];

    appInfo1 = tizen.application.getAppInfo();

    appInfo2 = tizen.application.getAppInfo(appInfo1.id);
    assert_type(appInfo2, "object", "type of the returned value is not properly");
    for (i = 0; i < requiredFields.length; i++) {
        assert_true(requiredFields[i] in appInfo2, "no " + requiredFields[i] + " in returned value");
    }

    for (i = 0; i < requiredFields.length; i++) {
        if (requiredFields[i] === "categories") {
            assert_array_equals(appInfo1[requiredFields[i]], appInfo2[requiredFields[i]], "wrong ApplicationInformation was returned");
        } else if (requiredFields[i] === "installDate") {
            assert_equals(appInfo1[requiredFields[i]].getTime(), appInfo2[requiredFields[i]].getTime(), "wrong ApplicationInformation was returned");
        } else {
            assert_equals(appInfo1[requiredFields[i]], appInfo2[requiredFields[i]], "wrong ApplicationInformation was returned");
        }
    }

}, 'ApplicationManager_getAppInfo_with_id');

}

function ApplicationManager_getAppMetaData() {

//==== TEST: ApplicationManager_getAppMetaData
//==== LABEL Check the method ApplicationManager::getAppMetaData() called without arguments
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppMetaData M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== TEST_CRITERIA MMINA MR

test(function () {
    var appMetaData = tizen.application.getAppMetaData(null);

    assert_type(appMetaData, "array", "type of the found value is not array (null argument)");
    assert_equals(appMetaData.length, 1, "Incorrect number of metadata (null argument)");
    assert_equals(appMetaData[0].key, METADATA_KEY, "Incorrect metadata key (null argument)");
    assert_equals(appMetaData[0].value, METADATA_VALUE, "Incorrect metadata value (null argument)");

    appMetaData = tizen.application.getAppMetaData();
    assert_type(appMetaData, "array", "type of the found value is not array");
    assert_equals(appMetaData.length, 1, "Incorrect number of metadata.");
    assert_equals(appMetaData[0].key, METADATA_KEY, "Incorrect metadata key");
    assert_equals(appMetaData[0].value, METADATA_VALUE, "Incorrect metadata value");
}, 'ApplicationManager_getAppMetaData');

}

function ApplicationManager_getAppMetaData_exist() {

//==== TEST: ApplicationManager_getAppMetaData_exist
//==== LABEL Check if method ApplicationManager::getAppMetaData exists
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppMetaData M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "getAppMetaData");
}, 'ApplicationManager_getAppMetaData_exist');

}

function ApplicationManager_getAppMetaData_with_id() {

//==== TEST: ApplicationManager_getAppMetaData_with_id
//==== LABEL Check the method ApplicationManager::getAppMetaData() called with id argument
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppMetaData M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== TEST_CRITERIA MOA MR

test(function () {
    var i, appMetaData = tizen.application.getAppMetaData(TCT_APPCONTROL_APPID), key;

    assert_type(appMetaData, "array", "type of the found value is not array");
    assert_equals(appMetaData.length, 2, "Incorrect number of metadata.");
    for (i = 0; i < appMetaData.length; i++) {
        assert_type(appMetaData[i], "object", "type of the element of the returned array is not properly");
        assert_true("key" in appMetaData[i], "no type in returned value");
        assert_true("value" in appMetaData[i], "no value in returned value");

        key = appMetaData[i].key;
        assert_own_property(TCT_APPCONTROL_APPID_METADATA, key, "Incorrect key");
        assert_equals(appMetaData[i].value, TCT_APPCONTROL_APPID_METADATA[key], "Incorrect value");
        delete TCT_APPCONTROL_APPID_METADATA[key];
    }
}, 'ApplicationManager_getAppMetaData_with_id');

}

function ApplicationManager_getAppSharedURI() {

//==== TEST: ApplicationManager_getAppSharedURI
//==== LABEL Check using getAppSharedURI method (with non-optional arguments) in ApplicationManager interface to get URI shared directory of current application
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppSharedURI M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MR

test(function () {
    var sharedDir = tizen.application.getAppSharedURI();
    assert_type(sharedDir, "string", "type of the found value is not properly");
}, 'ApplicationManager_getAppSharedURI');

}

function ApplicationManager_getAppSharedURI_exist() {

//==== TEST: ApplicationManager_getAppSharedURI_exist
//==== LABEL Check if method getAppSharedURI exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppSharedURI M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "getAppSharedURI");
}, 'ApplicationManager_getAppSharedURI_exist');

}

function ApplicationManager_getAppSharedURI_with_id() {

//==== TEST: ApplicationManager_getAppSharedURI_with_id
//==== LABEL Check using getAppSharedURI method (with optional argument ApplicationId) in ApplicationManager interface to get URI shared directory of application with given ApplicationId
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppSharedURI M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MOA MR

test(function () {
    var sharedDir = tizen.application.getAppSharedURI(TCT_APPCONTROL_APPID);
    assert_type(sharedDir, "string", "type of the found value is not properly");
}, 'ApplicationManager_getAppSharedURI_with_id');

}

function ApplicationManager_getAppsContext() {

//==== TEST: ApplicationManager_getAppsContext
//==== LABEL Check using getAppsContext method (with non-optional arguments) in ApplicationManager interface to get ApplicationsContext of applications that are currently running on a device
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MR

setup({timeout: 30000});

var t = async_test('ApplicationManager_getAppsContext', {timeout: 30000}), getSuccess, i, foundCurrentApplication = false, retVal = null;

t.step(function () {

    getSuccess = t.step_func(function (appContextArray) {
        assert_equals(retVal, undefined, "incorrect returned value");
        assert_type(appContextArray , "array", "type of the found value is not properly");
        for (i = 0; i < appContextArray.length; i++) {
            assert_type(appContextArray[i], "object", "type of the found value is not properly");
            assert_true("id" in appContextArray[i], "no id in returned value");
            assert_true("appId" in appContextArray[i], "no appId in returned value");
            if (appContextArray[i].appId === THIS_APP_ID) {
                foundCurrentApplication = true;
            }
        }
        if (!foundCurrentApplication) {
            assert_unreached("current application context wasn't found");
        }

        t.done();
    });

    retVal = tizen.application.getAppsContext(getSuccess);

});

}

function ApplicationManager_getAppsContext_errorCallback_TypeMismatch() {

//==== TEST: ApplicationManager_getAppsContext_errorCallback_TypeMismatch
//==== LABEL Check optional argument errorCallback (getAppsContext method) type conversion
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_getAppsContext_errorCallback_TypeMismatch', {timeout: 30000}), i, getCallback, conversionTable = getTypeConversionExceptions("functionObject",
    true);
t.step(function () {

    getCallback = t.step_func(function () {
        assert_unreached("this function should not be run");
    });

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.getAppsContext(getCallback, conversionTable[i][0]);
        }, "exception should be thrown");
    }

    t.done();

});

}

function ApplicationManager_getAppsContext_errorCallback_invalid_cb() {

//==== TEST: ApplicationManager_getAppsContext_errorCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onerror) was passed into getAppsContext method
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_getAppsContext_errorCallback_invalid_cb', {timeout: 30000}), getSuccess, getError, getErrorFunc;
t.step(function () {

    getSuccess = t.step_func(function () {
        assert_unreached("application should not be run");
    });

    getErrorFunc = t.step_func(function (error) {
        assert_unreached("getAppsContext() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getError = {
        onerror: getErrorFunc
    };

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.getAppsContext(getSuccess, getError);
    }, "exception should be thrown");

    t.done();

});

}

function ApplicationManager_getAppsContext_exist() {

//==== TEST: ApplicationManager_getAppsContext_exist
//==== LABEL Check if method getAppsContext exists
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "getAppsContext");
}, 'ApplicationManager_getAppsContext_exist');

}

function ApplicationManager_getAppsContext_missarg() {

//==== TEST: ApplicationManager_getAppsContext_missarg
//==== LABEL GetAppsContext - check with missing non-optional argument
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.getAppsContext();
    }, "Method was called without arguments but exception was not thrown");
}, 'ApplicationManager_getAppsContext_missarg');

}

function ApplicationManager_getAppsContext_successCallback_TypeMismatch() {

//==== TEST: ApplicationManager_getAppsContext_successCallback_TypeMismatch
//==== LABEL Check non-optional argument successCallback (getAppsContext method) type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MC

test(function () {
    var i, conversionTable = getTypeConversionExceptions("functionObject");
    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.getAppsContext(conversionTable[i][0]);
        }, "exception should be thrown");
    }
}, 'ApplicationManager_getAppsContext_successCallback_TypeMismatch');

}

function ApplicationManager_getAppsContext_successCallback_invalid_cb() {

//==== TEST: ApplicationManager_getAppsContext_successCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onsuccess) was passed into getAppsContext method
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_getAppsContext_successCallback_invalid_cb', {timeout: 30000}), getSuccess, getSuccessFunc;
t.step(function () {

    getSuccessFunc = t.step_func(function () {
        assert_unreached("this function should not be used");
    });

    getSuccess = {
        onsuccess: getSuccessFunc
    };

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.getAppsContext(getSuccess);
    }, "exception should be thrown");

    t.done();

});

}

function ApplicationManager_getAppsContext_with_errorCallback() {

//==== TEST: ApplicationManager_getAppsContext_with_errorCallback
//==== LABEL Check using getAppsContext method (with optional argument errorCallback) in ApplicationManager interface
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MOA

setup({timeout: 30000});

var t = async_test('ApplicationManager_getAppsContext_with_errorCallback', {timeout: 30000}), getSuccess, getError, i, foundCurrentApplication = false;

t.step(function () {

    getSuccess = t.step_func(function (appContextArray) {
        assert_type(appContextArray , "array", "type of the found value is not properly");
        for (i = 0; i < appContextArray.length; i++) {
            assert_type(appContextArray[i], "object", "type of the found value is not properly");
            assert_true("id" in appContextArray[i], "no id in returned value");
            assert_true("appId" in appContextArray[i], "no appId in returned value");
            if (appContextArray[i].appId === THIS_APP_ID) {
                foundCurrentApplication = true;
            }
        }
        if (!foundCurrentApplication) {
            assert_unreached("current application context wasn't found");
        }
        t.done();
    });

    getError = t.step_func(function (error) {
        assert_unreached("getAppsContext() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.application.getAppsContext(getSuccess, getError);

});

}

function ApplicationManager_getAppsInfo() {

//==== TEST: ApplicationManager_getAppsInfo
//==== LABEL Check using getAppsInfo method (with non-optional arguments) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA MMINA MR
setup({timeout: 90000});

var t=async_test('ApplicationManager_getAppsInfo', {timeout: 90000}), getSuccess, retVal = null;
t.step(function () {

    getSuccess = t.step_func(function (appInfo) {
        assert_equals(retVal, undefined, "incorrect returned value");
        assert_type(appInfo, "array", "type of the found value is not properly");
        assert_true(appInfo.length > 0, "information was not found");
        t.done();
    });

    retVal = tizen.application.getAppsInfo(getSuccess);
});

}

function ApplicationManager_getAppsInfo_errorCallback_TypeMismatch() {

//==== TEST: ApplicationManager_getAppsInfo_errorCallback_TypeMismatch
//==== LABEL Check optional argument errorCallback (getAppsInfo method) type conversion
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_getAppsInfo_errorCallback_TypeMismatch', {timeout: 30000}), i, getSuccess, conversionTable = getTypeConversionExceptions("functionObject",
    true);
t.step(function () {

    getSuccess = t.step_func(function () {
        assert_unreached("this function should not be used");
    });

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.getAppsInfo(getSuccess, conversionTable[i][0]);
        }, "exception should be thrown");
    }

    t.done();

});

}

function ApplicationManager_getAppsInfo_errorCallback_invalid_cb() {

//==== TEST: ApplicationManager_getAppsInfo_errorCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onerror) was passed into getAppsInfo method
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_getAppsInfo_errorCallback_invalid_cb', {timeout: 30000}), getSuccess, getError, getErrorFunc;
t.step(function () {

    getSuccess = t.step_func(function () {
        assert_unreached("application should not be run");
    });

    getErrorFunc = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    getError = {
        onerror: getErrorFunc
    };

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.getAppsInfo(getSuccess, getError);
    }, "exception should be thrown");

    t.done();

});

}

function ApplicationManager_getAppsInfo_exist() {

//==== TEST: ApplicationManager_getAppsInfo_exist
//==== LABEL Check if method getAppsInfo exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "getAppsInfo");
}, 'ApplicationManager_getAppsInfo_exist');

}

function ApplicationManager_getAppsInfo_missarg() {

//==== TEST: ApplicationManager_getAppsInfo_missarg
//==== LABEL ApplicationManager.getAppsInfo - check with missing non-optional argument
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.getAppsInfo();
    }, "Method was called without arguments but exception was not thrown");
}, 'ApplicationManager_getAppsInfo_missarg');

}

function ApplicationManager_getAppsInfo_successCallback_TypeMismatch() {

//==== TEST: ApplicationManager_getAppsInfo_successCallback_TypeMismatch
//==== LABEL Check non-optional argument successCallback (getAppsInfo method) type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsContext M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MC

test(function () {
    var i, conversionTable = getTypeConversionExceptions("functionObject");
    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.getAppsInfo(conversionTable[i][0]);
        }, "exception should be thrown");
    }
}, 'ApplicationManager_getAppsInfo_successCallback_TypeMismatch');

}

function ApplicationManager_getAppsInfo_successCallback_invalid_cb() {

//==== TEST: ApplicationManager_getAppsInfo_successCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onsuccess) was passed into getAppsInfo method
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_getAppsInfo_successCallback_invalid_cb', {timeout: 30000}), getSuccess, getSuccessFunc;
t.step(function () {

    getSuccessFunc = t.step_func(function () {
        assert_unreached("this function should not be used");
    });

    getSuccess = {
        onsuccess: getSuccessFunc
    };

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.getAppsInfo(getSuccess);
    }, "exception should be thrown");

    t.done();

});

}

function ApplicationManager_getAppsInfo_with_errorCallback() {

//==== TEST: ApplicationManager_getAppsInfo_with_errorCallback
//==== LABEL Check using getAppsInfo method (with optional argument errorCallback) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getAppsInfo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 90
//==== TEST_CRITERIA MOA
setup({timeout: 90000});

var t = async_test('ApplicationManager_getAppsInfo_with_errorCallback', {timeout: 90000}), getSuccess, getError;

t.step(function () {

    getSuccess = t.step_func(function (appInfo) {
        assert_type(appInfo, "array", "type of the found value is not properly");
        assert_true(appInfo.length > 0, "information was not found");
        t.done();
    });

    getError = t.step_func(function (error) {
        assert_unreached("getAppsInfo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.application.getAppsInfo(getSuccess, getError);

});

}

function ApplicationManager_getCurrentApplication() {

//==== TEST: ApplicationManager_getCurrentApplication
//==== LABEL Check using getCurrentApplication method in ApplicationManager interface to get current Application object
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getCurrentApplication M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MNA MR

test(function () {
    var app = tizen.application.getCurrentApplication();
    assert_type(app, "object", "type of the returned value is not properly");
    assert_true("appInfo" in app, "no appInfo in returned value");
    assert_true("contextId" in app, "no contextId in returned value");
    assert_true("exit" in app, "no exit in returned value");
    assert_true("hide" in app, "no hide in returned value");
    assert_true("getRequestedAppControl" in app, "no getRequestedAppControl in returned value");
}, 'ApplicationManager_getCurrentApplication');

}

function ApplicationManager_getCurrentApplication_exist() {

//==== TEST: ApplicationManager_getCurrentApplication_exist
//==== LABEL Check if method getCurrentApplication exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getCurrentApplication M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "getCurrentApplication");
}, 'ApplicationManager_getCurrentApplication_exist');

}

function ApplicationManager_getCurrentApplication_extra_argument() {

//==== TEST: ApplicationManager_getCurrentApplication_extra_argument
//==== LABEL Check using getCurrentApplication with extra argument to get current Application object
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:getCurrentApplication M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MNAEX

test(function () {
    checkExtraArgument(tizen.application, "getCurrentApplication");
}, 'ApplicationManager_getCurrentApplication_extra_argument');

}

function ApplicationManager_in_tizen() {

//==== TEST: ApplicationManager_in_tizen
//==== LABEL Check if ApplicationManager exist in tizen
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:ApplicationManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBME

test(function () {
    assert_true("application" in tizen, "no ApplicationManager in tizen");
    check_readonly(tizen, "application", tizen.application, "object", "dummyValue");
}, 'ApplicationManager_in_tizen');

}

function ApplicationManager_kill() {

//==== TEST: ApplicationManager_kill
//==== LABEL Check using kill method (with non-optional arguments) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:kill M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MMINA MAST MR
setup({timeout: 30000});

var t = async_test('ApplicationManager_kill', {timeout: 30000}),
    launchSuccess, launchError, retVal = null;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccess = t.step_func(function () {
        assert_launch(t, TCT_APPCONTROL_APPID, function (context) {
            retVal = tizen.application.kill(context.id);
            assert_kill(t, TCT_APPCONTROL_APPID, function () {
                assert_equals(retVal, undefined, "incorrect returned value");
                t.done();
            });
        });
    });

    launchError = t.step_func(function (error) {
        assert_unreached("launch fails: " + error.name + " with message: " + error.message);
    });

    tizen.application.launch(TCT_APPCONTROL_APPID, launchSuccess, launchError);
});

}

function ApplicationManager_kill_errorCallback_TypeMismatch() {

//==== TEST: ApplicationManager_kill_errorCallback_TypeMismatch
//==== LABEL Check optional argument 'onError' (kill) type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:kill M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ApplicationManager_kill_errorCallback_TypeMismatch', {timeout: 30000}),
    i, killSuccess, launchSuccess, launchError, conversionTable = getTypeConversionExceptions("functionObject", true);

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    killSuccess = t.step_func(function () {
        assert_unreached("This function should not be used");
    });

    launchSuccess = t.step_func(function () {
        assert_launch(t, TCT_APPCONTROL_APPID, function (context) {
            for (i = 0; i < conversionTable.length; i++) {
                assert_throws({name: conversionTable[i][1]}, function () {
                    tizen.application.kill(context.id, killSuccess, conversionTable[i][0]);
                }, "exception should be thrown");
            }

            assert_not_kill(t, TCT_APPCONTROL_APPID, function () {
                t.done();
            });
        });
    });

    launchError = t.step_func(function (error) {
        assert_unreached("launch fails: " + error.name + " with message: " + error.message);
    });

    tizen.application.launch(TCT_APPCONTROL_APPID, launchSuccess, launchError);
});

}

function ApplicationManager_kill_errorCallback_invalid_cb() {

//==== TEST: ApplicationManager_kill_errorCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onError) was passed into kill method
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:kill M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MTCB
setup({timeout: 30000});

var t = async_test('ApplicationManager_kill_errorCallback_invalid_cb', {timeout: 30000}),
    killSuccess, killError, killErrorFunc, launchSuccess, launchError;

setup_launch(t, TCT_APPCONTROL_APPID, function () {

    killSuccess = t.step_func(function () {
        assert_unreached("This function (killSuccess) should not be used");
    });

    killErrorFunc = t.step_func(function (error) {
        assert_unreached("kill() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    killError = { onsuccess: killErrorFunc };

    launchSuccess = t.step_func(function () {
        assert_launch(t, TCT_APPCONTROL_APPID, function (context) {
            assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
                tizen.application.kill(context.id, killSuccess, killError);
            }, "exception should be thrown");

            assert_not_kill(t, TCT_APPCONTROL_APPID, function () {
                t.done();
            });
        });
    });

    launchError = t.step_func(function (error) {
        assert_unreached("launch fails: " + error.name + " with message: " + error.message);
    });

    tizen.application.launch(TCT_APPCONTROL_APPID, launchSuccess, launchError);
});

}

function ApplicationManager_kill_exist() {

//==== TEST: ApplicationManager_kill_exist
//==== LABEL Check if method kill exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:kill M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "kill");
}, 'ApplicationManager_kill_exist');

}

function ApplicationManager_kill_successCallback_TypeMismatch() {

//==== TEST: ApplicationManager_kill_successCallback_TypeMismatch
//==== LABEL Check optional argument 'onSuccess' (kill) type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:kill M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_kill_successCallback_TypeMismatch', {timeout: 30000}),
    i, launchSuccess, launchError,
    conversionTable = getTypeConversionExceptions("functionObject", true);

setup_launch(t, TCT_APPCONTROL_APPID, function () {

    launchSuccess = t.step_func(function () {
        assert_launch(t, TCT_APPCONTROL_APPID, function (context) {
            for (i = 0; i < conversionTable.length; i++) {
                assert_throws({name: conversionTable[i][1]}, function () {
                    tizen.application.kill(context.id, conversionTable[i][0]);
                }, "exception should be thrown");
            }

            assert_not_kill(t, TCT_APPCONTROL_APPID, function () {
                t.done();
            });
        });
    });

    launchError = t.step_func(function (error) {
        assert_unreached("launch fails: " + error.name + " with message: " + error.message);
    });

    tizen.application.launch(TCT_APPCONTROL_APPID, launchSuccess, launchError);
});

}

function ApplicationManager_kill_successCallback_invalid_cb() {

//==== TEST: ApplicationManager_kill_successCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onSuccess) was passed into kill method
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:kill M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_kill_successCallback_invalid_cb', {timeout: 30000}),
    killSuccessFunc, killSuccess, launchSuccess, launchError;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    killSuccessFunc = t.step_func(function () {
        assert_unreached("this function should not be used");
    });

    killSuccess = { onsuccess: killSuccessFunc };

    launchSuccess = t.step_func(function () {
        assert_launch(t, TCT_APPCONTROL_APPID, function (context) {
            assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
                tizen.application.kill(context.id, killSuccess);
            }, "exception should be thrown");

            assert_not_kill(t, TCT_APPCONTROL_APPID, function () {
                t.done();
            });
        });
    });

    launchError = t.step_func(function (error) {
        assert_unreached("launch fails: " + error.name + " with message: " + error.message);
    });

    tizen.application.launch(TCT_APPCONTROL_APPID, launchSuccess, launchError);
});

}

function ApplicationManager_kill_with_errorCallback() {

//==== TEST: ApplicationManager_kill_with_errorCallback
//==== LABEL Check using kill method (with optional argument errorCallback) in ApplicationManager interface
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:kill M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MERRCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_kill_with_errorCallback', {timeout: 30000}),
    killSuccess, killError, currentApplication;

t.step(function () {
    killSuccess = t.step_func(function () {
        assert_unreached("This function should not be used");
    });

    killError = t.step_func(function (error) {
        assert_equals(error.name, "InvalidValuesError", "InvalidValuesError must be thrown");
        t.done();
    });

    currentApplication = tizen.application.getCurrentApplication();

    tizen.application.kill(currentApplication.contextId, killSuccess, killError);
});

}

function ApplicationManager_kill_with_successCallback() {

//==== TEST: ApplicationManager_kill_with_successCallback
//==== LABEL Check using kill method (with optional argument successCallback) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:kill M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MOA MAST

setup({timeout: 30000});

var t = async_test('ApplicationManager_kill_with_successCallback', {timeout: 30000}),
    killSuccess, launchSuccess, launchError;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    killSuccess = t.step_func(function () {
        assert_kill(t, TCT_APPCONTROL_APPID, function () {
            t.done();
        });
    });

    launchSuccess = t.step_func(function () {
        assert_launch(t, TCT_APPCONTROL_APPID, function (context) {
            tizen.application.kill(context.id, killSuccess);
        });
    });

    launchError = t.step_func(function (error) {
        assert_unreached("launch fails: " + error.name + " with message: " + error.message);
    });

    tizen.application.launch(TCT_APPCONTROL_APPID, launchSuccess, launchError);
});

}

function ApplicationManager_launch() {

//==== TEST: ApplicationManager_launch
//==== LABEL Check using launch method (with non-optional arguments) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MMINA MAST MR
setup({timeout: 30000});

var t = async_test('ApplicationManager_launch', {timeout: 30000}), retVal = null;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    retVal = tizen.application.launch(TCT_APPCONTROL_APPID);

    assert_launch(t, TCT_APPCONTROL_APPID, function () {
        assert_equals(retVal, undefined, "incorrect returned value");
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_appControl_TypeMismatch() {

//==== TEST: ApplicationManager_launchAppControl_appControl_TypeMismatch
//==== LABEL Check non-optional argument ApplicationControl type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_appControl_TypeMismatch', {timeout: 30000}),
    i, conversionTable = getTypeConversionExceptions("object");

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.launchAppControl(conversionTable[i][0]);
        }, "exception should be thrown");
    }

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_appControl_invalid_obj() {

//==== TEST: ApplicationManager_launchAppControl_appControl_invalid_obj
//==== LABEL Check if an exception was thrown when a fake object (ApplicationControl) was passed into launchAppControl method
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MTO

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_appControl_invalid_obj', {timeout: 30000}), appControl;

setup_launch(t, TCT_APPCONTROL_APPID, function () {

    appControl = {
        operation: TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION,
        uri: TCT_APPCONTROL_LAUNCH_APPCONTROL_URI,
        mime: TCT_APPCONTROL_LAUNCH_APPCONTROL_MIME,
        category: "",
        data: []
    };

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.launchAppControl(appControl);
    }, "exception should be thrown");

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_errorCallback_TypeMismatch() {

//==== TEST: ApplicationManager_launchAppControl_errorCallback_TypeMismatch
//==== LABEL Check optional argument 'onError' (launchAppControl) type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_errorCallback_TypeMismatch', {timeout: 30000}),
    i, launchSuccess, appcontrol, conversionTable = getTypeConversionExceptions("functionObject", true);

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccess = t.step_func(function () {
        assert_unreached("application should not be run");
    });

    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.launchAppControl(appcontrol, null, launchSuccess, conversionTable[i][0]);
        }, "exception should be thrown");
    }

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_errorCallback_invalid_cb() {

//==== TEST: ApplicationManager_launchAppControl_errorCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onError) was passed into launchAppControl method
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_errorCallback_invalid_cb', {timeout: 30000}),
    launchSuccess, launchError, launchErrorFunc, appcontrol;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccess = t.step_func(function () {
        assert_unreached("application should not be run");
    });

    launchErrorFunc = t.step_func(function (error) {
        assert_unreached("launchAppControl() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    launchError = {onerror: launchErrorFunc};

    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.launchAppControl(appcontrol, null, launchSuccess, launchError);
    }, "exception should be thrown");

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_exist() {

//==== TEST: ApplicationManager_launchAppControl_exist
//==== LABEL Check if method launchAppControl exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "launchAppControl");
}, 'ApplicationManager_launchAppControl_exist');

}

function ApplicationManager_launchAppControl_missarg() {

//==== TEST: ApplicationManager_launchAppControl_missarg
//==== LABEL LaunchAppControl - check with missing non-optional argument
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.launchAppControl();
    }, "Method was called without arguments but exception was not thrown");
}, 'ApplicationManager_launchAppControl_missarg');

}

function ApplicationManager_launchAppControl_replyCallback_TypeMismatch() {

//==== TEST: ApplicationManager_launchAppControl_replyCallback_TypeMismatch
//==== LABEL Check optional argument 'onReply' type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_replyCallback_TypeMismatch', {timeout: 30000}),
    i, launchSuccess, launchError, appcontrol, conversionTable = getTypeConversionExceptions("object", true);

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccess = t.step_func(function () {
        assert_unreached("application should not be run");
    });

    launchError = t.step_func(function (error) {
        assert_unreached("launchAppControl() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.launchAppControl(appcontrol, null, launchSuccess, launchError, conversionTable[i][0]);
        }, "exception should be thrown");
    }

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_replyCallback_invalid_cb() {

//==== TEST: ApplicationManager_launchAppControl_replyCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onReply) was passed into launchAppControl method
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MTL

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_replyCallback_invalid_cb', {timeout: 30000}), i, launchSuccess, launchError, appcontrol, conversionTable;

setup_launch(t, TCT_APPCONTROL_APPID, function () {

    launchSuccess = t.step_func(function () {
        assert_unreached("application should not be run");
    });

    launchError = t.step_func(function (error) {
        assert_unreached("launchAppControl() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    conversionTable = getListenerConversionExceptions(["onsuccess", "onfailure"]);

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.launchAppControl(appcontrol, null, launchSuccess, launchError, conversionTable[i][0]);
        }, "exception should be thrown");
    }

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_successCallback_TypeMismatch() {

//==== TEST: ApplicationManager_launchAppControl_successCallback_TypeMismatch
//==== LABEL Check optional argument 'onSuccess' (launchAppControl) type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_successCallback_TypeMismatch', {timeout: 30000}),
    i, appcontrol, conversionTable = getTypeConversionExceptions("functionObject", true);

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.launchAppControl(appcontrol, null, conversionTable[i][0]);
        }, "exception should be thrown");
    }

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_successCallback_invalid_cb() {

//==== TEST: ApplicationManager_launchAppControl_successCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (onSuccess) was passed into launchAppControl method
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_successCallback_invalid_cb', {timeout: 30000}), launchSuccess, launchSuccessFunc, appcontrol;

setup_launch(t, TCT_APPCONTROL_APPID, function () {

    launchSuccessFunc = t.step_func(function () {
        assert_unreached("this function should not be used");
    });

    launchSuccess = { onsuccess: launchSuccessFunc };

    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.launchAppControl(appcontrol, null, launchSuccess);
    }, "exception should be thrown");

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_with_appControl_operation() {

//==== TEST: ApplicationManager_launchAppControl_with_appControl_operation
//==== LABEL Check using launchAppControl method (with operation of ApplicationControl) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MMINA MAST

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_with_appControl_operation', {timeout: 30000}),
    appcontrol;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    tizen.application.launchAppControl(appcontrol);

    assert_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_with_appControl_operation_mime() {

//==== TEST: ApplicationManager_launchAppControl_with_appControl_operation_mime
//==== LABEL Check using launchAppControl method (with operation and MIME type of ApplicationControl) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MMINA MAST

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_with_appControl_operation_mime', {timeout: 30000}),
    appcontrol;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION,
        null,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_MIME
    );

    tizen.application.launchAppControl(appcontrol);

    assert_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_with_appControl_operation_uri() {

//==== TEST: ApplicationManager_launchAppControl_with_appControl_operation_uri
//==== LABEL Check using launchAppControl method (with operation and URI of ApplicationControl) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MMINA MAST

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_with_appControl_operation_uri', {timeout: 30000}),
    appcontrol;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_URI
    );

    tizen.application.launchAppControl(appcontrol);

    assert_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_with_appControl_operation_uri_mime() {

//==== TEST: ApplicationManager_launchAppControl_with_appControl_operation_uri_mime
//==== LABEL Check using launchAppControl method (with operation, URI and MIME type of ApplicationControl) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MMINA MAST

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_with_appControl_operation_uri_mime', {timeout: 30000}),
    appcontrol;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_URI,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_MIME
    );

    tizen.application.launchAppControl(appcontrol);

    assert_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launchAppControl_with_errorCallback() {

//==== TEST: ApplicationManager_launchAppControl_with_errorCallback
//==== LABEL Check using launchAppControl method (with optional argument errorCallback) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MERRCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_with_errorCallback', {timeout: 30000}),
    launchSuccess, launchError, appcontrol;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccess = t.step_func(function () {
        assert_unreached("this function should not be used");
    });

    launchError = t.step_func(function () {
        assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
            t.done();
        });
    });

    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_URI,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_MIME_INVALID
    );

    tizen.application.launchAppControl(appcontrol, null, launchSuccess, launchError);
});

}

function ApplicationManager_launchAppControl_with_id() {

//==== TEST: ApplicationManager_launchAppControl_with_id
//==== LABEL Check using launchAppControl method with explicit application ID in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MOA MAST

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_with_id', {timeout: 30000}),
    appcontrol;

setup_launch(t, TCT_APPCONTROL_MOCK_APPID, function () {
    setup_launch(t, TCT_APPCONTROL_APPID, function () {
        appcontrol = new tizen.ApplicationControl(
            TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_OPERATION,
            TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_URI,
            TCT_APPCONTROL_LAUNCH_APPCONTROL_EXPLICIT_MIME
        );

        tizen.application.launchAppControl(appcontrol, TCT_APPCONTROL_APPID);

        assert_launch(t, TCT_APPCONTROL_APPID, function (context) {
            assert_not_launch(t, TCT_APPCONTROL_MOCK_APPID, function () {
                t.done();
            });
        });
    });
});

}

function ApplicationManager_launchAppControl_with_replyCallback() {

//==== TEST: ApplicationManager_launchAppControl_with_replyCallback
//==== LABEL Check using launchAppControl method (with optional argument replyCallback) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MOA

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_with_replyCallback', {timeout: 30000}),
    replyCallback, launchError, appcontrol;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    replyCallback = {
        onsuccess: t.step_func(function () {
            t.done();
        }),
        onfailure: t.step_func(function () {
            assert_unreached("Unexpected onfailure");
        })
    };

    launchError = t.step_func(function (error) {
        assert_unreached("launch fails: " + error.name + " with message: " + error.message);
    });

    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_REPLY_RESULT_OPERATION
    );

    tizen.application.launchAppControl(appcontrol, null, null, launchError, replyCallback);
});

}

function ApplicationManager_launchAppControl_with_successCallback() {

//==== TEST: ApplicationManager_launchAppControl_with_successCallback
//==== LABEL Check using launchAppControl method (with optional argument successCallback) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launchAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MOA MAST MR

setup({timeout: 30000});

var t = async_test('ApplicationManager_launchAppControl_with_successCallback', {timeout: 30000}),
    launchSuccess, appcontrol, retVal = null;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccess = t.step_func(function () {
        assert_equals(retVal, undefined, "incorrect returned value");
        assert_launch(t, TCT_APPCONTROL_APPID, function () {
            t.done();
        });
    });

    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION
    );

    retVal = tizen.application.launchAppControl(appcontrol, null, launchSuccess);
});

}

function ApplicationManager_launch_errorCallback_TypeMismatch() {

//==== TEST: ApplicationManager_launch_errorCallback_TypeMismatch
//==== LABEL Check optional argument 'onError' (launch) type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_launch_errorCallback_TypeMismatch', {timeout: 30000}),
    i, launchSuccess, conversionTable = getTypeConversionExceptions("functionObject", true);

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccess = t.step_func(function () {
        assert_unreached("application should not be run");
    });

    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.launch(TCT_APPCONTROL_APPID, launchSuccess, conversionTable[i][0]);
        }, "exception should was thrown");
    }

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launch_errorCallback_invalid_cb() {

//==== TEST: ApplicationManager_launch_errorCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (on error) was passed
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_launch_errorCallback_invalid_cb', {timeout: 30000}),
    launchSuccess, launchError, launchErrorFunc;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccess = t.step_func(function () {
        assert_unreached("application should not be run");
    });

    launchErrorFunc = t.step_func(function (error) {
        assert_unreached("launch() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    launchError = {onerror: launchErrorFunc};

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.launch(TCT_APPCONTROL_APPID, launchSuccess, launchError);
    }, "exception should be thrown");

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launch_exist() {

//==== TEST: ApplicationManager_launch_exist
//==== LABEL Check if method launch exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "launch");
}, 'ApplicationManager_launch_exist');

}

function ApplicationManager_launch_successCallback_TypeMismatch() {

//==== TEST: ApplicationManager_launch_successCallback_TypeMismatch
//==== LABEL Check optional argument 'onSuccess' (launch) type conversion
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MC

setup({timeout: 30000});

var t = async_test('ApplicationManager_launch_successCallback_TypeMismatch', {timeout: 30000}),
    i, conversionTable = getTypeConversionExceptions("functionObject", true);

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    for (i = 0; i < conversionTable.length; i++) {
        assert_throws({name: conversionTable[i][1]}, function () {
            tizen.application.launch(TCT_APPCONTROL_APPID, conversionTable[i][0]);
        }, "exception should be thrown");
    }

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launch_successCallback_invalid_cb() {

//==== TEST: ApplicationManager_launch_successCallback_invalid_cb
//==== LABEL Check if an exception was thrown when a fake callback (on success) was passed
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MTCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_launch_successCallback_invalid_cb', {timeout: 30000}),
    launchSuccess, launchSuccessFunc;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccessFunc = t.step_func(function () {
        assert_unreached("this function should not be used");
    });

    launchSuccess = { onsuccess: launchSuccessFunc };

    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.application.launch(TCT_APPCONTROL_APPID, launchSuccess);
    }, "exception should be thrown");

    assert_not_launch(t, TCT_APPCONTROL_APPID, function () {
        t.done();
    });
});

}

function ApplicationManager_launch_with_errorCallback() {

//==== TEST: ApplicationManager_launch_with_errorCallback
//==== LABEL Check using launch method (with optional argument errorCallback) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MERRCB

setup({timeout: 30000});

var t = async_test('ApplicationManager_launch_with_errorCallback', {timeout: 30000}),
    launchSuccess, launchError;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccess = t.step_func(function () {
        assert_unreached("this function should not be used");
    });

    launchError = t.step_func(function () {
        t.done();
    });

    tizen.application.launch(INVALID_APP_ID, launchSuccess, launchError);
});

}

function ApplicationManager_launch_with_successCallback() {

//==== TEST: ApplicationManager_launch_with_successCallback
//==== LABEL Check using launch method (with optional argument successCallback) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:launch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MOA MAST

setup({timeout: 30000});

var t = async_test('ApplicationManager_launch_with_successCallback', {timeout: 30000}),
    launchSuccess;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    launchSuccess = t.step_func(function () {
        assert_launch(t, TCT_APPCONTROL_APPID, function () {
            t.done();
        });
    });

    tizen.application.launch(TCT_APPCONTROL_APPID, launchSuccess);
});

}

function ApplicationManager_notexist() {

//==== TEST: ApplicationManager_notexist
//==== LABEL Check if ApplicationManager notexist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:ApplicationManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("ApplicationManager");
}, 'ApplicationManager_notexist');

}

function ApplicationManager_removeAppInfoEventListener() {

//==== TEST: ApplicationManager_removeAppInfoEventListener
//==== LABEL Check using removeAppInfoEventListener method (installation process) in ApplicationManager interface
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:removeAppInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MR

setup({timeout: 30000});

var t = async_test('ApplicationManager_removeAppInfoEventListener', {timeout: 30000}), appEventCallback, watchId, retVal;
t.step(function () {

    appEventCallback = {
        oninstalled: t.step_func(function () {
            assert_unreached("This function (oninstalled) should not be used");
        }),
        onupdated: t.step_func(function () {
            assert_unreached("This function (onupdated) should not be used");
        }),
        onuninstalled: t.step_func(function () {
            assert_unreached("This function (onuninstalled) should not be used");
        })
    };

    watchId = tizen.application.addAppInfoEventListener(appEventCallback);
    assert_type(watchId, "long", "wrong listener ID");
    retVal = tizen.application.removeAppInfoEventListener(watchId);
    assert_type(retVal, "undefined", "this method should return nothing");
    t.done();

});

}

function ApplicationManager_removeAppInfoEventListener_exist() {

//==== TEST: ApplicationManager_removeAppInfoEventListener_exist
//==== LABEL Check if method removeAppInfoEventListener exist
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:removeAppInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    check_method_exists(tizen.application, "removeAppInfoEventListener");
}, 'ApplicationManager_removeAppInfoEventListener_exist');

}

function ApplicationMetaData_extend() {

//==== TEST: ApplicationMetaData_extend
//==== LABEL Check if ApplicationMetaData can have new properties added
//==== SPEC: Tizen Web API:Application:Application:ApplicationMetaData:ApplicationMetaData U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX

test(function () {
    var metadata;

    metadata = tizen.application.getAppMetaData();
    assert_equals(metadata.length, 1, "Incorrect number of metadata.");
    check_extensibility(metadata[0]);

}, 'ApplicationMetaData_extend');

}

function ApplicationMetaData_key_attribute() {

//==== TEST: ApplicationMetaData_key_attribute
//==== LABEL Check if ApplicationMetaData have key attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationMetaData:key A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== TEST_CRITERIA AE AT ARO

test(function () {
    var metadata;
    metadata = tizen.application.getAppMetaData();

    assert_type(metadata, "array", "getAppMetaData should return array");
    assert_equals(metadata.length, 1, "Incorrect number of metadata.");

    assert_true("key" in metadata[0], "AplicationInformation should have iconPath attribute");
    check_readonly(metadata[0], "key", METADATA_KEY, "string", "dummy");
}, 'ApplicationMetaData_key_attribute');

}

function ApplicationMetaData_notexist() {

//==== TEST: ApplicationMetaData_notexist
//==== LABEL Check if ApplicationMetaData cannot be called as a function or in new expression
//==== SPEC Tizen Web API:Application:Application:ApplicationMetaData:ApplicationMetaData U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("ApplicationMetaData");
}, 'ApplicationMetaData_notexist');

}

function ApplicationMetaData_value_attribute() {

//==== TEST: ApplicationMetaData_value_attribute
//==== LABEL Check if ApplicationMetaData have value attribute with proper type, readonly, not null
//==== SPEC: Tizen Web API:Application:Application:ApplicationMetaData:value A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== TEST_CRITERIA AE AT ARO

test(function () {
    var metadata;
    metadata = tizen.application.getAppMetaData();

    assert_type(metadata, "array", "getAppMetaData should return array");
    assert_equals(metadata.length, 1, "Incorrect number of metadata.");

    assert_true("value" in metadata[0], "ApplicationMetaData should have value attribute");
    check_readonly(metadata[0], "value", METADATA_VALUE, "string", "dummy");

}, 'ApplicationMetaData_value_attribute');

}

function Application_ContextId_attribute() {

//==== TEST: Application_ContextId_attribute
//==== LABEL Check attribute Application::ContextId existence and type
//==== SPEC Tizen Web API:Application:Application:Application:contextId A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO

test(function () {
    var app = tizen.application.getCurrentApplication();
    assert_true("contextId" in app, "contextId doesn't exist in provided object");
    check_readonly(app, "contextId", app.contextId, "string", "dummyValue");
}, 'Application_ContextId_attribute');

}

function Application_appInfo_attribute() {

//==== TEST: Application_appInfo_attribute
//==== LABEL Check attribute Application::appInfo existence and type
//==== SPEC Tizen Web API:Application:Application:Application:appInfo A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var app = tizen.application.getCurrentApplication();
    assert_true("appInfo" in app, "appInfo doesn't exist in provided object");
    assert_type(app.appInfo, "object", "unexpected type");
    assert_true("id" in app.appInfo, "no id in ApplicationInformation");
    assert_true("name" in app.appInfo, "no name in ApplicationInformation");
    assert_true("iconPath" in app.appInfo, "no iconPath in ApplicationInformation");
    assert_true("version" in app.appInfo, "no version in ApplicationInformation");
    assert_true("show" in app.appInfo, "no show in ApplicationInformation");
    assert_true("categories" in app.appInfo, "no categories in ApplicationInformation");
    assert_true("installDate" in app.appInfo, "no installDate in ApplicationInformation");
    assert_true("size" in app.appInfo, "no size in ApplicationInformation");
    assert_true("packageId" in app.appInfo, "no packageId in ApplicationInformation");
    assert_equals(app.appInfo.id, THIS_APP_ID, "wrong ApplicationInformation");
    app.appInfo = tizen.application.getAppInfo(TCT_APPCONTROL_APPID);
    assert_equals(app.appInfo.id, THIS_APP_ID, "ApplicationInformation can be modified");
}, 'Application_appInfo_attribute');

}

function Application_exit() {

//==== TEST: Application_exit
//==== LABEL Check using exit method (with non-optional arguments) in Application interface
//==== SPEC Tizen Web API:Application:Application:Application:exit M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MNA MNAST

setup({timeout: 30000});

var t = async_test('Application_exit', {timeout: 30000}),
    timeout = 1000, replyCallback, launchError, appcontrol;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    replyCallback = {
        onsuccess: t.step_func(function () {
            setTimeout(function () {
                assert_exit(t, TCT_APPCONTROL_APPID, function () {
                    t.done();
                });
            }, timeout);
        }),
        onfailure: t.step_func(function () {
            assert_unreached("Unexpected onfailure");
        })
    };

    launchError = t.step_func(function (error) {
        assert_unreached("launch fails: " + error.name + " with message: " + error.message);
    });

    appcontrol = new tizen.ApplicationControl(
        TCT_APPCONTROL_EXIT_OPERATION,
        null,
        null,
        null,
        [ new tizen.ApplicationControlData("timeout", [timeout.toString()])]
    );

    tizen.application.launchAppControl(appcontrol, null, null, launchError, replyCallback);
});

}

function Application_exit_exist() {

//==== TEST: Application_exit_exist
//==== LABEL Check if method Application.exit exist
//==== SPEC Tizen Web API:Application:Application:Application:exit M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    var app = tizen.application.getCurrentApplication();
    check_method_exists(app, "exit");
}, 'Application_exit_exist');

}

function Application_extend() {

//==== TEST: Application_extend
//==== LABEL Check if Application possible extend
//==== SPEC Tizen Web API:Application:Application:Application:Application U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBX

test(function () {
    var app = tizen.application.getCurrentApplication();
    check_extensibility(app);
}, 'Application_extend');

}

function Application_getRequestedAppControl() {

//==== TEST: Application_getRequestedAppControl
//==== LABEL Check using getRequestedAppControl method (with non-optional arguments) in Application interface
//==== SPEC Tizen Web API:Application:Application:Application:getRequestedAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MNA MR

/**
 * Function below only invokes test in TCTAppControl application.
 * Actually tests are in support/TCTAppControl/tests directory.
 */
runTestAtTCTAppControl("Application_getRequestedAppControl");

}

function Application_getRequestedAppControl_exist() {

//==== TEST: Application_getRequestedAppControl_exist
//==== LABEL Check if method Application.getRequestedAppControl exist
//==== SPEC Tizen Web API:Application:Application:Application:getRequestedAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    var app = tizen.application.getCurrentApplication();
    check_method_exists(app, "getRequestedAppControl");
}, 'Application_getRequestedAppControl_exist');

}

function Application_getRequestedAppControl_extra_argument() {

//==== TEST: Application_getRequestedAppControl_extra_argument
//==== LABEL Check using getRequestedAppControl method (with extra argument) in Application interface
//==== SPEC Tizen Web API:Application:Application:Application:getRequestedAppControl M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MNAEX MR

/**
 * Function below only invokes test in TCTAppControl application.
 * Actually tests are in support/TCTAppControl/tests directory.
 */
runTestAtTCTAppControl("Application_getRequestedAppControl_extra_argument");

}

function Application_hide() {

//==== TEST: Application_hide
//==== LABEL Check using hide method (with non-optional arguments) in Application interface
//==== SPEC Tizen Web API:Application:Application:Application:hide M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MNA MR

/**
 * Function below only invokes test in TCTAppControl application.
 * Actually tests are in support/TCTAppControl/tests directory.
 */
runTestAtTCTAppControl("Application_hide");

}

function Application_hide_exist() {

//==== TEST: Application_hide_exist
//==== LABEL Check if method Application.hide exist
//==== SPEC Tizen Web API:Application:Application:Application:hide M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P0
//==== TEST_CRITERIA ME

test(function () {
    var app = tizen.application.getCurrentApplication();
    check_method_exists(app, "hide");
}, 'Application_hide_exist');

}

function Application_hide_extra_argument() {

//==== TEST: Application_hide_extra_argument
//==== LABEL Check using hide method (with extra arguments) in Application interface
//==== SPEC Tizen Web API:Application:Application:Application:hide M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MNAEX

/**
 * Function below only invokes test in TCTAppControl application.
 * Actually tests are in support/TCTAppControl/tests directory.
 */
runTestAtTCTAppControl("Application_hide_extra_argument");

}

function Application_notexist() {

//==== TEST: Application_notexist
//==== LABEL Check if Application notexist
//==== SPEC Tizen Web API:Application:Application:Application:Application U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("Application");
}, 'Application_notexist');

}

function FindAppControlSuccessCallback_notexist() {

//==== TEST: FindAppControlSuccessCallback_notexist
//==== LABEL Check if FindAppControlSuccessCallback cannot be called as a function or in new expression
//==== SPEC Tizen Web API:Application:Application:FindAppControlSuccessCallback:FindAppControlSuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA CBNIO

test(function () {
    check_no_interface_object("FindAppControlSuccessCallback");
}, 'FindAppControlSuccessCallback_notexist');

}

function FindAppControlSuccessCallback_onsuccess() {

//==== TEST: FindAppControlSuccessCallback_onsuccess
//==== LABEL Check if FindAppControlSuccessCallback onsuccess is called and if its arguments have proper type
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Application:Application:FindAppControlSuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== TEST_CRITERIA CBOA CBT

setup({timeout: 30000});

var t = async_test('FindAppControlSuccessCallback_onsuccess', {timeout: 30000}),
    findSuccess, findError, info, control, tmp, i;

t.step(function () {
    control = new tizen.ApplicationControl(
        TCT_APPCONTROL_LAUNCH_APPCONTROL_OPERATION,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_URI,
        TCT_APPCONTROL_LAUNCH_APPCONTROL_MIME
    );

    findSuccess = t.step_func(function (informationArray, appControl) {
        assert_type(informationArray, "array", "wrong type of invoked callback argument");
        assert_true(informationArray.length > 0, "informationArray was not found");

        info = informationArray[0];
        assert_true("id" in info, "ApplicationInformation should have id property");
        check_readonly(info, "id", info.id, "string", "dummy");
        assert_true("name" in info, "ApplicationInformation should have name property");
        check_readonly(info, "name", info.name, "string", "dummy");
        assert_true("iconPath" in info, "ApplicationInformation should have iconPath property");
        check_readonly(info, "iconPath", info.iconPath, "string", "dummy");
        assert_true("version" in info, "ApplicationInformation should have version property");
        check_readonly(info, "version", info.version, "string", "dummy");
        assert_true("show" in info, "ApplicationInformation should have show property");
        check_readonly(info, "show", info.show, "boolean", !info.show);

        assert_type(info.categories, "array", "categories should be an array");
        tmp = info.categories;
        info.categories = ["one", "two"];
        assert_equals(info.categories.length, tmp.length, "categories is not readonly");
        for(i = 0; i < tmp.length; i++) {
            assert_type(info.categories[i], "string", "categories items sould be a string");
            assert_equals(info.categories[i], tmp[i], "categories is not readonly");
        }

        assert_type(info.installDate, "date", "installDate should be a date");
        tmp = info.installDate;
        info.installDate = new Date();
        assert_equals(info.installDate.getTime(), tmp.getTime(), "values are different");

        assert_true("size" in info, "ApplicationInformation should have size property");
        check_readonly(info, "size", info.size, "number", 2 + 3 * info.size / 2);
        assert_true("packageId" in info, "ApplicationInformation should have packageId property");
        check_readonly(info, "packageId", info.packageId, "string", "dummy");

        assert_true("operation" in appControl, "ApplicationControl should have operation property");
        check_attribute(appControl, "operation", appControl.operation, "string", "dummy");
        assert_true("uri" in appControl, "ApplicationControl should have uri property");
        check_attribute(appControl, "uri", appControl.uri, "string", "dummy");
        assert_true("mime" in appControl, "ApplicationControl should have mime property");
        check_attribute(appControl, "mime", appControl.mime, "string", "dummy");
        assert_true("category" in appControl, "ApplicationControl should have category property");
        check_attribute(appControl, "category", appControl.category, "string", "dummy");
        assert_true("data" in appControl, "ApplicationControl should have data property");
        assert_type(appControl.data, "array", "data in appControl has wrong type");

        t.done();
    });

    findError = t.step_func(function (error) {
        assert_unreached("errorCallback called:" + error.message);
    });

    tizen.application.findAppControl(control, findSuccess, findError);
});

}

function RequestedApplicationControl_appControl_attribute() {

//==== TEST: RequestedApplicationControl_appControl_attribute
//==== LABEL Check if RequestedApplicationControl have appControl attribute with proper type, writable, not null
//==== SPEC: Tizen Web API:Application:Application:RequestedApplicationControl:appControl A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA AE AT ARO

/**
 * Function below only invokes test in TCTAppControl application.
 * Actually tests are in support/TCTAppControl/tests directory.
 */
runTestAtTCTAppControl("RequestedApplicationControl_appControl_attribute");

}

function RequestedApplicationControl_callerAppId_attribute() {

//==== TEST: RequestedApplicationControl_callerAppId_attribute
//==== LABEL Check if RequestedApplicationControl have callerAppId attribute with proper type, writable, not null
//==== SPEC: Tizen Web API:Application:Application:RequestedApplicationControl:callerAppId A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA AE AT ARO

/**
 * Function below only invokes test in TCTAppControl application.
 * Actually tests are in support/TCTAppControl/tests directory.
 */
runTestAtTCTAppControl("RequestedApplicationControl_callerAppId_attribute");

}

function RequestedApplicationControl_extend() {

//==== TEST: RequestedApplicationControl_extend
//==== LABEL Check if RequestedApplicationControl can have new properties added
//==== SPEC: Tizen Web API:Application:Application:RequestedApplicationControl:RequestedApplicationControl U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA OBX

/**
 * Function below only invokes test in TCTAppControl application.
 * Actually tests are in support/TCTAppControl/tests directory.
 */
runTestAtTCTAppControl("RequestedApplicationControl_extend");

}

function RequestedApplicationControl_notexist() {

//==== TEST: RequestedApplicationControl_notexist
//==== LABEL Check if RequestedApplicationControl cannot be called as a function or in new expression
//==== SPEC Tizen Web API:Application:Application:RequestedApplicationControl:RequestedApplicationControl U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("RequestedApplicationControl");
}, 'RequestedApplicationControl_notexist');

}

function RequestedApplicationControl_replyFailure() {
//==== TEST: RequestedApplicationControl_replyFailure
//==== LABEL Check if RequestedApplicationControl method replyFailure works properly
//==== SPEC: Tizen Web API:Application:Application:RequestedApplicationControl:replyFailure M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MNA

setup({timeout: 30000});

var t = async_test('RequestedApplicationControl_replyFailure', {timeout: 30000}),
    appControl, replyCallback, onError;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    appControl = new tizen.ApplicationControl(
                        TCT_APPCONTROL_REPLY_FAILURE_OPERATION,
                        null,
                        null,
                        null,
                        [ new tizen.ApplicationControlData("testName", [ t.name ]) ]);

    onError = t.step_func(function (err) {
        assert_unreached("errorCallback called: " + err.message);
    });

    replyCallback = {
        onsuccess: t.step_func(function () {
            assert_unreached("onsuccess callback called");
        }),

        onfailure: t.step_func(function () {
            t.done();
        })
    };

    tizen.application.launchAppControl(appControl, null, null, onError, replyCallback);
});

}

function RequestedApplicationControl_replyFailure_exist() {

//==== TEST: RequestedApplicationControl_replyFailure_exist
//==== LABEL Check if replyFailure exists
//==== SPEC: Tizen Web API:Application:Application:RequestedApplicationControl:replyFailure M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA ME

/**
 * Function below only invokes test in TCTAppControl application.
 * Actually tests are in support/TCTAppControl/tests directory.
 */
runTestAtTCTAppControl("RequestedApplicationControl_replyFailure_exist");

}

function RequestedApplicationControl_replyFailure_extra_argument() {

//==== TEST: RequestedApplicationControl_replyFailure_extra_argument
//==== LABEL Check if replyFailure method can be invoked with extra argument
//==== SPEC Tizen Web API:Application:Application:RequestedApplicationControl:replyFailure M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MNAEX

setup({timeout: 30000});

var t = async_test('RequestedApplicationControl_replyFailure_extra_argument', {timeout: 30000}),
    appControl, replyCallback, onError;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    appControl = new tizen.ApplicationControl(
                        TCT_APPCONTROL_REPLY_FAILURE_OPERATION,
                        null,
                        null,
                        null,
                        [ new tizen.ApplicationControlData("testName", [ t.name ]) ]);

    onError = t.step_func(function (err) {
        assert_unreached("errorCallback called: " + err.message);
    });

    replyCallback = {
        onsuccess: t.step_func(function () {
            assert_unreached("onsuccess callback called");
        }),

        onfailure: t.step_func(function () {
            t.done();
        })
    };

    tizen.application.launchAppControl(appControl, null, null, onError, replyCallback);
});

}

function RequestedApplicationControl_replyResult() {

//==== TEST: RequestedApplicationControl_replyResult
//==== LABEL Check if RequestedApplicationControl method replyResult works properly
//==== SPEC: Tizen Web API:Application:Application:RequestedApplicationControl:replyResult M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MMINA

setup({timeout: 30000});

var t = async_test('RequestedApplicationControl_replyResult', {timeout: 30000}),
    appControl, replyCallback, onerror;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    appControl = new tizen.ApplicationControl(TCT_APPCONTROL_REPLY_RESULT_OPERATION);

    onerror = t.step_func(function (err) {
        assert_unreached("errorCallback called: " + err.message);
    });

    replyCallback = {
        onsuccess: t.step_func(function () {
            t.done();
        }),

        onfailure: t.step_func(function () {
            assert_unreached("onfailure callback called");
        })
    };

    tizen.application.launchAppControl(appControl, null, null, onerror, replyCallback);
});

}

function RequestedApplicationControl_replyResult_data_TypeMismatch() {

//==== TEST: RequestedApplicationControl_replyResult_data_TypeMismatch
//==== LABEL Check if replyResult throws exception when data is incorrect
//==== SPEC Tizen Web API:Application:Application:RequestedApplicationControl:replyResult M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P2
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MC

/**
 * Function below only invokes test in TCTAppControl application.
 * Actually tests are in support/TCTAppControl/tests directory.
 */
runTestAtTCTAppControl("RequestedApplicationControl_replyResult_data_TypeMismatch");

}

function RequestedApplicationControl_replyResult_exist() {
//==== TEST: RequestedApplicationControl_replyResult_exist
//==== LABEL Check if replyResult exists
//==== SPEC: Tizen Web API:Application:Application:RequestedApplicationControl:replyResult M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA ME

/**
 * Function below only invokes test in TCTAppControl application.
 * Actually tests are in support/TCTAppControl/tests directory.
 */
runTestAtTCTAppControl("RequestedApplicationControl_replyResult_exist");

}

function RequestedApplicationControl_replyResult_with_data() {

//==== TEST: RequestedApplicationControl_replyResult_with_data
//==== LABEL Check if RequestedApplicationControl method replyCallback called with data param works properly
//==== SPEC: Tizen Web API:Application:Application:RequestedApplicationControl:replyResult M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== TEST_CRITERIA MOA MAST

setup({timeout: 30000});

var t = async_test('RequestedApplicationControl_replyResult_with_data', {timeout: 30000}),
    appControl, replyCallback, onerror, sentData;

setup_launch(t, TCT_APPCONTROL_APPID, function () {
    sentData = new tizen.ApplicationControlData("key1", ["data1"]);

    appControl = new tizen.ApplicationControl(TCT_APPCONTROL_REPLY_RESULT_WITH_DATA_OPERATION,
                                                null,
                                                null,
                                                null,
                                                [sentData]);

    onerror = t.step_func(function (err) {
        assert_unreached("errorCallback called: " + err.message);
    });

    replyCallback = {
        onsuccess: t.step_func(function (data) {
            assert_true(data.length > 0, "data was not sent");
            assert_equals(data[0].key, sentData.key, "values sent and received are different");
            assert_equals(data[0].value[0], sentData.value[0], "values sent and received are different");
            t.done();
        }),

        onfailure: t.step_func(function () {
            assert_unreached("onfailure callback called");
        })
    };

    tizen.application.launchAppControl(appControl, null, null, onerror, replyCallback);
});

}

function ApplicationInformationEventCallback_oninstalled() {

//==== TEST: ApplicationInformationEventCallback_oninstalled
//==== LABEL Check argument passed into method which is oninstalled listener in ApplicationInformationEventCallback
//==== SPEC Tizen Web API:Application:Application:ApplicationInformationEventCallback:oninstalled M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRE Make sure that TCTAppInfoEventTest1 application is not installed (uninstall it)
//==== STEP Click run and install TCTAppInfoEventTest1.wgt application from My files app (Phone/Others directory).
//==== EXPECT Pass
//==== EXECUTION_TYPE manual
//==== PRIORITY P1
//==== TEST_CRITERIA CBT CBOA

setup({timeout: 300000});

var t = async_test('ApplicationInformationEventCallback_oninstalled', {timeout: 300000}), appEventCallback, watchId;

t.step(function () {

    appEventCallback = {
        oninstalled: t.step_func(function (appInfo) {
            assert_type(appInfo, "object", "wrong type of received value");
            assert_true("id" in appInfo, "no id in returned value");
            assert_true("name" in appInfo, "no name in returned value");
            assert_true("iconPath" in appInfo, "no iconPath in returned value");
            assert_true("version" in appInfo, "no version in returned value");
            assert_true("show" in appInfo, "no show in returned value");
            assert_true("categories" in appInfo, "no categories in returned value");
            assert_true("installDate" in appInfo, "no installDate in returned value");
            assert_true("size" in appInfo, "no size in returned value");
            assert_true("packageId" in appInfo, "no packageId in returned value");
            assert_equals(appInfo.id, APP_INFO_TEST_APP_ID, "wrong ApplicationInformation was returned");
            t.done();
        }),
        onupdated: t.step_func(function () {
            assert_unreached("This function (onupdated) should not be used");
        }),
        onuninstalled: t.step_func(function () {
            assert_unreached("This function (onuninstalled) should not be used");
        })
    };

    watchId = tizen.application.addAppInfoEventListener(appEventCallback);
    assert_type(watchId, "long", "wrong listener ID");

    alert("Install the appliction, command: pkgcmd -i -t wgt -q -p /opt/usr/media/Downloads/TCTAppInfoEventTest1.wgt");
});

}

function ApplicationInformationEventCallback_onupdated() {

//==== TEST: ApplicationInformationEventCallback_onupdated
//==== LABEL Check argument passed into method which is onupdated listener in ApplicationInformationEventCallback
//==== SPEC Tizen Web API:Application:Application:ApplicationInformationEventCallback:onupdated M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRE Make sure that TCTAppInfoEventTest1 application is installed (you can install it from My files app (Phone/Others directory)).
//==== STEP Click run and install TCTAppInfoEventTest2.wgt application from My files app (Phone/Others directory).
//==== EXPECT Pass
//==== EXECUTION_TYPE manual
//==== PRIORITY P1
//==== TEST_CRITERIA CBT CBOA

setup({timeout: 300000});

var t = async_test('ApplicationInformationEventCallback_onupdated', {timeout: 300000}), appEventCallback, watchId;

t.step(function () {

    appEventCallback = {
        oninstalled: t.step_func(function () {
            assert_unreached("This function (oninstalled) should not be used");
        }),
        onupdated: t.step_func(function (appInfo) {
            assert_type(appInfo, "object", "wrong type of received value");
            assert_true("id" in appInfo, "no id in returned value");
            assert_true("name" in appInfo, "no name in returned value");
            assert_true("iconPath" in appInfo, "no iconPath in returned value");
            assert_true("version" in appInfo, "no version in returned value");
            assert_true("show" in appInfo, "no show in returned value");
            assert_true("categories" in appInfo, "no categories in returned value");
            assert_true("installDate" in appInfo, "no installDate in returned value");
            assert_true("size" in appInfo, "no size in returned value");
            assert_true("packageId" in appInfo, "no packageId in returned value");
            assert_equals(appInfo.id, APP_INFO_TEST_APP_ID, "wrong ApplicationInformation was returned");
            t.done();
        }),
        onuninstalled: t.step_func(function () {
            assert_unreached("This function (onuninstalled) should not be used");
        })
    };

    watchId = tizen.application.addAppInfoEventListener(appEventCallback);
    assert_type(watchId, "long", "wrong listener ID");

    alert("Install the appliction, command: pkgcmd -i -t wgt -q -p /opt/usr/media/Downloads/TCTAppInfoEventTest2.wgt");

});

}

function ApplicationInformationEventCallback_onuninstalled() {

//==== TEST: ApplicationInformationEventCallback_onuninstalled
//==== LABEL Check argument passed into method which is onuninstalled listener in ApplicationInformationEventCallback
//==== SPEC Tizen Web API:Application:Application:ApplicationInformationEventCallback:onuninstalled M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRE Make sure that TCTAppInfoEventTest1 application is installed (you can install it from My files app (Phone/Others directory)).
//==== STEP Click run and uninstall TCTAppInfoEventTest1 application.
//==== EXPECT Pass
//==== EXECUTION_TYPE manual
//==== PRIORITY P1
//==== TEST_CRITERIA CBT CBOA

setup({timeout: 300000});

var t = async_test('ApplicationInformationEventCallback_onuninstalled', {timeout: 300000}), appEventCallback, watchId;

t.step(function () {

    appEventCallback = {
        oninstalled: t.step_func(function () {
            assert_unreached("This function (oninstalled) should not be used");
        }),
        onupdated: t.step_func(function () {
            assert_unreached("This function (onupdated) should not be used");
        }),
        onuninstalled: t.step_func(function (appId) {
            assert_type(appId, "string", "wrong type of received value");
            assert_equals(appId, APP_INFO_TEST_APP_ID, "wrong ApplicationId was returned");
            t.done();
        })
    };

    watchId = tizen.application.addAppInfoEventListener(appEventCallback);
    assert_type(watchId, "long", "wrong listener ID");

    alert("Uninstall the appliction, command: pkgcmd -u -n api1appli3");
});

}

function ApplicationManager_addAppInfoEventListener_oninstalled() {

//==== TEST: ApplicationManager_addAppInfoEventListener_oninstalled
//==== LABEL Check using addAppInfoEventListener method (installation process) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:addAppInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRE Make sure that TCTAppInfoEventTest1 application is not installed (uninstall it)
//==== STEP Click run and install TCTAppInfoEventTest1.wgt application from My files app (Phone/Others directory).
//==== EXPECT Pass
//==== EXECUTION_TYPE manual
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MAST MR

setup({timeout: 300000});

var t = async_test('ApplicationManager_addAppInfoEventListener_oninstalled', {timeout: 300000}), appEventCallback, watchId;
t.step(function () {

    appEventCallback = {
        oninstalled: t.step_func(function () {
            t.done();
        }),
        onupdated: t.step_func(function () {
            assert_unreached("This function (onupdated) should not be used");
        }),
        onuninstalled: t.step_func(function () {
            assert_unreached("This function (onuninstalled) should not be used");
        })
    };

    watchId = tizen.application.addAppInfoEventListener(appEventCallback);
    assert_type(watchId, "long", "wrong listener ID");

    alert("Install the appliction, command: pkgcmd -i -t wgt -q -p /opt/usr/media/Downloads/TCTAppInfoEventTest1.wgt");
});

}

function ApplicationManager_addAppInfoEventListener_onupdated() {

//==== TEST: ApplicationManager_addAppInfoEventListener_onupdated
//==== LABEL Check using addAppInfoEventListener method (updating process) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:addAppInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRE Make sure that TCTAppInfoEventTest1 application is installed (you can install it from My files app (Phone/Others directory)).
//==== STEP Click run and install TCTAppInfoEventTest2.wgt application from My files app (Phone/Others directory).
//==== EXPECT Pass
//==== EXECUTION_TYPE manual
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MAST MR

setup({timeout: 300000});

var t = async_test('ApplicationManager_addAppInfoEventListener_onupdated', {timeout: 300000}), appEventCallback, watchId;
t.step(function () {

    appEventCallback = {
        oninstalled: t.step_func(function () {
            assert_unreached("This function (oninstalled) should not be used");
        }),
        onupdated: t.step_func(function () {
            t.done();
        }),
        onuninstalled: t.step_func(function () {
            assert_unreached("This function (onuninstalled) should not be used");
        })
    };

    watchId = tizen.application.addAppInfoEventListener(appEventCallback);
    assert_type(watchId, "long", "wrong listener ID");

    alert("Install the appliction, command: pkgcmd -i -t wgt -q -p /opt/usr/media/Downloads/TCTAppInfoEventTest2.wgt");
});

}

function ApplicationManager_addAppInfoEventListener_onuninstalled() {

//==== TEST: ApplicationManager_addAppInfoEventListener_onuninstalled
//==== LABEL Check using addAppInfoEventListener method (deinstallation process) in ApplicationManager interface
//==== SPEC Tizen Web API:Application:Application:ApplicationManager:addAppInfoEventListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/application.html
//==== PRE Make sure that TCTAppInfoEventTest1 application is installed (you can install it from My files app (Phone/Others directory)).
//==== STEP Click run and uninstall TCTAppInfoEventTest1 application.
//==== EXPECT Pass
//==== EXECUTION_TYPE manual
//==== PRIORITY P1
//==== TEST_CRITERIA MMINA MAST MR

setup({timeout: 300000});

var t = async_test('ApplicationManager_addAppInfoEventListener_onuninstalled', {timeout: 300000}), appEventCallback, watchId;
t.step(function () {

    appEventCallback = {
        oninstalled: t.step_func(function () {
            assert_unreached("This function (onupdated) should not be used");
        }),
        onupdated: t.step_func(function () {
            assert_unreached("This function (onupdated) should not be used");
        }),
        onuninstalled: t.step_func(function () {
            t.done();
        })
    };

    watchId = tizen.application.addAppInfoEventListener(appEventCallback);
    assert_type(watchId, "long", "wrong listener ID");

    alert("Uninstall the appliction, command: pkgcmd -u -n api1appli3");
});

}

var moduleName = "tct-application-tizen-tests";
add_test_case(moduleName, ApplicationCertificate_extend);
add_test_case(moduleName, ApplicationCertificate_notexist);
add_test_case(moduleName, ApplicationCertificate_type_attribute);
add_test_case(moduleName, ApplicationCertificate_value_attribute);
add_test_case(moduleName, ApplicationContextArraySuccessCallback_notexist);
add_test_case(moduleName, ApplicationContextArraySuccessCallback_onsuccess);
add_test_case(moduleName, ApplicationContext_appId_attribute);
add_test_case(moduleName, ApplicationContext_extend);
add_test_case(moduleName, ApplicationContext_id_attribute);
add_test_case(moduleName, ApplicationContext_notexist);
add_test_case(moduleName, ApplicationControlDataArrayReplyCallback_notexist);
add_test_case(moduleName, ApplicationControlDataArrayReplyCallback_onfailure);
add_test_case(moduleName, ApplicationControlDataArrayReplyCallback_onsuccess);
add_test_case(moduleName, ApplicationControlData_constructor);
add_test_case(moduleName, ApplicationControlData_exist);
add_test_case(moduleName, ApplicationControlData_extend);
add_test_case(moduleName, ApplicationControlData_key_attribute);
add_test_case(moduleName, ApplicationControlData_value_attribute);
add_test_case(moduleName, ApplicationControl_category_attribute);
add_test_case(moduleName, ApplicationControl_constructor);
add_test_case(moduleName, ApplicationControl_constructor_minargs);
add_test_case(moduleName, ApplicationControl_data_attribute);
add_test_case(moduleName, ApplicationControl_exist);
add_test_case(moduleName, ApplicationControl_extend);
add_test_case(moduleName, ApplicationControl_mime_attribute);
add_test_case(moduleName, ApplicationControl_operation_attribute);
add_test_case(moduleName, ApplicationControl_uri_attribute);
add_test_case(moduleName, ApplicationInformationArraySuccessCallback_notexist);
add_test_case(moduleName, ApplicationInformationArraySuccessCallback_onsuccess);
add_test_case(moduleName, ApplicationInformationEventCallback_notexist);
add_test_case(moduleName, ApplicationInformation_categories_attribute);
add_test_case(moduleName, ApplicationInformation_extend);
add_test_case(moduleName, ApplicationInformation_iconPath_attribute);
add_test_case(moduleName, ApplicationInformation_id_attribute);
add_test_case(moduleName, ApplicationInformation_installDate_attribute);
add_test_case(moduleName, ApplicationInformation_name_attribute);
add_test_case(moduleName, ApplicationInformation_notexist);
add_test_case(moduleName, ApplicationInformation_packageId_attribute);
add_test_case(moduleName, ApplicationInformation_show_attribute);
add_test_case(moduleName, ApplicationInformation_size_attribute);
add_test_case(moduleName, ApplicationInformation_version_attribute);
add_test_case(moduleName, ApplicationManagerObject_notexist);
add_test_case(moduleName, ApplicationManager_addAppInfoEventListener_eventCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_addAppInfoEventListener_eventCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_addAppInfoEventListener_exist);
add_test_case(moduleName, ApplicationManager_addAppInfoEventListener_missarg);
add_test_case(moduleName, ApplicationManager_extend);
add_test_case(moduleName, ApplicationManager_findAppControl);
add_test_case(moduleName, ApplicationManager_findAppControl_appControl_TypeMismatch);
add_test_case(moduleName, ApplicationManager_findAppControl_appControl_invalid_obj);
add_test_case(moduleName, ApplicationManager_findAppControl_errorCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_findAppControl_errorCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_findAppControl_exist);
add_test_case(moduleName, ApplicationManager_findAppControl_missarg);
add_test_case(moduleName, ApplicationManager_findAppControl_successCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_findAppControl_successCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_findAppControl_successCallback_missarg);
add_test_case(moduleName, ApplicationManager_findAppControl_with_errorCallback);
add_test_case(moduleName, ApplicationManager_getAppCerts);
add_test_case(moduleName, ApplicationManager_getAppCerts_exist);
add_test_case(moduleName, ApplicationManager_getAppCerts_with_id);
add_test_case(moduleName, ApplicationManager_getAppContext);
add_test_case(moduleName, ApplicationManager_getAppContext_exist);
add_test_case(moduleName, ApplicationManager_getAppContext_with_contextId);
add_test_case(moduleName, ApplicationManager_getAppInfo);
add_test_case(moduleName, ApplicationManager_getAppInfo_exist);
add_test_case(moduleName, ApplicationManager_getAppInfo_with_id);
add_test_case(moduleName, ApplicationManager_getAppMetaData);
add_test_case(moduleName, ApplicationManager_getAppMetaData_exist);
add_test_case(moduleName, ApplicationManager_getAppMetaData_with_id);
add_test_case(moduleName, ApplicationManager_getAppSharedURI);
add_test_case(moduleName, ApplicationManager_getAppSharedURI_exist);
add_test_case(moduleName, ApplicationManager_getAppSharedURI_with_id);
add_test_case(moduleName, ApplicationManager_getAppsContext);
add_test_case(moduleName, ApplicationManager_getAppsContext_errorCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_getAppsContext_errorCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_getAppsContext_exist);
add_test_case(moduleName, ApplicationManager_getAppsContext_missarg);
add_test_case(moduleName, ApplicationManager_getAppsContext_successCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_getAppsContext_successCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_getAppsContext_with_errorCallback);
add_test_case(moduleName, ApplicationManager_getAppsInfo);
add_test_case(moduleName, ApplicationManager_getAppsInfo_errorCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_getAppsInfo_errorCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_getAppsInfo_exist);
add_test_case(moduleName, ApplicationManager_getAppsInfo_missarg);
add_test_case(moduleName, ApplicationManager_getAppsInfo_successCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_getAppsInfo_successCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_getAppsInfo_with_errorCallback);
add_test_case(moduleName, ApplicationManager_getCurrentApplication);
add_test_case(moduleName, ApplicationManager_getCurrentApplication_exist);
add_test_case(moduleName, ApplicationManager_getCurrentApplication_extra_argument);
add_test_case(moduleName, ApplicationManager_in_tizen);
add_test_case(moduleName, ApplicationManager_kill);
add_test_case(moduleName, ApplicationManager_kill_errorCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_kill_errorCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_kill_exist);
add_test_case(moduleName, ApplicationManager_kill_successCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_kill_successCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_kill_with_errorCallback);
add_test_case(moduleName, ApplicationManager_kill_with_successCallback);
add_test_case(moduleName, ApplicationManager_launch);
add_test_case(moduleName, ApplicationManager_launchAppControl_appControl_TypeMismatch);
add_test_case(moduleName, ApplicationManager_launchAppControl_appControl_invalid_obj);
add_test_case(moduleName, ApplicationManager_launchAppControl_errorCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_launchAppControl_errorCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_launchAppControl_exist);
add_test_case(moduleName, ApplicationManager_launchAppControl_missarg);
add_test_case(moduleName, ApplicationManager_launchAppControl_replyCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_launchAppControl_replyCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_launchAppControl_successCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_launchAppControl_successCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_launchAppControl_with_appControl_operation);
add_test_case(moduleName, ApplicationManager_launchAppControl_with_appControl_operation_mime);
add_test_case(moduleName, ApplicationManager_launchAppControl_with_appControl_operation_uri);
add_test_case(moduleName, ApplicationManager_launchAppControl_with_appControl_operation_uri_mime);
add_test_case(moduleName, ApplicationManager_launchAppControl_with_errorCallback);
add_test_case(moduleName, ApplicationManager_launchAppControl_with_id);
add_test_case(moduleName, ApplicationManager_launchAppControl_with_replyCallback);
add_test_case(moduleName, ApplicationManager_launchAppControl_with_successCallback);
add_test_case(moduleName, ApplicationManager_launch_errorCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_launch_errorCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_launch_exist);
add_test_case(moduleName, ApplicationManager_launch_successCallback_TypeMismatch);
add_test_case(moduleName, ApplicationManager_launch_successCallback_invalid_cb);
add_test_case(moduleName, ApplicationManager_launch_with_errorCallback);
add_test_case(moduleName, ApplicationManager_launch_with_successCallback);
add_test_case(moduleName, ApplicationManager_notexist);
add_test_case(moduleName, ApplicationManager_removeAppInfoEventListener);
add_test_case(moduleName, ApplicationManager_removeAppInfoEventListener_exist);
add_test_case(moduleName, ApplicationMetaData_extend);
add_test_case(moduleName, ApplicationMetaData_key_attribute);
add_test_case(moduleName, ApplicationMetaData_notexist);
add_test_case(moduleName, ApplicationMetaData_value_attribute);
add_test_case(moduleName, Application_ContextId_attribute);
add_test_case(moduleName, Application_appInfo_attribute);
add_test_case(moduleName, Application_exit);
add_test_case(moduleName, Application_exit_exist);
add_test_case(moduleName, Application_extend);
add_test_case(moduleName, Application_getRequestedAppControl);
add_test_case(moduleName, Application_getRequestedAppControl_exist);
add_test_case(moduleName, Application_getRequestedAppControl_extra_argument);
add_test_case(moduleName, Application_hide);
add_test_case(moduleName, Application_hide_exist);
add_test_case(moduleName, Application_hide_extra_argument);
add_test_case(moduleName, Application_notexist);
add_test_case(moduleName, FindAppControlSuccessCallback_notexist);
add_test_case(moduleName, FindAppControlSuccessCallback_onsuccess);
add_test_case(moduleName, RequestedApplicationControl_appControl_attribute);
add_test_case(moduleName, RequestedApplicationControl_callerAppId_attribute);
add_test_case(moduleName, RequestedApplicationControl_extend);
add_test_case(moduleName, RequestedApplicationControl_notexist);
add_test_case(moduleName, RequestedApplicationControl_replyFailure);
add_test_case(moduleName, RequestedApplicationControl_replyFailure_exist);
add_test_case(moduleName, RequestedApplicationControl_replyFailure_extra_argument);
add_test_case(moduleName, RequestedApplicationControl_replyResult);
add_test_case(moduleName, RequestedApplicationControl_replyResult_data_TypeMismatch);
add_test_case(moduleName, RequestedApplicationControl_replyResult_exist);
add_test_case(moduleName, RequestedApplicationControl_replyResult_with_data);
add_test_case(moduleName, ApplicationInformationEventCallback_oninstalled);
add_test_case(moduleName, ApplicationInformationEventCallback_onupdated);
add_test_case(moduleName, ApplicationInformationEventCallback_onuninstalled);
add_test_case(moduleName, ApplicationManager_addAppInfoEventListener_oninstalled);
add_test_case(moduleName, ApplicationManager_addAppInfoEventListener_onupdated);
add_test_case(moduleName, ApplicationManager_addAppInfoEventListener_onuninstalled);
