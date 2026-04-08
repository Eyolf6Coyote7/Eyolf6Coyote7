---
name: kafka-timescale-iot-pipeline
description: Add a Kafka topic consumer to iot-consumer that writes to a TimescaleDB hypertable, plus the matching FastAPI ai-service ONNX inference sidecar. Single skill covers the whole IoT/ML data plane.
when_to_use:
  - ingest a new Kafka topic into TimescaleDB
  - add a new sensor reading source to `iot-consumer
  - add a new ML inference endpoint to `ai-service` (FastAPI + ONNX)
  - mentions `BackgroundService`, `ConsumerBuilder`, `NpgsqlCommand`, `asset3d.iot-sensor-data`, `AssetTagger`, `onnxruntime
  - wire a producer → broker → consumer → time-series DB pipeline
tech_stack:
  - dotnet
  - csharp
  - confluent-kafka
  - timescaledb
  - fastapi
  - python
  - onnx
harness: be
project: 3d_asset_collaboration
---

## When to use

Trigger when the user asks to:
- ingest a new Kafka topic into TimescaleDB
- add a new sensor reading source to `iot-consumer`
- add a new ML inference endpoint to `ai-service` (FastAPI + ONNX)
- mentions `BackgroundService`, `ConsumerBuilder`, `NpgsqlCommand`, `asset3d.iot-sensor-data`, `AssetTagger`, `onnxruntime`
- wire a producer → broker → consumer → time-series DB pipeline

This skill is intentionally CONVERGED — one skill covers BOTH the .NET Kafka consumer AND the Python FastAPI/ONNX sidecar because they form ONE data plane. Per slide thesis: backend collapses into high-coverage skills.

## Context

The 3d_asset stack has TWO separate background services that the slide treats as one converged "data plane":

### iot-consumer (.NET 8)

`iot-consumer/SensorDataConsumer.cs:1-64` is a `BackgroundService` that:

1. Builds a Confluent.Kafka `ConsumerBuilder<string, string>` with `BootstrapServers` from config (`Kafka:BootstrapServers`, default `localhost:9096`), `GroupId = "iot-consumer"`, `AutoOffsetReset.Earliest`.
2. `Subscribe("asset3d.iot-sensor-data")` — single topic.
3. Loops calling `consumer.Consume(TimeSpan.FromSeconds(1))` and writes each message to TimescaleDB via `Npgsql`.
4. INSERT statement uses parameterized `NpgsqlCommand` writing to `sensor_readings (time, device_id, value, unit) VALUES (NOW(), @deviceId, @value, 'celsius')`.
5. Logs at `Information` on receive, `Error` on `ConsumeException` (caught + swallowed so the loop continues).

### ai-service (Python FastAPI + ONNX)

- `ai-service/src/main.py:1-28` — minimal FastAPI app with `CORSMiddleware` for `localhost:3003 / 4003`, includes `tag_router`, exposes `/health`.
- `ai-service/src/models/tagger.py:1-91` — `AssetTagger` class with `MOCK_MODE` toggle. Real mode loads ONNX model via `onnxruntime.InferenceSession`, preprocesses image to 224×224 NCHW float32 tensor, runs inference, applies softmax, returns top-K labels.
- Singleton instance: `tagger = AssetTagger()` at module bottom.
- `MOCK_MODE` returns hardcoded `MOCK_TAGS` list — used for portfolio demo.

## Operating instructions

### Adding a new Kafka topic consumer

1. Add a new `BackgroundService` class in `iot-consumer/` (or method on existing `SensorDataConsumer` if same domain).
2. Build the Kafka config with same `BootstrapServers` source + a NEW `GroupId` if it's a logically separate consumer group.
3. `Subscribe("topic.name")` and loop `consumer.Consume(TimeSpan.FromSeconds(1))`.
4. Wrap each message processing in try/catch — log errors, continue.
5. Open `iot-consumer/Program.cs` and register the new service via `builder.Services.AddHostedService<NewConsumer>()`.
6. For TimescaleDB writes, use parameterized `NpgsqlCommand` — NEVER string-concat SQL.
7. ALWAYS call `await conn.OpenAsync(ct)` then `await using` cleanup.
8. For NEW hypertables, add a Flyway / SQL migration creating the table + `SELECT create_hypertable('table_name', 'time')`.

### Adding a new FastAPI ML endpoint

1. Open `ai-service/src/routes/<name>.py` and define a router: `router = APIRouter(prefix="/api/v1")`.
2. Define endpoint(s) with `@router.post("/path")` returning JSON dict / Pydantic model.
3. For ML inference, instantiate the model class as a singleton at module bottom.
4. ALWAYS gate real inference behind `if settings.MOCK_MODE` and provide a mock fallback for portfolio demo.
5. Open `src/main.py` and `app.include_router(<new>_router)`.
6. Add tests under `ai-service/tests/test_<name>.py` mirroring `test_tagger.py`.
7. Configure CORS allowed origins in `main.py` if a new frontend port needs access.

## Reusable prompts / code patterns

Kafka consumer skeleton:
```csharp
using Confluent.Kafka;
using Npgsql;

namespace IoTConsumer;

public class FooConsumer : BackgroundService
{
    private readonly ILogger<FooConsumer> _logger;
    private readonly IConfiguration _config;

    public FooConsumer(ILogger<FooConsumer> logger, IConfiguration config)
    {
        _logger = logger;
        _config = config;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var kafkaConfig = new ConsumerConfig
        {
            BootstrapServers = _config["Kafka:BootstrapServers"] ?? "localhost:9096",
            GroupId = "foo-consumer",
            AutoOffsetReset = AutoOffsetReset.Earliest,
        };

        using var consumer = new ConsumerBuilder<string, string>(kafkaConfig).Build();
        consumer.Subscribe("asset3d.foo-events");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var result = consumer.Consume(TimeSpan.FromSeconds(1));
                if (result == null) continue;
                _logger.LogInformation("Received: {Key} = {Value}", result.Message.Key, result.Message.Value);
                await StoreFooReading(result.Message.Key, result.Message.Value, stoppingToken);
            }
            catch (ConsumeException ex)
            {
                _logger.LogError(ex, "Kafka consume error");
            }
        }
    }
}
```

Parameterized TimescaleDB insert:
```csharp
var connStr = _config["ConnectionStrings:TimescaleDB"] ?? "Host=localhost;Port=5435;Database=asset3d_iot;Username=asset3d;Password=asset3d_dev";

await using var conn = new NpgsqlConnection(connStr);
await conn.OpenAsync(ct);

await using var cmd = new NpgsqlCommand(
    "INSERT INTO foo_readings (time, device_id, value, unit) VALUES (NOW(), @deviceId, @value, @unit)",
    conn);
cmd.Parameters.AddWithValue("deviceId", deviceId);
cmd.Parameters.AddWithValue("value", value);
cmd.Parameters.AddWithValue("unit", "celsius");

await cmd.ExecuteNonQueryAsync(ct);
```

FastAPI ONNX model class skeleton (with MOCK_MODE):
```python
from __future__ import annotations
import io
from pathlib import Path
import numpy as np
from PIL import Image
from src.config import settings

MOCK_RESULTS = [{"label": "stub", "confidence": 0.9}]

class FooModel:
    def __init__(self) -> None:
        self._session = None
        if not settings.MOCK_MODE:
            self._load_model()

    def _load_model(self) -> None:
        import onnxruntime as ort
        model_path = Path(settings.MODEL_PATH)
        if not model_path.exists():
            raise FileNotFoundError(f"ONNX model not found at {model_path}")
        self._session = ort.InferenceSession(str(model_path))

    def _preprocess(self, image_bytes: bytes) -> np.ndarray:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((224, 224))
        arr = np.array(img, dtype=np.float32) / 255.0
        arr = np.transpose(arr, (2, 0, 1))
        return np.expand_dims(arr, axis=0)

    def predict(self, image_bytes: bytes, top_k: int = 5):
        if settings.MOCK_MODE or self._session is None:
            return MOCK_RESULTS[:top_k]
        tensor = self._preprocess(image_bytes)
        input_name = self._session.get_inputs()[0].name
        outputs = self._session.run(None, {input_name: tensor})
        # softmax + top-k...
        return []

foo_model = FooModel()
```

## Anti-patterns

- Do NOT string-concatenate SQL — always parameterize via `NpgsqlCommand.Parameters.AddWithValue`.
- Do NOT skip `try/catch` around `Consume()` — one bad message would crash the worker.
- Do NOT load ONNX model eagerly when `MOCK_MODE=true` — it's a portfolio demo and the binary may not exist.
- Do NOT call `.Result` / `.Wait()` on async tasks — the BackgroundService will deadlock.
- Do NOT split the Python service into multiple processes — keep ONE FastAPI app per service.
- Do NOT skip `await using` on Npgsql resources — connection leaks crash the service.
- Do NOT hardcode the Kafka broker / DB connection string — read from config with a sane default.

## References

- `iot-consumer/SensorDataConsumer.cs:17-63` — Kafka consume + Npgsql insert loop
- `iot-consumer/Program.cs` — `AddHostedService` registration
- `ai-service/src/main.py:1-28` — FastAPI app + CORS + router include
- `ai-service/src/models/tagger.py:44-91` — ONNX inference + MOCK_MODE pattern
- `ai-service/src/config.py` — settings (MODEL_PATH, MOCK_MODE)
- `docker-compose.yml` — Kafka + TimescaleDB service definitions
