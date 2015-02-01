CMAKE_MINIMUM_REQUIRED(VERSION 2.8)
PROJECT(webapi-plugins)

INCLUDE(FindPkgConfig)

# -----------------------------------------------------------------------------
# Determine the log option
# -----------------------------------------------------------------------------

IF(USER_MODE_LOGE_ENABLED STREQUAL "OFF")
    MESSAGE(STATUS "Logging LOGE disabled in user mode")
ELSEIF(USER_MODE_LOGE_ENABLED STREQUAL "ON")
    MESSAGE(STATUS "Logging LOGE enabled in user mode")
    ADD_DEFINITIONS("-DLOGS_DISABLED_LOGE_ENABLED")
ENDIF(USER_MODE_LOGE_ENABLED STREQUAL "OFF")


# -----------------------------------------------------------------------------
# Set build type (Release by default)
# -----------------------------------------------------------------------------
IF("${CMAKE_BUILD_TYPE}" STREQUAL "")
     SET(CMAKE_BUILD_TYPE Release)
ENDIF("${CMAKE_BUILD_TYPE}" STREQUAL "")

MESSAGE("Build type: ${CMAKE_BUILD_TYPE}")

# -----------------------------------------------------------------------------
# CFlags
# -----------------------------------------------------------------------------
SET(DEBUG_FLAGS                "-Wall -Wextra -Werror -fPIC -O0 -g")
SET(DEBUG_DEFINITIONS          "-DDEBUG -D_DEBUG ")
SET(RELEASE_FLAGS              "-Wall -Wextra -Werror -fPIC -O3")
SET(RELEASE_DEFINITIONS        "")
SET(CMAKE_C_FLAGS_DEBUG        "${DEBUG_FLAGS} ${DEBUG_DEFINITIONS}")
SET(CMAKE_CXX_FLAGS_DEBUG      "-std=c++0x -fno-rtti -fexceptions -fvisibility-inlines-hidden ${DEBUG_FLAGS} ${DEBUG_DEFINITIONS}")
SET(CMAKE_C_FLAGS_RELEASE      "${RELEASE_FLAGS} ${RELEASE_DEFINITIONS}")
SET(CMAKE_CXX_FLAGS_RELEASE    "-std=c++0x -fno-rtti -fexceptions -fvisibility-inlines-hidden ${RELEASE_FLAGS} ${RELEASE_DEFINITIONS}")
# -----------------------------------------------------------------------------
# Global dependencies
# -----------------------------------------------------------------------------
PKG_CHECK_MODULES(DLOG REQUIRED dlog)

# -----------------------------------------------------------------------------
# Global variables
# -----------------------------------------------------------------------------
SET(TOP ${CMAKE_SOURCE_DIR}/src)

SET(INCLUDE_COMMON
    # local includes
    "${TOP}"
    "${CMAKE_SOURCE_DIR}/include"
    # external dependencies
    ${DLOG_INCLUDE_DIRS}
)

SET(LIBS_COMMON
    ${DLOG_LIBRARIES}
)

# -----------------------------------------------------------------------------
# Functions used by plugins
# -----------------------------------------------------------------------------
FUNCTION(set_target NAME)
    GET_FILENAME_COMPONENT(DIRNAME ${NAME} NAME)
    STRING(TOLOWER ${DIRNAME} LOWER_NAME)
    STRING(TOUPPER ${DIRNAME} UPPER_NAME)
    SET(${LOWER_NAME}_dest_lib "lib/wrt-plugins" PARENT_SCOPE)
    SET(${LOWER_NAME}_dest_js "lib/webapi-plugins" PARENT_SCOPE)
    SET(${LOWER_NAME}_target "${LOWER_NAME}" PARENT_SCOPE)
    SET(${LOWER_NAME}_include "${TOP}/${NAME}" PARENT_SCOPE)
ENDFUNCTION()

FUNCTION(add_target_library TARGET_ID INCLUDES SRCS LIBS)
    SET(TARGET_NAME ${${TARGET_ID}_target})
    INCLUDE_DIRECTORIES(${INCLUDES} ${${TARGET_ID}_include})
    ADD_LIBRARY(${TARGET_NAME} SHARED ${SRCS})
    TARGET_LINK_LIBRARIES(${TARGET_NAME} ${LIBS})
    INSTALL(TARGETS ${TARGET_NAME} LIBRARY DESTINATION ${${TARGET_ID}_dest_lib})

    SET(JS_SOURCE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/js")
    IF(EXISTS "${JS_SOURCE_DIR}")
        FILE(GLOB JS_SOURCE_FILES "${JS_SOURCE_DIR}/*")
        INSTALL(FILES ${JS_SOURCE_FILES} DESTINATION ${${TARGET_ID}_dest_js})
    ENDIF()
ENDFUNCTION()

FUNCTION(add_subdir NAME)
    MESSAGE(STATUS "Building: ${CMAKE_CURRENT_SOURCE_DIR}/${NAME}")
    ADD_SUBDIRECTORY(${NAME})
ENDFUNCTION()

MACRO(add_plugin)
    FOREACH(VALUE ${ARGN})
        set_target(${VALUE})
    ENDFOREACH(VALUE)
    FOREACH(VALUE ${ARGN})
        add_subdir(${VALUE})
    ENDFOREACH(VALUE)
ENDMACRO()

# -----------------------------------------------------------------------------
# Include source folder
# -----------------------------------------------------------------------------
ADD_SUBDIRECTORY(src)
