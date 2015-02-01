var TYPE_MISMATCH_ERR = "TypeMismatchError";
var INVALID_VALUES_ERR = "InvalidValuesError";
var NOT_FOUND_ERR = "NotFoundError";
var UNKNOWN_ERR = "UnknownError";
var NOT_SUPPORTED_ERR = "NotSupportedError";
var PERMISSION_DENIED_ERR = "SecurityError";
var INVALID_ACCESS_ERR = "InvalidAccessError";

var currentAppId = "tizenutc00.UnitTest";

//var remotePortUntrusted_appId = "tizenutcmp.MsgPortSvr";
//var remotePortUntrusted_name = "TEST_TRUSTED_PORT_SIMPLE";

var localPort_name = "UTC_TEST_PORT";
var localPort_watchId = 0;
var localPort = null;
var localPortForReceive_name = "UTC_TEST_PORT_RECEIVE";
var localPortForReceive = null;
var remotePort_appId = "tizenutcmp.MsgPortSvr";
var remotePort_name = "TEST_PORT_SIMPLE";
var remotePort = null;
var remotePortForRequest_appId = "tizenutcmp.MsgPortSvr";
var remotePortForRequest_name = "TEST_PORT_FOR_REQ_CONNECT";
var remotePortForRequest_key_portName = "PORT_NAME";
var remotePortForRequest_key_appId = "APP_ID";
var remotePortForRequest = null;

var localPortTrusted_name = "UTC_TEST_TRUSTED_PORT";
var localPortTrusted_watchId = 0;
var localPortTrusted = null;
var localPortTrustedForReceive_name = "UTC_TEST_TRUSTED_PORT_RECEIVE";
var localPortTrustedForReceive = null;
var remotePortTrusted_appId = "tizenutcmp.MsgPortSvr";
var remotePortTrusted_name = "TEST_TRUSTED_PORT_SIMPLE";
var remotePortTrusted = null;
var remotePortTrustedForRequest_appId = "tizenutcmp.MsgPortSvr";
var remotePortTrustedForRequest_name = "TEST_TRUSTED_PORT_FOR_REQ_CONNECT";
var remotePortTrustedForRequest_key_portName = "PORT_NAME";
var remotePortTrustedForRequest_key_appId = "APP_ID";
var remotePortTrustedForRequest = null;

var TestMessagePort =
{
	UTC_messagePort_MessagePortManager_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_MessagePortManager_P_001");

		TestEngine.test("Tizen presence", tizen);
		TestEngine.test("MessagePortManager presence", tizen.messageport);
		TestEngine.testPresence("MessagePortManager.requestLocalMessagePort presence", tizen.messageport.requestLocalMessagePort);
		TestEngine.testPresence("MessagePortManager.requestTrustedLocalMessagePort presence", tizen.messageport.requestTrustedLocalMessagePort);
		TestEngine.testPresence("MessagePortManager.requestRemoteMessagePort presence", tizen.messageport.requestRemoteMessagePort);
		TestEngine.testPresence("MessagePortManager.requestTrustedRemoteMessagePort presence", tizen.messageport.requestTrustedRemoteMessagePort);
	},

	UTC_messagePort_requestLocalMessagePort_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_requestLocalMessagePort_P_001");

		testNoExceptionWithMessage("requestLocalMessagePort", function() {
			localPort = tizen.messageport.requestLocalMessagePort(localPort_name);
			TestEngine.test("Got LocalMessagePort", localPort);
		});
	},

	UTC_messagePort_requestLocalMessagePort_N_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_requestLocalMessagePort_N_001");

		TestEngine.log("1st parameter check.");
		TestEngine.catchErrorType("name", INVALID_VALUES_ERR, tizen.messageport, "requestLocalMessagePort", "");
	},

	UTC_messagePort_requestTrustedLocalMessagePort_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_requestTrustedLocalMessagePort_P_001");

		testNoExceptionWithMessage("requestTrustedLocalMessagePort", function() {
			localPortTrusted = tizen.messageport.requestTrustedLocalMessagePort(localPortTrusted_name);
			TestEngine.test("Found a trusted LocalMessagePort", localPortTrusted);
		});
	},

	UTC_messagePort_requestTrustedLocalMessagePort_N_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_requestTrustedLocalMessagePort_N_001");

		TestEngine.log("1st parameter check.");
		TestEngine.catchErrorType("name", INVALID_VALUES_ERR, tizen.messageport, "requestTrustedLocalMessagePort", "");
	},

	UTC_messagePort_requestRemoteMessagePort_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_requestRemoteMessagePort_P_001");

		testNoExceptionWithMessage("requestLocalMessagePort", function() {
			remotePort = tizen.messageport.requestRemoteMessagePort(remotePort_appId, remotePort_name);
			TestEngine.test("Found a RemoteMessagePort", remotePort);
		});
	},

	UTC_messagePort_requestRemoteMessagePort_N_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_requestRemoteMessagePort_N_001");

		TestEngine.log("Parameter count check.");
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.messageport, "requestRemoteMessagePort");

		TestEngine.log("1st parameter check.");
		TestEngine.catchErrorType("name", INVALID_VALUES_ERR, tizen.messageport, "requestRemoteMessagePort", "", remotePort_name);
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.messageport, "requestRemoteMessagePort", "aaaaaaaaaa.Wrong", remotePort_name);

		TestEngine.log("2nd parameter check.");
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.messageport, "requestRemoteMessagePort", remotePort_appId);
		TestEngine.catchErrorType("name", INVALID_VALUES_ERR, tizen.messageport, "requestRemoteMessagePort", remotePort_appId, "");
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.messageport, "requestRemoteMessagePort", remotePort_appId, "NotExist");
	},

	UTC_messagePort_requestTrustedRemoteMessagePort_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_requestTrustedRemoteMessagePort_P_001");

		testNoExceptionWithMessage("requestLocalMessagePort", function() {
			remotePortTrusted = tizen.messageport.requestTrustedRemoteMessagePort(remotePortTrusted_appId, remotePortTrusted_name);
			TestEngine.test("Found a TrustedRemoteMessagePort", remotePortTrusted);
		});
	},

	UTC_messagePort_requestTrustedRemoteMessagePort_N_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_requestTrustedRemoteMessagePort_N_001");

		TestEngine.log("Parameter count check.");
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.messageport, "requestTrustedRemoteMessagePort");

		TestEngine.log("1st parameter check.");
		TestEngine.catchErrorType("name", INVALID_VALUES_ERR, tizen.messageport, "requestTrustedRemoteMessagePort", "", remotePortTrusted_name);
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.messageport, "requestTrustedRemoteMessagePort", "aaaaaaaaaa.Wrong", remotePortTrusted_name);

		TestEngine.log("2nd parameter check.");
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.messageport, "requestTrustedRemoteMessagePort", remotePortTrusted_appId);
		TestEngine.catchErrorType("name", INVALID_VALUES_ERR, tizen.messageport, "requestTrustedRemoteMessagePort", remotePortTrusted_appId, "");
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, tizen.messageport, "requestTrustedRemoteMessagePort", remotePortTrusted_appId, "NotExist");

//		TestEngine.log("untrusted connection check.");
//		TestEngine.catchErrorType("name", INVALID_ACCESS_ERR, tizen.messageport, "requestTrustedRemoteMessagePort", remotePortUntrusted_appId, remotePortUntrusted_name);
	},

	UTC_messagePort_LocalMessagePort_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_LocalMessagePort_P_001");

		TestEngine.testPresence("LocalMessagePort.messagePortName presence", localPort.messagePortName);
		TestEngine.testPresence("LocalMessagePort.isTrusted presence", localPort.isTrusted);
		TestEngine.testPresence("LocalMessagePort.addMessagePortListener presence", localPort.addMessagePortListener);
		TestEngine.testPresence("LocalMessagePort.removeMessagePortListener presence", localPort.removeMessagePortListener);
	},

	UTC_messagePort_RemoteMessagePort_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_RemoteMessagePort_P_001");

		TestEngine.testPresence("RemoteMessagePort.messagePortName presence", remotePort.messagePortName);
		TestEngine.testPresence("RemoteMessagePort.appId presence", remotePort.appId);
		TestEngine.testPresence("RemoteMessagePort.isTrusted presence", remotePort.isTrusted);
		TestEngine.testPresence("RemoteMessagePort.sendMessage presence", remotePort.sendMessage);
	},

	UTC_messagePort_sendMessage_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_sendMessage_P_001");

		testNoExceptionWithMessage("sendMessage without localPort", function() {
			remotePort.sendMessage( [
				{ key:"KEY1", value:"value1" },
				{ key:"KEY2", value:"value2" },
				{ key:"KEY3", value:"value3" }
			] );
		} );
	},

	UTC_messagePort_sendMessage_N_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_sendMessage_N_001");

		TestEngine.log("Parameter count check.");
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePort, "sendMessage");

		TestEngine.log("1st parameter check.");
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePort, "sendMessage", 1);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePort, "sendMessage", null);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePort, "sendMessage", undefined);

		var param = [ { key:"KEY", value:"VALUE" } ];
		TestEngine.log("2nd parameter check.");
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePort, "sendMessage", param, 1);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePort, "sendMessage", param, {});
	},

	UTC_messagePort_addMessagePortListener_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_addMessagePortListener_P_001");

		testNoExceptionWithMessage("addMessagePortListener", function() {
			localPort_watchId = localPort.addMessagePortListener(function(data, localMessagePort) { } );
		} );
	},

	UTC_messagePort_addMessagePortListener_N_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_addMessagePortListener_N_001");

		TestEngine.log("Parameter count check.");
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, localPort, "addMessagePortListener");

		TestEngine.log("1st parameter check.");
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, localPort, "addMessagePortListener", 1);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, localPort, "addMessagePortListener", null);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, localPort, "addMessagePortListener", undefined);
	},

	UTC_messagePort_removeMessagePortListener_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_removeMessagePortListener_P_001");

		testNoExceptionWithMessage("removeMessagePortListener", function() {
			localPort.removeMessagePortListener(localPort_watchId);
			localPort_watchId = 0;
		} );
	},

	UTC_messagePort_removeMessagePortListener_N_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_removeMessagePortListener_N_001");

		TestEngine.log("Parameter count check.");
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, localPort, "removeMessagePortListener");

		TestEngine.log("1st parameter check.");
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, localPort, "removeMessagePortListener", 1);
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, localPort, "removeMessagePortListener", null);
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, localPort, "removeMessagePortListener", undefined);
	},

	UTC_messagePort_receiveMessage_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_receiveMessage_P_001");

		function onReceiveCB(data)
		{
			TestEngine.test("Data receive succeeded.", true);
			localPort.removeMessagePortListener(localPort_watchId);
			localPort_watchId = 0;
		}

		var objCb = TestEngine.registerCallback("addMessagePortListener",
			onReceiveCB,
			null,
			1);

		localPort_watchId = localPort.addMessagePortListener(objCb.successCallback);

		remotePortForRequest = tizen.messageport.requestRemoteMessagePort(
			remotePortForRequest_appId,
			remotePortForRequest_name);

		remotePortForRequest.sendMessage( [
			{ key:remotePortForRequest_key_appId, value:currentAppId },
			{ key:remotePortForRequest_key_portName, value:localPort_name}
		] );
	},

	UTC_messagePort_receiveRepliedMessage_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_receiveRepliedMessage_P_001");

		function onReceiveCB(data)
		{
			TestEngine.test("Data receive succeeded.", true);
			localPortForReceive.removeMessagePortListener(localPortForReceive_watchId);
			localPortForReceive_watchId = 0;
		}

		var objCb = TestEngine.registerCallback("addMessagePortListener",
			onReceiveCB,
			null,
			1);

		localPortForReceive = tizen.messageport.requestLocalMessagePort(localPortForReceive_name);
		localPortForReceive_watchId = localPortForReceive.addMessagePortListener(objCb.successCallback);

		remotePort.sendMessage( [
			{ key:"KEY1", value:"VALUE1" },
			{ key:"KEY2", value:"VALUE2" }
		], localPortForReceive );
	},

	UTC_messagePort_TrustedLocalMessagePort_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_TrusteLocalMessagePort_P_001");

		TestEngine.testPresence("LocalMessagePort.messagePortName presence", localPortTrusted.messagePortName);
		TestEngine.testPresence("LocalMessagePort.isTrusted presence", localPortTrusted.isTrusted);
		TestEngine.testPresence("LocalMessagePort.addMessagePortListener presence", localPortTrusted.addMessagePortListener);
		TestEngine.testPresence("LocalMessagePort.removeMessagePortListener presence", localPortTrusted.removeMessagePortListener);
	},

	UTC_messagePort_TrustedRemoteMessagePort_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_TrustedRemoteMessagePort_P_001");

		TestEngine.testPresence("RemoteMessagePort.messagePortName presence", remotePortTrusted.messagePortName);
		TestEngine.testPresence("RemoteMessagePort.appId presence", remotePortTrusted.appId);
		TestEngine.testPresence("RemoteMessagePort.isTrusted presence", remotePortTrusted.isTrusted);
		TestEngine.testPresence("RemoteMessagePort.sendMessage presence", remotePortTrusted.sendMessage);
	},

	UTC_messagePort_sendMessageTrusted_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_sendMessageTrusted_P_001");

		testNoExceptionWithMessage("sendMessage without localPortTrusted", function() {
			remotePortTrusted.sendMessage( [
				{ key:"KEY1", value:"value1" },
				{ key:"KEY2", value:"value2" },
				{ key:"KEY3", value:"value3" }
			] );
		} );
	},

	UTC_messagePort_sendMessageTrusted_N_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_sendMessageTrusted_N_001");

		TestEngine.log("Parameter count check.");
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePortTrusted, "sendMessage");

		TestEngine.log("1st parameter check.");
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePortTrusted, "sendMessage", 1);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePortTrusted, "sendMessage", null);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePortTrusted, "sendMessage", undefined);

		var param = [ { key:"KEY", value:"VALUE" } ];
		TestEngine.log("2nd parameter check.");
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePortTrusted, "sendMessage", param, 1);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, remotePortTrusted, "sendMessage", param, {});
	},

	UTC_messagePort_addTrustedMessagePortListener_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_addTrustedMessagePortListener_P_001");

		testNoExceptionWithMessage("addMessagePortListener", function() {
			localPortTrusted_watchId = localPortTrusted.addMessagePortListener(function(data, trustedLocalMessagePort) { } );
		} );
	},

	UTC_messagePort_addTrustedMessagePortListener_N_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_addTrustedMessagePortListener_N_001");

		TestEngine.log("Parameter count check.");
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, localPortTrusted, "addMessagePortListener");

		TestEngine.log("1st parameter check.");
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, localPortTrusted, "addMessagePortListener", 1);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, localPortTrusted, "addMessagePortListener", null);
		TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, localPortTrusted, "addMessagePortListener", undefined);
	},

	UTC_messagePort_removeTrustedMessagePortListener_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_removeTrustedMessagePortListener_P_001");

		testNoExceptionWithMessage("removeMessagePortListener", function() {
			localPortTrusted.removeMessagePortListener(localPortTrusted_watchId);
			localPortTrusted_watchId = 0;
		} );
	},

	UTC_messagePort_removeTrustedMessagePortListener_N_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_removeTrustedMessagePortListener_N_001");

		TestEngine.log("Parameter count check.");
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, localPortTrusted, "removeMessagePortListener");

		TestEngine.log("1st parameter check.");
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, localPortTrusted, "removeMessagePortListener", 1);
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, localPortTrusted, "removeMessagePortListener", null);
		TestEngine.catchErrorType("name", NOT_FOUND_ERR, localPortTrusted, "removeMessagePortListener", undefined);
	},

	UTC_messagePort_receiveMessageTrusted_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_receiveMessageTrusted_P_001");

		function onReceiveCB(data)
		{
			TestEngine.test("Data receive succeeded.", true);
			localPortTrusted.removeMessagePortListener(localPortTrusted_watchId);
			localPortTrusted_watchId = 0;
		}

		var objCb = TestEngine.registerCallback("addMessagePortListener",
			onReceiveCB,
			null,
			1);

		localPortTrusted_watchId = localPortTrusted.addMessagePortListener(objCb.successCallback);

		remotePortTrustedForRequest = tizen.messageport.requestTrustedRemoteMessagePort(
			remotePortTrustedForRequest_appId,
			remotePortTrustedForRequest_name);

		remotePortTrustedForRequest.sendMessage( [
			{ key:remotePortTrustedForRequest_key_appId, value:currentAppId },
			{ key:remotePortTrustedForRequest_key_portName, value:localPortTrusted_name}
		] );
	},

	UTC_messagePort_receiveRepliedMessageTrusted_P_001: function()
	{
		TestEngine.log("[Start] UTC_messagePort_receiveRepliedMessageTrusted_P_001");

		function onReceiveCB(data)
		{
			TestEngine.test("Data receive succeeded.", true);
			localPortTrustedForReceive.removeMessagePortListener(localPortTrustedForReceive_watchId);
			localPortTrustedForReceive_watchId = 0;
		}

		var objCb = TestEngine.registerCallback("addMessagePortListener",
			onReceiveCB,
			null,
			1);

		localPortTrustedForReceive = tizen.messageport.requestTrustedLocalMessagePort(localPortTrustedForReceive_name);
		localPortTrustedForReceive_watchId = localPortTrustedForReceive.addMessagePortListener(objCb.successCallback);

		remotePortTrusted.sendMessage( [
			{ key:"KEY1", value:"VALUE1" },
			{ key:"KEY2", value:"VALUE2" }
		], localPortTrustedForReceive );
	}
}

//=============================================================================

function testNoExceptionWithMessage(message, fun) {
	var testResult = true;
	try
	{
		fun();
	}
	catch (e)
	{
		testResult = false;
	}
	TestEngine.test(message, testResult);
}

function testConstructorNoException(object, constructorName, restArguments /* , ... */ ) {
	try {
		var retVal;
		try {
			var newArgs = []
			for(var i = 2; i < arguments.length; i++) {
				newArgs.push(arguments[i])
			}
			if(arguments.length < 2) {
				TestEngine.logErr("Wrong catchErrorType usage.");
				return null;
			}
			//no args
			if(arguments.length == 2) {
				retVal = new object[constructorName]();
			}
			//1 arg
			if(arguments.length == 3) {
				retVal = new object[constructorName](newArgs[0]);
			}
			//2 args
			if(arguments.length == 4) {
				retVal = new object[constructorName](newArgs[0], newArgs[1]);
			}
			//3 args
			if(arguments.length == 5) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2]);
			}
			// 4 args
			if(arguments.length == 6) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3]);
			}
			// 5 args
			if(arguments.length == 7) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4]);
			}
			// 6 args
			if(arguments.length == 8) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5]);
			}
			// 7 args
			if(arguments.length == 9) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6]);
			}
			// 8 args
			if(arguments.length == 10) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7]);
			}
			// 9 args
			if(arguments.length == 11) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7], newArgs[8]);
			}
			// 10 args
			if(arguments.length == 12) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7], newArgs[8], newArgs[9]);
			}

		} catch(error) {
			TestEngine.test("Error thrown while constructing " + constructorName + " : " + error.name, false);
			return null;
		}
		var isObj = (retVal);
		TestEngine.test("Constructor creating object.", isObj);
		if(isObj)
			return retVal;
		else
			return null;

	} catch(err) {
		TestEngine.countException++;
		logError("   TestEngine.testError failure:" + err.message);
	}
}

function catchErrorTypeForConstructor(errorTypeName, type, object, constructorName, restArguments /* , ... */ ) {
	try {
		var error;
		try {
			var newArgs = []
			for(var i = 4; i < arguments.length; i++) {
				newArgs.push(arguments[i])
			}
			var retVal = null;
			if(arguments.length < 4) {
				TestEngine.logErr("Wrong catchErrorType usage.");
				return retVal;
			}
			//no args
			if(arguments.length == 4) {
				retVal = new object[constructorName]();
			}
			//1 arg
			if(arguments.length == 5) {
				retVal = new object[constructorName](newArgs[0]);
			}
			//2 args
			if(arguments.length == 6) {
				retVal = new object[constructorName](newArgs[0], newArgs[1]);
			}
			//3 args
			if(arguments.length == 7) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2]);
			}
			// 4 args
			if(arguments.length == 8) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3]);
			}
			// 5 args
			if(arguments.length == 9) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4]);
			}
			// 6 args
			if(arguments.length == 10) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5]);
			}
			// 7 args
			if(arguments.length == 11) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6]);
			}
			// 8 args
			if(arguments.length == 12) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7]);
			}
			// 9 args
			if(arguments.length == 13) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7], newArgs[8]);
			}
			// 10 args
			if(arguments.length == 14) {
				retVal = new object[constructorName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7], newArgs[8], newArgs[9]);
			}

			TestEngine.logErr(constructorName + " no error thrown");
			return retVal;
		} catch(error) {
			TestEngine.testPresence("<error type from: new " + constructorName + ">", error[errorTypeName]);
			TestEngine.test("Error number", error[errorTypeName] == type);
			return;
		}
		TestEngine.logErr("Function " + constructorName + " desn't throw");
	} catch(err) {
		TestEngine.countException++;
		logError("   TestEngine.testError failure:" + err.message);
	}
}
