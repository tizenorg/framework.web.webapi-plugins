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

#ifndef SRC_TVWINDOW_TVWINDOW_EXTENSION_H_
#define SRC_TVWINDOW_TVWINDOW_EXTENSION_H_

#include "common/extension.h"
#include "tvwindow/tvwindow_manager.h"

namespace extension {
namespace tvwindow {

class TVWindowExtension : public common::Extension {
 public:
  TVWindowExtension();
  virtual ~TVWindowExtension();

  TVWindowManager& manager();

 private:
  // common::Extension implementation.
  virtual common::Instance* CreateInstance();
};

}  // namespace tvwindow
}  // namespace extension

#endif  // SRC_TVWINDOW_TVWINDOW_EXTENSION_H_