# Global Infrastructure

> All services run **locally** via Docker Compose. No cloud dependencies.

---

## Network Topology

```mermaid
graph TD
  subgraph "Docker Compose Network: workspace-net"
    PG[(PostgreSQL<br/>:5432)]
    RD[(Redis<br/>:6379)]
    MIO[(MinIO<br/>:9000 / :9001)]
    KC[(Keycloak<br/>:8080)]
    MQ[(Mosquitto<br/>:1883)]
    PROM[(Prometheus<br/>:9090)]
    GRAF[(Grafana<br/>:3000)]
    JAEG[(Jaeger<br/>:16686)]
  end

  subgraph "Backend Services (host)"
    WB[Whiteboard API<br/>:4001]
    WF[Workflow API<br/>:4002]
    TD[3D Asset API<br/>:4003]
  end

  WB --> PG
  WB --> RD
  WB --> MIO
  WF --> PG
  WF --> RD
  WF --> MIO
  WF --> KC
  TD --> PG
  TD --> RD
  TD --> MIO
  TD --> MQ
  PROM --> WB
  PROM --> WF
  PROM --> TD
  GRAF --> PROM
  JAEG --> WB
  JAEG --> WF
  JAEG --> TD
```

---

## Service Definitions

### Docker Compose Structure

```
docker-compose.yml          ← shared infra (always up)
docker-compose.whiteboard.yml   ← whiteboard backend (optional)
docker-compose.workflow.yml     ← workflow backend (optional)
docker-compose.3d-asset.yml     ← 3d-asset backend (optional)
```

Startup:
```bash
# Start shared infra only
docker compose up -d

# Start shared infra + specific project
docker compose -f docker-compose.yml -f docker-compose.whiteboard.yml up -d
```

---

## Port Mapping

| Service | Container Port | Host Port | UI |
|---------|---------------|-----------|-----|
| PostgreSQL | 5432 | 5432 | — |
| Redis | 6379 | 6379 | — |
| MinIO (API) | 9000 | 9000 | — |
| MinIO (Console) | 9001 | 9001 | http://localhost:9001 |
| Keycloak | 8080 | 8080 | http://localhost:8080 |
| Mosquitto (MQTT) | 1883 | 1883 | — |
| Prometheus | 9090 | 9090 | http://localhost:9090 |
| Grafana | 3000 | 3000 | http://localhost:3000 |
| Jaeger (UI) | 16686 | 16686 | http://localhost:16686 |
| Jaeger (OTLP) | 4317 | 4317 | — |

### Backend Services (run on host, not Docker)

| Service | Port | Framework |
|---------|------|-----------|
| Whiteboard API | 4001 | NestJS |
| Workflow API | 4002 | Spring Boot |
| 3D Asset API | 4003 | ASP.NET Core |

---

## Volumes & Data Persistence

| Service | Volume | Path in Container | Purpose |
|---------|--------|-------------------|---------|
| PostgreSQL | `pg_data` | `/var/lib/postgresql/data` | Database files |
| Redis | `redis_data` | `/data` | RDB snapshots |
| MinIO | `minio_data` | `/data` | Object storage files |
| Keycloak | `kc_data` | `/opt/keycloak/data` | Realm config, users |
| Prometheus | `prom_data` | `/prometheus` | Metrics time series |
| Grafana | `grafana_data` | `/var/lib/grafana` | Dashboards, datasources |
| Mosquitto | `mqtt_data` | `/mosquitto/data` | Message persistence |

Reset all data:
```bash
docker compose down -v
```

---

## Environment Variables

### `.env` (shared)

```env
# PostgreSQL
POSTGRES_USER=workspace
POSTGRES_PASSWORD=workspace_local
POSTGRES_DB=workspace

# Redis
REDIS_PASSWORD=redis_local

# MinIO
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin_local

# Keycloak
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=admin_local

# Mosquitto
MQTT_USER=workspace
MQTT_PASSWORD=mqtt_local

# Grafana
GF_SECURITY_ADMIN_PASSWORD=admin_local
```

> **All passwords are for local development only.** Never use these in production.

### Per-project `.env`

| Variable | Whiteboard | Workflow | 3D Asset |
|----------|-----------|----------|----------|
| `DATABASE_URL` | `postgresql://workspace:workspace_local@localhost:5432/whiteboard` | `...@localhost:5432/workflow` | `...@localhost:5432/asset3d` |
| `REDIS_URL` | `redis://:redis_local@localhost:6379/0` | `...@localhost:6379/1` | `...@localhost:6379/2` |
| `MINIO_ENDPOINT` | `localhost:9000` | `localhost:9000` | `localhost:9000` |
| `MINIO_BUCKET` | `whiteboard-assets` | `workflow-documents` | `3d-assets` |
| `KEYCLOAK_URL` | — | `http://localhost:8080` | — |
| `MQTT_URL` | — | — | `mqtt://localhost:1883` |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `http://localhost:4317` | `http://localhost:4317` | `http://localhost:4317` |
| `PORT` | `4001` | `4002` | `4003` |

---

## PostgreSQL Databases

Each project uses a separate database in the same PostgreSQL instance.

| Database | Project |
|----------|---------|
| `whiteboard` | Realtime AI Whiteboard |
| `workflow` | Enterprise Workflow System |
| `asset3d` | 3D Asset Collaboration |

Init script creates all databases on first start:
```sql
-- docker-entrypoint-initdb.d/init.sql
CREATE DATABASE whiteboard;
CREATE DATABASE workflow;
CREATE DATABASE asset3d;
```

---

## Redis Database Index

Each project uses a different Redis DB index to avoid key collisions.

| DB Index | Project | Usage |
|----------|---------|-------|
| 0 | Whiteboard | Cache, Pub/Sub, Stream (AI queue) |
| 1 | Workflow | Cache, Session, Stream (task queue) |
| 2 | 3D Asset | Cache, Pub/Sub, Stream (IoT ingest) |

---

## MinIO Buckets

| Bucket | Project | Versioned |
|--------|---------|-----------|
| `whiteboard-assets` | Whiteboard | No |
| `workflow-documents` | Workflow | No |
| `3d-assets` | 3D Asset | Yes |

Auto-created on first start via MinIO Client (`mc`):
```bash
mc alias set local http://localhost:9000 minioadmin minioadmin_local
mc mb local/whiteboard-assets
mc mb local/workflow-documents
mc mb local/3d-assets
mc version enable local/3d-assets
```

---

## Resource Estimates

| Service | RAM | CPU |
|---------|-----|-----|
| PostgreSQL | ~0.5 GB | Low |
| Redis | ~0.2 GB | Low |
| MinIO | ~0.3 GB | Low |
| Keycloak | ~0.5 GB | Medium |
| Mosquitto | ~0.1 GB | Low |
| Prometheus | ~0.3 GB | Low |
| Grafana | ~0.2 GB | Low |
| Jaeger | ~0.3 GB | Low |
| **Total (infra)** | **~2.4 GB** | |

With all 3 backends + Ollama (7B model): ~15 GB total. Fits comfortably in 32 GB.

---

## Quick Reference

```bash
# Start all shared infra
docker compose up -d

# Stop all
docker compose down

# Reset all data
docker compose down -v

# View logs
docker compose logs -f <service>

# Check status
docker compose ps
```