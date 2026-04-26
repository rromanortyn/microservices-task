#!/usr/bin/env bash
set -euo pipefail

cd /home/ec2-user/microservices-task

user_service_status=$(pm2 jlist | jq -r '.[] | select(.name == "user-service") | .pm2_env.status')

if [ "$user_service_status" = "online" ]; then
    user_service_is_online=true
else
    user_service_is_online=false
fi

echo "User service status: $user_service_status"
echo "User service is online: $user_service_is_online"

# sudo npm run dev
