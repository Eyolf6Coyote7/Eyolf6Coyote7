# Enterprise Workflow System

> Multi-step approval with Temporal orchestration + Kafka event sourcing + immutable audit trail.

**Industry:** Semiconductor | **Architecture:** Clean Architecture + DDD + CQRS | **13 systems**

## Systems

| # | System | Directory | Tech | Port |
|---|--------|-----------|------|------|
| 1 | PostgreSQL | docker | PostgreSQL 16 | 5433 |
| 2 | Redis | docker | Redis 7.2 | 6381 |
| 3 | Kafka | docker | Apache Kafka 3.7 | 9095 |
| 4 | Keycloak | docker | Keycloak 25 | 8080 |
| 5 | Temporal | docker | Temporal 1.24 | 7233 |
| 6 | Temporal UI | docker | Temporal UI 2.28 | 8233 |
| 7 | MinIO | docker | MinIO | 9002/9003 |
| 8 | Unleash | docker | Unleash | 4243 |
| 9 | MailHog | docker | MailHog | 1026/8026 |
| 10 | Workflow API | `workflow-api/` | Spring Boot + Kotlin + GraphQL (DGS) | 4002 |
| 11 | Admin API | `admin-api/` | Laravel 11 (PHP) | 4012 |
| 12 | Employee Portal | `employee-portal/` | Vue 3 + Pinia + Element Plus | 3002 |
| 13 | Admin Dashboard | `admin-dashboard/` | Vue 3 + ECharts | 3012 |

## Quick Start

### Demo Mode (no backend needed)

```bash
# Employee Portal
cd employee-portal && pnpm install && pnpm dev
# Open http://localhost:3002 (login: demo@example.com / demo)

# Admin Dashboard
cd admin-dashboard && pnpm install && pnpm dev
# Open http://localhost:3012 (login: admin / admin)
```

### Real Mode (full stack)

#### Start

```bash
# 1. Infrastructure (9 Docker services)
docker compose up -d

# 2. Workflow API (Kotlin + GraphQL)
cd workflow-api
./gradlew bootRun                     # GraphiQL: http://localhost:4002/graphiql

# 3. Admin API (Laravel)
cd admin-api
composer install                      # first time only
cp .env.example .env                  # first time only
php artisan key:generate              # first time only
php artisan migrate --force           # first time only
php artisan serve --port=4012

# 4. Notification Worker (Kotlin + Kafka)
cd notification-worker
./gradlew bootRun

# 5. Employee Portal (Vue)
cd employee-portal
echo "VITE_MOCK=false" > .env.local   # switch to real mode
pnpm install && pnpm dev

# 6. Admin Dashboard (Vue)
cd admin-dashboard
echo "VITE_MOCK=false" > .env.local   # switch to real mode
pnpm install && pnpm dev
```

#### Stop

```bash
# Stop app services: Ctrl+C in each terminal

# Stop Docker infrastructure
docker compose down
```

### All Service URLs

| Service | URL |
|---------|-----|
| Employee Portal | http://localhost:3002 |
| Admin Dashboard | http://localhost:3012 |
| Workflow API (GraphiQL) | http://localhost:4002/graphiql |
| Admin API | http://localhost:4012/api/config |
| Keycloak | http://localhost:8080 |
| Temporal UI | http://localhost:8233 |
| MailHog | http://localhost:8026 |
| MinIO Console | http://localhost:9003 |
| Unleash | http://localhost:4243 |

## Prerequisites

- Node.js 20+ / pnpm 9+
- JDK 21 (for Kotlin services)
- PHP 8.3 + Composer (for Admin API)
- Docker + Docker Compose

## Documentation

See [docs/](docs/) for architecture, technical design, ADRs, and development roadmap.
