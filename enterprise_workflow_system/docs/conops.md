# ConOps: Enterprise Workflow System

## Product Vision

A multi-step approval and task management system for semiconductor manufacturing — enabling configurable approval chains, compliance audit trails, and role-based access control, powered by a durable workflow engine (Temporal) and event-driven architecture (Kafka).

## Industry Context

**Industry:** Semiconductor / Manufacturing

**Market:** Semiconductor companies operate under strict regulatory compliance (ISO 9001, IATF 16949, SOC 2). Every equipment purchase, process change, and engineering change order (ECO) requires multi-level approval with a complete audit trail. Most companies still use email chains or legacy systems (SAP, Oracle) that are slow, hard to customize, and lack modern UX.

**Positioning:** A modern, configurable workflow engine that replaces rigid legacy approval systems. Unlike Jira (general-purpose) or ServiceNow (expensive, complex), this system is purpose-built for manufacturing approval workflows with compliance-grade audit logging.

## Competitive Analysis

| Competitor | Strengths | Weaknesses | Our Differentiator |
|-----------|-----------|------------|-------------------|
| Jira | Widely adopted, flexible | Not built for approval workflows, no audit compliance | Purpose-built approval chains with Temporal orchestration |
| ServiceNow | Enterprise-grade, compliance | Extremely expensive, complex setup, slow customization | Lightweight, self-hosted, fast to configure |
| SAP Workflow | Deep ERP integration | Legacy UI, rigid, requires consultants | Modern Vue 3 UI, GraphQL API, mobile-first |
| Custom Excel/Email | Free, everyone knows it | No audit trail, no automation, error-prone | Automated routing, notification, full audit log |

## Stakeholder Map

| Stakeholder | Role | Interest | Influence |
|-------------|------|----------|-----------|
| Employee | Submits requests (purchase, ECO, leave) | High — needs fast submission and status tracking | Low |
| Manager | Reviews and approves/rejects requests | High — needs clear queue, mobile approval | Medium |
| Admin | Configures workflows, manages users, views audit logs | High — needs admin dashboard | High |
| Compliance Officer | Audits approval history for regulatory review | High — needs immutable audit trail | High |
| IT / DevOps | Maintains the system | Medium — needs stable, observable system | Medium |

## Target Users

| Persona | Role | Goal | Pain Point |
|---------|------|------|------------|
| **Wei (Engineer)** | Process engineer at semiconductor fab | Submit equipment purchase requests quickly | Current SAP form takes 20 clicks, no mobile support |
| **Lin (Manager)** | Engineering manager, approves team requests | Review and approve requests from phone while on factory floor | Email approval chains get lost, no visibility into status |
| **Chen (Admin)** | IT admin, configures approval workflows | Set up new approval templates without developer help | Current system requires vendor consultants for any change |
| **Huang (Compliance)** | Quality assurance, audits approval records | Pull audit reports for ISO certification | Manual Excel reports, no guarantee of data integrity |

## Assumptions & Constraints

| Type | Description |
|------|-------------|
| Assumption | Approval workflows have 2-5 steps on average (not 50+ step pipelines) |
| Assumption | Users are primarily on desktop (office) or mobile (factory floor) |
| Assumption | Each organization has < 1000 users (not consumer-scale) |
| Constraint | All infrastructure runs locally — no cloud services |
| Constraint | Audit log must be immutable — Kafka event sourcing with exactly-once semantics |
| Constraint | Must support parallel approval (A and B approve simultaneously) and sequential approval (A then B) |
| Dependency | Temporal for durable workflow orchestration |
| Dependency | Keycloak for SSO and RBAC (Admin / Manager / Employee roles) |
| Dependency | Kafka for event sourcing and async notifications |

## Core Scenarios

### Scenario 1: Submit and Track an Approval Request

**As an** Engineer (Wei), **I want to** submit an equipment purchase request and track its approval status, **so that** I know when it's approved without chasing people.

```
Flow:
1. Wei logs in via SSO (Keycloak) → sees dashboard
2. Clicks "New Request" → selects "Equipment Purchase" template
3. Fills in form (item, cost, justification) → attaches spec sheet (MinIO)
4. Submits → Temporal starts approval workflow
5. Wei sees status: "Pending — Manager Review"
6. Receives push notification when approved/rejected
```

### Scenario 2: Mobile Approval on Factory Floor

**As a** Manager (Lin), **I want to** approve pending requests from my phone while on the factory floor, **so that** I don't block my team.

```
Flow:
1. Lin receives push notification: "Equipment Purchase #1234 needs your approval"
2. Opens mobile app (Kotlin/Swift) → sees approval queue
3. Taps request → reviews details + attachment
4. Taps "Approve" → adds comment: "Approved, proceed with vendor A"
5. Temporal advances workflow to next step (Finance review)
6. Kafka produces event: workflow.approval-events (event sourcing)
7. Audit log updated automatically (exactly-once)
```

### Scenario 3: Configure a New Approval Workflow

**As an** Admin (Chen), **I want to** create a new approval template for "Engineering Change Order" without writing code, **so that** the process team can start using it immediately.

```
Flow:
1. Chen logs into Admin Dashboard (Vue 3 + Laravel backend)
2. Opens "Workflow Templates" → clicks "New Template"
3. Drags and drops approval steps: Engineer → Manager → Director → Quality
4. Configures each step: assignee rule (by department, by role), deadline, escalation
5. Sets parallel approval: Manager AND Quality must both approve
6. Publishes template → immediately available to all employees
7. Temporal registers new workflow definition
```

### Scenario 4: Compliance Audit Report

**As a** Compliance Officer (Huang), **I want to** pull all approval records for Q1 2026 for ISO audit, **so that** I can prove every decision has a documented chain of custody.

```
Flow:
1. Huang logs into Admin Dashboard → opens "Audit Log"
2. Filters: date range (Jan-Mar 2026), type (Equipment Purchase)
3. System queries Kafka audit-log topic (immutable, exactly-once)
4. Sees every action: who submitted, who approved, when, with what comment
5. Exports as CSV/PDF for external auditor
6. Data integrity verified — Kafka events are append-only, tamper-proof
```

### Scenario 5: Notification and Escalation

**As a** System, **I want to** automatically escalate overdue approvals, **so that** requests don't get stuck.

```
Flow:
1. Manager has 48 hours to approve (configured per template)
2. After 24 hours — reminder push notification + email (MailHog in local)
3. After 48 hours — Temporal escalation: auto-assign to Manager's manager
4. Kafka produces event: workflow.notifications
5. Notification Worker consumes event → sends push (FCM/APNs) + email
6. Audit log records escalation with timestamp
```

## OKR / Success Metrics

| Objective | Key Result | Target |
|-----------|-----------|--------|
| Approvals are fast | Average approval turnaround time | < 4 hours |
| System is reliable | API uptime | 99.95% |
| Users adopt mobile | Mobile approval rate (% of approvals done on mobile) | > 30% |
| Audit is trustworthy | Audit log completeness (events captured / actions taken) | 100% |
| Admin is self-service | Avg time to create new workflow template | < 15 minutes |
| System performs well | GraphQL query p99 latency | < 300ms |
| Compliance ready | Time to generate audit report | < 1 minute |

## Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| Temporal server downtime blocks all approvals | Critical | Low | Temporal is durable — workflows resume after restart. Health check monitoring. |
| Kafka consumer lag delays notifications | High | Medium | Monitor consumer lag, alerting, auto-restart consumers |
| Complex approval chains cause Temporal workflow timeout | Medium | Medium | Set generous timeouts, implement Saga compensation for partial approvals |
| Keycloak SSO misconfiguration locks out users | High | Low | Admin can bypass SSO with local login fallback |
| GraphQL query performance degrades with large audit logs | Medium | Medium | CQRS read model, dedicated read replica, pagination |
| Multi-tenant data leak (row-level isolation) | Critical | Low | Row-level security in PostgreSQL, integration tests per org |

## ADRs Created

- [ADR-0001: Why Temporal over Bull/BullMQ for workflow orchestration](adrs/ADR-0001-why-temporal-over-bull.md)
- [ADR-0002: Why GraphQL over REST for the Workflow API](adrs/ADR-0002-why-graphql-over-rest.md)
- [ADR-0003: Why Kafka event sourcing for audit log (exactly-once guarantee)](adrs/ADR-0003-why-kafka-event-sourcing-audit.md)
- [ADR-0004: Why Laravel for Admin Panel instead of Spring Boot](adrs/ADR-0004-why-laravel-for-admin.md)