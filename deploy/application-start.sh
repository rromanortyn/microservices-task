#!/usr/bin/env bash
set -euo pipefail

cd /home/ec2-user/microservices-task

user_service_status=$(sudo -E pm2 jlist | jq -r 'first(.[] | select(.name == "user-service")) | .pm2_env.status')

if [ "$user_service_status" = "online" ]; then
    user_service_is_online=true
else
    user_service_is_online=false
fi

echo "User service status: $user_service_status"
echo "User service is online: $user_service_is_online"

vehicle_service_status=$(sudo -E pm2 jlist | jq -r 'first(.[] | select(.name == "vehicle-service")) | .pm2_env.status')

if [ "$vehicle_service_status" = "online" ]; then
    vehicle_service_is_online=true
else
    vehicle_service_is_online=false
fi

echo "Vehicle service status: $vehicle_service_status"
echo "Vehicle service is online: $vehicle_service_is_online"

# sudo npm run dev
