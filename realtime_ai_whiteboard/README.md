# Realtime AI Whiteboard

> Miro + ChatGPT, fully local. CRDT realtime sync + AI agent state machine.

**Industry:** SaaS | **Architecture:** Modular Monolith + BFF | **11 systems**

## Systems

| # | System | Directory | Tech | Port |
|---|--------|-----------|------|------|
| 1 | PostgreSQL | docker | PostgreSQL 16 | 5432 |
| 2 | Redis | docker | Redis 7.2 | 6380 |
| 3 | MinIO | docker | MinIO | 9000/9001 |
| 4 | Kafka | docker | Apache Kafka 3.7 | 9094 |
| 5 | ChromaDB | docker | ChromaDB 0.5 | 8000 |
| 6 | Langfuse | docker | Langfuse 2.60 | 3100 |
| 7 | Unleash | docker | Unleash 5.12 | 4242 |
| 8 | BFF API | `bff-api/` | NestJS + Prisma + WebSocket | 4001 |
| 9 | AI Service | `ai-service/` | LangGraph + Ollama + ChromaDB | 4010 |
| 10 | Web App | `web-app/` | React + Vite + Zustand + Fabric.js | 5173 |
| 11 | Mobile App | `mobile-app/` | React Native + Expo | 8081 |

## Quick Start

### Demo Mode (no backend needed)

```bash
cd web-app && pnpm install && pnpm dev:mock
# Open http://localhost:5173
```

### Real Mode (full stack)

#### Start

```bash
# 1. Infrastructure (7 Docker services)
docker compose up -d

# 2. Ollama LLM (required for AI Service)
ollama serve                          # keep running in background
ollama pull llama3.2:1b               # first time only

# 3. AI Service (Python)
cd ai-service
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt       # first time only
uvicorn src.main:app --port 4010

# 4. BFF API (NestJS)
cd bff-api
pnpm install                          # first time only
npx prisma db push                    # first time only
pnpm start:dev

# 5. Web App (React)
cd web-app
pnpm install                          # first time only
pnpm dev

# 6. Mobile App (React Native / Expo)
cd mobile-app
pnpm install                          # first time only
npx expo start                        # Expo dev server
# Press 'i' for iOS simulator, 'a' for Android emulator, 'w' for web
```

### Mobile App Screens

7 screens aligned with Figma design system (`#2563EB` / `#004AC6`):

| Screen | File | Description |
|--------|------|-------------|
| Splash | `app/splash.tsx` | Animated loading with brand identity |
| Auth | `app/auth.tsx` | Sign Up / Log In with OAuth (Google, GitHub) |
| Home | `app/(tabs)/boards.tsx` | Board list with thumbnails, search, FAB |
| AI Chat | `app/(tabs)/chat.tsx` | AI assistant with suggestion chips, action cards |
| Canvas | `app/board/[id].tsx` | Collaborative canvas with floating toolbar |
| Board Settings | `app/board/settings.tsx` | Sharing, members, danger zone |
| Account | `app/(tabs)/settings.tsx` | Profile, plan, team, preferences |

#### Stop

```bash
# Stop app services: Ctrl+C in each terminal

# Stop Docker infrastructure
docker compose down

# Stop Ollama (optional)
pkill ollama
```

### All Service URLs

| Service | URL |
|---------|-----|
| Web App | http://localhost:5173 |
| BFF API | http://localhost:4001 |
| Yjs WebSocket | ws://localhost:4002 |
| AI Service | http://localhost:4010 |
| Mobile App (Expo) | http://localhost:8081 |
| Langfuse | http://localhost:3100 |
| MinIO Console | http://localhost:9001 |
| Unleash | http://localhost:4242 |
| ChromaDB | http://localhost:8000 |

### Other Commands

```bash
cd web-app && pnpm storybook    # Component docs on :6006
cd web-app && pnpm test:e2e     # Playwright E2E tests
cd web-app && pnpm lint         # ESLint
cd bff-api && pnpm lint         # ESLint + Prisma generate
```

## Prerequisites

- Node.js 20+ / pnpm 9+
- Python 3.12+ (for AI Service)
- Ollama (for local LLM)
- Docker + Docker Compose
- Expo CLI (for Mobile App): `npm i -g expo-cli`
- iOS Simulator (Xcode) or Android Emulator (Android Studio) for mobile

## Documentation

See [docs/](docs/) for ConOps, PRD, UI/UX, Architecture, Technical Design, Roadmap, Testing.
