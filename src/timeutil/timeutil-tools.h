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

#ifndef WEBAPI_PLUGINS_TIMEUTIL_TIMEUTIL_TOOLS_H__
#define WEBAPI_PLUGINS_TIMEUTIL_TIMEUTIL_TOOLS_H__

#include <memory>
#include <unicode/unistr.h>
#include "json-parser.h"

namespace webapi {
namespace time {

class TimeUtilTools
{
public:
    enum class DateTimeFormatType {
        kTimeFormat,
        kDateFormat,
        kDateShortFormat,
        kDateTimeFormat
    };
    enum class DSTTransition {
        kPreviousDST,
        kNextDST
    };
    static UDate GetDSTTransition(UDate dstTransitionDate,
            const std::shared_ptr<UnicodeString>& timezone_id,
            DSTTransition tr_type);
    static bool IsDST(UDate dstTransitionDate,
            const std::shared_ptr<UnicodeString>& timezone_id);
    static std::string GetTimezoneAbbreviation(
            UDate date, const std::shared_ptr<UnicodeString>& timezone_id);
    static std::string ToStringHelper(
            UDate date, std::shared_ptr<UnicodeString>& timezone_id, bool use_locale_fmt,
            TimeUtilTools::DateTimeFormatType type);
    static std::string ToUTF8String(const UnicodeString& uniStr);
    static UnicodeString* ToUnicodeString(const std::string& str);
    static std::string GetLocalTimeZone();
    static UnicodeString GetDateTimeFormat(DateTimeFormatType type, bool bLocale);
    static Locale* GetDefaultLocale();
    static std::string GetDateFormat(bool shortformat);
    static std::string GetTimeFormat();
    static void GetAvailableTimezones(common::json::Array* available_timezones);
};

}
}

#endif // WEBAPI_PLUGINS_TIMEUTIL_TIMEUTIL_TOOLS_H__
