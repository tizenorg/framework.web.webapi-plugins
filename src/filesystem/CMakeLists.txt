PKG_CHECK_MODULES(platform_pkgs_filesystem REQUIRED
    wrt-common-native
    storage
)

SET(INCLUDES
    ${INCLUDE_COMMON}
    # external dependencies
    ${platform_pkgs_filesystem_INCLUDE_DIRS}
)

SET(SRCS
    "filesystem-plugin.cpp"
    "filesystem-utils.cpp"
)

SET(LIBS
    ${LIBS_COMMON}
    # external dependencies
    ${platform_pkgs_filesystem_LIBRARIES}
)

add_target_library(filesystem "${INCLUDES}" "${SRCS}" "${LIBS}")
