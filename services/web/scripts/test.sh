#!/bin/bash

TEST_COMMAND="npm"
TEST_PARAMS=(run docker:test:unit)
printf "\tRunning web test command...\n"

"$TEST_COMMAND" "${TEST_PARAMS[@]}"
