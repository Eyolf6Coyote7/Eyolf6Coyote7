export interface Board {
  id: string;
  title: string;
  templateId?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface AiPromptResponse {
  taskId: string;
}

export interface ApiClient {
  register(email: string, password: string, displayName: string): Promise<AuthResponse>;
  login(email: string, password: string): Promise<AuthResponse>;
  getBoards(page?: number): Promise<Board[]>;
  createBoard(title: string, templateId?: string): Promise<Board>;
  getBoard(id: string): Promise<Board>;
  deleteBoard(id: string): Promise<void>;
  submitAiPrompt(boardId: string, prompt: string): Promise<AiPromptResponse>;
}
