import axios from "axios";
import type { Asset } from "../store/assetSlice";
import type { SensorData } from "./mock-client";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ?? "/api",
});

export async function fetchAssets(): Promise<Asset[]> {
  const { data } = await http.get<Asset[]>("/assets");
  return data;
}

export async function fetchAssetById(id: string): Promise<Asset | undefined> {
  const { data } = await http.get<Asset>(`/assets/${id}`);
  return data;
}

export async function fetchSensors(): Promise<SensorData[]> {
  const { data } = await http.get<SensorData[]>("/sensors");
  return data;
}
