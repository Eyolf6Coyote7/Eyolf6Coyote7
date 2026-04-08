# Onboarding — 3d_asset_collaboration harness

Welcome. This `.claude/` folder is the Claude Code harness for the 3d_asset_collaboration project. This is the cross-language project — React + react-three-fiber on the web, React Native on mobile, ASP.NET Core with EF Core + SignalR for the REST + realtime layer, a .NET Confluent.Kafka consumer writing to TimescaleDB, and a Python FastAPI ONNX sidecar.

## What this harness gives you

- **Skills** at `.claude/skills/` — 13 reusable skill files covering the r3f 3D viewer, the three layout skins (default web, Unity, mobile), the IoT dashboard, the upload wizard, the version-compare split view, the theme + i18n tokens, the vitest + Storybook + web-vitals quality harness, the Expo Router mobile tabs, the FlatList grid, the ASP.NET Core CRUD pattern, the SignalR hubs pattern, and the Kafka + TimescaleDB + FastAPI ONNX data plane.
- **Governance** at `.claude/governance/` — model routing, HITL gates, cost caps, secrets policy, audit config, eval set, and this onboarding doc.
- **Hooks** at `.claude/hooks/` — pre-tool-use red-line enforcement, secret scanning, post-tool-use audit logging.
- **Permissions** at `.claude/settings.json` — explicit allow list for React + r3f + RN + C# + Python source paths, and an explicit deny list for EF Core migrations, TimescaleDB ALTER statements, and prod deploy commands.
- **MCP servers** at `.claude/mcp.json` — GitHub, Postgres (asset-api), Postgres/TimescaleDB (iot-consumer), Kafka, Sentry.

## Five-minute setup

### 1. Set environment variables

```bash
export GITHUB_TOKEN="..."
export ASSET_API_DATABASE_URL="Host=localhost;Port=5434;Database=asset3d;Username=asset3d;Password=asset3d_dev"
export IOT_TIMESCALE_URL="Host=localhost;Port=5435;Database=asset3d_iot;Username=asset3d;Password=asset3d_dev"
export KAFKA_BROKERS="localhost:9096"
export KAFKA_SASL_USERNAME="..."
export KAFKA_SASL_PASSWORD="..."
export ASSET_API_JWT_SECRET="..."
export ASSET_API_SIGNALR_SHARED_KEY="..."
export ASSET_API_S3_ACCESS_KEY="..."
export ASSET_API_S3_SECRET_KEY="..."
export AI_SERVICE_MODEL_S3_URL="s3://..."
export HUGGINGFACE_TOKEN="..."
export SENTRY_AUTH_TOKEN="..."
export SENTRY_ORG="your-org"
```

### 2. Install the git hook

```bash
git config core.hooksPath .githooks
chmod +x .githooks/prepare-commit-msg
```

### 3. Open Claude Code

```bash
cd 3d_asset_collaboration
claude
```

### 4. Use the harness

Triggers will auto-load the matching skill. Examples:

- "Add a 3D preview of the asset detail page" → `three-viewer-r3f/SKILL.md`
- "Add a new Unity-skin admin page" → `multi-skin-routing/SKILL.md`
- "Add a new IoT metric card to the dashboard" → `iot-realtime-dashboard/SKILL.md`
- "Add a new ASP.NET Core controller for annotations" → `aspnet-ef-crud-pagination/SKILL.md`
- "Add a new SignalR hub for cursor presence on the 3D scene" → `signalr-realtime-hubs/SKILL.md`
- "Add a new Kafka topic consumer + TimescaleDB writer" → `kafka-timescale-iot-pipeline/SKILL.md`

## Cross-language polyglot proof

This project is the second half of the empirical proof that the BE harness = 1 harness even across languages. Combined with `enterprise_workflow_system` (Kotlin + PHP + Spring Kafka), this project adds C# and Python to the list. The combined workspace demonstrates BE convergence across **5 different languages** — TypeScript (NestJS in `realtime_ai_whiteboard`), Kotlin (Spring Boot + DGS + Spring Kafka in `enterprise_workflow_system`), PHP (Laravel in `enterprise_workflow_system`), C# (ASP.NET + .NET Kafka in this project), Python (FastAPI + ONNX in this project).

All 5 stacks share the same Core mental model: resolve user/context, check permission, call domain service, persist, emit metric/log, return result or ack message. The wrapper around the Core changes; the Core does not.

## Who to ask

- Slack: `#harness-help`
- Skill / agent / hook design: `#harness-engineer`
- Security-policy questions: `#security`
- SignalR / realtime questions: `#realtime`
- IoT / Kafka / TimescaleDB questions: `#iot-platform`
- ONNX / ML model questions: `#ai-platform`
