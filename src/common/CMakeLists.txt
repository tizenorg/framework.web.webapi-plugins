PKG_CHECK_MODULES(platform_pkgs_common REQUIRED
    wrt-common-native
    capi-appfw-app-manager
    capi-appfw-package-manager
)

SET(INCLUDES
    ${INCLUDE_COMMON}
    # external dependencies
    ${platform_pkgs_common_INCLUDE_DIRS}
)

SET(SRCS
    "current-application.cpp"
    "dbus-operation.cpp"
    "function-dispatcher.cpp"
    "json-parser.cpp"
    "native-plugin.cpp"
    "platform-exception.cpp"
    "task-queue.cpp"
    "converter.cpp"
)

SET(LIBS
    ${LIBS_COMMON}
    # external dependencies
    ${platform_pkgs_common_LIBRARIES}
)

add_target_library(common "${INCLUDES}" "${SRCS}" "${LIBS}")
