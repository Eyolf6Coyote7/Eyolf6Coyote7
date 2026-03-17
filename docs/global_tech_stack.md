# Global Tech Stack

> All infrastructure runs **locally** — no cloud services. Docker Compose for orchestration.

---

## At a Glance

Three full-stack projects, each with a different tech stack, sharing the same local infrastructure.

| Dimension     | Whiteboard             | Workflow                | 3D Asset              |
| ------------- | ---------------------- | ----------------------- | --------------------- |
| **Frontend**  | React                  | Vue 3                   | React + Three.js      |
| **Mobile**    | React Native           | Kotlin + Swift + WebView| Unity (C#)            |
| **Backend**   | Node.js (NestJS)       | Kotlin (Spring Boot)    | ASP.NET Core          |
| **Realtime**  | Socket.IO + Yjs (CRDT) | Temporal                | SignalR + MQTT        |
| **Auth**      | JWT + Guest            | Keycloak (OAuth2 / SSO) | API Key + JWT + ACL   |
| **Storage**   | MinIO                  | MinIO                   | MinIO (versioned)     |
| **AI**        | Ollama + LangChain     | —                       | ONNX Runtime (opt)    |

---

## Shared Infrastructure

All three projects connect to the same local services via Docker Compose.

| Service        | Tech                      | What It Does                             |
| -------------- | ------------------------- | ---------------------------------------- |
| Database       | PostgreSQL                | Relational data for all projects         |
| Cache / Queue  | Redis                     | Caching, Pub/Sub, Stream (task queue)    |
| Object Storage | MinIO (S3-compatible)     | File upload / download for all projects  |
| Identity       | Keycloak                  | OAuth2 / OIDC provider (Workflow project)|
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
| DB              | PostgreSQL                               |
| Cache/Queue     | Redis (Cache + Stream)                   |
| Storage         | MinIO                                    |
| Auth            | Keycloak (OAuth2/OIDC + SSO + RBAC)     |

**Key technical decisions:**

| Challenge                    | Solution                                       |
| ---------------------------- | ---------------------------------------------- |
| Complex multi-step approvals | Temporal — durable workflow with retry/timeout  |
| Enterprise-grade permissions | Keycloak RBAC (Admin / Manager / Employee)      |
| Audit compliance             | Every action logged to DB with timestamp + actor|
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
| DB              | PostgreSQL                   |
| Cache/Sync      | Redis (Pub/Sub + Stream)     |
| Storage         | MinIO (versioned)            |
| Auth            | API Key + JWT + Resource ACL |
| IoT             | MQTT (Mosquitto)             |
| Streaming (opt) | Redis Stream (or Kafka)      |
| AI (opt)        | Python + ONNX Runtime        |

**Key technical decisions:**

| Challenge                      | Solution                                        |
| ------------------------------ | ----------------------------------------------- |
| Large 3D files (50MB+)        | Chunked multipart upload + versioned MinIO       |
| IoT sensor data ingestion     | MQTT (Mosquitto) → Redis Stream → Backend        |
| Browser 3D preview            | Three.js renders GLB/FBX without Unity install   |
| Unity ↔ Web state sync        | SignalR + Redis Pub/Sub as shared message bus     |
| Device auth (no browser)      | API Key for M2M, JWT for web users               |
