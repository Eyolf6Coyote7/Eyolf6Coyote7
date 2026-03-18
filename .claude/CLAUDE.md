# Fullstack AI Workspace

A monorepo containing three full-stack portfolio projects, each with a different tech stack.

## Projects

| Project | Frontend | Backend | Key Tech |
|---------|----------|---------|----------|
| **Realtime AI Whiteboard** | React + React Native | Node.js (NestJS) | Socket.IO, Yjs (CRDT), Ollama |
| **Enterprise Workflow System** | Vue 3 + Kotlin/Swift | Kotlin (Spring Boot) | Temporal, Keycloak |
| **3D Asset Collaboration** | React + Three.js + Unity | ASP.NET Core | SignalR, MQTT, MinIO versioned |

## Repo Structure

```
fullstack_ai_workspace/
├─ docs/                          ← global docs
├─ realtime_ai_whiteboard/        ← project 1
│   ├─ docs/  web/  mobile/  backend/
├─ enterprise_workflow_system/    ← project 2
│   ├─ docs/  web/  mobile/  backend/
├─ 3d_asset_collaboration/        ← project 3
│   ├─ docs/  web/  client/  backend/
├─ .claude/                       ← Claude Code config
└─ .github/                       ← GitHub templates + workflows
```

## Git Conventions

- **Branch strategy**: `dev` (default) → `stable` (demo ready). No `main` branch.
- **Feature branches**: `<type>/#<issue>-<description>` from `dev`
- **Commits**: Conventional Commits with emoji — `<emoji><type>#<issue>: <description>`
- **Version tags**: `<project>/v<major>.<minor>.<patch>` following SemVer
- **Workflow**: Create Issue → Branch from dev → Commit → Push → PR to dev

See `.claude/commands/git.md` for full git workflow details.

## Shared Infrastructure (All Local)

- PostgreSQL, Redis, MinIO, Keycloak — all via Docker Compose
- No cloud services

## Important Rules

- All code and docs in English
- Always reference GitHub issue number in commits and PRs
- Never push directly to `dev` or `stable` — always use PRs
- File upload/download uses MinIO with presigned URLs
