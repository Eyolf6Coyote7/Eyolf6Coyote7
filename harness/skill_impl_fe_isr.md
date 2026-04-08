---
name: skill_impl_fe_isr
description: ISR (Incremental Static Regeneration) frontend harness — covers Directive / Fetch / State / Test / Security / Deploy / Observability for cache-keyed pages with revalidate windows.
status: spec-only
spec_only_reason: This monorepo's portfolio is Vite SPAs (CSR-only). No Next.js / ISR runtime exists, so this harness is documented as a design spec. Will become `implemented` when a Next.js project with `revalidate` config joins the workspace.
---

## Harness identity

This is **1 of the 6 harnesses** in the AI workflow harness design (slide section 二).

| Harness | This file |
|---|---|
| FE × 4 | `skill_impl_fe_ssr.md` / `skill_impl_fe_csr.md` / **`skill_impl_fe_isr.md`** ← / `skill_impl_fe_ab.md` |
| BE × 1 | `skill_impl_be.md` |
| Ops × 1 | `skill_impl_ops.md` |

ISR is the path where pages are statically generated at build time but periodically regenerated based on a `revalidate` window. The output is served from CDN/edge cache like a static asset, but with freshness guarantees. **The core existence reason for ISR is balancing SEO requirements with low per-request cost** — perfect for high-traffic catalog/SKU/blog pages.

## Why ISR cannot share a harness with SSR / CSR / A-B

ISR uses server components (like SSR) but adds **cache key + revalidate window** as a first-class design dimension. The mental model is "stale data is acceptable for N seconds, then regenerate in the background." None of CSR / SSR / A-B has this concept:

- CSR has no cache (every request goes live to client+API)
- SSR has no cache (every request rebuilds HTML on the server)
- A-B has no cache (variants are decided at request time per user)

Designing the cache key correctly is the entire harness — get it wrong and you'll either serve stale data forever or hit the origin on every request.

## When to use

Trigger when the user is building or modifying:
- a Next.js page for catalog content, product pages, SKU pages, blog posts, marketing copy
- pages where SEO is required AND data changes hourly/daily but not per-request
- mentions `revalidate`, `generateStaticParams`, `next: { revalidate: N }`, `revalidateTag`
- migration from SSR to ISR for cost reasons

DO NOT use this skill for admin dashboards (use CSR), authenticated user-specific pages (use SSR), or feature rollout pages (use A-B).

## Stage 1 — Directive

ISR pages are server components with a `revalidate` export. Same `'use client'` rules as SSR (none allowed at the top level).

**Operating instructions:**
- Top of the file: `export const revalidate = 3600` (or whatever window in seconds).
- `export async function generateStaticParams()` enumerates all paths to pre-build at build time.
- The page itself: `export default async function Page({ params }) { ... }`.
- `generateMetadata` works the same as SSR — runs at build/regenerate time, not per-request.

**Code pattern:**
```tsx
export const revalidate = 3600  // regenerate every hour

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BE_API}/sku/list`)
  return (await res.json()).map((s) => ({ slug: s.slug }))
}

export default async function SKUPage({ params }) {
  const res = await fetch(`${process.env.BE_API}/sku/${params.slug}`, {
    next: { revalidate: 3600, tags: [`sku-${params.slug}`] },
  })
  const sku = await res.json()
  return <div>{sku.description}</div>
}
```

## Stage 2 — Fetch

ISR fetches use `next: { revalidate, tags }` instead of `cache: 'no-store'`. The `tags` enable on-demand revalidation via `revalidateTag('sku-foo')`.

**Operating instructions:**
- Always pass `next: { revalidate: N, tags: ['scope-id'] }` — both fields.
- Tag naming: `<entity>-<id>` so `revalidateTag('sku-123')` invalidates exactly that page.
- For draft preview (admin sees fresh data), use `draftMode().enable()` + `cache: 'no-store'` branch.
- NEVER mix `cache: 'no-store'` and `revalidate` in the same fetch — they conflict.

## Stage 3 — State

ISR state is **cache-key + revalidate window**. The "state" of an ISR page IS the cache entry — designing the cache key correctly is the harness's central responsibility.

**Operating instructions:**
- Cache key = page URL + any query params that should differentiate cached versions.
- `revalidate` window depends on data freshness SLA — 60s for catalog, 3600s for blog, 86400s for static reference.
- For on-demand invalidation from the admin UI, expose a `/api/revalidate?tag=sku-123&secret=...` route.
- Background revalidation: stale-while-revalidate is automatic — serve stale, regenerate, swap.
- NEVER call `revalidatePath` from inside a render — only from API routes / mutations.

## Stage 4 — Test

ISR tests must verify two things: **the static generation produces the expected HTML** AND **the revalidate window behaves correctly under stale-while-revalidate**.

**Operating instructions:**
- Snapshot test the server-rendered HTML at build time (same as SSR test pattern).
- Mock `fetch` with a counter to assert revalidate hits the origin only once per window.
- E2E test: trigger `revalidateTag` via API, then assert the next page load shows new data.
- For preview mode, test both branches (`draftMode` enabled vs disabled).

## Stage 5 — Security

ISR threat model is **cache integrity + on-demand revalidation auth**. Different from SSR (server-side) and CSR (DOM XSS).

**Threat surface:**
- Cache poisoning — attacker injects content that gets cached and served to all users
- Stale token leak — old user tokens baked into cached HTML
- CDN purge auth — if `/api/revalidate` is unauthenticated, attacker can force regeneration and hit origin
- Regenerate race — concurrent regenerations producing inconsistent output
- Cache key collision — different users/tenants accidentally sharing cache entries

**Operating instructions:**
- NEVER bake user-specific data into ISR pages — those belong in CSR or SSR.
- `/api/revalidate` requires a `secret` query param checked against `process.env.REVALIDATE_SECRET`.
- Cache keys MUST include tenant ID if multi-tenant.
- Use `tags` for granular invalidation; never use `revalidatePath('/')` (nukes everything).
- Monitor regenerate latency — if it spikes, you have a thundering-herd problem.

## Stage 6 — Deploy

ISR deploys to **edge runtime + KV cache**. Vercel and Cloudflare both have first-class ISR support.

**Operating instructions:**
- `next build` produces both static HTML and revalidate handlers.
- Vercel: ISR works out of the box, cached at the edge with KV.
- Cloudflare Pages: same.
- Self-hosted: requires `next start` + a shared Redis/KV for cache state across instances.
- CDN purge webhook: when origin data changes, hit the revalidate endpoint to invalidate.

## Stage 7 — Observability

ISR observability is **cache hit rate + stale serve rate + regenerate latency + SEO indexing**.

**Operating instructions:**
- Track cache hit rate per route — drop indicates revalidate window too short.
- Track stale-serve rate — high stale serves with long regenerate latency = bad UX.
- Sentry on the regenerate handler — failures here are silent (page still serves stale).
- SEO: Google Search Console indexing coverage (same as SSR — both produce indexable HTML).
- Alert on regenerate failures > 1% (means origin or build is broken).

## Memory writeback evidence

**`status: spec-only`** — this monorepo has no Next.js / ISR project, so no leaf skill files cite ISR code. This harness is the **design spec** that would be filled once a Next.js portfolio project with `revalidate` joins the workspace.

For a leaf-citation example using a different harness, see [`skill_impl_fe_csr.md`](skill_impl_fe_csr.md).

## Anti-patterns

- Do NOT use ISR for user-authenticated pages — bake user data into a cache key and you'll leak across sessions.
- Do NOT set `revalidate = 0` — that's SSR, use `skill_impl_fe_ssr.md`.
- Do NOT skip the `tags` field — without tags you can only invalidate by full revalidate window expiry.
- Do NOT call `revalidateTag` from a render function — only from API routes / server actions.
- Do NOT mix `cache: 'no-store'` and `next: { revalidate }` — they conflict.
- Do NOT use ISR if the data freshness SLA is < 30 seconds — switch to SSR.
- Do NOT confuse this harness with SSR/CSR/A-B — different runtime semantics.
