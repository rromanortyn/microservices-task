#!/usr/bin/env bash
set -euo pipefail
cd /home/ec2-user/microservices-task

sudo dnf update -y

sudo dnf install amazon-ssm-agent -y
sudo systemctl enable --now amazon-ssm-agent

sudo dnf install amazon-cloudwatch-agent -y
sudo systemctl enable --now amazon-cloudwatch-agent

sudo dnf install nodejs22 -y

sudo dnf install docker -y
sudo systemctl enable --now docker

sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m) -o /usr/libexec/docker/cli-plugins/docker-compose
sudo chmod +x /usr/libexec/docker/cli-plugins/docker-compose
