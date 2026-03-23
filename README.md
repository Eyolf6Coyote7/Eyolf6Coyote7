# Fullstack AI Workspace

**Languages**
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?logo=kotlin&logoColor=white)
![C#](https://img.shields.io/badge/C%23-512BD4?logo=dotnet&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white)
![Swift](https://img.shields.io/badge/Swift-F05138?logo=swift&logoColor=white)

**Frontend & Mobile**
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?logo=vuedotjs&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-61DAFB?logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white)
![Unity](https://img.shields.io/badge/Unity-000000?logo=unity&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)

**Backend & API**
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-512BD4?logo=dotnet&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white)
![gRPC](https://img.shields.io/badge/gRPC-244C5A?logo=google&logoColor=white)

**AI & ML**
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?logo=langchain&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-000000?logoColor=white)
![ONNX](https://img.shields.io/badge/ONNX-005CED?logo=onnx&logoColor=white)
![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6F61?logoColor=white)
![RAG](https://img.shields.io/badge/RAG-purple?logoColor=white)
![MCP](https://img.shields.io/badge/MCP_Tools-blue?logoColor=white)

**Infrastructure & Data**
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Kafka](https://img.shields.io/badge/Kafka-231F20?logo=apachekafka&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?logo=elasticsearch&logoColor=white)
![MinIO](https://img.shields.io/badge/MinIO-C72E49?logo=minio&logoColor=white)
![TimescaleDB](https://img.shields.io/badge/TimescaleDB-FDB515?logo=timescale&logoColor=black)
![MQTT](https://img.shields.io/badge/MQTT-660066?logo=mqtt&logoColor=white)

**Auth & Security**
![Keycloak](https://img.shields.io/badge/Keycloak-4D4D4D?logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)
![OAuth2](https://img.shields.io/badge/OAuth2-EB5424?logoColor=white)

> A portfolio monorepo with **3 fullstack projects** across **3 industries**, built with **7 languages** and **18 systems** — demonstrating Staff-level breadth in frontend, backend, mobile, AI, and system design.

## Key Highlights

- **AI Agent State Machine** — LangGraph + RAG + MCP tool use + LoRA fine-tuning + Langfuse observability
- **3 Architecture Patterns** — Modular Monolith + BFF, Clean Architecture + DDD + CQRS, Hexagonal (Ports & Adapters)
- **3 API Styles** — REST + WebSocket + SSE, GraphQL + Subscriptions, gRPC + SignalR
- **Event-Driven** — Kafka (event sourcing, exactly-once, partitioning, consumer groups), MQTT → Kafka bridge
- **Multi-platform** — React, Vue 3, React Native, Kotlin (Android), Swift (iOS), Unity (C#)
- **Production-Ready** — Feature flags (Unleash), multi-tenancy, 2FA (Keycloak TOTP), SAST/SCA scanning, SLO targets
- **Full DevOps** — GitHub Actions CI, release-please auto-tag, Storybook, API docs (OpenAPI/GraphQL/Protobuf)

## Architecture Overview

### Whiteboard — SaaS

```mermaid
graph LR
  WEB[React Web] --> BFF[NestJS BFF]
  MOB[React Native] --> BFF
  BFF --> AI[AI Agent<br/>LangGraph + RAG + MCP]
  AI --> OLLAMA[Ollama LLM]
  AI --> CHROMA[(ChromaDB)]
  BFF --> PG[(PostgreSQL)]
  BFF --> RD[(Redis)]
```

### Workflow — Semiconductor

```mermaid
graph LR
  PORTAL[Vue 3 Portal] -->|GraphQL| API[Spring Boot API]
  ADMIN[Vue 3 Admin] -->|REST| LARAVEL[Laravel Admin]
  MOBILE[Kotlin + Swift] -->|GraphQL| API
  API --> TEMPORAL[Temporal]
  API --> KF[(Kafka)]
  API --> KC[Keycloak SSO]
```

### 3D Asset — Media / Advertising

```mermaid
graph LR
  WEB[React + Three.js] -->|REST| API[ASP.NET Core]
  UNITY[Unity Client] -->|gRPC + SignalR| API
  IOT[IoT Devices] -->|MQTT| BRIDGE[Kafka Bridge]
  BRIDGE --> KF[(Kafka)]
  KF --> CONSUMER[IoT Consumer]
  CONSUMER --> TS[(TimescaleDB)]
  API --> ES[(Elasticsearch)]
  API --> MIO[(MinIO)]
```

## Projects

| Project | Industry | Frontend | Backend | Mobile | Live Demo |
|---------|----------|----------|---------|--------|-----------|
| [Realtime AI Whiteboard](realtime_ai_whiteboard/) | SaaS | React | NestJS (TypeScript) | React Native | [Demo](https://eyolf6coyote7.github.io/fullstack_ai_workspace/whiteboard/) |
| [Enterprise Workflow System](enterprise_workflow_system/) | Semiconductor | Vue 3 | Spring Boot (Kotlin) + Laravel (PHP) | Kotlin + Swift | [Demo](https://eyolf6coyote7.github.io/fullstack_ai_workspace/workflow/) |
| [3D Asset Collaboration](3d_asset_collaboration/) | Media / Advertising | React + Three.js | ASP.NET Core (C#) | Unity (C#) | [Demo](https://eyolf6coyote7.github.io/fullstack_ai_workspace/3d-asset/) |

> Demo links are static versions with mock data. For full functionality (AI, Kafka, realtime), run locally.

## Tech Diversity

| Dimension | Whiteboard | Workflow | 3D Asset |
|-----------|-----------|----------|----------|
| BE Language | TypeScript | Kotlin + PHP | C# + Python + Go |
| FE Framework | React | Vue 3 | React + Three.js |
| Architecture | Modular Monolith + BFF | Clean Arch + DDD + CQRS | Hexagonal |
| API | REST + WebSocket | GraphQL | gRPC + REST |
| Messaging | Redis Stream | Kafka | MQTT → Kafka |
| AI | LangGraph Agent + RAG | — | ONNX Runtime |
| Auth | JWT + Guest | Keycloak OAuth2/SSO + 2FA | API Key + JWT + ACL |
| State Mgmt | Zustand | Pinia | Redux Toolkit |

## Documentation

| Document | Description |
|----------|-------------|
| [Tech Stack](docs/global_tech_stack.md) | Architecture patterns, system overview, tech decisions |
| [Infrastructure](docs/global_infra.md) | Docker services, ports, networking, Kafka topics |
| [Dev Guidelines](docs/dev_guidelines.md) | Workflow, templates, coding standards, security scanning |
| [Project Plan](docs/project_plan.md) | Execution plan and progress tracking |
| [AI-Assisted Development](docs/ai_assisted_development.md) | Claude Code + Gemini co-work methodology |

## Quick Start

```bash
# Clone
git clone git@github.com:Eyolf6Coyote7/fullstack_ai_workspace.git

# Start shared infrastructure
docker compose up -d

# Start a specific project (e.g. Whiteboard)
cd realtime_ai_whiteboard/backend && npm install && npm run dev
cd realtime_ai_whiteboard/web && npm install && npm run dev
```

## Built With

This project is built with **[Claude Code](https://claude.ai/claude-code)** as an AI pair programmer.
Every PR is reviewed by Claude (architecture + security) and Gemini (code quality).
All merge decisions are made by a human.
