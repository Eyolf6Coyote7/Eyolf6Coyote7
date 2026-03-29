import { getAssets, getNotifications } from "../api/index";
import { mockAssets, mockNotifications } from "../api/mock-client";

describe("api/index", () => {
  it("exports getAssets function", () => {
    expect(typeof getAssets).toBe("function");
  });

  it("exports getNotifications function", () => {
    expect(typeof getNotifications).toBe("function");
  });

  it("getAssets returns mock data in dev mode", async () => {
    const assets = await getAssets();
    expect(assets).toEqual(mockAssets);
  });

  it("getNotifications returns mock data in dev mode", async () => {
    const notifications = await getNotifications();
    expect(notifications).toEqual(mockNotifications);
  });
});
