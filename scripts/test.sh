#!/bin/bash

set -e

CHANGED_FILES=($(git diff --name-only HEAD HEAD~1))

echo "$CHANGED_FILES"

TEST_SCRIPT_NAME=test.sh
ROOT_DIR=$PWD
for DIR in services/*/; do
  TEST_SCRIPT_DIR=${DIR}scripts/
  TEST_SCRIPT_FULL_PATH=$TEST_SCRIPT_DIR$TEST_SCRIPT_NAME
  if [ -f "$TEST_SCRIPT_FULL_PATH" ]; then
    printf "\n$DIR"
    eval "chmod u+x $TEST_SCRIPT_FULL_PATH"
    printf "\n\tSwitching to $TEST_SCRIPT_DIR ...\n"
    cd $TEST_SCRIPT_DIR
    printf "\tRunning before script in $DIR ...\n"
    bash "$TEST_SCRIPT_NAME"
    cd $ROOT_DIR
  fi
done
