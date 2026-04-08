---
name: skill_impl_fe_csr
description: CSR (Client-Side Rendering) frontend harness — covers Directive / Fetch / State / Test / Security / Deploy / Observability for client-component-only React/Vue SPAs.
status: implemented
---

## Harness identity

This is **1 of the 6 harnesses** in the AI workflow harness design (slide section 二).

| Harness | This file |
|---|---|
| FE × 4 | `skill_impl_fe_ssr.md` / **`skill_impl_fe_csr.md`** ← / `skill_impl_fe_isr.md` / `skill_impl_fe_ab.md` |
| BE × 1 | `skill_impl_be.md` |
| Ops × 1 | `skill_impl_ops.md` |

CSR is the path where the entire app runs in the browser — no server component, no SSR cache, no static generation, no flag-driven variants. State lives in `useState` / `Zustand` / `react-query`. The reason CSR is its own harness (and cannot be merged with SSR/ISR/A-B) is that **React's compiler boundary forces CSR code into the `'use client'` half of the runtime split**, so every downstream stage (test runner, threat model, deploy target, observability surface) is structurally different from SSR.

## When to use

Trigger when the user is building or modifying:
- a Vite / CRA / pure SPA React app (no Next.js, or Next.js but the page is `'use client'`)
- a Vue 3 Vite SPA
- a React Three Fiber Vite SPA
- React Native / Expo Router (CSR-equivalent on mobile — same `useState` mental model)
- mentions `useState`, `useEffect`, `useQuery`, `Zustand`, `Pinia`, `'use client'`, `localStorage`, `Vite`

DO NOT use this skill for SSR / ISR / A-B paths — those have their own harness files.

## Stage 1 — Directive

CSR pages are pure client components. There is no `generateMetadata` or `<Head>` SEO contract — the HTML shell ships empty and React fills it in after hydration.

**Operating instructions:**
- Top of the file: `'use client'` directive (Next.js) OR no directive (Vite / Vue / r3f — they default to client).
- Imports: only browser-safe modules (`react`, `react-dom`, `react-router-dom`, `zustand`, `pinia`, `@tanstack/react-query`, etc).
- NEVER import server-only modules (`fs`, `path`, `crypto.randomBytes`, server SDK clients) — Vite/webpack will throw at build time.
- NEVER call `await` at the top level — top-level `await` is a server component pattern.

**Code pattern:**
```tsx
'use client'  // Next.js — omit for Vite/Vue/r3f
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
```

## Stage 2 — Fetch

CSR fetches data from the browser at runtime. Always through a hook (react-query, SWR, or a custom `useEffect` + `useState`). The fetch URL points at the BFF / API gateway — never directly at internal services.

**Operating instructions:**
- Use `useQuery` from `@tanstack/react-query` for any GET. NEVER raw `fetch` in `useEffect` for new code.
- Use the project's `api` module (the VITE_MOCK dual-client switch) so demo mode and prod mode share types.
- Fetches go to `/api/v1/*` via the project's axios instance — `baseURL` comes from `import.meta.env.VITE_API_BASE`.
- For real-time updates, use `useSignalR` / `useWebSocket` / `useYjs` — DO NOT poll.

**Code pattern:**
```tsx
import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'

const { data, isLoading, error } = useQuery({
  queryKey: ['license', id],
  queryFn: () => api.fetchLicense(id),
})
```

## Stage 3 — State

CSR state lives in three layers: **local component** (`useState`), **shared client store** (Zustand / Pinia), **server cache** (react-query). NEVER store server data in Zustand — use react-query for that and Zustand only for UI state.

**Operating instructions:**
- Local `useState` for transient UI (form input, toggle, hover).
- Zustand / Pinia for cross-component client state (auth token, theme, sidebar open).
- react-query for any server-derived data — its cache IS the server-state store.
- Persist auth token to `localStorage`. NEVER `sessionStorage` (lost on tab close).
- Hydrate Zustand from `localStorage` on store creation, not in `useEffect`.

**Code pattern:**
```ts
// Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('app_token') || '',
  user: null,
  login: (username, password) => {
    const token = 'mock-jwt'  // real call would go through api.login
    set({ token, user: { name: username } })
    localStorage.setItem('app_token', token)
  },
  logout: () => {
    set({ token: '', user: null })
    localStorage.removeItem('app_token')
  },
}))
```

## Stage 4 — Test

CSR tests run in `jsdom` with `@testing-library/react` (or `@testing-library/vue`). Use `vitest` for new projects, `jest` for legacy. Cover: render-without-crash, user interaction, mocked api response, store mutation.

**Operating instructions:**
- `vitest run` for unit + integration. Test files colocated as `*.test.ts(x)`.
- Use `screen.getByRole` / `screen.getByText` — NEVER `container.querySelector`.
- Mock the api module via `vi.mock('@/api', ...)` so tests don't depend on `VITE_MOCK`.
- For Storybook visual coverage, ship `*.stories.tsx` next to the component.
- E2E uses Playwright against the dev build with `VITE_MOCK=true`.

**Code pattern:**
```ts
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LicensePage from './LicensePage'

vi.mock('@/api', () => ({
  api: { fetchLicense: vi.fn().mockResolvedValue({ id: '1', name: 'Pro' }) },
}))

it('renders license name after load', async () => {
  render(<LicensePage id="1" />)
  expect(await screen.findByText('Pro')).toBeInTheDocument()
})
```

## Stage 5 — Security

CSR threat model is **client-side only**. Different from SSR (which has server-log injection / output encoding) and ISR (cache poisoning).

**Threat surface:**
- DOM XSS via unescaped `dangerouslySetInnerHTML` / `v-html`
- Token theft via XSS — bearer tokens in `localStorage` are stealable
- CSP bypass via inline event handlers
- Prototype pollution from untrusted JSON
- Open redirect from unvalidated `?redirect=` params

**Operating instructions:**
- NEVER use `dangerouslySetInnerHTML` / `v-html` without DOMPurify.
- All `fetch` to BFF uses `Authorization: Bearer ${token}` — NEVER cookie auth (CSR has no CSRF token system).
- Set CSP header at the static-host level: `script-src 'self'; object-src 'none'`.
- Validate all `?redirect=` / `?next=` params against an allowlist of internal paths.
- Never log full request body / token to `console.error` — Sentry will capture it.

## Stage 6 — Deploy

CSR ships as **static assets to a CDN**. No Node runtime, no server. The build output is `dist/index.html` + `dist/assets/*.js` + `dist/assets/*.css`.

**Operating instructions:**
- `pnpm build` produces `dist/`. Upload to S3 + CloudFront, or to Vercel/Netlify static.
- `vite.config.ts` `base` must match the deployment subpath if not at root.
- All env vars referenced as `import.meta.env.VITE_*` are baked at build time — NEVER put secrets there.
- Cache headers: `index.html` no-cache, `assets/*` immutable + 1-year max-age.
- Single-page app fallback: every 404 returns `index.html` (CloudFront error response 200 → /index.html).

## Stage 7 — Observability

CSR observability comes from the **browser RUM**. No server logs, no APM trace from Node.

**Operating instructions:**
- `web-vitals` package reports CLS / LCP / INP / FID / TTFB. Hook in `src/main.tsx` BEFORE `createRoot`.
- Sentry browser SDK (`@sentry/react`) captures uncaught exceptions + unhandled promise rejections.
- React Profiler API for component-level slow render detection (only enable in dev).
- Lighthouse CI in the GitHub workflow with budgets on perf / a11y / best-practices.
- User session replay only with explicit consent — privacy regs.

## Memory writeback evidence — leaf scenario skills built from this harness

These leaf skills are concrete `Iteration → memory writeback` outputs of the CSR harness across the 3 portfolio projects:

### realtime_ai_whiteboard (CSR React + Yjs)
- [`fabric-canvas-tool`](../realtime_ai_whiteboard/skills/fabric-canvas-tool/skill.md)
- [`yjs-realtime-collab`](../realtime_ai_whiteboard/skills/yjs-realtime-collab/skill.md)
- [`zustand-mock-real-store`](../realtime_ai_whiteboard/skills/zustand-mock-real-store/skill.md)
- [`sse-ai-streaming-ui`](../realtime_ai_whiteboard/skills/sse-ai-streaming-ui/skill.md)
- [`protected-route-auth-page`](../realtime_ai_whiteboard/skills/protected-route-auth-page/skill.md)
- [`i18n-react-page`](../realtime_ai_whiteboard/skills/i18n-react-page/skill.md)
- [`expo-router-board-screen`](../realtime_ai_whiteboard/skills/expo-router-board-screen/skill.md) (RN — CSR-equivalent)

### enterprise_workflow_system (CSR Vue 3 + Element Plus)
- [`vue-multi-step-form-wizard`](../enterprise_workflow_system/skills/vue-multi-step-form-wizard/skill.md)
- [`vue-filterable-data-table`](../enterprise_workflow_system/skills/vue-filterable-data-table/skill.md)
- [`vue-echarts-kpi-dashboard`](../enterprise_workflow_system/skills/vue-echarts-kpi-dashboard/skill.md)
- [`vue-rbac-auth-flow`](../enterprise_workflow_system/skills/vue-rbac-auth-flow/skill.md)
- [`vue-mock-real-api-client`](../enterprise_workflow_system/skills/vue-mock-real-api-client/skill.md)
- [`vue-i18n-element-plus-bootstrap`](../enterprise_workflow_system/skills/vue-i18n-element-plus-bootstrap/skill.md)
- [`vue-feature-toggle-config-page`](../enterprise_workflow_system/skills/vue-feature-toggle-config-page/skill.md)
- [`vue-audit-log-viewer`](../enterprise_workflow_system/skills/vue-audit-log-viewer/skill.md)
- [`compose-approval-queue-screen`](../enterprise_workflow_system/skills/compose-approval-queue-screen/skill.md) (Android Compose — CSR-equivalent)
- [`swiftui-approval-queue-screen`](../enterprise_workflow_system/skills/swiftui-approval-queue-screen/skill.md) (iOS SwiftUI — CSR-equivalent)

### 3d_asset_collaboration (CSR React + react-three-fiber)
- [`three-viewer-r3f`](../3d_asset_collaboration/skills/three-viewer-r3f/skill.md)
- [`api-mock-real-switch`](../3d_asset_collaboration/skills/api-mock-real-switch/skill.md)
- [`multi-skin-routing`](../3d_asset_collaboration/skills/multi-skin-routing/skill.md)
- [`iot-realtime-dashboard`](../3d_asset_collaboration/skills/iot-realtime-dashboard/skill.md)
- [`upload-wizard-stepper`](../3d_asset_collaboration/skills/upload-wizard-stepper/skill.md)
- [`version-compare-split-view`](../3d_asset_collaboration/skills/version-compare-split-view/skill.md)
- [`theme-i18n-tokens`](../3d_asset_collaboration/skills/theme-i18n-tokens/skill.md)
- [`web-vitals-storybook-harness`](../3d_asset_collaboration/skills/web-vitals-storybook-harness/skill.md)
- [`expo-router-mobile-tabs`](../3d_asset_collaboration/skills/expo-router-mobile-tabs/skill.md) (RN — CSR-equivalent)
- [`mobile-asset-list-flatlist`](../3d_asset_collaboration/skills/mobile-asset-list-flatlist/skill.md) (RN — CSR-equivalent)

**Total: 27 leaf skills writing back into this single CSR harness across 3 projects (React + Vue + r3f + Compose + SwiftUI + RN).**

This is the proof that CSR is exactly **1 harness** — the 27 leaves all share the same Directive / Fetch / State / Test / Security / Deploy / Observability stages defined above; what differs is the scenario-specific code pattern, which is the legitimate "Iteration writeback" output of this harness.

## Anti-patterns

- Do NOT mix `'use client'` and `async function Component()` in the same file — one is CSR, the other is server component. They are mutually exclusive.
- Do NOT call server SDKs (AWS SDK with secret keys, Stripe with secret key, DB drivers) from CSR code — Vite will bundle them and they'll ship to the browser.
- Do NOT use `useEffect` to do data fetching in new code — use `useQuery` / `useSWR`.
- Do NOT bypass the `api` module to call `axios` directly — breaks the VITE_MOCK switch.
- Do NOT use `dangerouslySetInnerHTML` / `v-html` without sanitization.
- Do NOT store server data in Zustand — that's react-query's job.
- Do NOT confuse this harness with SSR/ISR/A-B — those are 3 separate harnesses with different stage contracts.
