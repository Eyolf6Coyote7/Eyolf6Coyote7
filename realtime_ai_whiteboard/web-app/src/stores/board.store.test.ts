import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../api', () => ({
  api: {
    getBoards: vi.fn(),
    createBoard: vi.fn(),
  },
}));

import { useBoardStore } from './board.store';
import { api } from '../api';

describe('board.store', () => {
  beforeEach(() => {
    useBoardStore.setState({ boards: [], loading: false });
    vi.clearAllMocks();
  });

  it('should have correct initial state', () => {
    const state = useBoardStore.getState();
    expect(state.boards).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it('fetchBoards should set loading and then populate boards', async () => {
    const mockBoards = [
      {
        id: '1',
        title: 'Board A',
        createdAt: '2026-01-01',
        updatedAt: '2026-01-02',
      },
      {
        id: '2',
        title: 'Board B',
        createdAt: '2026-01-01',
        updatedAt: '2026-01-02',
      },
    ];
    vi.mocked(api.getBoards).mockResolvedValue(mockBoards);

    await useBoardStore.getState().fetchBoards();

    const state = useBoardStore.getState();
    expect(state.boards).toEqual(mockBoards);
    expect(state.loading).toBe(false);
  });

  it('createBoard should prepend new board to boards list', async () => {
    const existingBoard = {
      id: '1',
      title: 'Old',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    };
    useBoardStore.setState({ boards: [existingBoard] });

    const newBoard = {
      id: '2',
      title: 'New Board',
      createdAt: '2026-02-01',
      updatedAt: '2026-02-01',
    };
    vi.mocked(api.createBoard).mockResolvedValue(newBoard);

    const result = await useBoardStore.getState().createBoard('New Board');

    expect(result).toEqual(newBoard);
    expect(useBoardStore.getState().boards[0]).toEqual(newBoard);
    expect(useBoardStore.getState().boards).toHaveLength(2);
  });

  it('createBoard should pass templateId when provided', async () => {
    const newBoard = {
      id: '3',
      title: 'Template Board',
      templateId: 'kanban',
      createdAt: '2026-02-01',
      updatedAt: '2026-02-01',
    };
    vi.mocked(api.createBoard).mockResolvedValue(newBoard);

    await useBoardStore.getState().createBoard('Template Board', 'kanban');

    expect(api.createBoard).toHaveBeenCalledWith('Template Board', 'kanban');
  });
});
