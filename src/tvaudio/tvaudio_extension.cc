/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd All Rights Reserved
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

#include "tvaudio/tvaudio_extension.h"
#include "tvaudio/tvaudio_instance.h"

// This will be generated from tvaudio_api.js
extern const char kSource_tvaudio_api[];

namespace extension {
namespace tvaudio {

TVAudioExtension::TVAudioExtension() {
    SetExtensionName("tizen.tvaudiocontrol");
    SetJavaScriptAPI(kSource_tvaudio_api);
}

TVAudioExtension::~TVAudioExtension() {}

AudioControlManager& TVAudioExtension::manager() {
    // Initialize API on first request
    return AudioControlManager::getInstance();
}

common::Instance* TVAudioExtension::CreateInstance() {
    return new TVAudioInstance;
}

}  // namespace tvaudio
}  // namespace extension

common::Extension* CreateExtension() {
    return new extension::tvaudio::TVAudioExtension;
}