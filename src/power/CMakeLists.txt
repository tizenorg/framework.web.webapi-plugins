PKG_CHECK_MODULES(platform_pkgs_power REQUIRED
    capi-system-device
    wrt-common-native
)

SET(INCLUDES
    ${INCLUDE_COMMON}
    # external dependencies
    ${platform_pkgs_power_INCLUDE_DIRS}
)

SET(SRCS
    "power-plugin.cpp"
)

SET(LIBS
    ${LIBS_COMMON}
    # external dependencies
    ${platform_pkgs_power_LIBRARIES}
)

add_target_library(power "${INCLUDES}" "${SRCS}" "${LIBS}")
