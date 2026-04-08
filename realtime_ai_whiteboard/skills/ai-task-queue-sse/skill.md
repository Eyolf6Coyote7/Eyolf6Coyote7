---
name: ai-task-queue-sse
description: Enqueue AI work on a Redis Stream from NestJS, consume with a Python asyncio worker, and stream the final result back as SSE.
---

## When to use

Trigger when the user asks to:

- enqueue an AI / background task from the BFF
- consume tasks from a Redis Stream in Python
- expose a streaming result endpoint to the web client
- mentions of XADD, XREADGROUP, ai-tasks, ai-result:, ioredis, redis.asyncio, LangGraph, ChatOllama

## Context

End-to-end flow:

1. Web client POSTs prompt to /api/v1/ai/prompt (NestJS).
2. AiGatewayService.enqueueTask generates a uuid, then XADDs to the ai-tasks stream with task_id, board_id, prompt, user_id fields.
3. Python worker (src/agents/task_consumer.py) creates a consumer group ai-service, runs XREADGROUP in a loop with block=5000, builds an AgentState dict, and invokes the LangGraph agent in a thread.
4. The result is stored in Redis at key ai-result:{task_id} with TTL 300s as a JSON blob containing response and tool_results, then XACKed.
5. The BFF SSE endpoint /api/v1/ai/stream/:taskId polls Redis at 500ms intervals via rxjs interval/switchMap/from until a result appears, parses it, and emits a single { type: 'done', ...parsed } MessageEvent.

Canonical files: bff-api/src/ai-gateway/ai-gateway.service.ts (lines 1-44), bff-api/src/ai-gateway/ai-gateway.controller.ts (lines 1-60), ai-service/src/agents/task_consumer.py (lines 1-87), ai-service/src/agents/whiteboard_agent.py (LangGraph).

## Operating instructions

When adding a new background-AI capability (example: 'summarise selected nodes'):

1. NestJS side: extend AiGatewayService.enqueueTask (or create a sibling) to XADD additional fields (e.g. selection_ids). Field names must be snake_case strings; values are encoded as strings.
2. Python side: extend the dict-comprehension in task_consumer.py that decodes msg fields, and add the new field to AgentState in whiteboard_agent.py. Update classify_intent / plan_steps if the new capability changes the graph routing.
3. Result key shape: keep storing JSON via r.set(result_key, json.dumps({ response, tool_results, ... }), ex=RESULT_TTL). The BFF parses the entire blob and forwards the parsed object inside MessageEvent.data.
4. Always XACK after the result is set so a crash before XACK forces a redelivery.
5. Keep the consumer name unique per process: f'worker-{os.getpid()}'.
6. SSE controller stays unchanged unless the event-type contract evolves.

Operational checks: STREAM_KEY = 'ai-tasks', GROUP_NAME = 'ai-service', RESULT_PREFIX = 'ai-result:', RESULT_TTL = 300. The BFF poll interval is 500ms (interval(500) in ai-gateway.controller.ts).

## Reusable prompts / code patterns

### NestJS enqueue

Use ioredis xadd against STREAM_KEY = 'ai-tasks' with field-value pairs (task_id, board_id, prompt, user_id) plus any new fields. The id parameter is '*' (auto-generate). Return the uuid task id from the method. See ai-gateway.service.ts lines 22-38.

### NestJS SSE poller

Decorate the method with @Sse('stream/:taskId'). Build an Observable<MessageEvent> by piping interval(500) through switchMap(() => from(getResult(taskId))), takeWhile(r => !r, true), and map(result => result ? { data: { type: 'done', ...JSON.parse(result) } } : { data: { type: 'pending' } }). See ai-gateway.controller.ts lines 40-58.

### Python consumer loop (task_consumer.py)

    consumer = f'worker-{os.getpid()}'
    r = redis.from_url(os.getenv('REDIS_URL', 'redis://localhost:6379'))
    try:
        await r.xgroup_create(STREAM_KEY, GROUP_NAME, id='0', mkstream=True)
    except redis.ResponseError:
        pass
    while True:
        messages = await r.xreadgroup(GROUP_NAME, consumer, {STREAM_KEY: '>'}, count=1, block=5000)
        for _stream, entries in messages:
            for msg_id, data in entries:
                task = {k.decode(): v.decode() for k, v in data.items()}
                state = build_state(task)
                result = await asyncio.to_thread(agent.invoke, state)
                key = f'{RESULT_PREFIX}{task.get("task_id", msg_id.decode())}'
                await r.set(key, json.dumps({'response': result['response'], 'tool_results': result['tool_results']}), ex=RESULT_TTL)
                await r.xack(STREAM_KEY, GROUP_NAME, msg_id)

### LangGraph agent shape

Nodes: classify_intent, plan_steps, retrieve_context, execute_tools, generate_response, reflect. Conditional edges: route_by_intent (after retrieve_context, branches to execute_tools or generate_response) and route_after_reflect (loops back to plan_steps or to END). The LLM call uses ChatOllama with OLLAMA_MODEL and OLLAMA_BASE_URL env vars and a try/except fallback message.

## Anti-patterns

- Do NOT XACK before the result key is set - a crash mid-write would lose the work permanently.
- Do NOT use blocking redis from inside the BFF event loop - ioredis is async; use the existing rxjs interval/from pattern.
- Do NOT skip the consumer group + mkstream creation - first start would fail otherwise.
- Do NOT use a fixed consumer name across processes - it must include os.getpid() or a hostname suffix.
- Do NOT serialise tool_results as a Python repr() - always json.dumps so the BFF can JSON.parse.
- Do NOT raise the SSE poll interval below 250ms - it pegs Redis CPU at idle.
- Do NOT exceed RESULT_TTL by storing huge blobs - keep responses summarised; large tool outputs go to a separate URL or object store.
- Do NOT introduce a separate result channel (pub/sub) without removing the polling path - the SSE controller depends on the result-key-presence semantics.

## References

- realtime_ai_whiteboard/bff-api/src/ai-gateway/ai-gateway.service.ts:1-44 - enqueueTask + getResult.
- realtime_ai_whiteboard/bff-api/src/ai-gateway/ai-gateway.controller.ts:1-60 - prompt POST + SSE stream.
- realtime_ai_whiteboard/ai-service/src/agents/task_consumer.py:1-87 - consumer group, decode, agent invoke, set, xack.
- realtime_ai_whiteboard/ai-service/src/agents/whiteboard_agent.py:1-133 - LangGraph state machine, ChatOllama call.
- realtime_ai_whiteboard/bff-api/src/ai-gateway/ai-gateway.service.spec.ts - service unit tests.
- realtime_ai_whiteboard/ai-service/tests/ - pytest patterns.
- realtime_ai_whiteboard/docker-compose.yml - redis, bff-api, ai-service wiring.
