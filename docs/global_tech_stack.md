# Global Tech Stack

> All infrastructure runs **locally** — no cloud services. Docker Compose for orchestration.

---

## Shared Infrastructure (All Projects)

| Layer          | Tech                          | Purpose                      |
| -------------- | ----------------------------- | ---------------------------- |
| Database       | PostgreSQL                    | Primary relational DB        |
| Cache / Queue  | Redis                         | Cache, Pub/Sub, Stream       |
| Object Storage | MinIO (S3-compatible)         | File upload/download, assets |
| Container      | Docker Compose                | Local orchestration          |

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
| File Storage  | MinIO              | MinIO                 | MinIO (versioned)   |
| AI            | Ollama + LangChain | —                     | ONNX Runtime (opt)  |
