# Fullstack AI Workspace

Monorepo containing three fullstack portfolio projects demonstrating diverse tech stacks.

## Projects

| Project | Backend | Frontend | Mobile |
|---------|---------|----------|--------|
| Realtime AI Whiteboard | Node.js (NestJS) | React + Yjs | React Native |
| Enterprise Workflow System | Kotlin (Spring Boot) + Temporal | Vue 3 + Element Plus | Kotlin (Android) + Swift (iOS) |
| 3D Asset Collaboration | ASP.NET Core | React + Three.js | Unity (C#) |

## Shared Infrastructure

All local, no cloud: PostgreSQL, Redis, MinIO, Docker Compose, Keycloak, MQTT (Mosquitto).

## Git Workflow

- **Default branch**: `dev`
- **Stable branch**: `stable` (demo ready)
- **Feature branches**: `<type>/#<issue>-<description>`
- **Commit format**: `<emoji><type>#<issue>: <description>`
- **Conventional Commits** — version bumps are determined by commit types
- **Tag format**: `<project>/v<major>.<minor>.<patch>`
- Always create an issue before committing. Never push without an issue reference.

See `.claude/commands/git.md` for full git workflow details.

## Git Identity

```bash
git config user.name "wolf04"
git config user.email "mickey985ha@gmail.com"
```

## GitHub CLI

Always switch to personal account before `gh` operations:

```bash
gh auth switch --user coyote7wolf
```
