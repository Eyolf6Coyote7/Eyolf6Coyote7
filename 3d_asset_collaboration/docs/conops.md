# ConOps: 3D Asset Collaboration

## Product Vision

A Digital Asset Management platform for 3D content with browser preview, version control, and IoT digital twin overlay — think Figma for 3D + IoT dashboard. Unlike Bynder/Brandfolder (2D only) or Sketchfab (viewer only), this is a **full DAM with 3D preview, versioning, search, and IoT** for media/advertising teams.

**Industry:** Media / Advertising | **Differentiator:** Native 3D preview + IoT overlay + asset versioning

## Target Users

| Persona | Role | Goal | Pain Point |
|---------|------|------|------------|
| Maya (3D Artist) | Creates 3D ad creatives | Upload GLB, manage versions, preview in browser | NAS has no preview, finding right version takes 20 min |
| David (Creative Director) | Oversees creative across brands | Search assets by tag, preview 3D, approve for campaign | Can't preview 3D without downloading + opening Unity |
| Sarah (Brand Manager) | Manages one brand's library | Control who accesses brand assets, share with partners | No ACL on NAS — anyone sees everything |
| Kevin (IoT Engineer) | Monitors factory equipment | See live sensor data overlaid on 3D digital twin | IoT dashboard and 3D model are separate tools |

## Core Scenarios

**1. Upload + Preview** — Drag 50MB GLB → gRPC chunked upload with resume → 3D preview loads in Three.js → AI auto-suggests tags

**2. Search + Browse** — Type "car" → Elasticsearch returns ranked results with 3D thumbnails → filter by brand/format → click to preview

**3. IoT Digital Twin** — Unity loads factory model → MQTT sensors publish data → Kafka bridge → TimescaleDB → SignalR pushes to Unity → color-coded markers overlay on 3D model

**4. Version Management** — Upload v2 → compare side-by-side with v1 (synced 3D rotation) → revert to v1 if needed

**5. Brand Access Control** — Set ACL per brand (owner/editor/viewer) → bucket-per-tenant MinIO isolation → share time-limited link with external partner

## OKR / Success Metrics

| Metric | Target |
|--------|--------|
| Upload success rate (50MB+) | > 99.5% |
| 3D preview render time | < 3 seconds |
| IoT sensor data latency (MQTT → UI) | < 2 seconds |

## Key Risks

| Risk | Mitigation |
|------|------------|
| Large GLB files crash browser | Progressive LOD, warn for > 200MB |
| gRPC streaming fails mid-upload | Chunked resume, retry with backoff |
| MQTT → Kafka bridge drops messages | QoS 1 + dead letter queue |

## ADRs

- [ADR-0001: Why gRPC over REST for file transfer](adrs/ADR-0001-why-grpc-for-file-transfer.md)
- [ADR-0002: Why Three.js over Unity WebGL](adrs/ADR-0002-why-threejs-over-unity-web.md)
- [ADR-0003: Why MQTT → Kafka bridge](adrs/ADR-0003-why-mqtt-kafka-bridge.md)
- [ADR-0004: Why Elasticsearch over PostgreSQL](adrs/ADR-0004-why-elasticsearch-over-pg-search.md)
- [ADR-0005: Why TimescaleDB for IoT](adrs/ADR-0005-why-timescaledb-for-iot.md)
