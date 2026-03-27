import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import assetReducer from "../../store/assetSlice";
import UnityLoginPage from "./UnityLoginPage";
import UnityBrowserPage from "./UnityBrowserPage";
import UnityInspectorPage from "./UnityInspectorPage";
import UnityViewportPage from "./UnityViewportPage";
import UnityIoTOverlayPage from "./UnityIoTOverlayPage";

const createTestStore = () =>
  configureStore({
    reducer: { assets: assetReducer },
    preloadedState: {
      assets: { items: [], selected: null, loading: false },
    },
  });

const withProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={createTestStore()}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );

describe("Unity Page render tests", () => {
  it("UnityLoginPage renders", () => {
    const { container } = withProviders(<UnityLoginPage />);
    expect(container).toBeTruthy();
  });

  it("UnityBrowserPage renders", () => {
    const { container } = withProviders(<UnityBrowserPage />);
    expect(container).toBeTruthy();
  });

  it("UnityInspectorPage renders", () => {
    const { container } = withProviders(<UnityInspectorPage />);
    expect(container).toBeTruthy();
  });

  it("UnityViewportPage renders", () => {
    const { container } = withProviders(<UnityViewportPage />);
    expect(container).toBeTruthy();
  });

  it("UnityIoTOverlayPage renders", () => {
    const { container } = withProviders(<UnityIoTOverlayPage />);
    expect(container).toBeTruthy();
  });
});
