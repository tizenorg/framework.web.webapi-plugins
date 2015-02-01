PKG_CHECK_MODULES(platform_pkgs_systeminfo REQUIRED
    wrt-common-native
    capi-telephony
    capi-network-connection
    capi-system-info
    capi-system-runtime-info
    capi-system-sensor
    sensor
    tapi
    capi-network-bluetooth
    capi-network-wifi
)

SET(INCLUDES
    ${INCLUDE_COMMON}
    # external dependencies
    ${platform_pkgs_systeminfo_INCLUDE_DIRS}
)

SET(SRCS
    "systeminfo-plugin.cpp"
    "systeminfo-utils.cpp"
)

SET(LIBS
    ${LIBS_COMMON}
    # external dependencies
    ${platform_pkgs_systeminfo_LIBRARIES}
)

add_target_library(systeminfo "${INCLUDES}" "${SRCS}" "${LIBS}")
