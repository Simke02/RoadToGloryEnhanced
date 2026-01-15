# Docker Setup for RoadToGlory

This document describes the complete Docker setup for running both frontend and backend of RoadToGlory.

## Problem Solved

Previously, the frontend was configured to use http://localhost:3000 as the API base URL, which caused issues when the backend was running in Docker. The requests would fail with:
- Internal Server Error for /persistence/createStats
- Bad Request for /auth

## Solution

The solution involves:
1. Creating a unified docker-compose.yml that runs all services (frontend, backend, database)
2. Using nginx as a reverse proxy for the Angular frontend
3. Proxying API requests from nginx to the backend service
4. Setting the baseApiUrl to an empty string for Docker deployment

## Changes Made

### 1. Frontend Changes

#### Dockerfile (Frontend/road_to_glory_fe/Dockerfile)
- Multi-stage build: builds Angular app in first stage, serves with nginx in second stage
- Uses nginx:alpine for a lightweight production server

#### nginx.conf (Frontend/road_to_glory_fe/nginx.conf)
- Serves the Angular SPA with proper routing support
- Proxies /auth, /persistence, and /communication requests to the backend service
- Handles CORS properly since requests go through the same domain

#### environment.ts (Frontend/road_to_glory_fe/src/app/common/environment.ts)
- Changed baseApiUrl from http://localhost:3000 to empty string
- This allows relative URLs when served via nginx in Docker

### 2. Docker Compose (docker-compose.yml)
- Added frontend service that builds and serves the Angular app
- Backend connects to postgres service (Docker internal network)
- Frontend connects to backend service via nginx proxy
- All services share a Docker network for internal communication

## How to Use

Start all services: cd RoadToGloryEnhanced && docker compose up -d --build
View logs: docker compose logs -f
Stop all services: docker compose down

## Access the Application

- Frontend: http://localhost:4200
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432
