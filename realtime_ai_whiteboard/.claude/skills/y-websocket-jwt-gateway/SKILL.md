---
name: y-websocket-jwt-gateway
description: Run a Yjs WebSocket collaboration gateway embedded in NestJS with JWT token validation pulled from the query string.
when_to_use:
  - run a Yjs WebSocket server inside NestJS
  - validate a JWT on a y-websocket connection
  - change the YJS_WS_PORT or the per-board doc routing
  - mentions of WebSocketServer, setupWSConnection, y-websocket/bin/utils, OnModuleInit, OnModuleDestroy, IncomingMessage
tech_stack:
  - nestjs
  - websocket
  - yjs
  - jwt
harness: be
project: realtime_ai_whiteboard
---

## When to use

Trigger when the user asks to:

- run a Yjs WebSocket server inside NestJS
- validate a JWT on a y-websocket connection
- change the YJS_WS_PORT or the per-board doc routing
- mentions of WebSocketServer, setupWSConnection, y-websocket/bin/utils, OnModuleInit, OnModuleDestroy, IncomingMessage

## Context

The bff-api embeds a Yjs WebSocket server using the upstream y-websocket helper setupWSConnection from y-websocket/bin/utils. It runs on a separate port (YJS_WS_PORT, default 4002) so the HTTP REST surface and the binary CRDT traffic stay independent.

Auth: the client appends ?token=... to the WebSocket URL (see useYjs hook). The gateway extracts it via new URL(req.url, 'http://' + req.headers.host).searchParams.get('token') and verifies with jsonwebtoken.verify against ConfigService.getOrThrow('JWT_SECRET'). On failure the socket is closed with code 4001 'Unauthorized'.

Routing: the docName comes from req.url?.slice(1) which yields the boardId path segment, then setupWSConnection(ws, req, { docName: boardId }) joins all peers on the same board.

Lifecycle: implements OnModuleInit to start the server and OnModuleDestroy to close it cleanly. The class is @Injectable() and registered in CollaborationModule.

Canonical file: bff-api/src/collaboration/collaboration.gateway.ts (lines 1-53). Type stub at bff-api/src/collaboration/y-websocket.d.ts.

## Operating instructions

When extending the gateway (example: per-tenant doc namespacing):

1. Decode the JWT to read tenantId and prefix the docName as `${tenantId}:${boardId}` so two tenants cannot share a Y.Doc by accident.
2. Validate that the boardId from the URL belongs to the tenantId via Prisma BEFORE calling setupWSConnection. Reject with code 4003 'Forbidden' on mismatch.
3. Keep the y-websocket helper - do not reimplement the protocol. Any persistence layer should plug into the helper via the provided hooks.
4. If you add server-side persistence (Redis, file-system), wrap it as a y-leveldb-style adapter and pass it through the y-websocket utils, NOT inside this gateway file.
5. Run the gateway on its own port; never share the HTTP port - NestJS Express adapter and the ws server fight for upgrade events.

When debugging 'WS connection closes immediately': check (a) token query string is present, (b) JWT_SECRET matches the auth module, (c) the URL.host header is non-empty (some proxies strip it).

## Reusable prompts / code patterns

### Gateway shape

An @Injectable() class implements OnModuleInit + OnModuleDestroy. onModuleInit reads YJS_WS_PORT (default 4002) via ConfigService, instantiates a new WebSocketServer({ port }) from the ws package, and listens for 'connection' events. Each connection extracts the token query string, runs jsonwebtoken.verify against JWT_SECRET, and on failure closes with code 4001. On success it derives boardId from req.url.slice(1) and calls setupWSConnection(ws, req, { docName: boardId }). onModuleDestroy closes the wss. See collaboration.gateway.ts lines 1-53 for the canonical implementation - copy it verbatim and adjust only what is needed.

### Token extraction

    const url = new URL(req.url || '', 'http://' + req.headers.host);
    return url.searchParams.get('token');

### Per-board doc routing

    const boardId = req.url?.slice(1) || 'default';
    setupWSConnection(ws, req, { docName: boardId });

## Anti-patterns

- Do NOT mount the y-websocket server on the same HTTP port as NestJS Express - upgrade events collide.
- Do NOT skip token validation - any unauthenticated client could write CRDT updates and corrupt boards.
- Do NOT use req.headers['sec-websocket-protocol'] for the token - browsers strip it; use the query string.
- Do NOT log the raw token, even on failure - use 'Unauthorized WS connection attempt' (the canonical line).
- Do NOT call setupWSConnection without docName - the helper falls back to a single global doc and all boards merge into one.
- Do NOT reimplement the Yjs sync/awareness binary protocol - always go through y-websocket/bin/utils.
- Do NOT forget OnModuleDestroy - HMR will leak servers.

## References

- realtime_ai_whiteboard/bff-api/src/collaboration/collaboration.gateway.ts:1-53 - canonical gateway.
- realtime_ai_whiteboard/bff-api/src/collaboration/collaboration.gateway.ts:15-33 - port + connection wiring.
- realtime_ai_whiteboard/bff-api/src/collaboration/collaboration.gateway.ts:39-52 - extractToken + validate.
- realtime_ai_whiteboard/bff-api/src/collaboration/collaboration.module.ts - Nest module registration.
- realtime_ai_whiteboard/bff-api/src/collaboration/y-websocket.d.ts - type stubs for the helper.
- realtime_ai_whiteboard/web-app/src/hooks/useYjs.ts:46-54 - client side that pairs with this gateway.
