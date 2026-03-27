import { store, setAssets, setNotifications, markRead } from "../store";
import type { Asset, Notification } from "../api/mock-client";

describe("3D Asset mobile store", () => {
  it("should have correct initial state", () => {
    const state = store.getState().app;
    expect(state.assets).toEqual([]);
    expect(state.notifications).toEqual([]);
  });

  it("setAssets should replace assets array", () => {
    const assets: Asset[] = [
      { id: "1", name: "Test", format: "glb", tags: [], thumbnailUrl: null },
    ];
    store.dispatch(setAssets(assets));
    expect(store.getState().app.assets).toHaveLength(1);
    expect(store.getState().app.assets[0].name).toBe("Test");
  });

  it("setNotifications should replace notifications array", () => {
    const notifs: Notification[] = [
      {
        id: "n1",
        title: "Test",
        body: "Body",
        time: "now",
        read: false,
      },
    ];
    store.dispatch(setNotifications(notifs));
    expect(store.getState().app.notifications).toHaveLength(1);
  });

  it("markRead should set notification as read", () => {
    const notifs: Notification[] = [
      {
        id: "n1",
        title: "Unread",
        body: "Body",
        time: "now",
        read: false,
      },
    ];
    store.dispatch(setNotifications(notifs));
    store.dispatch(markRead("n1"));
    expect(store.getState().app.notifications[0].read).toBe(true);
  });

  it("markRead should not throw for unknown id", () => {
    store.dispatch(markRead("nonexistent"));
    // should not throw
  });
});
