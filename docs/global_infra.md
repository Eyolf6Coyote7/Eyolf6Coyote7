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
    KF[(Kafka<br/>:9092)]
    UL[(Unleash<br/>:4242)]
    MH[(MailHog<br/>:1025 / :8025)]
    CHR[(ChromaDB<br/>:8000)]
    ES[(Elasticsearch<br/>:9200)]
    TS[(TimescaleDB<br/>:5433)]
    LF[(Langfuse<br/>:3100)]
  end

  subgraph "Backend Services (host)"
    WB[Whiteboard API<br/>:4001]
    WF[Workflow API<br/>:4002]
    TD[3D Asset API<br/>:4003]
  end

  WB --> PG
  WB --> RD
  WB --> MIO
  WB --> UL
  WB --> KF
  WF --> PG
  WF --> RD
  WF --> MIO
  WF --> KC
  WF --> KF
  WF --> UL
  WF -->|send email| MH
  TD --> PG
  TD --> RD
  TD --> MIO
  TD --> MQ
  MQ -->|bridge| KF
  TD --> KF
  TD --> UL
  TD --> ES
  TD --> TS
  IOT_C -->|write sensor data| TS
  UL --> PG
  UL --> PG
```

---

## Messaging Patterns

Each project uses a different messaging pattern to demonstrate breadth.

| Pattern | Tech | Project | Use Case |
|---------|------|---------|----------|
| Stream (log-based) | Redis Stream | Whiteboard | AI task queue (lightweight, already have Redis) |
| Event Streaming | Kafka | Workflow | Approval events, audit log, async notifications |
| IoT Pub/Sub → Event Stream | MQTT → Kafka | 3D Asset | MQTT collects IoT sensor data, bridges to Kafka for persistence |

---

## Service Definitions

### Docker Compose Structure

```
docker-compose.yml              ← shared infra (always up)
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
| Kafka | 9092 | 9092 | — |
| Kafka (controller) | 9093 | 9093 | — |
| Unleash | 4242 | 4242 | http://localhost:4242 |
| MailHog (SMTP) | 1025 | 1025 | — |
| MailHog (Web UI) | 8025 | 8025 | http://localhost:8025 |
| ChromaDB | 8000 | 8000 | — |
| Elasticsearch | 9200 | 9200 | — |
| TimescaleDB | 5432 | 5433 | — |
| Langfuse | 3100 | 3100 | http://localhost:3100 |

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
| Mosquitto | `mqtt_data` | `/mosquitto/data` | Message persistence |
| Kafka | `kafka_data` | `/var/lib/kafka/data` | Event log segments |
| Unleash | — | Uses PostgreSQL | Feature toggle config (stored in `workspace` DB) |
| ChromaDB | `chroma_data` | `/chroma/chroma` | Vector embeddings |
| Elasticsearch | `es_data` | `/usr/share/elasticsearch/data` | Search indexes |
| TimescaleDB | `tsdb_data` | `/var/lib/postgresql/data` | IoT time-series data |
| Langfuse | — | Uses PostgreSQL | LLM traces and metrics (stored in `workspace` DB) |

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

# Kafka (KRaft mode, no ZooKeeper)
KAFKA_CLUSTER_ID=local-workspace-cluster

# Unleash
UNLEASH_URL=http://localhost:4242/api
UNLEASH_ADMIN_TOKEN=default:development.unleash-insecure-api-token

# MailHog (local SMTP)
SMTP_HOST=localhost
SMTP_PORT=1025

# ChromaDB
CHROMA_HOST=localhost
CHROMA_PORT=8000

# Elasticsearch
ELASTICSEARCH_URL=http://localhost:9200

# TimescaleDB (separate from main PostgreSQL)
TIMESCALEDB_URL=postgresql://workspace:workspace_local@localhost:5433/iot_timeseries

# Langfuse
LANGFUSE_HOST=http://localhost:3100
LANGFUSE_PUBLIC_KEY=pk-local
LANGFUSE_SECRET_KEY=sk-local
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
| `KAFKA_BOOTSTRAP_SERVERS` | — | `localhost:9092` | `localhost:9092` |
| `UNLEASH_URL` | `http://localhost:4242/api` | `http://localhost:4242/api` | `http://localhost:4242/api` |
| `SMTP_HOST` | — | `localhost:1025` | `localhost:1025` |
| `CHROMA_URL` | `http://localhost:8000` | — | — |
| `LANGFUSE_HOST` | `http://localhost:3100` | — | — |
| `OLLAMA_URL` | `http://localhost:11434` | — | — |
| `ELASTICSEARCH_URL` | — | — | `http://localhost:9200` |
| `TIMESCALEDB_URL` | — | — | `postgresql://...@localhost:5433/iot_timeseries` |
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
| 1 | Workflow | Cache, Session |
| 2 | 3D Asset | Cache, Pub/Sub |

---

## Kafka Topics

| Topic | Project | Purpose | Partitions |
|-------|---------|---------|------------|
| `workflow.approval-events` | Workflow | Approval state changes | 3 (by `workflow_id`) |
| `workflow.audit-log` | Workflow | All user actions for compliance | 6 (by `user_id`) |
| `workflow.notifications` | Workflow | Async email/push notifications | 3 (by `recipient_id`) |
| `asset3d.iot-sensor-data` | 3D Asset | IoT sensor readings (from MQTT bridge) | 6 (by `device_id`) |
| `asset3d.asset-events` | 3D Asset | Asset upload, version, delete events | 3 (by `asset_id`) |
| `analytics.whiteboard-events` | Whiteboard | board_created, drawing_started, ai_prompt_sent, export_pdf | 3 (by `user_id`) |
| `analytics.workflow-events` | Workflow | workflow_created, step_approved, step_rejected, document_uploaded | 3 (by `user_id`) |
| `analytics.asset3d-events` | 3D Asset | asset_uploaded, asset_viewed_3d, iot_alert_triggered | 3 (by `user_id`) |

### Kafka Design Patterns

| Pattern | Where | Why |
|---------|-------|-----|
| **Event Sourcing** | `workflow.approval-events` | Store every approval state change as immutable event. Rebuild current state by replaying events. Enables audit trail and time-travel debugging. |
| **Exactly-once Semantics** | `workflow.audit-log` | Use Kafka transactions (`enable.idempotence=true` + `transactional.id`) to guarantee each audit entry is written exactly once. Critical for compliance — duplicates or missing entries are unacceptable. |
| **Partitioning Strategy** | All topics | Partition by entity ID (e.g. `workflow_id`, `device_id`) to guarantee ordering within the same entity while allowing parallel consumption across partitions. |
| **Consumer Groups** | `workflow.notifications` | Multiple notification workers in the same consumer group — Kafka auto-balances partitions across workers for horizontal scaling. |
| **MQTT → Kafka Bridge** | `asset3d.iot-sensor-data` | Mosquitto receives high-frequency IoT data via lightweight MQTT protocol, bridges to Kafka for durable storage and downstream processing. Decouples ingestion from processing. |
| **Compacted Topic** | `asset3d.asset-events` (planned) | Log compaction keeps only the latest event per `asset_id` — acts as a materialized view of current asset state without querying the database. |

---

## Feature Toggles (Unleash)

Unleash provides feature flag management for all three projects via a shared server.

| Feature Flag | Project | Type | Purpose |
|-------------|---------|------|---------|
| `whiteboard.ai-assistant` | Whiteboard | Release | Gradual rollout of AI features |
| `whiteboard.guest-mode` | Whiteboard | Kill switch | Disable anonymous access if abused |
| `workflow.new-approval-ui` | Workflow | Experiment | A/B test new approval interface |
| `workflow.kafka-audit` | Workflow | Release | Switch audit log from DB to Kafka |
| `asset3d.iot-dashboard` | 3D Asset | Release | Enable IoT data overlay on 3D view |
| `asset3d.versioned-upload` | 3D Asset | Release | Enable asset version history |

### Unleash SDK per Project

| Project | SDK | Integration |
|---------|-----|-------------|
| Whiteboard | `unleash-client-node` | NestJS middleware |
| Workflow | `unleash-client-kotlin` | Spring Boot filter |
| 3D Asset | `Unleash.Client` (.NET) | ASP.NET Core middleware |

> Staff-level interview signal: "How do you release features without deploying? How do you do A/B testing?"

---

## Remote Config

Mobile apps fetch config on startup — UI, copy, and branding can change without app store release.

```
GET /api/config/mobile
```

```json
{
  "theme": {
    "primary_color": "#1976D2",
    "brand_logo_url": "https://minio:9000/whiteboard-assets/logo.png",
    "dark_mode_enabled": true
  },
  "features": {
    "ai_assistant": true,
    "guest_mode": false
  },
  "copy": {
    "welcome_title": "Welcome to Whiteboard",
    "onboarding_cta": "Start Drawing"
  }
}
```

| Project | What's Configurable |
|---------|-------------------|
| Whiteboard | Theme colors, AI toggle, welcome copy |
| Workflow | Branding (white-label), approval form labels, notification templates |
| 3D Asset | Unity scene defaults, IoT refresh interval, upload size limit |

> Backed by Unleash feature flags + a config table in PostgreSQL. No external service needed.

---

## Event Tracking / Analytics

User behavior events are written to Kafka for analysis. No third-party analytics required.
Topics are listed in the unified Kafka Topics table above.

### Event Schema

```json
{
  "event_id": "uuid",
  "user_id": "uuid",
  "event": "board_created",
  "properties": { "board_type": "ai", "template": "brainstorm" },
  "timestamp": "2026-03-19T10:00:00Z",
  "session_id": "uuid"
}
```

> In production, a Kafka consumer would aggregate these into a dashboard. For local dev, events are stored in Kafka and can be inspected via CLI (`kafka-console-consumer`).

---

## Admin Panel

The Workflow project includes an admin dashboard for managing the system.

| Feature | Tech | Description |
|---------|------|-------------|
| User management | Keycloak Admin API | CRUD users, assign roles (Admin/Manager/Employee) |
| Workflow templates | Vue 3 admin UI | Create/edit approval flow templates |
| Feature toggles | Unleash UI (embedded) | Toggle features per environment/user segment |
| Remote config | Custom admin UI | Edit mobile config (theme, copy, branding) |
| Analytics | Kafka consumer → charts | View user behavior metrics |
| Audit log | Kafka topic viewer | Browse compliance audit trail |

> Admin panel is part of the Workflow project's web frontend, behind `Admin` role gate via Keycloak.

---

## Email (MailHog)

MailHog intercepts all outgoing SMTP email locally — no real emails are sent.

| Feature | How |
|---------|-----|
| View emails | Web UI at http://localhost:8025 |
| SMTP server | `localhost:1025` — all backends point here |
| API | `GET http://localhost:8025/api/v2/messages` |

### Email Use Cases

| Project | Email Type | Trigger |
|---------|-----------|---------|
| Workflow | Approval notification | Kafka notification worker → SMTP → MailHog |
| Workflow | 2FA verification code | Keycloak → SMTP → MailHog |
| 3D Asset | Asset shared notification | Backend → SMTP → MailHog |

---

## Two-Factor Authentication (2FA)

| Method | Tech | Project |
|--------|------|---------|
| **TOTP** (Time-based One-Time Password) | Keycloak built-in | Workflow (all users) |
| **Email OTP** | Keycloak → MailHog | Workflow (fallback) |
| **SMS Mock** | Log to console (no real SMS) | — (optional) |

### How It Works

```
1. User enables 2FA in profile settings
2. Keycloak shows QR code (TOTP secret)
3. User scans with Google Authenticator / Authy
4. On next login: password + 6-digit TOTP code
5. Fallback: email OTP sent via MailHog
```

> TOTP is the industry standard for 2FA. Compatible with Google Authenticator, Authy, 1Password.
> Keycloak handles the entire 2FA flow — no custom implementation needed.

---

## AI / LLM Pipeline (Whiteboard)

Local AI infrastructure — no cloud APIs, all runs on Mac.

### Services

| Service | Tech | Port | Purpose |
|---------|------|------|---------|
| Ollama | Local LLM runtime | 11434 | Serve quantized models (Llama 3, Mistral, etc.) |
| ChromaDB | Vector database (Docker) | 8000 | Store and query document embeddings for RAG |
| Langfuse | LLM observability (Docker) | 3100 | Trace LLM calls, measure latency/tokens/quality |
| Embedding Model | all-MiniLM-L6-v2 (via Ollama) | — | Generate embeddings for RAG |

### Pipeline Flow

```
User prompt
  → Intent Classifier (info retrieval or action?)

Info Retrieval path:
  → Embedding Model (vectorize query)
  → ChromaDB (find relevant context)
  → RAG Assembler (context + prompt)
  → Ollama LLM (generate response)
  → Langfuse (trace)
  → Response to user

Action Execution path:
  → MCP Server (route to tool)
  → Tool executes (create board, search, export)
  → LLM generates final response with tool result
  → Langfuse (trace)
  → Response to user
```

### MCP Tools

| Tool | What It Does | Example |
|------|-------------|---------|
| User Tool | Read/update user profile, preferences | "What boards have I created?" |
| Data Tool | Query board data, search content | "Find boards about marketing" |
| Task Tool | Execute actions via Backend API | "Create a new brainstorm board" |

### Fine-tuning (Offline)

| Component | Tech | Purpose |
|-----------|------|---------|
| Dataset | User feedback + usage data | Collect what works, what doesn't |
| Fine-tune | HuggingFace + LoRA (Low-Rank Adaptation) | Lightweight fine-tune without retraining full model |
| Quantization | GGUF (via llama.cpp) | Compress model for Mac (4-bit / 8-bit) |
| Deploy | Copy weights to Ollama | `ollama create whiteboard-ai -f Modelfile` |

> Fine-tuning runs offline on schedule. Not part of the real-time pipeline.

### Resource Estimates (AI)

| Service | RAM | GPU |
|---------|-----|-----|
| Ollama (7B model, 4-bit) | ~4-5 GB | Metal (Apple Silicon) |
| ChromaDB | ~0.3 GB | — |
| Langfuse | ~0.3 GB | — |
| **Total (AI)** | **~5 GB** | |

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
| Kafka (KRaft) | ~0.5 GB | Medium |
| Unleash | ~0.3 GB | Low |
| MailHog | ~0.1 GB | Low |
| ChromaDB | ~0.3 GB | Low |
| Langfuse | ~0.3 GB | Low |
| Elasticsearch | ~0.5 GB | Medium |
| TimescaleDB | ~0.3 GB | Low |
| **Total (infra)** | **~3.9 GB** | |

With all 3 backends (~1.5 GB) + Ollama 7B 4-bit (~5 GB) + Storybook (~0.5 GB): ~11 GB total. Fits comfortably in 32 GB.

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
