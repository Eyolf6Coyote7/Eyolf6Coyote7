import { create } from 'zustand';
import { api } from '../api';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
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
      id: crypto.randomUUID(),
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
        try {
          const data = JSON.parse(event.data) as {
            type: string;
            response?: string;
            message?: string;
            tool_results?: unknown[];
          };

          if (data.type === 'done') {
            const aiMsg: Message = {
              id: crypto.randomUUID(),
              role: 'assistant',
              content: data.response || 'Done.',
              timestamp: new Date(),
            };
            set((s) => ({ messages: [...s.messages, aiMsg], isStreaming: false }));
            eventSource.close();
          } else if (data.type === 'error') {
            const errorMsg: Message = {
              id: crypto.randomUUID(),
              role: 'assistant',
              content: `Error: ${data.message || 'Unknown error'}`,
              timestamp: new Date(),
            };
            set((s) => ({ messages: [...s.messages, errorMsg], isStreaming: false }));
            eventSource.close();
          }
        } catch {
          const errorMsg: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Failed to process AI response.',
            timestamp: new Date(),
          };
          set((s) => ({ messages: [...s.messages, errorMsg], isStreaming: false }));
          eventSource.close();
        }
      };

      eventSource.onerror = () => {
        const errorMsg: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Connection to AI service lost.',
          timestamp: new Date(),
        };
        set((s) => ({ messages: [...s.messages, errorMsg], isStreaming: false }));
        eventSource.close();
      };
    } catch {
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Failed to send prompt.',
        timestamp: new Date(),
      };
      set((s) => ({ messages: [...s.messages, errorMsg], isStreaming: false }));
    }
  },
}));
