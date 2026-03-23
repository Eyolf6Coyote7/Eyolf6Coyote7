# System Architecture: Enterprise Workflow System

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
