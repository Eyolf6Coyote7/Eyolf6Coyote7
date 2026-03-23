# ADR-0002: Why Ollama over Cloud LLM APIs for AI Inference

## Status
Accepted

## Context
The whiteboard has an AI assistant that generates content, suggests ideas, and executes actions. Options:
- **Cloud LLM APIs** (OpenAI, Anthropic) — highest quality, but requires internet, costs money per call, data leaves the machine
- **Ollama** (local LLM runtime) — runs on user's machine, free, private, but lower quality than GPT-4

## Decision
Use **Ollama** for all AI inference, running quantized open-source models locally.

## Reason
- Privacy-first: no user data leaves the machine — key differentiator for enterprise users
- Cost: zero API costs, even at scale
- Offline capable: AI works without internet after model download
- Apple Silicon (M1+) makes local inference practical — 7B models run at 30+ tokens/sec
- LangGraph + RAG + MCP compensate for lower model quality by providing better context

## Consequences
- AI quality depends on user's hardware — slower on older machines
- Need to support model selection (7B for speed, 13B for quality)
- Need graceful degradation when Ollama is not running
- Fine-tuning (LoRA) required to improve domain-specific quality
