#!/usr/bin/env bash
set -euo pipefail

cd /home/ec2-user/microservices-task

user_service_status=$(sudo -E pm2 jlist | jq -r 'first(.[] | select(.name == "user-service")) | .pm2_env.status')

if [ "$user_service_status" = "online" ]; then
    echo "User service is online"
elif [ "$user_service_status" = "stopped" ]; then
    echo "User service is stopped"
else
    echo "User service is not created yet"

    # start user service
    sudo -E pm2 start --name user-service user-service/dist/main.js
fi

vehicle_service_status=$(sudo -E pm2 jlist | jq -r 'first(.[] | select(.name == "vehicle-service")) | .pm2_env.status')

if [ "$vehicle_service_status" = "online" ]; then
    echo "Vehicle service is online"
elif [ "$vehicle_service_status" = "stopped" ]; then
    echo "Vehicle service is stopped"
else
    echo "Vehicle service is not created yet"

    # start vehicle service
    sudo -E pm2 start --name vehicle-service vehicle-service/dist/main.js
fi


# sudo npm run dev
