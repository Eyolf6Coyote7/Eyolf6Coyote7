import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api",
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
