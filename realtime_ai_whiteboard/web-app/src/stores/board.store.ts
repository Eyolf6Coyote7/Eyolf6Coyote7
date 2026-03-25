import { create } from 'zustand';
import { api } from '../api';
import type { Board } from '../api';

interface BoardState {
  boards: Board[];
  loading: boolean;
  fetchBoards: () => Promise<void>;
  createBoard: (title: string, templateId?: string) => Promise<Board>;
}

export const useBoardStore = create<BoardState>((set) => ({
  boards: [], loading: false,
  fetchBoards: async () => {
    set({ loading: true });
    const boards = await api.getBoards();
    set({ boards, loading: false });
  },
  createBoard: async (title, templateId) => {
    const board = await api.createBoard(title, templateId);
    set((s) => ({ boards: [board, ...s.boards] }));
    return board;
  },
}));
