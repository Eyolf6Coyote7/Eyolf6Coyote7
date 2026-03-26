from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings
from src.routes.tag import router as tag_router

app = FastAPI(title="3D Asset AI Tagger", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3003", "http://localhost:4003"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tag_router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "ai-service", "port": settings.PORT, "mock_mode": settings.MOCK_MODE}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("src.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
