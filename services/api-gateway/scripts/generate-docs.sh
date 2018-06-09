#!/bin/bash

TEST_COMMAND="npm"
TEST_PARAMS=(run doc)
printf "\tGenerating API gateway documentation...\n"

"$TEST_COMMAND" "${TEST_PARAMS[@]}"
