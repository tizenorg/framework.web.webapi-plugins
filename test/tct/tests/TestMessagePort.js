function LocalMessagePort_notexist() {
//==== TEST: LocalMessagePort_notexist
//==== PRIORITY P3
//==== LABEL Check if interface LocalMessagePort exists, it should not
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:LocalMessagePort U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("LocalMessagePort");
}, 'LocalMessagePort_notexist');

}

function MessagePortCallback_notexist() {
//==== TEST: MessagePortCallback_notexist
//==== PRIORITY P3
//==== LABEL Check if interface MessagePortCallback exists, it should not
//==== SPEC Tizen Web API:IO:Messageport:MessagePortCallback:MessagePortCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("MessagePortCallback");
}, 'MessagePortCallback_notexist');

}

function MessagePortManagerObject_notexist() {
//==== TEST: MessagePortManagerObject_notexist
//==== PRIORITY P3
//==== LABEL Check if interface MessagePortManagerObject exists, it should not
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManagerObject:MessagePortManagerObject U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("MessagePortManagerObject");
}, 'MessagePortManagerObject_notexist');

}

function MessagePortManager_notexist() {
//==== TEST: MessagePortManager_notexist
//==== PRIORITY P3
//==== LABEL Check if interface MessagePortManager exists, it should not
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:MessagePortManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("MessagePortManager");
}, 'MessagePortManager_notexist');

}

function RemoteMessagePort_notexist() {
//==== TEST: RemoteMessagePort_notexist
//==== PRIORITY P3
//==== LABEL Check if interface RemoteMessagePort exists, it should not
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:RemoteMessagePort U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("RemoteMessagePort");
}, 'RemoteMessagePort_notexist');

}

function MessagePortManager_in_tizen() {
//==== TEST: MessagePortManager_in_tizen
//==== LABEL Check if messageport exists in tizen
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:MessagePortManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA OBME
//==== PRIORITY P3
test(function () {
    assert_true("messageport" in tizen, "No messageport in tizen");
    check_readonly(tizen, "messageport", tizen.messageport, "object", "dummyValue");
}, 'MessagePortManager_in_tizen');

}

function MessagePortManager_requestLocalMessagePort_exist() {
//==== TEST: MessagePortManager_requestLocalMessagePort_exist
//==== LABEL Check if method requestLocalMessagePort of MessagePortManager exists
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:requestLocalMessagePort M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("requestLocalMessagePort" in tizen.messageport, "No requestLocalMessagePort method in tizen.messageport");
    check_method_exists(tizen.messageport, "requestLocalMessagePort");
}, 'MessagePortManager_requestLocalMessagePort_exist');

}

function MessagePortManager_requestRemoteMessagePort_exist() {
//==== TEST: MessagePortManager_requestRemoteMessagePort_exist
//==== LABEL Check if method requestRemoteMessagePort of MessagePortManager exists
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:requestRemoteMessagePort M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("requestRemoteMessagePort" in tizen.messageport, "No requestRemoteMessagePort method in tizen.messageport");
    check_method_exists(tizen.messageport, "requestRemoteMessagePort");
}, 'MessagePortManager_requestRemoteMessagePort_exist');

}

function MessagePortManager_requestTrustedRemoteMessagePort_exist() {
//==== TEST: MessagePortManager_requestTrustedRemoteMessagePort_exist
//==== LABEL Check if method requestTrustedRemoteMessagePort of MessagePortManager exists
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:requestTrustedRemoteMessagePort M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("requestTrustedRemoteMessagePort" in tizen.messageport, "No requestTrustedRemoteMessagePort method in tizen.messageport");
    check_method_exists(tizen.messageport, "requestTrustedRemoteMessagePort");
}, 'MessagePortManager_requestTrustedRemoteMessagePort_exist');

}

function MessagePortManager_requestTrustedLocalMessagePort_exist() {
//==== TEST: MessagePortManager_requestTrustedLocalMessagePort_exist
//==== LABEL Check if method requestTrustedLocalMessagePort of MessagePortManager exists
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:requestTrustedLocalMessagePort M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("requestTrustedLocalMessagePort" in tizen.messageport, "No requestTrustedLocalMessagePort method in tizen.messageport");
    check_method_exists(tizen.messageport, "requestTrustedLocalMessagePort");
}, 'MessagePortManager_requestTrustedLocalMessagePort_exist');

}

function MessagePortManager_extend() {
//==== TEST: MessagePortManager_extend
//==== PRIORITY P3
//==== LABEL Check if instance of interface MessagePortManager can be extended with new property
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:MessagePortManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA OBX
test(function () {
    check_extensibility(tizen.messageport);
}, 'MessagePortManager_extend');

}

function MessagePortManager_requestLocalMessagePort() {
//==== TEST: MessagePortManager_requestLocalMessagePort
//==== LABEL Check if method requestLocalMessagePort works properly
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:requestLocalMessagePort M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var localMsgPort;

    localMsgPort = tizen.messageport.requestLocalMessagePort("localMsgPort");

    assert_equals(localMsgPort.messagePortName, "localMsgPort", "localMsgPort should have proper name");
    assert_equals(localMsgPort.isTrusted, false, "isTrusted property should be false");
}, 'MessagePortManager_requestLocalMessagePort');

}

function MessagePortManager_requestTrustedLocalMessagePort() {
//==== TEST: MessagePortManager_requestTrustedLocalMessagePort
//==== LABEL Check if method requestTrustedLocalMessagePort works properly
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:requestTrustedLocalMessagePort M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var trustedLocalMsgPort;

    trustedLocalMsgPort = tizen.messageport.requestTrustedLocalMessagePort("trustedLocalMsgPort");

    assert_equals(trustedLocalMsgPort.messagePortName, "trustedLocalMsgPort", "trustedLocalMsgPort should have proper name");
    assert_equals(trustedLocalMsgPort.isTrusted, true, "trustedLocalMsgPort should be trusted");
}, 'MessagePortManager_requestTrustedLocalMessagePort');

}

function MessagePortManager_requestRemoteMessagePort() {
//==== TEST: MessagePortManager_requestRemoteMessagePort
//==== LABEL Check if method requestRemoteMessagePort works properly
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:requestRemoteMessagePort M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var remoteMsgPort, localMsgPort,
        app = tizen.application.getCurrentApplication();

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");

    assert_equals(remoteMsgPort.messagePortName, "remoteMsgPort", "remoteMsgPort should have proper name");
    assert_equals(remoteMsgPort.appId, app.appInfo.id, "ids should be equal");
    assert_equals(remoteMsgPort.isTrusted, false, "isTrusted property should be false");
}, 'MessagePortManager_requestRemoteMessagePort');

}

function MessagePortManager_requestTrustedRemoteMessagePort() {
//==== TEST: MessagePortManager_requestTrustedRemoteMessagePort
//==== LABEL Check if method requestTrustedRemoteMessagePort works properly
//==== SPEC Tizen Web API:IO:Messageport:MessagePortManager:requestTrustedRemoteMessagePort M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MMINA MR
test(function () {
    var trustedRemoteMsgPort, localMsgPort,
        app = tizen.application.getCurrentApplication();

    localMsgPort = tizen.messageport.requestTrustedLocalMessagePort("remoteMsgPort");
    trustedRemoteMsgPort = tizen.messageport.requestTrustedRemoteMessagePort(app.appInfo.id, "remoteMsgPort");

    assert_equals(trustedRemoteMsgPort.messagePortName, "remoteMsgPort", "trustedRemoteMsgPort should have proper name");
    assert_equals(trustedRemoteMsgPort.appId, app.appInfo.id, "ids should be equal");
    assert_equals(trustedRemoteMsgPort.isTrusted, true, "trustedRemoteMsgPort should be trusted");
}, 'MessagePortManager_requestTrustedRemoteMessagePort');

}

function RemoteMessagePort_extend() {
//==== TEST: RemoteMessagePort_extend
//==== LABEL Check if instance of interface RemoteMessagePort can be extended with new property
//==== PRIORITY P3
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:RemoteMessagePort U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA OBX
test(function () {
    var remoteMsgPort, localMsgPort,
        app = tizen.application.getCurrentApplication();

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");

    check_extensibility(remoteMsgPort);
}, 'RemoteMessagePort_extend');

}

function RemoteMessagePort_sendMessage_exist() {
//==== TEST: RemoteMessagePort_sendMessage_exist
//==== LABEL Check if method sendMessage of RemoteMessagePort exists
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:sendMessage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA ME
test(function () {
    var remoteMsgPort, localMsgPort,
        app = tizen.application.getCurrentApplication();

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");

    assert_true("sendMessage" in remoteMsgPort, "No sendMessage method in RemoteMessagePort");
    check_method_exists(remoteMsgPort, "sendMessage");
}, 'RemoteMessagePort_sendMessage_exist');

}

function LocalMessagePort_extend() {
//==== TEST: LocalMessagePort_extend
//==== PRIORITY P3
//==== LABEL Check if instance of interface LocalMessagePort can be extended with new property
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:LocalMessagePort U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA OBX
test(function () {
    var localMsgPort = tizen.messageport.requestLocalMessagePort("localMsgPort");

    check_extensibility(localMsgPort);
}, 'LocalMessagePort_extend');

}

function LocalMessagePort_addMessagePortListener_exist() {
//==== TEST: LocalMessagePort_addMessagePortListener_exist
//==== LABEL Check if method addMessagePortListener of LocalMessagePort exists
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:addMessagePortListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA ME
test(function () {
    var localMsgPort = tizen.messageport.requestLocalMessagePort("localMsgPort");

    assert_true("addMessagePortListener" in localMsgPort, "No addMessagePortListener method in localMsgPort");
    check_method_exists(localMsgPort, "addMessagePortListener");
}, 'LocalMessagePort_addMessagePortListener_exist');

}

function LocalMessagePort_removeMessagePortListener_exist() {
//==== TEST: LocalMessagePort_removeMessagePortListener_exist
//==== LABEL Check if method removeMessagePortListener of LocalMessagePort exists
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:removeMessagePortListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA ME
test(function () {
    var localMsgPort;

    localMsgPort = tizen.messageport.requestLocalMessagePort("localMsgPort");

    assert_true("removeMessagePortListener" in localMsgPort, "No removeMessagePortListener method in localMsgPort");
    check_method_exists(localMsgPort, "removeMessagePortListener");
}, 'LocalMessagePort_removeMessagePortListener_exist');

}

function RemoteMessagePort_appId_attribute() {
//==== TEST: RemoteMessagePort_appId_attribute
//==== LABEL Check if attribute appId of RemoteMessagePort exists, has type ApplicationId and is readonly
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:appId A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var remoteMsgPort, localMsgPort,
        app = tizen.application.getCurrentApplication();

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");
    assert_own_property(remoteMsgPort, "appId", "RemoteMessagePort does not own appId property");
    check_readonly(remoteMsgPort, "appId", app.appInfo.id, "string", "invalid");
}, 'RemoteMessagePort_appId_attribute');

}

function RemoteMessagePort_isTrusted_attribute() {
//==== TEST: RemoteMessagePort_isTrusted_attribute
//==== LABEL Check if attribute isTrusted of RemoteMessagePort exists, has type Boolean and is readonly
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:isTrusted A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var remoteMsgPort, localMsgPort,
        app = tizen.application.getCurrentApplication();

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");
    assert_own_property(remoteMsgPort, "isTrusted", "RemoteMessagePort does not own isTrusted property");
    check_readonly(remoteMsgPort, "isTrusted", false, "boolean", true);
}, 'RemoteMessagePort_isTrusted_attribute');

}

function RemoteMessagePort_messagePortName_attribute() {
//==== TEST: RemoteMessagePort_messagePortName_attribute
//==== LABEL Check if attribute messagePortName of RemoteMessagePort exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:messagePortName A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var remoteMsgPort, localMsgPort,
        app = tizen.application.getCurrentApplication();

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");
    assert_own_property(remoteMsgPort, "messagePortName", "RemoteMessagePort does not own messagePortName property");
    check_readonly(remoteMsgPort, "messagePortName", "remoteMsgPort", "string", "invalid");
}, 'RemoteMessagePort_messagePortName_attribute');

}

function LocalMessagePort_isTrusted_attribute() {
//==== TEST: LocalMessagePort_isTrusted_attribute
//==== LABEL Check if attribute isTrusted of LocalMessagePort exists, has type boolean and is readonly
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:isTrusted A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var localMsgPort = tizen.messageport.requestLocalMessagePort("localMsgPort");
    assert_own_property(localMsgPort, "isTrusted", "LocalMessagePort does not own isTrusted property");
    check_readonly(localMsgPort, "isTrusted", false, "boolean", true);
}, 'LocalMessagePort_isTrusted_attribute');

}

function LocalMessagePort_messagePortName_attribute() {
//==== TEST: LocalMessagePort_messagePortName_attribute
//==== LABEL Check if attribute messagePortName of LocalMessagePort exists, has type DOMString and is readonly
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:messagePortName A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA AE AT ARO
test(function () {
    var localMsgPort;

    localMsgPort = tizen.messageport.requestLocalMessagePort("localMsgPort");
    assert_own_property(localMsgPort, "messagePortName", "LocalMessagePort does not own messagePortName property");
    check_readonly(localMsgPort, "messagePortName", "localMsgPort", "string", "invalid");
}, 'LocalMessagePort_messagePortName_attribute');

}

function RemoteMessagePort_sendMessage() {
//==== TEST: RemoteMessagePort_sendMessage
//==== LABEL Check if method sendMessage works properly
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:sendMessage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MMINA MR
var t = async_test('RemoteMessagePort_sendMessage'), retValue = null, remoteMsgPort, localMsgPort, onReceived, listenerId, messagePortData = [{key: "RESULT",
    value: "OK"}], app = tizen.application.getCurrentApplication();

t.step(function () {

    onReceived = t.step_func(function (data) {
        assert_equals(retValue, undefined, "sendMessage returns wrong value");
        assert_equals(data.key, messagePortData.key, "received data should be the same");
        assert_equals(data.value, messagePortData.value, "received data should be the same");
        localMsgPort.removeMessagePortListener(listenerId);
        t.done();
    });

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");
    listenerId = localMsgPort.addMessagePortListener(onReceived);

    retValue = remoteMsgPort.sendMessage(messagePortData);
});

}

function LocalMessagePort_addMessagePortListener() {
//==== TEST: LocalMessagePort_addMessagePortListener
//==== LABEL Check if method addMessagePortListener works properly
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:addMessagePortListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MMINA MAST MR
var t = async_test('LocalMessagePort_addMessagePortListener'), remoteMsgPort, localMsgPort, onReceived, listenerId, messagePortData = [{key: "RESULT",
    value: "OK"}], app = tizen.application.getCurrentApplication();

t.step(function () {

    onReceived = t.step_func(function (data) {
        assert_type(data, "array", "MessagePortDataItem should be an array");
        assert_equals(data.length, 1, "There should be MessagePortDataItem");
        assert_array_equals(data[0], messagePortData[0],
            "Received data should be equal to init data");
        assert_not_equals(listenerId, null, "id should be not null");
        assert_type(listenerId, "long", "id of MessagePortListener should be type of number");
        localMsgPort.removeMessagePortListener(listenerId);
        t.done();
    });

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");
    listenerId = localMsgPort.addMessagePortListener(onReceived);

    remoteMsgPort.sendMessage(messagePortData);
});

}

function LocalMessagePort_removeMessagePortListener() {
//==== TEST: LocalMessagePort_removeMessagePortListener
//==== LABEL Check if method removeMessagePortListener works properly
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:removeMessagePortListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MMINA MAST MR
var t = async_test('LocalMessagePort_removeMessagePortListener'), localMsgPort, remoteMsgPort, listenerId, onReceived,
    app = tizen.application.getCurrentApplication(), messagePortData = [{key: "RESULT", value: "OK"}],
    retValue = null;

t.step(function () {
    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");

    onReceived = t.step_func(function (data) {
        assert_unreached("Callback should be unregistered");
    });
    listenerId = localMsgPort.addMessagePortListener(onReceived);
    retValue = localMsgPort.removeMessagePortListener(listenerId);

    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");
    remoteMsgPort.sendMessage(messagePortData);

    setTimeout(t.step_func(function () {
        assert_equals(retValue, undefined, "removeMessagePortListener returns wrong value");

        t.done();
    }), 500);
});

}

function MessagePortCallback_onreceived() {
//==== TEST: MessagePortCallback_onreceived
//==== LABEL Check if MessagePortCallback works correctly with mandatory arguments
//==== SPEC Tizen Web API:IO:Messageport:MessagePortCallback:onreceived M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA CBT CBOA
var t = async_test('MessagePortCallback_onreceived'), remoteMsgPort, localMsgPort, onReceived, listenerId, messagePortData = [{key: "RESULT",
    value: "OK"}], app = tizen.application.getCurrentApplication();

t.step(function () {

    onReceived = t.step_func(function (data) {
        assert_type(data, "array", "Argument data has an invalid type");
        assert_greater_than(data.length, 0, "Callback onReceived called with an empty array");
        assert_type(data[0], "object", "MessagePortDataItem has an invalid type");

        assert_equals(data[0].key, messagePortData[0].key, "Received data should be the same");
        assert_equals(data[0].value, messagePortData[0].value, "Received data should be the same");

        localMsgPort.removeMessagePortListener(listenerId);
        t.done();
    });

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");
    listenerId = localMsgPort.addMessagePortListener(onReceived);

    remoteMsgPort.sendMessage(messagePortData);
});

}

function MessagePortCallback_onreceived_all() {
//==== TEST: MessagePortCallback_onreceived_all
//==== LABEL Check if MessagePortCallback works correctly with all arguments
//==== SPEC Tizen Web API:IO:Messageport:MessagePortCallback:onreceived M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA CBOA
var t = async_test('MessagePortCallback_onreceived_all'), remoteMsgPort, localMsgPort, onReceived, listenerId, messagePortData = [{key: "RESULT",
    value: "OK"}], app = tizen.application.getCurrentApplication();

t.step(function () {

    onReceived = t.step_func(function (data, remoteMessagePort) {
        assert_equals(data.key, messagePortData.key, "Received data should be the same");
        assert_equals(data.value, messagePortData.value, "Received data should be the same");
        assert_not_equals(remoteMessagePort, null, "remoteMessagePort should be not null}");
        localMsgPort.removeMessagePortListener(listenerId);
        t.done();
    });

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");
    listenerId = localMsgPort.addMessagePortListener(onReceived);

    remoteMsgPort.sendMessage(messagePortData, localMsgPort);
});

}

function RemoteMessagePort_sendMessage_with_localMessagePort() {
//==== TEST: RemoteMessagePort_sendMessage_with_localMessagePort
//==== LABEL Check if method sendMessage works properly with all arguments
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:sendMessage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MOA MAST
var t = async_test('RemoteMessagePort_sendMessage_with_localMessagePort'), remoteMsgPort, localMsgPort, onReceived, listenerId, messagePortData = [{key: "RESULT",
    value: "OK"}], app = tizen.application.getCurrentApplication();

t.step(function () {

    onReceived = t.step_func(function (data, remoteMessagePort) {
        assert_type(data, "array", "MessagePortDataItem should be an array");
        assert_equals(data.length, 1, "There should be MessagePortDataItem");
        assert_array_equals(data[0], messagePortData[0],
            "Received data should be equal to init data");

        if (remoteMessagePort === null) {
            localMsgPort.removeMessagePortListener(listenerId);
            t.done();
        } else {
            remoteMessagePort.sendMessage(messagePortData);
        }
    });

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");
    listenerId = localMsgPort.addMessagePortListener(onReceived);

    remoteMsgPort.sendMessage(messagePortData, localMsgPort);
});

}

function RemoteMessagePort_sendMessage_missarg() {
//==== TEST: RemoteMessagePort_sendMessage_missarg
//==== LABEL Check if sendMessage method called with no arguments throws exception
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:sendMessage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MMA
test(function () {
    var remoteMsgPort, localMsgPort,
        app = tizen.application.getCurrentApplication();

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");

    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            remoteMsgPort.sendMessage();
        }, "TypeMismatchError should be thrown");

}, 'RemoteMessagePort_sendMessage_missarg');

}

function RemoteMessagePort_sendMessage_data_TypeMismatch() {
//==== TEST: RemoteMessagePort_sendMessage_data_TypeMismatch
//==== LABEL Check type conversions for data argument of RemoteMessagePort.sendMessage method
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:sendMessage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MC
test(function () {
    var remoteMsgPort, localMsgPort, conversionTable, param, exceptionName, i,
        app = tizen.application.getCurrentApplication();

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");

    conversionTable = getTypeConversionExceptions("object", false);
    for (i = 0; i < conversionTable.length; i++) {
        param = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                remoteMsgPort.sendMessage(param);
            }, exceptionName + " should be thrown - given incorrect");
    }
}, 'RemoteMessagePort_sendMessage_data_TypeMismatch');

}

function RemoteMessagePort_sendMessage_localMessagePort_TypeMismatch() {
//==== TEST: RemoteMessagePort_sendMessage_localMessagePort_TypeMismatch
//==== LABEL Check type conversions for localMessagePort argument of RemoteMessagePort.sendMessage method
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Messageport:RemoteMessagePort:sendMessage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MC
test(function () {
    var remoteMsgPort, localMsgPort, conversionTable, param, exceptionName, i,
        messagePortData = [{key:"RESULT", value:"OK"}],
        app = tizen.application.getCurrentApplication();

    localMsgPort = tizen.messageport.requestLocalMessagePort("remoteMsgPort");
    remoteMsgPort = tizen.messageport.requestRemoteMessagePort(app.appInfo.id, "remoteMsgPort");

    conversionTable = getTypeConversionExceptions("object", true);
    for (i = 0; i < conversionTable.length; i++) {
        param = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                remoteMsgPort.sendMessage(messagePortData, param);
            }, exceptionName + " should be thrown - given incorrect");
    }
}, 'RemoteMessagePort_sendMessage_localMessagePort_TypeMismatch');

}

function LocalMessagePort_addMessagePortListener_missarg() {
//==== TEST: LocalMessagePort_addMessagePortListener_missarg
//==== LABEL Check if addMessagePortListener method called with no arguments throws exception
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:addMessagePortListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MMA
test(function () {
    var localMsgPort;

    localMsgPort = tizen.messageport.requestLocalMessagePort("localMsgPort");

    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            localMsgPort.addMessagePortListener();
        }, "TypeMismatchError should be thrown");

}, 'LocalMessagePort_addMessagePortListener_missarg');

}

function LocalMessagePort_addMessagePortListener_listener_invalid_cb() {
//==== TEST: LocalMessagePort_addMessagePortListener_listener_invalid_cb
//==== LABEL Check if LocalMessagePort.addMessagePortListener method throws exception when listener is invalid
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:addMessagePortListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MTCB
var t = async_test('LocalMessagePort_addMessagePortListener_listener_invalid_cb'), localMsgPort, incorrectCallback;

t.step(function () {

    localMsgPort = tizen.messageport.requestLocalMessagePort("localMsgPort");

    incorrectCallback = {
        onreceived: t.step_func(function () {
            assert_unreached("Invalid callback invoked");
        })
    };

    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            localMsgPort.addMessagePortListener(incorrectCallback);
        });

    t.done();
});

}

function LocalMessagePort_addMessagePortListener_listener_TypeMismatch() {
//==== TEST: LocalMessagePort_addMessagePortListener_listener_TypeMismatch
//==== LABEL Check type conversions for listener argument of LocalMessagePort.addMessagePortListener method
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Messageport:LocalMessagePort:addMessagePortListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/messageport.html
//==== TEST_CRITERIA MC
test(function () {
    var localMsgPort, conversionTable, param, exceptionName, i;

    localMsgPort = tizen.messageport.requestLocalMessagePort("localMsgPort");

    conversionTable = getTypeConversionExceptions("functionObject", false);
    for (i = 0; i < conversionTable.length; i++) {
        param = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                localMsgPort.addMessagePortListener(param);
            }, exceptionName + " should be thrown - given incorrect");
    }
}, 'LocalMessagePort_addMessagePortListener_listener_TypeMismatch');

}

var moduleName = "tct-messageport-tizen-tests";
add_test_case(moduleName, LocalMessagePort_notexist);
add_test_case(moduleName, MessagePortCallback_notexist);
add_test_case(moduleName, MessagePortManagerObject_notexist);
add_test_case(moduleName, MessagePortManager_notexist);
add_test_case(moduleName, RemoteMessagePort_notexist);
add_test_case(moduleName, MessagePortManager_in_tizen);
add_test_case(moduleName, MessagePortManager_requestLocalMessagePort_exist);
add_test_case(moduleName, MessagePortManager_requestRemoteMessagePort_exist);
add_test_case(moduleName, MessagePortManager_requestTrustedRemoteMessagePort_exist);
add_test_case(moduleName, MessagePortManager_requestTrustedLocalMessagePort_exist);
add_test_case(moduleName, MessagePortManager_extend);
add_test_case(moduleName, MessagePortManager_requestLocalMessagePort);
add_test_case(moduleName, MessagePortManager_requestTrustedLocalMessagePort);
add_test_case(moduleName, MessagePortManager_requestRemoteMessagePort);
add_test_case(moduleName, MessagePortManager_requestTrustedRemoteMessagePort);
add_test_case(moduleName, RemoteMessagePort_extend);
add_test_case(moduleName, RemoteMessagePort_sendMessage_exist);
add_test_case(moduleName, LocalMessagePort_extend);
add_test_case(moduleName, LocalMessagePort_addMessagePortListener_exist);
add_test_case(moduleName, LocalMessagePort_removeMessagePortListener_exist);
add_test_case(moduleName, RemoteMessagePort_appId_attribute);
add_test_case(moduleName, RemoteMessagePort_isTrusted_attribute);
add_test_case(moduleName, RemoteMessagePort_messagePortName_attribute);
add_test_case(moduleName, LocalMessagePort_isTrusted_attribute);
add_test_case(moduleName, LocalMessagePort_messagePortName_attribute);
add_test_case(moduleName, RemoteMessagePort_sendMessage);
add_test_case(moduleName, LocalMessagePort_addMessagePortListener);
add_test_case(moduleName, LocalMessagePort_removeMessagePortListener);
add_test_case(moduleName, MessagePortCallback_onreceived);
add_test_case(moduleName, MessagePortCallback_onreceived_all);
add_test_case(moduleName, RemoteMessagePort_sendMessage_with_localMessagePort);
add_test_case(moduleName, RemoteMessagePort_sendMessage_missarg);
add_test_case(moduleName, RemoteMessagePort_sendMessage_data_TypeMismatch);
add_test_case(moduleName, RemoteMessagePort_sendMessage_localMessagePort_TypeMismatch);
add_test_case(moduleName, LocalMessagePort_addMessagePortListener_missarg);
add_test_case(moduleName, LocalMessagePort_addMessagePortListener_listener_invalid_cb);
add_test_case(moduleName, LocalMessagePort_addMessagePortListener_listener_TypeMismatch);
