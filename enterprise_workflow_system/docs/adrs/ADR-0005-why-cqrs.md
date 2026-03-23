# ADR-0005: Why CQRS for Approval Data Access

## Status
Accepted

## Context
The Workflow system has different read and write patterns:
- **Write**: Complex — submit request → Temporal orchestration → Kafka event sourcing → audit log
- **Read**: Simple — list my requests, show approval queue, query audit log with filters

Options:
- **Single model** — same database tables for read and write
- **CQRS** — separate write model (Temporal + Kafka events) from read model (materialized views in PostgreSQL)

## Decision
Use **CQRS** — write operations go through Temporal + Kafka, read operations query a dedicated read model.

## Reason
- Write path is complex (Temporal workflows, Kafka events, audit guarantees) — optimizing for reads would complicate it
- Read path needs fast, flexible queries (GraphQL with filters, pagination, sorting) — optimized tables/views
- Audit log lives in Kafka (immutable) but needs to be queryable — CQRS read model materializes Kafka events into PostgreSQL
- Admin dashboard needs aggregated KPIs — read model can pre-compute these
- Clear separation of concerns: write = correctness, read = performance

## Consequences
- Need to maintain a Kafka consumer that materializes events into the read model
- Eventual consistency between write and read (typically < 1 second)
- More complex than single model — two sets of database tables
- Need to handle read model rebuild if it gets out of sync (replay Kafka events)
