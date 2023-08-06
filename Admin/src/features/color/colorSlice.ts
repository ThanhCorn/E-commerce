/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { IColor } from "../../@types/custom-types";
import colorService from "../color/colorService";

interface ColorState {
  colors: IColor[];
  color: IColor | undefined;
  updatedColor: IColor | undefined;
  deletedColor: IColor | undefined;
  colorName?: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ColorState = {
  colors: [],
  color: undefined,
  updatedColor: undefined,
  deletedColor: undefined,
  colorName: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllColor = createAsyncThunk(
  `color/get-colors`,
  async (_, thunkAPI) => {
    try {
      const res = await colorService.getAllColor();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getColor = createAsyncThunk(
  `color/get-color`,
  async (id: string, thunkAPI) => {
    try {
      const res = await colorService.getColor(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const createColor = createAsyncThunk(
  `color/create-color`,

  async (color: IColor, thunkAPI) => {
    try {
      const res = await colorService.createColor(color);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateColor = createAsyncThunk(
  `color/update-color`,

  async ({ id, title }: { id: string; title: string }, thunkAPI) => {
    try {
      const res = await colorService.updateColor(id, {
        title,
      });
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteColor = createAsyncThunk(
  `color/delete-color`,

  async (id: string, thunkAPI) => {
    try {
      const res = await colorService.deleteColor(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const resetState = createAction("Reset_All");

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllColor.fulfilled, (state, action) => {
      state.colors = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getAllColor.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getAllColor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(createColor.fulfilled, (state, action) => {
      state.color = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(createColor.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(createColor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });

    builder.addCase(getColor.fulfilled, (state, action) => {
      state.colorName = action.payload.title;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getColor.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(getColor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(updateColor.fulfilled, (state, action) => {
      state.updatedColor = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(updateColor.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(updateColor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(deleteColor.fulfilled, (state, action) => {
      state.deletedColor = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(deleteColor.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
