# Enterprise Workflow System

**Industry:** Semiconductor / Manufacturing — multi-step approval with compliance audit

## Systems

| System | Directory | Tech | Port |
|--------|-----------|------|------|
| Workflow API | `workflow-api/` | Spring Boot + Kotlin + GraphQL | 4002 |
| Admin API | `admin-api/` | Laravel (PHP) | 4012 |
| Notification Worker | `notification-worker/` | Kafka Consumer (Kotlin) | — |
| Employee Portal | `employee-portal/` | Vue 3 + Pinia + Element Plus | 3002 |
| Admin Dashboard | `admin-dashboard/` | Vue 3 + Element Plus | 3012 |
| Mobile App | `mobile-app/` | Kotlin (Android) + Swift (iOS) | — |

## Documentation

See [docs/](docs/) for all project documentation.

## Quick Start

```bash
# Start shared infra (includes Temporal + Keycloak)
docker compose up -d

# Start backend
cd workflow-api && ./gradlew bootRun

# Start frontend
cd employee-portal && npm install && npm run dev
```
