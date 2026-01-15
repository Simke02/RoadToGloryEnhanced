# Docker Setup for RoadToGlory Backend

This document describes how to run the RoadToGlory backend using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

1. Start the services: docker compose up -d
2. View logs: docker compose logs -f
3. Stop the services: docker compose down
4. Stop and remove volumes: docker compose down -v

## Configuration

Create a `.env` file (see `.env.example`):
NODE_ENV=production, PORT=3000, DB_USERNAME=postgres, DB_PASSWORD=admin, DB_DATABASE=road_to_glory, JWT_SECRET, CORS_ORIGIN

## Services

PostgreSQL: postgres:15-alpine, port 5432, persistent volume
Backend: NestJS API, port 3000, depends on PostgreSQL

## Production

Change DB_SYNCHRONIZE=false, use strong secrets, implement backups.
