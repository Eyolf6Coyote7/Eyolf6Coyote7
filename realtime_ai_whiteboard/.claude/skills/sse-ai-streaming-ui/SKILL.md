---
name: sse-ai-streaming-ui
description: Build an AI chat panel that consumes an SSE stream from the BFF with a mock response fallback path.
when_to_use:
  - the AI chat panel (components/ai/AiChatPanel.tsx) or its state (stores/ai.store.ts)
  - streaming AI responses from the BFF via Server-Sent Events
  - mock-vs-real AI responses or 'why is the AI panel stuck on thinking'
  - react-markdown rendering for assistant messages
  - mentions of EventSource, submitAiPrompt, taskId, streaming, typing indicator
tech_stack:
  - react
  - sse
  - eventsource
  - ai-stream
harness: fe-csr
project: realtime_ai_whiteboard
---

## When to use

Trigger when the user asks about:

- the AI chat panel (components/ai/AiChatPanel.tsx) or its state (stores/ai.store.ts)
- streaming AI responses from the BFF via Server-Sent Events
- mock-vs-real AI responses or 'why is the AI panel stuck on thinking'
- react-markdown rendering for assistant messages
- mentions of EventSource, submitAiPrompt, taskId, streaming, typing indicator

## Context

The AI chat panel is intentionally split into two mirrored paths:

- Mock path: set timeout, look up a canned response in MOCK_RESPONSES keyed by prompt, fall back to DEFAULT_RESPONSE. Used by the DEMO build (VITE_MOCK=true).
- Real path: POST /api/v1/ai/prompt to get a taskId, then open an EventSource on /api/v1/ai/stream/{taskId}. The BFF polls Redis for a result key and emits a single { type: 'done', response, ... } event then closes.

Both paths converge on set((s) => ({ messages: [...s.messages, aiMsg], isStreaming: false })). The UI renders assistant messages through react-markdown and shows a 3-dot typing indicator while isStreaming is true.

Canonical files: web-app/src/stores/ai.store.ts (lines 1-113), web-app/src/components/ai/AiChatPanel.tsx (lines 1-144), bff-api/src/ai-gateway/ai-gateway.controller.ts (Sse endpoint).

## Operating instructions

When adding a new streaming chat feature (example: 'regenerate last response'):

1. Add an action to ai.store.ts - keep the mock branch first, real branch second, mirroring sendPrompt.
2. Real branch: await api.submitAiPrompt(...) to obtain taskId, then new EventSource(${VITE_API_URL}/api/v1/ai/stream/${taskId}).
3. Parse event.data as JSON. Handle three event types: 'pending' (ignore), 'done' (append aiMsg, close ES, isStreaming false), 'error' (append error msg, close ES, isStreaming false).
4. Always set onerror to close the EventSource and set isStreaming false.
5. UI side: gate buttons / input on isStreaming. Show the 3-dot typing animation via CSS module class.
6. Scroll into view with messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) on messages change.
7. Render assistant content via <Markdown>{msg.content}</Markdown>; user content as plain text.

## Reusable prompts / code patterns

See ai.store.ts lines 66-108 for the canonical EventSource consume path. Key contract: POST /api/v1/ai/prompt returns taskId, then GET /api/v1/ai/stream/:taskId is an SSE endpoint that emits { type: 'done', response } or { type: 'error', message } exactly once and then closes. The client must also handle { type: 'pending' } heartbeats (ignore them) and onerror (close + clear streaming flag).

Mock branch (ai.store.ts lines 51-63): setTimeout 1200ms then look up MOCK_RESPONSES by prompt string, fall back to DEFAULT_RESPONSE. This keeps the VITE_MOCK demo identical in shape to the real path so the UI code stays a single branch.

Typing indicator: three pulsing dots gated by isStreaming in AiChatPanel.tsx lines 83-92.

## Anti-patterns

- Do NOT leave EventSource open after 'done' or 'error' - always call es.close() and clear isStreaming.
- Do NOT use fetch streaming for this flow - the BFF exposes NestJS @Sse which works with EventSource only.
- Do NOT JSON.parse without try/catch - the heartbeat message may be empty.
- Do NOT hard-code http://localhost:4001 - always read VITE_API_URL with a fallback.
- Do NOT bypass the mock branch when VITE_MOCK is true - Storybook and the static demo site rely on it.
- Do NOT render user message through react-markdown - only assistant messages are Markdown.
- Do NOT call sendPrompt while isStreaming is true - disable the input and chips instead.

## References

- realtime_ai_whiteboard/web-app/src/stores/ai.store.ts:1-113 - canonical store with mock + real branches.
- realtime_ai_whiteboard/web-app/src/stores/ai.store.ts:13-25 - MOCK_RESPONSES dictionary.
- realtime_ai_whiteboard/web-app/src/stores/ai.store.ts:66-108 - EventSource handling.
- realtime_ai_whiteboard/web-app/src/components/ai/AiChatPanel.tsx:1-144 - chat UI.
- realtime_ai_whiteboard/web-app/src/components/ai/AiChatPanel.tsx:78-94 - message list + typing indicator.
- realtime_ai_whiteboard/bff-api/src/ai-gateway/ai-gateway.controller.ts:40-58 - server SSE endpoint.
- realtime_ai_whiteboard/web-app/src/stores/ai.store.test.ts - store tests.
