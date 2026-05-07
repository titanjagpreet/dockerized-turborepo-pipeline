# Dockerized Turborepo Pipeline

A fully dockerized Turborepo-based monorepo containing:

* Next.js frontend
* Express HTTP server
* WebSocket server
* Shared Prisma package
* PostgreSQL database
* Docker Compose orchestration

The project is structured as a production-style multi-service setup using isolated containers, internal Docker networking, persistent database volumes, and Prisma migrations.

---

## Tech Stack

### Frontend

* [Next.js](https://nextjs.org)
* React
* TypeScript

### Backend

* [Express.js](https://expressjs.com)
* WebSocket server
* JWT Authentication
* bcrypt

### Monorepo

* [Turborepo](https://turbo.build/repo)
* [pnpm](https://pnpm.io)

### Database

* [PostgreSQL](https://www.postgresql.org)
* [Prisma ORM](https://www.prisma.io)

### DevOps

* [Docker](https://www.docker.com)
* [Docker Compose](https://docs.docker.com/compose)

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
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

# Services

| Service     | Port | Description         |
| ----------- | ---- | ------------------- |
| web         | 3000 | Next.js frontend    |
| http-server | 3001 | Express API server  |
| ws-server   | 3003 | WebSocket server    |
| postgres    | 5432 | PostgreSQL database |

---

# Features

* Monorepo architecture using Turborepo
* Shared Prisma client package
* Separate Dockerfiles for each service
* Docker Compose orchestration
* Internal Docker networking
* Persistent PostgreSQL volume
* Automatic Prisma migration deployment
* Healthcheck-based service dependency management
* Production Next.js build
* Workspace dependency management with pnpm

---

# Environment Variables

Create a `.env` file at the project root.

Example:

```env
DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres?schema=public
```

---

# Running the Project

## Using Docker Compose

Build and start all services:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

Stop containers:

```bash
docker compose down
```

Remove containers along with volumes:

```bash
docker compose down -v
```

---

# Docker Architecture

The application uses:

* Dedicated containers for each service
* Internal Docker network for inter-service communication
* Named Docker volume for PostgreSQL persistence

### Internal Networking

Services communicate internally using Docker DNS.

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

This ensures database data survives container restarts.

---

# Prisma Migration Flow

During container startup:

1. PostgreSQL container starts
2. Healthcheck verifies database readiness
3. Prisma migrations are deployed
4. Application services start

Migration command:

```bash
prisma migrate deploy
```

---

# Development Notes

### Next.js Build-Time Database Access

The frontend uses:

```ts
export const dynamic = "force-dynamic";
```

to avoid Prisma database access during static build generation inside Docker builds.

---

# Useful Commands

### View running containers

```bash
docker ps
```

### View images

```bash
docker images
```

### View logs

```bash
docker compose logs
```

### Rebuild containers

```bash
docker compose up --build
```

### Remove unused Docker resources

```bash
docker system prune -a
```

---

# Current Status

* Dockerized multi-service setup completed
* PostgreSQL persistence configured
* Prisma migrations working
* Compose networking working
* Production builds working
* Services communicating successfully

---

# Future Improvements

* GitHub Actions CI/CD pipeline
* EC2 deployment
* Reverse proxy with Nginx
* HTTPS setup
* Image size optimization using multi-stage builds
* Turbo build caching optimization
* Container registry publishing
* Production monitoring/logging

---

# License

MIT