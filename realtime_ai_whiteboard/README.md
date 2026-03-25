# Realtime AI Whiteboard

**Industry:** SaaS — collaborative whiteboard with AI agent (Miro + ChatGPT, fully local)

## Systems

| System | Directory | Tech | Port |
|--------|-----------|------|------|
| BFF + API | `bff-api/` | NestJS (TypeScript) | 4001 |
| AI Service | `ai-service/` | LangGraph + LangChain (Python) | 4010 |
| Web App | `web-app/` | React + Vite + Zustand | 5173 |
| Mobile App | `mobile-app/` | React Native + Expo | 8081 |

## Documentation

See [docs/](docs/) for all project documentation (ConOps, PRD, UI/UX, Architecture, Technical Design, Roadmap, Testing).

## Quick Start

```bash
# Start shared infra
docker compose up -d
```

**Terminal 1 (backend):**
```bash
cd bff-api && pnpm install && pnpm start:dev
```

**Terminal 2 (frontend):**
```bash
cd web-app && pnpm install && pnpm dev
```

**Demo mode (no backend needed):**
```bash
cd web-app && pnpm install && pnpm dev:mock
```
