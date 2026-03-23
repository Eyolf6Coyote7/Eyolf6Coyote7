# System Architecture: Realtime AI Whiteboard

## Table of Contents

- [Architecture Pattern](#architecture-pattern)
- [C4 Model](#c4-model)
  - [Level 1: System Context](#level-1-system-context)
  - [Level 2: Container Diagram](#level-2-container-diagram)
  - [Level 3: Component Diagram (BFF + API)](#level-3-component-diagram-bff-api)
  - [Level 3: Component Diagram (AI Service)](#level-3-component-diagram-ai-service)
  - [Level 3: Component Diagram (Web App — React)](#level-3-component-diagram-web-app-react)
  - [Level 3: Component Diagram (Mobile App — React Native)](#level-3-component-diagram-mobile-app-react-native)
- [Component Overview](#component-overview)
- [Data Flow (Sequence Diagrams)](#data-flow-sequence-diagrams)
  - [Flow 1: Create Board and Start Collaborating](#flow-1-create-board-and-start-collaborating)
  - [Flow 2: AI Content Generation](#flow-2-ai-content-generation)
  - [Flow 3: Guest Access](#flow-3-guest-access)
  - [Flow 4: Offline → Online Sync](#flow-4-offline-online-sync)
- [API Contracts (High-level)](#api-contracts-high-level)
- [Database Schema (High-level)](#database-schema-high-level)
- [Deployment Diagram](#deployment-diagram)
- [Security Architecture](#security-architecture)
- [Infrastructure Dependencies](#infrastructure-dependencies)
- [Scalability Considerations](#scalability-considerations)
- [ADRs Created](#adrs-created)

---

## Architecture Pattern

**Modular Monolith + BFF** — a single NestJS backend organized by feature modules, with a BFF layer that serves different API surfaces for Web and Mobile clients. AI runs as a separate service (LangGraph) consuming from Redis Stream.

## C4 Model

### Level 1: System Context

```mermaid
graph TD
  U_WEB[Web User<br/>Browser] --> SYS[Realtime AI Whiteboard]
  U_MOB[Mobile User<br/>iOS / Android] --> SYS
  U_GUEST[Guest User<br/>Anonymous] --> SYS
  SYS --> OLLAMA[Ollama<br/>Local LLM]
  SYS --> INFRA[Shared Infrastructure<br/>PostgreSQL, Redis, MinIO, etc.]
```

### Level 2: Container Diagram

```mermaid
graph TD
  subgraph "Frontend"
    WEB[Web App<br/>React + Vite]
    MOB[Mobile App<br/>React Native + Expo]
  end

  subgraph "Backend"
    BFF[BFF + API<br/>NestJS]
    AIS[AI Service<br/>LangGraph + LangChain]
  end

  subgraph "AI"
    OLLAMA[Ollama<br/>Quantized LLM]
    CHROMA[(ChromaDB<br/>Vector DB)]
    LF[Langfuse<br/>LLM Observability]
  end

  subgraph "Infrastructure"
    PG[(PostgreSQL<br/>schema-per-tenant)]
    RD[(Redis<br/>Cache + Pub/Sub + Stream)]
    MIO[(MinIO<br/>File Storage)]
    UL[Unleash<br/>Feature Flags]
    KF[(Kafka<br/>Analytics Events)]
  end

  WEB -->|REST + WebSocket| BFF
  MOB -->|REST + WebSocket| BFF
  BFF --> PG
  BFF --> RD
  BFF --> MIO
  BFF --> UL
  BFF -->|enqueue AI task| RD
  BFF -->|analytics events| KF
  AIS -->|consume Redis Stream| RD
  AIS --> OLLAMA
  AIS --> CHROMA
  AIS --> LF
  AIS -->|MCP tools + store result| BFF
```

### Level 3: Component Diagram (BFF + API)

```mermaid
graph TD
  subgraph "BFF + API (NestJS)"
    AUTH[Auth Module<br/>JWT + Guest Token]
    BOARD[Board Module<br/>CRUD + Templates]
    COLLAB[Collaboration Module<br/>WebSocket + Yjs Provider]
    STORAGE[Storage Module<br/>MinIO Presigned URLs]
    AI_GW[AI Gateway Module<br/>Enqueue to Redis Stream]
    TENANT[Tenant Module<br/>Schema switching]
    EXPORT[Export Module<br/>PNG / PDF generation]
    USER[User Module<br/>Profile + Settings]
    ANALYTICS[Analytics Module<br/>Kafka Producer]
    BFF_WEB[BFF — Web<br/>Web-optimized responses]
    BFF_MOB[BFF — Mobile<br/>Mobile-optimized responses]
  end

  BFF_WEB --> AUTH
  BFF_WEB --> BOARD
  BFF_MOB --> AUTH
  BFF_MOB --> BOARD
  BOARD --> COLLAB
  BOARD --> STORAGE
  BOARD --> TENANT
  BOARD --> ANALYTICS
  AI_GW --> ANALYTICS
```

### Level 3: Component Diagram (AI Service)

```mermaid
graph TD
  subgraph "AI Service (LangGraph)"
    IC[Intent Classifier]
    PLAN[Planner<br/>ReAct Pattern]
    RAG[RAG Assembler]
    MCP[MCP Server<br/>User + Data + Task Tools]
    REFLECT[Reflector<br/>Quality Check]
    STREAM[SSE Streamer]
  end

  IC --> PLAN
  PLAN -->|info retrieval| RAG
  PLAN -->|action needed| MCP
  RAG -->|embed query| EMB[Embedding Model]
  EMB --> VDB[(ChromaDB)]
  RAG --> LLM[Ollama]
  MCP -->|call backend| API[BFF API]
  LLM --> REFLECT
  REFLECT -->|retry| PLAN
  REFLECT -->|done| STREAM
  STREAM -->|SSE| CLIENT[Web / Mobile]
```

### Level 3: Component Diagram (Web App — React)

```mermaid
graph TD
  subgraph "Web App (React + Vite)"
    ROUTER[React Router<br/>Pages + Layouts]
    STORE[Zustand Store<br/>boards, user, ui, ai]
    CANVAS[Canvas Module<br/>Fabric.js or Konva]
    YJS_CLIENT[Yjs Client<br/>CRDT sync + offline]
    WS_CLIENT[WebSocket Client<br/>Socket.IO]
    AI_PANEL[AI Chat Panel<br/>SSE consumer]
    API_CLIENT[API Client<br/>Real / Mock switching]
    I18N[i18n<br/>react-i18next]
    THEME[Theme Provider<br/>Design tokens + dark mode]
  end

  ROUTER --> STORE
  ROUTER --> CANVAS
  ROUTER --> AI_PANEL
  CANVAS --> YJS_CLIENT
  YJS_CLIENT --> WS_CLIENT
  AI_PANEL --> API_CLIENT
  API_CLIENT -->|REST| BFF[BFF + API]
  WS_CLIENT -->|WebSocket| BFF
  AI_PANEL -->|SSE| BFF
```

#### Web App — Key Modules

| Module | Responsibility | Key Libraries |
|--------|---------------|---------------|
| Router | Page routing, layout, auth guards | React Router v6 |
| Store | Global state (boards, user, UI, AI chat) | Zustand |
| Canvas | Drawing surface, element rendering, selection | Fabric.js or Konva |
| Yjs Client | CRDT document, offline persistence, sync | Yjs, y-websocket, y-indexeddb |
| WebSocket Client | Connection management, reconnect, presence | Socket.IO client |
| AI Chat Panel | Prompt input, SSE stream consumer, tool results | EventSource API |
| API Client | REST calls, real/mock switching by env | Axios + API Layer pattern |
| i18n | Multi-language (en, zh-TW) | react-i18next |
| Theme | Design tokens, dark mode toggle, CSS variables | CSS custom properties |

#### Web App — Route Structure

| Route | Page | Auth |
|-------|------|------|
| `/` | Landing Page | Public |
| `/auth` | Login / Sign Up | Public |
| `/dashboard` | Board Grid | JWT |
| `/board/:id` | Canvas + AI Panel | JWT / Guest |
| `/board/:id/settings` | Board Settings | JWT (owner) |
| `/settings` | Account Settings | JWT |
| `/pricing` | Plan Comparison | Public |

### Level 3: Component Diagram (Mobile App — React Native)

```mermaid
graph TD
  subgraph "Mobile App (React Native + Expo)"
    NAV[React Navigation<br/>Tab + Stack]
    STORE_M[Zustand Store<br/>boards, user, ui]
    CANVAS_M[Canvas Module<br/>react-native-canvas / Skia]
    YJS_M[Yjs Client<br/>CRDT + AsyncStorage]
    WS_M[WebSocket Client<br/>Socket.IO]
    AI_M[AI Chat Screen<br/>Full-screen overlay]
    API_M[API Client<br/>Mobile BFF endpoints]
    PUSH[Push Notifications<br/>Expo Notifications]
    OFFLINE[Offline Manager<br/>NetInfo + queue]
    I18N_M[i18n<br/>react-i18next]
  end

  NAV --> STORE_M
  NAV --> CANVAS_M
  NAV --> AI_M
  CANVAS_M --> YJS_M
  YJS_M --> WS_M
  AI_M --> API_M
  API_M -->|REST| BFF[BFF + API]
  AI_M -->|SSE| BFF
  WS_M -->|WebSocket| BFF
  PUSH -->|FCM / APNs| CLOUD[Push Service]
  OFFLINE --> API_M
```

#### Mobile App — Key Modules

| Module | Responsibility | Key Libraries |
|--------|---------------|---------------|
| Navigation | Tab bar + stack navigation | React Navigation v6 |
| Store | Global state (shared with web via Zustand) | Zustand |
| Canvas | Touch drawing, pinch zoom, pan | react-native-canvas or Skia |
| Yjs Client | CRDT sync, offline persistence via AsyncStorage | Yjs, y-websocket, y-async-storage |
| WebSocket Client | Connection, auto-reconnect | Socket.IO client |
| AI Chat | Full-screen chat overlay | Custom screen |
| API Client | Mobile BFF REST calls | Axios |
| Push | Register device token, handle notifications | Expo Notifications |
| Offline Manager | Detect network state, queue actions | @react-native-community/netinfo |
| i18n | Multi-language | react-i18next (shared config with web) |

#### Mobile App — Navigation Structure

| Tab | Stack Screens | Auth |
|-----|--------------|------|
| Home | Board List → Board Canvas | JWT |
| Search | Search → Board Canvas | JWT |
| Create | New Board → Board Canvas | JWT |
| Settings | Account, Profile | JWT |
| (Overlay) | AI Chat (full screen) | JWT |

## Component Overview

| Component | Tech | System | Responsibility |
|-----------|------|--------|---------------|
| Web App | React + Vite + Zustand | Frontend | Canvas UI, toolbar, AI chat panel |
| Mobile App | React Native + Expo | Frontend | Mobile canvas, touch controls, offline |
| BFF + API | NestJS (TypeScript) | Backend | REST/WS API, auth, CRUD, BFF layer |
| Collaboration | Yjs + y-websocket | Backend | CRDT sync, cursor presence |
| AI Service | LangGraph + LangChain | AI Worker | Agent state machine, RAG, MCP tools |
| Ollama | Ollama server | AI Runtime | Local LLM inference |
| ChromaDB | ChromaDB | AI Storage | Vector embeddings for RAG |
| Langfuse | Langfuse server | AI Observability | LLM trace logging |

## Data Flow (Sequence Diagrams)

### Flow 1: Create Board and Start Collaborating

```mermaid
sequenceDiagram
  actor Alex as Alex (PM)
  participant Web as Web App
  participant BFF as BFF + API
  participant PG as PostgreSQL
  participant YJS as Yjs Provider
  participant WS as WebSocket

  Alex->>Web: Click "New Board"
  Web->>BFF: POST /api/web/boards {title, template}
  BFF->>PG: INSERT INTO boards
  PG-->>BFF: board_id
  BFF-->>Web: {board_id, url}
  Web->>WS: Connect WebSocket /ws/board/:id
  WS->>YJS: Init Yjs document
  YJS-->>WS: Yjs state
  WS-->>Web: Yjs sync complete
  Alex->>Web: Shares link with team
  
  actor Sam as Sam (Designer)
  Sam->>Web: Opens board link
  Web->>WS: Connect WebSocket
  WS->>YJS: Join Yjs room
  YJS-->>WS: Full state sync
  WS-->>Web: See Alex's content + cursor
```

### Flow 2: AI Content Generation

```mermaid
sequenceDiagram
  actor User
  participant Web as Web App
  participant BFF as BFF + API
  participant RD as Redis Stream
  participant AIS as AI Service
  participant LLM as Ollama
  participant CHR as ChromaDB
  participant LF as Langfuse

  User->>Web: Type "create user flow for checkout"
  Web->>BFF: POST /api/web/ai/prompt {board_id, prompt}
  BFF->>RD: XADD ai-tasks {board_id, prompt, user_id}
  BFF-->>Web: 202 Accepted {task_id}
  
  AIS->>RD: XREAD ai-tasks (consume)
  AIS->>AIS: Intent Classifier → "action"
  AIS->>AIS: Planner (ReAct) → plan steps
  AIS->>CHR: Embed query → search board context
  CHR-->>AIS: Relevant board content
  AIS->>LLM: Augmented prompt (RAG context + plan)
  LLM-->>AIS: Generated content
  AIS->>AIS: Reflect → quality OK
  AIS->>LF: Log trace (latency, tokens)
  AIS->>BFF: MCP Task Tool → create shapes on board
  BFF->>Web: SSE stream token-by-token
  Web->>User: AI response appears + shapes on canvas
```

### Flow 3: Guest Access

```mermaid
sequenceDiagram
  actor Owner
  actor Guest
  participant Web as Web App
  participant BFF as BFF + API
  participant UL as Unleash

  Owner->>Web: Click "Share" → generate guest link
  Web->>BFF: POST /api/web/boards/:id/share
  BFF->>BFF: Generate guest token (anonymous JWT)
  BFF-->>Web: {guest_url, token}
  
  Guest->>Web: Open guest_url
  Web->>BFF: GET /api/web/boards/:id (with guest token)
  BFF->>UL: Check feature flag "guest-mode"
  UL-->>BFF: enabled
  BFF-->>Web: Board data (read-only or editable based on owner setting)
  Guest->>Web: View board (or edit if allowed)
```

### Flow 4: Offline → Online Sync

```mermaid
sequenceDiagram
  actor User
  participant App as Mobile App
  participant YJS as Yjs (local)
  participant WS as WebSocket
  participant Server as Yjs Provider

  User->>App: Edit board (online)
  App->>WS: Yjs sync (realtime)
  
  Note over App,WS: Network disconnects
  
  User->>App: Continue editing (offline)
  App->>YJS: Store changes in local Yjs document
  
  Note over App,WS: Network reconnects
  
  App->>WS: Reconnect WebSocket
  WS->>Server: Yjs sync protocol
  Server->>YJS: Exchange state vectors
  YJS->>YJS: CRDT merge (conflict-free)
  Server-->>App: Merged state
  App->>User: All changes preserved, no conflicts
```

## API Contracts (High-level)

| Endpoint | Protocol | Direction | Description |
|----------|----------|-----------|-------------|
| `POST /api/web/boards` | REST | Client → Server | Create board |
| `GET /api/web/boards/:id` | REST | Client → Server | Get board data |
| `POST /api/web/ai/prompt` | REST | Client → Server | Submit AI prompt |
| `GET /api/web/ai/stream/:taskId` | SSE | Server → Client | Stream AI response |
| `/ws/board/:id` | WebSocket | Bidirectional | Yjs CRDT sync + cursor presence |
| `POST /api/mobile/boards` | REST | Client → Server | Create board (mobile-optimized) |
| `POST /api/web/boards/:id/share` | REST | Client → Server | Generate guest link |
| `GET /api/web/boards/:id/export` | REST | Client → Server | Export as PNG/PDF |
| `analytics.whiteboard-events` | Kafka topic | Producer → Consumer | User behavior events |

## Database Schema (High-level)

```mermaid
erDiagram
  TENANT ||--o{ USER : has
  TENANT ||--o{ BOARD : owns
  USER ||--o{ BOARD : creates
  BOARD ||--o{ BOARD_ELEMENT : contains
  BOARD ||--o{ BOARD_COLLABORATOR : has
  BOARD ||--|| YJS_STATE : syncs
  USER ||--o{ AI_CONVERSATION : has
  AI_CONVERSATION ||--o{ AI_MESSAGE : contains
  
  TENANT {
    uuid id PK
    string name
    string schema_name
    string plan "free|pro"
  }
  USER {
    uuid id PK
    string email
    string display_name
    string role "owner|member|guest"
  }
  BOARD {
    uuid id PK
    uuid owner_id FK
    string title
    string template
    boolean guest_editable
    string guest_token
    timestamp created_at
  }
```

## Deployment Diagram

```mermaid
graph LR
  subgraph "Docker Compose"
    PG[(PostgreSQL :5432)]
    RD[(Redis :6379)]
    MIO[(MinIO :9000)]
    UL[Unleash :4242]
    KF[(Kafka :9092)]
    CHR[(ChromaDB :8000)]
    LF[Langfuse :3100]
    OLLAMA[Ollama :11434]
  end

  subgraph "Host (local dev)"
    BFF[NestJS BFF :4001]
    AIS[AI Service :4010]
    WEB[React Dev Server :3000]
    MOB[Expo Dev Server :8081]
    SB[Storybook :6006]
  end

  WEB --> BFF
  MOB --> BFF
  BFF --> PG
  BFF --> RD
  BFF --> MIO
  BFF --> UL
  BFF --> KF
  AIS --> RD
  AIS --> OLLAMA
  AIS --> CHR
  AIS --> LF
```

## Security Architecture

| Layer | Measure |
|-------|---------|
| Network | Docker network isolation. Only mapped ports accessible from host. |
| Auth (registered) | JWT with RS256. Access token (15min) + refresh token (7d). |
| Auth (guest) | Anonymous JWT with limited permissions. No refresh. |
| Authorization | Board-level: owner, collaborator, guest. Tenant-level: schema isolation. |
| Data in transit | HTTPS (REST), WSS (WebSocket), all local but TLS-ready. |
| Data at rest | MinIO SSE-S3 encryption. PostgreSQL at-rest encryption (planned). |
| Secrets | `.env` files. Never in code. Docker secrets for production. |
| Input validation | Zod schemas at API boundary. Sanitize HTML in board elements. |
| Rate limiting | Per-user Redis sliding window. Plan-based limits via Unleash. |
| CORS | Whitelist `localhost:3000` (web) and `localhost:8081` (mobile). |
| Dependencies | SAST (Semgrep) + SCA (Trivy) in CI. |

## Infrastructure Dependencies

| Service | Purpose | Port |
|---------|---------|------|
| PostgreSQL | Board data, user data, tenant schemas | 5432 |
| Redis | Cache, Pub/Sub (WebSocket scale), Stream (AI queue) | 6379 |
| MinIO | Board exports (PNG, PDF), uploaded images | 9000 |
| Unleash | Feature flags, plan-based gating | 4242 |
| Kafka | Analytics events | 9092 |
| ChromaDB | Vector embeddings for RAG | 8000 |
| Langfuse | LLM observability | 3100 |
| Ollama | Local LLM inference | 11434 |

## Scalability Considerations

| Concern | Current (local) | Production Strategy |
|---------|-----------------|-------------------|
| Concurrent boards | Single NestJS instance | Horizontal scaling + Redis Pub/Sub for WebSocket fan-out |
| Database | Single PostgreSQL | Read replicas per tenant schema |
| WebSocket connections | Single process | Multiple instances behind load balancer + sticky sessions |
| AI inference | Single Ollama | Multiple Ollama instances or GPU cluster |
| File storage | Single MinIO | S3 in cloud with CloudFront CDN |
| Search | N/A (no Elasticsearch for Whiteboard) | Add Elasticsearch if board search needed at scale |
| Caching | Single Redis | Redis Cluster |

## ADRs Created

- [ADR-0001: Why Yjs (CRDT) over OT](adrs/ADR-0001-why-yjs-over-ot.md)
- [ADR-0002: Why Ollama over cloud LLM](adrs/ADR-0002-why-ollama-over-cloud-llm.md)
- [ADR-0003: Why schema-per-tenant](adrs/ADR-0003-why-schema-per-tenant.md)
- [ADR-0004: Why NestJS Modular Monolith over microservices](adrs/ADR-0004-why-modular-monolith.md)
- [ADR-0005: Why Redis Stream over Kafka for AI task queue](adrs/ADR-0005-why-redis-stream-over-kafka.md)
