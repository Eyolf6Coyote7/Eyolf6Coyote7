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

### Demo mode (no backend needed)

```bash
cd web-app && pnpm install && pnpm dev:mock
```

Open http://localhost:5173 — dashboard with 6 demo boards, AI chat, drawing tools.

### Real mode (full stack)

**Terminal 1 — Docker infra:**
```bash
./start.sh
```

Or manually:

**Terminal 1 — Docker:**
```bash
docker compose up -d
```

**Terminal 2 — Backend:**
```bash
cd bff-api
cp .env.example .env
pnpm install
npx prisma db push       # sync database schema
pnpm start:dev
```

**Terminal 3 — Frontend:**
```bash
cd web-app
pnpm install
pnpm dev
```

> ⚠️ `pnpm dev` runs real mode (connects to backend on :4001).
> `pnpm dev:mock` runs demo mode (no backend needed, mock data).
> If `.env.local` has `VITE_MOCK=true`, `pnpm dev` also runs mock mode — delete it for real mode.

### Services

| Service | URL |
|---------|-----|
| Web App | http://localhost:5173 |
| BFF API | http://localhost:4001 |
| Yjs WebSocket | ws://localhost:4002 |
| AI Service | http://localhost:4010 |
| Storybook | http://localhost:6006 |
| Langfuse | http://localhost:3100 |
| MinIO Console | http://localhost:9001 |
| Unleash | http://localhost:4242 |
| Redis | localhost:6380 |
| PostgreSQL | localhost:5432 |
| Kafka | localhost:9094 |

### Other commands

```bash
cd web-app && pnpm storybook    # Component docs on :6006
cd web-app && pnpm test:e2e     # Playwright E2E tests (13 tests)
cd web-app && pnpm lint         # ESLint
cd bff-api && pnpm lint         # ESLint + Prisma generate
```
