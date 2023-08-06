/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { IProductCategory } from "../../@types/custom-types";
import pCategoryService from "./pcategoryService";

interface ProductCategoryState {
  pCategories: IProductCategory[];
  pCategory: IProductCategory | undefined;
  updatedPCategory: IProductCategory | undefined;
  deletedPCategory: IProductCategory | undefined;
  pCategoryName?: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ProductCategoryState = {
  pCategories: [],
  pCategory: undefined,
  updatedPCategory: undefined,
  deletedPCategory: undefined,
  pCategoryName: "",
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
  }
);

export const getProductCategory = createAsyncThunk(
  `productCategory/get-pcategory`,
  async (id: string, thunkAPI) => {
    try {
      const res = await pCategoryService.getPCategory(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const createPCategories = createAsyncThunk(
  "productCategory/create-category",
  async (category: IProductCategory, thunkAPI) => {
    try {
      const res = await pCategoryService.createPCategory(category);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateProductCategory = createAsyncThunk(
  "productCategory/update-pcategory",
  async ({ id, title }: { id: string; title: string }, thunkAPI) => {
    try {
      const res = await pCategoryService.updatePCategory(id, {
        title,
      });
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteProductCategory = createAsyncThunk(
  "productCategory/delete-pcategory",
  async (id: string, thunkAPI) => {
    try {
      const res = await pCategoryService.deletePCategory(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const resetState = createAction("Reset_All");

const pCategorySlice = createSlice({
  name: "pCategories",
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
      state.pCategory = action.payload;
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
    builder.addCase(getProductCategory.fulfilled, (state, action) => {
      state.pCategoryName = action.payload.title;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getProductCategory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(getProductCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(updateProductCategory.fulfilled, (state, action) => {
      state.updatedPCategory = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(updateProductCategory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(updateProductCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(deleteProductCategory.fulfilled, (state, action) => {
      state.deletedPCategory = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(deleteProductCategory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(deleteProductCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(resetState, () => initialState);
  },
});

export default pCategorySlice.reducer;
