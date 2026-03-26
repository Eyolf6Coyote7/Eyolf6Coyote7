# 3D Asset Collaboration

> DAM + Digital Twin + IoT. gRPC streaming for large files + Three.js browser preview.

**Industry:** Media / Advertising | **Architecture:** Hexagonal (Ports & Adapters) | **11 systems**

## Systems

| # | System | Directory | Tech | Port |
|---|--------|-----------|------|------|
| 1 | PostgreSQL | docker | PostgreSQL 16 | 5434 |
| 2 | TimescaleDB | docker | TimescaleDB (PG16) | 5435 |
| 3 | Redis | docker | Redis 7.2 | 6382 |
| 4 | Kafka | docker | Apache Kafka 3.7 | 9096 |
| 5 | MinIO | docker | MinIO | 9004/9005 |
| 6 | Elasticsearch | docker | Elasticsearch 8.13 | 9201 |
| 7 | Mosquitto | docker | Eclipse Mosquitto 2.0 | 1883 |
| 8 | Unleash | docker | Unleash | 4244 |
| 9 | Asset API | `asset-api/` | ASP.NET Core 8 + gRPC + SignalR | 4003 |
| 10 | AI Service | `ai-service/` | Python FastAPI + ONNX | 4013 |
| 11 | Asset Portal | `asset-portal/` | React 19 + Three.js + Redux Toolkit | 3003 |

## Quick Start

### Demo Mode (no backend needed)

```bash
cd asset-portal && pnpm install && pnpm dev
# Open http://localhost:3003
# Features: 3D viewer, asset grid, IoT dashboard with mock data
```

### Real Mode (full stack)

#### Start

```bash
# 1. Infrastructure (8 Docker services)
docker compose up -d

# 2. Asset API (C# + gRPC + SignalR)
cd asset-api
dotnet run --urls http://localhost:4003    # Swagger: http://localhost:4003/swagger

# 3. AI Service (Python + ONNX)
cd ai-service
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt            # first time only
python3 -m uvicorn src.main:app --port 4013

# 4. IoT Consumer (C# Kafka worker)
cd iot-consumer
dotnet run

# 5. Asset Portal (React + Three.js)
cd asset-portal
echo "VITE_MOCK=false" > .env.local        # switch to real mode
pnpm install && pnpm dev
```

#### Stop

```bash
# Stop app services: Ctrl+C in each terminal

# Stop Docker infrastructure
docker compose down
```

### All Service URLs

| Service | URL |
|---------|-----|
| Asset Portal | http://localhost:3003 |
| Asset API (Swagger) | http://localhost:4003/swagger |
| AI Service | http://localhost:4013/health |
| MinIO Console | http://localhost:9005 |
| Elasticsearch | http://localhost:9201 |
| Unleash | http://localhost:4244 |
| Mosquitto (MQTT) | localhost:1883 |

## Prerequisites

- Node.js 20+ / pnpm 9+
- .NET 8 SDK (for C# services)
- Python 3.12+ (for AI service)
- Docker + Docker Compose

## Documentation

See [docs/](docs/) for architecture, technical design, ADRs, and development roadmap.
