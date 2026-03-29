import { api } from "../api/index";
import { mockClient } from "../api/mock-client";

describe("api/index", () => {
  it("exports api object", () => {
    expect(api).toBeDefined();
  });

  it("uses mockClient in dev mode", () => {
    expect(api).toBe(mockClient);
  });

  it("api has expected methods", () => {
    expect(typeof api.getBoards).toBe("function");
    expect(typeof api.login).toBe("function");
  });
});
