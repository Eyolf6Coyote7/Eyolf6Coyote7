import { create } from 'zustand';
import { api } from '../api';
import type { Board } from '../api';

interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
  loading: boolean;
  fetchBoards: () => Promise<void>;
  createBoard: (title: string, templateId?: string) => Promise<Board>;
  setCurrentBoard: (board: Board | null) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  boards: [],
  currentBoard: null,
  loading: false,
  fetchBoards: async () => {
    set({ loading: true });
    const boards = await api.getBoards();
    set({ boards, loading: false });
  },
  createBoard: async (title, templateId) => {
    const board = await api.createBoard(title, templateId);
    set((state) => ({ boards: [board, ...state.boards] }));
    return board;
  },
  setCurrentBoard: (board) => set({ currentBoard: board }),
}));
