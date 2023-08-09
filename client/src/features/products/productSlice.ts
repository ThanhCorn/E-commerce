import { IProduct, IUser } from "../../@types/declare";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

interface ProductSate {
  products: IProduct[];
  addToWishlist?: IUser;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ProductSate = {
  products: [],
  addToWishlist: undefined,
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

export const addToWishlist = createAsyncThunk(
  "product/add-to-wishlist",
  async (id: string, thunkAPI) => {
    try {
      const res = await productService.addToWishList(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const resetState = createAction("Reset_All");

export const productSlice = createSlice({
  name: "products",
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
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.addToWishlist = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(addToWishlist.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });

    builder.addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
