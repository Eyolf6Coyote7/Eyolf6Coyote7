# Realtime AI Whiteboard

A realtime collaborative whiteboard with AI-assisted drawing tools, multi-user CRDT sync, and an SSE-streamed AI chat panel. The portfolio's reference implementation for **CSR + WebSocket-heavy** product UX.

## Stack

| Layer | Tech |
|---|---|
| Frontend (web-app) | React 19 + Vite + Zustand + Yjs CRDT + Fabric.js v7 + react-i18next + Storybook 8 |
| Mobile (mobile-app) | React Native + Expo Router |
| Backend (bff-api) | NestJS + Prisma (multi-tenant) + JWT + Redis Streams + SSE + Yjs WebSocket gateway |
| AI service | Python asyncio worker reading from Redis Stream + LangGraph agent |

## Skills in this project

This project's skills are organized by the **6-harness AI workflow design** from [`MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md). Each harness corresponds to one structurally-distinct mental model. Of the 6 harnesses, this project has **2 implemented** (CSR + BE) and **4 spec-only** (no Next.js, no flag SDK, no IaC).

### CSR frontend harness — implemented (7 skills)

The whole `web-app/` and `mobile-app/` are 100% client-rendered. Each leaf below is a memory-writeback of running the CSR harness through one specific scenario in this project's stack.

| Skill | What it does |
|---|---|
| [`fabric-canvas-tool`](.claude/skills/fabric-canvas-tool/SKILL.md) | Add a Fabric.js v7 drawing tool with palette + listener discipline |
| [`yjs-realtime-collab`](.claude/skills/yjs-realtime-collab/SKILL.md) | Wire Yjs CRDT + y-websocket + IndexedDB persistence + throttled awareness |
| [`zustand-mock-real-store`](.claude/skills/zustand-mock-real-store/SKILL.md) | Zustand store backed by mock vs real ApiClient via VITE_MOCK |
| [`sse-ai-streaming-ui`](.claude/skills/sse-ai-streaming-ui/SKILL.md) | AI chat panel that consumes a NestJS @Sse endpoint with mirrored mock branch |
| [`protected-route-auth-page`](.claude/skills/protected-route-auth-page/SKILL.md) | React Router ProtectedRoute with isMock bypass |
| [`i18n-react-page`](.claude/skills/i18n-react-page/SKILL.md) | react-i18next keys across en/zh-TW with LanguageToggle |
| [`expo-router-board-screen`](.claude/skills/expo-router-board-screen/SKILL.md) | React Native Expo Router screen with theme tokens + Ionicons |

### BE harness — implemented (3 skills)

NestJS backend covering CRUD + async-heavy + realtime push patterns. All three collapse into the same Core + wrapper mental model from slide section 4.

| Skill | What it does |
|---|---|
| [`nestjs-tenant-crud`](.claude/skills/nestjs-tenant-crud/SKILL.md) | NestJS controller+service+DTO with multi-tenant Prisma scoping, pagination, JWT, guest tokens |
| [`ai-task-queue-sse`](.claude/skills/ai-task-queue-sse/SKILL.md) | Redis Stream NestJS producer + Python asyncio consumer + SSE result poller |
| [`y-websocket-jwt-gateway`](.claude/skills/y-websocket-jwt-gateway/SKILL.md) | Embedded Yjs WebSocket gateway with JWT validation from query string |

### Harnesses NOT implemented in this project

| Harness | Why spec-only here |
|---|---|
| **SSR** | This project is React + Vite, no Next.js. SSR would require migrating to Next.js app router. |
| **ISR** | Same — requires Next.js + `revalidate`. |
| **A/B** | No flag SDK integration (LaunchDarkly / Statsig / Unleash). The whiteboard does not currently A/B test. |
| **Ops** | Local-only via `docker-compose.yml`. No Terraform / K8s / OPA / Prometheus. |

These 4 harnesses are documented as design specs at the workspace level (when added). They are intentionally absent from this project because the portfolio narrative is "implemented harnesses only".

## How Claude Code uses these skills

The 10 SKILL.md files under `.claude/skills/` are auto-loaded by Claude Code when their `description` / `when_to_use` triggers match the user's task. Run `claude` from this project's root and ask for any of the scenarios above — the matching skill will be loaded and the generated code will follow the pattern in that skill.

## Related docs

- Workspace root: [`../CLAUDE.md`](../CLAUDE.md) — git workflow, conventional commits, gh CLI account
- Slide deck: [`../../MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md) — the 6-harness design this project's skills implement
