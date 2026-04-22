#!/usr/bin/env bash
set -euo pipefail
cd /home/ec2-user/microservices-task

sudo docker compose down || true

sudo touch .env
sudo chmod 666 .env

aws secretsmanager get-secret-value --secret-id microservices-task-env --query SecretString --output text > .env

sudo docker compose --env-file=.env -f docker/docker-compose.yml up -d
sudo docker image prune -f

echo "FIRST npm i"

cd /home/ec2-user/microservices-task/user-service
sudo npm i
sudo npm run typeorm:run-migrations

echo "SECOND npm i"

cd /home/ec2-user/microservices-task/vehicle-service
sudo npm i
sudo npm run typeorm:run-migrations

echo "THIRD npm i"

cd /home/ec2-user/microservices-task
sudo npm i
sudo npm run dev
