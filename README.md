# Logr
Centralized listening API to read and store logs from different apps over HTTP.

## What for?
Logr is aimed at IoT developers and self-hosters, to provide a simple way to centralize logging for all their devices and sensors.

## Running
Logr runs as a Docker instance. You can download and run the image from the repo or use the source code. A docker-compose.yml file is provided.

## Configuration
The application is configurable from an .env file located at the root of the project. Use the .env.example file as a template.

## Pending features
- [x] Whole-app config
- [x] Custom log flavors
- [x] Docker deployment
