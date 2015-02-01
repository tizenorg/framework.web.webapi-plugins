PKG_CHECK_MODULES(platform_pkgs_package REQUIRED
    wrt-common-native
    capi-appfw-app-manager
    capi-appfw-package-manager
    pkgmgr
    pkgmgr-info
    glib-2.0
    ecore
)

SET(INCLUDES
    ${INCLUDE_COMMON}
    # external dependencies
    ${platform_pkgs_package_INCLUDE_DIRS}
)

SET(SRCS
    "package-plugin.cpp"
)

SET(LIBS
    ${LIBS_COMMON}
    # external dependencies
    ${platform_pkgs_package_LIBRARIES}
)

add_target_library(package "${INCLUDES}" "${SRCS}" "${LIBS}")
