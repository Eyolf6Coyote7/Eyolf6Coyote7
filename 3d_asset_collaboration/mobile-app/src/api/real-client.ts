import axios from "axios";
import type { Asset, Notification } from "./mock-client";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 10000,
});

export async function fetchAssets(): Promise<Asset[]> {
  const { data } = await api.get<Asset[]>("/assets");
  return data;
}

export async function fetchNotifications(): Promise<Notification[]> {
  const { data } = await api.get<Notification[]>("/notifications");
  return data;
}

export default api;
