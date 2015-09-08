/*
 * Copyright (c) 2014 Samsung Electronics Co., Ltd All Rights Reserved
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

#include <string>
#include <map>

#include <message_port.h>

#include <native-context.h>

#include "bundle-util.h"
#include "json-parser.h"
#include "logger.h"
#include "native-plugin.h"
#include "platform-exception.h"

namespace webapi {
namespace messageport {

namespace {
const int kUndefinedLocalPortId = -1;
} // namespace

/**
 * This MessagePortPlugin class handles the following JSON request:
 * JSON: @code request = {module: 'messageport'},
 *                        data: {…}}
 *       @endcode
 */

class MessagePortPlugin : public webapi::common::NativePlugin {
public:
    virtual void OnLoad();

    static void CheckError(int error_code);
};

EXPORT_NATIVE_PLUGIN(webapi::messageport::MessagePortPlugin);

using namespace webapi::common;

/**
 * Signature: @code LocalMessagePort MessagePortManager::requestLocalMessagePort(DOMString localMessagePortName); @endcode
 * JSON: @code data: {method: 'MessagePortManager_requestLocalMessagePort',
 *                    args: {localMessagePortName: localMessagePortName,
 *                           isTrusted: false}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error',
 *  error: {name,
 *          message}}
 * {status: 'success',
 *  result: {localmessageport}}
 * @endcode
 *
 * Signature: @code LocalMessagePort MessagePortManager::requestTrustedLocalMessagePort(DOMString localMessagePortName); @endcode
 * JSON: @code data: {method: 'MessagePortManager_requestLocalMessagePort',
 *                    args: {localMessagePortName: localMessagePortName,
 *                           isTrusted: true}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error',
 *  error: {name,
 *          message}}
 * {status: 'success',
 *  result: {localmessageport}}
 * @endcode
 */
static void MessagePortManager_requestLocalMessagePort(const json::Object& args, json::Object& out);

/**
 * Signature: @code RemoteMessagePort MessagePortManager::requestRemoteMessagePort(ApplicationId appId, DOMString remoteMessagePortName); @endcode
 * JSON: @code data: {method: 'MessagePortManager_requestRemoteMessagePort',
 *                    args: {appId: appId,
 *                           remoteMessagePortName: remoteMessagePortName,
 *                           isTrusted: false}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error',
 *  error: {name,
 *          message}}
 * {status: 'success',
 *  result: {remotemessageport}}
 * @endcode
 *
 * Signature: @code RemoteMessagePort MessagePortManager::requestTrustedRemoteMessagePort(ApplicationId appId, DOMString remoteMessagePortName); @endcode
 * JSON: @code data: {method: 'MessagePortManager_requestRemoteMessagePort',
 *                    args: {appId: appId,
 *                           remoteMessagePortName: remoteMessagePortName,
 *                           isTrusted: true}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error',
 *  error: {name,
 *          message}}
 * {status: 'success',
 *  result: {remotemessageport}}
 * @endcode
 */
static void MessagePortManager_requestRemoteMessagePort(const json::Object& args, json::Object& out);

/**
 * Signature: @code void RemoteMessagePort::sendMessage(MessagePortDataItem[] data, optional LocalMessagePort? localMessagePort); @endcode
 * JSON: @code data: {method: 'RemoteMessagePort_sendMessage',
 *                    args: {data: {},
 *                           localMessagePort: localMessagePortId,
 *                           remoteMessagePort: this}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error',
 *  error: {name,
 *          message}}
 * {status: 'success'}
 * @endcode
 */
static void RemoteMessagePort_sendMessage(const json::Object& args, json::Object& out);

void MessagePortPlugin::OnLoad() {
#define DISPATCHER_ADDFUNCTION(N) dispatcher_.AddFunction(#N, N);
    DISPATCHER_ADDFUNCTION(MessagePortManager_requestLocalMessagePort)
    DISPATCHER_ADDFUNCTION(MessagePortManager_requestRemoteMessagePort)
    DISPATCHER_ADDFUNCTION(RemoteMessagePort_sendMessage)
#undef DISPATCHER_ADDFUNCTION
}

void MessagePortPlugin::CheckError(int error_code) {
    LoggerD("error code: " << error_code);
    if (error_code >= 0) {
        return;
    }

    switch (error_code) {
    case MESSAGE_PORT_ERROR_INVALID_PARAMETER:
        LoggerE("Invalid parameter was passed. Err: " << error_code);
        throw InvalidValuesException("Invalid parameter was passed.");

    case MESSAGE_PORT_ERROR_MAX_EXCEEDED:
        LoggerE("Message has exceeded the maximum limit. Err: " << error_code);
        throw QuotaExceededException("Message has exceeded the maximum limit.");

    case MESSAGE_PORT_ERROR_OUT_OF_MEMORY:
        LoggerE("Cannot proceed due to a error (memory). Err: " << error_code);
        throw UnknownException("Cannot proceed due to a error. (memory)");

    case MESSAGE_PORT_ERROR_PORT_NOT_FOUND:
        LoggerE("The target application's port is not found. Err: " << error_code);
        throw UnknownException("The target application's port is not found.");

    case MESSAGE_PORT_ERROR_CERTIFICATE_NOT_MATCH:
        LoggerE("Application is not signed with the same certificate. Err: " << error_code);
        throw UnknownException("Application is not signed with the same certificate.");

    case MESSAGE_PORT_ERROR_IO_ERROR:
        LoggerE("Cannot proceed due to error (I/O). Err: " << error_code);
        throw UnknownException("Cannot proceed due to an error. (I/O)");

    case MESSAGE_PORT_ERROR_RESOURCE_UNAVAILABLE:
        LoggerE("Resource temporarily unavailable Err: " << error_code);
        throw UnknownException("Resource temporarily unavailable");

    default:
        LoggerE("Application's port is not found.");
        throw NotFoundException("Application's port is not found.");
    }
}

static void _message_port_message_cb(int id, const char* remote_app_id, const char* remote_port, bool trusted_message, bundle* data, void* /*user_data*/) {

    LoggerD("");
    json::Value value = json::Value(json::Object());
    json::Object& data_obj = value.get<json::Object>();

    data_obj.insert(std::make_pair("local_id", json::Value(static_cast<double>(id))));

    if (remote_app_id && remote_port) {
        data_obj.insert(std::make_pair("remote_app_id", json::Value(remote_app_id)));
        data_obj.insert(std::make_pair("remote_port", json::Value(remote_port)));
        data_obj.insert(std::make_pair("remote_is_trusted", json::Value(trusted_message)));
    }

    data_obj.insert(std::make_pair("data", json::Value(json::Object())));
    BundleUtil::ToJsonObject(data, data_obj["data"].get<json::Object>());

    wrt::common::NativeContext::GetInstance()->FireEvent("MESSAGEPORT_MESSAGE_RECEIVED", value.serialize());
}

void MessagePortManager_requestLocalMessagePort(const json::Object& args, json::Object& out) {
    LoggerD("");
    try {
        const auto it_name = args.find("localMessagePortName");
        const auto it_is_trusted = args.find("isTrusted");
        const auto it_args_end = args.end();

        if (it_name == it_args_end ||
            it_is_trusted == it_args_end ||
            !it_name->second.is<json::String>() ||
            !it_is_trusted->second.is<bool>()) {
            LoggerE("Invalid parameter was passed.");
            throw InvalidValuesException("Invalid parameter was passed.");
        }

        const json::String& name = it_name->second.get<json::String>();
        const bool is_trusted = it_is_trusted->second.get<bool>();

        decltype(&message_port_register_local_port) function = nullptr;
        function = is_trusted ? &message_port_register_trusted_local_port :
                               &message_port_register_local_port;

        int id = function(name.c_str(), _message_port_message_cb, NULL);

        MessagePortPlugin::CheckError(id);

        out.insert(std::make_pair("id", json::Value(static_cast<double>(id))));
        NativePlugin::ReportSuccess(out);
        LoggerD("Success");
    } catch (const BasePlatformException& e) {
        LoggerD("Error");
        NativePlugin::ReportError(e, out);
    }
}

void MessagePortManager_requestRemoteMessagePort(const json::Object& args, json::Object& out) {
    LoggerD("");
    try {
        const auto it_app_id = args.find("appId");
        const auto it_name = args.find("remoteMessagePortName");
        const auto it_is_trusted = args.find("isTrusted");
        const auto it_args_end = args.end();

        if (it_app_id == it_args_end ||
            it_name == it_args_end ||
            it_is_trusted == it_args_end ||
            !it_app_id->second.is<json::String>() ||
            !it_name->second.is<json::String>() ||
            !it_is_trusted->second.is<bool>()) {
            LoggerE("Invalid parameter was passed.");
            throw InvalidValuesException("Invalid parameter was passed.");
        }

        const json::String& app_id = it_app_id->second.get<json::String>();
        const json::String& name = it_name->second.get<json::String>();
        const bool is_trusted = it_is_trusted->second.get<bool>();

        decltype(&message_port_check_remote_port) function = nullptr;
        function = is_trusted ? &message_port_check_trusted_remote_port :
                               &message_port_check_remote_port;

        bool exists = false;
        int err = function(app_id.c_str(), name.c_str(), &exists);

        if (!exists) {
            LoggerE("Specified remote port does not exist.");
            throw NotFoundException("Application's port is not found.");
        }

        MessagePortPlugin::CheckError(err);

        NativePlugin::ReportSuccess(out);
        LoggerD("Success");
    } catch (const BasePlatformException& e) {
        LoggerD("Error");
        NativePlugin::ReportError(e, out);
    }
}

void RemoteMessagePort_sendMessage(const json::Object& args, json::Object& out) {
    LoggerD("");
    try {
        const auto it_data = args.find("data");
        const auto it_local_port_id = args.find("localMessagePort");
        const auto it_remote_port = args.find("remoteMessagePort");
        const auto it_args_end = args.end();

        if (it_data == it_args_end ||
            it_local_port_id == it_args_end ||
            it_remote_port == it_args_end ||
            !it_data->second.is<json::Object>() ||
            !it_local_port_id->second.is<double>() ||
            !it_remote_port->second.is<json::Object>()) {
            LoggerE("Invalid parameter was passed.");
            throw InvalidValuesException("Invalid parameter was passed.");
        }

        const json::Object& data = it_data->second.get<json::Object>();
        const int local_port_id = it_local_port_id->second.get<double>();
        const json::Object& remote_port = it_remote_port->second.get<json::Object>();

        const auto it_app_id = remote_port.find("appId");
        const auto it_name = remote_port.find("messagePortName");
        const auto it_is_trusted = remote_port.find("isTrusted");
        const auto it_remote_port_end = remote_port.end();

        if (it_app_id == it_remote_port_end ||
            it_name == it_remote_port_end ||
            it_is_trusted == it_remote_port_end ||
            !it_app_id->second.is<json::String>() ||
            !it_name->second.is<json::String>() ||
            !it_is_trusted->second.is<bool>()) {
            throw InvalidValuesException("Invalid parameter was passed.");
        }

        const json::String& app_id = it_app_id->second.get<json::String>();
        const json::String& name = it_name->second.get<json::String>();
        const bool is_trusted = it_is_trusted->second.get<bool>();

        bundle* b = bundle_create();
        BundleUtil::ToBundle(data, b);

        int err = MESSAGE_PORT_ERROR_NONE;

        if (kUndefinedLocalPortId != local_port_id) {
            decltype(&message_port_send_message_with_local_port) function = nullptr;
            function = is_trusted ? &message_port_send_trusted_message_with_local_port :
                                    &message_port_send_message_with_local_port;

            err = function(app_id.c_str(),
                           name.c_str(),
                           b,
                           local_port_id);
        } else {
            decltype(&message_port_send_message) function = nullptr;
            function = is_trusted ? &message_port_send_trusted_message :
                                    &message_port_send_message;

            err = function(app_id.c_str(),
                           name.c_str(),
                           b);
        }

        bundle_free(b);

        MessagePortPlugin::CheckError(err);

        NativePlugin::ReportSuccess(out);
        LoggerD("Success");
    } catch (const BasePlatformException& e) {
        LoggerD("Error");
        NativePlugin::ReportError(e, out);
    }
}

} // namespace messageport
} // namespace webapi
