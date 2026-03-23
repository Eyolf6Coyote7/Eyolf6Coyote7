# System Architecture: 3D Asset Collaboration

## Table of Contents

- [Architecture Pattern](#architecture-pattern)
- [C4 Model](#c4-model)
  - [Level 1: System Context](#level-1-system-context)
  - [Level 2: Container Diagram](#level-2-container-diagram)
  - [Level 3: Component Diagram (Asset API — Hexagonal)](#level-3-component-diagram-asset-api-hexagonal)
  - [Level 3: Component Diagram (IoT Pipeline)](#level-3-component-diagram-iot-pipeline)
  - [Level 3: Component Diagram (Asset Portal — React + Three.js)](#level-3-component-diagram-asset-portal-react-threejs)
  - [Level 3: Component Diagram (Unity Client — C#)](#level-3-component-diagram-unity-client-c)
  - [Level 3: Component Diagram (Mobile App — Lightweight)](#level-3-component-diagram-mobile-app-lightweight)
- [Component Overview](#component-overview)
- [Data Flow (Sequence Diagrams)](#data-flow-sequence-diagrams)
  - [Flow 1: Upload 3D Asset (gRPC Streaming)](#flow-1-upload-3d-asset-grpc-streaming)
  - [Flow 2: Search Assets (Elasticsearch)](#flow-2-search-assets-elasticsearch)
  - [Flow 3: IoT Digital Twin (MQTT → Kafka → Unity)](#flow-3-iot-digital-twin-mqtt-kafka-unity)
  - [Flow 4: Version Compare](#flow-4-version-compare)
- [API Contracts (High-level)](#api-contracts-high-level)
- [Database Schema (High-level)](#database-schema-high-level)
- [Deployment Diagram](#deployment-diagram)
- [Security Architecture](#security-architecture)
- [Infrastructure Dependencies](#infrastructure-dependencies)
- [Scalability Considerations](#scalability-considerations)
- [ADRs Created](#adrs-created)

---


## Architecture Pattern

**Hexagonal Architecture (Ports & Adapters) + EDA** — ASP.NET Core backend with core logic isolated behind port interfaces. Input adapters: gRPC, REST, SignalR. Output adapters: PostgreSQL, Elasticsearch, MinIO, TimescaleDB, Kafka, Redis. IoT data flows through MQTT → Kafka → TimescaleDB. Python AI service for asset auto-tagging.

## C4 Model

### Level 1: System Context

```mermaid
graph TD
  ARTIST[3D Artist<br/>Browser] --> SYS[3D Asset Platform]
  DIRECTOR[Creative Director<br/>Browser] --> SYS
  UNITY_USER[Unity User<br/>3D Artist / IoT Engineer] --> SYS
  IOT[IoT Devices<br/>MQTT Sensors] --> SYS
  SYS --> INFRA[Shared Infrastructure<br/>PostgreSQL, Redis, Kafka, etc.]
```

### Level 2: Container Diagram

```mermaid
graph TD
  subgraph "Frontend"
    PORTAL[Asset Portal<br/>React + Three.js + Vite]
    UNITY[Unity Client<br/>C# + SignalR]
    MOBILE[Mobile App<br/>Lightweight browse only]
  end

  subgraph "Backend"
    API[Asset API<br/>ASP.NET Core]
    AI_SVC[AI Service<br/>Python + FastAPI + ONNX]
    IOT_C[IoT Consumer<br/>Kafka Consumer]
  end

  subgraph "IoT Pipeline"
    MQTT[(Mosquitto<br/>MQTT Broker)]
    BRIDGE[MQTT → Kafka Bridge]
  end

  subgraph "Infrastructure"
    PG[(PostgreSQL<br/>Asset metadata)]
    RD[(Redis<br/>Cache + Pub/Sub)]
    KF[(Kafka<br/>Events + IoT data)]
    MIO[(MinIO<br/>Versioned 3D files)]
    ES[(Elasticsearch<br/>Asset search)]
    TS[(TimescaleDB<br/>IoT time-series)]
    UL[Unleash<br/>Feature Flags]
    MH[MailHog<br/>Email - dev only]
  end

  PORTAL -->|REST| API
  PORTAL -->|SignalR| API
  UNITY -->|gRPC| API
  UNITY -->|SignalR| API
  MOBILE -->|REST| API
  API --> PG
  API --> RD
  API --> MIO
  API --> ES
  API --> UL
  API -->|produce events| KF
  API -->|inference request| AI_SVC
  AI_SVC --> PG
  IOT[IoT Devices] -->|MQTT| MQTT
  MQTT --> BRIDGE
  BRIDGE -->|produce| KF
  IOT_C -->|consume| KF
  IOT_C --> TS
  IOT_C -->|alerts| API
```

### Level 3: Component Diagram (Asset API — Hexagonal)

```mermaid
graph TD
  subgraph "Adapters (Input)"
    REST[REST Controllers<br/>Web + Mobile API]
    GRPC[gRPC Services<br/>Unity file streaming]
    SIGNALR[SignalR Hub<br/>Realtime IoT + sync]
  end

  subgraph "Core (Ports + Domain)"
    PORT_ASSET[IAssetService<br/>Port]
    PORT_SEARCH[ISearchService<br/>Port]
    PORT_IOT[IIoTService<br/>Port - query + alerts]
    PORT_STORAGE[IStorageService<br/>Port]
    PORT_AUTH[IAuthService<br/>Port]
    DOMAIN[Domain Logic<br/>Asset, Version, Tag, ACL]
  end

  subgraph "Adapters (Output)"
    PG_ADAPTER[PostgreSQL Adapter<br/>EF Core Repository]
    ES_ADAPTER[Elasticsearch Adapter]
    MINIO_ADAPTER[MinIO Adapter<br/>Versioned buckets]
    KAFKA_ADAPTER[Kafka Producer Adapter]
    REDIS_ADAPTER[Redis Adapter<br/>Cache + Pub/Sub]
    TS_ADAPTER[TimescaleDB Adapter<br/>IoT queries]
  end

  REST --> PORT_ASSET
  REST --> PORT_SEARCH
  GRPC --> PORT_ASSET
  GRPC --> PORT_STORAGE
  SIGNALR --> PORT_IOT

  PORT_ASSET --> DOMAIN
  PORT_SEARCH --> DOMAIN
  DOMAIN --> PG_ADAPTER
  DOMAIN --> ES_ADAPTER
  DOMAIN --> MINIO_ADAPTER
  DOMAIN --> KAFKA_ADAPTER
  PORT_IOT --> TS_ADAPTER
  PORT_IOT --> REDIS_ADAPTER
```

### Level 3: Component Diagram (IoT Pipeline)

```mermaid
graph TD
  subgraph "IoT Pipeline"
    DEVICES[IoT Sensors]
    MQTT[Mosquitto Broker]
    BRIDGE[MQTT-Kafka Bridge]
    KF_TOPIC[Kafka: asset3d.iot-sensor-data]
    CONSUMER[IoT Consumer]
  end

  subgraph "Storage + Alerting"
    TS[(TimescaleDB)]
    ALERT[Alert Module<br/>within IoT Consumer]
    API[Asset API]
    PUSH[Push Notification]
  end

  DEVICES -->|MQTT QoS 1| MQTT
  MQTT --> BRIDGE
  BRIDGE -->|partition by device_id| KF_TOPIC
  KF_TOPIC --> CONSUMER
  CONSUMER -->|INSERT time-series| TS
  CONSUMER -->|check thresholds| ALERT
  ALERT -->|if exceeded| API
  API -->|SignalR| UNITY[Unity Client]
  API -->|push| PUSH
```

### Level 3: Component Diagram (Asset Portal — React + Three.js)

```mermaid
graph TD
  subgraph "Asset Portal (React + Three.js + Vite)"
    ROUTER_P[React Router<br/>Pages + Auth Guard]
    STORE_P[Redux Toolkit (RTK)<br/>assets, search, ui, auth]
    VIEWER[3D Viewer Module<br/>React Three Fiber + Drei]
    SEARCH[Search Module<br/>Elasticsearch autocomplete]
    UPLOAD[Upload Module<br/>gRPC-Web via Envoy + progress]
    FILTER[Filter Sidebar<br/>Faceted filters]
    TAG_EDITOR[Tag Editor<br/>Add/remove + AI suggestions]
    VERSION[Version Manager<br/>Timeline + side-by-side compare]
    API_P[API Client<br/>REST (real / mock switching)]
    I18N_P[i18n<br/>react-i18next]
  end

  ROUTER_P --> STORE_P
  ROUTER_P --> VIEWER
  ROUTER_P --> SEARCH
  ROUTER_P --> I18N_P
  STORE_P --> API_P
  API_P -->|REST| ASSET_API[Asset API]
  UPLOAD -->|gRPC-Web| ASSET_API
  SEARCH -->|autocomplete| API_P
  SEARCH --> STORE_P
  FILTER --> STORE_P
  TAG_EDITOR --> API_P
  VIEWER -->|presigned URL| API_P
  VERSION --> VIEWER
  VERSION --> STORE_P
```

#### Asset Portal — Key Modules

| Module | Responsibility | Key Libraries |
|--------|---------------|---------------|
| Router | Page routing, JWT auth guard | React Router v6 |
| Store | Global state (assets, search results, filters, auth) | Redux Toolkit (RTK) |
| 3D Viewer | GLB rendering, orbit controls, material inspection | React Three Fiber, @react-three/drei |
| Search | Elasticsearch autocomplete, debounced input, result ranking | Custom + Axios |
| Upload | gRPC-Web chunked upload, progress bar, resume | gRPC-Web via Envoy proxy |
| Filter Sidebar | Faceted filters (format, brand, date, tags) | Custom components |
| Tag Editor | Add/remove tags, AI auto-tag suggestions (dashed border) | Custom |
| Version Manager | Version timeline, side-by-side 3D compare (synced orbit) | Custom + React Three Fiber |
| API Client | REST calls, real/mock switching by env | Axios + API Layer pattern |
| i18n | Multi-language (en, zh-TW) | react-i18next |

#### Asset Portal — Route Structure

| Route | Page | Auth |
|-------|------|------|
| `/auth` | Login (JWT + API Key) | Public |
| `/` | Asset Library (grid + filter sidebar) | JWT |
| `/asset/:id` | Asset Detail (3D viewer + metadata + versions) | JWT |
| `/asset/:id/compare` | Version Compare (side-by-side 3D) | JWT |
| `/upload` | Upload (drag-and-drop + metadata form) | JWT |
| `/search` | Search Results (faceted) | JWT |
| `/iot` | IoT Dashboard (time-series charts) | JWT |
| `/admin/brand` | Brand Settings (ACL editor) | JWT (brand owner) |
| `/settings` | Account (profile, API keys) | JWT |

### Level 3: Component Diagram (Unity Client — C#)

```mermaid
graph TD
  subgraph "Unity Client (C# + Unity 2022 LTS)"
    SCENE[Scene Manager<br/>Load/switch 3D scenes]
    ASSET_BROWSER[Asset Browser<br/>Grid view + search]
    VIEWPORT[3D Viewport<br/>Camera controls (WASD + mouse)]
    IOT_OVERLAY[IoT Overlay<br/>3D billboard markers]
    SIGNALR_C[SignalR Client<br/>Realtime sensor updates]
    GRPC_C[gRPC Client<br/>File upload/download]
    INSPECTOR[Asset Inspector<br/>Metadata + versions + download]
    AUTH_C[Auth Module<br/>API Key via Keychain/Keystore]
    CACHE[Local Cache<br/>Asset metadata + last sensor values]
    ALERT[Alert Handler<br/>Visual + audio alerts]
  end

  SCENE --> VIEWPORT
  VIEWPORT --> IOT_OVERLAY
  SIGNALR_C -->|realtime data| IOT_OVERLAY
  SIGNALR_C -->|realtime data| CACHE
  SIGNALR_C -->|threshold check| ALERT
  SIGNALR_C -->|SignalR| ASSET_API[Asset API]
  GRPC_C -->|gRPC| ASSET_API
  GRPC_C --> CACHE
  CACHE -->|read| IOT_OVERLAY
  ASSET_BROWSER --> GRPC_C
  INSPECTOR --> GRPC_C
  AUTH_C --> GRPC_C
  AUTH_C --> SIGNALR_C
```

#### Unity Client — Key Modules

| Module | Responsibility | Key Tech |
|--------|---------------|----------|
| Scene Manager | Load factory floor models, switch between scenes | Unity SceneManager |
| Asset Browser | Browse and search 3D assets (in-Unity) | Unity UI Toolkit |
| 3D Viewport | Camera movement (WASD), orbit, zoom | Cinemachine |
| IoT Overlay | 3D billboard markers on model coordinates, color-coded | Custom shader + Billboard |
| SignalR Client | Realtime sensor data subscription | Microsoft.AspNetCore.SignalR.Client |
| gRPC Client | Upload/download 3D assets (chunked stream) | Grpc.Net.Client |
| Asset Inspector | View metadata, versions, trigger download | Unity UI Toolkit |
| Auth Module | Store + send API Key for M2M auth | iOS Keychain / Android Keystore (via Unity plugin) |
| Local Cache | Cache asset metadata + last known sensor values | Unity JsonUtility + local file |
| Alert Handler | Red flash border + sound when threshold exceeded | Custom UI + AudioSource |

#### Unity Client — Scene Structure

| Scene | Content | When Loaded |
|-------|---------|-------------|
| Login | API Key input, connection test | App launch |
| Asset Browser | Grid of 3D assets, search bar | After login |
| 3D Viewport | Factory floor model + IoT overlays | When user opens a scene |
| Asset Inspector | Side panel overlay on 3D Viewport | When user clicks an asset |

### Level 3: Component Diagram (Mobile App — Lightweight)

```mermaid
graph TD
  subgraph "Mobile App (React — Lightweight)"
    NAV_M[React Navigation<br/>Tab bar + stack]
    STORE_M[Redux Toolkit<br/>assets, notifications]
    LIST[Asset List<br/>2D thumbnails only]
    DETAIL[Asset Detail<br/>Metadata + version list, no 3D]
    NOTIF_M[Notifications<br/>Push handler + list]
    API_M[API Client<br/>REST to Asset API]
    PUSH_M[Push<br/>Expo Notifications]
  end

  NAV_M --> STORE_M
  NAV_M --> LIST
  NAV_M --> DETAIL
  NAV_M --> NOTIF_M
  LIST --> STORE_M
  DETAIL --> STORE_M
  NOTIF_M --> STORE_M
  PUSH_M -->|incoming push| NOTIF_M
  STORE_M --> API_M
  API_M -->|REST| ASSET_API[Asset API]
  PUSH_M -->|FCM / APNs| CLOUD[Push Service]
```

#### Mobile App — Key Modules

| Module | Responsibility | Key Libraries |
|--------|---------------|---------------|
| Navigation | Tab bar (Assets, Search, Notifications, Profile) | React Navigation v6 |
| Store | Asset list, notification state | Redux Toolkit |
| Asset List | 2D thumbnail grid (no 3D preview) | FlatList |
| Asset Detail | Metadata, version list, download link (no 3D viewer) | Custom screen |
| Notifications | Push notification handler + notification list | Expo Notifications |
| API Client | REST calls to Asset API | Axios |

> Mobile is **not** a primary platform. No 3D preview, no upload. Browse + notifications only.

#### Mobile App — Navigation Structure

| Tab | Screens | Auth |
|-----|---------|------|
| Assets | Asset List → Asset Detail | JWT |
| Search | Search → Asset Detail | JWT |
| Notifications | Notification List | JWT |
| Profile | Account, API Keys | JWT |

## Component Overview

| Component | Tech | System | Responsibility |
|-----------|------|--------|---------------|
| Asset Portal | React + Three.js + Vite + Redux Toolkit | Frontend | Asset browse, search, 3D preview, upload |
| Unity Client | C# + Unity 2022 LTS + SignalR | Frontend | 3D editing, IoT overlay, advanced preview |
| Mobile App | React (lightweight) | Frontend | Browse + notifications only |
| Asset API | ASP.NET Core (C#) | Backend | REST + gRPC + SignalR, core business logic |
| AI Service | Python + FastAPI + ONNX Runtime | Worker | Asset auto-tagging, image classification |
| IoT Consumer | Kafka Consumer (C#) | Worker | Ingest IoT data → TimescaleDB, alerting |
| MQTT-Kafka Bridge | Mosquitto + Kafka Connect | Pipeline | Bridge MQTT messages to Kafka topic |

## Data Flow (Sequence Diagrams)

### Flow 1: Upload 3D Asset (gRPC Streaming)

```mermaid
sequenceDiagram
  actor Maya as Maya (3D Artist)
  participant Portal as Asset Portal
  participant API as Asset API
  participant MIO as MinIO
  participant ES as Elasticsearch
  participant KF as Kafka
  participant AI as AI Service

  Maya->>Portal: Select 50MB GLB file
  Portal->>API: gRPC bidirectional stream (chunked upload)
  loop Each chunk (1MB)
    Portal->>API: Send chunk
    API-->>Portal: Ack + progress %
  end
  API->>MIO: Store in versioned bucket (brand-scoped)
  MIO-->>API: version_id, etag
  API->>KF: Produce event (asset_uploaded)
  API->>ES: Index metadata (name, format, size, brand)
  Note over KF: Async workers consume asset_uploaded event
  KF->>AI: Auto-tag (async via Kafka consumer)
  KF->>API: Thumbnail generation (async worker, not main API thread)
  API-->>Portal: {asset_id, version: 1, preview_url}
  Portal-->>Maya: 3D preview loads in Three.js

  AI->>AI: ONNX inference (classify asset)
  AI-->>API: Suggested tags: ["car", "vehicle", "hero"]
  API->>ES: Update tags index
```

### Flow 2: Search Assets (Elasticsearch)

```mermaid
sequenceDiagram
  actor David as David (Creative Director)
  participant Portal as Asset Portal
  participant API as Asset API
  participant ES as Elasticsearch

  David->>Portal: Type "car" in search bar
  Portal->>API: GET /api/assets/search?q=car&brand=Nike
  API->>API: Check ACL (David has access to Nike?)
  API->>ES: Search query (fuzzy match + facets)
  ES-->>API: Results with relevance score
  API-->>Portal: {assets: [...], facets: {format: {glb: 8}, brand: {Nike: 5}}}
  Portal-->>David: Grid of 3D thumbnails with filters
```

### Flow 3: IoT Digital Twin (MQTT → Kafka → Unity)

```mermaid
sequenceDiagram
  participant Sensor as IoT Sensor
  participant MQTT as Mosquitto
  participant Bridge as MQTT-Kafka Bridge
  participant KF as Kafka
  participant Consumer as IoT Consumer
  participant TS as TimescaleDB
  participant API as Asset API
  participant Unity as Unity Client

  Sensor->>MQTT: Publish temperature=85°C (QoS 1)
  MQTT->>Bridge: Forward message
  Bridge->>KF: Produce to asset3d.iot-sensor-data (partition by device_id)
  KF->>Consumer: Consume message
  Consumer->>TS: INSERT INTO sensor_readings (device_id, value, timestamp)
  Consumer->>Consumer: Check threshold (85°C > 80°C = WARNING)
  Consumer->>API: POST /internal/iot/alert {device_id, severity: "warning"}
  API->>Unity: SignalR push (sensor update + alert)
  Unity->>Unity: Update 3D marker color (green → yellow)
  Unity->>Unity: Show tooltip "Temperature: 85°C ⚠️"
```

### Flow 4: Version Compare

```mermaid
sequenceDiagram
  actor Maya as Maya (3D Artist)
  participant Portal as Asset Portal
  participant API as Asset API
  participant MIO as MinIO

  Maya->>Portal: Click "Compare v2 vs v3"
  Portal->>API: GET /api/assets/:id/versions/2
  API->>MIO: Get presigned URL for v2
  Portal->>API: GET /api/assets/:id/versions/3
  API->>MIO: Get presigned URL for v3
  API-->>Portal: {v2_url, v3_url}
  Portal->>Portal: Load both in side-by-side Three.js viewers
  Portal->>Portal: Sync orbit controls (rotate one = rotate both)
  Maya->>Portal: Rotate model → both viewers rotate in sync
```

## API Contracts (High-level)

| Endpoint | Protocol | System | Direction | Description |
|----------|----------|--------|-----------|-------------|
| `GET /api/assets` | REST | Asset API | Client → Server | List assets (paginated, filtered) |
| `GET /api/assets/:id` | REST | Asset API | Client → Server | Asset detail + metadata |
| `GET /api/assets/search?q=` | REST | Asset API | Client → Server | Elasticsearch search |
| `GET /api/assets/:id/versions/:v` | REST | Asset API | Client → Server | Get presigned URL for specific version |
| `AssetService.Upload` | gRPC stream | Asset API | Client → Server | Chunked bidirectional file upload |
| `AssetService.Download` | gRPC stream | Asset API | Server → Client | Server-side streaming download |
| `POST /api/assets/:id/tags` | REST | Asset API | Client → Server | Add/remove tags |
| `POST /api/assets/:id/share` | REST | Asset API | Client → Server | Generate share link with ACL |
| SignalR `/hub/iot` | SignalR | Asset API | Bidirectional | Realtime IoT sensor updates |
| SignalR `/hub/assets` | SignalR | Asset API | Bidirectional | Asset change notifications |
| `POST /internal/iot/alert` | REST | Asset API | IoT Consumer → API | Internal alert from consumer |
| `POST /internal/ai/tags` | REST | Asset API | AI Service → API | AI-suggested tags callback |
| `asset3d.iot-sensor-data` | Kafka | — | MQTT Bridge → Consumer | IoT sensor readings |
| `asset3d.asset-events` | Kafka | — | API → Analytics | Asset lifecycle events |
| `analytics.asset3d-events` | Kafka | — | API → Analytics | User behavior events |

## Database Schema (High-level)

```mermaid
erDiagram
  BRAND ||--o{ ASSET : owns
  BRAND ||--o{ BRAND_MEMBER : has
  USER ||--o{ BRAND_MEMBER : belongs_to
  USER ||--o{ ASSET : uploads
  ASSET ||--o{ ASSET_VERSION : has
  ASSET ||--o{ ASSET_TAG : has
  ASSET ||--o{ SHARE_LINK : has
  IOT_DEVICE ||--o{ SENSOR_READING : produces

  BRAND {
    uuid id PK
    string name
    string minio_bucket
  }
  ASSET {
    uuid id PK
    uuid brand_id FK
    uuid uploaded_by FK
    string name
    enum format "glb, fbx"
    int current_version
    string thumbnail_url
    timestamp created_at
  }
  ASSET_VERSION {
    uuid id PK
    uuid asset_id FK
    int version_number
    string minio_object_key
    string minio_version_id
    bigint size_bytes
    timestamp created_at
  }
  ASSET_TAG {
    uuid id PK
    uuid asset_id FK
    string tag
    string source "manual|ai"
  }
  IOT_DEVICE {
    uuid id PK
    string device_id
    string type "temperature|vibration|pressure"
    jsonb location_3d "{x: float, y: float, z: float}"
  }
```

> `SENSOR_READING` lives in **TimescaleDB** (separate instance), not main PostgreSQL:

```sql
-- TimescaleDB hypertable
CREATE TABLE sensor_readings (
  time        TIMESTAMPTZ NOT NULL,
  device_id   TEXT        NOT NULL,
  value       DOUBLE PRECISION,
  unit        TEXT
);
SELECT create_hypertable('sensor_readings', 'time');
```

## Deployment Diagram

```mermaid
graph LR
  subgraph "Docker Compose"
    PG[(PostgreSQL :5432)]
    TS[(TimescaleDB :5433)]
    RD[(Redis :6379)]
    KF[(Kafka :9092)]
    MIO[(MinIO :9000)]
    ES[(Elasticsearch :9200)]
    MQTT[(Mosquitto :1883)]
    UL[Unleash :4242]
    MH[MailHog :1025]
  end

  subgraph "Host (local dev)"
    API[ASP.NET Core :4003]
    AI[Python FastAPI :4013]
    IOT_C[IoT Consumer]
    WEB[React Dev Server :3003]
    UNITY[Unity Editor]
    SB[Storybook :6008]
  end

  WEB --> API
  UNITY --> API
  API --> PG
  API --> RD
  API --> MIO
  API --> ES
  API --> KF
  API --> UL
  AI --> API
  IOT_C --> KF
  IOT_C --> TS
  MQTT --> BRIDGE[MQTT-Kafka Bridge]
  BRIDGE --> KF
```

## Security Architecture

| Layer | Measure |
|-------|---------|
| Auth (Web) | JWT with RS256. Login via email/password. |
| Auth (Unity/IoT) | API Key for M2M authentication. Per-device keys for IoT. |
| Authorization | Resource-level ACL: Owner / Editor / Viewer per asset + brand. |
| Multi-tenancy | Bucket-per-brand in MinIO. `brand_id` filter on all queries. |
| Data in transit | HTTPS (REST), gRPCs (gRPC + TLS), WSS (SignalR). |
| Data at rest | MinIO SSE-S3 encryption. |
| File validation | Validate file format (GLB/FBX magic bytes) before storing. Reject malicious files. |
| Input validation | FluentValidation at API boundary. Sanitize search queries for Elasticsearch injection. |
| Rate limiting | Per-user Redis sliding window. Upload rate: 50/hour. API: 200/min. |
| CORS | Whitelist `localhost:3003` (web). Unity uses gRPC (no CORS). |
| Dependencies | SAST (Semgrep) + SCA (Trivy) in CI. |

## Infrastructure Dependencies

| Service | Purpose | Port |
|---------|---------|------|
| PostgreSQL | Asset metadata, users, brands, ACL | 5432 |
| TimescaleDB | IoT sensor time-series data | 5433 |
| Redis | Cache, Pub/Sub (SignalR scale-out) | 6379 |
| Kafka | Event streaming (IoT bridge + asset events + analytics) | 9092 |
| MinIO | 3D file storage (versioned, brand-scoped buckets) | 9000 |
| Elasticsearch | Full-text asset search (name, tags, description) | 9200 |
| Mosquitto | MQTT broker for IoT sensor ingestion | 1883 |
| Unleash | Feature flags | 4242 |
| MailHog | Email notifications (local) | 1025 |

## Scalability Considerations

| Concern | Current (local) | Production Strategy |
|---------|-----------------|-------------------|
| File storage | Single MinIO | S3 with CloudFront CDN for presigned URLs |
| Search | Single Elasticsearch | ES cluster with replicas |
| IoT ingestion | Single Kafka broker | Multi-broker Kafka, multiple consumer instances |
| Time-series | Single TimescaleDB | TimescaleDB multi-node or Amazon Timestream |
| 3D preview | Client-side Three.js | CDN for model files, progressive LOD |
| gRPC | Single ASP.NET Core | Horizontal scaling with load balancer (gRPC supports it) |
| SignalR | Single instance | Redis backplane for SignalR scale-out |
| AI inference | Single ONNX model | Multiple FastAPI workers, GPU if available |

## ADRs Created

- [ADR-0001: Why gRPC over REST for large file transfer](adrs/ADR-0001-why-grpc-for-file-transfer.md)
- [ADR-0002: Why Three.js over Unity WebGL for browser preview](adrs/ADR-0002-why-threejs-over-unity-web.md)
- [ADR-0003: Why MQTT → Kafka bridge for IoT data](adrs/ADR-0003-why-mqtt-kafka-bridge.md)
- [ADR-0004: Why Elasticsearch over PostgreSQL for asset search](adrs/ADR-0004-why-elasticsearch-over-pg-search.md)
- [ADR-0005: Why TimescaleDB for IoT time-series data](adrs/ADR-0005-why-timescaledb-for-iot.md)
- [ADR-0006: Why Hexagonal Architecture for 3D Asset backend](adrs/ADR-0006-why-hexagonal.md)
