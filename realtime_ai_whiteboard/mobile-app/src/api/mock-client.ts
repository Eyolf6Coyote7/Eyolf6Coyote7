import { ChatMessage } from "./index";

export interface Board {
  id: string;
  title: string;
  updatedAt: string;
  thumbnailColor: string;
  collaborators: { initials: string; color: string }[];
}

const mockBoards: Board[] = [
  {
    id: "1",
    title: "Sprint Planning",
    updatedAt: "Edited 2h ago",
    thumbnailColor: "rgba(37, 99, 235, 0.1)",
    collaborators: [
      { initials: "JW", color: "#2563EB" },
      { initials: "SC", color: "#22C55E" },
    ],
  },
  {
    id: "2",
    title: "Q4 Roadmap",
    updatedAt: "Edited 5h ago",
    thumbnailColor: "rgba(188, 72, 0, 0.1)",
    collaborators: [
      { initials: "AR", color: "#A855F7" },
      { initials: "+2", color: "#E1E2E4" },
    ],
  },
  {
    id: "3",
    title: "Brand Identity Ideation",
    updatedAt: "Edited yesterday",
    thumbnailColor: "rgba(172, 191, 255, 0.1)",
    collaborators: [
      { initials: "JW", color: "#2563EB" },
      { initials: "KL", color: "#EF4444" },
    ],
  },
  {
    id: "4",
    title: "Retro Meeting",
    updatedAt: "Edited 2 days ago",
    thumbnailColor: "#E1E2E4",
    collaborators: [{ initials: "GC", color: "#475569" }],
  },
  {
    id: "5",
    title: "User Journey Map",
    updatedAt: "Edited 1 week ago",
    thumbnailColor: "rgba(37, 99, 235, 0.1)",
    collaborators: [
      { initials: "JD", color: "#004AC6" },
      { initials: "MK", color: "#BC4800" },
    ],
  },
];

const mockChat: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "I can see 3 sticky notes about onboarding ideas, 1 flowchart with 4 nodes, and some freehand annotations.",
  },
  {
    id: "2",
    role: "user",
    content: "What elements are on my board?",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "I've organized them by priority. Anything else you'd like me to do?",
  },
];

export const mockClient = {
  getBoards: () => Promise.resolve(mockBoards),
  getChatHistory: () => Promise.resolve(mockChat),
  login: (_email: string, _password: string) =>
    Promise.resolve({
      token: "mock-token",
      user: { name: "Jerry Wolf", email: "jerry@example.com" },
    }),
};
