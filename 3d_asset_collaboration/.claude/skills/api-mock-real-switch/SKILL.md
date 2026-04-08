---
name: api-mock-real-switch
description: Add a typed API function to asset-portal that switches between mock-client and real-client (axios) at module load via VITE_MOCK, with shared types.
when_to_use:
  - add a new API function to `asset-portal` or `mobile-app
  - expose data to a page that needs both demo (mock) and prod (axios) modes
  - mentions `mockClient`, `realClient`, `VITE_MOCK`, `fetchAssets`, `fetchSensors
  - introduce a new entity type that both clients must return
tech_stack:
  - react
  - vite_mock
  - axios
harness: fe-csr
project: 3d_asset_collaboration
---

## When to use

Trigger when the user asks to:
- add a new API function to `asset-portal` or `mobile-app`
- expose data to a page that needs both demo (mock) and prod (axios) modes
- mentions `mockClient`, `realClient`, `VITE_MOCK`, `fetchAssets`, `fetchSensors`
- introduce a new entity type that both clients must return

## Context

`asset-portal` and `mobile-app` use the SAME dual-client pattern as the other workspace projects but with module-level exports (functions) instead of an object literal:

```ts
// asset-portal/src/api/index.ts
import * as mockClient from "./mock-client";
import * as realClient from "./real-client";
const useMock = import.meta.env.VITE_MOCK === "true";
export const api = useMock ? mockClient : realClient;
```

Difference vs admin-dashboard pattern:
- This project uses **named function exports** (`export async function fetchAssets()`) wrapped via `import * as mockClient`. NOT object methods.
- Mock client has its own `delay(ms)` helper at the file bottom (`asset-portal/src/api/mock-client.ts:136-138`).
- Types are shared across files via `import type { Asset } from "../store/assetSlice"` — types live alongside Redux slices, NOT inside the api folder.
- Real client uses `import.meta.env.VITE_API_BASE ?? "/api/v1"` for the axios `baseURL`, allowing per-environment override.

## Operating instructions

When adding `fetchFoos()`:

1. Open `asset-portal/src/api/mock-client.ts`. Add `mockFoos: Foo[] = [...]` after the existing mock arrays. At least 5 entries.
2. Add `export async function fetchFoos(): Promise<Foo[]> { await delay(300); return mockFoos; }`.
3. For mutation, add `export async function createFoo(input: Omit<Foo, "id">): Promise<Foo> { ... }`.
4. Open `asset-portal/src/api/real-client.ts`. Mirror with `export async function fetchFoos(): Promise<Foo[]> { const { data } = await http.get<Foo[]>("/foos"); return data; }`.
5. Type `Foo` lives in the relevant Redux slice file, e.g. `asset-portal/src/store/fooSlice.ts`. Import via `import type { Foo } from "../store/fooSlice"`. NEVER define types in the api folder.
6. Components import via `import { api } from "../api"` then call `api.fetchFoos()`.
7. For `mobile-app`, the api lives at `mobile-app/src/api/`. Same pattern but the type lives at `mobile-app/src/store/`.

## Reusable prompts / code patterns

Mock function:
```ts
export async function fetchFoos(): Promise<Foo[]> {
  await delay(300);
  return mockFoos;
}

export async function fetchFooById(id: string): Promise<Foo | undefined> {
  await delay(200);
  return mockFoos.find((f) => f.id === id);
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
```

Real client mirror:
```ts
import axios from "axios";
import type { Foo } from "../store/fooSlice";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ?? "/api/v1",
});

export async function fetchFoos(): Promise<Foo[]> {
  const { data } = await http.get<Foo[]>("/foos");
  return data;
}

export async function fetchFooById(id: string): Promise<Foo | undefined> {
  const { data } = await http.get<Foo>(`/foos/${id}`);
  return data;
}
```

Module-level switch (do not modify):
```ts
import * as mockClient from "./mock-client";
import * as realClient from "./real-client";

const useMock = import.meta.env.VITE_MOCK === "true";

export const api = useMock ? mockClient : realClient;
```

## Anti-patterns

- Do NOT define types inside the api folder — types live in the Redux slice.
- Do NOT use object literal exports (`export const mockClient = {...}`) — this project uses module-level function exports + `import * as`.
- Do NOT skip `await delay(...)` in mock functions — loading states depend on it.
- Do NOT hardcode `baseURL: "/api/v1"` — always use `import.meta.env.VITE_API_BASE ?? "/api/v1"` so it can be overridden.
- Do NOT call `axios` directly in components — go through `realClient`.
- Do NOT add a runtime toggle — the switch happens once at module load.

## References

- `asset-portal/src/api/index.ts:1-7` — module-level switch
- `asset-portal/src/api/mock-client.ts:121-138` — function exports + delay helper
- `asset-portal/src/api/real-client.ts:1-22` — axios wrapper
- `mobile-app/src/api/index.ts` — sibling pattern in mobile-app
- `asset-portal/src/store/assetSlice.ts` — where types live
