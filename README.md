# Fullstack AI Workspace

A portfolio monorepo containing **3 fullstack projects** targeting different industries, each with a distinct tech stack — demonstrating breadth across frontend, backend, mobile, AI, and system design.

## Projects

| Project | Industry | Frontend | Backend | Mobile | AI |
|---------|----------|----------|---------|--------|-----|
| [Realtime AI Whiteboard](realtime_ai_whiteboard/) | SaaS | React | NestJS (TypeScript) | React Native | LangGraph + Ollama |
| [Enterprise Workflow System](enterprise_workflow_system/) | Semiconductor | Vue 3 | Spring Boot (Kotlin) + Laravel (PHP) | Kotlin + Swift | — |
| [3D Asset Collaboration](3d_asset_collaboration/) | Media / Advertising | React + Three.js | ASP.NET Core (C#) | Unity (C#) | Python + ONNX |

**18 systems** across 3 projects, using **7 languages** (TypeScript, Kotlin, C#, Python, Go, PHP, Swift).

## Shared Infrastructure

All local, no cloud — Docker Compose orchestration:

PostgreSQL · Redis · MinIO · Kafka · Keycloak · Mosquitto · Unleash · Elasticsearch · TimescaleDB · ChromaDB · Langfuse · MailHog

## Documentation

| Document | Description |
|----------|-------------|
| [Global Tech Stack](docs/global_tech_stack.md) | Tech choices, architecture patterns, system overview |
| [Global Infrastructure](docs/global_infra.md) | Docker services, ports, env vars, networking |
| [Development Guidelines](docs/dev_guidelines.md) | Workflow, templates, coding standards, security |
| [Project Plan](docs/project_plan.md) | Execution plan and progress tracking |

## Development Status

See [Project Plan](docs/project_plan.md) and [GitHub Projects Board](https://github.com/users/coyote7wolf/projects/7) for current progress.

## Built With

This project is built with **Claude Code** as an AI pair programmer. Every PR is reviewed by Claude (architecture + security) and Gemini (code quality). All merge decisions are made by a human.
