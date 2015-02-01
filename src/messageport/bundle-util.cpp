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

#include "bundle-util.h"

#include <string>

#include "logger.h"

namespace webapi {
namespace messageport {
namespace BundleUtil {

using namespace webapi::common;

void _bundle_iter(const char* key, const int type, const bundle_keyval_t *kv, void *user_data) {
    if (type != BUNDLE_TYPE_STR) {
        LoggerW("Cannot handle bundle type: " << type);
        return;
    }

    json::Object* obj = static_cast<json::Object*>(user_data);

    void* basic_val = NULL;
    size_t basic_size = 0;

    bundle_keyval_t *kv_tmp = const_cast<bundle_keyval_t*>(kv);
    bundle_keyval_get_basic_val(kv_tmp, &basic_val, &basic_size);

    obj->insert(std::make_pair(key, json::Value(static_cast<const char*>(basic_val))));
}


void ToJsonObject(bundle* b, json::Object& o) {
    if (nullptr == b) {
        return;
    }

    bundle_foreach(b, _bundle_iter, static_cast<void*>(&o));
}

void ToBundle(const json::Object& o, bundle* b) {
    for (auto it = o.begin(); it != o.end(); ++it) {
        // TODO(p.andruszkie@samsung.com) verify if it should be to_str() or serialize()
        bundle_add_str(b, it->first.c_str(), it->second.to_str().c_str());
    }
}

} // namespace BundleUtil
} // namespace messageport
} // namespace webapi
