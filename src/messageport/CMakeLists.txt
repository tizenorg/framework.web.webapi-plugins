PKG_CHECK_MODULES(platform_pkgs_messageport REQUIRED
    bundle
    capi-message-port
    wrt-common-native
)

SET(INCLUDES
    ${INCLUDE_COMMON}
    # external dependencies
    ${platform_pkgs_messageport_INCLUDE_DIRS}
)

SET(SRCS
    "bundle-util.cpp"
    "message-port-plugin.cpp"
)

SET(LIBS
    ${LIBS_COMMON}
    # external dependencies
    ${platform_pkgs_messageport_LIBRARIES}
)

add_target_library(messageport "${INCLUDES}" "${SRCS}" "${LIBS}")
