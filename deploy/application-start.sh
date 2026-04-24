#!/usr/bin/env bash
set -euo pipefail

cd /home/ec2-user/microservices-task
sudo nohup npm run dev > /dev/null 2>&1 &
