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

#ifndef WEBAPI_PLUGINS_FILESYSTEM_FILESYSTEM_UTILS_H__
#define WEBAPI_PLUGINS_FILESYSTEM_FILESYSTEM_UTILS_H__

#include <string>
#include <functional>
#include <vector>
#include <memory>

#include "json-parser.h"

namespace webapi {
namespace filesystem {

class StorageProperties
{
private:
    int id;
    std::string label;
    short type;
    short state;
    std::string fullpath;
public:
    enum StorageType
    {
        TYPE_INTERNAL = 0,
        TYPE_EXTERNAL,
    };

    enum StorageState
    {
        STATE_UNMOUNTABLE = -2,
        STATE_REMOVED = -1,
        STATE_MOUNTED = 0,
        STATE_MOUNTED_READONLY = 1,
    };

    void setId (const int Id);
    void setLabel (const std::string &Label);
    void setType (const short Type);
    void setState (const short State);
    void setFullPath (const std::string &FullPath);

    int getId() const;
    std::string getLabel() const;
    short getType() const;
    std::string getTypeString() const;
    short getState() const;
    std::string getStateString() const;
    std::string getFullPath() const;

    StorageProperties();
    StorageProperties(const StorageProperties& src);
};

typedef std::shared_ptr<StorageProperties> StoragePropertiesPtr;

class FilesystemUtils {
public:
    static void RegisterListeners();
    static void UnregisterListeners();
    static std::vector<StoragePropertiesPtr> getStorages();
    static void ReportStorage(StoragePropertiesPtr storage, webapi::common::json::Object& out);
};

} // namespace filesystem
} // namespace webapi

#endif // WEBAPI_PLUGINS_FILESYSTEM_FILESYSTEM_UTILS_H__
