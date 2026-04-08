# AI Workflow Harness — Backbone

This document describes the SDLC harness backbone designed to coordinate AI-assisted development across the three portfolio projects in this monorepo. It is the **theoretical framework** that justifies why frontend skills are split finely while backend skills converge.

The **leaf evidence** for this harness lives in each project's `skills/<scenario>/skill.md` files (see [Skill Catalog](#skill-catalog) at the bottom).

---

## Core thesis

> **The difference between frontend and backend AI harness design is not "does the architecture decision branch" — both branch — but "does the branch affect downstream stages".**

- **Backend**: contract (REST / gRPC / GraphQL) and storage (SQL / NoSQL / Vector) decisions branch in Architecture, produce different code in Implementation, then **converge at Pre-commit**. Test, Security, Deploy, Observability share ONE pipeline.
- **Frontend**: render mode (SSR / CSR / ISR / A-B) decision branches in Architecture and **never converges**. Each path carries its own Test matrix, Threat model, Deploy runtime, and Observability surface all the way to Iteration.

This is why frontend needs more skill.md files than backend. It is not a function of "frontend has more screens" — it is a function of "frontend's architecture branches do not collapse downstream".

---

## SDLC stage table

| # | SDLC stage | Harness component | FE skill count | BE skill count | Note |
|---|---|---|---|---|---|
| 1 | Requirements Intake | `skill_pm_intake.md` + pm-spec subagent | 1 | 1 | shared |
| 2 | Design / Spec Handoff | Figma MCP + `skill_design_handoff.md` | 1 | — | frontend only |
| 3 | Architecture / Plan | `skill_arch_*.md` + Plan mode | 4 | 3 | FE: render mode; BE: contract × storage |
| 4 | Implementation | `skill_impl_*.md` + CLAUDE.md | 4 | 3 | |
| 5 | Pre-commit Hook | lint / typecheck / format | 2 | 1 | FE: server-component lint vs client-component lint are two passes |
| 6 | Code Review | `skill_review_*.md` + review subagent | 4 | 3 | |
| 7 | Test | `skill_test_*.md` + post-edit hook | 4 | 3 | FE multiplied by test type × browser × device matrix (288 cells) |
| 8 | Security Review | SAST / DAST / SBOM / secret-scan | 4 | 1 | FE: 4 different threat models per render mode |
| 9 | CI/CD | github MCP + pre-push hook | 1 | 1 | converged |
| 10 | Deploy | terraform / k8s / edge MCPs | 4 | 1 | FE: runtime per render mode; BE: container unified |
| 11 | Observability | sentry / grafana / Web Vitals RUM | 4 | 1 | FE: hydration error / Web Vitals per render mode; BE: unified APM |
| 12 | Iteration | `memory/*.md` + feedback loop → skill.md | 4 | 3 | per-path write-back |
| | **Total harness components** | | **37** | **22** | |

The asymmetry (37 vs 22) is the core evidence the harness exists to manage.

---

## Frontend pipeline (4 paths, no merge)

```
PM intake
   ↓
Design handoff (Figma MCP)
   ↓
Architecture — choose render mode
   ↓
   ├── SSR  → Impl → Review → Test → Security → Deploy → Observability → Iteration → skill_ssr.md
   ├── CSR  → Impl → Review → Test → Security → Deploy → Observability → Iteration → skill_csr.md
   ├── ISR  → Impl → Review → Test → Security → Deploy → Observability → Iteration → skill_isr.md
   └── A-B  → Impl → Review → Test → Security → Deploy → Observability → Iteration → skill_ab.md
```

Each path's downstream stages (Impl, Review, Test, Security, Deploy, Obs) carries different invariants. Concretely:

- **Test matrix per path**: render mode (4) × test type (6) × browser (4) × device (3) = **288 test cells**.
- **Security threat model per path**:
  - SSR → output encoding, httpOnly cookies, CSRF, server log injection
  - CSR → DOM XSS sinks, in-memory tokens, prototype pollution
  - ISR → cache poisoning, stale tokens, CDN purge auth, regenerate races
  - A-B → flag exposure, variant leakage, sticky bucket spoofing
- **Deploy runtime per path**: SSR Node server vs CSR static CDN vs ISR edge cache vs A-B flag-aware split.
- **Observability per path**: SSR hydration error tracking vs CSR Web Vitals RUM vs ISR cache hit ratio vs A-B variant exposure metrics.

**This project's portfolio evidence**: All three apps in this monorepo are CSR-only (Vite SPA / React Native). The 37-component count is the harness *design*; the leaf skill files in each project are CSR-path implementations of that design. SSR / ISR / A-B remain spec-level until a Next.js or feature-flag rollout project is added.

---

## Backend pipeline (3 paths, converge at Pre-commit)

```
PM intake
   ↓
Architecture — choose contract + storage
   ↓
   ├── REST    → Impl
   ├── gRPC    → Impl
   └── GraphQL → Impl
                  ↓
              Pre-commit (3 paths converge)
                  ↓
       Review → Test → Security → CI/CD → Deploy → Observability → Iteration
                       (single unified pipeline)
```

The same convergence pattern holds for storage choice (SQL / NoSQL / Vector) — divergence at Implementation, single downstream pipeline.

**Why backend converges**:
- All three contracts compile to a single container image — `Deploy` is one Dockerfile.
- All three storages share `EXPLAIN ANALYZE` / migration discipline — `Test` is one harness.
- All three contracts share request ID propagation + APM hooks — `Observability` is one Sentry/Grafana surface.
- SAST / SBOM / secret-scan are language-level not contract-level — `Security` is one pass.

**This project's portfolio evidence**:
- `realtime_ai_whiteboard` backend = NestJS REST + WebSocket
- `enterprise_workflow_system` backend = Spring Boot Kotlin GraphQL (DGS) + JPA + Laravel REST + Kotlin Kafka
- `3d_asset_collaboration` backend = ASP.NET Core REST + SignalR + .NET Kafka + Python FastAPI ONNX

Even across **5 different backend tech stacks**, the per-project skill count stays at **3 backend skill files** because the harness only needs 3 generic backend patterns: a REST/CRUD pattern, a real-time push pattern, and a queue/worker pattern. That's the convergence.

---

## Cross-cutting harness governance

Components that don't belong to any single SDLC stage:

| Component | Content |
|---|---|
| Model routing | Opus 4.6 → architecture / review; Sonnet 4.6 → implementation; Haiku 4.5 → lint / format / micro-fixes |
| skill.md governance | versioning, PR review, rollout flow, who can change |
| Workflow eval / regression | regression tests on the skill.md files themselves; run eval set before/after a skill change |
| Permissions / sandbox | settings.json hooks, tool allowlist, dangerous-skip control |
| Audit log / trace | what AI did, retained for compliance (e.g. TXOne) |
| Secrets handling | AI context never exfiltrates tokens or keys |
| Cost / token budget | per-subagent ceiling, monthly budget |
| Human-in-the-loop | which stages require human approval (migration, security fix, prod deploy) |
| Onboarding | how a new engineer enters the harness — adoption rate is the KPI |

---

## Skill catalog — leaf evidence

The harness is implemented as ~36 leaf skill files distributed across the three projects. Counts are split into FE / Mobile / BE so the asymmetry is visible.

### realtime_ai_whiteboard — 10 skills (6 FE + 1 Mobile + 3 BE)

Frontend (CSR React + Yjs):
- `fabric-canvas-tool` — Fabric.js v7 drawing tool with palette + listener discipline
- `yjs-realtime-collab` — Yjs CRDT + y-websocket + IndexeddbPersistence + 33ms-throttled awareness
- `zustand-mock-real-store` — Zustand store backed by mock vs real ApiClient via VITE_MOCK
- `sse-ai-streaming-ui` — AI chat panel consuming a NestJS @Sse endpoint with mirrored mock branch
- `protected-route-auth-page` — React Router ProtectedRoute with isMock bypass
- `i18n-react-page` — react-i18next keys across en/zh-TW with LanguageToggle

Mobile:
- `expo-router-board-screen` — React Native Expo Router screen with theme tokens + Ionicons

Backend (NestJS):
- `nestjs-tenant-crud` — NestJS controller+service+DTO with multi-tenant Prisma scoping, pagination, JWT, guest tokens
- `ai-task-queue-sse` — Redis Stream NestJS producer + Python asyncio consumer + SSE result poller
- `y-websocket-jwt-gateway` — Embedded Yjs WebSocket gateway with JWT validation from query string

### enterprise_workflow_system — 13 skills (8 FE + 2 Mobile + 3 BE)

Frontend (CSR Vue 3 + Element Plus):
- `vue-multi-step-form-wizard` — 3-step Vue 3 wizard (template picker → form → review)
- `vue-filterable-data-table` — list page with stat chips + multi-filter + table + pagination
- `vue-echarts-kpi-dashboard` — 4-column KPI cards + tree-shaken echarts charts
- `vue-rbac-auth-flow` — Pinia auth + router guard + isMock auto-login
- `vue-mock-real-api-client` — VITE_MOCK dual client with shared TypeScript types
- `vue-i18n-element-plus-bootstrap` — main.ts bootstrap recipe (Pinia + i18n + Element Plus)
- `vue-feature-toggle-config-page` — feature toggle admin page with category badges
- `vue-audit-log-viewer` — audit log table with multi-field filter bar + live indicator

Mobile:
- `compose-approval-queue-screen` — Jetpack Compose Material3 list with segmented control + LazyColumn
- `swiftui-approval-queue-screen` — SwiftUI counterpart with NavigationStack + custom segmented control

Backend:
- `kotlin-dgs-graphql-jpa-crud` — Spring Boot + Netflix DGS + JPA spring-data method-name queries
- `laravel-rest-crud-with-audit` — thin Laravel controller with paginate(20) + inline validate
- `kotlin-kafka-notification-worker` — Spring Boot @KafkaListener with try/catch + service injection

### 3d_asset_collaboration — 13 skills (8 FE + 2 Mobile + 3 BE)

Frontend (CSR React + react-three-fiber):
- `three-viewer-r3f` — Canvas + drei OrbitControls + Environment + useFrame animation
- `api-mock-real-switch` — module-level function-export VITE_MOCK switch
- `multi-skin-routing` — three layout skins (default web / Unity standalone / mobile standalone)
- `iot-realtime-dashboard` — hand-SVG line charts + alert table + auto-refresh toggle
- `upload-wizard-stepper` — 3-step file upload wizard with drop zone + AI tag chips
- `version-compare-split-view` — side-by-side diff viewer with floating badges + footer diff stats
- `theme-i18n-tokens` — CSS variable theme + useTheme hook + react-i18next bootstrap
- `web-vitals-storybook-harness` — vitest + Storybook + web-vitals + Lighthouse CI

Mobile:
- `expo-router-mobile-tabs` — file-system tab routing with emoji icons
- `mobile-asset-list-flatlist` — 2-column FlatList grid with color placeholder thumbnails

Backend:
- `aspnet-ef-crud-pagination` — ASP.NET Core controller + EF Core CRUD + EF.Functions.ILike search
- `signalr-realtime-hubs` — SignalR Hub with broadcast + room/group + lifecycle hooks
- `kafka-timescale-iot-pipeline` — .NET Confluent.Kafka consumer + TimescaleDB hypertable + Python FastAPI ONNX sidecar

---

## Aggregate counts

| Layer | Whiteboard | Enterprise | 3D Asset | **Total** |
|---|---:|---:|---:|---:|
| Frontend | 6 | 8 | 8 | **22** |
| Mobile | 1 | 2 | 2 | **5** |
| Backend | 3 | 3 | 3 | **9** |
| **Per project** | **10** | **13** | **13** | **36** |

**Frontend + Mobile : Backend ratio = 27 : 9 ≈ 3 : 1**

This is the empirical evidence supporting the slide thesis: even with three different tech stacks (React/Vue/React+r3f for frontend, NestJS/Spring+Laravel+Kafka/ASP.NET+SignalR+FastAPI for backend), the frontend skill count stays disproportionately high because each scenario carries its own invariants, while backend skill count compresses because the patterns repeat.

---

## How to use this harness

1. **For new feature work**: identify the SDLC stage you're in, look up the relevant `skill_*.md` (this file's table) → that tells you which leaf skill in which project is the closest reference.
2. **For new projects**: copy the leaf skill structure (`<project>/skills/<scenario-case-name>/skill.md`), grow the FE side by scenario, keep the BE side converged.
3. **For governance**: use the cross-cutting table above as a checklist when adding ANY new skill — does it have a model routing assignment? An eval baseline? A token budget? A human-in-the-loop step if needed?
4. **For interview narrative**: the harness explains the design; the leaf skills prove the implementation. Slide 2 = the table here. Slide 3 = the per-project skill catalog above.

---

*This document is maintained alongside the slide deck at `MyGuide/slide/ai_workflow_harness_engineer.md`. Slide changes should propagate here; changes here should propagate to the slide.*
