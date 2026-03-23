# ADR-0001: Why Yjs (CRDT) over Operational Transform for Collaborative Editing

## Status
Accepted

## Context
The whiteboard requires realtime multi-user editing. Two proven approaches exist:
- **Operational Transform (OT)** — used by Google Docs, requires a central server to resolve conflicts
- **CRDT (Conflict-free Replicated Data Type)** — used by Figma, resolves conflicts locally without a central server

## Decision
Use **Yjs** (CRDT library) for realtime state synchronization.

## Reason
- CRDT is conflict-free by design — no central server needed for conflict resolution
- Yjs supports offline editing with automatic merge on reconnect (critical for mobile)
- Yjs has a mature ecosystem: y-websocket, y-indexeddb, y-protocols
- OT requires all operations to go through a central server, adding latency and a single point of failure
- Figma, the industry leader in collaborative design, uses CRDT — proven at scale

## Consequences
- Need to learn Yjs API and CRDT concepts
- Binary encoding (Yjs uses efficient binary format) makes debugging harder — use y-protocols for inspection
- Large documents may have high memory usage due to CRDT tombstones — implement periodic garbage collection
