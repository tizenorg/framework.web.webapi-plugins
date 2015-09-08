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

#include "filesystem-utils.h"

#include <storage/storage.h>
#include <wrt-common/native-context.h>

#include "logger.h"
#include "platform-exception.h"

namespace webapi {
namespace filesystem {

using namespace webapi::common;


namespace {
const std::string kMountedStr= "MOUNTED";
const std::string kRemovedStr = "REMOVED";
const std::string kUnmountableStr = "UNMOUNTABLE";

const std::string kInternalStr = "INTERNAL";
const std::string kExternalStr = "EXTERNAL";
}

/////////////////////////// global storage list ////////////////////////////////
static std::vector<StoragePropertiesPtr> g_root_list;

/////////////////////////// StorageProperties ////////////////////////////////
StorageProperties::StorageProperties() :
        id(0),
        label(""),
        type(0),
        state(0),
        fullpath("")
{
}

StorageProperties::StorageProperties(const StorageProperties& src) :
    id(src.id),
    label(src.label),
    type(src.type),
    state(src.state),
    fullpath(src.fullpath)
{
}

void StorageProperties::setId (const int Id)
{
    id = Id;
}

void StorageProperties::setLabel (const std::string &Label)
{
    label = Label;
}

void StorageProperties::setType (const short Type)
{
    type = Type;
}

void StorageProperties::setState (const short State)
{
    state = State;
}

void StorageProperties::setFullPath (const std::string &FullPath)
{
    fullpath = FullPath;
}

int StorageProperties::getId() const
{
    return id;
}

std::string StorageProperties::getLabel() const
{
    return label;
}

short StorageProperties::getType() const
{
    return type;
}

std::string StorageProperties::getTypeString() const
{
    switch (type) {
    case TYPE_INTERNAL :
        return kInternalStr;
    case TYPE_EXTERNAL :
        return kExternalStr;
    default :
        throw InvalidValuesException("Unsupported type");
    }
}

short StorageProperties::getState() const
{
    return state;
}

std::string StorageProperties::getStateString() const
{
    switch (state) {
    case STATE_UNMOUNTABLE :
        return kUnmountableStr;
    case STATE_REMOVED :
        return kRemovedStr;
    case STATE_MOUNTED :
        return kMountedStr;
    case STATE_MOUNTED_READONLY :
        return kMountedStr;
    default :
        throw InvalidValuesException("Unsupported state");
    }
}

std::string StorageProperties::getFullPath() const
{
    return fullpath;
}

/////////////////////////// static listener functions ////////////////////////////////
static void storageStateChangedCB(int storage,
        storage_state_e state,
        void* /*user_data*/)
{
    LoggerD("Entered");
    std::string label;
    storage_type_e type;

    for (auto it = g_root_list.begin(); it != g_root_list.end(); ++it) {
        if ((*it)->getId() == storage) {
            StoragePropertiesPtr storageItem = (*it);
            label = (*it)->getLabel();

            if (storage_get_type(storage, &type) != STORAGE_ERROR_NONE) {
                LOGW("throw IOException");
                throw IOException("");
            }

            if (label.compare("") != 0) {
                storageItem->setId(storage);
                storageItem->setLabel(label);
                storageItem->setType(static_cast<short>(type));
                storageItem->setState(static_cast<short>(state));

                json::Value result = json::Value(json::Object());
                json::Object& result_obj = result.get<json::Object>();
                FilesystemUtils::ReportStorage(storageItem, result_obj);

                wrt::common::NativeContext::GetInstance()->FireEvent("StorageStateChangeListener",
                        result.serialize());
            }
            break;
        }
    }

}

static bool getSupportedDeviceCB(int storage,
        storage_type_e type,
        storage_state_e state,
        const char * path,
        void * user_data)
{
    LoggerD("Entered");
    std::vector<StoragePropertiesPtr>* storageVector =
    (std::vector<StoragePropertiesPtr>*)user_data;
    StoragePropertiesPtr storageItem(new StorageProperties());

    int size = 12;
    char buf[size];
    std::string label;
    std::string fullpath;
    if (path) {
        fullpath = path;
    } else {
        LoggerE("NULL pointer for path");
        throw InvalidValuesException("NULL pointer for path");
    }
    if (type == STORAGE_TYPE_INTERNAL) {
        snprintf(buf, size, "internal%d", storage);
        label.append(buf);
    } else if (type == STORAGE_TYPE_EXTERNAL) {
        snprintf(buf, size, "removable%d", storage);
        label.append(buf);
    } else {
        LOGW("Unknown storage type");
        throw InvalidValuesException("Unknown storage type");
    }

    LoggerD("%s state %d", label.c_str(), state);

    storageItem->setId(storage);
    storageItem->setLabel(label);
    storageItem->setType((short)type);
    storageItem->setState((short)state);
    storageItem->setFullPath(fullpath);

    if (storageVector) {
        storageVector->insert(storageVector->end(), storageItem);
    } else {
        LoggerE("NULL pointer for user data");
        throw InvalidValuesException(
                "NULL pointer for user data");
    }

    return true;
}

/////////////////////////// FilesystemListeners ////////////////////////////////

class FilesystemListeners {
public:
    FilesystemListeners();
    ~FilesystemListeners();

    void RegisterListeners();
    void UnregisterListeners();
private:
    bool isRegistered;
};

FilesystemListeners::FilesystemListeners() :
        isRegistered(false)
{
    LoggerD("Entered");
    //caching storage list to g_root_list
    storage_foreach_device_supported(getSupportedDeviceCB, &g_root_list);
}

FilesystemListeners::~FilesystemListeners()
{
    LoggerD("Entered");
    UnregisterListeners();
}

void FilesystemListeners::RegisterListeners()
{
    LoggerD("Entered");
    if (!isRegistered) {
        for (auto it = g_root_list.begin(); it != g_root_list.end(); ++it)
        {
            storage_set_state_changed_cb(
                    (*it)->getId(),//it->second,
                    storageStateChangedCB,
                    NULL);
        }
        isRegistered = true;
    }
}

void FilesystemListeners::UnregisterListeners()
{
    if (isRegistered){
        LoggerD("Unregistering");
        for (auto it = g_root_list.begin(); it != g_root_list.end(); ++it) {
            storage_unset_state_changed_cb((*it)->getId(), storageStateChangedCB);
        }
    }
}

/////////////////////////// filesystem_listeners object ////////////////////////

static FilesystemListeners filesystem_listeners;

void FilesystemUtils::RegisterListeners()
{
    LoggerD("Entered");
    filesystem_listeners.RegisterListeners();
}

void FilesystemUtils::UnregisterListeners()
{
    filesystem_listeners.UnregisterListeners();
}

std::vector<StoragePropertiesPtr> FilesystemUtils::getStorages()
{
    return g_root_list;
}

void FilesystemUtils::ReportStorage(StoragePropertiesPtr storage, webapi::common::json::Object& out)
{
    out.insert(std::make_pair("name", storage->getLabel()));
    out.insert(std::make_pair("type", storage->getTypeString()));
    out.insert(std::make_pair("state", storage->getStateString()));
}

} // namespace filesystem
} // namespace webapi
