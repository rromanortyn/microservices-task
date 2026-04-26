#!/usr/bin/env bash
set -euo pipefail

cd /home/ec2-user/microservices-task

user_service_status=$(sudo -E pm2 jlist | jq -r 'first(.[] | select(.name == "user-service")) | .pm2_env.status')

if [ "$user_service_status" = "online" ]; then
    echo "User service is online"
elif [ "$user_service_status" = "stopped" ]; then
    echo "User service is stopped"
else
    echo "User service status is not created yet"
fi

echo "User service status: $user_service_status"

vehicle_service_status=$(sudo -E pm2 jlist | jq -r 'first(.[] | select(.name == "vehicle-service")) | .pm2_env.status')

if [ "$vehicle_service_status" = "online" ]; then
    echo "Vehicle service is online"
elif [ "$vehicle_service_status" = "stopped" ]; then
    echo "Vehicle service is stopped"
else
    echo "Vehicle service status is not created yet"
fi

echo "Vehicle service status: $vehicle_service_status"

# sudo npm run dev
