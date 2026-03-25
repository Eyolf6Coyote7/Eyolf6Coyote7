import asyncio
import json
import os
import redis.asyncio as redis
from src.agents.whiteboard_agent import agent, AgentState


STREAM_KEY = "ai-tasks"
GROUP_NAME = "ai-service"
CONSUMER_NAME = "worker-1"


async def consume_tasks():
    """Consume AI tasks from Redis Stream."""
    r = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379"))

    # Create consumer group if not exists
    try:
        await r.xgroup_create(STREAM_KEY, GROUP_NAME, id="0", mkstream=True)
    except redis.ResponseError:
        pass  # Group already exists

    print(f"AI Service consuming from Redis Stream: {STREAM_KEY}")

    while True:
        messages = await r.xreadgroup(
            GROUP_NAME, CONSUMER_NAME, {STREAM_KEY: ">"}, count=1, block=5000
        )

        for stream, entries in messages:
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

                # Store result for SSE pickup
                result_key = f"ai-result:{task.get('task_id', msg_id.decode())}"
                await r.set(
                    result_key,
                    json.dumps(
                        {
                            "response": result["response"],
                            "tool_results": result["tool_results"],
                        }
                    ),
                    ex=300,
                )

                await r.xack(STREAM_KEY, GROUP_NAME, msg_id)

    await r.close()


if __name__ == "__main__":
    asyncio.run(consume_tasks())
