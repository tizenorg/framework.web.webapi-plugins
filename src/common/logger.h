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

#ifndef WEBAPI_PLUGINS_COMMON_LOGGER_H_
#define WEBAPI_PLUGINS_COMMON_LOGGER_H_

#include <dlog.h>

#include <sstream>

#undef LOG_TAG
#define LOG_TAG "WEBAPI-PLUGINS"

#define _LOGGER(prio, fmt, args...) \
    do { \
        std::ostringstream platformLog; \
        platformLog << "%s: %s(%d) > "; \
        platformLog << fmt; \
        print_log(prio, LOG_TAG, platformLog.str().c_str(), __MODULE__, __func__, __LINE__, ##args); \
    } while(0)

#ifdef TIZEN_ENGINEER_MODE
    #define LoggerD(fmt, args...)   _LOGGER(DLOG_DEBUG, fmt, ##args)
    #define LoggerI(fmt, args...)   _LOGGER(DLOG_INFO, fmt, ##args)
    #define LoggerW(fmt, args...)   _LOGGER(DLOG_WARN, fmt, ##args)
    #define LoggerE(fmt, args...)   _LOGGER(DLOG_ERROR, fmt, ##args)
#else
    #undef LOGD
    #define LOGD(...)
    #undef LOGI
    #define LOGI(...)
    #undef LOGW
    #define LOGW(...)

    #define LoggerD(fmt, args...)   do { } while(0)
    #define LoggerI(fmt, args...)   do { } while(0)
    #define LoggerW(fmt, args...)   do { } while(0)
    #ifndef LOGS_DISABLED_LOGE_ENABLED
        #define LoggerE(fmt, args...)   do { } while(0)
        #undef LOGE
        #define LOGE(...)
    #else
        #define LoggerE(fmt, args...)   _LOGGER(DLOG_ERROR, fmt, ##args)
    #endif // !LOGS_DISABLED_WITHOUT_LOGE
#endif

#ifdef TIZEN_ENGINEER_MODE
#define _SLOGGER(prio, fmt, args...) \
    do { \
        std::ostringstream platformLog; \
        platformLog << "%s: %s(%d) > [SECURE_LOG] "; \
        platformLog << fmt; \
        print_log(prio, LOG_TAG, platformLog.str().c_str(), __MODULE__, __func__, __LINE__, ##args); \
    } while(0)
#else
#define _SLOGGER(prio,fmt,args...)  do { } while(0)
#endif

#define SLoggerD(fmt, args...)  _SLOGGER(DLOG_DEBUG, fmt, ##args)
#define SLoggerI(fmt, args...)  _SLOGGER(DLOG_INFO, fmt, ##args)
#define SLoggerE(fmt, args...)  _SLOGGER(DLOG_ERROR, fmt, ##args)

#endif // WEBAPI_PLUGINS_COMMON_LOGGER_H_
