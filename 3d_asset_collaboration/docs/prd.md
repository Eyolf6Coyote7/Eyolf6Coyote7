# PRD: 3D Asset Collaboration

## Table of Contents

- [Overview](#overview)
- [User Journey Map](#user-journey-map)
  - [Maya (3D Artist) Journey](#maya-3d-artist-journey)
  - [David (Creative Director) Journey](#david-creative-director-journey)
- [Feature List](#feature-list)
- [Feature Details](#feature-details)
  - [F1: Upload 3D Assets (GLB, FBX)](#f1-upload-3d-assets-glb-fbx)
  - [F2: Browser 3D Preview (Three.js)](#f2-browser-3d-preview-threejs)
  - [F4: Full-text Asset Search](#f4-full-text-asset-search)
  - [F8: IoT Sensor Data Overlay on 3D Model](#f8-iot-sensor-data-overlay-on-3d-model)
  - [F3: Asset Version Management](#f3-asset-version-management)
- [Non-functional Requirements](#non-functional-requirements)
- [Release Criteria](#release-criteria)
- [Dependencies](#dependencies)

---


## Overview

A Digital Asset Management (DAM) platform for 3D content with browser-based preview, version control, IoT digital twin overlay, and AI-powered asset classification — built for media and advertising teams. See [ConOps](conops.md) for product vision and user personas.

## User Journey Map

### Maya (3D Artist) Journey

| Stage | Action | Touchpoint | Emotion | Opportunity |
|-------|--------|-----------|---------|-------------|
| Upload | Drags GLB file into Asset Portal | Web | Expects fast | Progress bar + resume for large files |
| Preview | Rotates 3D model in browser | Web | Impressed | Must render < 3 seconds, no install needed |
| Version | Uploads updated version, compares with previous | Web | Confident | Side-by-side 3D comparison |
| Tag | Adds tags for searchability | Web | Productive | AI auto-tag suggestion |
| Share | Shares asset with Creative Director for review | Web | Satisfied | One-click share with ACL |

### David (Creative Director) Journey

| Stage | Action | Touchpoint | Emotion | Opportunity |
|-------|--------|-----------|---------|-------------|
| Search | Searches "car" across all brand libraries | Web | Busy | Elasticsearch must return results < 500ms |
| Browse | Scrolls through 3D thumbnails | Web | Evaluating | Thumbnails must show 3D angle, not just icon |
| Preview | Clicks asset, inspects in 3D | Web | Focused | Smooth rotate/zoom, material inspection |
| Approve | Marks asset as "Approved for Campaign X" | Web | Decisive | One-click approval with status badge |
| Reuse | Finds approved asset for new campaign | Web | Efficient | Search filters: approved, by campaign, by brand |

## Feature List

| # | Feature | Priority | Platform | System | Status | Analytics Event |
|---|---------|----------|----------|--------|--------|----------------|
| F1 | Upload 3D assets (GLB, FBX) | P0 | Web + Unity | Asset API (gRPC + REST) | Planned | `asset_uploaded` |
| F2 | Browser 3D preview (Three.js) | P0 | Web | Web App | Planned | `asset_viewed_3d` |
| F3 | Asset version management | P0 | Web | Asset API + MinIO | Planned | `version_created` |
| F4 | Full-text asset search | P0 | Web | Asset API + Elasticsearch | Planned | `search_performed` |
| F5 | Asset tagging and metadata | P0 | Web | Asset API + Elasticsearch | Planned | `asset_tagged` |
| F6 | AI auto-tagging (image/3D classification) | P1 | — | AI Service (Python + ONNX) | Planned | `ai_tag_suggested` |
| F7 | Brand-scoped access control (ACL) | P0 | Web | Asset API | Planned | — |
| F8 | IoT sensor data overlay on 3D model | P1 | Unity | Unity Client + SignalR | Planned | `iot_overlay_viewed` |
| F9 | IoT data dashboard (time-series charts) | P1 | Web | Web App + TimescaleDB | Planned | `iot_dashboard_viewed` |
| F10 | IoT alerting (threshold-based) | P1 | — | IoT Consumer + Kafka | Planned | `iot_alert_triggered` |
| F11 | Asset download (presigned URL) | P0 | Web + Unity | Asset API + MinIO | Planned | `asset_downloaded` |
| F12 | Side-by-side version comparison (3D) | P2 | Web | Web App | Planned | `version_compared` |
| F13 | Asset approval workflow | P2 | Web | Asset API | Planned | `asset_approved` |
| F14 | Shared link (external partner access) | P1 | Web | Asset API | Planned | `share_link_created` |
| F15 | User authentication (API Key + JWT) | P0 | Web + Unity | Asset API | Planned | `user_logged_in` |
| F16 | Feature flags | P1 | All | Unleash | Planned | — |
| F17 | Push notifications (upload complete, IoT alert) | P2 | Unity | Kafka + FCM | Planned | `notification_sent` |
| F18 | Email notifications (asset shared) | P2 | — | Kafka + MailHog | Planned | `email_sent` |
| F19 | i18n (English + Chinese) | P2 | Web + Unity | All | Planned | — |
| F20 | Remote config (Unity scene defaults) | P2 | Unity | Asset API | Planned | `config_updated` |
| F21 | Thumbnail generation (auto from 3D model) | P1 | — | Asset API | Planned | — |
| F22 | Asset usage analytics | P2 | Web | Kafka events | Planned | `asset_usage_tracked` |

## Feature Details

### F1: Upload 3D Assets (GLB, FBX)

**User Story:** As a 3D artist, I want to upload large 3D files (50-500MB) reliably, so that my assets are stored and available for the team.

**Acceptance Criteria:**
- [ ] Given the upload page, when user selects a GLB/FBX file, then upload starts via gRPC bidirectional stream
- [ ] Given a large file (>50MB), when upload is in progress, then user sees a progress bar with percentage
- [ ] Given upload fails mid-way, when user retries, then upload resumes from last chunk (not from zero)
- [ ] Given upload completes, when asset is stored, then MinIO saves it in the brand's versioned bucket
- [ ] Given upload completes, then Elasticsearch indexes the asset metadata (name, format, size, tags)
- [ ] Given upload completes, then Kafka produces event to `asset3d.asset-events`

**Supported Formats:** GLB (primary), FBX (converted to GLB server-side via Blender CLI)

**Edge Cases:**
- What if file is > 500MB? → Warn user, allow but show estimated time
- What if file format is unsupported? → Reject with clear error message, list supported formats
- What if FBX conversion fails? → Store original FBX, mark preview as unavailable, notify user

**Analytics:**
- Event: `asset_uploaded`
- Properties: `{ format: "glb", size_mb: 52, brand_id: "...", version: 1 }`
- Success metric: Upload success rate > 99.5%

---

### F2: Browser 3D Preview (Three.js)

**User Story:** As any user, I want to preview a 3D asset in my browser by rotating and zooming, so that I can inspect it without downloading or opening Unity.

**Acceptance Criteria:**
- [ ] Given an asset detail page, when page loads, then 3D model renders in Three.js viewer within 3 seconds
- [ ] Given the 3D viewer, when user drags, then model rotates smoothly (60fps)
- [ ] Given the 3D viewer, when user scrolls, then model zooms in/out
- [ ] Given the 3D viewer, when user clicks material, then material info tooltip shows
- [ ] Given a very large model (>200MB), then progressive LOD (Level of Detail) loads low-poly first

**Edge Cases:**
- What if model has unsupported shader? → Render with default material, show warning
- What if browser crashes for large model? → Warn user before loading, offer low-poly preview option

---

### F4: Full-text Asset Search

**User Story:** As a creative director, I want to search for assets by name, tag, campaign, or description across all brand libraries, so that I can find reusable assets quickly.

**Acceptance Criteria:**
- [ ] Given the search bar, when user types a query, then autocomplete suggestions appear (debounced 300ms)
- [ ] Given search results, then they are ranked by relevance (Elasticsearch scoring)
- [ ] Given search results, when user filters by format/brand/date, then results update in realtime (faceted search)
- [ ] Given search results, then each result shows: 3D thumbnail, name, brand, format, version count
- [ ] Given user searches across brands, then ACL filters out brands they don't have access to

**Edge Cases:**
- What if no results? → Show "No assets found" with suggestions (did you mean?)
- What if Elasticsearch is down? → Fallback to PostgreSQL LIKE query (slower but functional)

**Analytics:**
- Event: `search_performed`
- Properties: `{ query: "car", result_count: 12, filters: { brand: "Nike" } }`
- Success metric: Search result click-through rate > 60%

---

### F8: IoT Sensor Data Overlay on 3D Model

**User Story:** As an IoT engineer, I want to see live sensor data (temperature, vibration, pressure) overlaid on a 3D digital twin model, so that I can monitor equipment health in spatial context.

**Acceptance Criteria:**
- [ ] Given the Unity client with a factory floor model loaded, then IoT sensors display as colored markers on the 3D model
- [ ] Given live MQTT data, when sensor value changes, then overlay updates within 2 seconds
- [ ] Given sensor color coding, then green = normal, yellow = warning, red = critical
- [ ] Given a sensor marker, when user clicks it, then a tooltip shows: current value, min/max/avg over time
- [ ] Given a critical reading, then system sends push notification to IoT engineer

**Data Flow:**
```
IoT Device → MQTT (Mosquitto) → Kafka bridge → IoT Consumer → TimescaleDB
                                                                    ↓
Unity Client ← SignalR ← Asset API ← query TimescaleDB
```

**Edge Cases:**
- What if MQTT connection drops? → Reconnect with backoff, show "stale data" indicator
- What if sensor produces invalid data? → Validate, discard, log to dead letter queue

---

### F3: Asset Version Management

**User Story:** As a 3D artist, I want to upload new versions of an asset and compare them side by side, so that I can track changes over time and rollback if needed.

**Acceptance Criteria:**
- [ ] Given an existing asset, when user clicks "Upload New Version", then new file is stored as version N+1
- [ ] Given version history, then user sees: version number, upload date, uploader, file size
- [ ] Given any version, when user clicks it, then 3D preview loads that specific version
- [ ] Given any version, when admin clicks "Revert to this version", then this version becomes the latest
- [ ] Given MinIO versioned bucket, then all versions are retained (no data loss)
- [ ] Given Kafka compacted topic, then latest state per asset_id is always available

**Edge Cases:**
- What if user uploads identical file as new version? → Hash check, warn "file is identical to current version"

## Non-functional Requirements

| Requirement | Target |
|-------------|--------|
| Performance | gRPC upload p99 < 500ms (excl. transfer). 3D render first paint < 3s. Search p99 < 500ms |
| Availability | 99.9% uptime |
| Security | API Key for M2M (Unity/IoT), JWT for web, resource-level ACL, OWASP Top 10 |
| Scalability | Support 10,000 assets, 50 concurrent users, 100 IoT sensors |
| Storage | Versioned MinIO buckets, auto-cleanup old versions per retention policy |
| i18n | English (en) + Traditional Chinese (zh-TW) |
| a11y | WCAG 2.1 AA (web portal) |
| IoT | Sensor data latency MQTT → UI < 2 seconds |

## Release Criteria

- [ ] All P0 features implemented and tested
- [ ] No P0/P1 bugs open
- [ ] gRPC upload succeeds for files up to 500MB
- [ ] 3D preview renders GLB in < 3 seconds
- [ ] Elasticsearch search returns results in < 500ms
- [ ] IoT data overlay updates within 2 seconds of sensor change
- [ ] SAST/SCA security scan passes
- [ ] UI matches Figma (Final status)
- [ ] ACL prevents cross-brand data access (tested per tenant)

## Dependencies

| Dependency | Type | Impact |
|-----------|------|--------|
| Three.js | NPM package | Core — browser 3D rendering |
| Unity | Desktop client | IoT overlay + advanced 3D editing |
| gRPC | Protocol | Core — large file streaming |
| Elasticsearch | Docker service | Core — asset search |
| TimescaleDB | Docker service | IoT time-series storage |
| Mosquitto | Docker service | IoT sensor data ingestion |
| Kafka | Docker service | Event streaming (MQTT bridge + asset events) |
| PostgreSQL | Docker service | Asset metadata, user data |
| MinIO | Docker service | 3D file storage (versioned) |
| Redis | Docker service | Cache, Pub/Sub |
| Unleash | Docker service | Feature flags |
| MailHog | Docker service | Email notifications (local) |
| Python + FastAPI | AI Service | Asset auto-tagging (ONNX) |
