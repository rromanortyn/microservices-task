#!/usr/bin/env bash
set -euo pipefail

cd /home/ec2-user/microservices-task

docker compose down || true

aws secretsmanager get-secret-value --secret-id microservices-task-env --output text > .env

docker compose --env-file=.env -f docker/docker-compose.yml up -d
docker image prune -f
