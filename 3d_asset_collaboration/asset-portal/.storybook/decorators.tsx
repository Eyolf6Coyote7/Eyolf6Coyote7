import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import assetReducer from "../src/store/assetSlice";
import type { Asset } from "../src/store/assetSlice";
import "../src/index.css";

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Industrial Robot Arm",
    format: "GLB",
    size: "12.4 MB",
    tags: ["robotics", "industrial", "automation"],
    thumbnail: "",
    author: "Jerry W.",
    createdAt: "2026-03-10",
    description: "High-poly industrial robot arm model with PBR materials.",
  },
  {
    id: "2",
    name: "Warehouse Shelf Unit",
    format: "FBX",
    size: "3.8 MB",
    tags: ["warehouse", "furniture", "logistics"],
    thumbnail: "",
    author: "Alice K.",
    createdAt: "2026-03-12",
    description: "Modular warehouse shelf unit, configurable rows and columns.",
  },
  {
    id: "3",
    name: "IoT Sensor Module",
    format: "OBJ",
    size: "1.2 MB",
    tags: ["IoT", "sensor", "electronics"],
    thumbnail: "",
    author: "Bob L.",
    createdAt: "2026-03-15",
    description: "Compact IoT sensor housing with mounting brackets.",
  },
  {
    id: "4",
    name: "Conveyor Belt Section",
    format: "GLB",
    size: "8.7 MB",
    tags: ["conveyor", "factory", "mechanical"],
    thumbnail: "",
    author: "Carol M.",
    createdAt: "2026-03-18",
    description: "Animated conveyor belt section with configurable speed.",
  },
  {
    id: "5",
    name: "Safety Helmet",
    format: "FBX",
    size: "2.1 MB",
    tags: ["safety", "PPE", "wearable"],
    thumbnail: "",
    author: "Dave N.",
    createdAt: "2026-03-20",
    description: "Safety helmet with adjustable straps and visor attachment.",
  },
  {
    id: "6",
    name: "Control Panel",
    format: "OBJ",
    size: "5.3 MB",
    tags: ["controls", "electronics", "HMI"],
    thumbnail: "",
    author: "Eve O.",
    createdAt: "2026-03-22",
    description: "Industrial control panel with buttons, switches, and LCD screen.",
  },
];

function createMockStore(selected: Asset | null = null) {
  return configureStore({
    reducer: { assets: assetReducer },
    preloadedState: {
      assets: { items: mockAssets, selected, loading: false },
    },
  });
}

export function withProviders(initialRoute = "/", routePath = "/") {
  return function Decorator(Story: React.ComponentType) {
    return (
      <Provider store={createMockStore(mockAssets[0])}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path={routePath} element={<Story />} />
            <Route path="*" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };
}

export { mockAssets, createMockStore };
