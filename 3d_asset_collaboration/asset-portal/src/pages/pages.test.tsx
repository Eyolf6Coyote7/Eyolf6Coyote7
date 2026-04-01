import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import assetReducer from "../store/assetSlice";
import LoginPage from "./LoginPage";
import AssetListPage from "./AssetListPage";
import UploadPage from "./UploadPage";
import VersionComparePage from "./VersionComparePage";
import BrandSettingsPage from "./BrandSettingsPage";
import AccountPage from "./AccountPage";
import IoTDashboardPage from "./IoTDashboardPage";

const createTestStore = () =>
  configureStore({
    reducer: { assets: assetReducer },
    preloadedState: {
      assets: {
        items: [
          {
            id: "1",
            name: "Robot",
            format: "GLB" as const,
            size: "10 MB",
            tags: ["robot"],
            thumbnail: "",
            author: "Test",
            createdAt: "2026-01-01",
            description: "Test",
          },
        ],
        selected: null,
        loading: false,
      },
    },
  });

const withProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={createTestStore()}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );

describe("Desktop Page render tests", () => {
  it("LoginPage renders", () => {
    const { container } = withProviders(<LoginPage />);
    expect(container).toBeTruthy();
  });

  it("AssetListPage renders", () => {
    const { container } = withProviders(<AssetListPage />);
    expect(container).toBeTruthy();
  });

  it("UploadPage renders", () => {
    const { container } = withProviders(<UploadPage />);
    expect(container).toBeTruthy();
  });

  it("VersionComparePage renders", () => {
    const { container } = withProviders(<VersionComparePage />);
    expect(container).toBeTruthy();
  });

  it("BrandSettingsPage renders", () => {
    const { container } = withProviders(<BrandSettingsPage />);
    expect(container).toBeTruthy();
  });

  it("AccountPage renders", () => {
    const { container } = withProviders(<AccountPage />);
    expect(container).toBeTruthy();
  });

  it("IoTDashboardPage renders", () => {
    const { container } = withProviders(<IoTDashboardPage />);
    expect(container).toBeTruthy();
  });
});
