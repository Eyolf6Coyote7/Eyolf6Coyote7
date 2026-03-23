# ConOps: Enterprise Workflow System

## Product Vision

A multi-step approval system for semiconductor manufacturing — configurable workflow chains, compliance-grade audit trail, mobile approval on factory floor. Unlike Jira (general-purpose) or ServiceNow (expensive, slow), this is **purpose-built for manufacturing approvals** with Temporal orchestration and Kafka event sourcing.

**Industry:** Semiconductor / Manufacturing | **Differentiator:** Configurable workflows + immutable audit log

## Target Users

| Persona | Role | Goal | Pain Point |
|---------|------|------|------------|
| Wei (Engineer) | Process Engineer | Submit equipment purchase requests quickly | SAP form takes 20 clicks, no mobile |
| Lin (Manager) | Engineering Manager | Approve requests from phone on factory floor | Email chains get lost, no status visibility |
| Chen (Admin) | IT Admin | Configure approval templates without developers | Current system requires vendor consultants |
| Huang (Compliance) | Quality Assurance | Pull audit reports for ISO certification | Manual Excel reports, no data integrity guarantee |

## Core Scenarios

**1. Submit + Track** — Fill dynamic form → attach spec sheet → Temporal starts workflow → track status in realtime

**2. Mobile Approval** — Push notification → open on phone → review details → one-tap approve with comment → Kafka audit event

**3. Configure Workflow** — Admin drags steps → sets parallel/sequential → configures deadlines + escalation → publishes template instantly

**4. Compliance Audit** — Filter by date range + type → view immutable Kafka audit log → export CSV for external auditor

**5. Auto-Escalation** — 48h timeout → Temporal reassigns to manager's manager → push + email notification → audit logged

## OKR / Success Metrics

| Metric | Target |
|--------|--------|
| Avg approval turnaround time | < 4 hours |
| Mobile approval rate | > 30% |
| Audit log completeness | 100% |

## Key Risks

| Risk | Mitigation |
|------|------------|
| Temporal server downtime blocks approvals | Temporal is durable — workflows resume after restart |
| Kafka consumer lag delays notifications | Monitor lag, auto-restart consumers |
| Keycloak SSO misconfiguration | Admin can bypass with local login fallback |

## ADRs

- [ADR-0001: Why Temporal over Bull](adrs/ADR-0001-why-temporal-over-bull.md)
- [ADR-0002: Why GraphQL over REST](adrs/ADR-0002-why-graphql-over-rest.md)
- [ADR-0003: Why Kafka event sourcing for audit](adrs/ADR-0003-why-kafka-event-sourcing-audit.md)
- [ADR-0004: Why Laravel for Admin Panel](adrs/ADR-0004-why-laravel-for-admin.md)
