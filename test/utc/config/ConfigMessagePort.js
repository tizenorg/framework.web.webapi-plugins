
try {
	(function() {
		TestEngine.setTestSuiteName("[MessagePort]");

		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_MessagePortManager_P_001, "UTC_messagePort_MessagePortManager_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_requestLocalMessagePort_P_001, "UTC_messagePort_requestLocalMessagePort_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_requestLocalMessagePort_N_001, "UTC_messagePort_requestLocalMessagePort_N_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_requestTrustedLocalMessagePort_P_001, "UTC_messagePort_requestTrustedLocalMessagePort_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_requestTrustedLocalMessagePort_N_001, "UTC_messagePort_requestTrustedLocalMessagePort_N_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_requestRemoteMessagePort_P_001, "UTC_messagePort_requestRemoteMessagePort_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_requestRemoteMessagePort_N_001, "UTC_messagePort_requestRemoteMessagePort_N_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_requestTrustedRemoteMessagePort_P_001, "UTC_messagePort_requestTrustedRemoteMessagePort_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_requestTrustedRemoteMessagePort_N_001, "UTC_messagePort_requestTrustedRemoteMessagePort_N_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_LocalMessagePort_P_001, "UTC_messagePort_LocalMessagePort_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_RemoteMessagePort_P_001, "UTC_messagePort_RemoteMessagePort_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_sendMessage_P_001, "UTC_messagePort_sendMessage_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_sendMessage_N_001, "UTC_messagePort_sendMessage_N_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_addMessagePortListener_P_001, "UTC_messagePort_addMessagePortListener_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_addMessagePortListener_N_001, "UTC_messagePort_addMessagePortListener_N_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_removeMessagePortListener_P_001, "UTC_messagePort_removeMessagePortListener_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_removeMessagePortListener_N_001, "UTC_messagePort_removeMessagePortListener_N_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_receiveMessage_P_001, "UTC_messagePort_receiveMessage_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_receiveRepliedMessage_P_001, "UTC_messagePort_receiveRepliedMessage_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_TrustedLocalMessagePort_P_001, "UTC_messagePort_TrustedLocalMessagePort_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_TrustedRemoteMessagePort_P_001, "UTC_messagePort_TrustedRemoteMessagePort_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_sendMessageTrusted_P_001, "UTC_messagePort_sendMessageTrusted_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_sendMessageTrusted_N_001, "UTC_messagePort_sendMessageTrusted_N_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_addTrustedMessagePortListener_P_001, "UTC_messagePort_addTrustedMessagePortListener_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_addTrustedMessagePortListener_N_001, "UTC_messagePort_addTrustedMessagePortListener_N_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_removeTrustedMessagePortListener_P_001, "UTC_messagePort_removeTrustedMessagePortListener_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_removeTrustedMessagePortListener_N_001, "UTC_messagePort_removeTrustedMessagePortListener_N_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_receiveMessageTrusted_P_001, "UTC_messagePort_receiveMessageTrusted_P_001");
		TestEngine.addTest(true,TestMessagePort.UTC_messagePort_receiveRepliedMessageTrusted_P_001, "UTC_messagePort_receiveRepliedMessageTrusted_P_001");
	})();
} catch (e) {
	alert(e.name + ":" + e.message);
}

