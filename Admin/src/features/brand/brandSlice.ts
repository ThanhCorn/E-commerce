/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { IBrand } from "../../@types/custom-types";
import brandService from "./brandService";

interface BrandState {
  brands: IBrand[];
  brand: IBrand | undefined;
  updatedBrand: IBrand | undefined;
  deletedBrand: IBrand | undefined;
  brandName?: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: BrandState = {
  brands: [],
  brand: undefined,
  updatedBrand: undefined,
  deletedBrand: undefined,
  brandName: "",
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
  }
);

export const getBrand = createAsyncThunk(
  `brand/get-brand`,
  async (id: string, thunkAPI) => {
    try {
      const res = await brandService.getBrand(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const createBrands = createAsyncThunk(
  "brand/create-brand",
  async (brand: IBrand, thunkAPI) => {
    try {
      const res = await brandService.createBrand(brand);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/update-brand",
  async ({ id, title }: { id: string; title: string }, thunkAPI) => {
    try {
      const res = await brandService.updateBrand(id, {
        title,
      });
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/delete-brand",
  async (id: string, thunkAPI) => {
    try {
      const res = await brandService.deleteBrand(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const resetState = createAction("Reset_All");

const brandSlice = createSlice({
  name: "brands",
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
      state.brand = action.payload;
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
    builder.addCase(getBrand.fulfilled, (state, action) => {
      state.brandName = action.payload.title;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getBrand.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(getBrand.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.updatedBrand = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(updateBrand.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      state.deletedBrand = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(deleteBrand.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
