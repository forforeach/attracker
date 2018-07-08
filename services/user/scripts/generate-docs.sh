#!/bin/bash

TEST_COMMAND="npm"
TEST_PARAMS=(run doc)
printf "\tGenerating User service documentation...\n"

"$TEST_COMMAND" "${TEST_PARAMS[@]}"
