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

#ifndef WEBAPI_PLUGINS_COMMON_CONVERTER_H_
#define WEBAPI_PLUGINS_COMMON_CONVERTER_H_

#include "common/json-parser.h"
#include "common/platform-exception.h"

namespace webapi {
namespace common {

// This is a wrapper around std::stol which throws exceptions from common rather than std
long stol(const std::string &str, std::size_t *pos = 0, int base = 10);

const common::json::Value &FindValue(const common::json::Object &in, const char *name);

inline bool IsNull(const common::json::Value &in) {
    return in.is<common::json::Null>();
}

inline bool IsNull(const common::json::Object &in, const char *name) {
    return IsNull(FindValue(in, name));
}

template <typename T>
const T &JsonCast(const common::json::Value &in) {
    if (!in.is<T>()) {
        throw common::UnknownException(std::string("Invalid JSON type"));
    }
    return in.get<T>();
}

template <typename T>
const T &FromJson(const common::json::Object &in, const char *name) {
    const common::json::Value &v = FindValue(in, name);
    return JsonCast<T>(v);
}

template <typename T, typename... Names>
const T &FromJson(const common::json::Object &in, const char *name, Names... names) {
    const common::json::Value &v = FindValue(in, name);
    if (!v.is<common::json::Object>()) {
        throw common::UnknownException(std::string("Invalid JSON type for property: ") + name +
                                       ".");
    }
    return FromJson<T>(v.get<common::json::Object>(), names...);
}

}  // common
}  // webapi

#endif // WEBAPI_PLUGINS_COMMON_CONVERTER_H_
