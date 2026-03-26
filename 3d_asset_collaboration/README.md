# 3D Asset Collaboration

> DAM + Digital Twin + IoT. gRPC streaming for large files + Three.js browser preview.

**Industry:** Media / Advertising | **Architecture:** Hexagonal (Ports & Adapters)

## Services

| Service | Tech | Port | Status |
|---------|------|------|--------|
| Asset Portal | React 19 + Three.js + Redux Toolkit | 3003 | ✅ Demo ready |
| Asset API | ASP.NET Core 8 + gRPC + SignalR | 4003 | ✅ Scaffold |
| AI Service | Python FastAPI + ONNX | 4013 | ✅ Scaffold |
| IoT Consumer | C# Kafka Worker → TimescaleDB | — | ✅ Scaffold |
| Unity Client | Unity 2022 LTS (C#) | — | Planned |
| Mobile App | React Native | — | Planned |

## Quick Start

### Demo Mode (no backend needed)

```bash
cd asset-portal && pnpm install && pnpm dev
# Open http://localhost:3003 (login: demo@example.com / demo)
# Features: 3D viewer, asset grid, IoT dashboard with mock data
```

### Full Stack (local)

```bash
# 1. Start infrastructure
docker compose up -d

# 2. Asset API (requires .NET 8 SDK)
cd asset-api && dotnet run --urls http://localhost:4003

# 3. AI Service (requires Python 3.12)
cd ai-service && pip install -r requirements.txt && uvicorn src.main:app --port 4013

# 4. IoT Consumer (requires .NET 8 SDK)
cd iot-consumer && dotnet run

# 5. Asset Portal (set VITE_MOCK=false in .env.local for real mode)
cd asset-portal && pnpm install && pnpm dev
```

### Infrastructure Services

| Service | Port | UI |
|---------|------|-----|
| PostgreSQL | 5434 | — |
| TimescaleDB | 5435 | — |
| Redis | 6382 | — |
| Kafka | 9096 | — |
| MinIO | 9004 | http://localhost:9005 |
| Elasticsearch | 9201 | — |
| Mosquitto (MQTT) | 1883 | — |
| Unleash | 4244 | http://localhost:4244 |

## Prerequisites

- Node.js 20+ / pnpm 9+
- .NET 8 SDK (for C# services)
- Python 3.12+ (for AI service)
- Docker + Docker Compose

## Documentation

See [docs/](docs/) for architecture, technical design, ADRs, and development roadmap.
