# ADR-0003: Why Kafka Event Sourcing for Audit Log

## Status
Accepted

## Context
Compliance requires an immutable, complete audit trail of every approval action. Options:
- **Database table** — simple INSERT, but rows can be updated/deleted (not truly immutable)
- **Kafka event sourcing** — append-only log, immutable by design, exactly-once semantics

## Decision
Use **Kafka** with event sourcing for the audit log. Every approval action is produced as an immutable event to the `workflow.audit-log` topic.

## Reason
- Kafka topics are append-only — events cannot be modified or deleted (immutable by design)
- Exactly-once semantics (`enable.idempotence=true` + `transactional.id`) prevent duplicate or missing entries
- Event sourcing enables time-travel: replay events to reconstruct state at any point in time
- Compliance auditors can verify data integrity — Kafka offset is monotonically increasing
- Decouples audit from business logic — services produce events, audit consumer writes to read model

## Consequences
- Need to manage Kafka topic retention (keep audit events forever or archive to cold storage)
- Read queries require a materialized view (CQRS read model in PostgreSQL)
- More complex than a simple database INSERT
- Kafka must be highly available — audit events must never be lost
