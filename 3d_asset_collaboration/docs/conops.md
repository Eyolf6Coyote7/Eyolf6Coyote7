# ConOps: 3D Asset Collaboration

## Table of Contents

- [Product Vision](#product-vision)
- [Industry Context](#industry-context)
- [Competitive Analysis](#competitive-analysis)
- [Stakeholder Map](#stakeholder-map)
- [Target Users](#target-users)
- [Assumptions & Constraints](#assumptions-constraints)
- [Core Scenarios](#core-scenarios)
  - [Scenario 1: Upload and Preview a 3D Asset](#scenario-1-upload-and-preview-a-3d-asset)
  - [Scenario 2: Search and Browse Assets Across Brands](#scenario-2-search-and-browse-assets-across-brands)
  - [Scenario 3: IoT Digital Twin Overlay](#scenario-3-iot-digital-twin-overlay)
  - [Scenario 4: Asset Version Management](#scenario-4-asset-version-management)
  - [Scenario 5: Brand-Scoped Access Control](#scenario-5-brand-scoped-access-control)
- [OKR / Success Metrics](#okr-success-metrics)
- [Risk Register](#risk-register)
- [ADRs Created](#adrs-created)

---

## Product Vision

A Digital Asset Management (DAM) platform for 3D content with real-time IoT data overlay and AI-powered asset classification — think Figma for 3D assets + IoT dashboard, built for media and advertising teams who manage large volumes of 3D creative assets.

## Industry Context

**Industry:** Media / Advertising

**Market:** The global DAM market is projected to reach $8.5B by 2027. Agencies and production studios manage thousands of 3D assets (GLB, FBX, textures, scenes) across campaigns and brands. Most DAM tools (Bynder, Brandfolder, Canto) are built for 2D images and videos — they lack native 3D preview, versioning for large binary files, and IoT integration for digital twin use cases.

**Positioning:** The only DAM platform with native browser-based 3D preview (Three.js), version-controlled 3D assets (MinIO), IoT sensor overlay for digital twin scenarios, and AI-powered automatic tagging — all running locally without cloud dependency.

## Competitive Analysis

| Competitor | Strengths | Weaknesses | Our Differentiator |
|-----------|-----------|------------|-------------------|
| Bynder | Market leader for brand DAM, good UX | No 3D support, no versioning for large files | Native 3D preview + versioned storage |
| Brandfolder | Strong search, brand portals | 2D only, cloud-dependent | Local-first, supports GLB/FBX |
| Unity Asset Store | 3D native, huge marketplace | Marketplace, not DAM — no team collaboration | Team collaboration + asset lifecycle management |
| Sketchfab | 3D preview in browser | Viewer only, no DAM features (versioning, tagging, ACL) | Full DAM + preview + IoT overlay |
| Custom folder on NAS | Free, simple | No search, no preview, no versioning, no access control | Everything a NAS can't do |

## Stakeholder Map

| Stakeholder | Role | Interest | Influence |
|-------------|------|----------|-----------|
| 3D Artist | Creates and uploads 3D assets | High — needs fast upload, preview, version management | Low |
| Creative Director | Reviews and approves assets across brands | High — needs cross-brand view, search, approval | High |
| Brand Manager | Manages brand-specific asset library | Medium — needs brand isolation, sharing controls | Medium |
| IoT Engineer | Sets up sensors, monitors digital twin data | Medium — needs MQTT integration, dashboard | Low |
| Product Owner | Defines features, tracks adoption | High — needs metrics and feedback | High |

## Target Users

| Persona | Role | Goal | Pain Point |
|---------|------|------|------------|
| **Maya (3D Artist)** | Creates 3D ad creatives at an agency | Upload GLB/FBX files, manage versions, preview in browser | Current NAS has no preview, finding the right version takes 20 min |
| **David (Creative Director)** | Oversees creative output across 5 brands | Search assets by tag/campaign, preview 3D in browser, approve for use | Can't preview 3D without downloading + opening in Unity/Blender |
| **Sarah (Brand Manager)** | Manages one brand's asset library | Control who can access brand assets, share with external partners | No ACL on NAS — anyone can see everything |
| **Kevin (IoT Engineer)** | Monitors factory equipment via sensors | Overlay IoT sensor data on 3D digital twin model | IoT dashboard and 3D model are separate tools — no unified view |

## Assumptions & Constraints

| Type | Description |
|------|-------------|
| Assumption | 3D assets are primarily GLB and FBX format (industry standard for web/game) |
| Assumption | Average asset size is 10-100MB, with some up to 500MB |
| Assumption | Teams have 10-50 users, not thousands (not consumer-scale) |
| Assumption | IoT sensors publish data via MQTT at 1-10 Hz frequency |
| Constraint | All infrastructure runs locally — no cloud services |
| Constraint | 3D preview must work in browser without installing Unity or Blender |
| Constraint | Asset versioning must support rollback to any previous version |
| Constraint | Each brand/tenant has isolated storage (bucket-per-tenant in MinIO) |
| Dependency | Three.js for browser-based 3D rendering |
| Dependency | Unity client for advanced 3D editing and IoT overlay |
| Dependency | gRPC for efficient large file streaming (bidirectional) |
| Dependency | MQTT (Mosquitto) for IoT sensor data ingestion |
| Dependency | Kafka for event streaming (MQTT bridge + asset events) |
| Dependency | Elasticsearch for full-text asset search |
| Dependency | TimescaleDB for IoT time-series data storage |

## Core Scenarios

### Scenario 1: Upload and Preview a 3D Asset

**As a** 3D Artist (Maya), **I want to** upload a GLB file and instantly preview it in the browser, **so that** I can verify it looks correct without opening Unity.

```
Flow:
1. Maya logs in → sees asset library for her brand
2. Clicks "Upload" → selects a 50MB GLB file
3. File uploads via gRPC bidirectional stream (chunked, resumable)
4. Backend stores in MinIO (versioned bucket) → creates version v1
5. Elasticsearch indexes metadata (name, tags, format, size)
6. Maya sees 3D preview in browser (Three.js renders the GLB)
7. Maya rotates, zooms, inspects the model — no download needed
8. Kafka produces event: asset3d.asset-events (asset_uploaded)
```

### Scenario 2: Search and Browse Assets Across Brands

**As a** Creative Director (David), **I want to** search for "car" across all brand libraries and preview results in 3D, **so that** I can find reusable assets quickly.

```
Flow:
1. David opens the Asset Portal → search bar at top
2. Types "car" → Elasticsearch returns matching assets across brands (filtered by ACL)
3. Results show thumbnails + metadata (name, brand, format, version count)
4. David clicks a result → 3D preview loads in Three.js
5. David clicks "Use in Campaign" → asset linked to new campaign
6. Kafka produces event: analytics.asset3d-events (asset_viewed_3d)
```

### Scenario 3: IoT Digital Twin Overlay

**As an** IoT Engineer (Kevin), **I want to** see live sensor data overlaid on a 3D model of factory equipment, **so that** I can monitor equipment health in context.

```
Flow:
1. Kevin opens the Unity client → loads factory floor 3D model
2. IoT sensors publish temperature, vibration, pressure via MQTT
3. Mosquitto receives MQTT messages → bridges to Kafka (asset3d.iot-sensor-data)
4. IoT Consumer reads from Kafka → writes to TimescaleDB
5. Unity client subscribes via SignalR → receives live sensor updates
6. Sensor values display as overlays on the 3D model (color-coded: green/yellow/red)
7. If temperature > threshold → Kafka produces alert event → push notification to Kevin
```

### Scenario 4: Asset Version Management

**As a** 3D Artist (Maya), **I want to** upload a new version of an asset and compare it with the previous version, **so that** I can track changes over time.

```
Flow:
1. Maya selects existing asset "hero-car-v2.glb"
2. Clicks "Upload New Version" → uploads updated file
3. Backend stores as v3 in MinIO versioned bucket
4. Version history shows: v1 → v2 → v3 with timestamps and uploader
5. Maya clicks "Compare v2 vs v3" → side-by-side 3D preview
6. Creative Director can "Revert to v2" if needed
7. Kafka compacted topic maintains latest state per asset_id
```

### Scenario 5: Brand-Scoped Access Control

**As a** Brand Manager (Sarah), **I want to** control who can view and edit my brand's assets, **so that** confidential creative work stays private.

```
Flow:
1. Sarah opens Admin → "Brand Settings" → "Access Control"
2. Sets permissions:
   - Brand team: Owner (upload, edit, delete)
   - Other brands: Viewer (preview only) or No access
   - External partner: Viewer via shared link (time-limited)
3. ACL enforced at API level (resource-level permission per asset)
4. MinIO bucket isolation: each brand has its own bucket
5. API Key for Unity client (M2M auth), JWT for web users
```

## OKR / Success Metrics

| Objective | Key Result | Target |
|-----------|-----------|--------|
| Upload is fast | Large file upload success rate (50MB+) | > 99.5% |
| Search is useful | Search result click-through rate | > 60% |
| 3D preview works | Browser 3D render time (first paint) | < 3 seconds |
| IoT is realtime | Sensor data latency (MQTT → UI) | < 2 seconds |
| Assets are organized | % of assets with ≥ 3 tags | > 80% |
| Versions are tracked | % of assets with > 1 version | > 30% |
| API is reliable | gRPC upload p99 latency (excl. transfer time) | < 500ms |
| System scales | Concurrent 3D preview sessions | > 20 |

## Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| Large GLB files (500MB+) cause browser crash during preview | High | Medium | Progressive loading (LOD), warn user for files > 200MB, offer low-poly preview |
| gRPC streaming fails mid-upload for large files | High | Low | Chunked upload with resume capability, retry with exponential backoff |
| Elasticsearch index grows too large | Medium | Medium | Index lifecycle management, archive old indexes, limit searchable fields |
| TimescaleDB disk usage from high-frequency IoT data | Medium | Medium | Retention policy (auto-delete data > 90 days), downsampling for historical data |
| Three.js can't render certain FBX features | Medium | High | Convert FBX → GLB server-side (using Blender CLI), document supported formats |
| MQTT → Kafka bridge drops messages under load | Medium | Low | Kafka acknowledgment, dead letter queue for failed messages |
| Multi-tenant bucket isolation breach in MinIO | Critical | Low | Bucket policy enforcement, integration tests per tenant, presigned URLs scoped to bucket |

## ADRs Created

- [ADR-0001: Why gRPC over REST for large file transfer](adrs/ADR-0001-why-grpc-for-file-transfer.md)
- [ADR-0002: Why Three.js over embedded Unity for browser 3D preview](adrs/ADR-0002-why-threejs-over-unity-web.md)
- [ADR-0003: Why MQTT → Kafka bridge instead of direct Kafka from IoT devices](adrs/ADR-0003-why-mqtt-kafka-bridge.md)
- [ADR-0004: Why Elasticsearch over PostgreSQL full-text search for asset discovery](adrs/ADR-0004-why-elasticsearch-over-pg-search.md)
- [ADR-0005: Why TimescaleDB over plain PostgreSQL for IoT time-series data](adrs/ADR-0005-why-timescaledb-for-iot.md)