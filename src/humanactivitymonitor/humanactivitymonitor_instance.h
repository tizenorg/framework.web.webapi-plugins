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

#ifndef HUMANACTIVITYMONITOR_HUMANACTIVITYMONITOR_INSTANCE_H_
#define HUMANACTIVITYMONITOR_HUMANACTIVITYMONITOR_INSTANCE_H_

#include <memory>

#include "common/extension.h"
#include "common/platform_result.h"
#include "humanactivitymonitor/humanactivitymonitor_manager.h"

namespace extension {
namespace humanactivitymonitor {

class HumanActivityMonitorInstance : public common::ParsedInstance {
 public:
  HumanActivityMonitorInstance();
  virtual ~HumanActivityMonitorInstance();

 private:
  void HumanActivityMonitorManagerStop(
      const picojson::value& args, picojson::object& out);
  void HumanActivityMonitorManagerUnsetAccumulativePedometerListener(
      const picojson::value& args, picojson::object& out);
  void HumanActivityMonitorManagerGetHumanActivityData(
      const picojson::value& args, picojson::object& out);
  void HumanActivityMonitorManagerStart(
      const picojson::value& args, picojson::object& out);
  void HumanActivityMonitorManagerSetAccumulativePedometerListener(
      const picojson::value& args, picojson::object& out);

  std::shared_ptr<HumanActivityMonitorManager> manager_;
  common::PlatformResult Init();
};

} // namespace humanactivitymonitor
} // namespace extension

#endif  // HUMANACTIVITYMONITOR_HUMANACTIVITYMONITOR_INSTANCE_H_