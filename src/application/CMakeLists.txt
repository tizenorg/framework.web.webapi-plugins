PKG_CHECK_MODULES(platform_pkgs_application REQUIRED
    wrt-common-native
    pkgmgr-info
    pkgmgr
    capi-appfw-app-manager
    capi-appfw-application
    capi-appfw-package-manager
    bundle
)

SET(INCLUDES
    ${INCLUDE_COMMON}
    # external dependencies
    ${platform_pkgs_application_INCLUDE_DIRS}
)

SET(SRCS
    "application.cpp"
    "application-manager.cpp"
    "application-plugin.cpp"
    "application-utils.cpp"
    "requested-application-control.cpp"
)

SET(LIBS
    ${LIBS_COMMON}
    # external dependencies
    ${platform_pkgs_application_LIBRARIES}
)

add_target_library(application "${INCLUDES}" "${SRCS}" "${LIBS}")
