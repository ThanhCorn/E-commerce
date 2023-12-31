import { IProduct } from "../../@types/custom-types";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

interface ProductSate {
  products: IProduct[];
  productById?: IProduct;
  updatedProduct?: IProduct;
  isLoading: boolean;
  createdProduct?: IProduct;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ProductSate = {
  products: [],
  createdProduct: undefined,
  updatedProduct: undefined,
  productById: undefined,
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

export const getProduct = createAsyncThunk(
  "product/get-product",
  async (id: string, thunkAPI) => {
    try {
      const res = await productService.getProduct(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const createProducts = createAsyncThunk(
  "product/create-product",
  async (product: IProduct, thunkAPI) => {
    try {
      const res = await productService.createProduct(product);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update-product",
  async (updateProduct: IProduct, thunkAPI) => {
    try {
      const res = await productService.updateProduct(updateProduct);
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
    builder.addCase(getProduct.fulfilled, (state, action) => {
      console.log(action.payload);
      state.productById = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.updatedProduct = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(createProducts.fulfilled, (state, action) => {
      state.createdProduct = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(createProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(createProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
