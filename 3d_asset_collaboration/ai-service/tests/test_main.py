"""Tests for FastAPI endpoints."""

from fastapi.testclient import TestClient

from src.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "ai-service"
    assert "port" in data
    assert "mock_mode" in data


def test_tag_mock_endpoint():
    response = client.post("/api/v1/tag/mock")
    assert response.status_code == 200
    data = response.json()
    assert data["mock"] is True
    assert len(data["tags"]) == 5
    assert data["tags"][0]["tag"] == "character"


def test_tag_endpoint_with_image():
    # Create a simple 1x1 PNG
    import io

    from PIL import Image

    img = Image.new("RGB", (10, 10), color="blue")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

    response = client.post(
        "/api/v1/tag",
        files={"file": ("test.png", buf, "image/png")},
    )
    assert response.status_code == 200
    data = response.json()
    assert "tags" in data
    assert data["filename"] == "test.png"
