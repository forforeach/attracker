#!/bin/bash

set -e

file="../.env"
printf "\tChecking if .env file exists...\n"
if [ -f "$file" ]; then
  printf "\t.env file exists. \n\tSkipping...\n"
else
  printf "\tCreating .env file...\n"
  touch $file
  printf "\t.env file was created successfully...\n"
  printf "\tSetting env params...\n"
  echo "APP_PORT=$APP_PORT" >> $file
  echo "MONGO_CONNECTION_STRING=$MONGO_CONNECTION_STRING" >> $file
  echo "AUTH_SECRET=$AUTH_SECRET" >> $file
fi
