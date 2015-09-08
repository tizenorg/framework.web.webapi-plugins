#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd "${SCRIPT_DIR}/tests" > /dev/null

regionformat=`vconftool get db/menu_widget/regionformat | awk '{print $4}'`
if [ "$regionformat" == "fr_FR.UTF-8" ]
then
    cp -f ClockSettingORA.js ClockSetting.js
elif [ "$regionformat" == "ru_RU.UTF-8" ]
then
    cp -f ClockSettingCIS.js ClockSetting.js
elif [ "$regionformat" == "ja_JP.UTF-8" ]
then
    cp -f ClockSettingDCM.js ClockSetting.js
else
    cp -f ClockSettingCommon.js ClockSetting.js
fi

timezoneID=`vconftool get db/setting/timezone_id | awk '{print $4}'`

echo $timezoneID
cp ClockSetting.js ClockSetting.js.bk
sed "s,TZID,"$timezoneID, ClockSetting.js.bk > ClockSetting.js
rm ClockSetting.js.bk

popd > /dev/null
