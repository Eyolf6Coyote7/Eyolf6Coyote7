# Realtime AI Whiteboard

**Industry:** SaaS — collaborative whiteboard with AI agent (Miro + ChatGPT, fully local)

## Systems

| System | Directory | Tech | Port |
|--------|-----------|------|------|
| BFF + API | `bff-api/` | NestJS (TypeScript) | 4001 |
| AI Service | `ai-service/` | LangGraph + LangChain (Python) | 4010 |
| Web App | `web-app/` | React + Vite + Zustand | 3000 |
| Mobile App | `mobile-app/` | React Native + Expo | 8081 |

## Documentation

See [docs/](docs/) for all project documentation (ConOps, PRD, UI/UX, Architecture, Technical Design, Roadmap, Testing).

## Quick Start

```bash
# Start shared infra
docker compose up -d

# Start backend
cd bff-api && npm install && npm run dev

# Start frontend
cd web-app && npm install && npm run dev
```
