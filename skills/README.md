# Skills — Workspace Index

This monorepo implements the **6-harness AI workflow design** from [`MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md).

The 6 harnesses live in [`harness/`](../harness/). The 36 leaf scenario skills live under each project's `skills/` folder, and they are the **memory writeback evidence** for the 2 `implemented` harnesses (FE CSR + BE).

For the harness backbone, start at [`harness/HARNESS.md`](../harness/HARNESS.md).

---

## The 6 harnesses (slide section 二)

| # | Harness | Status | Leaf evidence |
|---|---|---|---:|
| 1 | [`skill_impl_fe_ssr.md`](../harness/skill_impl_fe_ssr.md) | spec-only | 0 leaves (no Next.js in workspace) |
| 2 | [`skill_impl_fe_csr.md`](../harness/skill_impl_fe_csr.md) | **implemented** | **27 leaves** |
| 3 | [`skill_impl_fe_isr.md`](../harness/skill_impl_fe_isr.md) | spec-only | 0 leaves |
| 4 | [`skill_impl_fe_ab.md`](../harness/skill_impl_fe_ab.md) | spec-only | 0 leaves |
| 5 | [`skill_impl_be.md`](../harness/skill_impl_be.md) | **implemented** | **9 leaves across 5 languages** |
| 6 | [`skill_impl_ops.md`](../harness/skill_impl_ops.md) | spec-only | 0 leaves (no IaC in workspace) |
| | **Total** | | **36 leaves** |

---

## Why the leaf count distribution proves the slide thesis

The slide claims:
- FE needs **4** harnesses because render mode forces structural divergence
- BE needs **1** harness because architectural style branches collapse around a shared Core
- Ops needs **1** harness because all consumers share the same declarative mental model

This portfolio's leaf distribution maps to that claim:

| Slide claim | Leaf distribution in this monorepo |
|---|---|
| FE harnesses are **4** (one per render mode) | Only the CSR harness has leaves (27). SSR/ISR/AB are spec-only because the portfolio is Vite-only. The CSR leaves cover **3 different FE stacks** (React + Vue + r3f) + RN + Compose + SwiftUI — they all collapse into **1 CSR harness**. |
| BE is **1** harness covering all stacks | 9 backend leaves split across **5 different languages** (TypeScript / Kotlin / PHP / C# / Python) all share the same Core + wrapper mental model. **Stronger** than the slide claim, which shows convergence in 1 language (Go). |
| Ops is **1** harness covering all consumers | 0 leaves yet — portfolio is local-only via docker-compose. The harness is documented as spec for future IaC layer. |

**Headline number**: 27 FE leaves : 9 BE leaves ≈ **3 : 1**.

But the **structural** number is what matters: 27 FE leaves all converge into **1** CSR harness; 9 BE leaves all converge into **1** BE harness. The "2 implemented harnesses" (CSR + BE) cover **the entire portfolio**, exactly as the slide predicts.

---

## Per-project leaf catalog

### [realtime_ai_whiteboard](../realtime_ai_whiteboard/skills/) — 10 leaves

Maps to harnesses: CSR (7 leaves) + BE (3 leaves)

| Layer | Harness | Skill | Purpose |
|---|---|---|---|
| FE | CSR | [fabric-canvas-tool](../realtime_ai_whiteboard/skills/fabric-canvas-tool/skill.md) | Fabric.js v7 drawing tool with palette + listener discipline |
| FE | CSR | [yjs-realtime-collab](../realtime_ai_whiteboard/skills/yjs-realtime-collab/skill.md) | Yjs CRDT + y-websocket + IndexeddbPersistence + 33ms awareness |
| FE | CSR | [zustand-mock-real-store](../realtime_ai_whiteboard/skills/zustand-mock-real-store/skill.md) | Zustand store with mock vs real ApiClient via VITE_MOCK |
| FE | CSR | [sse-ai-streaming-ui](../realtime_ai_whiteboard/skills/sse-ai-streaming-ui/skill.md) | AI chat panel consuming NestJS @Sse with mirrored mock branch |
| FE | CSR | [protected-route-auth-page](../realtime_ai_whiteboard/skills/protected-route-auth-page/skill.md) | React Router ProtectedRoute with isMock bypass |
| FE | CSR | [i18n-react-page](../realtime_ai_whiteboard/skills/i18n-react-page/skill.md) | react-i18next keys across en/zh-TW with LanguageToggle |
| Mobile | CSR | [expo-router-board-screen](../realtime_ai_whiteboard/skills/expo-router-board-screen/skill.md) | RN Expo Router screen with theme tokens + Ionicons |
| BE | BE | [nestjs-tenant-crud](../realtime_ai_whiteboard/skills/nestjs-tenant-crud/skill.md) | Core CRUD pattern (NestJS + Prisma) |
| BE | BE | [ai-task-queue-sse](../realtime_ai_whiteboard/skills/ai-task-queue-sse/skill.md) | Async-heavy via Redis Stream + SSE poller |
| BE | BE | [y-websocket-jwt-gateway](../realtime_ai_whiteboard/skills/y-websocket-jwt-gateway/skill.md) | Real-time push wrapper |

### [enterprise_workflow_system](../enterprise_workflow_system/skills/) — 13 leaves

Maps to harnesses: CSR (10 leaves) + BE (3 leaves)

| Layer | Harness | Skill | Purpose |
|---|---|---|---|
| FE | CSR | [vue-multi-step-form-wizard](../enterprise_workflow_system/skills/vue-multi-step-form-wizard/skill.md) | 3-step Vue 3 wizard (template → form → review) |
| FE | CSR | [vue-filterable-data-table](../enterprise_workflow_system/skills/vue-filterable-data-table/skill.md) | List page with stat chips + multi-filter + table + pagination |
| FE | CSR | [vue-echarts-kpi-dashboard](../enterprise_workflow_system/skills/vue-echarts-kpi-dashboard/skill.md) | KPI cards + tree-shaken echarts charts |
| FE | CSR | [vue-rbac-auth-flow](../enterprise_workflow_system/skills/vue-rbac-auth-flow/skill.md) | Pinia auth store + router guard + isMock auto-login |
| FE | CSR | [vue-mock-real-api-client](../enterprise_workflow_system/skills/vue-mock-real-api-client/skill.md) | VITE_MOCK dual client with shared TS types |
| FE | CSR | [vue-i18n-element-plus-bootstrap](../enterprise_workflow_system/skills/vue-i18n-element-plus-bootstrap/skill.md) | main.ts bootstrap recipe (Pinia + i18n + Element Plus) |
| FE | CSR | [vue-feature-toggle-config-page](../enterprise_workflow_system/skills/vue-feature-toggle-config-page/skill.md) | Feature toggle admin page with category badges |
| FE | CSR | [vue-audit-log-viewer](../enterprise_workflow_system/skills/vue-audit-log-viewer/skill.md) | Audit log table with multi-field filter + live indicator |
| Mobile | CSR | [compose-approval-queue-screen](../enterprise_workflow_system/skills/compose-approval-queue-screen/skill.md) | Jetpack Compose M3 list with segmented control + LazyColumn |
| Mobile | CSR | [swiftui-approval-queue-screen](../enterprise_workflow_system/skills/swiftui-approval-queue-screen/skill.md) | SwiftUI counterpart with NavigationStack |
| BE | BE | [kotlin-dgs-graphql-jpa-crud](../enterprise_workflow_system/skills/kotlin-dgs-graphql-jpa-crud/skill.md) | Core CRUD via GraphQL (Spring Boot Kotlin DGS) |
| BE | BE | [laravel-rest-crud-with-audit](../enterprise_workflow_system/skills/laravel-rest-crud-with-audit/skill.md) | Core CRUD via REST (Laravel) |
| BE | BE | [kotlin-kafka-notification-worker](../enterprise_workflow_system/skills/kotlin-kafka-notification-worker/skill.md) | Kafka event-driven worker (idempotency wrapper TODO) |

### [3d_asset_collaboration](../3d_asset_collaboration/skills/) — 13 leaves

Maps to harnesses: CSR (10 leaves) + BE (3 leaves)

| Layer | Harness | Skill | Purpose |
|---|---|---|---|
| FE | CSR | [three-viewer-r3f](../3d_asset_collaboration/skills/three-viewer-r3f/skill.md) | Canvas + drei OrbitControls + Environment + useFrame |
| FE | CSR | [api-mock-real-switch](../3d_asset_collaboration/skills/api-mock-real-switch/skill.md) | Module-level function-export VITE_MOCK switch |
| FE | CSR | [multi-skin-routing](../3d_asset_collaboration/skills/multi-skin-routing/skill.md) | Three layout skins (default web / Unity / mobile) |
| FE | CSR | [iot-realtime-dashboard](../3d_asset_collaboration/skills/iot-realtime-dashboard/skill.md) | Hand-SVG line charts + alert table + auto-refresh toggle |
| FE | CSR | [upload-wizard-stepper](../3d_asset_collaboration/skills/upload-wizard-stepper/skill.md) | 3-step file upload wizard with drop zone + AI tag chips |
| FE | CSR | [version-compare-split-view](../3d_asset_collaboration/skills/version-compare-split-view/skill.md) | Side-by-side diff viewer with floating badges |
| FE | CSR | [theme-i18n-tokens](../3d_asset_collaboration/skills/theme-i18n-tokens/skill.md) | CSS variable theme + useTheme + react-i18next |
| FE | CSR | [web-vitals-storybook-harness](../3d_asset_collaboration/skills/web-vitals-storybook-harness/skill.md) | vitest + Storybook + web-vitals + Lighthouse CI |
| Mobile | CSR | [expo-router-mobile-tabs](../3d_asset_collaboration/skills/expo-router-mobile-tabs/skill.md) | File-system tab routing with emoji icons |
| Mobile | CSR | [mobile-asset-list-flatlist](../3d_asset_collaboration/skills/mobile-asset-list-flatlist/skill.md) | 2-column FlatList grid with color placeholders |
| BE | BE | [aspnet-ef-crud-pagination](../3d_asset_collaboration/skills/aspnet-ef-crud-pagination/skill.md) | Core CRUD via REST (ASP.NET Core + EF Core) |
| BE | BE | [signalr-realtime-hubs](../3d_asset_collaboration/skills/signalr-realtime-hubs/skill.md) | Real-time push wrapper (SignalR) |
| BE | BE | [kafka-timescale-iot-pipeline](../3d_asset_collaboration/skills/kafka-timescale-iot-pipeline/skill.md) | Kafka event-driven + TimescaleDB + FastAPI ONNX sidecar |

---

## Cross-language proof for the BE harness

The 9 BE leaves are spread across **5 different languages**, all writing back into ONE [`skill_impl_be.md`](../harness/skill_impl_be.md):

| Language | Leaves | Stack |
|---|---:|---|
| TypeScript | 3 | NestJS |
| Kotlin | 2 | Spring Boot DGS GraphQL + Spring Kafka |
| PHP | 1 | Laravel |
| C# | 2 | ASP.NET Core + .NET Confluent.Kafka |
| Python | 1 | FastAPI + ONNX Runtime |

The slide proves convergence across 5 architectural styles in 1 language (Go). This portfolio proves convergence across **5 architectural styles in 5 different languages**. That's structurally a **stronger** claim than the slide, and it's the empirical centerpiece of the BE-1-harness argument.

---

## How to read a leaf skill

Each `skill.md` is a real Claude Code skill file with:

1. **YAML frontmatter** — `name` + `description` (Claude Code uses these to decide when to load the skill)
2. **When to use** — concrete trigger conditions (file patterns, keywords, tech stack signals)
3. **Context** — why this scenario needs its own leaf, with `file:line` citations into the actual codebase
4. **Operating instructions** — step-by-step what Claude should do when invoked
5. **Reusable prompts / code patterns** — concrete code snippets the skill regenerates
6. **Anti-patterns** — what NOT to do
7. **References** — `file:line` pointers into the project source

Each leaf is the **memory writeback** output of running the parent harness through one specific scenario in one specific stack. Run any leaf again on the same scenario and you should get high-similarity code — that's the harness contract.

---

## Related docs

- **Backbone framework** → [`harness/HARNESS.md`](../harness/HARNESS.md) — the 6-harness index with status + cross-cutting governance table
- **Slide deck source** → [`MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md) — the interview narrative this catalog supports
