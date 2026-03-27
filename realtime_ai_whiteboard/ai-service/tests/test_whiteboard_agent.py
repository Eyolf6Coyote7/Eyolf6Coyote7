"""Tests for whiteboard_agent module — pure function tests (no LLM calls)."""

from src.agents.whiteboard_agent import (
    classify_intent,
    plan_steps,
    retrieve_context,
    execute_tools,
    reflect,
    route_after_reflect,
    route_by_intent,
    AgentState,
)


def _make_state(**overrides) -> AgentState:
    base: AgentState = {
        "prompt": "",
        "board_id": "b1",
        "user_id": "u1",
        "intent": "",
        "context": "",
        "plan": [],
        "tool_results": [],
        "response": "",
        "should_retry": False,
    }
    return {**base, **overrides}


class TestClassifyIntent:
    def test_action_keywords_classify_as_action_execution(self):
        for keyword in ["create", "add", "generate", "delete", "organize"]:
            state = _make_state(prompt=f"Please {keyword} a diagram")
            result = classify_intent(state)
            assert result["intent"] == "action_execution", f"Failed for: {keyword}"

    def test_info_query_classifies_as_info_retrieval(self):
        state = _make_state(prompt="What is on the board?")
        result = classify_intent(state)
        assert result["intent"] == "info_retrieval"

    def test_case_insensitive(self):
        state = _make_state(prompt="CREATE a sticky note")
        result = classify_intent(state)
        assert result["intent"] == "action_execution"


class TestPlanSteps:
    def test_info_retrieval_plan(self):
        state = _make_state(intent="info_retrieval")
        result = plan_steps(state)
        assert result["plan"] == ["retrieve_context", "generate_response"]

    def test_action_execution_plan(self):
        state = _make_state(intent="action_execution")
        result = plan_steps(state)
        assert result["plan"] == [
            "retrieve_context",
            "execute_tools",
            "generate_response",
        ]


class TestRetrieveContext:
    def test_returns_context_with_board_id(self):
        state = _make_state(board_id="board-42")
        result = retrieve_context(state)
        assert "board-42" in result["context"]


class TestExecuteTools:
    def test_returns_tool_results(self):
        state = _make_state()
        result = execute_tools(state)
        assert len(result["tool_results"]) > 0
        assert result["tool_results"][0]["result"] == "ok"


class TestReflect:
    def test_should_not_retry(self):
        state = _make_state()
        result = reflect(state)
        assert result["should_retry"] is False


class TestRouting:
    def test_route_after_reflect_end(self):
        state = _make_state(should_retry=False)
        assert route_after_reflect(state) == "end"

    def test_route_after_reflect_retry(self):
        state = _make_state(should_retry=True)
        assert route_after_reflect(state) == "plan_steps"

    def test_route_by_intent_action(self):
        state = _make_state(intent="action_execution")
        assert route_by_intent(state) == "execute_tools"

    def test_route_by_intent_info(self):
        state = _make_state(intent="info_retrieval")
        assert route_by_intent(state) == "generate_response"
