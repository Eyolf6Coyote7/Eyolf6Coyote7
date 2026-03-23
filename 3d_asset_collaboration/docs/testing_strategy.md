# Testing Strategy: 3D Asset Collaboration

## Table of Contents

- [Test Pyramid](#test-pyramid)
- [Test Scenarios](#test-scenarios)
- [Platform-specific Tests](#platform-specific-tests)
- [CI Integration](#ci-integration)
- [Test Data Strategy](#test-data-strategy)
- [Test Environment](#test-environment)
- [Regression Strategy](#regression-strategy)
- [Quality Gates](#quality-gates)

---

## Test Pyramid

| Layer | Tool | Target Coverage | What It Tests |
|-------|------|----------------|--------------|
| Unit | xUnit + Moq | > 80% | C# services, domain logic, hexagonal ports |
| Unit | pytest | > 80% | Python AI classification pipeline |
| Unit | Jest + React Testing Library | > 70% | React components, RTK slices, Three.js viewer |
| Integration | Testcontainers (PG + ES + Kafka + MinIO + TimescaleDB) | Key paths | gRPC upload, search, IoT pipeline, ACL |
| E2E | Playwright | Critical flows | Upload → preview → search → share |
| E2E | Unity Test Framework | Critical flows | IoT overlay, asset browsing |
| Load | k6 | SLO thresholds | gRPC upload throughput, ES search, IoT ingestion |

## Test Scenarios

### Unit Tests

| Module | What to Test | Priority | Language |
|--------|-------------|----------|----------|
| IAssetService (port) | CRUD, versioning, ACL check | P0 | C# |
| ISearchService (port) | Query building, facet mapping, ACL filter | P0 | C# |
| IStorageService (port) | Presigned URL generation, bucket scoping | P0 | C# |
| IIoTService (port) | Reading query, threshold check, alert trigger | P0 | C# |
| IAuthService (port) | JWT validation, API Key validation, role mapping | P0 | C# |
| gRPC AssetService | Chunk assembly, resume logic, validation | P0 | C# |
| IoT Consumer | Kafka message deserialization, TimescaleDB write, threshold cache | P0 | C# |
| AI Classifier | Image preprocessing, ONNX inference, tag mapping | P0 | Python |
| AI Pipeline | Multi-angle thumbnail aggregation | P1 | Python |
| RTK assetSlice | Fetch, upload, version actions + selectors | P0 | TypeScript |
| RTK searchSlice | Search, filter, facet state transitions | P0 | TypeScript |
| Three.js Viewer | Model loading, orbit controls init, error handling | P1 | TypeScript |
| Tag Editor | Add/remove tags, AI suggestion display | P1 | TypeScript |
| gRPC-Web Upload | Chunk splitting, progress calculation, resume | P0 | TypeScript |

### Integration Tests

| Flow | What to Test | Dependencies |
|------|-------------|-------------|
| gRPC upload → MinIO versioned | Upload 10MB file via gRPC stream → verify MinIO version created | MinIO + PG (Testcontainers) |
| gRPC upload resume | Upload half → disconnect → resume → complete | MinIO + PG |
| Elasticsearch index + search | Upload asset → ES indexed → search returns it | PG + ES (Testcontainers) |
| Faceted search | Search with brand + format filters → correct results | PG + ES |
| ACL enforcement | User with viewer role → upload returns 403 | PG |
| Brand isolation | Brand A user cannot see Brand B assets | PG + MinIO |
| IoT pipeline E2E | MQTT publish → Kafka → Consumer → TimescaleDB → verify reading | Kafka + TimescaleDB (Testcontainers) |
| IoT alerting | Publish reading above threshold → alert API called | Kafka + TimescaleDB + API mock |
| AI auto-tag | Upload asset → Kafka event → AI service → tags callback → ES updated | PG + ES + Kafka + API mock |
| SignalR IoT | IoT consumer sends alert → SignalR pushes to connected client | SignalR test server |
| Version revert | Upload v1 → v2 → v3 → revert to v1 → verify current = v1 | PG + MinIO |
| Share link | Create share link → access with token → verify permission | PG |

### E2E Tests (Playwright — Web)

| Scenario | Steps | Expected Result |
|----------|-------|----------------|
| Upload + preview | Login → Upload GLB → Wait for processing → 3D preview loads | Model rotatable in Three.js viewer |
| Search | Type query → Autocomplete → Click result → Detail page | Correct asset opens with 3D preview |
| Faceted filter | Search → Filter by format:GLB + brand:Nike → Verify results | Only matching assets shown |
| Version management | Upload v1 → Upload v2 → Compare side-by-side → Revert to v1 | Version history correct, revert works |
| Tagging | Upload → AI suggests tags → Accept 2 → Add 1 manual → Search by tag | Tags saved, searchable |
| Share link | Create share link → Open in incognito → Verify access | Asset visible with correct permission |
| IoT dashboard | Open IoT page → Verify charts render → Verify sensor list | Time-series charts + sensor data visible |

### E2E Tests (Unity)

| Scenario | Steps | Expected Result |
|----------|-------|----------------|
| Login + browse | Enter API Key → Asset browser loads → Search | Assets listed with thumbnails |
| IoT overlay | Load factory scene → Verify markers appear → Click marker | Sensor tooltip shows value |
| IoT alert | Simulate threshold breach → Verify red flash + sound | Alert visual + audio triggers |

### Platform-specific Tests

| Platform | Tool | What to Test |
|----------|------|-------------|
| Web | Playwright | Cross-browser (Chrome, Firefox, Safari), responsive, Three.js rendering |
| Unity | Unity Test Framework | gRPC connection, SignalR reconnect, IoT marker rendering |
| Mobile | Detox (lightweight) | Asset list, notification handling, deep link |
| Python | pytest + httpx | FastAPI endpoints, ONNX inference accuracy |

### Load Tests (k6)

| Scenario | Target | Threshold |
|----------|--------|----------|
| gRPC upload (50MB file) | 10 concurrent uploads | All complete, p99 < 30s |
| REST API throughput | 200 req/s | p99 < 500ms |
| Elasticsearch search | 100 req/s | p99 < 500ms |
| IoT ingestion (MQTT → Kafka → TSDB) | 1000 messages/s | Consumer lag < 2s |
| SignalR connections | 50 concurrent Unity clients | All receive updates < 2s |
| Three.js model load | 50MB GLB file | First paint < 3s (client-side) |

## CI Integration

| Test Type | CI? | When | Blocks Merge? |
|-----------|-----|------|--------------|
| Unit (C#) | ✅ | Every PR | Yes |
| Unit (Python) | ✅ | Every PR | Yes |
| Unit (TypeScript) | ✅ | Every PR | Yes |
| Integration | ✅ | Every PR | Yes |
| E2E (Web) | ✅ | Before release (dev → stable) | Yes |
| E2E (Unity) | ❌ Manual | Before release | No |
| E2E (Mobile) | ❌ Manual | Before release | No |
| Load | ❌ Manual | Before release | No |
| SAST (Semgrep) | ✅ | Every PR | Yes |
| SCA (Trivy) | ✅ | Every PR | Yes |
| Secret scan (gitleaks) | ✅ | Every PR | Yes |

## Test Data Strategy

| Environment | Data Source | Reset |
|-------------|-----------|-------|
| Unit tests | In-memory mocks (Moq / pytest fixtures / Jest mocks) | Every test run |
| Integration | Testcontainers (ephemeral PG + ES + Kafka + MinIO + TimescaleDB) | Every test run |
| E2E | Seed script (EF Core seed + sample GLB files + ES reindex) | Before test suite |
| Load | k6 virtual users with generated 3D files (small GLBs) | Before test run |

> Sample GLB test files stored in `test-fixtures/` directory (< 5MB each). Never use real client assets.

## Test Environment

| Environment | Purpose | How to Run |
|-------------|---------|-----------|
| Local | Developer machine | `docker compose up -d` + `dotnet test` |
| CI | GitHub Actions (ubuntu-latest) | Automated on every PR |
| Staging | Pre-release validation | Full Docker Compose + E2E suite |

## Regression Strategy

| Trigger | What Runs | Purpose |
|---------|----------|---------|
| Every PR | Unit (C# + Python + TS) + Integration + SAST/SCA + gitleaks | Catch regressions early |
| Before release (dev → stable) | Unit + Integration + E2E (web) | Full regression |
| Weekly (scheduled) | Unit + Integration + E2E + dependency scan | Catch env drift |

## Quality Gates

PR cannot merge if any of the following conditions are not met:
- All unit tests pass (C# + Python + TypeScript)
- All integration tests pass
- No lint errors (dotnet format + Ruff + ESLint)
- No security scan findings (Semgrep + Trivy + gitleaks)
- Coverage does not decrease
- No P0/P1 bugs open for this feature
