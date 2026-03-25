import type { ApiClient, Board } from './client.interface';

const mockBoards: Board[] = [
  {
    id: '1',
    title: 'Sprint Planning',
    templateId: 'kanban',
    createdAt: '2026-04-01',
    updatedAt: '2026-04-01',
  },
  { id: '2', title: 'Product Brainstorm', createdAt: '2026-03-28', updatedAt: '2026-04-01' },
  {
    id: '3',
    title: 'Retro Q1',
    templateId: 'retro',
    createdAt: '2026-03-15',
    updatedAt: '2026-03-20',
  },
];

const mockUser = { id: '1', role: 'owner' };

export const mockClient: ApiClient = {
  register: async () => ({ accessToken: 'mock-token', user: mockUser }),
  login: async () => ({ accessToken: 'mock-token', user: mockUser }),
  getBoards: async () => mockBoards,
  createBoard: async (title, templateId) => ({
    id: String(Date.now()),
    title,
    templateId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  getBoard: async (id) => mockBoards.find((b) => b.id === id) ?? mockBoards[0],
  deleteBoard: async () => {},
  submitAiPrompt: async () => ({ taskId: `mock-${Date.now()}` }),
};
