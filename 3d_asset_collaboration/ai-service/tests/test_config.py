"""Tests for config module."""

from src.config import Settings


def test_default_settings():
    s = Settings()
    assert s.PORT == 4013
    assert s.MOCK_MODE is True
    assert s.MODEL_PATH == "models/tagger.onnx"
    assert "redis" in s.REDIS_URL


def test_custom_port():
    s = Settings(PORT=5000)
    assert s.PORT == 5000
