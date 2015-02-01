PKG_CHECK_MODULES(platform_pkgs_alarm REQUIRED
    capi-appfw-application
    wrt-common-native
)

SET(INCLUDES
    ${INCLUDE_COMMON}
    # external dependencies
    ${platform_pkgs_alarm_INCLUDE_DIRS}
    ${application_include}
)

SET(SRCS
    "alarm-plugin.cpp"
)

SET(LIBS
    ${LIBS_COMMON}
    # external dependencies
    ${platform_pkgs_alarm_LIBRARIES}
    ${application_target}
)

add_target_library(alarm "${INCLUDES}" "${SRCS}" "${LIBS}")
