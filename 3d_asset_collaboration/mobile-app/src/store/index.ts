import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Asset, Notification } from "../api/mock-client";

interface AppState {
  assets: Asset[];
  notifications: Notification[];
}

const initialState: AppState = { assets: [], notifications: [] };

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAssets(state, action: PayloadAction<Asset[]>) {
      state.assets = action.payload;
    },
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },
    markRead(state, action: PayloadAction<string>) {
      const n = state.notifications.find((x) => x.id === action.payload);
      if (n) n.read = true;
    },
  },
});

export const { setAssets, setNotifications, markRead } = appSlice.actions;

export const store = configureStore({
  reducer: { app: appSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
