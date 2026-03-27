import { mockAssets, mockNotifications } from "../api/mock-client";

describe("3D Asset mobile mockClient", () => {
  it("mockAssets should have 6 items", () => {
    expect(mockAssets).toHaveLength(6);
  });

  it("each asset should have required fields", () => {
    mockAssets.forEach((a) => {
      expect(a.id).toBeDefined();
      expect(a.name).toBeDefined();
      expect(a.format).toBeDefined();
      expect(Array.isArray(a.tags)).toBe(true);
    });
  });

  it("mockNotifications should have 5 items", () => {
    expect(mockNotifications).toHaveLength(5);
  });

  it("notifications should have read status", () => {
    const unread = mockNotifications.filter((n) => !n.read);
    const read = mockNotifications.filter((n) => n.read);
    expect(unread.length).toBeGreaterThan(0);
    expect(read.length).toBeGreaterThan(0);
  });
});
