---
name: skill_impl_fe_ab
description: A/B (variant rollout) frontend harness — covers Directive / Fetch / State / Test / Security / Deploy / Observability for client-component pages driven by a feature flag SDK.
status: spec-only
spec_only_reason: This monorepo's portfolio uses a custom feature toggle UI (vue-feature-toggle-config-page) but does not integrate a real flag SDK (LaunchDarkly / Statsig / Unleash) for runtime variant routing. This harness is documented as a design spec. Will become `implemented` when a flag SDK integration joins the workspace.
---

## Harness identity

This is **1 of the 6 harnesses** in the AI workflow harness design (slide section 二).

| Harness | This file |
|---|---|
| FE × 4 | `skill_impl_fe_ssr.md` / `skill_impl_fe_csr.md` / `skill_impl_fe_isr.md` / **`skill_impl_fe_ab.md`** ← |
| BE × 1 | `skill_impl_be.md` |
| Ops × 1 | `skill_impl_ops.md` |

A/B is the path where two or more variants of a feature ship to production simultaneously, and a feature flag SDK decides at runtime which variant each user sees. **The core existence reason for A/B is risk-bounded rollout** — ship the new variant to 1% → 10% → 50% → 100% based on conversion metrics, with instant kill-switch if metrics regress.

## Why A/B cannot share a harness with SSR / CSR / ISR

A/B is technically a CSR variant (it lives in `'use client'` components), but its **runtime behavior is fundamentally different** from plain CSR:

- The SAME deployed bundle contains both `OldUI` and `NewUI` code paths
- The flag SDK decides which path to render at runtime, per user, with a sticky bucket
- Test must cover both variants in a matrix
- Observability splits metrics per variant for conversion analysis
- Security must protect against variant leak (attacker forces themselves into a not-yet-released variant)

These concerns don't exist in plain CSR. Merging the harnesses would mean every CSR component would have to consider variant logic — bloat for the 95% of pages that never A/B test.

## When to use

Trigger when the user is building or modifying:
- a feature gated behind a feature flag SDK (LaunchDarkly, Statsig, Unleash, Optimizely, GrowthBook)
- a new UI variant being rolled out gradually (1% → 10% → 50% → 100%)
- mentions `useFlag`, `variant`, `sticky bucket`, `flag exposure`, `kill switch`, `LaunchDarkly`, `Statsig`
- a kill-switch / circuit breaker for a risky feature

DO NOT use this skill for admin pages (use CSR) or for SEO-critical pages (variants confuse crawlers — use ISR with a stable variant for the bot user-agent).

## Stage 1 — Directive

A/B pages are client components (`'use client'`) that consume a flag hook. The hook decides which child component to render.

**Operating instructions:**
- Top of the file: `'use client'` directive.
- Import the flag hook from the SDK wrapper (`useFlag('flag-key')` returns the variant).
- Render variants conditionally — `if (variant === 'control') return <OldUI />`.
- The bundle ships BOTH `OldUI` and `NewUI` — code-splitting is OK if you lazy-load both with `Suspense`.
- NEVER render variants in a server component — flag evaluation depends on per-user context that's only available client-side.

**Code pattern:**
```tsx
'use client'
import { useFlag } from '@/lib/flags'
import OldLicenseUI from './OldLicenseUI'
import NewLicenseUI from './NewLicenseUI'

export default function LicenseRoute() {
  const variant = useFlag('new-license-ui')
  if (variant === 'control') return <OldLicenseUI />
  return <NewLicenseUI />
}
```

## Stage 2 — Fetch

A/B fetches go through the same `api` module as CSR. The variant only affects which UI consumes the data, not which endpoint is called — UNLESS the variant is a backend A/B too, in which case the api module routes by variant.

**Operating instructions:**
- Default: same `api.fetchX()` call regardless of variant.
- For variant-specific endpoints: branch in the api module, NOT in the component.
- Pass the variant ID as a header (`X-Variant: new-license-ui`) so backend can log per-variant.

## Stage 3 — State

A/B state has TWO layers: (1) the user's bucket assignment (which variant they're in — must be sticky across sessions) and (2) the variant-specific UI state.

**Operating instructions:**
- Bucket assignment is sticky — the SDK persists the user's variant in `localStorage` or a server-side identity map. NEVER recompute per render.
- For anonymous users, bucket by a stable client ID (`cookies` or `crypto.randomUUID()` persisted to `localStorage`).
- Variant-specific UI state is plain Zustand/`useState` — same as CSR.
- NEVER let the variant flicker after first paint — preload the variant from `localStorage` synchronously.

## Stage 4 — Test

A/B tests must cover **the variant matrix**: every variant × every key user interaction.

**Operating instructions:**
- Mock the flag SDK with `vi.mock('@/lib/flags', ...)` and assert each variant renders.
- For Storybook, ship one story per variant (`LicenseRoute_Control`, `LicenseRoute_Treatment`).
- E2E: use the SDK's force-flag mechanism (URL param like `?force_flag=new-license-ui:treatment`) to test each variant in isolation.
- Test the sticky bucket logic — second visit returns the same variant.
- Snapshot test BOTH variants — regression in one variant must fail CI.

**Code pattern:**
```ts
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import LicenseRoute from './LicenseRoute'

vi.mock('@/lib/flags')
import { useFlag } from '@/lib/flags'

it('renders OldLicenseUI for control variant', () => {
  vi.mocked(useFlag).mockReturnValue('control')
  render(<LicenseRoute />)
  expect(screen.getByTestId('old-ui')).toBeInTheDocument()
})

it('renders NewLicenseUI for treatment variant', () => {
  vi.mocked(useFlag).mockReturnValue('treatment')
  render(<LicenseRoute />)
  expect(screen.getByTestId('new-ui')).toBeInTheDocument()
})
```

## Stage 5 — Security

A/B threat model is **flag exposure + variant leak + flag SDK auth**. Different from CSR (DOM XSS), SSR (server-side), ISR (cache poisoning).

**Threat surface:**
- Flag exposure — attacker reads `window.flags` or the SDK's debug API to discover unreleased features
- Variant spoof — attacker forces themselves into a variant they shouldn't have (early access leak)
- Sticky bucket spoof — attacker manipulates `localStorage` to switch variants
- Flag SDK auth — if the SDK's flag-list endpoint is unauthenticated, attacker enumerates all flags
- Cross-variant data leak — analytics events not properly scoped by variant

**Operating instructions:**
- The flag SDK MUST authenticate its flag-fetch call with a per-user token.
- NEVER expose the full flag list client-side — fetch only the flags this user is bucketed into.
- Sensitive variants (early access, beta) MUST also gate at the API layer — never trust client-side variant routing for security boundaries.
- Variant assignment is logged server-side for audit (who saw what when).
- Force-flag URL params MUST be disabled in production (only allowed in dev/staging).

## Stage 6 — Deploy

A/B deploys to the SAME runtime as CSR (static CDN) plus a **flag SDK service** that the bundle calls at startup.

**Operating instructions:**
- `pnpm build` produces the same `dist/` as CSR — the variant code is just a conditional branch in the bundle.
- The flag SDK initializes on app boot via `flagSDK.init({ clientId, userId })`.
- The flag SDK polls or streams flag updates — use streaming if available for instant kill-switch propagation.
- Set up a kill-switch flag (`emergency-disable-new-license-ui`) that immediately reverts to control.
- For LaunchDarkly: use the streaming SDK + kill switch + ring deployment (`Internal → Beta → 1% → 50% → 100%`).

## Stage 7 — Observability

A/B observability is **per-variant metrics + conversion funnel + sticky bucket validation**.

**Operating instructions:**
- Sentry client SDK tags every event with `variant: <variant-id>` so error rate splits per variant.
- Web Vitals reports tagged by variant — regression in one variant must alert.
- Conversion funnel: per-variant click-through, sign-up, purchase rate.
- Sticky bucket monitoring: % of users whose variant changed across sessions (should be ~0%).
- Kill switch trigger: if `error_rate(treatment) > 2× error_rate(control)`, auto-flip the kill switch.
- Statistical significance check before declaring a winner — not just raw conversion deltas.

## Memory writeback evidence

**`status: spec-only`** — this monorepo has a feature toggle admin UI (see the leaf [`vue-feature-toggle-config-page`](../enterprise_workflow_system/skills/vue-feature-toggle-config-page/skill.md)) but no integrated flag SDK doing runtime variant routing. The toggle UI is mock-state, not a real flag service, so there are no leaf skills that genuinely demonstrate this harness end-to-end.

This harness is the **design spec** that would be filled with leaves once a real LaunchDarkly / Statsig integration ships in the workspace.

## Anti-patterns

- Do NOT render variants in a server component — flag evaluation needs per-user context only available client-side.
- Do NOT skip the sticky bucket — without it, users see different variants on every page load and metrics become noise.
- Do NOT trust client-side variant routing for security boundaries — gate sensitive features at the API too.
- Do NOT ship variants without a kill switch — you need an instant rollback path for when the new variant breaks.
- Do NOT enable force-flag URL params in production — that's a variant-leak vector.
- Do NOT confuse this harness with CSR — A/B is "CSR + variant matrix + flag SDK + per-variant observability".
- Do NOT confuse this harness with SSR/ISR — those are server-rendered, A/B is client-rendered.
