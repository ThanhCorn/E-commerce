/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBrand } from '../../@types/custom-types';
import brandService from './brandService';

interface BrandState {
  brands: IBrand[];
  createBrand: IBrand | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: BrandState = {
  brands: [],
  createBrand: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllBrand = createAsyncThunk(
  `brand/get-brands`,
  async (_, thunkAPI) => {
    try {
      const res = await brandService.getAllBrand();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

export const createBrands = createAsyncThunk(
  'product/create-brand',
  async (brand: IBrand, thunkAPI) => {
    try {
      const res = await brandService.createBrand(brand);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);
const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBrand.fulfilled, (state, action) => {
      state.brands = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getAllBrand.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getAllBrand.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(createBrands.fulfilled, (state, action) => {
      state.createBrand = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(createBrands.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(createBrands.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
  },
});

export default brandSlice.reducer;
