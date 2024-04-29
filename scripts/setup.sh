#!/bin/bash

# This script is very incomplete, but an attempt was made. If someone else sets
# this project, please fill this in.

# Written for macOS

brew install nodenv caddy

cd frontend
nodenv install
yarn install

cd ../backend
pdm install
