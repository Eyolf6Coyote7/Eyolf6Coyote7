import { create } from "zustand";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (name: string, email: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: { name: "Jerry", email: "jerry@example.com" },
  token: "mock-token",
  login: (name, email, token) => set({ user: { name, email }, token }),
  logout: () => set({ user: null, token: null }),
}));
