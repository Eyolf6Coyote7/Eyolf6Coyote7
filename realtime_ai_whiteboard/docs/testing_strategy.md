# Testing Strategy: Realtime AI Whiteboard

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
| Unit | Jest | > 80% | Services, utils, Zustand stores, Yjs adapters |
| Unit | Jest + React Testing Library | > 70% | React components (render, props, events) |
| Integration | Supertest + Testcontainers | Key paths | API endpoints, Prisma queries, tenant isolation |
| Integration | Jest + Yjs mock | Key paths | CRDT sync, conflict resolution |
| E2E | Playwright | Critical flows | Full user journeys (create board, collaborate, AI chat) |
| Visual | Storybook + Chromatic (optional) | All components | Visual regression for UI components |
| Load | k6 | SLO thresholds | WebSocket connections, API throughput |

## Test Scenarios

### Unit Tests

| Module | What to Test | Priority |
|--------|-------------|----------|
| Auth Service | JWT generation, validation, refresh, guest token | P0 |
| Board Service | CRUD, tenant scoping, template initialization | P0 |
| Tenant Middleware | Schema switching, invalid tenant handling | P0 |
| Zustand Stores | State transitions, actions, selectors | P0 |
| Canvas Adapter | Yjs ↔ Fabric.js element mapping | P0 |
| AI Gateway | Task enqueue, SSE stream assembly | P1 |
| API Client | Real/mock switching, error handling | P1 |
| Export Service | PNG/PDF generation from canvas state | P1 |
| i18n | Translation key completeness (en, zh-TW) | P2 |

### Integration Tests

| Flow | What to Test | Dependencies |
|------|-------------|-------------|
| Board CRUD via API | POST/GET/PATCH/DELETE with tenant isolation | PostgreSQL (Testcontainers) |
| Auth flow | Register → Login → JWT → Access board | PostgreSQL |
| Guest access | Generate link → Guest token → Read-only access | PostgreSQL |
| Yjs sync | Two clients sync via WebSocket, verify CRDT merge | Redis (Testcontainers) |
| AI task enqueue | POST prompt → Redis Stream → verify task created | Redis (Testcontainers) |
| Tenant isolation | Tenant A cannot see Tenant B's boards | PostgreSQL (2 schemas) |
| Export | Generate PNG from Yjs state → verify MinIO upload | MinIO (Testcontainers) |

### E2E Tests (Playwright)

| Scenario | Steps | Expected Result |
|----------|-------|----------------|
| Sign up + create board | Register → Login → New Board → Verify canvas | Board visible with empty canvas |
| Realtime collaboration | User A creates element → User B sees it | Element appears for User B |
| AI chat | Open AI panel → Send prompt → Verify response stream | Tokens stream, shapes appear on canvas |
| Guest access | Owner shares link → Guest opens → Verify read-only | Guest sees board, cannot edit |
| Offline → online sync | Edit offline → Reconnect → Verify merge | No data loss, CRDT merge |
| Template selection | Select "Brainstorm" → Verify template elements | Pre-made sticky notes appear |
| Export | Export as PNG → Verify download | PNG file downloads |

### Platform-specific Tests

| Platform | Tool | What to Test |
|----------|------|-------------|
| Web | Playwright | Cross-browser (Chrome, Firefox, Safari), responsive layouts |
| Mobile (RN) | Detox | Touch gestures (draw, pinch zoom, pan), offline mode, push notification handling |

### Load Tests (k6)

| Scenario | Target | Threshold |
|----------|--------|----------|
| API throughput | 100 req/s | p99 < 200ms |
| WebSocket connections | 50 concurrent boards, 10 users each | Connection success > 99% |
| Yjs sync latency | 10 concurrent editors on 1 board | Update visible < 500ms |
| AI task queue | 20 concurrent prompts | Task enqueued < 100ms |

## CI Integration

| Test Type | CI? | When | Blocks Merge? |
|-----------|-----|------|--------------|
| Unit | ✅ | Every PR | Yes |
| Integration | ✅ | Every PR | Yes |
| E2E | ✅ | Before release (dev → stable) | Yes |
| Visual (Storybook) | ✅ | Every PR with UI changes | No (warning only) |
| Load | ❌ Manual | Before release | No |
| SAST (Semgrep) | ✅ | Every PR | Yes |
| SCA (Trivy) | ✅ | Every PR | Yes |
| Secret scan (gitleaks) | ✅ | Every PR | Yes |

## Test Data Strategy

| Environment | Data Source | Reset |
|-------------|-----------|-------|
| Unit tests | In-memory mocks / fixtures | Every test run |
| Integration | Testcontainers (ephemeral PostgreSQL + Redis) | Every test run |
| E2E | Seed script (`prisma db seed`) | Before test suite |
| Load | k6 virtual users with generated data | Before test run |

> Never use production data for testing. Always use generated/seeded data.

## Test Environment

| Environment | Purpose | How to Run |
|-------------|---------|-----------|
| Local | Developer machine | `docker compose up -d` + `npm test` |
| CI | GitHub Actions (ubuntu-latest) | Automated on every PR |
| Staging | Pre-release validation | `docker compose -f docker-compose.yml up -d` + full E2E |

## Regression Strategy

| Trigger | What Runs | Purpose |
|---------|----------|---------|
| Every PR | Unit + Integration + SAST/SCA + gitleaks | Catch regressions early |
| Before release (dev → stable) | Unit + Integration + E2E | Full regression |
| Weekly (scheduled) | Unit + Integration + E2E + dependency scan | Catch env drift |

## Quality Gates

PR cannot merge if any of the following conditions are not met:
- All unit tests pass
- All integration tests pass
- No lint errors (ESLint + Prettier)
- No security scan findings (Semgrep + Trivy + gitleaks)
- Coverage does not decrease
- No P0/P1 bugs open for this feature
