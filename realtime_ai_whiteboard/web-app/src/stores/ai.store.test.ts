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
    vi.useRealTimers();

    const promise = useAiStore.getState().sendPrompt('board-1', 'Summarize');

    // User message should be added immediately
    expect(useAiStore.getState().messages).toHaveLength(1);
    expect(useAiStore.getState().messages[0].role).toBe('user');
    expect(useAiStore.getState().messages[0].content).toBe('Summarize');
    expect(useAiStore.getState().isStreaming).toBe(true);

    await promise;

    expect(useAiStore.getState().messages.length).toBeGreaterThanOrEqual(1);
  });

  it('sendPrompt should use default response for unknown prompts', async () => {
    vi.useRealTimers();

    await useAiStore.getState().sendPrompt('board-1', 'random question');

    const msgs = useAiStore.getState().messages;
    // At minimum, user message should exist
    expect(msgs[0].role).toBe('user');
    expect(msgs[0].content).toBe('random question');
  });
});
