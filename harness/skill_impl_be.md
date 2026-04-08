---
name: skill_impl_be
description: Backend harness — single skill covering Core business logic + 3 wrapper patterns (checkpoint, chunk, idempotency) for any backend architectural style and any backend language stack.
status: implemented
---

## Harness identity

This is **1 of the 6 harnesses** in the AI workflow harness design (slide section 二, 四).

| Harness | This file |
|---|---|
| FE × 4 | `skill_impl_fe_ssr.md` / `skill_impl_fe_csr.md` / `skill_impl_fe_isr.md` / `skill_impl_fe_ab.md` |
| BE × 1 | **`skill_impl_be.md`** ← |
| Ops × 1 | `skill_impl_ops.md` |

BE is **1 harness** because — although architectural style branches at the entry point (CRUD-heavy / async-heavy / heavy batch / long-running job / kafka event-driven) — the business logic core is the same, and the 3 wrapper patterns (checkpoint, chunk, idempotency) compose around an unchanged Core function.

## Why BE is 1 harness, not 5

The slide proves this with Go code (sections 4.1–4.3): the same `issueLicenseCore` function is called from a CRUD HTTP handler, an async queue worker, and a Kafka event handler — the body of `issueLicenseCore` is byte-for-byte identical, only the wrapper around it changes. The wrapper handles entry-point lifecycle (checkpoint / chunk / idempotency), but the Core never changes.

That means one skill file with **1 Core chapter + 3 wrapper chapters** can teach an AI to generate any of the 5 architectural styles correctly. AI looks at the task description, picks the right wrapper, drops the Core inside, done.

## Why this is **stronger** than the slide claims

The slide proves convergence across **5 architectural styles in 1 language (Go)**. This portfolio proves convergence across **5 architectural styles in 5 different languages**:

| Project | Stack | Architectural styles present |
|---|---|---|
| `realtime_ai_whiteboard/bff-api` | NestJS (TypeScript) | CRUD-heavy, async-heavy (Redis Stream), kafka-style (SSE poll) |
| `enterprise_workflow_system/workflow-api` | Spring Boot + Kotlin + DGS GraphQL + JPA | CRUD-heavy (GraphQL Query/Mutation) |
| `enterprise_workflow_system/admin-api` | Laravel (PHP) | CRUD-heavy with audit |
| `enterprise_workflow_system/notification-worker` | Spring Boot + Kotlin + Kafka | kafka event-driven |
| `3d_asset_collaboration/asset-api` | ASP.NET Core 8 (C#) + EF Core + SignalR | CRUD-heavy + real-time push |
| `3d_asset_collaboration/iot-consumer` | .NET 8 + Confluent.Kafka + TimescaleDB | kafka event-driven + long-running |
| `3d_asset_collaboration/ai-service` | Python FastAPI + ONNX Runtime | CRUD-heavy (inference endpoint) |

**5 languages, 7 services, every one of them collapses into the same Core + wrapper mental model.** The harness convergence is so strong that even crossing language boundaries doesn't break it.

## When to use

Trigger when the user is building or modifying:
- a backend HTTP / GraphQL handler that mutates state
- a Kafka / Redis Stream / NATS / RabbitMQ consumer
- a scheduled batch job (cron, Airflow, Temporal)
- a long-running job that needs checkpointing
- an async background worker
- mentions any of: `Controller`, `@DgsMutation`, `@KafkaListener`, `BackgroundService`, `cron`, `chunk`, `checkpoint`, `idempotency key`, `Resolver`, `Hub`

This skill covers ALL backend services regardless of language or framework.

## The Core chapter — business logic

Every backend mutation has the same shape, regardless of how it's invoked:

```
1. Resolve the user / context (from request, message, event, schedule)
2. Check permission (`user.Can(...)`)
3. Call the domain service (`service.DoSomething(...)`)
4. Persist (`db.Save(...)`)
5. Emit metric / log
6. Return result OR ack the message
```

### Code template (language-agnostic pseudocode)

```
function coreLogic(ctx, input):
    user      = resolveUser(ctx, input)
    if !user.can(action):
        throw Forbidden
    result    = domainService.do(input)
    persist(result)
    metrics.increment(actionName)
    return result
```

### Real implementations across the portfolio

#### Kotlin (Spring Boot + DGS) — `enterprise_workflow_system/workflow-api`
```kotlin
// graphql/WorkflowMutation.kt
@DgsMutation
fun approveStep(@InputArgument stepId: String, @InputArgument comment: String?): ApprovalStep {
    val step = approvalStepRepository.findById(UUID.fromString(stepId))
        .orElseThrow { IllegalArgumentException("Step not found: $stepId") }
    step.status = ApprovalStatus.APPROVED       // domain mutation
    step.comment = comment
    step.decidedAt = Instant.now()
    return approvalStepRepository.save(step)    // persist
}
```

#### PHP (Laravel) — `enterprise_workflow_system/admin-api`
```php
// app/Http/Controllers/UserController.php
public function store(Request $request): JsonResponse {
    $validated = $request->validate([            // input check
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
    ]);
    $user = User::create($validated);            // persist
    return response()->json($user, 201);
}
```

#### C# (ASP.NET Core + EF Core) — `3d_asset_collaboration/asset-api`
```csharp
// Controllers/AssetsController.cs
[HttpPost]
public async Task<IActionResult> Create([FromBody] Asset asset) {
    asset.Id = Guid.NewGuid();
    asset.CreatedAt = DateTime.UtcNow;
    asset.UpdatedAt = DateTime.UtcNow;
    _db.Assets.Add(asset);                       // persist
    await _db.SaveChangesAsync();
    return CreatedAtAction(nameof(Get), new { id = asset.Id }, asset);
}
```

#### Kotlin (Spring Boot + Kafka) — `enterprise_workflow_system/notification-worker`
```kotlin
// consumer/ApprovalEventConsumer.kt
@KafkaListener(topics = ["workflow.approval-events"], groupId = "notification-worker")
fun handleApprovalEvent(message: String) {
    logger.info("Received approval event: $message")
    try {
        emailService.sendNotification(            // domain service call
            to = "manager@example.com",
            subject = "Workflow Approval Required",
            body = "...$message",
        )
    } catch (e: Exception) {
        logger.error("Failed to send notification", e)
    }
}
```

The 4 snippets above are in 3 different languages (Kotlin, PHP, C#) and 4 different runtimes (Spring Boot DGS, Laravel HTTP, ASP.NET Core HTTP, Spring Kafka), but the mental model is the same: **resolve → check → persist → log/ack**.

## Wrapper chapter 1 — Checkpoint (long-running job)

Wrapper that calls Core in a loop with periodic progress commits, so a crashed job resumes from the last checkpoint instead of starting over.

### Code template

```
function runWithCheckpoint(ctx, jobId, items):
    last = loadCheckpoint(jobId)
    for i = last to items.length:
        coreLogic(ctx, items[i])           // ← Core unchanged
        if i % 100 == 0:
            saveCheckpoint(jobId, i)
```

### Real example — `3d_asset_collaboration/iot-consumer`

The Kafka consumer is a degenerate case of checkpoint — Kafka's offset commit IS the checkpoint mechanism:

```csharp
// SensorDataConsumer.cs
while (!stoppingToken.IsCancellationRequested) {
    try {
        var result = consumer.Consume(TimeSpan.FromSeconds(1));
        if (result == null) continue;
        await StoreSensorReading(result.Message.Key, result.Message.Value, stoppingToken);
        // Confluent.Kafka commits offset implicitly here = checkpoint
    } catch (ConsumeException ex) {
        _logger.LogError(ex, "Kafka consume error");
    }
}
```

For non-Kafka long-running work (e.g. processing 10,000 user records), use explicit `saveCheckpoint(jobId, i)` calls every N items.

## Wrapper chapter 2 — Chunk (heavy batch)

Wrapper that splits a large input range into smaller chunks, each processed in its own transaction, to avoid long-held locks and gigantic transactions.

### Code template

```
function runInChunks(ctx, items, chunkSize):
    for chunk in splitChunks(items, chunkSize):
        beginTransaction()
        try:
            for item in chunk:
                coreLogic(ctx, item)         // ← Core unchanged
            commit()
        catch:
            rollback()
            throw
```

### When to use in this portfolio

The portfolio doesn't currently have a heavy-batch consumer, but the wrapper composes onto any Core. If `enterprise_workflow_system` added a "monthly report generator" that processes 100k workflows, it would wrap `WorkflowMutation.approveStep` (the Core) in a chunked loop with 1000 workflows per transaction.

## Wrapper chapter 3 — Idempotency (event-driven)

Wrapper that gates Core execution behind an "already-processed" check, so duplicate event delivery doesn't double-process.

### Code template

```
function handleWithIdempotency(ctx, event):
    if alreadyProcessed(event.id):
        return                              // duplicate, skip
    coreLogic(ctx, event.input)             // ← Core unchanged
    markProcessed(event.id)
```

### Real example — `enterprise_workflow_system/notification-worker`

The current consumer doesn't dedupe, but it should. Here's how to add the wrapper:

```kotlin
@KafkaListener(topics = ["workflow.approval-events"], groupId = "notification-worker")
fun handleApprovalEvent(message: String) {
    val eventId = parseEventId(message)
    if (idempotencyStore.alreadyProcessed(eventId)) return  // wrapper guard
    try {
        emailService.sendNotification(...)                   // ← Core unchanged
        idempotencyStore.markProcessed(eventId)              // wrapper post
    } catch (e: Exception) {
        logger.error("Failed", e)
    }
}
```

## Memory writeback evidence — leaf scenario skills built from this harness

These 9 leaf skills are concrete `Iteration → memory writeback` outputs of the BE harness across 5 different language stacks:

### NestJS (TypeScript) — `realtime_ai_whiteboard`
- [`nestjs-tenant-crud`](../realtime_ai_whiteboard/skills/nestjs-tenant-crud/skill.md) — Core CRUD pattern
- [`ai-task-queue-sse`](../realtime_ai_whiteboard/skills/ai-task-queue-sse/skill.md) — async-heavy via Redis Stream
- [`y-websocket-jwt-gateway`](../realtime_ai_whiteboard/skills/y-websocket-jwt-gateway/skill.md) — real-time push wrapper

### Spring Boot Kotlin (DGS GraphQL + JPA) + Laravel + Spring Kafka — `enterprise_workflow_system`
- [`kotlin-dgs-graphql-jpa-crud`](../enterprise_workflow_system/skills/kotlin-dgs-graphql-jpa-crud/skill.md) — Core CRUD pattern via GraphQL
- [`laravel-rest-crud-with-audit`](../enterprise_workflow_system/skills/laravel-rest-crud-with-audit/skill.md) — Core CRUD pattern via REST
- [`kotlin-kafka-notification-worker`](../enterprise_workflow_system/skills/kotlin-kafka-notification-worker/skill.md) — kafka event-driven (idempotency wrapper TODO)

### ASP.NET Core (C#) + .NET Kafka + Python FastAPI — `3d_asset_collaboration`
- [`aspnet-ef-crud-pagination`](../3d_asset_collaboration/skills/aspnet-ef-crud-pagination/skill.md) — Core CRUD pattern via REST
- [`signalr-realtime-hubs`](../3d_asset_collaboration/skills/signalr-realtime-hubs/skill.md) — real-time push wrapper
- [`kafka-timescale-iot-pipeline`](../3d_asset_collaboration/skills/kafka-timescale-iot-pipeline/skill.md) — kafka event-driven + long-running

**Total: 9 leaf skills writing back into this single BE harness across 5 language stacks (TypeScript / Kotlin / PHP / C# / Python).**

This is the proof that BE is exactly **1 harness** — even crossing 5 language boundaries, the leaves all share the same Core + wrapper mental model defined above. Each leaf is the legitimate "Iteration writeback" output of this harness adapted to its language's syntax surface.

## Convergence at downstream stages

Per the slide section 4.3, BE downstream stages (Pre-commit / Review / Test / Security / CI/CD / Deploy / Observability) are **all unified across the 5 architectural styles**. Concretely:

- **Pre-commit**: language-specific lint (eslint / ktlint / phpcs / dotnet format / black) — but ONE config per language, not per architectural style.
- **Test**: same test framework per language (jest / JUnit / phpunit / xunit / pytest), same patterns (mock the api boundary, assert the Core).
- **Security**: SAST + SBOM + secret-scan are language-level, not style-level. Same scan covers a CRUD handler and a Kafka consumer.
- **CI/CD**: same Docker build + same registry push + same K8s manifest pattern.
- **Deploy**: container image into K8s (or systemd, or Lambda) — same runner regardless of style.
- **Observability**: same APM (Datadog / Sentry / Grafana) tracking the same failure modes (latency, error rate, DB lock, OOM, timeout).

This is what the slide means by "BE 1 harness" — convergence is **structural**, not "we just chose to share".

## Anti-patterns

- Do NOT split a CRUD handler and a Kafka consumer into separate skills — they share the Core.
- Do NOT introduce a service layer just because the slide example has one — keep controllers thin if the codebase convention is thin.
- Do NOT rethrow exceptions from the inside a Kafka listener — log + swallow, the wrapper handles retry.
- Do NOT skip the idempotency wrapper for event-driven consumers — duplicate delivery is a "when" not "if".
- Do NOT use a service-layer abstraction that hides which entry point you're in — the wrapper is the entry point and it should be visible.
- Do NOT confuse this harness with FE harnesses — backend has no rendering boundary, no React compiler split, no per-user variant routing. One harness is enough.
