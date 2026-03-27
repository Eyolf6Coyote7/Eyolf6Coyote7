# Enterprise Workflow System

> Multi-step approval with Temporal orchestration + Kafka event sourcing + immutable audit trail.

**Industry:** Semiconductor | **Architecture:** Clean Architecture + DDD + CQRS

## Systems

| # | System | Tech | Port |
|---|--------|------|------|
| 1 | PostgreSQL | PostgreSQL 16 | 5433 |
| 2 | Redis | Redis 7.2 | 6381 |
| 3 | Kafka | Apache Kafka 3.7 | 9095 |
| 4 | Keycloak | Keycloak 25 | 8080 |
| 5 | Temporal | Temporal 1.24 | 7233 |
| 6 | Temporal UI | Temporal UI 2.32 | 8233 |
| 7 | MinIO | MinIO | 9002 |
| 8 | Unleash | Unleash | 4243 |
| 9 | MailHog | MailHog | 8026 |
| 10 | Workflow API | Spring Boot + Kotlin + GraphQL (DGS) | 4002 |
| 11 | Admin API | Laravel 11 (PHP) | 4003 |
| 12 | Notification Worker | Kotlin + Kafka consumer | — |
| 13 | Employee Portal | Vue 3 + Pinia + Element Plus | 5174 |
| 14 | Admin Dashboard | Vue 3 + ECharts | 5175 |
| 15 | Mobile App (Android) | Kotlin + Jetpack Compose | — |
| 16 | Mobile App (iOS) | Swift + SwiftUI | — |

## Quick Start

### Demo Mode

```bash
cd employee-portal && pnpm install && VITE_MOCK=true pnpm dev   # http://localhost:5174
cd admin-dashboard && pnpm install && VITE_MOCK=true pnpm dev   # http://localhost:5175
```

### Real Mode

```bash
# 1. Docker infra (9 services)
docker compose up -d

# 2. Workflow API (Kotlin + GraphQL)
cd workflow-api && ./gradlew bootRun

# 3. Admin API (Laravel)
cd admin-api && composer install && php artisan serve --port=4003

# 4. Notification Worker
cd notification-worker && ./gradlew bootRun

# 5. Employee Portal
cd employee-portal && pnpm install && pnpm dev

# 6. Admin Dashboard
cd admin-dashboard && pnpm install && pnpm dev
```

### Stop

```bash
# Ctrl+C each terminal, then:
docker compose down
```

## Prerequisites

- Node.js 20+ / pnpm 9+
- JDK 17+
- PHP 8.2+ / Composer
- Docker + Docker Compose

## Documentation

See [docs/](docs/) for ConOps, PRD, UI/UX, Architecture, Technical Design, Roadmap, Testing.
