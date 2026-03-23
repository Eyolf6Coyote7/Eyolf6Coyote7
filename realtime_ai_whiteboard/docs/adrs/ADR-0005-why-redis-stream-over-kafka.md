# ADR-0005: Why Redis Stream over Kafka for AI Task Queue

## Status
Accepted

## Context
The AI Service consumes tasks (user prompts) asynchronously. Options:
- **Kafka** — distributed event streaming, used by Workflow and 3D Asset projects
- **Redis Stream** — lightweight stream built into Redis, which we already run

## Decision
Use **Redis Stream** for the AI task queue. Kafka is used only for analytics events.

## Reason
- Redis is already running for cache and Pub/Sub — no additional service needed
- AI task queue is simple: one producer (BFF), one consumer (AI Service), low volume
- Redis Stream supports consumer groups, acknowledgment, and replay — sufficient for this use case
- Kafka is overkill for a single-consumer queue — its strength is multi-consumer partitioned streaming
- Keeps Whiteboard dependencies minimal (no Kafka dependency for core features)

## Consequences
- Redis Stream is not as durable as Kafka — if Redis crashes, in-flight tasks are lost
- Need to handle Redis reconnection and task retry in AI Service
- Analytics events still go to Kafka (for cross-project consistency)
- If AI task volume grows significantly, can migrate to Kafka later
