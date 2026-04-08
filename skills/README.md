# Skills — Workspace Index

This monorepo ships **36 reusable Claude Code skill files** across three portfolio projects, each demonstrating a distinct AI-driven development pattern.

The skill files are organized PER PROJECT under each project's `skills/<scenario-case-name>/skill.md`. This top-level README is the **count summary** that demonstrates the slide thesis: frontend complexity > backend complexity → frontend needs more distinct skill files.

For the design framework that justifies these counts, see [`harness/HARNESS.md`](../harness/HARNESS.md).

---

## Headline numbers

| Layer | Whiteboard | Enterprise | 3D Asset | **Total** |
|---|---:|---:|---:|---:|
| Frontend (web) | 6 | 8 | 8 | **22** |
| Mobile (RN / Compose / SwiftUI) | 1 | 2 | 2 | **5** |
| Backend | 3 | 3 | 3 | **9** |
| **Per project** | **10** | **13** | **13** | **36** |

**Frontend + Mobile : Backend = 27 : 9 ≈ 3 : 1**

---

## Why the asymmetry?

The slide thesis (see [`MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md)):

> Frontend's architecture branches (render mode, design handoff, browser/device matrix, accessibility, web-vitals budgets) **do not collapse downstream**. Backend's branches (contract, storage, sync mode) **converge at Pre-commit**.

Practically:
- A single Vue 3 admin app (`enterprise_workflow_system/admin-dashboard`) has 8 distinct UI patterns (wizard, filter table, KPI dashboard, RBAC flow, mock/real client, bootstrap, feature toggle, audit log) — each carries its own invariants and reusable code template, hence one skill file per scenario.
- A polyglot backend with 5 different stacks (NestJS, Spring Boot+DGS, Laravel, ASP.NET, FastAPI) collapses to **3 skill files per project**: one for CRUD, one for real-time push, one for queue/worker. The patterns repeat across stacks.

Same monorepo, same engineer, same time budget — and yet the frontend folder has 3× more skill files than the backend folder. **That ratio is the empirical proof.**

---

## Skill index per project

### [realtime_ai_whiteboard](../realtime_ai_whiteboard/skills/) — 10 skills

| Layer | Skill | Purpose |
|---|---|---|
| FE | [fabric-canvas-tool](../realtime_ai_whiteboard/skills/fabric-canvas-tool/skill.md) | Add a Fabric.js v7 drawing tool with palette + listener discipline |
| FE | [yjs-realtime-collab](../realtime_ai_whiteboard/skills/yjs-realtime-collab/skill.md) | Yjs CRDT + y-websocket + IndexeddbPersistence + 33ms awareness |
| FE | [zustand-mock-real-store](../realtime_ai_whiteboard/skills/zustand-mock-real-store/skill.md) | Zustand store with mock vs real ApiClient via VITE_MOCK |
| FE | [sse-ai-streaming-ui](../realtime_ai_whiteboard/skills/sse-ai-streaming-ui/skill.md) | AI chat panel consuming NestJS @Sse with mirrored mock branch |
| FE | [protected-route-auth-page](../realtime_ai_whiteboard/skills/protected-route-auth-page/skill.md) | React Router ProtectedRoute with isMock bypass |
| FE | [i18n-react-page](../realtime_ai_whiteboard/skills/i18n-react-page/skill.md) | react-i18next keys across en/zh-TW with LanguageToggle |
| Mobile | [expo-router-board-screen](../realtime_ai_whiteboard/skills/expo-router-board-screen/skill.md) | RN Expo Router screen with theme tokens + Ionicons |
| BE | [nestjs-tenant-crud](../realtime_ai_whiteboard/skills/nestjs-tenant-crud/skill.md) | NestJS controller+service+DTO with multi-tenant Prisma scoping |
| BE | [ai-task-queue-sse](../realtime_ai_whiteboard/skills/ai-task-queue-sse/skill.md) | Redis Stream producer + Python asyncio consumer + SSE poller |
| BE | [y-websocket-jwt-gateway](../realtime_ai_whiteboard/skills/y-websocket-jwt-gateway/skill.md) | Yjs WebSocket gateway with JWT validation from query string |

### [enterprise_workflow_system](../enterprise_workflow_system/skills/) — 13 skills

| Layer | Skill | Purpose |
|---|---|---|
| FE | [vue-multi-step-form-wizard](../enterprise_workflow_system/skills/vue-multi-step-form-wizard/skill.md) | 3-step Vue 3 wizard (template → form → review) |
| FE | [vue-filterable-data-table](../enterprise_workflow_system/skills/vue-filterable-data-table/skill.md) | List page with stat chips + multi-filter + table + pagination |
| FE | [vue-echarts-kpi-dashboard](../enterprise_workflow_system/skills/vue-echarts-kpi-dashboard/skill.md) | KPI cards + tree-shaken echarts charts |
| FE | [vue-rbac-auth-flow](../enterprise_workflow_system/skills/vue-rbac-auth-flow/skill.md) | Pinia auth store + router guard + isMock auto-login |
| FE | [vue-mock-real-api-client](../enterprise_workflow_system/skills/vue-mock-real-api-client/skill.md) | VITE_MOCK dual client with shared TS types |
| FE | [vue-i18n-element-plus-bootstrap](../enterprise_workflow_system/skills/vue-i18n-element-plus-bootstrap/skill.md) | main.ts bootstrap recipe (Pinia + i18n + Element Plus) |
| FE | [vue-feature-toggle-config-page](../enterprise_workflow_system/skills/vue-feature-toggle-config-page/skill.md) | Feature toggle admin page with category badges |
| FE | [vue-audit-log-viewer](../enterprise_workflow_system/skills/vue-audit-log-viewer/skill.md) | Audit log table with multi-field filter + live indicator |
| Mobile | [compose-approval-queue-screen](../enterprise_workflow_system/skills/compose-approval-queue-screen/skill.md) | Jetpack Compose M3 list with segmented control + LazyColumn |
| Mobile | [swiftui-approval-queue-screen](../enterprise_workflow_system/skills/swiftui-approval-queue-screen/skill.md) | SwiftUI counterpart with NavigationStack |
| BE | [kotlin-dgs-graphql-jpa-crud](../enterprise_workflow_system/skills/kotlin-dgs-graphql-jpa-crud/skill.md) | Spring Boot + Netflix DGS + JPA spring-data |
| BE | [laravel-rest-crud-with-audit](../enterprise_workflow_system/skills/laravel-rest-crud-with-audit/skill.md) | Thin Laravel controller with paginate + inline validate |
| BE | [kotlin-kafka-notification-worker](../enterprise_workflow_system/skills/kotlin-kafka-notification-worker/skill.md) | Spring Boot @KafkaListener with try/catch + service injection |

### [3d_asset_collaboration](../3d_asset_collaboration/skills/) — 13 skills

| Layer | Skill | Purpose |
|---|---|---|
| FE | [three-viewer-r3f](../3d_asset_collaboration/skills/three-viewer-r3f/skill.md) | Canvas + drei OrbitControls + Environment + useFrame |
| FE | [api-mock-real-switch](../3d_asset_collaboration/skills/api-mock-real-switch/skill.md) | Module-level function-export VITE_MOCK switch |
| FE | [multi-skin-routing](../3d_asset_collaboration/skills/multi-skin-routing/skill.md) | Three layout skins (default web / Unity / mobile) |
| FE | [iot-realtime-dashboard](../3d_asset_collaboration/skills/iot-realtime-dashboard/skill.md) | Hand-SVG line charts + alert table + auto-refresh toggle |
| FE | [upload-wizard-stepper](../3d_asset_collaboration/skills/upload-wizard-stepper/skill.md) | 3-step file upload wizard with drop zone + AI tag chips |
| FE | [version-compare-split-view](../3d_asset_collaboration/skills/version-compare-split-view/skill.md) | Side-by-side diff viewer with floating badges |
| FE | [theme-i18n-tokens](../3d_asset_collaboration/skills/theme-i18n-tokens/skill.md) | CSS variable theme + useTheme + react-i18next |
| FE | [web-vitals-storybook-harness](../3d_asset_collaboration/skills/web-vitals-storybook-harness/skill.md) | vitest + Storybook + web-vitals + Lighthouse CI |
| Mobile | [expo-router-mobile-tabs](../3d_asset_collaboration/skills/expo-router-mobile-tabs/skill.md) | File-system tab routing with emoji icons |
| Mobile | [mobile-asset-list-flatlist](../3d_asset_collaboration/skills/mobile-asset-list-flatlist/skill.md) | 2-column FlatList grid with color placeholders |
| BE | [aspnet-ef-crud-pagination](../3d_asset_collaboration/skills/aspnet-ef-crud-pagination/skill.md) | ASP.NET Core + EF Core CRUD + EF.Functions.ILike search |
| BE | [signalr-realtime-hubs](../3d_asset_collaboration/skills/signalr-realtime-hubs/skill.md) | SignalR Hub with broadcast + room/group + lifecycle |
| BE | [kafka-timescale-iot-pipeline](../3d_asset_collaboration/skills/kafka-timescale-iot-pipeline/skill.md) | .NET Kafka consumer + TimescaleDB + Python FastAPI ONNX |

---

## How to read these skills

Each `skill.md` is a real Claude Code skill file with:

1. **YAML frontmatter** — `name` + `description` (used by Claude Code to decide when to load it)
2. **When to use** — concrete trigger conditions (file patterns, keywords, tech stack signals)
3. **Context** — why this scenario needs its own skill, with `file:line` citations to the actual codebase
4. **Operating instructions** — step-by-step what Claude should do when invoked
5. **Reusable prompts / code patterns** — concrete code snippets the skill regenerates
6. **Anti-patterns** — what NOT to do
7. **References** — `file:line` pointers into the project code

The goal: **invoking the same skill on the same project produces high-similarity code** so the harness is repeatable, not just generative.

---

## Related docs

- **Backbone framework** → [`harness/HARNESS.md`](../harness/HARNESS.md) — the SDLC harness design that explains why the count distribution looks this way
- **Slide deck source** → [`MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md) — the interview narrative this catalog supports
