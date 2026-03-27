# ADR-0005: Why Kafka for AI Task Queue

## Status
Accepted (supersedes initial Redis Stream decision)

## Context
The AI Service consumes tasks (user prompts) asynchronously. Options:
- **Redis Stream** — lightweight stream built into Redis, which we already run
- **Kafka** — distributed event streaming, used by Workflow and 3D Asset projects

## Decision
Use **Kafka** for both the AI task queue and analytics events.

## Reason
- Consistency across all 3 projects — Kafka is the shared event bus
- Kafka provides stronger durability guarantees than Redis Stream
- Already running Kafka for analytics events — no additional service
- Consumer groups and partitioning support future scaling
- Easier to add additional consumers (e.g. logging, monitoring) later

## Consequences
- Slightly more overhead than Redis Stream for a simple queue
- Requires Kafka to be running for AI features to work
- Unified messaging pattern across the workspace
