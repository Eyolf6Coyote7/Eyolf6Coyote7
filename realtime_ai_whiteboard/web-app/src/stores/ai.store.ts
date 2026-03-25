import { create } from 'zustand';
import { api } from '../api';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  toolResult?: { tool: string; result: string };
  timestamp: Date;
}

interface AiState {
  messages: Message[];
  isStreaming: boolean;
  isOpen: boolean;
  sendPrompt: (boardId: string, prompt: string) => Promise<void>;
  togglePanel: () => void;
}

export const useAiStore = create<AiState>((set) => ({
  messages: [],
  isStreaming: false,
  isOpen: false,

  togglePanel: () => set((s) => ({ isOpen: !s.isOpen })),

  sendPrompt: async (boardId: string, prompt: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };
    set((s) => ({ messages: [...s.messages, userMsg], isStreaming: true }));

    try {
      const { taskId } = await api.submitAiPrompt(boardId, prompt);

      const eventSource = new EventSource(
        `${import.meta.env.VITE_API_URL || 'http://localhost:4001'}/api/web/ai/stream/${taskId}`,
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data) as {
          type: string;
          response?: string;
          tool_results?: unknown[];
        };

        if (data.type === 'done') {
          const aiMsg: Message = {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: data.response || 'Done.',
            timestamp: new Date(),
          };
          set((s) => ({ messages: [...s.messages, aiMsg], isStreaming: false }));
          eventSource.close();
        }
      };

      eventSource.onerror = () => {
        set({ isStreaming: false });
        eventSource.close();
      };
    } catch {
      set({ isStreaming: false });
    }
  },
}));
