import type { ApiClient, Board } from './client.interface';

const mockBoards: Board[] = [
  {
    id: '1',
    title: 'Sprint Planning',
    templateId: 'kanban',
    createdAt: '2026-04-01T10:00:00Z',
    updatedAt: '2026-04-01T14:30:00Z',
  },
  {
    id: '2',
    title: 'Product Brainstorm',
    createdAt: '2026-03-28T09:00:00Z',
    updatedAt: '2026-04-01T11:20:00Z',
  },
  {
    id: '3',
    title: 'Retro Q1 2026',
    templateId: 'retro',
    createdAt: '2026-03-15T15:00:00Z',
    updatedAt: '2026-03-20T16:45:00Z',
  },
  {
    id: '4',
    title: 'Architecture Diagram',
    createdAt: '2026-03-10T08:00:00Z',
    updatedAt: '2026-03-25T10:00:00Z',
  },
  {
    id: '5',
    title: 'User Flow — Checkout',
    createdAt: '2026-03-05T13:00:00Z',
    updatedAt: '2026-03-22T09:30:00Z',
  },
  {
    id: '6',
    title: 'Design System Tokens',
    createdAt: '2026-02-28T11:00:00Z',
    updatedAt: '2026-03-18T14:00:00Z',
  },
];

const mockUser = { id: '1', role: 'owner' };

export const mockClient: ApiClient = {
  register: async () => ({ accessToken: 'mock-token', user: mockUser }),
  login: async () => ({ accessToken: 'mock-token', user: mockUser }),
  getBoards: async () => mockBoards,
  createBoard: async (title, templateId) => ({
    id: crypto.randomUUID(),
    title,
    templateId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  getBoard: async (id) => mockBoards.find((b) => b.id === id) ?? mockBoards[0],
  deleteBoard: async () => {},
  submitAiPrompt: async () => ({ taskId: `mock-${crypto.randomUUID()}` }),
};
