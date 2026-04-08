# Onboarding — enterprise_workflow_system harness

Welcome. This `.claude/` folder is the Claude Code harness for the enterprise_workflow_system project. Enterprise is the polyglot project — Vue 3 admin dashboards, Android Jetpack Compose, iOS SwiftUI, Spring Boot Kotlin with DGS GraphQL, Laravel, and a Spring Kafka worker. The harness keeps all of those in sync.

## What this harness gives you

- **Skills** at `.claude/skills/` — 13 reusable skill files covering Vue 3 form wizards, filter tables, echarts dashboards, RBAC auth flow, mock/real client, i18n bootstrap, feature toggles, audit log viewer, Compose approval queue, SwiftUI approval queue, DGS GraphQL CRUD, Laravel REST CRUD, Kafka notification worker.
- **Governance** at `.claude/governance/` — model routing, HITL gates, cost caps, secrets policy, audit config, eval set, and this onboarding doc.
- **Hooks** at `.claude/hooks/` — pre-tool-use red-line enforcement, secret scanning, post-tool-use audit logging.
- **Permissions** at `.claude/settings.json` — explicit allow list covering Vue / Kotlin / PHP / Compose / SwiftUI source paths, and an explicit deny list for migrations, prod deploy, and destructive commands across all three backend build tools (`gradle`, `composer` / `artisan`, `pnpm`).
- **MCP servers** at `.claude/mcp.json` — GitHub, two Postgres instances (one for workflow-api, one for admin-api), Kafka, Sentry.

## Five-minute setup

### 1. Set environment variables

```bash
export GITHUB_TOKEN="..."
export WORKFLOW_API_DATABASE_URL="postgres://workflow:workflow_dev@localhost:5432/workflow"
export ADMIN_API_DATABASE_URL="postgres://admin:admin_dev@localhost:5433/admin"
export WORKFLOW_API_JWT_SECRET="..."
export ADMIN_API_APP_KEY="base64:..."
export ADMIN_API_JWT_SECRET="..."
export KAFKA_BROKERS="localhost:9092"
export KAFKA_SASL_USERNAME="..."
export KAFKA_SASL_PASSWORD="..."
export SMTP_PASSWORD="..."
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
cd enterprise_workflow_system
claude
```

### 4. Use the harness

Triggers will auto-load the matching skill. Examples:

- "Add a new request type wizard in employee-portal" → `vue-multi-step-form-wizard/SKILL.md`
- "Add a new user management page in admin-dashboard" → `vue-filterable-data-table/SKILL.md`
- "Add a KPI metric dashboard" → `vue-echarts-kpi-dashboard/SKILL.md`
- "Add a new GraphQL mutation in workflow-api" → `kotlin-dgs-graphql-jpa-crud/SKILL.md`
- "Add a new admin REST endpoint in admin-api" → `laravel-rest-crud-with-audit/SKILL.md`
- "Add a new Kafka consumer in notification-worker" → `kotlin-kafka-notification-worker/SKILL.md`
- "Add an approval screen on Android" → `compose-approval-queue-screen/SKILL.md`
- "Add an approval view on iOS" → `swiftui-approval-queue-screen/SKILL.md`

## Cross-language convergence

This project is the empirical proof that the BE harness = 1 harness, even across 3 different languages (Kotlin, PHP, Kotlin-on-Kafka). All three backend services share the same Core mental model — resolve user/context, check permission, call domain service, persist, emit metric/log, return result or ack message. The wrapper around the Core changes (HTTP handler / GraphQL resolver / Kafka listener), but the Core does not.

See the `BE harness — implemented (3 skills, 3 languages, 3 paradigms)` section in `../CLAUDE.md` (the parent workspace CLAUDE.md) for the full table.

## Who to ask

- Slack: `#harness-help`
- Skill / agent / hook design: `#harness-engineer`
- Security-policy questions: `#security`
- GraphQL schema changes: `#backend` + `#frontend` (both, because schema changes block both sides)
