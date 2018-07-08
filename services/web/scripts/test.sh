#!/bin/bash
#  sudo ifconfig lo0 alias 172.23.0.2

set -e

TEST_COMMAND="npm"
TEST_PARAMS=(run docker:test:unit)
printf "\tRunning web test command...\n"

"$TEST_COMMAND" "${TEST_PARAMS[@]}"
