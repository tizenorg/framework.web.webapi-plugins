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

#ifndef WEBAPI_PLUGINS_COMMON_FUNCTION_DISPATCHER_H_
#define WEBAPI_PLUGINS_COMMON_FUNCTION_DISPATCHER_H_

#include <string>
#include <map>
#include <functional>

#include "json-parser.h"

namespace webapi {
namespace common {

typedef std::function<void(const json::Object&, json::Object&)> NativeFunction;

class FunctionDispatcher {
public:
    void AddFunction(const std::string& name, const NativeFunction& func);
    const NativeFunction& GetFunction(const std::string& name) const;
private:
    typedef std::map<std::string, NativeFunction> SyncFunctionMap;
    SyncFunctionMap sync_function_map_;
};

} // namespace common
} // namespace webapi

#endif // WEBAPI_PLUGINS_COMMON_FUNCTION_DISPATCHER_H_