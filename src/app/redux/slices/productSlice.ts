import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductState {
  products: ProductItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};


export const fetchProducts = createAsyncThunk<ProductItem[], void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response:any = await axios.get("https://dummyjson.com/products");
      return response.data.products;
    } catch (error) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductItem[]>) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch products";
      });
  },
});
export const { reset } = productSlice.actions;
export default productSlice.reducer;