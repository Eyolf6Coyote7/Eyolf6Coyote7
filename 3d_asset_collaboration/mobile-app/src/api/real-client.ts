import axios from "axios";
import type { Asset, Notification } from "./mock-client";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:4003/api";

const api = axios.create({
  baseURL: API_BASE_URL,
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
