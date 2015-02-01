PKG_CHECK_MODULES(platform_pkgs_timeutil REQUIRED
wrt-common-native icu-i18n icu-io icu-le icu-lx icu-uc
)

SET(INCLUDES
    ${INCLUDE_COMMON}
    # external dependencies
    ${platform_pkgs_timeutil_INCLUDE_DIRS}
)

SET(SRCS
    "timeutil-plugin.cpp"
    "timeutil-tools.cpp"
)

SET(LIBS
    ${LIBS_COMMON}
    # external dependencies
    ${platform_pkgs_timeutil_LIBRARIES}
)

add_target_library(timeutil "${INCLUDES}" "${SRCS}" "${LIBS}")
