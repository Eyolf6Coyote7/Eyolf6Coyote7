# ADR-0001: Why Temporal over Bull/BullMQ for Workflow Orchestration

## Status
Accepted

## Context
The system needs a workflow engine for multi-step approval chains with retry, timeout, escalation, and compensation. Options:
- **Bull/BullMQ** — Redis-based job queue, simple, lightweight
- **Temporal** — Durable workflow engine, built for long-running orchestration

## Decision
Use **Temporal** for all approval workflow orchestration.

## Reason
- Bull is a job queue, not a workflow engine — it processes jobs, not multi-step stateful workflows
- Temporal supports long-running workflows (days/weeks for approvals) with built-in state persistence
- Temporal has native support for: timeouts, retries, Saga compensation, parallel execution, signals (external events)
- Approval workflows need "wait for human action" — Temporal handles this natively with signals
- Bull would require building state machine logic manually on top of a queue

## Consequences
- Need to run Temporal server (Docker, ~2.5GB RAM)
- Team needs to learn Temporal SDK (Go or Java/Kotlin)
- More complex local setup than Bull (which just needs Redis)
- Temporal is overkill for simple job queues — use Redis Stream for non-workflow async tasks
