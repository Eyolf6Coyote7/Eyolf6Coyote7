import { mockAssets, mockNotifications } from "../api/mock-client";
import * as realClient from "../api/real-client";

// __DEV__ is true in the test environment (jest-expo sets it), so the module
// under test will use mock data by default.  We test both branches by
// re-requiring the module after toggling the global.

describe("api/index – dev/prod switch", () => {
  const originalDev = (globalThis as any).__DEV__;

  afterEach(() => {
    (globalThis as any).__DEV__ = originalDev;
    jest.resetModules();
  });

  // --- DEV mode (mock data) ---

  it("getAssets returns mock data when __DEV__ is true", async () => {
    (globalThis as any).__DEV__ = true;
    const { getAssets } = require("../api/index");

    const assets = await getAssets();
    expect(assets).toBe(mockAssets);
  });

  it("getNotifications returns mock data when __DEV__ is true", async () => {
    (globalThis as any).__DEV__ = true;
    const { getNotifications } = require("../api/index");

    const notifications = await getNotifications();
    expect(notifications).toBe(mockNotifications);
  });

  // --- PROD mode (real client) ---

  it("getAssets calls real client when __DEV__ is false", async () => {
    (globalThis as any).__DEV__ = false;

    const fakeAssets = [
      { id: "x", name: "X", format: "glb", tags: [], thumbnailUrl: null },
    ];
    jest.spyOn(realClient, "fetchAssets").mockResolvedValue(fakeAssets);

    const { getAssets } = require("../api/index");
    const assets = await getAssets();

    expect(realClient.fetchAssets).toHaveBeenCalled();
    expect(assets).toEqual(fakeAssets);
  });

  it("getNotifications calls real client when __DEV__ is false", async () => {
    (globalThis as any).__DEV__ = false;

    const fakeNotifs = [
      { id: "n0", title: "T", body: "B", time: "now", read: false },
    ];
    jest.spyOn(realClient, "fetchNotifications").mockResolvedValue(fakeNotifs);

    const { getNotifications } = require("../api/index");
    const notifications = await getNotifications();

    expect(realClient.fetchNotifications).toHaveBeenCalled();
    expect(notifications).toEqual(fakeNotifs);
  });

  // --- Type re-exports ---

  it("re-exports Asset and Notification types (module has named exports)", () => {
    const apiModule = require("../api/index");
    // getAssets and getNotifications are the runtime exports
    expect(typeof apiModule.getAssets).toBe("function");
    expect(typeof apiModule.getNotifications).toBe("function");
  });
});
