import { describe, it, expect } from "vitest";
import reducer, { setAssets, selectAsset, setLoading } from "./assetSlice";
import type { Asset } from "./assetSlice";

const mockAsset: Asset = {
  id: "1",
  name: "Robot",
  format: "GLB",
  size: "10 MB",
  tags: ["robot"],
  thumbnail: "",
  author: "Test",
  createdAt: "2026-01-01",
  description: "Test asset",
};

describe("assetSlice", () => {
  it("should return initial state", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state.items).toEqual([]);
    expect(state.selected).toBeNull();
    expect(state.loading).toBe(false);
  });

  it("setAssets should replace items", () => {
    const state = reducer(undefined, setAssets([mockAsset]));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe("Robot");
  });

  it("selectAsset should set selected", () => {
    const state = reducer(undefined, selectAsset(mockAsset));
    expect(state.selected).toEqual(mockAsset);
  });

  it("selectAsset with null should clear selected", () => {
    let state = reducer(undefined, selectAsset(mockAsset));
    state = reducer(state, selectAsset(null));
    expect(state.selected).toBeNull();
  });

  it("setLoading should update loading flag", () => {
    const state = reducer(undefined, setLoading(true));
    expect(state.loading).toBe(true);
  });
});
