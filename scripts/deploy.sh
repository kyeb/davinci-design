#!/bin/bash

if [[ $(git status --porcelain) ]]; then
    read -p "Warning: There are uncommitted changes. Do you want to continue? (y/N) " answer
    if [[ $answer != "y" ]]; then
        echo "Cancelled."
        exit 1
    else
        echo "Continuing despite local changes, be careful!"
    fi
fi

cd frontend
yarn build
cd ..
ansible-playbook -i ansible/hosts ansible/deploy.yaml
