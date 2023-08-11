import { IBlog } from "../../@types/declare";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

interface BlogState {
  blogs: IBlog[];
  blogById?: IBlog;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: BlogState = {
  blogs: [],
  blogById: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllBlog = createAsyncThunk(
  "blog/get-blogs",
  async (_, thunkAPI) => {
    try {
      const res = await blogService.getAllBlog();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getBlogById = createAsyncThunk(
  "blog/get-blog-by-id",
  async (id: string, thunkAPI) => {
    try {
      const res = await blogService.getBlog(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const resetState = createAction("Reset_All");

export const blogSlice = createSlice({
  name: "blog",
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
    builder.addCase(getBlogById.fulfilled, (state, action) => {
      state.blogById = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getBlogById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getBlogById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });

    builder.addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
