import { ChatMessage } from "./index";

const mockBoards = [
  { id: "1", title: "Sprint Planning Q1", updatedAt: "2026-03-25" },
  { id: "2", title: "Architecture Diagram", updatedAt: "2026-03-24" },
  { id: "3", title: "User Flow - Onboarding", updatedAt: "2026-03-22" },
  { id: "4", title: "Brainstorm: AI Features", updatedAt: "2026-03-20" },
  { id: "5", title: "Retrospective Notes", updatedAt: "2026-03-18" },
  { id: "6", title: "Wireframes v2", updatedAt: "2026-03-15" },
];

const mockChat: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi! I'm your AI whiteboard assistant. How can I help?",
  },
  { id: "2", role: "user", content: "Can you help me design a login flow?" },
  {
    id: "3",
    role: "assistant",
    content:
      "Sure! I'd suggest a simple email + password screen with a social login option. Want me to sketch it on the whiteboard?",
  },
];

export const mockClient = {
  getBoards: () => Promise.resolve(mockBoards),
  getChatHistory: () => Promise.resolve(mockChat),
  login: (_email: string, _password: string) =>
    Promise.resolve({
      token: "mock-token",
      user: { name: "Jerry", email: "jerry@example.com" },
    }),
};
