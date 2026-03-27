import { describe, it, expect } from "vitest";
import { fetchAssets, fetchAssetById, fetchSensors, mockAssets, mockSensors } from "./mock-client";

describe("asset-portal mockClient", () => {
  it("fetchAssets should return 6 assets", async () => {
    const assets = await fetchAssets();
    expect(assets).toHaveLength(6);
    expect(assets[0].name).toBe("Industrial Robot Arm");
  });

  it("fetchAssetById should return asset for valid id", async () => {
    const asset = await fetchAssetById("3");
    expect(asset).toBeDefined();
    expect(asset!.name).toBe("IoT Sensor Module");
  });

  it("fetchAssetById should return undefined for invalid id", async () => {
    const asset = await fetchAssetById("unknown");
    expect(asset).toBeUndefined();
  });

  it("fetchSensors should return 4 sensors", async () => {
    const sensors = await fetchSensors();
    expect(sensors).toHaveLength(4);
    expect(sensors[0].type).toBe("temperature");
  });

  it("mockAssets should have correct format types", () => {
    const formats = mockAssets.map((a) => a.format);
    formats.forEach((f) => {
      expect(["GLB", "FBX", "OBJ"]).toContain(f);
    });
  });

  it("mockSensors should have valid status values", () => {
    mockSensors.forEach((s) => {
      expect(["normal", "warning", "critical"]).toContain(s.status);
    });
  });

  it("sensors should have history arrays", () => {
    mockSensors.forEach((s) => {
      expect(s.history.length).toBeGreaterThan(0);
    });
  });
});
