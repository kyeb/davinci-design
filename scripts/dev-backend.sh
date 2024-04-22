#!/bin/bash

cd backend
pdm run uvicorn davinci_backend.main:app --reload
