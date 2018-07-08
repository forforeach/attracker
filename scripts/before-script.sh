#!/bin/bash

set -e

BEFORE_SCRIPT_FILE=before-script.sh
ROOT_DIR=$PWD
for DIR in services/*/; do
  BEFORE_SCRIPT_DIR=${DIR}scripts/
  BEFORE_SCRIPT_FULL_PATH=$BEFORE_SCRIPT_DIR$BEFORE_SCRIPT_FILE
  if [ -f "$BEFORE_SCRIPT_FULL_PATH" ]; then
    printf "\n$DIR"
    eval "chmod u+x $BEFORE_SCRIPT_FULL_PATH"
    printf "\n\tSwitching to $BEFORE_SCRIPT_DIR ...\n"
    cd $BEFORE_SCRIPT_DIR
    printf "\tRunning before script in $DIR ...\n"
    bash "$BEFORE_SCRIPT_FILE"
    cd $ROOT_DIR
  fi
done
