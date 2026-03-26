import asyncio
import os
import uuid

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse

from src.agents.whiteboard_agent import AgentState, agent

load_dotenv()

app = FastAPI(title="Whiteboard AI Service", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4001"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PromptRequest(BaseModel):
    prompt: str
    board_id: str = "default"
    user_id: str = "anonymous"


class PromptResponse(BaseModel):
    task_id: str
    response: str
    intent: str
    tool_results: list[dict]


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "ai-service",
        "model": os.getenv("OLLAMA_MODEL", "llama3.2:1b"),
    }


@app.post("/api/prompt", response_model=PromptResponse)
async def prompt(req: PromptRequest):
    """Submit a prompt and get AI response (synchronous)."""
    state: AgentState = {
        "prompt": req.prompt,
        "board_id": req.board_id,
        "user_id": req.user_id,
        "intent": "",
        "context": "",
        "plan": [],
        "tool_results": [],
        "response": "",
        "should_retry": False,
    }

    result = await asyncio.to_thread(agent.invoke, state)

    return PromptResponse(
        task_id=str(uuid.uuid4()),
        response=result["response"],
        intent=result["intent"],
        tool_results=result["tool_results"],
    )


@app.post("/api/stream")
async def stream_prompt(req: PromptRequest):
    """Submit a prompt and get SSE streaming response."""

    async def event_generator():
        state: AgentState = {
            "prompt": req.prompt,
            "board_id": req.board_id,
            "user_id": req.user_id,
            "intent": "",
            "context": "",
            "plan": [],
            "tool_results": [],
            "response": "",
            "should_retry": False,
        }

        result = await asyncio.to_thread(agent.invoke, state)

        words = result["response"].split()
        for i, word in enumerate(words):
            yield {"event": "token", "data": word + (" " if i < len(words) - 1 else "")}
            await asyncio.sleep(0.05)

        yield {"event": "done", "data": ""}

    return EventSourceResponse(event_generator())


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "src.main:app", host="0.0.0.0", port=int(os.getenv("PORT", "4010")), reload=True
    )
