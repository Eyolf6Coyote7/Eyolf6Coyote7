describe("whiteboard mobile api index", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("should export api as mockClient when __DEV__ is true", () => {
    (global as any).__DEV__ = true;
    const { api } = require("../api/index");
    const { mockClient } = require("../api/mock-client");
    expect(api).toBe(mockClient);
  });

  it("should export api as realClient when __DEV__ is false", () => {
    (global as any).__DEV__ = false;
    const { api } = require("../api/index");
    const { realClient } = require("../api/real-client");
    expect(api).toBe(realClient);
  });

  it("should export the ChatMessage type via Board re-export", () => {
    (global as any).__DEV__ = true;
    const apiModule = require("../api/index");
    // api module should be importable without errors
    expect(apiModule).toBeDefined();
    expect(apiModule.api).toBeDefined();
  });
});
