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

#include <memory>
#include <unicode/timezone.h>
#include <unicode/calendar.h>

#include <wrt-common/native-context.h>
#include <vconf.h>

#include "logger.h"
#include "json-parser.h"
#include "native-plugin.h"
#include "timeutil-tools.h"

namespace webapi {
namespace time {

enum ListenerType {
    kTimeChange,
    kTimezoneChange
};

using namespace webapi::common;

class TimePlugin : public webapi::common::NativePlugin {
public:
    virtual void OnLoad();
};

EXPORT_NATIVE_PLUGIN(webapi::time::TimePlugin);

/**
 * Signature: @code DOMString[] getAvailableTimezones(); @endcode
 * JSON: @code data: {method: 'TimeUtil_getAvailableTimezones', args: {}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {availableTimezones}}
 * @endcode
 */
static void TimeUtil_getAvailableTimezones(const json::Object& args, json::Object& out);
/**
 * Signature: @code DOMString getDateFormat(optional boolean? shortformat); @endcode
 * JSON: @code data: {method: 'TimeUtil_getDateFormat',
 *                      args: {shortformat: format}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {format}}
 * @endcode
 */
static void TimeUtil_getDateFormat(const json::Object& args, json::Object& out);
/**
 * Signature: @code DOMString getTimeFormat(); @endcode
 * JSON: @code data: {method: 'TimeUtil_getTimeFormat', args: {}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {format}}
 * @endcode
 */
static void TimeUtil_getTimeFormat(const json::Object& args, json::Object& out);
static void TimeUtil_setDateTimeChangeListener(const json::Object& args, json::Object& out);
static void TimeUtil_unsetDateTimeChangeListener(const json::Object& args, json::Object& out);
static void TimeUtil_setTimezoneChangeListener(const json::Object& args, json::Object& out);
static void TimeUtil_unsetTimezoneChangeListener(const json::Object& args, json::Object& out);
/**
 * Signature: @code DOMString getTimezone(); @endcode
 * JSON: @code data: {method: 'TZDate_getTimezone', args: {}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {timezoneId}}
 * @endcode
 */
static void TZDate_getTimezone(const json::Object& args, json::Object& out);
/**
 * Signature: @code TZDate_getTimezoneOffset(); @endcode
 * JSON: @code data: {method: 'TZDate_getTimezoneOffset',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_getTimezoneOffset(const json::Object& args, json::Object& out);
/**
 * Signature: @code DOMString toLocaleDateString(); @endcode
 * JSON: @code data: {method: 'TZDate_toLocaleDateString',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_toLocaleDateString(const json::Object& args, json::Object& out);
/**
 * Signature: @code DOMString toLocaleTimeString(); @endcode
 * JSON: @code data: {method: 'TZDate_toLocaleTimeString',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_toLocaleTimeString(const json::Object& args, json::Object& out);
/**
 * Signature: @code DOMString toLocaleString(); @endcode
 * JSON: @code data: {method: 'TZDate_toLocaleString',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_toLocaleString(const json::Object& args, json::Object& out);
/**
 * Signature: @code DOMString toDateString(); @endcode
 * JSON: @code data: {method: 'TZDate_toDateString',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_toDateString(const json::Object& args, json::Object& out);
/**
 * Signature: @code DOMString toTimeString(); @endcode
 * JSON: @code data: {method: 'TZDate_toTimeString',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_toTimeString(const json::Object& args, json::Object& out);
/**
 * Signature: @code DOMString toString(); @endcode
 * JSON: @code data: {method: 'TZDate_toString',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_toString(const json::Object& args, json::Object& out);
/**
 * Signature: @code DOMString getTimezoneAbbreviation(); @endcode
 * JSON: @code data: {method: 'TZDate_getTimezoneAbbreviation',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_getTimezoneAbbreviation(const json::Object& args, json::Object& out);
/**
 * Signature: @code boolean isDST(); @endcode
 * JSON: @code data: {method: 'TZDate_isDST',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_isDST(const json::Object& args, json::Object& out);
/**
 * Signature: @code TZDate? getPreviousDSTTransition(); @endcode
 * JSON: @code data: {method: 'TZDate_getPreviousDSTTransition',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_getPreviousDSTTransition(const json::Object& args, json::Object& out);
/**
 * Signature: @code TZDate? getNextDSTTransition(); @endcode
 * JSON: @code data: {method: 'TZDate_getNextDSTTransition',
 *                  args: {timezone: String(tzName),
 *                         timestamp: String(timestamp)}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {offset}}
 * @endcode
 */
static void TZDate_getNextDSTTransition(const json::Object& args, json::Object& out);

static void OnTimeChangedCallback(keynode_t* /*node*/, void* /*event_ptr*/);
static std::string GetDefaultTimezone();


void TimePlugin::OnLoad() {
    // TODO: implement
#define DISPATCHER_ADDFUNCTION(N) dispatcher_.AddFunction(#N, N);
    DISPATCHER_ADDFUNCTION(TimeUtil_getAvailableTimezones)
    DISPATCHER_ADDFUNCTION(TimeUtil_getDateFormat)
    DISPATCHER_ADDFUNCTION(TimeUtil_getTimeFormat)
    DISPATCHER_ADDFUNCTION(TimeUtil_setDateTimeChangeListener)
    DISPATCHER_ADDFUNCTION(TimeUtil_unsetDateTimeChangeListener)
    DISPATCHER_ADDFUNCTION(TimeUtil_setTimezoneChangeListener)
    DISPATCHER_ADDFUNCTION(TimeUtil_unsetTimezoneChangeListener)
    DISPATCHER_ADDFUNCTION(TZDate_getTimezone)
    DISPATCHER_ADDFUNCTION(TZDate_getTimezoneOffset)
    DISPATCHER_ADDFUNCTION(TZDate_toLocaleDateString)
    DISPATCHER_ADDFUNCTION(TZDate_toLocaleTimeString)
    DISPATCHER_ADDFUNCTION(TZDate_toLocaleString)
    DISPATCHER_ADDFUNCTION(TZDate_toDateString)
    DISPATCHER_ADDFUNCTION(TZDate_toTimeString)
    DISPATCHER_ADDFUNCTION(TZDate_toString)
    DISPATCHER_ADDFUNCTION(TZDate_getTimezoneAbbreviation)
    DISPATCHER_ADDFUNCTION(TZDate_isDST)
    DISPATCHER_ADDFUNCTION(TZDate_getPreviousDSTTransition)
    DISPATCHER_ADDFUNCTION(TZDate_getNextDSTTransition)
#undef DISPATCHER_ADDFUNCTION
}

/////////////////////////// TimeUtilListeners ////////////////////////////////

class TimeUtilListeners {
public:
    TimeUtilListeners();
    ~TimeUtilListeners();

    void RegisterVconfCallback(ListenerType type);
    void UnregisterVconfCallback(ListenerType type);

    std::string GetCurrentTimezone();
    void SetCurrentTimezone(std::string& newTimezone);

private:
    std::string current_timezone_;
    bool is_time_listener_registered_;
    bool is_timezone_listener_registered_;
};

TimeUtilListeners::TimeUtilListeners():
        current_timezone_(GetDefaultTimezone()),
        is_time_listener_registered_(false),
        is_timezone_listener_registered_(false)
{
    LoggerD("Entered");
}

TimeUtilListeners::~TimeUtilListeners(){
    LoggerD("Entered");
    if (is_time_listener_registered_ || is_timezone_listener_registered_) {
        if (0 != vconf_ignore_key_changed(VCONFKEY_SYSTEM_TIME_CHANGED, OnTimeChangedCallback)) {
            LOGE("Failed to unregister vconf callback");
        }
    }
 }

void TimeUtilListeners::RegisterVconfCallback(ListenerType type)
{
    LOGD("");
    if (!is_time_listener_registered_ && !is_timezone_listener_registered_){
        LOGD("registering listener on platform");
        if (0 != vconf_notify_key_changed(
                VCONFKEY_SYSTEM_TIME_CHANGED, OnTimeChangedCallback, nullptr)) {
            LOGE("Failed to register vconf callback");
            throw UnknownException("Failed to register vconf callback");
        }
    } else {
        LOGD("not registering listener on platform - already registered");
    }
    switch (type) {
    case kTimeChange :
        is_time_listener_registered_ = true;
        LOGD("time change listener registered");
        break;
    case kTimezoneChange :
        is_timezone_listener_registered_ = true;
        LOGD("time zone change listener registered");
        break;
    default :
        LOGE("Unknown type of listener");
        throw UnknownException("Unknown type of listener");
    }
}

void TimeUtilListeners::UnregisterVconfCallback(ListenerType type)
{
    LOGD("");
    switch (type) {
    case kTimeChange :
        is_time_listener_registered_ = false;
        LOGD("time change listener unregistered");
        break;
    case kTimezoneChange :
        is_timezone_listener_registered_ = false;
        LOGD("time zone change listener unregistered");
        break;
    default :
        throw UnknownException("Unknown type of listener");
    }
    if (!is_time_listener_registered_ && !is_timezone_listener_registered_) {
        LOGD("unregistering listener on platform");
        if (0 != vconf_ignore_key_changed(VCONFKEY_SYSTEM_TIME_CHANGED, OnTimeChangedCallback)) {
            LOGE("Failed to unregister vconf callback");
            throw UnknownException("Failed to unregister vconf callback");
        }
    }
}

std::string TimeUtilListeners::GetCurrentTimezone(){
    return current_timezone_;
}

void TimeUtilListeners::SetCurrentTimezone(std::string& newTimezone){
    current_timezone_ = newTimezone;
}

static std::string GetDefaultTimezone() {
    LOGD("");
    char buf[1024];
    std::string result;
    ssize_t len = readlink("/opt/etc/localtime", buf, sizeof(buf)-1);
    if (len != -1) {
        buf[len] = '\0';
    } else {
        /* handle error condition */
        return result;
    }
    result = std::string(buf+strlen("/usr/share/zoneinfo/"));

    LoggerD("tzpath = %s", result.c_str());
    return result;
}

/////////////////////////// TimeUtilListeners object ////////////////////////
static TimeUtilListeners g_time_util_listeners_obj;

static void OnTimeChangedCallback(keynode_t* /*node*/, void* /*event_ptr*/)
{
    LoggerD("");
    std::string defaultTimezone = GetDefaultTimezone();

    if (g_time_util_listeners_obj.GetCurrentTimezone() != defaultTimezone) {
        g_time_util_listeners_obj.SetCurrentTimezone(defaultTimezone);
        //call timezone callback
        wrt::common::NativeContext::GetInstance()->FireEvent("TimezoneChangeListener", "");
    }
    //call date time callback
    wrt::common::NativeContext::GetInstance()->FireEvent("DateTimeChangeListener", "");
}

//////////////////  TimeUtil  //////////////////////////
void TimeUtil_getAvailableTimezones(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");
    //LoggerD("%d", args.size());

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    auto array = result_obj.insert(std::make_pair("availableTimezones",
                                                    json::Value(json::Array())));
    TimeUtilTools::GetAvailableTimezones(&array.first->second.get<json::Array>());

    NativePlugin::ReportSuccess(result, out);
    LoggerD("Success");
}

void TimeUtil_getDateFormat(const json::Object& args, json::Object& out) {
    LoggerD("");
    LoggerD("%d", args.size());
    const auto it_args_end = args.end();
    const auto it_shortformat = args.find("shortformat");
    if (it_shortformat == it_args_end || !it_shortformat->second.is<bool>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    bool shortformat = it_shortformat->second.get<bool>();
    result_obj.insert(std::make_pair("format", TimeUtilTools::GetDateFormat(shortformat)));

    NativePlugin::ReportSuccess(result, out);
    LoggerD("Success");
}

void TimeUtil_getTimeFormat(const json::Object& /* args */, json::Object& out) {
    LoggerD("");

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    result_obj.insert(std::make_pair("format", TimeUtilTools::GetTimeFormat()));

    NativePlugin::ReportSuccess(result, out);
    LoggerD("Success");
}

void TimeUtil_setDateTimeChangeListener(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");
    g_time_util_listeners_obj.RegisterVconfCallback(kTimeChange);
    NativePlugin::ReportSuccess( out);
    LoggerD("Success");
}

void TimeUtil_unsetDateTimeChangeListener(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");
    g_time_util_listeners_obj.UnregisterVconfCallback(kTimeChange);
    NativePlugin::ReportSuccess( out);
    LoggerD("Success");
}

void TimeUtil_setTimezoneChangeListener(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");
    g_time_util_listeners_obj.RegisterVconfCallback(kTimezoneChange);
    NativePlugin::ReportSuccess( out);
    LoggerD("Success");
}

void TimeUtil_unsetTimezoneChangeListener(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");
    g_time_util_listeners_obj.UnregisterVconfCallback(kTimezoneChange);
    NativePlugin::ReportSuccess( out);
    LoggerD("Success");
}


void TZDate_getTimezone(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    result_obj.insert(std::make_pair("timezoneId", TimeUtilTools::GetLocalTimeZone()));

    NativePlugin::ReportSuccess(result, out);
    LoggerD("Success");
}

void TZDate_getTimezoneOffset(const json::Object& args, json::Object& out) {
    LoggerD("");
    const auto it_args_end = args.end();

    const auto it_timezone = args.find("timezone");
    const auto it_timestamp = args.find("timestamp");
    if (it_timezone == it_args_end ||
            !it_timezone->second.is<json::String>() ||
            it_timestamp == it_args_end ||
            !it_timestamp->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }
    const std::string& timezone_id = it_timezone->second.get<json::String>();
    LoggerD("Getting timezone details for id: %s ", timezone_id.c_str());

    const std::string& timestamp_str = it_timestamp->second.get<json::String>();

    std::unique_ptr<UnicodeString> unicode_id (new UnicodeString(timezone_id.c_str()));
    std::unique_ptr<TimeZone> tz (TimeZone::createTimeZone(*unicode_id));

    if (TimeZone::getUnknown() == *tz) {
        throw InvalidValuesException("Unknown timezone.");
    }

    const int32_t oneHour = 3600000;
    UDate date = std::stod(timestamp_str);
    int32_t stdOffset = 0;
    int32_t dstOffset = 0;
    UErrorCode ec = U_ZERO_ERROR;
    //offset is get for target LOCAL date timestamp, but it should be UTC timestamp,
    //so it has to be checked below against DST edge condition
    tz->getOffset(date, false, stdOffset, dstOffset, ec);
    LOGD("stdOffset: %d, dstOffset: %d", stdOffset, dstOffset);

    //this section checks if date is not in DST transition point
    //check if date shifted to UTC timestamp is still with the same offset
    int32_t dstOffsetBefore = 0;
    tz->getOffset(date - stdOffset - dstOffset, false, stdOffset, dstOffsetBefore, ec);
    LOGD("stdOffset: %d, dstOffsetBefore: %d", stdOffset, dstOffsetBefore);

    //it has to be checked if it is 'missing' hour case
    int32_t dstOffsetAfterBefore = 0;
    tz->getOffset(date - stdOffset - dstOffset + oneHour,
            false, stdOffset, dstOffsetAfterBefore, ec);
    LOGD("stdOffset: %d, dstOffsetAfterBefore: %d", stdOffset, dstOffsetAfterBefore);

    //offset would be minimum of local and utc timestamp offsets
    //(to work correctly even if DST transtion is 'now')
    dstOffset = std::min(dstOffset, dstOffsetBefore);

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    result_obj.insert(std::make_pair("offset", std::to_string(stdOffset + dstOffset)));
    //this value is to correct 'missing' hour also in JS
    result_obj.insert(std::make_pair("modifier",
                std::to_string(dstOffsetAfterBefore - dstOffsetBefore)));


    NativePlugin::ReportSuccess(result, out);
    LoggerD("Success");
}

static void ToStringTemplate(const json::Object& args,
                             bool use_locale_fmt,
                             TimeUtilTools::DateTimeFormatType type,
                             json::Object* out) {
    LoggerD("");
    const auto it_args_end = args.end();

    const auto it_timezone = args.find("timezone");
    const auto it_timestamp = args.find("timestamp");
    if (it_timezone == it_args_end ||
            !it_timezone->second.is<json::String>() ||
            it_timestamp == it_args_end ||
            !it_timestamp->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }
    const std::string& timezone_id = it_timezone->second.get<json::String>();
    std::shared_ptr<UnicodeString> unicode_id (new UnicodeString(timezone_id.c_str()));
    LoggerD("Getting timezone details for id: %s ", timezone_id.c_str());

    const std::string& timestamp_str = it_timestamp->second.get<json::String>();
    UDate date = std::stod(timestamp_str);

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();
    result_obj.insert(
            std::make_pair("string", TimeUtilTools::ToStringHelper(date, unicode_id,
                    use_locale_fmt, type)));

    NativePlugin::ReportSuccess(result, *out);
    LoggerD("Success");
}


void TZDate_toLocaleDateString(const json::Object& args, json::Object& out) {
    LoggerD("");
    ToStringTemplate(args, true, TimeUtilTools::DateTimeFormatType::kDateFormat, &out);
    LoggerD("Success");
}

void TZDate_toLocaleTimeString(const json::Object& args, json::Object& out) {
    LoggerD("");
    ToStringTemplate(args, true, TimeUtilTools::DateTimeFormatType::kTimeFormat, &out);
    LoggerD("Success");
}

void TZDate_toLocaleString(const json::Object& args, json::Object& out) {
    LoggerD("");
    ToStringTemplate(args, true, TimeUtilTools::DateTimeFormatType::kDateTimeFormat, &out);
    LoggerD("Success");
}

void TZDate_toDateString(const json::Object& args, json::Object& out) {
    LoggerD("");
    ToStringTemplate(args, false, TimeUtilTools::DateTimeFormatType::kDateFormat, &out);
    LoggerD("Success");
}

void TZDate_toTimeString(const json::Object& args, json::Object& out) {
    LoggerD("");
    ToStringTemplate(args, false, TimeUtilTools::DateTimeFormatType::kTimeFormat, &out);
    LoggerD("Success");
}

void TZDate_toString(const json::Object& args, json::Object& out) {
    LoggerD("");
    ToStringTemplate(args, false, TimeUtilTools::DateTimeFormatType::kDateTimeFormat, &out);
    LoggerD("Success");
}

void TZDate_getTimezoneAbbreviation(const json::Object& args, json::Object& out) {
    LoggerD("");
    const auto it_args_end = args.end();

    const auto it_timezone = args.find("timezone");
    const auto it_timestamp = args.find("timestamp");
    if (it_timezone == it_args_end ||
            !it_timezone->second.is<json::String>() ||
            it_timestamp == it_args_end ||
            !it_timestamp->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }
    const std::string& timezone_id = it_timezone->second.get<json::String>();
    std::shared_ptr<UnicodeString> unicode_id (new UnicodeString(timezone_id.c_str()));

    const std::string& timestamp_str = it_timestamp->second.get<json::String>();
    UDate date = std::stod(timestamp_str);

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();
    result_obj.insert(
            std::make_pair("abbreviation",
                    TimeUtilTools::GetTimezoneAbbreviation(date, unicode_id)));

    NativePlugin::ReportSuccess(result, out);
    LoggerD("Success");
}

void TZDate_isDST(const json::Object& args, json::Object& out) {
    LoggerD("");
    const auto it_args_end = args.end();

    const auto it_timezone = args.find("timezone");
    const auto it_timestamp = args.find("timestamp");
    if (it_timezone == it_args_end ||
            !it_timezone->second.is<json::String>() ||
            it_timestamp == it_args_end ||
            !it_timestamp->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }
    const std::string& timezone_id = it_timezone->second.get<json::String>();
    std::shared_ptr<UnicodeString> unicode_id (new UnicodeString(timezone_id.c_str()));

    const std::string& timestamp_str = it_timestamp->second.get<json::String>();
    UDate date = std::stod(timestamp_str);

    try {
        json::Value result = json::Value(json::Object());
        json::Object& result_obj = result.get<json::Object>();
        result_obj.insert(
                std::make_pair("isDST", TimeUtilTools::IsDST(date, unicode_id)));
        NativePlugin::ReportSuccess(result, out);
        LoggerD("Success");
    } catch (const BasePlatformException& e) {
        NativePlugin::ReportError(e, out);
    }
}

void TZDate_getPreviousDSTTransition(const json::Object& args, json::Object& out) {
    LoggerD("");
    const auto it_args_end = args.end();

    const auto it_timezone = args.find("timezone");
    const auto it_timestamp = args.find("timestamp");
    if (it_timezone == it_args_end ||
            !it_timezone->second.is<json::String>() ||
            it_timestamp == it_args_end ||
            !it_timestamp->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }
    const std::string& timezone_id = it_timezone->second.get<json::String>();
    std::shared_ptr<UnicodeString> unicode_id (new UnicodeString(timezone_id.c_str()));

    const std::string& timestamp_str = it_timestamp->second.get<json::String>();
    UDate date = std::stod(timestamp_str);

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();
    result_obj.insert(
            std::make_pair("prevDSTDate",
                    TimeUtilTools::GetDSTTransition(date, unicode_id,
                                                    TimeUtilTools::DSTTransition::kPreviousDST)));

    NativePlugin::ReportSuccess(result, out);
    LoggerD("Success");
}

void TZDate_getNextDSTTransition(const json::Object& args, json::Object& out) {
    LoggerD("");
    const auto it_args_end = args.end();

    const auto it_timezone = args.find("timezone");
    const auto it_timestamp = args.find("timestamp");
    if (it_timezone == it_args_end ||
            !it_timezone->second.is<json::String>() ||
            it_timestamp == it_args_end ||
            !it_timestamp->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }
    const std::string& timezone_id = it_timezone->second.get<json::String>();
    std::shared_ptr<UnicodeString> unicode_id (new UnicodeString(timezone_id.c_str()));

    const std::string& timestamp_str = it_timestamp->second.get<json::String>();
    UDate date = std::stod(timestamp_str);

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();
    result_obj.insert(
            std::make_pair("nextDSTDate",
                    TimeUtilTools::GetDSTTransition(date, unicode_id,
                                                    TimeUtilTools::DSTTransition::kNextDST)));

    NativePlugin::ReportSuccess(result, out);
    LoggerD("Success");
}

} // namespace time
} // namespace webapi
