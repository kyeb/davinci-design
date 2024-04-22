#!/bin/bash

brew install nodenv caddy

cd frontend
nodenv install
yarn install

cd ../backend
pdm install
