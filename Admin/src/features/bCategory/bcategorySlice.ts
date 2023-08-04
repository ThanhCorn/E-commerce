/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { IBlogCategory } from '../../@types/custom-types';
import bCategoryService from './bcategoryService';

interface BLogCategoryState {
  bCategories: IBlogCategory[];
  bCategory: IBlogCategory | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: BLogCategoryState = {
  bCategories: [],
  bCategory: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllBlogCategory = createAsyncThunk(
  `blogCategory/get-blogs-category`,
  async (_, thunkAPI) => {
    try {
      const res = await bCategoryService.getAllBlogCategory();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

export const createBlogCategories = createAsyncThunk(
  'blogCategory/create-category',
  async (category: IBlogCategory, thunkAPI) => {
    try {
      const res = await bCategoryService.createBlogCategory(category);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

export const resetState = createAction('Reset_All');
const pCategorySlice = createSlice({
  name: 'bCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBlogCategory.fulfilled, (state, action) => {
      state.bCategories = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getAllBlogCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getAllBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(createBlogCategories.fulfilled, (state, action) => {
      state.bCategory = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(createBlogCategories.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(createBlogCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(resetState, () => initialState);
  },
});

export default pCategorySlice.reducer;
