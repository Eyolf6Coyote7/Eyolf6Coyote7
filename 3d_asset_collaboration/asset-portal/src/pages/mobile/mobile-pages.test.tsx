import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import assetReducer from "../../store/assetSlice";
import MobileAssetListPage from "./MobileAssetListPage";
import MobileAssetDetailPage from "./MobileAssetDetailPage";
import MobileNotificationsPage from "./MobileNotificationsPage";
import MobileProfilePage from "./MobileProfilePage";

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

describe("Mobile Page render tests", () => {
  it("MobileAssetListPage renders", () => {
    const { container } = withProviders(<MobileAssetListPage />);
    expect(container).toBeTruthy();
  });

  it("MobileAssetDetailPage renders", () => {
    const { container } = withProviders(<MobileAssetDetailPage />);
    expect(container).toBeTruthy();
  });

  it("MobileNotificationsPage renders", () => {
    const { container } = withProviders(<MobileNotificationsPage />);
    expect(container).toBeTruthy();
  });

  it("MobileProfilePage renders", () => {
    const { container } = withProviders(<MobileProfilePage />);
    expect(container).toBeTruthy();
  });
});
