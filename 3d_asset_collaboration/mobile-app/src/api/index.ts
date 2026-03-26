import { mockAssets, mockNotifications } from "./mock-client";
import type { Asset, Notification } from "./mock-client";

const USE_MOCK = true;

export type { Asset, Notification };

export function getAssets(): Asset[] {
  if (USE_MOCK) return mockAssets;
  // In real mode, use fetchAssets() from real-client.ts via async calls
  return [];
}

export function getNotifications(): Notification[] {
  if (USE_MOCK) return mockNotifications;
  return [];
}
