#!/bin/bash
#
# author: Andrzej Dus <a.dus@samsung.com>
#


#
# common helper functions
#

echo_error () {
    local red_color='\033[0;31m'
    local no_color='\033[0m'
    echo -e "${red_color}$1${no_color}"
}

check_tizen_sdk () {
    echo -n "Checking TIZEN_SDK_DIR variable... "
    if [ -n "${TIZEN_SDK_DIR}" ] && [ -d "${TIZEN_SDK_DIR}" ]; then
        echo "OK (${TIZEN_SDK_DIR})."
    else
        echo_error "directory not found. Is variable exported and points out to correct directory?."
        echo ""
        echo "Export TIZEN_SDK_DIR environment variable or set it in .tools.conf"
        exit 1
    fi

    echo -n "Checking if sdb exists... "
    if [ -f "${SDB_BINARY}" ]; then
        echo "OK."
    else
        echo_error "not found."
        exit 1
    fi
}

upload_execute_remove() {
    SCRIPT_FILE=$(basename "$1")
    FULL_PATH="${DEVICE_TEMP_DIR}/${SCRIPT_FILE}"
    ${SDB_PUSH} "$1" "${DEVICE_TEMP_DIR}/"
    ${SDB_SHELL_SU_CMD} "${FULL_PATH}"
    ${SDB_SHELL_SU_CMD} "rm -rf ${FULL_PATH}"
}

check_parameter () {
    local param_id="${1}"
    local param="${2}"
    local error_message="${3}"

    echo -n "Checking if parameter ${param_id} was passed... "
    if [ -n "${param}" ]; then
        echo "OK (${param})."
    else
        echo_error "failed."
        echo ""
        echo ${error_message}
        exit 1
    fi
}


#
# source config file if exists
#

CONFIG_FILE="$(dirname $(readlink -f $0))/.tools.conf"

if [ -f "${CONFIG_FILE}" ]; then
    echo -n "Config file ${CONFIG_FILE} found. Reading it... "
    . "${CONFIG_FILE}"
    echo "OK."
fi


#
# common variables
#

SDB_BINARY="${TIZEN_SDK_DIR}/tools/sdb"
SDB_SHELL_SU_CMD="${SDB_BINARY} shell su -c"
SDB_PUSH="${SDB_BINARY} push"
DEVICE_TEMP_DIR="/home/developer"


# common checks

check_tizen_sdk
