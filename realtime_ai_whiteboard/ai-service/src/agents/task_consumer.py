import asyncio
import json
import os
import signal

import redis.asyncio as redis

from src.agents.whiteboard_agent import AgentState, agent

STREAM_KEY = "ai-tasks"
GROUP_NAME = "ai-service"
RESULT_PREFIX = "ai-result:"
RESULT_TTL = 300


async def consume_tasks() -> None:
    """Consume AI tasks from Redis Stream."""
    consumer_name = os.getenv("CONSUMER_NAME", f"worker-{os.getpid()}")
    r = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379"))

    try:
        await r.xgroup_create(STREAM_KEY, GROUP_NAME, id="0", mkstream=True)
    except redis.ResponseError:
        pass

    print(
        f"AI Service consuming from Redis Stream: {STREAM_KEY} (consumer: {consumer_name})"
    )

    running = True

    def shutdown(_sig: int, _frame: object) -> None:
        nonlocal running
        running = False
        print("Shutting down consumer...")

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    try:
        while running:
            messages = await r.xreadgroup(
                GROUP_NAME, consumer_name, {STREAM_KEY: ">"}, count=1, block=5000
            )

            for _stream, entries in messages:
                for msg_id, data in entries:
                    task = {k.decode(): v.decode() for k, v in data.items()}
                    print(f"Processing task: {task.get('prompt', '')[:50]}...")

                    state: AgentState = {
                        "prompt": task.get("prompt", ""),
                        "board_id": task.get("board_id", ""),
                        "user_id": task.get("user_id", ""),
                        "intent": "",
                        "context": "",
                        "plan": [],
                        "tool_results": [],
                        "response": "",
                        "should_retry": False,
                    }

                    result = await asyncio.to_thread(agent.invoke, state)

                    result_key = (
                        f"{RESULT_PREFIX}{task.get('task_id', msg_id.decode())}"
                    )
                    await r.set(
                        result_key,
                        json.dumps(
                            {
                                "response": result["response"],
                                "tool_results": result["tool_results"],
                            }
                        ),
                        ex=RESULT_TTL,
                    )

                    await r.xack(STREAM_KEY, GROUP_NAME, msg_id)
    finally:
        await r.close()
        print("Consumer stopped.")


if __name__ == "__main__":
    asyncio.run(consume_tasks())
