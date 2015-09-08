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

#include <pkgmgr-info.h>
#include <wrt-common/native-context.h>

#include "json-parser.h"
#include "logger.h"
#include "native-plugin.h"
#include "platform-exception.h"
#include "current-application.h"
#include "filesystem-utils.h"

namespace webapi {
namespace filesystem {

using namespace webapi::common;

class FilesystemPlugin : public webapi::common::NativePlugin {
public:
    virtual void OnLoad();
};

EXPORT_NATIVE_PLUGIN(webapi::filesystem::FilesystemPlugin);

static void Filesystem_getWidgetPaths(const json::Object& args, json::Object& out);

/**
 * JSON: @code data: {method: 'Filesystem_checkPrivilege', args: {privilege: privilege}} @endcode
 * Invocation: @code native.callSync(request); @endcode
 * Return:
 * @code
 * {status: 'error', error: {name, message}}
 * {status: 'success'}
 * @endcode
 */
static void Filesystem_checkPrivilege(const json::Object& args, json::Object& out);

static void FileSystemManager_registerStorageStateChangeListener(const json::Object& args,
        json::Object& out);

static void FileSystemManager_triggerStorageStateChangeListeners(const json::Object& args,
        json::Object& out);

static void FileSystemManager_unregisterStorageStateChangeListener(const json::Object& args,
        json::Object& out);

static void FileSystemManager_fetchStorages(const json::Object& args, json::Object& out);

void FilesystemPlugin::OnLoad() {
#define DISPATCHER_ADDFUNCTION(N) dispatcher_.AddFunction(#N, N);
    DISPATCHER_ADDFUNCTION(Filesystem_getWidgetPaths);
    DISPATCHER_ADDFUNCTION(Filesystem_checkPrivilege);
    DISPATCHER_ADDFUNCTION(FileSystemManager_registerStorageStateChangeListener);
    DISPATCHER_ADDFUNCTION(FileSystemManager_triggerStorageStateChangeListeners);
    DISPATCHER_ADDFUNCTION(FileSystemManager_unregisterStorageStateChangeListener);
    DISPATCHER_ADDFUNCTION(FileSystemManager_fetchStorages);
#undef DISPATCHER_ADDFUNCTION
}

void Filesystem_getWidgetPaths(const json::Object& /*args*/, json::Object& out) {
    LoggerD("Entered");

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    //no input arguments
    //LoggerD("%d", args.size());

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    try {
        char *root_path = NULL;
        std::string pkg_id = CurrentApplication::GetInstance().GetPackageId();

        pkgmgrinfo_pkginfo_h handle = NULL;
        if (PMINFO_R_OK != pkgmgrinfo_pkginfo_get_pkginfo(pkg_id.c_str(), &handle)) {
            throw UnknownException("Error while getting package info");
        }

        if (PMINFO_R_OK != pkgmgrinfo_pkginfo_get_root_path(handle, &root_path)) {
            throw UnknownException("Error while getting package info");
        }

        //---------------------------------------------------------------
        // Construction of the response
        //---------------------------------------------------------------
        std::string root(root_path);
        LoggerD("root path: %s", root_path);

        pkgmgrinfo_pkginfo_destroy_pkginfo(handle);

        out.insert(std::make_pair("wgt-package", root + "/res/wgt"));
        out.insert(std::make_pair("wgt-private", root + "/data"));
        out.insert(std::make_pair("wgt-private-tmp", root + "/tmp"));

        NativePlugin::ReportSuccess(out);
    } catch (const BasePlatformException& e) {
        NativePlugin::ReportError(e, out);
    }
}

void Filesystem_checkPrivilege(const json::Object& args, json::Object& out) {
    LoggerD("Entered");

    //---------------------------------------------------------------
    // Interpretation and validation of arguments
    //---------------------------------------------------------------
    const auto it_privilege = args.find("privilege");
    const auto it_args_end = args.end();

    if (it_privilege == it_args_end ||
        !it_privilege->second.is<json::String>()) {
        LoggerE("Invalid parameter was passed.");
        throw InvalidValuesException("Invalid parameter was passed.");
    }

    //---------------------------------------------------------------
    // Implementation of functionality
    //---------------------------------------------------------------
    NativePlugin::CheckAccess(it_privilege->second.get<json::String>());

    //---------------------------------------------------------------
    // Construction of the response
    //---------------------------------------------------------------
    NativePlugin::ReportSuccess(out);
}

void FileSystemManager_registerStorageStateChangeListener(const json::Object& args,
        json::Object& out) {
    LoggerD("Entered");
    FilesystemUtils::RegisterListeners();

    NativePlugin::ReportSuccess(out);

    FileSystemManager_triggerStorageStateChangeListeners(args, out);
}

void FileSystemManager_triggerStorageStateChangeListeners(const json::Object& /*args*/,
        json::Object& /*out*/)
{
    LoggerD("Entered");
    std::vector<StoragePropertiesPtr> root_list = FilesystemUtils::getStorages();
    //Trigger callback for each storage
    for (auto it = root_list.begin(); it != root_list.end(); ++it) {
        json::Value result = json::Value(json::Object());
        json::Object& result_obj = result.get<json::Object>();

        FilesystemUtils::ReportStorage((*it), result_obj);

        wrt::common::NativeContext::GetInstance()->FireEvent("StorageStateChangeListener",
                result.serialize());
    }
}

void FileSystemManager_unregisterStorageStateChangeListener(const json::Object& /*args*/,
        json::Object& out) {
    LoggerD("Entered");

    FilesystemUtils::UnregisterListeners();
    NativePlugin::ReportSuccess(out);
}

void FileSystemManager_fetchStorages(const json::Object& /*args*/,
        json::Object& out) {
    LoggerD("Entered");
    json::Value resultArray = json::Value(json::Array());
    json::Array& resultArray_obj = resultArray.get<json::Array>();

    std::vector<StoragePropertiesPtr> root_list = FilesystemUtils::getStorages();
    for (auto it = root_list.begin(); it != root_list.end(); ++it){
        resultArray_obj.push_back(json::Value(json::Object()));
        json::Object& result_obj = resultArray_obj.back().get<json::Object>();

        //report 'normal' storage
        FilesystemUtils::ReportStorage((*it), result_obj);
        //report extra path property to cache it in JS
        result_obj.insert(std::make_pair("path", (*it)->getFullPath()));
    }

    NativePlugin::ReportSuccess(resultArray, out);
}

} // namespace filesystem
} // namespace webapi
