/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IColor } from "../../@types/custom-types";
import colorService from "../color/colorService";

interface ColorState {
  colors: IColor[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ColorState = {
  colors: [],
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
  },
});

export default colorSlice.reducer;
