# Global Tech Stack

> All infrastructure runs **locally** — no cloud services. Docker Compose for orchestration.

---

## At a Glance

Three full-stack projects, each with a different tech stack, sharing the same local infrastructure.

| Dimension        | Whiteboard             | Workflow                | 3D Asset              |
| ---------------- | ---------------------- | ----------------------- | --------------------- |
| **Frontend**     | React                  | Vue 3 + Admin Panel     | React + Three.js      |
| **Mobile**       | React Native           | Kotlin + Swift + WebView| Unity (C#)            |
| **Backend**      | Node.js (NestJS)       | Kotlin (Spring Boot)    | ASP.NET Core          |
| **Realtime**     | Socket.IO + Yjs (CRDT) | Temporal                | SignalR + MQTT        |
| **Messaging**    | Redis Stream           | Kafka                   | MQTT → Kafka          |
| **Auth**         | JWT + Guest            | Keycloak (OAuth2 / SSO) | API Key + JWT + ACL   |
| **Storage**      | MinIO                  | MinIO                   | MinIO (versioned)     |
| **Feature Flags**| Unleash                | Unleash + Admin UI      | Unleash               |
| **Remote Config**| Theme + AI toggle      | White-label branding    | Unity scene defaults  |
| **Analytics**    | Kafka events           | Kafka events + Admin    | Kafka events          |
| **AI**           | Ollama + LangChain     | —                       | ONNX Runtime (opt)    |

---

## Shared Infrastructure

All three projects connect to the same local services via Docker Compose.

| Service        | Tech                      | What It Does                             |
| -------------- | ------------------------- | ---------------------------------------- |
| Database       | PostgreSQL                | Relational data for all projects         |
| Cache          | Redis                     | Caching, Pub/Sub, Stream (Whiteboard AI queue) |
| Object Storage | MinIO (S3-compatible)     | File upload / download for all projects  |
| Identity       | Keycloak                  | OAuth2 / OIDC provider (Workflow project)|
| Event Streaming| Kafka (KRaft mode)        | Event bus for Workflow + 3D Asset        |
| IoT Broker     | Mosquitto (MQTT)          | IoT sensor ingestion (3D Asset project)  |
| Feature Flags  | Unleash                   | Feature toggles, A/B testing, kill switch|
| Container      | Docker Compose            | One command to start everything          |

---

### Authentication

Each project uses a different strategy to match its use case.

| Project    | Method                       | Why This Approach                                |
| ---------- | ---------------------------- | ------------------------------------------------ |
| Whiteboard | JWT + Anonymous Guest        | Users need instant access — no forced sign-up    |
| Workflow   | Keycloak (OAuth2/OIDC + SSO) | Enterprise apps require SSO and role management  |
| 3D Asset   | API Key + JWT + Resource ACL | IoT devices and Unity clients can't do OAuth redirects |

<details>
<summary>Details per project</summary>

**Whiteboard** — Anonymous + authenticated hybrid:
```
Registered → Email/Password → Backend issues JWT
Guest      → Anonymous token (read-only, limited features)
```

**Workflow** — Enterprise SSO via Keycloak (Docker):
```
Keycloak (Identity Provider)
├─ OAuth2 Authorization Code Flow
├─ RBAC roles: Admin / Manager / Employee
├─ Spring Security integration
└─ Simulates corporate SSO locally
```

**3D Asset** — Mixed clients (browser + IoT + Unity):
```
API Key → IoT devices / Unity client (M2M)
JWT     → Web user login
ACL     → Owner / Editor / Viewer per asset
```

</details>

---

### File Upload / Download

All projects use MinIO with the same pattern:

```
Upload:   Client → multipart → Backend API → MinIO bucket
Download: Client ← presigned URL ← Backend API ← MinIO
```

| Project    | What Gets Uploaded                          | Bucket              |
| ---------- | ------------------------------------------- | ------------------- |
| Whiteboard | Images, exported PNG / PDF                  | `whiteboard-assets` |
| Workflow   | Form attachments, approval docs, reports    | `workflow-documents`|
| 3D Asset   | GLB / FBX models, textures, scene files     | `3d-assets`         |

> 3D Asset uses **chunked upload** for large files (50MB+) and **versioned buckets** for asset history.

---

## Project Details

### 1. Realtime AI Whiteboard

A collaborative whiteboard with AI assistance — think Miro + ChatGPT, fully local.

| Layer        | Tech                         |
| ------------ | ---------------------------- |
| Web          | React                        |
| Mobile       | React Native (iOS + Android) |
| Backend      | Node.js (NestJS)             |
| Realtime     | WebSocket (Socket.IO)        |
| State Sync   | Yjs (CRDT)                   |
| DB           | PostgreSQL                   |
| Cache/Queue  | Redis (Pub/Sub + Stream)     |
| Storage      | MinIO                        |
| Auth         | JWT + Anonymous Guest        |
| AI           | Ollama + LangChain           |

**Key technical decisions:**

| Challenge                  | Solution                                        |
| -------------------------- | ----------------------------------------------- |
| Multi-user editing conflicts | CRDT (Yjs) — conflict-free, no central lock    |
| Scale to multiple servers  | Redis Pub/Sub bridges WebSocket instances        |
| AI without cloud API costs | Ollama runs LLM locally, Redis Stream for queue  |
| One codebase, two platforms| React + React Native shared business logic       |

---

### 2. Enterprise Workflow System

An approval and task management system with role-based access — think Jira + custom workflow engine.

| Layer           | Tech                                     |
| --------------- | ---------------------------------------- |
| Web             | Vue 3 + Pinia + Element Plus             |
| Mobile          | Kotlin (Android) + Swift (iOS) + WebView |
| Backend         | Kotlin + Spring Boot                     |
| Workflow Engine | Temporal                                  |
| Event Streaming | Kafka (KRaft)                             |
| DB              | PostgreSQL                               |
| Cache           | Redis                                    |
| Storage         | MinIO                                    |
| Auth            | Keycloak (OAuth2/OIDC + SSO + RBAC)     |

**Key technical decisions:**

| Challenge                    | Solution                                       |
| ---------------------------- | ---------------------------------------------- |
| Complex multi-step approvals | Temporal — durable workflow with retry/timeout  |
| Enterprise-grade permissions | Keycloak RBAC (Admin / Manager / Employee)      |
| Audit compliance             | Kafka event sourcing — immutable audit log with exactly-once guarantee |
| Async notifications          | Kafka consumer groups — horizontal scaling of notification workers |
| Native + Web with shared UI  | WebView for shared screens, native for platform features |

---

### 3. 3D Asset Collaboration (Digital Twin + AIoT)

A platform for managing 3D assets with real-time IoT data overlay — think Figma for 3D + IoT dashboard.

| Layer           | Tech                         |
| --------------- | ---------------------------- |
| Web             | React + Three.js             |
| Client          | Unity (C#)                   |
| Backend         | ASP.NET Core                 |
| Realtime        | SignalR                      |
| IoT Broker      | MQTT (Mosquitto)             |
| Event Streaming | Kafka (via MQTT → Kafka bridge) |
| DB              | PostgreSQL                   |
| Cache           | Redis (Pub/Sub)              |
| Storage         | MinIO (versioned)            |
| Auth            | API Key + JWT + Resource ACL |
| AI (opt)        | Python + ONNX Runtime        |

**Key technical decisions:**

| Challenge                      | Solution                                        |
| ------------------------------ | ----------------------------------------------- |
| Large 3D files (50MB+)        | Chunked multipart upload + versioned MinIO       |
| IoT sensor data ingestion     | MQTT (Mosquitto) → Kafka bridge → consumer processing |
| IoT data ordering             | Kafka partitioning by `device_id` — ordered per device, parallel across devices |
| Browser 3D preview            | Three.js renders GLB/FBX without Unity install   |
| Unity ↔ Web state sync        | SignalR + Redis Pub/Sub as shared message bus     |
| Device auth (no browser)      | API Key for M2M, JWT for web users               |
| Asset state tracking          | Kafka compacted topic as materialized view of current asset state |

---

## Observability (Production Knowledge)

Not part of local Docker setup, but each project uses structured logging for debuggability.

| Project    | Logging Library | Format |
| ---------- | --------------- | ------ |
| Whiteboard | Pino (Node.js)  | Structured JSON |
| Workflow   | Logback (Kotlin)| Structured JSON |
| 3D Asset   | Serilog (.NET)  | Structured JSON |

> In production, these would feed into Prometheus + Grafana (metrics) and OpenTelemetry + Jaeger (tracing). Not included in local setup to keep the focus on application code.

---

## API Design Strategy

Each project uses a different API style to demonstrate breadth.

| Project    | API Style         | Why                                            |
| ---------- | ----------------- | ---------------------------------------------- |
| Whiteboard | REST + WebSocket  | Simple CRUD + realtime — no over-engineering   |
| Workflow   | GraphQL           | Complex relational queries (approvals, roles)  |
| 3D Asset   | gRPC + REST       | gRPC streaming for large file transfer, REST for web |

<details>
<summary>Details per project</summary>

**Whiteboard** — REST for CRUD, WebSocket for realtime:
```
GET  /api/boards/:id        → fetch board
POST /api/boards             → create board
WS   /ws/board/:id          → realtime cursor + drawing sync
```

**Workflow** — GraphQL for flexible queries:
```graphql
query {
  workflow(id: "...") {
    steps { assignee { name, role } status }
    attachments { url, uploadedAt }
  }
}
```

**3D Asset** — gRPC for streaming, REST for web:
```
gRPC  AssetService.Upload    → chunked bidirectional stream
gRPC  AssetService.Download  → server-side stream
REST  GET /api/assets/:id    → metadata + presigned URL
```

</details>

---

## Resilience Patterns

| Pattern              | Tech                        | Project    |
| -------------------- | --------------------------- | ---------- |
| Circuit Breaker      | Resilience4j (Spring Boot)  | Workflow   |
| Retry + Exp. Backoff | Polly (.NET)                | 3D Asset   |
| Retry + Backoff      | NestJS built-in / axios-retry | Whiteboard |
| Graceful Degradation | AI offline fallback         | Whiteboard |
| Timeout / Deadline   | Temporal activity timeout   | Workflow   |
| Bulkhead             | Resilience4j                | Workflow   |

> Whiteboard: if Ollama is down, AI features gracefully degrade — users can still draw and collaborate.

---

## Testing Strategy

| Layer       | Tool                  | Project    | What It Tests                     |
| ----------- | --------------------- | ---------- | --------------------------------- |
| Unit        | Jest                  | Whiteboard | Services, utils, pure functions   |
| Unit        | JUnit 5               | Workflow   | Services, domain logic            |
| Unit        | xUnit                 | 3D Asset   | Services, domain logic            |
| Integration | Testcontainers        | Workflow   | DB queries, Temporal workflows    |
| E2E         | Playwright            | Whiteboard | Multi-user realtime collaboration |
| Load        | k6                    | 3D Asset   | Large file upload stress test     |
| API         | Supertest             | Whiteboard | REST endpoint contracts           |
| API         | REST Assured          | Workflow   | GraphQL query validation          |

> Staff-level interview signal: "How do you decide what to test and at what layer?"

---

## Security & Compliance

Demonstrates understanding of SOC 2 / ISO 27001 controls without formal certification.

### OWASP Top 10 Coverage

| Risk                  | Mitigation                                | Project    |
| --------------------- | ----------------------------------------- | ---------- |
| Injection (SQL/NoSQL) | Parameterized queries, ORM (TypeORM / Exposed / EF Core) | All |
| Broken Auth           | Keycloak (OAuth2), JWT validation, token expiry | All |
| Sensitive Data Exposure | TLS in transit, MinIO encryption at rest | All |
| XXE                   | Disable external entity parsing           | Workflow   |
| Broken Access Control | RBAC (Keycloak), Resource ACL             | Workflow, 3D Asset |
| Security Misconfiguration | Hardened Docker images, no default passwords | All |
| XSS                   | React/Vue auto-escaping, CSP headers      | All        |
| Insecure Deserialization | Input validation, DTO schemas           | All        |

### SOC 2 / ISO 27001 Aligned Controls

| Control                | Implementation                             | Project    |
| ---------------------- | ------------------------------------------ | ---------- |
| Audit Log              | All operations logged: who / what / when   | Workflow   |
| Encryption at rest     | MinIO server-side encryption (SSE-S3)      | 3D Asset   |
| Encryption in transit  | TLS everywhere (HTTPS, WSS, gRPCs)        | All        |
| RBAC / Least privilege | Keycloak role mapping, resource-level ACL  | Workflow, 3D Asset |
| Input validation       | DTO validation at API boundary             | All        |
| Secret management      | `.env` + Docker secrets (no hardcoded secrets) | All    |
| Data retention policy  | Auto-cleanup old asset versions            | 3D Asset   |
| Incident response      | Structured logging + Grafana alerts        | All        |

> Staff-level interview signal: "How do you approach security in your systems?"

---

## Database Patterns

| Pattern              | Tech / Approach                          | Project    |
| -------------------- | ---------------------------------------- | ---------- |
| Migration            | TypeORM migrations                       | Whiteboard |
| Migration            | Flyway                                   | Workflow   |
| Migration            | EF Core migrations                       | 3D Asset   |
| Indexing strategy     | Composite indexes on hot query paths     | All        |
| Query optimization   | EXPLAIN ANALYZE, N+1 detection           | All        |
| Connection pooling   | HikariCP / Npgsql / pg pool              | All        |
| Soft delete          | `deleted_at` timestamp                   | Workflow   |
| Optimistic locking   | Version column for concurrent edits      | 3D Asset   |

---

## Caching Strategy

| Pattern           | Implementation                        | Project    |
| ----------------- | ------------------------------------- | ---------- |
| Cache-aside       | Redis GET → miss → DB → SET           | All        |
| Write-through     | Update DB + Redis in same transaction | Workflow   |
| Cache invalidation | Event-driven invalidation via Redis Pub/Sub | Whiteboard |
| TTL-based expiry  | Short TTL for volatile data           | All        |
| Session cache     | Redis for JWT session metadata        | Workflow   |

---

## Architecture Decision Records (ADR)

Each major technical choice is documented as an ADR in project docs.

| ADR | Decision | Project |
| --- | -------- | ------- |
| ADR-001 | Why Temporal over Bull for workflow engine | Workflow |
| ADR-002 | Why gRPC for 3D asset transfer | 3D Asset |
| ADR-003 | Why Keycloak over Auth0 for enterprise auth | Workflow |
| ADR-004 | Why Yjs (CRDT) over OT for collaborative editing | Whiteboard |
| ADR-005 | Why MQTT over WebSocket for IoT ingestion | 3D Asset |
| ADR-006 | Why GraphQL over REST for workflow queries | Workflow |

> ADR format: Context → Decision → Consequences. Stored in each project's `docs/` folder.

---

## Performance

| Concern              | Approach                                  | Project    |
| -------------------- | ----------------------------------------- | ---------- |
| N+1 query detection  | DataLoader (GraphQL), eager loading       | Workflow   |
| Connection pooling   | HikariCP / Npgsql / pg pool              | All        |
| Throttling           | Cursor sync throttled to 60fps max       | Whiteboard |
| Lazy loading         | Three.js progressive LOD for 3D models   | 3D Asset   |
| Bundle size          | Code splitting, tree shaking             | All (web)  |
| Image optimization   | Sharp (Node.js) for thumbnail generation | Whiteboard |
| Profiling            | Clinic.js / async-profiler / dotnet-trace | Per runtime |

---

## Tech Diversity Overview

| Dimension         | Whiteboard         | Workflow              | 3D Asset             |
| ----------------- | ------------------ | --------------------- | -------------------- |
| Language (BE)     | TypeScript         | Kotlin                | C#                   |
| Language (FE)     | TypeScript (React) | TypeScript (Vue 3)    | TypeScript (React)   |
| Language (Mobile) | TypeScript (RN)    | Kotlin + Swift        | C# (Unity)           |
| API Style         | REST + WebSocket   | GraphQL               | gRPC + REST          |
| Auth              | JWT + Guest        | Keycloak OAuth2/SSO   | API Key + JWT + ACL  |
| Realtime          | Socket.IO + CRDT   | Temporal              | SignalR + MQTT       |
| Messaging         | Redis Stream       | Kafka                 | MQTT → Kafka         |
| Feature Flags     | Unleash            | Unleash + Admin UI    | Unleash              |
| Remote Config     | Theme + AI toggle  | White-label branding  | Unity scene defaults |
| Analytics         | Kafka events       | Kafka events + Admin  | Kafka events         |
| Resilience        | Retry + Graceful   | Circuit Breaker + Bulkhead | Retry + Backoff |
| Testing           | Jest + Playwright  | JUnit + Testcontainers | xUnit + k6           |
| Logging           | Pino               | Logback               | Serilog              |
| DB Migration      | TypeORM            | Flyway                | EF Core              |

> Every dimension uses a different approach across the three projects — maximum breadth for portfolio demonstration.
