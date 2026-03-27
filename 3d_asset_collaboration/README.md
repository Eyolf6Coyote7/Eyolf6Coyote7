# 3D Asset Collaboration

> DAM + Digital Twin + IoT. gRPC streaming for large files + Three.js browser preview.

**Industry:** Media / Advertising | **Architecture:** Hexagonal (Ports & Adapters)

## Systems

| # | System | Tech | Port |
|---|--------|------|------|
| 1 | PostgreSQL | PostgreSQL 16 | 5434 |
| 2 | TimescaleDB | TimescaleDB (PG16) | 5435 |
| 3 | Redis | Redis 7.2 | 6382 |
| 4 | Kafka | Apache Kafka 3.7 | 9096 |
| 5 | MinIO | MinIO | 9004 |
| 6 | Elasticsearch | Elasticsearch 8.13 | 9200 |
| 7 | Mosquitto | Eclipse Mosquitto 2.0 | 1883 |
| 8 | Unleash | Unleash | 4244 |
| 9 | Asset API | ASP.NET Core 8 + gRPC + SignalR | 5000 |
| 10 | AI Service | Python FastAPI + ONNX | 4020 |
| 11 | IoT Consumer | C# Kafka worker | — |
| 12 | Asset Portal | React 19 + Three.js + Redux Toolkit | 5176 |
| 13 | Mobile App | React Native + Expo | — |

## Quick Start

### Demo Mode

```bash
cd asset-portal && pnpm install && VITE_MOCK=true pnpm dev   # http://localhost:5176
```

### Real Mode

```bash
# 1. Docker infra (8 services)
docker compose up -d

# 2. Asset API (C# + gRPC + SignalR)
cd asset-api && dotnet run

# 3. AI Service (Python + ONNX)
cd ai-service && source .venv/bin/activate && uvicorn src.main:app --port 4020

# 4. IoT Consumer
cd iot-consumer && dotnet run

# 5. Asset Portal
cd asset-portal && pnpm install && pnpm dev
```

### Stop

```bash
# Ctrl+C each terminal, then:
docker compose down
```

## Prerequisites

- Node.js 20+ / pnpm 9+
- .NET 8 SDK
- Python 3.12+
- Docker + Docker Compose

### Storybook

```bash
cd asset-portal && pnpm storybook   # http://localhost:6006
```

## Documentation

See [docs/](docs/) for ConOps, PRD, UI/UX, Architecture, Technical Design, Roadmap, Testing.
