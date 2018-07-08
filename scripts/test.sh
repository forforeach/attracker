#!/bin/bash

TRAVIS_COMMIT_RANGE="${TRAVIS_COMMIT_RANGE:-HEAD HEAD~1}"

echo "Diff range: $TRAVIS_COMMIT_RANGE"

GIT_COMMAND="git"
GIT_DIFF_PARAMS=(diff --name-only --exit-code $TRAVIS_COMMIT_RANGE)

DIFF=`$GIT_COMMAND ${GIT_DIFF_PARAMS[@]}`

set -e

SERVICES=()
for DIR in $DIFF; do
  SERVICE=$(echo $DIR | cut -d'/' -f 2)
  if [[ ! " ${SERVICES[@]} " =~ " ${SERVICE} " ]]; then
    SERVICES+=($SERVICE)
  fi
done

echo "Changed services: $SERVICES"

TEST_SCRIPT_NAME=test.sh
ROOT_DIR=$PWD
for DIR in services/*/; do
  SERVICE=$(echo $DIR | cut -d'/' -f 2)
  if [[ " ${SERVICES[@]} " =~ " ${SERVICE} " ]]; then
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
  fi
done
