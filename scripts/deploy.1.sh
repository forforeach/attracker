#!/bin/bash

REGION=eu-central-1
CLUSTER=attracker-staging
SERVICE=attracker-staging-service
TASK_DEFINITION_FILE_PATH=scripts/aws/attracker-staging-task-defenition.json
TASK_DEFINITION_NAME=attracker-staging

echo "\n==============================================================\n"
echo "\033[1;32mBulding docker"
echo "\n==============================================================\n"
echo "\033[0;97m"
docker-compose build

echo "\n==============================================================\n"
echo "\033[1;32mPushing docker images"
echo "\n==============================================================\n"
echo "\033[0;97m"
docker-compose push

echo "\n==============================================================\n"
echo "\033[1;32mRegistering new task defenition"
echo "\n==============================================================\n"
echo "\033[0;97m"
aws ecs register-task-definition --region $REGION --cli-input-json file://$TASK_DEFINITION_FILE_PATH

echo "\n==============================================================\n"
echo "\033[1;32mDestroying current task"
echo "\n==============================================================\n"
echo "\033[0;97m"
aws ecs update-service --region $REGION --cluster $CLUSTER  --service $SERVICE --task-definition $TASK_DEFINITION_NAME --desired-count 0

echo "\n==============================================================\n"
echo "\033[1;32mWaiting for service to be stable"
echo "\n==============================================================\n"
echo "\033[0;97m"
aws ecs wait services-stable --region $REGION --cluster $CLUSTER --services $SERVICE

echo "\n==============================================================\n"
echo "\033[1;32mCreating new task"
echo "\n==============================================================\n"
echo "\033[0;97m"
aws ecs update-service --region $REGION --cluster $CLUSTER  --service $SERVICE --task-definition $TASK_DEFINITION_NAME --desired-count 1

echo "\n==============================================================\n"
echo "\033[1;32mWaiting for service to be stable"
echo "\n==============================================================\n"
echo "\033[0;97m"
aws ecs wait services-stable --region $REGION --cluster $CLUSTER --services $SERVICE
