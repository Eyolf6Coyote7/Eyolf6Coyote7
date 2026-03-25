from typing import Literal, TypedDict

from langgraph.graph import END, StateGraph


class AgentState(TypedDict):
    prompt: str
    board_id: str
    user_id: str
    intent: Literal["info_retrieval", "action_execution", ""]
    context: str
    plan: list[str]
    tool_results: list[dict]
    response: str
    should_retry: bool


def classify_intent(state: AgentState) -> AgentState:
    """Classify user intent: info retrieval or action execution."""
    prompt_lower = state["prompt"].lower()
    action_keywords = [
        "create",
        "add",
        "generate",
        "make",
        "draw",
        "move",
        "delete",
        "organize",
    ]
    intent: Literal["info_retrieval", "action_execution"] = (
        "action_execution"
        if any(kw in prompt_lower for kw in action_keywords)
        else "info_retrieval"
    )
    return {**state, "intent": intent}


def plan_steps(state: AgentState) -> AgentState:
    """ReAct planner: break down into steps."""
    if state["intent"] == "info_retrieval":
        plan = ["retrieve_context", "generate_response"]
    else:
        plan = ["retrieve_context", "execute_tools", "generate_response"]
    return {**state, "plan": plan}


def retrieve_context(state: AgentState) -> AgentState:
    """RAG: retrieve relevant board context from ChromaDB."""
    context = f"Board {state['board_id']} context placeholder"
    return {**state, "context": context}


def execute_tools(state: AgentState) -> AgentState:
    """Execute MCP tools on the board."""
    tool_results = [{"tool": "placeholder", "result": "ok"}]
    return {**state, "tool_results": tool_results}


def generate_response(state: AgentState) -> AgentState:
    """Generate final response using Ollama LLM."""
    response = (
        f"AI response for: {state['prompt']} (with context: {state['context'][:50]})"
    )
    return {**state, "response": response}


def reflect(state: AgentState) -> AgentState:
    """Quality check: should we retry?"""
    return {**state, "should_retry": False}


def route_after_reflect(state: AgentState) -> Literal["plan_steps", "end"]:
    """Route based on reflection result."""
    return "plan_steps" if state["should_retry"] else "end"


def route_by_intent(state: AgentState) -> Literal["execute_tools", "generate_response"]:
    """Route based on intent."""
    return (
        "execute_tools"
        if state["intent"] == "action_execution"
        else "generate_response"
    )


def build_agent() -> StateGraph:
    """Build the LangGraph agent state machine."""
    graph = StateGraph(AgentState)

    graph.add_node("classify_intent", classify_intent)
    graph.add_node("plan_steps", plan_steps)
    graph.add_node("retrieve_context", retrieve_context)
    graph.add_node("execute_tools", execute_tools)
    graph.add_node("generate_response", generate_response)
    graph.add_node("reflect", reflect)

    graph.set_entry_point("classify_intent")
    graph.add_edge("classify_intent", "plan_steps")
    graph.add_edge("plan_steps", "retrieve_context")
    graph.add_conditional_edges("retrieve_context", route_by_intent)
    graph.add_edge("execute_tools", "generate_response")
    graph.add_edge("generate_response", "reflect")
    graph.add_conditional_edges(
        "reflect", route_after_reflect, {"plan_steps": "plan_steps", "end": END}
    )

    return graph.compile()


agent = build_agent()
