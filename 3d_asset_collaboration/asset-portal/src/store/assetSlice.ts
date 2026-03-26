import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Asset {
  id: string;
  name: string;
  format: "GLB" | "FBX" | "OBJ";
  size: string;
  tags: string[];
  thumbnail: string;
  author: string;
  createdAt: string;
  description: string;
}

interface AssetState {
  items: Asset[];
  selected: Asset | null;
  loading: boolean;
}

const initialState: AssetState = {
  items: [],
  selected: null,
  loading: false,
};

const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setAssets(state, action: PayloadAction<Asset[]>) {
      state.items = action.payload;
    },
    selectAsset(state, action: PayloadAction<Asset | null>) {
      state.selected = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setAssets, selectAsset, setLoading } = assetSlice.actions;
export default assetSlice.reducer;
