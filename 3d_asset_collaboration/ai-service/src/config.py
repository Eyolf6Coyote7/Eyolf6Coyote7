from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PORT: int = 4013
    REDIS_URL: str = "redis://localhost:6382"
    ASSET_API_URL: str = "http://localhost:4003"
    MOCK_MODE: bool = True
    MODEL_PATH: str = "models/tagger.onnx"

    class Config:
        env_file = ".env"


settings = Settings()
