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

#ifndef WEBAPI_PLUGINS_COMMON_CURRENT_APPLICATION_H_
#define WEBAPI_PLUGINS_COMMON_CURRENT_APPLICATION_H_

#include <string>

namespace webapi {
namespace common {

class CurrentApplication {
public:
    CurrentApplication(const CurrentApplication&) = delete;
    CurrentApplication& operator=(const CurrentApplication&) = delete;

    static CurrentApplication& GetInstance();
    pid_t GetProcessId() const;
    std::string GetApplicationId() const;
    std::string GetPackageId() const;

private:
    CurrentApplication();
    std::string FetchApplicationId() const;
    std::string FetchPackageId() const;

private:
    pid_t pid_;
    std::string app_id_;
    std::string package_id_;
};

} // namespace common
} // namespace webapi

#endif /* WEBAPI_PLUGINS_COMMON_CURRENT_APPLICATION_H_ */