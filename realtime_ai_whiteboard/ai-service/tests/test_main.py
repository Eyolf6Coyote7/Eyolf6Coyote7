"""Tests for FastAPI endpoints."""

from unittest.mock import patch

from fastapi.testclient import TestClient

from src.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "ai-service"
    assert "model" in data


@patch("src.main.agent")
def test_prompt_endpoint(mock_agent):
    mock_agent.invoke.return_value = {
        "response": "AI response",
        "intent": "info_retrieval",
        "tool_results": [],
    }

    response = client.post(
        "/api/prompt",
        json={"prompt": "Summarize the board", "board_id": "b1", "user_id": "u1"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["response"] == "AI response"
    assert data["intent"] == "info_retrieval"
    assert "task_id" in data


@patch("src.main.agent")
def test_prompt_default_values(mock_agent):
    mock_agent.invoke.return_value = {
        "response": "ok",
        "intent": "info_retrieval",
        "tool_results": [],
    }

    response = client.post("/api/prompt", json={"prompt": "test"})
    assert response.status_code == 200

    call_args = mock_agent.invoke.call_args[0][0]
    assert call_args["board_id"] == "default"
    assert call_args["user_id"] == "anonymous"
