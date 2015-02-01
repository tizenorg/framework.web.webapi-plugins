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

echo -n "Checking GBS_PACKAGE_DIR variable... "
if [ -n "${GBS_PACKAGE_DIR}" ] && [ -d "${GBS_PACKAGE_DIR}" ]; then
    echo "OK (${GBS_PACKAGE_DIR})."
else
    echo_error "directory not found. Is variable exported and points out to correct directory?."
    echo ""
    echo "Export GBS_PACKAGE_DIR environment variable or set it in .tools.conf"
    exit 1
fi

echo -n "Checking PACKAGE_NAME variable... "
if [ -n "${PACKAGE_NAME}" ]; then
    echo "OK (${PACKAGE_NAME})."
else
    echo_error "PACKAGE_NAME not found. Is variable exported?."
    echo ""
    echo "Export PACKAGE_NAME environment variable or set it in .tools.conf"
    exit 1
fi


#
# variables
#

GBS_OUTPUT_FILE="${GBS_PACKAGE_DIR}/${PACKAGE_NAME}.rpm"


#
# more checks
#

echo -n "Checking if package exists in GBS_PACKAGE_DIR... "
if [ -f "${GBS_OUTPUT_FILE}" ]; then
    echo "OK."
else
    echo_error "not found."
    exit 1
fi


#
# push to device
#

echo "Pushing rpm package to device."
${SDB_PUSH} "${GBS_OUTPUT_FILE}" "${DEVICE_TEMP_DIR}/"


#
# remove addons package
#

echo "Removing currently installed addons package."
${SDB_SHELL_SU_CMD} "rpm -ev \"${PACKAGE_NAME}\""


#
# install new addons package
#

echo "Installing new addons package."
${SDB_SHELL_SU_CMD} "rpm -iv ${DEVICE_TEMP_DIR}/${PACKAGE_NAME}.rpm"


#
# clean - remove addons package from device
#

echo "Cleaning (removing package file from device)."
${SDB_SHELL_SU_CMD} "rm ${DEVICE_TEMP_DIR}/${PACKAGE_NAME}.rpm"

echo "Finished."
