#!/bin/bash

file=".env"
if [ -f "$file" ]; then
  > $file
else
  touch $file
  echo "$file file was created"
fi

echo "APP_PORT=$APP_PORT" >> .env
echo "MONGO_CONNECTION_STRING=$MONGO_CONNECTION_STRING" >> .env
echo "AUTH_SECRET=$AUTH_SECRET" >> .env
