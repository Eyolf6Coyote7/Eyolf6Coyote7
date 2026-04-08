---
name: zustand-mock-real-store
description: Create a Zustand store backed by a mock/real API client switched by VITE_MOCK, with auth-token and persisted boards.
when_to_use:
  - add a new Zustand store to web-app or extend auth.store.ts / board.store.ts / ai.store.ts
  - wire a mock vs real API client under VITE_MOCK
  - persist store state to localStorage
  - share the auth token between fetch and y-websocket
tech_stack:
  - react
  - zustand
  - vite_mock
harness: fe-csr
project: realtime_ai_whiteboard
---

## When to use

Trigger when the user asks to:

- add a new Zustand store to web-app or extend auth.store.ts / board.store.ts / ai.store.ts
- wire a mock vs real API client under VITE_MOCK
- persist store state to localStorage
- share the auth token between fetch and y-websocket

Also applies to mentions of useAuthStore, useBoardStore, useAiStore, ApiClient, mockClient, realClient.

## Context

The web-app has three Zustand stores (auth, board, ai) and a single api facade that picks mockClient vs realClient at module load time based on import.meta.env.VITE_MOCK. The facade is typed against ApiClient so adding endpoints is a one-line change on both clients.

The auth store holds the token that useYjs reads via useAuthStore(s => s.token). Calling setToken triggers a y-websocket reconnect - this is intentional.

Canonical files: stores/auth.store.ts, stores/board.store.ts, stores/ai.store.ts, api/index.ts, api/client.interface.ts, api/mock-client.ts, api/real-client.ts.

## Operating instructions

When adding a new endpoint (example: duplicateBoard):

1. Add the method signature to ApiClient in client.interface.ts.
2. Implement it in real-client.ts as a fetch call against the BFF using the shared request helper and headers that inject the auth header.
3. Implement it in mock-client.ts with a setTimeout-simulated response.
4. Expose it on the relevant store as an async action that calls api.duplicateBoard(...) and updates local state on success.
5. Write a test in stores/{store}.store.test.ts that mocks api.duplicateBoard and asserts state transitions.

When adding persistence, use zustand/middleware persist and partialize to whitelist durable fields only.

## Reusable prompts / code patterns

### API facade pattern

    import { mockClient } from './mock-client';
    import { realClient } from './real-client';
    const isMock = import.meta.env.VITE_MOCK === 'true';
    export const api = isMock ? mockClient : realClient;

### Store action skeleton

See auth.store.ts for the canonical example. Actions call api.* and update local state on success. Persist via zustand/middleware whitelisting only durable fields.

### Mock response seeding

Mock clients return plausible shapes matching the real API. For AI, use a MOCK_RESPONSES dictionary keyed by prompt with a DEFAULT_RESPONSE fallback (ai.store.ts pattern).

## Anti-patterns

- Do NOT import mockClient or realClient directly from a store - go through api from api/index.ts so VITE_MOCK stays the single source of truth.
- Do NOT read import.meta.env inside the store body on every action - capture it once at module top.
- Do NOT persist the whole store - use partialize to keep only durable fields; never persist messages or ephemeral UI flags.
- Do NOT call set() inside a fetch .then chain without a try/catch - mock paths may throw and leave isStreaming / isLoading stuck.
- Do NOT duplicate the ApiClient interface - extend client.interface.ts and let TypeScript force both clients to implement.

## References

- realtime_ai_whiteboard/web-app/src/api/client.interface.ts - ApiClient typed surface.
- realtime_ai_whiteboard/web-app/src/api/index.ts - mock vs real selector.
- realtime_ai_whiteboard/web-app/src/api/real-client.ts:1-47 - fetch wrapper.
- realtime_ai_whiteboard/web-app/src/api/mock-client.ts - mock responses.
- realtime_ai_whiteboard/web-app/src/stores/auth.store.ts - login/register/logout.
- realtime_ai_whiteboard/web-app/src/stores/board.store.ts - board list state.
- realtime_ai_whiteboard/web-app/src/stores/ai.store.ts:11-113 - mock-vs-real AI streaming with EventSource.
- realtime_ai_whiteboard/web-app/src/stores/*.store.test.ts - unit-test patterns.
