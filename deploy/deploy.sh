#!/usr/bin/env bash
set -euo pipefail

cd /home/ec2-user/microservices-task

docker compose down || true
docker compose --env-file=.env -f docker/docker-compose.yml up -d
docker image prune -f
