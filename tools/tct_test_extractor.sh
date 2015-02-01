#!/bin/bash

if [ $# -ne 1 ]
then
    echo "Usage: $0 /path/to/tct/tests/folder"
    exit 1
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TARGET_DIR=$1
BASE_TARGET_DIR=$(basename "${TARGET_DIR}")
SUPPORT_DIR=$(find "${TARGET_DIR}" -name support)
CONFIG_FILE="${TARGET_DIR}/tests.xml"

if [ ! -f "${CONFIG_FILE}" ]
then
    echo "Config file ${CONFIG_FILE} not found"
    exit 1
fi

for FILE in "${SUPPORT_DIR}/"*.js; do
    if [ $(basename "${FILE}") != "unitcommon.js" ]
    then
        cat ${FILE}
        echo
    fi
done

i=0

for FILE in $(cat "${CONFIG_FILE}" | sed -n "s/[ \t]*<test_script_entry>\/opt\/${BASE_TARGET_DIR}\(.*\)<\/test_script_entry>/\1/p")
do
    TEST_NAME=$(basename "${FILE}")
    TEST_NAME="${TEST_NAME%.*}"
    CLEAN_TEST_NAME="${TEST_NAME/-/_}"
    echo "function ${CLEAN_TEST_NAME}() {"
    cat "${TARGET_DIR}${FILE}" | sed -n "/\(^<script>$\)\|\(^<script type=\"text\/javascript\">$\)/{:a;n;/<\/script>/q;p;ba}" | sed "s/document.title/\'${CLEAN_TEST_NAME}\'/g"
    echo "}"
    echo

    FUNC[${i}]=${CLEAN_TEST_NAME}
    i=$((i+1))
done

echo "var moduleName = \"${BASE_TARGET_DIR}\";"

for F in ${FUNC[@]}
do
    echo "add_test_case(moduleName, ${F});"
done
