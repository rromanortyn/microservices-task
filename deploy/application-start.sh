#!/usr/bin/env bash
set -euo pipefail

cd /home/ec2-user/microservices-task

user_service_status=$(sudo -E pm2 jlist | jq -r 'first(.[] | select(.name == "user-service")) | .pm2_env.status')

if [ "$user_service_status" = "online" ]; then
    echo "User service is online"

    sudo -E pm2 stop user-service
    sudo -E pm2 restart user-service

elif [ "$user_service_status" = "stopped" ]; then
    echo "User service is stopped"

    sudo -E pm2 restart user-service
else
    echo "User service is not created yet"

    # start user service
    sudo -E pm2 start --name user-service user-service/dist/main.js
fi

vehicle_service_status=$(sudo -E pm2 jlist | jq -r 'first(.[] | select(.name == "vehicle-service")) | .pm2_env.status')

if [ "$vehicle_service_status" = "online" ]; then
    echo "Vehicle service is online"

    sudo -E pm2 stop vehicle-service
    sudo -E pm2 restart vehicle-service

elif [ "$vehicle_service_status" = "stopped" ]; then
    echo "Vehicle service is stopped"

    sudo -E pm2 restart vehicle-service
else
    echo "Vehicle service is not created yet"

    # start vehicle service
    sudo -E pm2 start --name vehicle-service vehicle-service/dist/main.js
fi

frontend_status=$(sudo -E pm2 jlist | jq -r 'first(.[] | select(.name == "frontend")) | .pm2_env.status')

if [ "$frontend_status" = "online" ]; then
    echo "Frontend is online"

    sudo -E pm2 stop frontend
    sudo -E pm2 restart frontend

elif [ "$frontend_status" = "stopped" ]; then
    echo "Frontend is stopped"

    sudo -E pm2 restart frontend
else
    echo "Frontend is not created yet"

    # start frontend
    sudo -E pm2 start npm --name frontend -- run dev
fi
