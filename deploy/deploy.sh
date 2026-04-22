#!/usr/bin/env bash
set -euo pipefail

cd /home/ec2-user/microservices-task

docker compose down || true

sudo touch .env
sudo chmod 666 .env

aws secretsmanager get-secret-value --secret-id microservices-task-env --query SecretString --output text > .env

docker compose --env-file=.env -f docker/docker-compose.yml up -d
docker image prune -f
