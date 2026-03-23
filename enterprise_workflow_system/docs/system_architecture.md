# System Architecture: Enterprise Workflow System

## Table of Contents

- [Architecture Pattern](#architecture-pattern)
- [C4 Model](#c4-model)
  - [Level 1: System Context](#level-1-system-context)
  - [Level 2: Container Diagram](#level-2-container-diagram)
  - [Level 3: Component Diagram (Workflow API — Clean Architecture)](#level-3-component-diagram-workflow-api-clean-architecture)
  - [Level 3: Component Diagram (Admin API — Laravel)](#level-3-component-diagram-admin-api-laravel)
  - [Level 3: Component Diagram (Employee Portal — Vue 3)](#level-3-component-diagram-employee-portal-vue-3)
  - [Level 3: Component Diagram (Admin Dashboard — Vue 3)](#level-3-component-diagram-admin-dashboard-vue-3)
  - [Level 3: Component Diagram (Mobile App — Kotlin + Swift)](#level-3-component-diagram-mobile-app-kotlin-swift)
- [Component Overview](#component-overview)
- [Data Flow (Sequence Diagrams)](#data-flow-sequence-diagrams)
  - [Flow 1: Submit Approval Request](#flow-1-submit-approval-request)
  - [Flow 2: Mobile Approval](#flow-2-mobile-approval)
  - [Flow 3: Auto-Escalation](#flow-3-auto-escalation)
  - [Flow 4: Compliance Audit Report](#flow-4-compliance-audit-report)
- [API Contracts (High-level)](#api-contracts-high-level)
- [Database Schema (High-level)](#database-schema-high-level)
- [Deployment Diagram](#deployment-diagram)
- [Security Architecture](#security-architecture)
- [Infrastructure Dependencies](#infrastructure-dependencies)
- [Scalability Considerations](#scalability-considerations)
- [ADRs Created](#adrs-created)

---


## Architecture Pattern

**Clean Architecture + DDD + CQRS + EDA** — Spring Boot backend with domain-driven layering, command/query separation (write via Temporal + Kafka, read via dedicated read model), and event-driven communication. Admin Panel is a separate Laravel service.

## C4 Model

### Level 1: System Context

```mermaid
graph TD
  EMP[Employee<br/>Browser / Mobile] --> SYS[Workflow System]
  ADM[Admin<br/>Browser] --> SYS
  SYS --> KC[Keycloak<br/>SSO + 2FA]
  SYS --> INFRA[Shared Infrastructure<br/>PostgreSQL, Redis, Kafka, etc.]
  SYS --> MH[MailHog<br/>Email Notifications]
  SYS --> FCM[FCM / APNs<br/>Push Notifications]
```

### Level 2: Container Diagram

```mermaid
graph TD
  subgraph "Frontend"
    PORTAL[Employee Portal<br/>Vue 3 + Element Plus]
    ADMIN[Admin Dashboard<br/>Vue 3 + Element Plus]
    MOBILE[Mobile App<br/>Kotlin + Swift]
  end

  subgraph "Backend"
    API[Workflow API<br/>Spring Boot + GraphQL]
    ADM_API[Admin API<br/>Laravel PHP]
    NW[Notification Worker<br/>Kafka Consumer]
  end

  subgraph "Workflow Engine"
    TMP[Temporal<br/>Durable Workflows]
  end

  subgraph "Infrastructure"
    PG[(PostgreSQL<br/>row-level org_id)]
    RD[(Redis<br/>Cache + Session)]
    KF[(Kafka<br/>Event Sourcing + Notifications)]
    MIO[(MinIO<br/>Attachments)]
    KC[Keycloak<br/>SSO + RBAC + 2FA]
    UL[Unleash<br/>Feature Flags]
    MH[MailHog<br/>SMTP]
  end

  PORTAL -->|GraphQL| API
  ADMIN -->|REST| ADM_API
  MOBILE -->|GraphQL| API
  API --> TMP
  API --> PG
  API --> RD
  API --> MIO
  API --> KC
  API --> UL
  API -->|produce events| KF
  ADM_API --> PG
  ADM_API --> KC
  ADM_API --> UL
  TMP --> PG
  TMP -->|workflow events| KF
  NW -->|consume| KF
  NW -->|push| FCM[FCM / APNs]
  NW -->|email| MH
```

### Level 3: Component Diagram (Workflow API — Clean Architecture)

```mermaid
graph TD
  subgraph "Controller Layer"
    GQL[GraphQL Resolvers]
    REST_INT[Internal REST<br/>for Temporal callbacks]
  end

  subgraph "Application Layer (Use Cases)"
    CMD_SUBMIT[SubmitRequestCmd]
    CMD_APPROVE[ApproveStepCmd]
    CMD_REJECT[RejectStepCmd]
    CMD_ESCALATE[EscalateStepCmd]
    QRY_LIST[ListRequestsQuery]
    QRY_DETAIL[RequestDetailQuery]
    QRY_QUEUE[ApprovalQueueQuery]
  end

  subgraph "Domain Layer (DDD)"
    AGG_WF[Workflow Aggregate Root]
    AGG_STEP[ApprovalStep Entity]
    VO_STATUS[Status Value Object]
    EVT[Domain Events<br/>StepApproved, StepRejected, WorkflowCompleted]
  end

  subgraph "Infrastructure Layer"
    REPO_WF[WorkflowRepository<br/>Exposed ORM]
    REPO_USER[UserRepository]
    KAFKA_P[KafkaProducer<br/>audit-log + notifications]
    TEMPORAL_C[TemporalClient]
    KC_C[KeycloakClient]
    MINIO_C[MinIOClient]
    REDIS_C[RedisClient]
  end

  GQL --> CMD_SUBMIT
  GQL --> CMD_APPROVE
  GQL --> QRY_LIST
  GQL --> QRY_DETAIL
  CMD_SUBMIT --> AGG_WF
  CMD_APPROVE --> AGG_STEP
  AGG_WF --> EVT
  AGG_STEP --> EVT
  EVT --> KAFKA_P
  CMD_SUBMIT --> TEMPORAL_C
  REPO_WF --> PG[(PostgreSQL)]
  KAFKA_P --> KF[(Kafka)]
```

### Level 3: Component Diagram (Admin API — Laravel)

```mermaid
graph TD
  subgraph "Admin API (Laravel)"
    CTRL_USER[UserController<br/>Keycloak CRUD]
    CTRL_TMPL[TemplateController<br/>Workflow Template CRUD]
    CTRL_AUDIT[AuditController<br/>Kafka Read Model]
    CTRL_CONFIG[ConfigController<br/>Remote Config + Feature Flags]
    CTRL_DASH[DashboardController<br/>KPI Queries]
  end

  CTRL_USER --> KC[(Keycloak API)]
  CTRL_TMPL --> PG[(PostgreSQL)]
  CTRL_AUDIT --> PG
  CTRL_CONFIG --> UL[(Unleash API)]
  CTRL_DASH --> PG
```

### Level 3: Component Diagram (Employee Portal — Vue 3)

```mermaid
graph TD
  subgraph "Employee Portal (Vue 3 + Element Plus)"
    ROUTER_E[Vue Router<br/>Pages + Guards]
    STORE_E[Pinia Stores<br/>auth, requests, approvals, ui]
    GQL_CLIENT[GraphQL Client<br/>Apollo or urql]
    FORM[Dynamic Form Renderer<br/>JSON Schema → Vue components]
    TIMELINE[Status Timeline<br/>Approval chain visualization]
    NOTIF[Notification Center<br/>Toast + badge]
    I18N_E[i18n<br/>vue-i18n]
    API_E[API Client<br/>Real / Mock switching]
  end

  ROUTER_E --> STORE_E
  ROUTER_E --> FORM
  ROUTER_E --> TIMELINE
  STORE_E --> API_E
  API_E --> GQL_CLIENT
  GQL_CLIENT -->|GraphQL| WF_API[Workflow API]
  NOTIF --> STORE_E
```

#### Employee Portal — Key Modules

| Module | Responsibility | Key Libraries |
|--------|---------------|---------------|
| Router | Page routing, auth guards (Keycloak redirect) | Vue Router v4 |
| Stores | Global state (auth, requests, approvals, UI) | Pinia |
| GraphQL Client | Query/mutation/subscription to Workflow API | Apollo Client or urql |
| Dynamic Form | Render form from template JSON schema | VeeValidate + Zod |
| Status Timeline | Visual approval chain (dots + lines + status) | Custom component |
| Notification Center | Toast messages + unread badge count | Element Plus ElNotification |
| i18n | Multi-language (en, zh-TW) | vue-i18n |
| API Client | Real/mock switching by env | Wrapper for GraphQL client; Axios for file uploads only |

#### Employee Portal — Route Structure

| Route | Page | Auth |
|-------|------|------|
| `/auth` | Keycloak SSO redirect | Public |
| `/` | Dashboard (stats + my requests) | JWT (Keycloak) |
| `/request/new` | New Request (template selector + form) | JWT |
| `/request/:id` | Request Detail (timeline + attachments) | JWT |
| `/approvals` | Approval Queue (filterable list) | JWT (manager+) |
| `/history` | My History (past requests) | JWT |
| `/profile` | Profile + 2FA settings | JWT |

### Level 3: Component Diagram (Admin Dashboard — Vue 3)

```mermaid
graph TD
  subgraph "Admin Dashboard (Vue 3 + Element Plus)"
    ROUTER_A[Vue Router<br/>Admin pages + role guard]
    STORE_A[Pinia Stores<br/>users, templates, audit, config]
    TMPL_EDITOR[Template Editor<br/>Drag-and-drop step builder]
    AUDIT_VIEWER[Audit Log Viewer<br/>Filterable table + export]
    KPI_DASH[KPI Dashboard<br/>ECharts charts]
    USER_MGMT[User Management<br/>CRUD table + role editor]
    CONFIG_EDITOR[Config Editor<br/>Branding + notification templates]
    API_A[API Client<br/>REST to Admin API (Laravel)]
  end

  ROUTER_A --> STORE_A
  ROUTER_A --> TMPL_EDITOR
  ROUTER_A --> AUDIT_VIEWER
  ROUTER_A --> KPI_DASH
  ROUTER_A --> USER_MGMT
  ROUTER_A --> CONFIG_EDITOR
  API_A -->|REST| ADM_API[Admin API - Laravel]
```

#### Admin Dashboard — Key Modules

| Module | Responsibility | Key Libraries |
|--------|---------------|---------------|
| Router | Admin pages, role-based guard (admin only) | Vue Router v4 |
| Stores | Admin state (users, templates, audit, config) | Pinia |
| Template Editor | Drag-and-drop workflow step builder | vuedraggable + custom |
| Audit Log Viewer | Filterable table, date range, export CSV/PDF | Element Plus ElTable |
| KPI Dashboard | Charts (turnaround time, volume, escalation rate) | ECharts |
| User Management | CRUD table, role badges, invite | Element Plus ElTable + ElDialog |
| Config Editor | Branding (colors, logo), notification templates | Custom form |
| API Client | REST calls to Laravel Admin API | Axios |

#### Admin Dashboard — Route Structure

| Route | Page | Auth |
|-------|------|------|
| `/admin` | KPI Dashboard | JWT (admin) |
| `/admin/users` | User Management | JWT (admin) |
| `/admin/templates` | Workflow Templates List | JWT (admin) |
| `/admin/templates/:id` | Template Editor | JWT (admin) |
| `/admin/audit` | Audit Log Viewer | JWT (admin) |
| `/admin/features` | Feature Toggle Management | JWT (admin) |
| `/admin/config` | Remote Config Editor | JWT (admin) |

### Level 3: Component Diagram (Mobile App — Kotlin + Swift)

```mermaid
graph TD
  subgraph "Mobile App"
    subgraph "Shared Architecture (MVVM)"
      VM_AUTH[AuthViewModel<br/>Keycloak SSO + 2FA]
      VM_QUEUE[ApprovalQueueViewModel<br/>Pending items]
      VM_DETAIL[RequestDetailViewModel<br/>Steps + attachments]
      VM_REQUESTS[MyRequestsViewModel<br/>History]
      REPO_M[Repository Layer<br/>API + Local Cache]
    end

    subgraph "Android (Kotlin)"
      NAV_A[Jetpack Navigation<br/>Bottom nav + stack]
      UI_A[Jetpack Compose<br/>Material 3]
      OFFLINE_A[Room DB<br/>Offline queue]
      PUSH_A[FCM<br/>Firebase Messaging]
    end

    subgraph "iOS (Swift)"
      NAV_I[UIKit Navigation<br/>Tab bar + stack]
      UI_I[SwiftUI<br/>Views]
      OFFLINE_I[Core Data<br/>Offline queue]
      PUSH_I[APNs<br/>Push Notifications]
    end
  end

  VM_QUEUE --> REPO_M
  VM_DETAIL --> REPO_M
  REPO_M -->|GraphQL| API[Workflow API]
  REPO_M --> OFFLINE_A
  REPO_M --> OFFLINE_I
```

#### Mobile App — Key Modules

| Module | Android (Kotlin) | iOS (Swift) |
|--------|-----------------|-------------|
| Architecture | MVVM + Repository | MVVM + Repository |
| UI Framework | Jetpack Compose + Material 3 | SwiftUI |
| Navigation | Jetpack Navigation (bottom nav + stack) | UIKit TabBarController + NavigationController |
| GraphQL | Apollo Kotlin | Apollo iOS |
| Offline Cache | Room DB (SQLite) | Core Data |
| Push | FCM (Firebase Cloud Messaging) | APNs |
| Auth | Keycloak AppAuth (OAuth2 PKCE) | Keycloak AppAuth |
| Swipe Actions | `SwipeToDismiss` composable | `UISwipeActionsConfiguration` |
| Haptics | `HapticFeedbackConstants` | `UIImpactFeedbackGenerator` |

#### Mobile App — Navigation Structure

| Tab | Screens | Auth |
|-----|---------|------|
| Home | Dashboard → Request Detail | JWT (Keycloak) |
| Approvals | Approval Queue → Request Detail → Approve/Reject | JWT (manager+) |
| My Requests | Request List → Request Detail | JWT |
| Profile | Profile + 2FA + Notification Settings | JWT |

#### Mobile App — Offline Strategy

```
Online:
  GraphQL query → API → display

Offline:
  Data request → Room/CoreData cache → display
  Approve action → queue in local DB

Reconnect:
  Sync queued approvals → API
  Refresh cache from API
```

## Component Overview

| Component | Tech | System | Responsibility |
|-----------|------|--------|---------------|
| Employee Portal | Vue 3 + Pinia + Element Plus | Frontend | Submit requests, track status, approve/reject |
| Admin Dashboard | Vue 3 + Element Plus | Frontend | User mgmt, templates, audit log, config |
| Mobile App | Kotlin (Android) + Swift (iOS) | Frontend | Mobile approval, push notifications |
| Workflow API | Spring Boot + Kotlin + GraphQL (DGS) | Backend | Core business logic, CQRS, Temporal orchestration |
| Admin API | Laravel (PHP) | Backend | CMS, user mgmt, config, audit read model |
| Notification Worker | Kafka Consumer (Kotlin) | Worker | Push (FCM/APNs) + Email (MailHog) notifications |
| Temporal | Temporal Server | Engine | Durable workflow orchestration |

## Data Flow (Sequence Diagrams)

### Flow 1: Submit Approval Request

```mermaid
sequenceDiagram
  actor Wei as Wei (Engineer)
  participant Portal as Employee Portal
  participant API as Workflow API
  participant TMP as Temporal
  participant PG as PostgreSQL
  participant KF as Kafka
  participant MIO as MinIO

  Wei->>Portal: Fill form + attach spec sheet
  Portal->>API: mutation submitRequest {title, fields, attachment}
  API->>MIO: Upload attachment
  MIO-->>API: file_url
  API->>TMP: Start workflow (template, assignees, form_data, file_url)
  TMP->>PG: Activity: INSERT workflow + first step
  TMP->>KF: Activity: Produce audit event (request_submitted)
  TMP->>KF: Activity: Produce notification event (step_pending)
  TMP-->>API: workflow_run_id
  API-->>Portal: {request_id, status: "pending"}
  Portal-->>Wei: "Request submitted — pending Manager review"

  Note over KF: Notification Worker consumes
```

### Flow 2: Mobile Approval

```mermaid
sequenceDiagram
  actor Lin as Lin (Manager)
  participant Push as FCM / APNs
  participant Mobile as Mobile App
  participant API as Workflow API
  participant TMP as Temporal
  participant KF as Kafka

  Push->>Lin: "Equipment Purchase #1234 needs approval"
  Lin->>Mobile: Tap notification
  Mobile->>API: query requestDetail(id: "1234")
  API-->>Mobile: {title, fields, attachments, status}
  Lin->>Mobile: Tap "Approve" + add comment
  Mobile->>API: mutation approveStep(id, comment)
  API->>TMP: Signal workflow (step_approved)
  TMP->>TMP: Advance to next step (or complete)
  API->>KF: Produce audit event (step_approved, exactly-once)
  API->>KF: Produce notification event (next_step_pending)
  API-->>Mobile: {status: "approved"}
  Mobile-->>Lin: Success haptic + "Approved"
```

### Flow 3: Auto-Escalation

```mermaid
sequenceDiagram
  participant TMP as Temporal
  participant API as Workflow API
  participant PG as PostgreSQL
  participant KF as Kafka

  Note over TMP: 48h timeout expires
  TMP->>TMP: Escalation activity triggered
  TMP->>PG: Activity: UPDATE step assignee to manager's manager
  TMP->>KF: Activity: Produce audit event (step_escalated)
  TMP->>KF: Activity: Produce notification event (escalation)
  Note over KF: Notification Worker sends push + email
```

### Flow 4: Compliance Audit Report

```mermaid
sequenceDiagram
  actor Huang as Huang (Compliance)
  participant Admin as Admin Dashboard
  participant ADM_API as Admin API (Laravel)
  participant PG as PostgreSQL

  Huang->>Admin: Open Audit Log, filter Q1 2026
  Admin->>ADM_API: GET /api/audit?from=2026-01&to=2026-03&type=equipment
  ADM_API->>PG: Query CQRS read model (materialized from Kafka)
  PG-->>ADM_API: Audit events
  ADM_API-->>Admin: {events: [...]}
  Huang->>Admin: Click "Export CSV"
  Admin->>ADM_API: GET /api/audit/export?format=csv&...
  ADM_API-->>Admin: CSV file download
```

## API Contracts (High-level)

| Endpoint | Protocol | System | Direction | Description |
|----------|----------|--------|-----------|-------------|
| `query requestDetail` | GraphQL | Workflow API | Client → Server | Get request with steps + attachments |
| `query approvalQueue` | GraphQL | Workflow API | Client → Server | List pending approvals for current user |
| `mutation submitRequest` | GraphQL | Workflow API | Client → Server | Create new approval request |
| `mutation approveStep` | GraphQL | Workflow API | Client → Server | Approve a pending step |
| `mutation rejectStep` | GraphQL | Workflow API | Client → Server | Reject with reason |
| `GET /api/users` | REST | Admin API | Admin → Server | List users (via Keycloak) |
| `POST /api/templates` | REST | Admin API | Admin → Server | Create workflow template |
| `GET /api/audit` | REST | Admin API | Admin → Server | Query audit log |
| `workflow.approval-events` | Kafka | — | Producer → Consumer | Immutable approval state changes |
| `workflow.audit-log` | Kafka | — | Producer → Consumer | Compliance audit trail (exactly-once) |
| `workflow.notifications` | Kafka | — | Producer → Consumer | Async notification dispatch |

## Database Schema (High-level)

```mermaid
erDiagram
  ORGANIZATION ||--o{ USER : has
  ORGANIZATION ||--o{ WORKFLOW_TEMPLATE : owns
  USER ||--o{ WORKFLOW : submits
  WORKFLOW_TEMPLATE ||--o{ WORKFLOW : creates
  WORKFLOW ||--o{ APPROVAL_STEP : has
  APPROVAL_STEP ||--o{ STEP_COMMENT : has
  WORKFLOW ||--o{ ATTACHMENT : has
  USER ||--o{ APPROVAL_STEP : "assigned to"

  ORGANIZATION {
    uuid id PK
    string name
    string plan
  }
  USER {
    uuid id PK
    uuid org_id FK
    string keycloak_id
    string role "admin|manager|employee"
  }
  WORKFLOW {
    uuid id PK
    uuid org_id FK
    uuid submitter_id FK
    uuid template_id FK
    string status "pending|in_progress|approved|rejected"
    jsonb form_data
    string temporal_run_id
    timestamp created_at
  }
  APPROVAL_STEP {
    uuid id PK
    uuid workflow_id FK
    uuid assignee_id FK
    int step_order
    string type "sequential|parallel"
    string status "pending|approved|rejected|escalated"
    timestamp deadline
    timestamp completed_at
  }
  WORKFLOW_TEMPLATE {
    uuid id PK
    uuid org_id FK
    string name
    jsonb step_definitions
    boolean published
  }
```

## Deployment Diagram

```mermaid
graph LR
  subgraph "Docker Compose"
    PG[(PostgreSQL :5432)]
    RD[(Redis :6379)]
    KF[(Kafka :9092)]
    MIO[(MinIO :9000)]
    KC[Keycloak :8080]
    UL[Unleash :4242]
    MH[MailHog :1025/:8025]
    TMP[Temporal :7233]
  end

  subgraph "Host (local dev)"
    API[Spring Boot :4002]
    ADM_API[Laravel :4012]
    NW[Notification Worker]
    PORTAL[Vue Dev Server :3002]
    ADMIN[Admin Dev Server :3012]
    SB[Storybook :6007]
  end

  PORTAL --> API
  ADMIN --> ADM_API
  API --> PG
  API --> RD
  API --> KF
  API --> MIO
  API --> KC
  API --> UL
  API --> TMP
  ADM_API --> PG
  ADM_API --> KC
  NW --> KF
  NW --> MH
```

## Security Architecture

| Layer | Measure |
|-------|---------|
| Auth | Keycloak OAuth2 Authorization Code Flow. SSO across Portal + Admin + Mobile. |
| 2FA | Keycloak TOTP (Google Authenticator). Email OTP fallback via MailHog. |
| Authorization | RBAC: Admin (full access), Manager (approve + view team), Employee (submit + view own). |
| Multi-tenancy | Row-level isolation with `org_id` on every table. Enforced in repository layer. |
| Data in transit | HTTPS (GraphQL), WSS (subscriptions). TLS-ready. |
| Data at rest | MinIO SSE-S3 for attachments. PostgreSQL encryption (planned). |
| Audit integrity | Kafka exactly-once semantics. Append-only topic. No update/delete. |
| Secrets | `.env` files. Keycloak client secrets rotated. |
| Input validation | Kotlin data classes with Bean Validation. GraphQL input types validated. |
| CORS | Whitelist Portal, Admin, and Mobile origins. |
| Dependencies | SAST (Semgrep) + SCA (Trivy) in CI. |

## Infrastructure Dependencies

| Service | Purpose | Port |
|---------|---------|------|
| PostgreSQL | Workflow data, audit read model | 5432 |
| Redis | Cache, session store | 6379 |
| Kafka | Event sourcing (audit), notifications, analytics | 9092 |
| MinIO | File attachments | 9000 |
| Keycloak | SSO, RBAC, 2FA | 8080 |
| Unleash | Feature flags | 4242 |
| MailHog | Email notifications (local SMTP) | 1025/8025 |
| Temporal | Durable workflow engine | 7233 |

## Scalability Considerations

| Concern | Current (local) | Production Strategy |
|---------|-----------------|-------------------|
| Users | Single API instance | Horizontal behind load balancer |
| Workflows | Single Temporal | Temporal cluster (multi-worker) |
| Audit log | Single Kafka broker | Multi-broker Kafka cluster with replication |
| Database | Single PostgreSQL | Read replicas for CQRS read model |
| Notifications | Single consumer | Kafka consumer group (multiple workers) |
| File storage | Single MinIO | S3 in cloud |
| Auth | Single Keycloak | Keycloak cluster with shared DB |

## ADRs Created

- [ADR-0001: Why Temporal over Bull for workflow orchestration](adrs/ADR-0001-why-temporal-over-bull.md)
- [ADR-0002: Why GraphQL over REST for Workflow API](adrs/ADR-0002-why-graphql-over-rest.md)
- [ADR-0003: Why Kafka event sourcing for audit log](adrs/ADR-0003-why-kafka-event-sourcing-audit.md)
- [ADR-0004: Why Laravel for Admin Panel](adrs/ADR-0004-why-laravel-for-admin.md)
- [ADR-0005: Why CQRS for approval data access](adrs/ADR-0005-why-cqrs.md)
