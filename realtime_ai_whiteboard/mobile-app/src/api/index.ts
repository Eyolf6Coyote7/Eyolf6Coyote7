import { mockClient } from "./mock-client";
import { realClient } from "./real-client";

export type { Board } from "./mock-client";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const api = __DEV__ ? mockClient : realClient;
