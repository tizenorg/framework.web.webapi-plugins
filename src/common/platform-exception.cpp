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

#include "platform-exception.h"

namespace webapi {
namespace common {

namespace {
const char* TYPE_MISMATCH_ERR = "TypeMismatchError";
const char* INVALID_VALUES_ERR = "InvalidValuesError";
const char* IO_ERR = "IOError";
const char* UNKNOWN_ERR = "UnknownError";
const char* SERVICE_NOT_AVAILABLE_ERR = "ServiceNotAvailableError";
const char* SECURITY_ERR = "SecurityError";
const char* NOT_SUPPORTED_ERR = "NotSupportedError";
const char* NOT_FOUND_ERR = "NotFoundError";
const char* INVALID_ACCESS_ERR = "InvalidAccessError";
const char* QUOTA_EXCEEDED_ERR = "QuotaExceededError";
}

BasePlatformException::BasePlatformException(const std::string& name,
                                             const std::string& message)
                                           : name_(name),
                                             message_(message) {
}

BasePlatformException::~BasePlatformException() {
}

std::string BasePlatformException::name() const {
    return name_;
}

std::string BasePlatformException::message() const {
    return message_;
}

json::Value BasePlatformException::ToJSON() const {
    return json::Value(json::Object({ { "name", json::Value(name_) }, { "message", json::Value(message_) } }));
}

TypeMismatchException::TypeMismatchException(const std::string& message)
    : BasePlatformException(TYPE_MISMATCH_ERR, message) {
}

InvalidValuesException::InvalidValuesException(const std::string& message)
    : BasePlatformException(INVALID_VALUES_ERR, message) {
}

IOException::IOException(const std::string& message)
    : BasePlatformException(IO_ERR, message) {
}

UnknownException::UnknownException(const std::string& message)
    : BasePlatformException(UNKNOWN_ERR, message) {
}

ServiceNotAvailableException::ServiceNotAvailableException(const std::string& message)
    : BasePlatformException(SERVICE_NOT_AVAILABLE_ERR, message) {
}

SecurityException::SecurityException(const std::string& message)
    : BasePlatformException(SECURITY_ERR, message) {
}

NotSupportedException::NotSupportedException(const std::string& message)
    : BasePlatformException(NOT_SUPPORTED_ERR, message) {
}

NotFoundException::NotFoundException(const std::string& message)
    : BasePlatformException(NOT_FOUND_ERR, message) {
}

InvalidAccessException::InvalidAccessException(const std::string& message)
    : BasePlatformException(INVALID_ACCESS_ERR, message) {
}

QuotaExceededException::QuotaExceededException(const std::string& message)
    : BasePlatformException(QUOTA_EXCEEDED_ERR, message) {
}

} // namespace common
} // namespace webapi
