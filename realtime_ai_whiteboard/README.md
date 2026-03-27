# Realtime AI Whiteboard

> Miro + ChatGPT, fully local. CRDT realtime sync + AI agent state machine.

**Industry:** SaaS | **Architecture:** Modular Monolith + BFF

## Systems

| # | System | Tech | Port |
|---|--------|------|------|
| 1 | PostgreSQL | PostgreSQL 16 | 5432 |
| 2 | Redis | Redis 7.2 | 6380 |
| 3 | MinIO | MinIO | 9000 |
| 4 | Kafka | Apache Kafka 3.7 | 9094 |
| 5 | ChromaDB | ChromaDB 0.5 | 8000 |
| 6 | Langfuse | Langfuse 2.60 | 3100 |
| 7 | Unleash | Unleash 5.12 | 4242 |
| 8 | BFF API | NestJS + Prisma + WebSocket | 4001 |
| 9 | AI Service | LangGraph + Ollama + ChromaDB | 4010 |
| 10 | Web App | React + Vite + Zustand + Yjs CRDT | 5173 |
| 11 | Mobile App | React Native + Expo | 8081 |

## Quick Start

### Demo Mode

```bash
cd web-app && pnpm install && pnpm dev:mock   # http://localhost:5173
```

### Real Mode

```bash
# 1. Docker infra (7 services)
docker compose up -d

# 2. Ollama
ollama serve
ollama pull llama3.2:1b    # first time

# 3. AI Service
cd ai-service && source .venv/bin/activate && uvicorn src.main:app --port 4010

# 4. BFF API
cd bff-api && pnpm install && pnpm start:dev   # + WebSocket :4002

# 5. Web App
cd web-app && pnpm install && pnpm dev

# 6. Mobile App
cd mobile-app && pnpm install && npx expo start
```

### Stop

```bash
# Ctrl+C each terminal, then:
docker compose down
pkill ollama   # optional
```

## Prerequisites

- Node.js 20+ / pnpm 9+
- Python 3.12+
- Ollama
- Docker + Docker Compose

## Documentation

See [docs/](docs/) for ConOps, PRD, UI/UX, Architecture, Technical Design, Roadmap, Testing.
