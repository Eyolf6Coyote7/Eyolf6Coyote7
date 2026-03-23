# PRD: Enterprise Workflow System

## Table of Contents

- [Overview](#overview)
- [User Journey Map](#user-journey-map)
  - [Wei (Process Engineer) Journey](#wei-process-engineer-journey)
  - [Lin (Engineering Manager) Journey](#lin-engineering-manager-journey)
- [Feature List](#feature-list)
- [Feature Details](#feature-details)
  - [F1: Submit Approval Request](#f1-submit-approval-request)
  - [F3: Approve / Reject with Comment](#f3-approve-reject-with-comment)
  - [F7: Configurable Workflow Templates](#f7-configurable-workflow-templates)
  - [F12: Immutable Audit Log](#f12-immutable-audit-log)
- [Non-functional Requirements](#non-functional-requirements)
- [Release Criteria](#release-criteria)
- [Dependencies](#dependencies)

---


## Overview

A multi-step approval and task management system for semiconductor manufacturing with configurable workflow templates, compliance-grade audit logging, and mobile approval capability. See [ConOps](conops.md) for product vision and user personas.

## User Journey Map

### Wei (Process Engineer) Journey

| Stage | Action | Touchpoint | Emotion | Opportunity |
|-------|--------|-----------|---------|-------------|
| Discover | Introduced by IT admin during onboarding | Web | Neutral | Must feel simpler than SAP |
| First Use | Submits first equipment purchase request | Web | Relieved | Form must be intuitive, < 2 min to submit |
| Track | Checks approval status daily | Web + Mobile | Anxious | Real-time status updates, push notifications |
| Receive | Gets approval notification | Mobile (push) | Happy | Clear notification with next steps |
| Repeat | Submits requests regularly | Web + Mobile | Confident | Template auto-fill from past requests |

### Lin (Engineering Manager) Journey

| Stage | Action | Touchpoint | Emotion | Opportunity |
|-------|--------|-----------|---------|-------------|
| Alert | Receives push notification for pending approval | Mobile | Busy | Notification must have enough context to decide |
| Review | Reviews request details + attachments | Mobile | Focused | One-tap approve/reject from notification |
| Approve | Approves with comment | Mobile | Satisfied | Must work on factory floor (intermittent network) |
| Escalate | Overdue request auto-escalates to their manager | System | Surprised | Clear escalation policy, no blame |

## Feature List

| # | Feature | Priority | Platform | System | Status | Analytics Event |
|---|---------|----------|----------|--------|--------|----------------|
| F1 | Submit approval request | P0 | Web + Mobile | Workflow API | Planned | `request_submitted` |
| F2 | Approval queue (pending items) | P0 | Web + Mobile | Workflow API | Planned | `queue_viewed` |
| F3 | Approve / Reject with comment | P0 | Web + Mobile | Workflow API + Temporal | Planned | `step_approved`, `step_rejected` |
| F4 | Multi-step approval chains | P0 | Web | Workflow API + Temporal | Planned | `workflow_advanced` |
| F5 | Parallel approval (A AND B) | P1 | Web | Temporal | Planned | `parallel_step_completed` |
| F6 | File attachments (spec sheets, docs) | P0 | Web + Mobile | Workflow API + MinIO | Planned | `document_uploaded` |
| F7 | Configurable workflow templates | P1 | Web (Admin) | Admin API (Laravel) | Planned | `template_created` |
| F8 | User management (CRUD via Keycloak) | P1 | Web (Admin) | Admin API + Keycloak | Planned | `user_created` |
| F9 | RBAC (Admin / Manager / Employee) | P0 | All | Keycloak + Workflow API | Planned | — |
| F10 | SSO login (Keycloak OAuth2) | P0 | Web + Mobile | Keycloak | Planned | `user_logged_in` |
| F11 | 2FA (TOTP via Keycloak) | P1 | Web + Mobile | Keycloak | Planned | `2fa_enabled` |
| F12 | Immutable audit log | P0 | Web (Admin) | Kafka (event sourcing) | Planned | — |
| F13 | Audit report export (CSV/PDF) | P1 | Web (Admin) | Admin API | Planned | `audit_report_exported` |
| F14 | Push notifications | P0 | Mobile | Kafka + FCM/APNs | Planned | `notification_sent` |
| F15 | Email notifications | P1 | — | Kafka + MailHog | Planned | `email_sent` |
| F16 | Auto-escalation (overdue approvals) | P1 | — | Temporal | Planned | `step_escalated` |
| F17 | Dashboard (KPIs, turnaround time) | P1 | Web (Admin) | Admin API | Planned | `dashboard_viewed` |
| F18 | Feature flags | P1 | All | Unleash | Planned | — |
| F19 | Remote config (white-label branding) | P2 | Web + Mobile | Admin API | Planned | `config_updated` |
| F20 | GraphQL API | P0 | All | Workflow API | Planned | — |
| F21 | i18n (English + Chinese) | P2 | Web + Mobile | All | Planned | — |
| F22 | Offline approval queue (mobile) | P2 | Mobile | Mobile App | Planned | `offline_approval_synced` |

## Feature Details

### F1: Submit Approval Request

**User Story:** As an employee, I want to submit an approval request by filling in a form and attaching documents, so that my request enters the approval pipeline.

**Acceptance Criteria:**
- [ ] Given the dashboard, when user clicks "New Request", then they see a list of available templates
- [ ] Given a template, when user selects it, then a dynamic form renders based on template fields
- [ ] Given the form, when user fills required fields and submits, then Temporal starts the workflow
- [ ] Given the submission, when successful, then user sees status "Pending — [first approver name]"
- [ ] Given the form, when user attaches a file, then it uploads to MinIO and links to the request

**Edge Cases:**
- What if user submits with missing required fields? → Client-side validation + server-side validation
- What if file upload fails mid-way? → Retry with progress indicator, don't lose form data

**Analytics:**
- Event: `request_submitted`
- Properties: `{ template_id: "...", attachment_count: 2, org_id: "..." }`
- Success metric: Avg time to submit < 2 minutes

---

### F3: Approve / Reject with Comment

**User Story:** As a manager, I want to approve or reject a pending request with an optional comment, so that the workflow advances and the requester knows the outcome.

**Acceptance Criteria:**
- [ ] Given the approval queue, when manager taps a request, then they see full details + attachments
- [ ] Given the detail view, when manager taps "Approve", then Temporal advances workflow to next step
- [ ] Given the detail view, when manager taps "Reject", then they must enter a reason (required)
- [ ] Given approval/rejection, then Kafka produces event to `workflow.approval-events` (event sourcing)
- [ ] Given approval/rejection, then Kafka produces event to `workflow.audit-log` (exactly-once)
- [ ] Given approval/rejection, then requester receives push notification

**Edge Cases:**
- What if manager approves while offline (mobile)? → Queue locally, sync when online
- What if the same step has 2 parallel approvers? → Both must approve before workflow advances

---

### F7: Configurable Workflow Templates

**User Story:** As an admin, I want to create and edit approval workflow templates without writing code, so that new processes can be deployed immediately.

**Acceptance Criteria:**
- [ ] Given the Admin Dashboard, when admin opens "Workflow Templates", then they see list of existing templates
- [ ] Given template editor, when admin drags steps, then they can build sequential and parallel chains
- [ ] Given each step, when admin configures it, then they can set: assignee rule, deadline, escalation policy
- [ ] Given template is published, then it appears in employee's "New Request" template list
- [ ] Given template is updated, then in-progress workflows keep using the old version (immutable)

**Edge Cases:**
- What if admin deletes a template with in-progress workflows? → Soft delete, existing workflows complete normally
- What if step has no valid assignee? → Validation error on publish

---

### F12: Immutable Audit Log

**User Story:** As a compliance officer, I want every approval action to be recorded in an immutable, tamper-proof log, so that I can prove chain of custody for regulatory audits.

**Acceptance Criteria:**
- [ ] Given any approval action (submit, approve, reject, escalate), then event is produced to Kafka `workflow.audit-log`
- [ ] Given Kafka producer, then exactly-once semantics are enabled (idempotent + transactional)
- [ ] Given audit events, then they are append-only — no update, no delete
- [ ] Given the Admin Dashboard, when compliance officer filters by date/type, then matching events display
- [ ] Given export, when officer clicks "Export CSV", then all filtered events download

**Edge Cases:**
- What if Kafka is temporarily down? → Retry with backoff, buffer in memory, alert admin
- What if audit log grows very large? → Kafka retention forever for audit topic, CQRS read model with pagination

## Non-functional Requirements

| Requirement | Target |
|-------------|--------|
| Performance | GraphQL p99 latency < 300ms |
| Availability | 99.95% uptime |
| Security | SSO + 2FA, RBAC, OWASP Top 10, encrypted at rest + in transit |
| Scalability | Support 1000 users, 500 concurrent requests |
| Compliance | SOC 2 aligned audit trail, immutable event log |
| i18n | English (en) + Traditional Chinese (zh-TW) |
| a11y | WCAG 2.1 AA |
| Offline | Mobile can queue approvals offline, sync on reconnect |

## Release Criteria

- [ ] All P0 features implemented and tested
- [ ] No P0/P1 bugs open
- [ ] GraphQL p99 < 300ms under load
- [ ] Audit log captures 100% of actions (no gaps)
- [ ] SAST/SCA security scan passes
- [ ] UI matches Figma (Final status)
- [ ] Storybook components up to date
- [ ] 2FA login flow works end-to-end
- [ ] Push notifications deliver within 30 seconds

## Dependencies

| Dependency | Type | Impact |
|-----------|------|--------|
| Temporal | Docker service | Core — workflow orchestration |
| Keycloak | Docker service | Core — SSO, RBAC, 2FA |
| Kafka | Docker service | Core — event sourcing, audit log, notifications |
| PostgreSQL | Docker service | Data storage |
| Redis | Docker service | Cache, session |
| MinIO | Docker service | File attachments |
| MailHog | Docker service | Email notifications (local) |
| Unleash | Docker service | Feature flags |
