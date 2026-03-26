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
    """Submit a prompt and get true SSE streaming response via Ollama."""
    from langchain_ollama import ChatOllama

    async def event_generator():
        llm = ChatOllama(
            model=os.getenv("OLLAMA_MODEL", "llama3.2:1b"),
            base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
            temperature=0.7,
        )

        system_prompt = (
            "You are an AI assistant for a collaborative whiteboard application. "
            "Help users brainstorm, organize ideas, and provide suggestions. "
            "Keep responses concise and actionable."
        )

        messages = [
            ("system", system_prompt),
            ("human", req.prompt),
        ]

        try:
            for chunk in llm.stream(messages):
                if chunk.content:
                    yield {"event": "token", "data": chunk.content}
        except Exception:
            yield {
                "event": "token",
                "data": "AI is currently unavailable. Please try again later.",
            }

        yield {"event": "done", "data": ""}

    return EventSourceResponse(event_generator())


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "src.main:app", host="0.0.0.0", port=int(os.getenv("PORT", "4010")), reload=True
    )
