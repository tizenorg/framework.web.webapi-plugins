#!/bin/bash
. "$(dirname $(readlink -f $0))/common.sh"

upload_execute_remove "$(dirname $(readlink -f $0))/target/$(basename $0)"
