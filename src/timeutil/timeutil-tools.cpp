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

#include "timeutil-tools.h"

#include <unicode/dtptngen.h>
#include <unicode/smpdtfmt.h>
#include <unicode/timezone.h>
#include <unicode/vtzone.h>

#include <vconf.h>

#include "logger.h"
#include "platform-exception.h"

using namespace webapi::common;

namespace webapi {
namespace time {

UDate TimeUtilTools::GetDSTTransition(UDate timestamp,
                                      const std::shared_ptr<UnicodeString>& timezone_id,
                                      DSTTransition tr_type) {
    UBool result = false;
    UDate dst_transition_date = timestamp;
    std::unique_ptr<VTimeZone> vtz(VTimeZone::createVTimeZoneByID(*timezone_id));

    TimeZoneTransition tz_trans;
    if (vtz->useDaylightTime()) {
        switch (tr_type) {
            case DSTTransition::kNextDST:
                result = vtz->getNextTransition(dst_transition_date, FALSE, tz_trans);
                break;

            case DSTTransition::kPreviousDST:
                result = vtz->getPreviousTransition(dst_transition_date, FALSE, tz_trans);
                break;
        }

        if (result) {
            dst_transition_date = tz_trans.getTime();
        }
    }

    return dst_transition_date;
}

bool TimeUtilTools::IsDST(UDate timestamp, const std::shared_ptr<UnicodeString>& timezone_id) {
    UErrorCode ec = U_ZERO_ERROR;
    std::unique_ptr<TimeZone> tz (TimeZone::createTimeZone(*timezone_id));
    std::unique_ptr<icu::Calendar> calendar (Calendar::createInstance(*tz, ec));

    if (U_FAILURE(ec)){
        LoggerE("Failed to create calendar instance: " << ec);
        throw UnknownException("Failed to create calendar instance");
    }
    calendar->setTime(timestamp, ec);
    if (U_FAILURE(ec)){
        LoggerE("Failed to set calendar date: " << ec);
        throw UnknownException("Failed to set calendar date");
    }
    bool result = static_cast<bool>(calendar->inDaylightTime(ec));
    if (U_FAILURE(ec)){
        LoggerE("Failed to get day light boolean: " << ec);
        throw UnknownException("Failed to get day light boolean");
    }
    return result;
}

std::string TimeUtilTools::GetTimezoneAbbreviation(
        UDate date, const std::shared_ptr<UnicodeString>& timezone_id) {
    UErrorCode ec = U_ZERO_ERROR;
    UnicodeString str;

    std::unique_ptr<DateFormat> fmt(new SimpleDateFormat(UnicodeString("z"),
                                                         Locale::getEnglish(), ec));
    if (U_SUCCESS(ec)) {
        std::unique_ptr<TimeZone> tz(TimeZone::createTimeZone(*timezone_id));
        fmt->setTimeZone(*tz);
        fmt->format(date, str);

        if ((str.length() > 3) && (str.compare(0, 3, "GMT") == 0)) {
            str.remove();
            std::unique_ptr<DateFormat> gmt(new SimpleDateFormat(UnicodeString("OOOO"),
                                                                     Locale::getEnglish(), ec));
            gmt->setTimeZone(*tz);
            gmt->format(date, str);
        }

        return TimeUtilTools::ToUTF8String(str);
    }
    LOGE("can't make SimpleDateFormat or can't get time");
    throw UnknownException("can't make SimpleDateFormat or can't get time");
}

std::string TimeUtilTools::ToStringHelper(UDate date,
                                          std::shared_ptr<UnicodeString>& timezone_id,
                                          bool use_locale_fmt,
                                          TimeUtilTools::DateTimeFormatType type) {
    UErrorCode ec = U_ZERO_ERROR;
    UnicodeString str;

    std::unique_ptr<Locale> default_locale(TimeUtilTools::GetDefaultLocale());
    std::unique_ptr<DateFormat> fmt(
            new SimpleDateFormat(
                    TimeUtilTools::GetDateTimeFormat(type, use_locale_fmt),
                    ((use_locale_fmt && default_locale != nullptr) ? *default_locale : Locale::getEnglish()),
                    ec));

    if (U_SUCCESS(ec)) {
        std::unique_ptr<TimeZone> tz(TimeZone::createTimeZone(*timezone_id));

        fmt->setTimeZone(*tz);
        fmt->format(date, str);

        return TimeUtilTools::ToUTF8String(str);
    }

    LOGE("can't make SimpleDateFormat or can't get time");
    throw UnknownException("can't make SimpleDateFormat or can't get time");
}

std::string TimeUtilTools::ToUTF8String(const UnicodeString& uni_str) {
    int buffer_len = sizeof(UChar) * static_cast<int>(uni_str.length()) + 1;

    std::unique_ptr<char, void(*)(void*)> result_buffer(static_cast<char*>(malloc(buffer_len)),
                                                        &std::free);

    if (!result_buffer) {
        LOGE("memory allocation error");
        throw UnknownException("memory allocation error");
    }

    memset(result_buffer.get(), 0, buffer_len);
    CheckedArrayByteSink sink(result_buffer.get(), buffer_len);
    uni_str.toUTF8(sink);

    if (sink.Overflowed()) {
        LOGE("Converting error");
        throw UnknownException("Converting error");
    }

    return result_buffer.get();
}

UnicodeString* TimeUtilTools::ToUnicodeString(const std::string& str) {
    return new UnicodeString(str.c_str());
}

std::string TimeUtilTools::GetLocalTimeZone() {
    UnicodeString id;
    std::unique_ptr<TimeZone> zone(TimeZone::createDefault());
    zone->getID(id);

    return ToUTF8String(id);
}

Locale* TimeUtilTools::GetDefaultLocale() {
    char* tempstr = vconf_get_str(VCONFKEY_REGIONFORMAT);

    if (nullptr == tempstr){
        return nullptr;
    }

    Locale* default_locale = nullptr;

    char* p = strchr(tempstr, '.');
    int len = strlen(tempstr) - strlen(".UTF-8");

    if (p && len > 0) {
        char* str_region = strndup(tempstr, len); //.UTF8 => 5
        default_locale = new Locale(str_region);
        free(str_region);
    }

    free(tempstr);

    if (default_locale && default_locale->isBogus()) {
        delete default_locale;
        default_locale = nullptr;
    }

    return default_locale;
}

UnicodeString TimeUtilTools::GetDateTimeFormat(DateTimeFormatType type, bool use_locale_fmt) {

    UErrorCode ec = U_ZERO_ERROR;
    Locale* default_locale = GetDefaultLocale();

    std::unique_ptr<DateTimePatternGenerator> date_time_pattern(
            DateTimePatternGenerator::createInstance(
                    ((use_locale_fmt && default_locale) ? *default_locale : Locale::getEnglish()),
                    ec));

    delete default_locale;
    if (U_SUCCESS(ec)) {
        UnicodeString pattern;

        switch (type) {
            case DateTimeFormatType::kDateFormat:
                pattern = date_time_pattern->getBestPattern(UDAT_YEAR_MONTH_WEEKDAY_DAY, ec);
                break;

            case DateTimeFormatType::kDateShortFormat:
                pattern = date_time_pattern->getBestPattern(UDAT_YEAR_NUM_MONTH_DAY, ec);
                break;

            default:
            {
                int ret = 0;
                int value = 0;
                ret = vconf_get_int(VCONFKEY_REGIONFORMAT_TIME1224, &value);
                // if failed, set default time format
                if (-1 == ret) {
                    value = VCONFKEY_TIME_FORMAT_12;
                }

                std::string skeletone;
                if (DateTimeFormatType::kTimeFormat != type) {
                    skeletone = UDAT_YEAR_MONTH_WEEKDAY_DAY;
                }

                if (VCONFKEY_TIME_FORMAT_12 == value) {
                    skeletone += "hhmmss";
                } else {
                    skeletone += "HHmmss";
                }

                std::unique_ptr<UnicodeString> skeletone_str(ToUnicodeString(skeletone));
                pattern = date_time_pattern->getBestPattern(*skeletone_str, ec);

                if (!use_locale_fmt) {
                    pattern += " 'GMT'Z v'";
                }
            }
            break;
        }

        return pattern;
    }

    return "";
}

std::string TimeUtilTools::GetDateFormat(bool shortformat) {
    UnicodeString time_format =
            TimeUtilTools::GetDateTimeFormat(
                    (shortformat ?
                            DateTimeFormatType::kDateShortFormat:
                            DateTimeFormatType::kDateFormat),
                            true);
    time_format = time_format.findAndReplace("E", "D");

    if (time_format.indexOf("MMM") > 0) {
        if (time_format.indexOf("MMMM") > 0){
            time_format = time_format.findAndReplace("MMMM", "M");
        } else {
            time_format = time_format.findAndReplace("MMM", "M");
        }
    } else {
        time_format = time_format.findAndReplace("M", "m");
    }

    int32_t i = 0;

    while (i < time_format.length() - 1) {
        if (time_format[i] == time_format[i + 1]) {
            time_format.remove(i, 1);
        } else {
            ++i;
        }
    }

    return TimeUtilTools::ToUTF8String(time_format);
}

std::string TimeUtilTools::GetTimeFormat() {
    UnicodeString time_format = TimeUtilTools::GetDateTimeFormat(
            DateTimeFormatType::kTimeFormat, true);
    time_format = time_format.findAndReplace("H", "h");
    time_format = time_format.findAndReplace("K", "h");
    time_format = time_format.findAndReplace("k", "h");
    time_format = time_format.findAndReplace("a", "ap");

    int32_t i = 0;

    while (i < time_format.length() - 1) {
        if (time_format[i] == time_format[i + 1]) {
            time_format.remove(i, 1);
        } else {
            ++i;
        }
    }
    return TimeUtilTools::ToUTF8String(time_format);
}

void TimeUtilTools::GetAvailableTimezones(json::Array* available_timezones) {
    UErrorCode ec = U_ZERO_ERROR;
    std::unique_ptr<StringEnumeration> tz_enum(TimeZone::createEnumeration());
    const char* str = nullptr;
    int32_t count = tz_enum->count(ec);

    if (U_SUCCESS(ec)) {
        int i = 0;
        do {
            int32_t resultLen = 0;
            str = tz_enum->next(&resultLen, ec);
            if (U_SUCCESS(ec)) {
                if (str != nullptr) {
                    available_timezones->push_back(json::Value(str));
                    ++i;
                }
            } else {
                LOGE("An error occurred");
                throw UnknownException("An error occurred");
            }
        } while ((str != nullptr) && (i < count));
    }
    else {
        LOGE("Can't get timezones list");
        throw UnknownException("Can't get timezones list");
    }
}

} // time
} // webapi
