/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IProductCategory } from '../../@types/custom-types';
import pCategoryService from './pcategoryService';

interface ProductCategoryState {
  pCategories: IProductCategory[];
  createPCategory: IProductCategory | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ProductCategoryState = {
  pCategories: [],
  createPCategory: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllProductCategory = createAsyncThunk(
  `productCategory/get-categories`,
  async (_, thunkAPI) => {
    try {
      const res = await pCategoryService.getAllProductCategory();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

export const createPCategories = createAsyncThunk(
  'productCategory/create-category',
  async (category: IProductCategory, thunkAPI) => {
    try {
      const res = await pCategoryService.createPCategory(category);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);
const pCategorySlice = createSlice({
  name: 'pCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductCategory.fulfilled, (state, action) => {
      state.pCategories = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getAllProductCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getAllProductCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(createPCategories.fulfilled, (state, action) => {
      state.createPCategory = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(createPCategories.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(createPCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
  },
});

export default pCategorySlice.reducer;
