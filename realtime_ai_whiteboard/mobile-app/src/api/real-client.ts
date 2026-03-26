import axios from "axios";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:4001/api";

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const realClient = {
  getBoards: async () => {
    const { data } = await http.get("/boards");
    return data;
  },
  getChatHistory: async () => {
    const { data } = await http.get("/chat/history");
    return data;
  },
  login: async (email: string, password: string) => {
    const { data } = await http.post("/auth/login", { email, password });
    return data;
  },
};
