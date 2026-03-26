import { mockAssets, mockNotifications } from "./mock-client";
import { fetchAssets, fetchNotifications } from "./real-client";
import type { Asset, Notification } from "./mock-client";

const USE_MOCK = __DEV__;

export type { Asset, Notification };

export async function getAssets(): Promise<Asset[]> {
  if (USE_MOCK) return mockAssets;
  return fetchAssets();
}

export async function getNotifications(): Promise<Notification[]> {
  if (USE_MOCK) return mockNotifications;
  return fetchNotifications();
}
