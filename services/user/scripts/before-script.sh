#!/bin/bash

set -e

file="../.env"
printf "\tChecking if .env file exists in User service...\n"
if [ -f "$file" ]; then
  printf "\t.env file exists. \n\tSkipping...\n"
else
  printf "\tCreating .env file...\n"
  touch $file
  printf "\t.env file was created successfully...\n"
  printf "\tSetting env params...\n"
  echo "APP_PORT=$APP_PORT" >> $file
  echo "USER_MONGO_CONNECTION_STRING=$USER_MONGO_CONNECTION_STRING" >> $file
fi
