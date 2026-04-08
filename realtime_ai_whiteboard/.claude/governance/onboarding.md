# Onboarding — realtime_ai_whiteboard harness

Welcome. This `.claude/` folder is the Claude Code harness for the realtime_ai_whiteboard project. It teaches Claude Code how to work inside this codebase: which paths it can write to, which secrets it must avoid, which patterns to follow, which model to use for which subagent, and what to log.

## What this harness gives you

- **Skills** at `.claude/skills/` — 10 reusable skill files covering Fabric.js drawing tools, Yjs CRDT collaboration, Zustand dual mock/real store, SSE AI streaming UI, protected routes, i18n, the NestJS multi-tenant CRUD pattern, the Redis Stream SSE pipeline, and the Yjs WebSocket gateway.
- **Governance** at `.claude/governance/` — model routing, HITL gates, cost caps, secrets policy, audit config, eval set, and this onboarding doc.
- **Hooks** at `.claude/hooks/` — pre-tool-use red-line enforcement, secret scanning, post-tool-use audit logging.
- **Permissions** at `.claude/settings.json` — explicit allow list for `web-app`, `mobile-app`, `bff-api`, `ai-service`, and an explicit deny list for `.env*`, migrations, prod deploy commands.
- **MCP servers** at `.claude/mcp.json` — GitHub, Postgres (against the BFF db), Redis (for the task queue), Sentry.

## Five-minute setup

### 1. Set environment variables

Use `direnv` or your shell's `.envrc` equivalent. The secrets below are read by the MCP servers and by test scripts. If you do not have one, ask in `#harness-help`.

```bash
export GITHUB_TOKEN="..."
export BFF_DATABASE_URL="postgres://whiteboard:whiteboard_dev@localhost:5432/whiteboard"
export BFF_REDIS_URL="redis://localhost:6379"
export BFF_JWT_SECRET="..."
export BFF_YJS_JWT_SECRET="..."
export OPENAI_API_KEY="..."
export SENTRY_AUTH_TOKEN="..."
export SENTRY_ORG="your-org"
```

### 2. Install the git hook

If the workspace-root `.githooks/prepare-commit-msg` is in place (see the workspace `CLAUDE.md`), enable it once:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/prepare-commit-msg
```

This hook automatically adds `Harness-Cell:` and `Harness-Session:` trailers to commits that were generated with AI help. You never type them by hand.

### 3. Open Claude Code

```bash
cd realtime_ai_whiteboard
claude
```

### 4. Use the harness

Claude Code will load the SKILL files automatically when their triggers match your task. For example:

- "Add a new Fabric tool for stamps" → loads `fabric-canvas-tool/SKILL.md`
- "Wire cursor presence for the whiteboard" → loads `yjs-realtime-collab/SKILL.md`
- "Add a new tenant-scoped CRUD controller in bff-api" → loads `nestjs-tenant-crud/SKILL.md`
- "Add an SSE streaming endpoint for AI chat" → loads `sse-ai-streaming-ui/SKILL.md` + `ai-task-queue-sse/SKILL.md`

## Common questions

### Will my non-AI commits be tracked?

No. If you do not use AI assistance, the prepare-commit-msg hook finds no active harness session and does nothing. Only AI-generated commits pick up a `Harness-Cell:` trailer.

### Can I disable the hooks?

Yes. Remove the `hooks` block from `.claude/settings.json`. Your commits will no longer show up in the harness dashboard. This is discouraged unless you are actively debugging a hook.

### Will the hooks send data to an external endpoint?

No. All hooks only touch local files under `.harness/`. Data reaches the central dashboard only through `git push` + the `.github/workflows/harness-verify.yml` workflow.

### How do I report a wrong skill?

Open a PR that edits `.claude/skills/<name>/SKILL.md`. Skills are code; they version with the project.

## Who to ask

- Slack: `#harness-help`
- Skill / agent / hook design: `#harness-engineer`
- Security-policy questions: `#security`
