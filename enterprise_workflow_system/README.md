# Enterprise Workflow System

> Multi-step approval with Temporal orchestration + Kafka event sourcing + immutable audit trail.

**Industry:** Semiconductor | **Architecture:** Clean Architecture + DDD + CQRS

## Services

| Service | Tech | Port | Status |
|---------|------|------|--------|
| Employee Portal | Vue 3 + Pinia + Element Plus | 3002 | ✅ Demo ready |
| Admin Dashboard | Vue 3 + ECharts | 3012 | ✅ Demo ready |
| Workflow API | Spring Boot + Kotlin + GraphQL (DGS) | 4002 | ✅ Builds |
| Admin API | Laravel 11 (PHP) | 4012 | ✅ Scaffold |
| Notification Worker | Kotlin + Kafka | 4022 | ✅ Builds |
| Mobile App | Kotlin (Android) + Swift (iOS) | — | Planned |

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

### Full Stack (local)

```bash
# 1. Start infrastructure
docker compose up -d

# 2. Workflow API (requires JDK 21)
cd workflow-api && ./gradlew bootRun

# 3. Admin API (requires PHP 8.3 + Composer)
cd admin-api && composer install && php artisan serve --port=4012

# 4. Notification Worker (requires JDK 21)
cd notification-worker && ./gradlew bootRun

# 5. Employee Portal (set VITE_MOCK=false in .env.local for real mode)
cd employee-portal && pnpm install && pnpm dev

# 6. Admin Dashboard (set VITE_MOCK=false in .env.local for real mode)
cd admin-dashboard && pnpm install && pnpm dev
```

### Infrastructure Services

| Service | Port | UI |
|---------|------|-----|
| PostgreSQL | 5433 | — |
| Redis | 6381 | — |
| Kafka | 9095 | — |
| Keycloak | 8080 | http://localhost:8080 |
| Temporal | 7233 | http://localhost:8233 |
| MinIO | 9002 | http://localhost:9003 |
| Unleash | 4243 | http://localhost:4243 |
| MailHog | 1026 | http://localhost:8026 |

## Prerequisites

- Node.js 20+ / pnpm 9+
- JDK 21 (for Kotlin services)
- PHP 8.3 + Composer (for Admin API)
- Docker + Docker Compose

## Documentation

See [docs/](docs/) for architecture, technical design, ADRs, and development roadmap.
