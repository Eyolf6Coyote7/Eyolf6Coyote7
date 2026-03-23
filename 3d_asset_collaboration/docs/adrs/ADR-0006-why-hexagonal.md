# ADR-0006: Why Hexagonal Architecture for 3D Asset Backend

## Status
Accepted

## Context
The 3D Asset backend has multiple I/O adapters:
- **Input**: REST (web), gRPC (Unity), SignalR (realtime), MQTT (IoT via Kafka)
- **Output**: PostgreSQL, Elasticsearch, MinIO, TimescaleDB, Kafka, Redis

Options:
- **Layered Architecture** — traditional layers (controller → service → repository)
- **Hexagonal (Ports & Adapters)** — core logic isolated behind interfaces, adapters are pluggable

## Decision
Use **Hexagonal Architecture (Ports & Adapters)** for the ASP.NET Core backend.

## Reason
- Multiple input protocols (REST, gRPC, SignalR) — hexagonal naturally supports multiple input adapters calling the same core
- Multiple output services (PG, ES, MinIO, TS, Kafka, Redis) — each is an output adapter behind a port (interface)
- Core domain logic (asset versioning, ACL, tagging) is completely isolated from I/O
- Easy to test: mock any adapter in unit tests, replace any adapter without changing core
- If we add a new protocol (e.g. WebSocket), we just add an adapter — core doesn't change

## Consequences
- More interfaces to define upfront (one port per capability)
- Developers must understand the ports & adapters pattern
- Dependency injection configuration is more verbose
- Worth the investment given the number of I/O boundaries (6+ adapters)
