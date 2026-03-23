# ADR-0004: Why NestJS Modular Monolith over Microservices

## Status
Accepted

## Context
The whiteboard backend needs multiple capabilities: auth, board CRUD, collaboration (WebSocket), AI gateway, storage, export. Options:
- **Microservices** — separate service per capability
- **Modular Monolith** — single service with isolated modules

## Decision
Use **NestJS Modular Monolith** — one NestJS application with feature-isolated modules.

## Reason
- One person building the entire backend — microservices add operational overhead without team-scale benefits
- NestJS modules provide strong isolation (dependency injection, module boundaries)
- WebSocket + REST + SSE in one process avoids inter-service latency for realtime
- Can extract to microservices later if needed (modules map cleanly to services)
- Simpler deployment: one Docker container, one health check, one log stream

## Consequences
- All features share one process — a bug in one module can crash the whole server
- Need discipline to keep module boundaries clean (no cross-module imports except through interfaces)
- Vertical scaling only (bigger machine, not more instances) until Redis Pub/Sub is added for horizontal
