#!/bin/bash

set -e

TEST_COMMAND="npm"
TEST_PARAMS=(run docker:test)
printf "\tRunning API gateway test command...\n"

"$TEST_COMMAND" "${TEST_PARAMS[@]}"
