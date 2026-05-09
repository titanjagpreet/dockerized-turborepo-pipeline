# Dockerized Turborepo CI/CD Infrastructure

A production-style Dockerized Turborepo monorepo containing:

* Next.js frontend
* Express HTTP API server
* WebSocket server
* Shared Prisma package
* PostgreSQL database
* Nginx reverse proxy
* Independent CI/CD pipelines using GitHub Actions
* Automated Docker Hub deployments

The project is structured as a multi-service containerized architecture using isolated Docker containers, internal Docker networking, persistent PostgreSQL volumes, reverse proxy routing, and automated remote deployments to a Linux VM.

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript

## Backend

* Express.js
* WebSocket server
* JWT Authentication
* bcrypt

## Monorepo

* Turborepo
* pnpm

## Database

* PostgreSQL
* Prisma ORM

## DevOps / Infrastructure

* Docker
* Docker Compose
* GitHub Actions
* Docker Hub
* Nginx
* Certbot / Let's Encrypt

---

# Project Structure

```txt
.
├── apps
│   ├── web
│   ├── http-server
│   └── ws-server
│
├── packages
│   ├── prisma
│   ├── ui
│   ├── typescript-config
│   └── eslint-config
│
├── docker
│   ├── Dockerfile.web
│   ├── Dockerfile.http
│   └── Dockerfile.ws
│
├── .github
│   └── workflows
│       ├── frontend.yml
│       ├── backend.yml
│       └── ws.yml
├── nginx-conf
│   └── nginx.conf
│
├── docker-compose.yml
├── nginx.conf
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
└── .npmrc
```

---

# Architecture Overview

```txt
Internet
   ↓
Nginx Reverse Proxy
   ↓
──────────────────────────────
Frontend     → localhost:3000
HTTP Server  → localhost:3001
WS Server    → localhost:3003
──────────────────────────────
   ↓
Docker Network
   ↓
PostgreSQL Container
```

---

# Services

| Service     | Port     | Description         |
| ----------- | -------- | ------------------- |
| web         | 3000     | Next.js frontend    |
| http-server | 3001     | Express API server  |
| ws-server   | 3003     | WebSocket server    |
| postgres    | 5432     | PostgreSQL database |
| nginx       | 80 / 443 | Reverse proxy       |

---

# Features

* Turborepo monorepo architecture
* Shared Prisma package
* Separate Dockerfiles for each service
* Independent Docker-based deployments
* SHA-tagged Docker image versioning
* GitHub Actions CI/CD pipelines
* Automated Docker Hub image publishing
* Automated VM deployments over SSH
* Nginx reverse proxy setup
* HTTPS setup using Certbot
* Internal Docker networking
* Persistent PostgreSQL volume
* Automatic Prisma migration deployment
* Production Next.js builds
* Workspace dependency management using pnpm

---

# Environment Variables

Create a `.env` file at the project root.

Example:

```env
DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres?schema=public
```

---

# Local Development Setup

## Prerequisites

Install:

* Docker
* Docker Compose Plugin

Verify installation:

```bash
docker --version
docker compose version
```

---

# Running the Project Locally

## Build and start all services

```bash
docker compose up --build
```

## Run in detached mode

```bash
docker compose up -d --build
```

## Stop containers

```bash
docker compose down
```

## Remove containers along with volumes

```bash
docker compose down -v
```

---

# Docker Architecture

The application uses:

* Dedicated containers for each service
* Internal Docker networking
* Named Docker volume for PostgreSQL persistence
* Independent service deployment pipelines

---

# Internal Networking

Containers communicate internally using Docker DNS.

Example:

```txt
postgres:5432
```

instead of localhost.

---

# Database Persistence

PostgreSQL data is persisted using a named Docker volume:

```yaml
volumes:
  postgres_data:
```

This ensures database data survives:

* container recreation
* container restarts
* deployments

---

# Prisma Migration Flow

During container startup:

1. PostgreSQL container starts
2. Application container starts
3. Prisma migrations are deployed
4. Service starts accepting requests

Migration command:

```bash
prisma migrate deploy
```

---

# CI/CD Pipeline

Each service has an independent GitHub Actions workflow.

Workflows:

```txt
.github/workflows/
├── backend.yml
├── frontend.yml
└── ws.yml
```

Each workflow performs:

1. Repository checkout
2. Docker image build
3. Docker Hub push
4. Remote VM deployment over SSH
5. Container recreation using latest SHA-tagged image

---

# Docker Image Strategy

Images are published using:

```txt
titanxbt/service-name:${github.sha}
```

and:

```txt
titanxbt/service-name:latest
```

This provides:

* immutable deployments
* rollback capability
* deployment traceability

---

# Reverse Proxy Setup

Nginx routes incoming requests to internal containers.

Example:

| Domain          | Target Service   |
| --------------- | ---------------- |
| fe.domain.com   | Frontend         |
| http.domain.com | HTTP API         |
| ws.domain.com   | WebSocket server |

---

# HTTPS

HTTPS is configured using:

* Certbot
* Let's Encrypt

SSL certificates are automatically installed and managed by Nginx.

---

# Useful Commands

## View running containers

```bash
docker ps
```

## View images

```bash
docker images
```

## View logs

```bash
docker logs <container-name>
```

## Rebuild images

```bash
docker compose up --build
```

## Remove unused Docker resources

```bash
docker system prune -a
```

## View Docker networks

```bash
docker network ls
```

## View Docker volumes

```bash
docker volume ls
```

---

# Production Deployment Flow

```txt
Git Push
   ↓
GitHub Actions
   ↓
Docker Image Build
   ↓
Docker Hub Push
   ↓
SSH into VM
   ↓
Docker Pull
   ↓
Container Recreation
   ↓
Live Deployment
```

---

# Current Status

* Multi-service Docker architecture completed
* Independent CI/CD pipelines configured
* Docker Hub integration working
* Automated VM deployments working
* PostgreSQL persistence configured
* Prisma migrations working
* Internal Docker networking working
* Nginx reverse proxy configured
* HTTPS enabled using Certbot
* SHA-based image deployments working
* Services communicating successfully

---

# Future Improvements

* Multi-stage Docker builds
* Image size optimization
* Turbo remote caching
* Deployment staging environment
* Container monitoring and logging
* Prometheus and Grafana integration
* Blue-green deployments
* Kubernetes migration
* Infrastructure as Code using Terraform

---

# License

MIT