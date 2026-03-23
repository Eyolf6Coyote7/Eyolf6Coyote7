# System Architecture: 3D Asset Collaboration

## Architecture Pattern

**Hexagonal Architecture (Ports & Adapters) + EDA** — ASP.NET Core backend with core logic isolated from I/O adapters (gRPC, REST, MQTT, SignalR, MinIO, Elasticsearch). IoT data flows through MQTT → Kafka → TimescaleDB. Python AI service for asset auto-tagging.

## C4 Model

### Level 1: System Context

```mermaid
graph TD
  ARTIST[3D Artist<br/>Browser] --> SYS[3D Asset Platform]
  DIRECTOR[Creative Director<br/>Browser] --> SYS
  UNITY_USER[IoT Engineer<br/>Unity Client] --> SYS
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
    MH[MailHog<br/>Email]
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
    PORT_IOT[IIoTService<br/>Port]
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
    ALERT[Alert Engine]
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
  API->>API: Generate 3D thumbnail (server-side render)
  API->>ES: Index metadata (name, format, size, brand)
  API->>KF: Produce event (asset_uploaded)
  API->>AI: Request auto-tag (async)
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
    string format "glb|fbx"
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
    jsonb location_3d "x,y,z on model"
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
  MQTT --> KF
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
