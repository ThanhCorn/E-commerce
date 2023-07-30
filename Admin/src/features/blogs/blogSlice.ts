/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IBlog } from "../../@types/custom-types";
import blogService from "./blogService";

interface BlogState {
  blogs: IBlog[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: BlogState = {
  blogs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllBlog = createAsyncThunk(
  `blog/get-blogs`,
  async (_, thunkAPI) => {
    try {
      const res = await blogService.getAllBlog();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBlog.fulfilled, (state, action) => {
      state.blogs = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getAllBlog.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getAllBlog.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
  },
});

export default blogSlice.reducer;
