import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../api', () => ({
  api: {
    submitAiPrompt: vi.fn(),
  },
}));

// Force mock mode
vi.stubEnv('VITE_MOCK', 'true');

import { useAiStore } from './ai.store';

describe('ai.store', () => {
  beforeEach(() => {
    useAiStore.setState({ messages: [], isStreaming: false, isOpen: false });
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it('should have correct initial state', () => {
    const state = useAiStore.getState();
    expect(state.messages).toEqual([]);
    expect(state.isStreaming).toBe(false);
    expect(state.isOpen).toBe(false);
  });

  it('togglePanel should flip isOpen', () => {
    expect(useAiStore.getState().isOpen).toBe(false);
    useAiStore.getState().togglePanel();
    expect(useAiStore.getState().isOpen).toBe(true);
    useAiStore.getState().togglePanel();
    expect(useAiStore.getState().isOpen).toBe(false);
  });

  it('sendPrompt should add user message and set isStreaming', async () => {
    const promise = useAiStore.getState().sendPrompt('board-1', 'Summarize');

    // User message should be added immediately
    expect(useAiStore.getState().messages).toHaveLength(1);
    expect(useAiStore.getState().messages[0].role).toBe('user');
    expect(useAiStore.getState().messages[0].content).toBe('Summarize');
    expect(useAiStore.getState().isStreaming).toBe(true);

    // Advance past the mock delay
    await vi.advanceTimersByTimeAsync(1500);
    await promise;

    expect(useAiStore.getState().messages).toHaveLength(2);
    expect(useAiStore.getState().messages[1].role).toBe('assistant');
    expect(useAiStore.getState().isStreaming).toBe(false);
  });

  it('sendPrompt should use default response for unknown prompts', async () => {
    const promise = useAiStore.getState().sendPrompt('board-1', 'random question');
    await vi.advanceTimersByTimeAsync(1500);
    await promise;

    const lastMsg = useAiStore.getState().messages[1];
    expect(lastMsg.content).toContain('analyzed your board');
  });
});
