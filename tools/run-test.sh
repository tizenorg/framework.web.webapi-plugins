#!/bin/bash
#
# author: Andrzej Dus <a.dus@samsung.com>
#


#
# includes
#

. $(dirname $(readlink -f $0))/common.sh


#
# preliminary checks
#

check_parameter 1 "${1}" "Please pass test source directory (absolute or relative path) as a parameter."
check_parameter 2 "${2}" "Please pass main file name."



#
# variables
#

TEST_PATH="${1}"
TEST_NAME="${2}"
TARGET_DIRNAME="$$$(date +%s)_${TEST_NAME}"


#
# more checks
#

echo -n "Checking if test exists... "
if [ -f "${TEST_PATH}/${TEST_NAME}" ]; then
    echo "OK (${TEST_PATH})."
else
    echo_error "not found."
    exit 1
fi

#
# kill running node instances
#

echo "Killing running node instances (just in case)."
${SDB_SHELL_SU_CMD} "killall -9 node"


#
# push test to device
#

echo "Pushing ${TEST_NAME} as ${TARGET_DIRNAME} test to device."
${SDB_PUSH} "${TEST_PATH}" "${DEVICE_TEMP_DIR}/${TARGET_DIRNAME}"


#
# run test
#

echo "Running ${TEST_NAME} test."
${SDB_SHELL_SU_CMD} "node \"${DEVICE_TEMP_DIR}/${TARGET_DIRNAME}/${TEST_NAME}\""


#
# clean - remove test from device
#

echo "Cleaning (removing test file from device)."
${SDB_SHELL_SU_CMD} "rm -r \"${DEVICE_TEMP_DIR}/${TARGET_DIRNAME}\""
