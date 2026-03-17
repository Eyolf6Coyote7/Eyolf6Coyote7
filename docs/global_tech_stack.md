# Global Tech Stack

> All infrastructure runs **locally** — no cloud services. Docker Compose for orchestration.

---

## Shared Infrastructure (All Projects)

| Layer          | Tech                          | Purpose                      |
| -------------- | ----------------------------- | ---------------------------- |
| Database       | PostgreSQL                    | Primary relational DB        |
| Cache / Queue  | Redis                         | Cache, Pub/Sub, Stream       |
| Object Storage | MinIO (S3-compatible)         | File upload/download, assets |
| Identity       | Keycloak (OAuth2 / OIDC)      | SSO, used by Workflow project |
| Container      | Docker Compose                | Local orchestration          |

### Authentication (Per-Project Strategy)

Each project demonstrates a different auth pattern to showcase breadth:

| Project      | Auth Method                    | Showcase Focus                          |
| ------------ | ------------------------------ | --------------------------------------- |
| Whiteboard   | JWT + Anonymous Guest          | Anonymous/authenticated hybrid access   |
| Workflow     | Keycloak (OAuth2/OIDC + SSO)  | Enterprise SSO + RBAC                   |
| 3D Asset     | API Key + JWT + Resource ACL   | M2M auth + asset-level permissions      |

**Whiteboard** — Fast entry, no forced login:
```
Registered user: Email/Password → Backend issues JWT
Guest mode:      Anonymous token (read-only, limited features)
```

**Workflow** — Enterprise-grade SSO via Keycloak (Docker):
```
Keycloak (Identity Provider)
├─ OAuth2 Authorization Code Flow
├─ RBAC roles: Admin / Manager / Employee
├─ Spring Security integration
└─ Simulates corporate SSO locally
```

**3D Asset** — Mixed client types (browser + IoT + Unity):
```
API Key:  IoT devices / Unity client (M2M authentication)
JWT:      Web user login
Role:     Owner / Editor / Viewer (resource-level ACL per asset)
```

### File Upload/Download (Shared Pattern)

All three projects use MinIO for file storage with a consistent pattern:

```
Client → multipart upload → Backend API → MinIO bucket
Client ← presigned URL    ← Backend API ← MinIO bucket
```

| Project      | Upload Types                        | Bucket Strategy              |
| ------------ | ----------------------------------- | ---------------------------- |
| Whiteboard   | Images, exported PNG/PDF            | `whiteboard-assets`          |
| Workflow      | Form attachments, approval docs, reports | `workflow-documents`    |
| 3D Asset     | GLB/FBX models, textures, scenes    | `3d-assets` (versioned)      |

---

## 1. Realtime AI Whiteboard

### Tech Stack

| Layer        | Tech                              |
| ------------ | --------------------------------- |
| Web          | React                             |
| Mobile       | React Native (iOS + Android)      |
| Backend      | Node.js (NestJS)                  |
| Realtime     | WebSocket (Socket.IO)             |
| State Sync   | Yjs (CRDT)                        |
| DB           | PostgreSQL                         |
| Cache/Queue  | Redis (Pub/Sub + Stream)          |
| Storage      | MinIO (images, exports)           |
| Auth         | JWT + Anonymous Guest             |
| AI           | Ollama + LangChain                |

### Core Tech Highlights

- **Realtime Collaboration**: CRDT (Yjs) for conflict-free editing
- **Multi-node Sync**: WebSocket + Redis Pub/Sub
- **AI Integration**: Local LLM (Ollama) + task queue (Redis Stream)
- **Cross-platform**: React + React Native shared logic
- **File Handling**: Image import to canvas, export whiteboard as PNG/PDF via MinIO

---

## 2. Enterprise Workflow System

### Tech Stack

| Layer           | Tech                                      |
| --------------- | ----------------------------------------- |
| Web             | Vue 3 + Pinia + Element Plus              |
| Mobile          | Kotlin (Android) + Swift (iOS) + WebView  |
| Backend         | Kotlin + Spring Boot                      |
| Workflow Engine | Temporal                                   |
| DB              | PostgreSQL                                 |
| Cache/Queue     | Redis (Cache + Stream)                    |
| Storage         | MinIO (attachments, documents)            |
| Auth            | Keycloak (OAuth2/OIDC + SSO + RBAC)      |

### Core Tech Highlights

- **Permission System**: RBAC (Role-Based Access Control)
- **Workflow Engine**: Temporal (state machine + task orchestration)
- **Cross-platform**: WebView shared frontend UI
- **Audit & Tracking**: Audit log + workflow tracing (DB)
- **File Handling**: Form attachments, approval documents upload/download, report export via MinIO

---

## 3. 3D Asset Collaboration (Digital Twin + AIoT)

### Tech Stack

| Layer            | Tech                          |
| ---------------- | ----------------------------- |
| Web              | React + Three.js              |
| Client           | Unity (C#)                    |
| Backend          | ASP.NET Core                  |
| Realtime         | SignalR                       |
| DB               | PostgreSQL                     |
| Cache/Sync       | Redis (Pub/Sub + Stream)      |
| Storage          | MinIO (3D assets, versioned)  |
| Auth             | API Key + JWT + Resource ACL  |
| IoT              | MQTT (Mosquitto)              |
| Streaming (opt)  | Redis Stream (or Kafka)       |
| AI (opt)         | Python + ONNX Runtime         |

### Core Tech Highlights

- **Digital Twin**: 3D model + realtime IoT data mapping
- **Realtime Sync**: SignalR + Redis Pub/Sub
- **Asset Management**: 3D file version control (MinIO), chunked upload for large models
- **IoT Pipeline**: MQTT → Stream → Backend
- **Cross-platform Sync**: Unity + Web shared state
- **File Handling**: GLB/FBX upload (chunked/multipart), texture management, presigned URL download, browser 3D preview (Three.js)

---

## Tech Diversity Overview

| Dimension     | Whiteboard         | Workflow              | 3D Asset            |
| ------------- | ------------------ | --------------------- | ------------------- |
| Frontend      | React              | Vue 3                 | React + Three.js    |
| Mobile/Client | React Native       | Kotlin + Swift        | Unity (C#)          |
| Backend       | Node.js (NestJS)   | Kotlin (Spring Boot)  | ASP.NET Core        |
| Realtime      | Socket.IO + Yjs    | Temporal              | SignalR + MQTT       |
| Auth          | JWT + Guest        | Keycloak (OAuth2/SSO) | API Key + JWT + ACL |
| File Storage  | MinIO              | MinIO                 | MinIO (versioned)   |
| AI            | Ollama + LangChain | —                     | ONNX Runtime (opt)  |
