# 3D Asset Collaboration

**Industry:** Media / Advertising — DAM + Digital Twin + IoT

## Systems

| System | Directory | Tech | Port |
|--------|-----------|------|------|
| Asset API | `asset-api/` | ASP.NET Core (C#) + gRPC | 4003 |
| AI Service | `ai-service/` | Python + FastAPI + ONNX | 4013 |
| IoT Consumer | `iot-consumer/` | Kafka Consumer (C#) | — |
| Asset Portal | `asset-portal/` | React + Three.js + Redux Toolkit | 3003 |
| Unity Client | `unity-client/` | Unity 2022 LTS (C#) | — |
| Mobile App | `mobile-app/` | React (lightweight) | — |

## Documentation

See [docs/](docs/) for all project documentation.

## Quick Start

```bash
# Start shared infra (includes Elasticsearch, TimescaleDB, Mosquitto)
docker compose up -d

# Start backend
cd asset-api && dotnet run

# Start frontend
cd asset-portal && npm install && npm run dev
```
