import { create } from 'zustand';
import { api } from '../api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const isMock = import.meta.env.VITE_MOCK === 'true';

const MOCK_RESPONSES: Record<string, string> = {
  Summarize:
    '📋 **Board Summary**\n\n1. **Sprint Planning** — 3 tasks in progress, 2 blocked\n2. **Design Review** — Wireframes approved, moving to high-fi\n3. **Tech Debt** — Redis caching layer needs refactor\n\n_Generated from 6 sticky notes and 3 connected shapes._',
  'Generate diagram':
    '✅ **Flowchart generated — 5 nodes added to canvas**\n\nStart → User Input → Validate → Process → Complete\n\n_Click on the canvas to see the new diagram._',
  'Organize layout':
    '🧹 **Layout organized**\n\n- Grouped 4 sticky notes by topic\n- Aligned shapes to grid\n- Connected related items with arrows\n\n_6 elements repositioned._',
  'Create flowchart':
    '✅ **Checkout flowchart created — 8 nodes**\n\nCart → Shipping → Payment → Review → Confirm → Processing → Complete\n↳ Error → Retry\n\n_Placed in the center of the canvas._',
};

const DEFAULT_RESPONSE =
  "🤖 I analyzed your board and here's what I found:\n\n- 6 elements on canvas (3 sticky notes, 2 shapes, 1 connector)\n- Main theme: Product brainstorming\n- Suggestion: Try grouping related ideas with color coding\n\n_This is a demo — connect Ollama for real AI responses._";

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

    if (isMock) {
      // Simulate AI thinking delay
      await new Promise((r) => setTimeout(r, 1200));
      const response = MOCK_RESPONSES[prompt] ?? DEFAULT_RESPONSE;
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      set((s) => ({ messages: [...s.messages, aiMsg], isStreaming: false }));
      return;
    }

    // Real mode — SSE
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
          set({ isStreaming: false });
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
