#!/bin/bash

# Trap INT and TERM signals and kill yarn dev process then exit
trap 'kill $(jobs -p); exit' INT TERM

cd frontend
yarn dev &
yarn_pid=$!

# wait for yarn to exit
wait $yarn_pid

# Check the exit status of yarn_pid and exit with the same status if non-zero
if [ $? -ne 0 ]; then
    exit $?
fi

while true; do
    clear
    echo "Deploy in progress, waiting until it's done to restart the dev server..."

    # wait for Ansible to start
    while ! pgrep -f ansible-playbook >/dev/null; do
        sleep 0.1
    done

    # wait for Ansible to finish
    while pgrep -f ansible-playbook >/dev/null; do
        sleep 0.1
    done

    echo "Deploy complete, restarting dev server"

    yarn dev &
    yarn_pid=$!

    # wait for yarn to exit
    wait $yarn_pid
done
