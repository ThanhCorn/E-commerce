import { IProduct } from "../../@types/custom-types.d";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

interface ProductSate {
  products: IProduct[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ProductSate = {
  products: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllProduct = createAsyncThunk(
  "product/get-products",
  async (_, thunkAPI) => {
    try {
      const res = await productService.getAllProduct();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const productSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getAllProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
  },
});

export default productSlice.reducer;
