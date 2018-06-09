#!/bin/bash

GENERATE_DOCS_FILE=generate-docs.sh
ROOT_DIR=$PWD
for DIR in services/*/; do
  GENERATE_DOCS_DIR=${DIR}scripts/
  GENERATE_DOCS_FULL_PATH=$GENERATE_DOCS_DIR$GENERATE_DOCS_FILE
  if [ -f "$GENERATE_DOCS_FULL_PATH" ]; then
    printf "\n$DIR"
    eval "chmod u+x $GENERATE_DOCS_FULL_PATH"
    printf "\n\tSwitching to $GENERATE_DOCS_DIR ...\n"
    cd $GENERATE_DOCS_DIR
    printf "\tRunning generate docs in $DIR ...\n"
    bash "$GENERATE_DOCS_FILE"
    cd $ROOT_DIR
  fi
done


GENERATE_INDEX="scripts/docs/index.sh"
eval "chmod u+x $GENERATE_INDEX"
"$GENERATE_INDEX"

DEPLOY_DOCS_COMMAND=node
DEPLOY_DOCS_PARAMS=(scripts/docs/deploy-docs.js)

"$DEPLOY_DOCS_COMMAND" "${DEPLOY_DOCS_PARAMS[@]}"
