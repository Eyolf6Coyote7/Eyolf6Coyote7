# ADR-0001: Why gRPC over REST for Large File Transfer

## Status
Accepted

## Context
3D assets can be 50-500MB. Need an efficient upload/download protocol. Options:
- **REST multipart** — standard HTTP upload, widely supported
- **gRPC bidirectional streaming** — binary protocol, chunked streaming, built-in flow control

## Decision
Use **gRPC bidirectional streaming** for file upload and download.

## Reason
- gRPC uses HTTP/2 with binary framing — more efficient than REST multipart for large files
- Bidirectional streaming enables chunked upload with progress tracking and resume
- gRPC has built-in flow control — prevents client from overwhelming server
- Unity client has native gRPC support (Grpc.Net.Client)
- REST multipart has no standard resume mechanism — failed uploads restart from zero

## Consequences
- Web frontend can't call gRPC directly — need gRPC-Web proxy or REST fallback for browser
- gRPC is less familiar to most developers than REST
- Need to define .proto files and generate client/server code
- REST endpoints still needed for metadata queries (web frontend)
