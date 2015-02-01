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

#ifndef WEBAPI_PLUGINS_COMMON_PLATFORM_EXCEPTION_H_
#define WEBAPI_PLUGINS_COMMON_PLATFORM_EXCEPTION_H_

#include <string>

#include "json-parser.h"

namespace webapi {
namespace common {

class BasePlatformException {
public:
    BasePlatformException(const std::string& name, const std::string& message);
    virtual ~BasePlatformException();

    std::string name() const;
    std::string message() const;
    json::Value ToJSON() const;

protected:
    std::string name_;
    std::string message_;
};

class TypeMismatchException: public BasePlatformException {
public:
    TypeMismatchException(const std::string& message);
};

class InvalidValuesException: public BasePlatformException {
public:
    InvalidValuesException(const std::string& message);
};

class IOException: public BasePlatformException {
public:
    IOException(const std::string& message);
};

class UnknownException: public BasePlatformException {
public:
    UnknownException(const std::string& message);
};

class ServiceNotAvailableException: public BasePlatformException {
public:
    ServiceNotAvailableException(const std::string& message);
};

class SecurityException: public BasePlatformException {
public:
    SecurityException(const std::string& message);
};

class NotSupportedException: public BasePlatformException {
public:
    NotSupportedException(const std::string& message);
};

class NotFoundException: public BasePlatformException {
public:
    NotFoundException(const std::string& message);
};

class InvalidAccessException: public BasePlatformException {
public:
    InvalidAccessException(const std::string& message);
};

class QuotaExceededException: public BasePlatformException {
public:
    QuotaExceededException(const std::string& message);
};

} // namespace common
} // namespace webapi

#endif // WEBAPI_PLUGINS_COMMON_PLATFORM_EXCEPTION_H_
