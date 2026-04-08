---
name: skill_impl_fe_ssr
description: SSR (Server-Side Rendering) frontend harness — covers Directive / Fetch / State / Test / Security / Deploy / Observability for Next.js server components rendered per-request.
status: spec-only
spec_only_reason: This monorepo's portfolio is React/Vue/r3f Vite SPAs (CSR-only). No Next.js / SSR runtime exists in any of the 3 projects, so this harness is documented as a design spec rather than a code-cited skill. Will become `implemented` when a Next.js project joins the workspace.
---

## Harness identity

This is **1 of the 6 harnesses** in the AI workflow harness design (slide section 二).

| Harness | This file |
|---|---|
| FE × 4 | **`skill_impl_fe_ssr.md`** ← / `skill_impl_fe_csr.md` / `skill_impl_fe_isr.md` / `skill_impl_fe_ab.md` |
| BE × 1 | `skill_impl_be.md` |
| Ops × 1 | `skill_impl_ops.md` |

SSR is the path where each request renders HTML on a Node runtime. The HTML shell is fully populated before it reaches the browser, so the search-engine crawler reads complete content. **The core existence reason for SSR is SEO** — without SEO requirements, CSR is always cheaper.

## Why SSR cannot share a harness with CSR / ISR / A-B

React's compiler splits component code into two runtimes at file-level. SSR lives in the **server component half** — it can use top-level `await`, `async function Component()`, server-side `fetch` with secret tokens, and `generateMetadata` for SEO. CSR cannot use any of those. ISR uses the same server-component primitives but adds `revalidate` semantics. A-B uses client component + flag SDK.

These are 4 mutually-exclusive mental models. A single skill file teaching all 4 simultaneously would generate broken code, because the AI cannot pick the wrong runtime and recover.

## When to use

Trigger when the user is building or modifying:
- a Next.js page that needs SEO indexing (license page, product page, public marketing page)
- a Next.js page that needs per-request server-side data with auth-bound tokens
- mentions `generateMetadata`, `async function Page`, `cache: 'no-store'`, `getServerSession`
- pages where `crawler must read full HTML` is a hard requirement

DO NOT use this skill for admin dashboards (use CSR), SKU description pages with hourly updates (use ISR), or feature rollout pages (use A-B).

## Stage 1 — Directive

SSR pages are server components. **No `'use client'` directive.** They run on Node, can `await` at top level, and can call any server-side API including secret tokens.

**Operating instructions:**
- Top of the file: NO directive. Default in Next.js app router is server component.
- `export async function generateMetadata({ params }): Promise<Metadata>` — generates SEO `<title>`, `<meta description>`, OpenGraph tags by fetching the underlying data.
- The page itself is `export default async function Page({ params }) { ... }` — top-level `async`.
- Imports may include server-only modules (`fs`, `crypto`, server SDK clients).
- NEVER import `'use client'` modules or `useState` / `useEffect` — they will fail compilation.

**Code pattern:**
```tsx
import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth'

export async function generateMetadata({ params }): Promise<Metadata> {
  const res = await fetch(`${process.env.BE_API}/licenses/${params.id}/public`)
  const license = await res.json()
  return {
    title: `${license.name} | TXOne License`,
    description: license.summary,
    openGraph: { title: license.name, description: license.summary, images: [license.coverImage] },
  }
}

export default async function LicensePage({ params }) {
  const session = await getServerSession()
  const res = await fetch(`${process.env.BE_API}/licenses/${params.id}`, {
    headers: { authorization: `Bearer ${session.token}` },
    cache: 'no-store',
  })
  const license = await res.json()
  return (
    <article>
      <h1>{license.name}</h1>
      <p>{license.description}</p>
    </article>
  )
}
```

## Stage 2 — Fetch

SSR fetches happen on the Node server, with `cache: 'no-store'` to force per-request freshness. Tokens come from server-side session, never from `localStorage`.

**Operating instructions:**
- Use top-level `await fetch(...)` inside the async page component.
- Always pass `cache: 'no-store'` for per-request data, OR `next: { revalidate: 0 }` (same effect).
- Auth header from `getServerSession()` — NEVER from cookies parsed manually.
- For parallel fetches, `Promise.all([fetchA(), fetchB()])` at top of the function body.
- Internal microservices reachable via `process.env.BE_API` private URL (not public).

## Stage 3 — State

SSR state is **request-scoped**. There is no client-side store in this harness — any client interactivity must come from a `'use client'` child component.

**Operating instructions:**
- Server output is the source of truth — no `useState` allowed.
- For interactive widgets, isolate them in a `'use client'` child component and pass server-fetched data as props.
- Cookie-based session via `cookies()` from `next/headers`.
- For pagination state, use URL params (`?page=2`), not client state.

## Stage 4 — Test

SSR tests use **server snapshot testing** — render the async component to HTML on the server and assert the output.

**Operating instructions:**
- `next-test-api-route-handler` for API route testing.
- `@vercel/test-utils` or custom server harness to render an async server component.
- Mock `getServerSession` / `fetch` at the module level via `jest.mock` / `vi.mock`.
- Snapshot the rendered HTML and assert critical content (NOT class names — those change).
- E2E with Playwright against `next dev` to verify hydration.

## Stage 5 — Security

SSR threat model is **server-side**. Different from CSR (DOM XSS) and ISR (cache poisoning) and A-B (flag exposure).

**Threat surface:**
- Output encoding — JSX auto-escapes, but `dangerouslySetInnerHTML` is a server-side foot-gun
- Server log injection — `console.log(req.body)` can leak tokens to stdout/Datadog/Sentry
- CSRF on POST — server components handling forms need a CSRF token
- HTTP-only / Secure cookies for session
- Request smuggling at the proxy layer
- SSRF if user input flows into server-side `fetch(...)`

**Operating instructions:**
- ALWAYS use `httpOnly` + `Secure` + `SameSite=Lax` cookies for session.
- POST forms include a CSRF token validated server-side (`next-csrf` or custom middleware).
- NEVER log full request bodies — redact `Authorization`, `password`, `token` fields.
- Validate all user-supplied URLs before passing to server-side `fetch`.
- Server SDK secret keys live in `process.env.*` and are NEVER exposed via `next/env` to the client.

## Stage 6 — Deploy

SSR deploys to a **Node runtime** (or Edge runtime for lightweight pages). NOT static CDN.

**Operating instructions:**
- `next build && next start` runs a Node server. Container it (Dockerfile) and deploy to ECS/Fargate/Cloud Run.
- For Edge runtime (lower latency, fewer Node APIs), set `export const runtime = 'edge'` per route.
- Vercel ships SSR as serverless functions automatically.
- HPA on CPU/memory — SSR is per-request work, scaling matters.
- Health endpoint (`/api/health`) for the load balancer.

## Stage 7 — Observability

SSR observability is **server-side trace + SEO metrics**. Different from CSR's browser RUM.

**Operating instructions:**
- OpenTelemetry SDK in `instrumentation.ts` to trace incoming requests + downstream `fetch` calls.
- Sentry Node SDK captures unhandled exceptions in async page components.
- Server-side TTFB and LCP via `next-build-analytics` or custom instrumentation.
- **SEO indexing dashboards**: Search Console + Lighthouse CI on the deployed URL.
- Alert on indexing coverage drop (Google Search Console API → alert).

## Memory writeback evidence

**`status: spec-only`** — this monorepo has no Next.js project, so no leaf skill files cite SSR code. This harness is the **design spec** that would be filled with leaf skills once a Next.js portfolio project joins the workspace.

If you need to see CSR-path leaves as a reference for how memory writeback works, see [`skill_impl_fe_csr.md`](skill_impl_fe_csr.md) — it has 27 leaf skills citing real Vite SPA code.

## Anti-patterns

- Do NOT add `'use client'` to a page that uses `generateMetadata` — they're mutually exclusive.
- Do NOT use `useState` / `useEffect` / `useQuery` in SSR pages — those are CSR primitives.
- Do NOT skip `cache: 'no-store'` if the data must be fresh per request — without it, Next.js caches and you'll serve stale data.
- Do NOT log `req.headers` or `req.body` without redaction — server logs persist.
- Do NOT confuse SSR with ISR — SSR runs per request, ISR caches with revalidate window.
- Do NOT confuse this harness with CSR/ISR/A-B — they have different runtimes and security surfaces.
