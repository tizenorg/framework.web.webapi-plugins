# -----------------------------------------------------------------------------
# Common Module
# -----------------------------------------------------------------------------
add_plugin(common)

SET(INCLUDE_COMMON
    ${INCLUDE_COMMON}
    ${common_include}
)

SET(LIBS_COMMON
    ${LIBS_COMMON}
    ${common_target}
)

SET(CMAKE_INSTALL_RPATH "${CMAKE_INSTALL_PREFIX}/lib/wrt-plugins")

# -----------------------------------------------------------------------------
# Plugin Modules
# -----------------------------------------------------------------------------
add_plugin(
    alarm
    application
    filesystem
    messageport
    power
    package
    systeminfo
    timeutil
)
