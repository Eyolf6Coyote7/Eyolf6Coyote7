# Testing Strategy: Enterprise Workflow System

## Table of Contents

- [Test Pyramid](#test-pyramid)
- [Test Scenarios](#test-scenarios)
- [Platform-specific Tests](#platform-specific-tests)
- [Load Tests](#load-tests)
- [CI Integration](#ci-integration)
- [Test Data Strategy](#test-data-strategy)
- [Test Environment](#test-environment)
- [Regression Strategy](#regression-strategy)
- [Quality Gates](#quality-gates)

---

## Test Pyramid

| Layer | Tool | Target Coverage | What It Tests |
|-------|------|----------------|--------------|
| Unit | JUnit 5 + MockK | > 80% | Services, domain logic, use cases, value objects |
| Unit | Jest + Vue Test Utils | > 70% | Vue components, Pinia stores |
| Unit | PHPUnit | > 70% | Laravel controllers, services |
| Integration | Testcontainers (PG + Kafka + Temporal) | Key paths | Workflow execution, audit events, CQRS read model |
| E2E | Playwright | Critical flows | Full approval lifecycle (submit → approve → audit) |
| E2E | Espresso (Android) / XCTest (iOS) | Critical flows | Mobile approval flow |
| Load | k6 | SLO thresholds | GraphQL throughput, Temporal workflow capacity |

## Test Scenarios

### Unit Tests

| Module | What to Test | Priority | Language |
|--------|-------------|----------|----------|
| SubmitRequestCmd | Input validation, template lookup, Temporal start | P0 | Kotlin |
| ApproveStepCmd | Permission check, Temporal signal, audit event | P0 | Kotlin |
| RejectStepCmd | Reason required, Temporal signal, notification trigger | P0 | Kotlin |
| Workflow Aggregate | Status transitions (pending → in_progress → approved/rejected) | P0 | Kotlin |
| ApprovalStep Entity | Deadline calculation, escalation check | P0 | Kotlin |
| Status Value Object | Valid state transitions, invalid transitions throw | P0 | Kotlin |
| GraphQL Resolvers | Query/mutation mapping, auth context, DataLoader | P1 | Kotlin |
| Pinia authStore | Login/logout, token refresh, role check | P0 | TypeScript |
| Pinia requestStore | Fetch, submit, optimistic update | P0 | TypeScript |
| Dynamic Form Renderer | Render from JSON schema, validation (Zod) | P0 | TypeScript |
| Template Editor | Step ordering, parallel branch validation | P1 | TypeScript |
| Laravel UserController | Keycloak API mock, CRUD operations | P1 | PHP |
| Laravel AuditController | Date range filter, export format | P1 | PHP |

### Integration Tests

| Flow | What to Test | Dependencies |
|------|-------------|-------------|
| Submit → Temporal workflow starts | GraphQL mutation → Temporal activity creates DB records + Kafka event | PG + Temporal + Kafka (Testcontainers) |
| Approve → Temporal advances | Signal Temporal → next step pending → audit event produced | PG + Temporal + Kafka |
| Parallel approval | Both approvers must approve before workflow advances | PG + Temporal |
| Auto-escalation | Temporal timeout → reassign step → audit event | PG + Temporal + Kafka |
| Audit CQRS materializer | Kafka audit event → audit_read_model INSERT | PG + Kafka |
| Tenant isolation | Org A cannot query Org B's workflows (row-level org_id) | PG |
| Keycloak token validation | Valid token → authorized, expired → 401, wrong role → 403 | Keycloak (Testcontainers or mock) |
| File attachment | Upload → MinIO store → link to workflow | PG + MinIO |
| Notification dispatch | Kafka notification event → FCM/email mock called | Kafka |

### E2E Tests (Playwright — Web)

| Scenario | Steps | Expected Result |
|----------|-------|----------------|
| Submit request | Login (SSO) → New Request → Select template → Fill form → Attach file → Submit | Status shows "Pending — Manager Review" |
| Approve request | Login as manager → Approval Queue → Click request → Approve with comment | Status shows "Approved", requester notified |
| Reject request | Login as manager → Approval Queue → Click request → Reject with reason | Status shows "Rejected" with reason |
| Full approval chain | Submit → Manager approve → Director approve → Complete | Final status "Approved" |
| Audit log | Login as admin → Admin Dashboard → Audit Log → Filter by date → Export CSV | CSV downloads with correct events |
| Template creation | Login as admin → Templates → New → Drag steps → Publish | Template appears in employee's New Request |
| 2FA login | Login → Enter TOTP code → Dashboard | Successfully authenticated with 2FA |

### E2E Tests (Mobile)

| Scenario | Platform | Steps | Expected Result |
|----------|----------|-------|----------------|
| Mobile approve | Android + iOS | Push notification → Open app → Tap request → Swipe to approve | Success haptic + status updated |
| Mobile reject | Android + iOS | Open queue → Tap request → Swipe to reject → Enter reason | Warning haptic + reason saved |
| Offline approve | Android + iOS | Go offline → Approve → Reconnect | Approval syncs to server |

### Platform-specific Tests

| Platform | Tool | What to Test |
|----------|------|-------------|
| Web | Playwright | Cross-browser (Chrome, Firefox, Safari), responsive (desktop + tablet) |
| Android | Espresso | Swipe gestures, push notification deep link, offline queue sync |
| iOS | XCTest | Swipe gestures, push notification deep link, offline queue sync |

### Load Tests (k6)

| Scenario | Target | Threshold |
|----------|--------|----------|
| GraphQL query throughput | 200 req/s | p99 < 300ms |
| Submit request | 50 concurrent submissions | p99 < 500ms |
| Temporal workflow capacity | 100 concurrent active workflows | All complete within timeout |
| Kafka audit throughput | 500 events/s | Consumer lag < 1s |

## CI Integration

| Test Type | CI? | When | Blocks Merge? |
|-----------|-----|------|--------------|
| Unit (Kotlin) | ✅ | Every PR | Yes |
| Unit (TypeScript) | ✅ | Every PR | Yes |
| Unit (PHP) | ✅ | Every PR | Yes |
| Integration | ✅ | Every PR | Yes |
| E2E (Web) | ✅ | Before release (dev → stable) | Yes |
| E2E (Mobile) | ❌ Manual | Before release | No |
| Load | ❌ Manual | Before release | No |
| SAST (Semgrep) | ✅ | Every PR | Yes |
| SCA (Trivy) | ✅ | Every PR | Yes |
| Secret scan (gitleaks) | ✅ | Every PR | Yes |

## Test Data Strategy

| Environment | Data Source | Reset |
|-------------|-----------|-------|
| Unit tests | In-memory mocks (MockK / Jest mocks / Mockery) | Every test run |
| Integration | Testcontainers (ephemeral PG + Kafka + Temporal) | Every test run |
| E2E | Seed script (Flyway + Keycloak realm export) | Before test suite |
| Load | k6 virtual users with generated data | Before test run |

> Never use production data. Keycloak test realm exported as JSON for repeatable E2E setup.

## Test Environment

| Environment | Purpose | How to Run |
|-------------|---------|-----------|
| Local | Developer machine | `docker compose up -d` + `./gradlew test` |
| CI | GitHub Actions (ubuntu-latest) | Automated on every PR |
| Staging | Pre-release validation | Full Docker Compose + E2E suite |

## Regression Strategy

| Trigger | What Runs | Purpose |
|---------|----------|---------|
| Every PR | Unit (all 3 langs) + Integration + SAST/SCA + gitleaks | Catch regressions early |
| Before release (dev → stable) | Unit + Integration + E2E (web) | Full regression |
| Weekly (scheduled) | Unit + Integration + E2E + dependency scan | Catch env drift |

## Quality Gates

PR cannot merge if any of the following conditions are not met:
- All unit tests pass (Kotlin + TypeScript + PHP)
- All integration tests pass
- No lint errors (ktlint + ESLint + PHP-CS-Fixer)
- No security scan findings (Semgrep + Trivy + gitleaks)
- Coverage does not decrease
- No P0/P1 bugs open for this feature
