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

#include "application-utils.h"

#include <string>

#include <time.h>
#include <app.h>
#include <app_alarm.h>

#include "json-parser.h"
#include "logger.h"
#include "native-plugin.h"
#include "platform-exception.h"

using namespace webapi::application;

namespace webapi {
namespace alarm {

namespace {
const std::string kPrivilegeAlarm = "http://tizen.org/privilege/alarm";

const std::string kAlarmRelative = "AlarmRelative";
const std::string kAlarmAbsolute = "AlarmAbsolute";

const char* kAlarmAbsoluteRecurrenceTypeKey = "RECURRENCE";
const char* kAlarmAbsoluteReccurrenceTypeInterval = "INTERVAL";
const char* kAlarmAbsoluteReccurrenceTypeByDayValue = "BYDAYVALUE";
const char* kAlarmAbsoluteRecurrenceTypeNone = "NONE";
const char* kAlarmAbsoluteDateKey = "DATE";

const char* kAlarmKeyType = "TYPE";

const char* kAlarmTypeValueAbsolute = "ABSOLUTE";
const char* kAlarmTypeValueRelative = "RELATIVE";

const char* kAlarmRelativeDelayKey = "RELATIVE_DELAY";

const char* kSundayShort = "SU";
const char* kMondayShort = "MO";
const char* kTuesdayShort = "TU";
const char* kWednesdayShort = "WE";
const char* kThuesdayShort = "TH";
const char* kFridayShort = "FR";
const char* kSaturdayShort = "SA";

}

class AlarmPlugin : public webapi::common::NativePlugin {
public:
    virtual void OnLoad();

    static void CheckError(int error_code);
};

EXPORT_NATIVE_PLUGIN(webapi::alarm::AlarmPlugin);

using namespace webapi::common;

/**
 * Signature: @code void add(alarm, applicationId, appControl); @endcode
 * JSON: @code data: {method: 'AlarmManager_add',
 *                    args: {alarm: alarm, applicationId: applicationId,
 *                    appControl: appControl, type: type, seconds: seconds}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {alarm_id}}
 * @endcode
 */
static void AlarmManager_add(const json::Object& args, json::Object& out);
/**
 * Signature: @code AlarmManager_remove(id); @endcode
 * JSON: @code data: {method: 'AlarmManager_remove',
 *                    args: {id: id}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success'}
 * @endcode
 */
static void AlarmManager_remove(const json::Object& args, json::Object& out);
/**
 * Signature: @code AlarmManager_removeAll(); @endcode
 * JSON: @code data: {method: 'AlarmManager_removeAll',
 *                    args: {}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success'}
 * @endcode
 */
static void AlarmManager_removeAll(const json::Object& args, json::Object& out);
/**
 * Signature: @code AlarmManager_get(id); @endcode
 * JSON: @code data: {method: 'AlarmManager_get',
 *                    args: {id: id}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {alarm}}
 * @endcode
 */
static void AlarmManager_get(const json::Object& args, json::Object& out);
/**
 * Signature: @code AlarmManager_getAll(); @endcode
 * JSON: @code data: {method: 'AlarmManager_getAll',
 *                    args: {}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {alarmArray}}
 * @endcode
 */
static void AlarmManager_getAll(const json::Object& args, json::Object& out);
/**
 * Signature: @code AlarmRelative_getRemainingSeconds(); @endcode
 * JSON: @code data: {method: 'AlarmRelative_getRemainingSeconds',
 *                    args: {id: id}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {seconds}}
 * @endcode
 */
static void AlarmRelative_getRemainingSeconds(const json::Object& args, json::Object& out);

/**
 * Signature: @code AlarmAbsolute_getNextScheduledDate(); @endcode
 * JSON: @code data: {method: 'AlarmAbsolute_getNextScheduledDate',
 *                    args: {id: id}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success', result: {date}}
 * @endcode
 */
static void AlarmAbsolute_getNextScheduledDate(const json::Object& args, json::Object& out);

void AlarmPlugin::OnLoad() {
#define DISPATCHER_ADDFUNCTION(N) dispatcher_.AddFunction(#N, N);
    DISPATCHER_ADDFUNCTION(AlarmManager_add)
    DISPATCHER_ADDFUNCTION(AlarmManager_remove)
    DISPATCHER_ADDFUNCTION(AlarmManager_removeAll)
    DISPATCHER_ADDFUNCTION(AlarmManager_get)
    DISPATCHER_ADDFUNCTION(AlarmManager_getAll)
    DISPATCHER_ADDFUNCTION(AlarmRelative_getRemainingSeconds)
    DISPATCHER_ADDFUNCTION(AlarmAbsolute_getNextScheduledDate)
#undef DISPATCHER_ADDFUNCTION
}

void AlarmPlugin::CheckError(int error_code) {
    if (error_code >= 0) {
        return;
    }
}

void AlarmManager_add(const json::Object& args, json::Object& out) {
    LoggerD("");
    NativePlugin::CheckAccess(kPrivilegeAlarm);

    const auto it_args_end = args.end();

    json::String alarm_type;
    const auto it_alarm_type = args.find("type");
    if (it_alarm_type != it_args_end &&
            it_alarm_type->second.is<json::String>()) {
        alarm_type = it_alarm_type->second.get<json::String>();
    }

    const auto it_alarm = args.find("alarm");

    if (it_alarm == it_args_end ||
            !it_alarm->second.is<json::Object>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    const json::Object& alarm = it_alarm->second.get<json::Object>();
    const auto it_alarm_end = alarm.end();

    json::String app_id;
    const auto it_app_id = args.find("applicationId");
    if (it_app_id != it_args_end &&
            it_app_id->second.is<json::String>()) {
        app_id = it_app_id->second.get<json::String>();
    }

    long long int seconds = 0;
    const auto it_seconds = args.find("seconds");
    if (it_seconds != it_args_end &&
            it_seconds->second.is<json::String>()) {
        seconds = atoll(it_seconds->second.get<json::String>().c_str());
    }

    app_control_h app_control;
    const auto it_app_control = args.find("appControl");
    if (it_app_control != it_args_end &&
            it_app_control->second.is<json::Object>()) {
        app_control = ApplicationUtils::ApplicationControlToService(
                it_app_control->second.get<json::Object>());
    } else {
        app_control_create(&app_control);
        app_control_set_operation(app_control, APP_CONTROL_OPERATION_DEFAULT);
    }

    app_control_set_app_id(app_control, app_id.c_str());

    int alarm_id = 0;

    if (kAlarmRelative == alarm_type) {
        app_control_add_extra_data(app_control, kAlarmKeyType, kAlarmTypeValueRelative);

        const auto it_delay = alarm.find("delay");
        const auto it_period = alarm.find("period");

        if (it_delay == it_alarm_end ||
            it_period == it_alarm_end ||
            !it_delay->second.is<double>()) {
                app_control_destroy(app_control);
                LoggerE("Invalid parameter was passed.");
                throw InvalidValuesException("Invalid parameter was passed.");
        }

        int delay = static_cast<int>(it_delay->second.get<double>());
        int period = 0;
        if (it_period->second.is<double>()) {
            period = static_cast<int>(it_period->second.get<double>());
        }

        std::string delay_str = std::to_string(delay);
        int ret = app_control_add_extra_data(app_control, kAlarmRelativeDelayKey, delay_str.c_str());
        if(APP_CONTROL_ERROR_NONE != ret) {
            app_control_destroy(app_control);
            LoggerE("Fail to add date from app_control.");
            throw UnknownException("Fail to add date from app_control.");
        }

        ret = alarm_schedule_after_delay(app_control, delay, period, &alarm_id);
        if (ALARM_ERROR_NONE != ret) {
            app_control_destroy(app_control);
            LoggerE("error thrown while add alarm to server.");
            throw UnknownException("error thrown while add alarm to server.");
        }
    } else {
        app_control_add_extra_data(app_control, kAlarmKeyType, kAlarmTypeValueAbsolute);
        app_control_add_extra_data(app_control, kAlarmAbsoluteRecurrenceTypeKey, kAlarmAbsoluteRecurrenceTypeNone);

        const auto it_period = alarm.find("period");
        const auto it_daysOfWeek = alarm.find("daysOfWeek");

        if (!it_seconds->second.is<json::String>()) {
                app_control_destroy(app_control);
                LoggerE("Invalid parameter was passed.");
                throw InvalidValuesException("Invalid parameter was passed.");
        }
        int period = 0;
        time_t second = seconds / 1000;
        struct tm *start_date;

        start_date = localtime(&second);
        mktime(start_date);

        char str_date[20];

        snprintf(str_date, sizeof(str_date),  "%d %d %d %d %d %d %d",start_date->tm_year, start_date->tm_mon,
                 start_date->tm_mday, start_date->tm_hour, start_date->tm_min, start_date->tm_sec, start_date->tm_isdst);

        app_control_add_extra_data(app_control, kAlarmAbsoluteDateKey, str_date);

        int ret = 0;
        if (it_period->second.is<double>()) {
            period = static_cast<int>(it_period->second.get<double>());
            ret = alarm_schedule_at_date(app_control, start_date, period, &alarm_id);
        } else if (it_daysOfWeek->second.is<picojson::array>()) {
            json::Array days_of_week = it_daysOfWeek->second.get<picojson::array>();
            int repeat_value = 0;
            for (auto iter = days_of_week.begin(); iter != days_of_week.end(); ++iter) {
                auto day = (*iter).get<std::string>();
                if (kSundayShort == day) {
                    repeat_value |= ALARM_WEEK_FLAG_SUNDAY;
                } else if (kMondayShort == day) {
                    repeat_value |= ALARM_WEEK_FLAG_MONDAY ;
                } else if (kTuesdayShort == day) {
                    repeat_value |= ALARM_WEEK_FLAG_TUESDAY ;
                } else if (kWednesdayShort == day) {
                    repeat_value |= ALARM_WEEK_FLAG_WEDNESDAY;
                } else if (kThuesdayShort == day) {
                    repeat_value |= ALARM_WEEK_FLAG_THURSDAY ;
                } else if (kFridayShort == day) {
                    repeat_value |= ALARM_WEEK_FLAG_FRIDAY ;
                } else if (kSaturdayShort == day) {
                    repeat_value |= ALARM_WEEK_FLAG_SATURDAY;
                } else {
                    app_control_destroy(app_control);
                    LoggerE("Invalid days of the week value.");
                    throw TypeMismatchException("Invalid days of the week value.");
                }

                ret = alarm_schedule_with_recurrence_week_flag(
                        app_control, start_date, repeat_value, &alarm_id);
            }
        } else {
            ret = alarm_schedule_at_date(app_control, start_date, 0, &alarm_id);
        }

        if (ALARM_ERROR_NONE != ret) {
            app_control_destroy(app_control);
            LoggerE("error thrown while add alarm to server.");
            throw UnknownException("error thrown while add alarm to server.");
        }
    }


    // result object
    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    result_obj.insert(std::make_pair("alarm_id",
             json::Value(std::to_string(alarm_id))));

    app_control_destroy(app_control);

    NativePlugin::ReportSuccess(result, out);
}

void AlarmManager_remove(const json::Object& args, json::Object& out) {
    LoggerD("");
    NativePlugin::CheckAccess(kPrivilegeAlarm);

    int id = 0;
    const auto it_id = args.find("id");
    const auto it_args_end = args.end();
    if (it_id != it_args_end &&
            it_id->second.is<double>()) {
        id = static_cast<int>(it_id->second.get<double>());
    }

    if (id <= 0) {
        LoggerE("id is wrong: " << id);
        throw NotFoundException("Invalid ID");
    }

    int ret = alarm_cancel(id);
    if (ret == ALARM_ERROR_NONE) {
        // no error;
    } else if (ret == ALARM_ERROR_INVALID_PARAMETER) {
        LoggerE("Alarm not found");
        throw NotFoundException("Alarm not found");
    } else {
        LoggerE("Platform thrown unknown error");
        throw UnknownException("Platform thrown unknown error");
    }

    NativePlugin::ReportSuccess(out);
}

void AlarmManager_removeAll(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");
    NativePlugin::CheckAccess(kPrivilegeAlarm);

    int ret = alarm_cancel_all();
    if (ret != ALARM_ERROR_NONE) {
        LoggerE("Platform thrown unknown error");
        throw UnknownException("Platform thrown unknown error");
    }

    NativePlugin::ReportSuccess(out);
}

static void GetAlarm(int id, json::Object& result_obj) {

    if (id <= 0) {
        LoggerE("id is wrong: " << id);
        throw NotFoundException("Invalid id");
    }

    app_control_h app_control = NULL;

    if (ALARM_ERROR_NONE != alarm_get_app_control(id, &app_control)) {
        LoggerE("Alarm not found");
        throw NotFoundException("Alarm not found");
    }

    char* alarm_type = NULL;
    if (APP_CONTROL_ERROR_NONE != app_control_get_extra_data(app_control, kAlarmKeyType, &alarm_type)) {
        app_control_destroy(app_control);
        LoggerE("Getting data failed");
        throw UnknownException("Unknown error occurred.");
    }

    result_obj.insert(std::make_pair("id",
             json::Value(std::to_string(id))));

    if (strcmp(alarm_type, kAlarmTypeValueAbsolute) == 0) {

        char* date_string;
        struct tm date;
        memset(&date, 0, sizeof(tm));
        int error = ALARM_ERROR_NONE;

        error = app_control_get_extra_data(app_control, kAlarmAbsoluteDateKey, &date_string);

        if( APP_CONTROL_ERROR_NONE != error ) {
            LoggerE("Fail to get AlarmDelay");
            throw TypeMismatchException("Alarm not found");
        }

        sscanf(date_string, "%d %d %d %d %d %d %d", &date.tm_year, &date.tm_mon,
            &date.tm_mday,  &date.tm_hour, &date.tm_min,  &date.tm_sec, &date.tm_isdst);
        mktime(&date);

        result_obj.insert(std::make_pair("year",
             json::Value(std::to_string(date.tm_year + 1900))));
        result_obj.insert(std::make_pair("month",
             json::Value(std::to_string(date.tm_mon))));
        result_obj.insert(std::make_pair("day",
             json::Value(std::to_string(date.tm_mday))));
        result_obj.insert(std::make_pair("hour",
             json::Value(std::to_string(date.tm_hour))));
        result_obj.insert(std::make_pair("min",
             json::Value(std::to_string(date.tm_min))));
        result_obj.insert(std::make_pair("sec",
             json::Value(std::to_string(date.tm_sec))));

        int interval = 0, byDayValue = 0;

        app_control_get_extra_data(app_control, kAlarmAbsoluteRecurrenceTypeKey, &alarm_type);

        if (!strcmp(alarm_type, kAlarmAbsoluteReccurrenceTypeInterval)) {
            alarm_get_scheduled_period(id, &interval);
            result_obj.insert(std::make_pair("second",
                 json::Value(std::to_string(interval))));
        } else if (!strcmp(alarm_type, kAlarmAbsoluteReccurrenceTypeByDayValue)) {
              LoggerD(byDayValue);
              json::Array& array = result_obj.insert(std::make_pair("second", json::Value(json::Array())))
                   .first->second.get<json::Array>();
              if (byDayValue & ALARM_WEEK_FLAG_SUNDAY)
                  array.push_back(json::Value(kSundayShort));
              if (byDayValue & ALARM_WEEK_FLAG_MONDAY)
                  array.push_back(json::Value(kMondayShort));
              if (byDayValue & ALARM_WEEK_FLAG_TUESDAY)
                  array.push_back(json::Value(kTuesdayShort));
              if (byDayValue & ALARM_WEEK_FLAG_WEDNESDAY)
                  array.push_back(json::Value(kWednesdayShort));
              if (byDayValue & ALARM_WEEK_FLAG_THURSDAY)
                  array.push_back(json::Value(kThuesdayShort));
              if (byDayValue & ALARM_WEEK_FLAG_FRIDAY)
                  array.push_back(json::Value(kFridayShort));
              if (byDayValue & ALARM_WEEK_FLAG_SATURDAY)
                  array.push_back(json::Value(kSaturdayShort));
        }

        result_obj.insert(std::make_pair("type",
                 json::Value(kAlarmAbsolute)));

    } else  if (strcmp(alarm_type, kAlarmTypeValueRelative) == 0) {
        int interval = 0;
        char* delay_string;

        int error = ALARM_ERROR_NONE;
        error = alarm_get_scheduled_period(id, &interval);
        if (error != ALARM_ERROR_NONE) {
            interval = 0;
        }
        error = app_control_get_extra_data(app_control, kAlarmRelativeDelayKey, &delay_string);
        if (APP_CONTROL_ERROR_NONE != error) {
            LoggerE("Fail to get AlarmDelay");
            throw TypeMismatchException("Alarm not found");
        }

        result_obj.insert(std::make_pair("type",
                 json::Value(kAlarmRelative)));
        result_obj.insert(std::make_pair("delay",
                 json::Value(delay_string)));
        result_obj.insert(std::make_pair("period",
                 json::Value(std::to_string(interval))));
        free(delay_string);
    } else {
        LoggerE("Unknown error occurred.");
        app_control_destroy(app_control);
        throw UnknownException("Unknown error occurred.");
    }

    app_control_destroy(app_control);
}

void AlarmManager_get(const json::Object& args, json::Object& out) {
    LoggerD("");

    int id = 0;
    const auto it_id = args.find("id");
    const auto it_args_end = args.end();
    if (it_id != it_args_end &&
            it_id->second.is<double>()) {
        id = static_cast<int>(it_id->second.get<double>());
    }

    // result object
    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    GetAlarm(id, result_obj);

    NativePlugin::ReportSuccess(result, out);
}

static bool alarm_iterate_callback(int alarm_id, void *user_data)
{
    std::vector<int> *alarmIds = reinterpret_cast<std::vector<int>*>(user_data);

    alarmIds->push_back(alarm_id);
    return true;
}

void AlarmManager_getAll(const json::Object& /*args*/, json::Object& out) {
    LoggerD("");

    std::vector<int> alarmIds;
    int error = alarm_foreach_registered_alarm(alarm_iterate_callback, &alarmIds);

    if (error == ALARM_ERROR_CONNECTION_FAIL) {
        LoggerE("Alarm system may not be ready yet.");
        alarmIds.clear();
    } else if (error != ALARM_ERROR_NONE) {
        LoggerE("Error occurred while getting all alarms : " << error);
        throw UnknownException("Unknown error occurred.");
    }

    json::Value resultArray = json::Value(json::Array());
    json::Array& resultArray_obj = resultArray.get<json::Array>();

    for (size_t i = 0 ; i < alarmIds.size(); i++) {

        resultArray_obj.push_back(json::Value(json::Object()));
        json::Object& result_obj = resultArray_obj.back().get<json::Object>();

        GetAlarm(alarmIds.at(i), result_obj);
    }

    NativePlugin::ReportSuccess(resultArray, out);
}

void AlarmRelative_getRemainingSeconds(const json::Object& args, json::Object& out) {
    LoggerD("");

    struct tm date;
    struct tm current;
    time_t currentTime;
    time_t nextTime;
    int id = 0;

    const auto it_id = args.find("id");
    const auto it_args_end = args.end();
    if (it_id != it_args_end &&
            it_id->second.is<double>()) {
        id = static_cast<int>(it_id->second.get<double>());
    }

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    int err = alarm_get_scheduled_date(id, &date);
    if(err != ALARM_ERROR_NONE) {
        LoggerI("alarm_get_scheduled_date error =" << err);
        if (err == ALARM_ERROR_INVALID_PARAMETER || err== ALARM_ERROR_CONNECTION_FAIL) {
            result_obj.insert(std::make_pair("seconds",
                     json::Value()));
            NativePlugin::ReportSuccess(result, out);
            return;
        } else {
            LoggerE("Unknown exception occurred. fail to get scheduled date");
            throw UnknownException("Unknown exception occurred. fail to get scheduled date");
        }
    }

    alarm_get_current_time(&current);
    nextTime = mktime(&date);
    currentTime = mktime(&current);

    long seconds = nextTime - currentTime;

    result_obj.insert(std::make_pair("seconds",
             json::Value(std::to_string(seconds))));
    NativePlugin::ReportSuccess(result, out);
}

void AlarmAbsolute_getNextScheduledDate(const json::Object& args, json::Object& out) {
    LoggerD("");

    int id = 0;

    const auto it_id = args.find("id");
    const auto it_args_end = args.end();
    if (it_id != it_args_end &&
            it_id->second.is<double>()) {
        id = static_cast<int>(it_id->second.get<double>());
    }

    struct tm date;
    int err = alarm_get_scheduled_date(id, &date);

    json::Value result = json::Value(json::Object());
    json::Object& result_obj = result.get<json::Object>();

    if(err != ALARM_ERROR_NONE) {
        result_obj.insert(std::make_pair("year",
             json::Value()));
        NativePlugin::ReportSuccess(result, out);
        return;
    }

    struct tm curr_date;
    err = alarm_get_current_time(&curr_date);
    if(err != ALARM_ERROR_NONE) {
        result_obj.insert(std::make_pair("year",
             json::Value()));
        NativePlugin::ReportSuccess(result, out);
        return;
    }

    if (mktime(&date) < mktime(&curr_date)) {
        result_obj.insert(std::make_pair("year",
             json::Value()));
        NativePlugin::ReportSuccess(result, out);
        return;
   }

    // tm struct contains years since 1900
    // there is added 1900 to tm_year to return proper date
    result_obj.insert(std::make_pair("year",
         json::Value(std::to_string(date.tm_year + 1900))));
    result_obj.insert(std::make_pair("month",
         json::Value(std::to_string(date.tm_mon))));
    result_obj.insert(std::make_pair("day",
         json::Value(std::to_string(date.tm_mday))));
    result_obj.insert(std::make_pair("hour",
         json::Value(std::to_string(date.tm_hour))));
    result_obj.insert(std::make_pair("min",
         json::Value(std::to_string(date.tm_min))));
    result_obj.insert(std::make_pair("sec",
         json::Value(std::to_string(date.tm_sec))));

    NativePlugin::ReportSuccess(result, out);
}

} // namespace alarm
} // namespace webapi

