# 3D Asset Collaboration

A 3D asset library + IoT telemetry overlay platform with React Three Fiber web viewer, three distinct frontend "skins" (default web / Unity-themed plugin / mobile), an ASP.NET Core backend with SignalR realtime push, a .NET Kafka → TimescaleDB IoT pipeline, and a Python FastAPI ONNX inference sidecar. The portfolio's reference implementation for **CSR + 3D + multi-skin + polyglot data plane**.

## Stack

| Layer | Tech |
|---|---|
| Frontend — asset-portal | React 19 + Vite + react-three-fiber + drei + Redux + react-i18next + Storybook |
| Frontend — Unity skin | Same React app, dark theme, JetBrains Mono + Space Grotesk fonts, monospaced overlays |
| Frontend — mobile skin | Same React app, single-column mobile layout |
| Mobile — native | React Native + Expo Router |
| Backend — asset-api | ASP.NET Core 8 + EF Core + SignalR + PostgreSQL |
| Backend — iot-consumer | .NET 8 + Confluent.Kafka + Npgsql + TimescaleDB |
| Backend — ai-service | Python FastAPI + ONNX Runtime + Pillow |
| Real-time | SignalR Hubs (AssetHub for asset events, IoTHub for sensor updates) |

## Skills in this project

This project's skills are organized by the **6-harness AI workflow design** from [`MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md). Of the 6 harnesses, this project has **2 implemented** (CSR + BE) and **4 spec-only**.

This project completes the polyglot proof: combined with `enterprise_workflow_system`, the workspace shows the BE harness collapsing across **5 languages total** (TypeScript / Kotlin / PHP / C# / Python).

### CSR frontend harness — implemented (10 skills)

The asset-portal's three skins (default web / Unity / mobile), the React Native mobile-app, and the r3f 3D viewer are all 100% client-rendered. The Three.js + WebGL viewer is the canonical example of why CSR is its own harness — server components cannot use `useFrame`, `useRef<Mesh>`, or any of the WebGL primitives.

| Skill | What it does |
|---|---|
| [`three-viewer-r3f`](.claude/skills/three-viewer-r3f/SKILL.md) | R3F + drei viewer with Canvas + OrbitControls + Environment + useFrame |
| [`api-mock-real-switch`](.claude/skills/api-mock-real-switch/SKILL.md) | Module-level function-export VITE_MOCK switch |
| [`multi-skin-routing`](.claude/skills/multi-skin-routing/SKILL.md) | Three layout skins (default web / Unity standalone / mobile standalone) |
| [`iot-realtime-dashboard`](.claude/skills/iot-realtime-dashboard/SKILL.md) | Hand-SVG line charts + alert table + auto-refresh toggle |
| [`upload-wizard-stepper`](.claude/skills/upload-wizard-stepper/SKILL.md) | 3-step file upload wizard with drop zone + AI tag chips |
| [`version-compare-split-view`](.claude/skills/version-compare-split-view/SKILL.md) | Side-by-side diff viewer with floating badges + footer diff stats |
| [`theme-i18n-tokens`](.claude/skills/theme-i18n-tokens/SKILL.md) | CSS variable theme tokens + useTheme hook + react-i18next |
| [`web-vitals-storybook-harness`](.claude/skills/web-vitals-storybook-harness/SKILL.md) | vitest + Storybook + web-vitals + Lighthouse CI |
| [`expo-router-mobile-tabs`](.claude/skills/expo-router-mobile-tabs/SKILL.md) | React Native Expo Router file-system tab routing with emoji icons |
| [`mobile-asset-list-flatlist`](.claude/skills/mobile-asset-list-flatlist/SKILL.md) | 2-column FlatList grid with color placeholder thumbnails |

### BE harness — implemented (3 skills, 3 languages, 3 paradigms)

| Skill | What it does | Language / paradigm |
|---|---|---|
| [`aspnet-ef-crud-pagination`](.claude/skills/aspnet-ef-crud-pagination/SKILL.md) | ASP.NET Core controller + EF Core CRUD + EF.Functions.ILike search | C# / REST CRUD |
| [`signalr-realtime-hubs`](.claude/skills/signalr-realtime-hubs/SKILL.md) | SignalR Hub with broadcast + room/group + lifecycle hooks | C# / WebSocket realtime push |
| [`kafka-timescale-iot-pipeline`](.claude/skills/kafka-timescale-iot-pipeline/SKILL.md) | .NET Confluent.Kafka consumer + TimescaleDB hypertable + FastAPI ONNX sidecar | C# + Python / Kafka event-driven |

All three share the same Core mental model. The wrapper changes per entry point (HTTP / SignalR Hub / Kafka consumer / FastAPI route handler), but the Core does not.

### Harnesses NOT implemented in this project

| Harness | Why spec-only here |
|---|---|
| **SSR** | asset-portal is React + Vite — no Next.js. |
| **ISR** | Same. |
| **A/B** | No flag SDK integration. The Unity / mobile / default skins are routed by URL path, not by user-bucketed flags. |
| **Ops** | Local-only via `docker-compose.yml`. No Terraform / K8s / OPA / Prometheus. |

## How Claude Code uses these skills

The 13 SKILL.md files under `.claude/skills/` are auto-loaded by Claude Code when their `description` / `when_to_use` triggers match the user's task. Run `claude` from this project's root and ask for any of the scenarios above.

## Related docs

- Workspace root: [`../CLAUDE.md`](../CLAUDE.md) — git workflow, conventional commits, gh CLI account
- Slide deck: [`../../MyGuide/slide/ai_workflow_harness_engineer.md`](../../MyGuide/slide/ai_workflow_harness_engineer.md) — the 6-harness design this project's skills implement
