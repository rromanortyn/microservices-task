#!/usr/bin/env bash
set -euo pipefail

cd /home/ec2-user/microservices-task/user-service
sudo npm i
sudo npm run build

cd /home/ec2-user/microservices-task/vehicle-service
sudo npm i
sudo npm run build
