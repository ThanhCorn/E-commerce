/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { IBlog } from "../../@types/custom-types";
import blogService from "./blogService";

interface BlogState {
  blogs: IBlog[];
  blog: IBlog | undefined;
  updatedBlog: IBlog | undefined;
  deletedBlog: IBlog | undefined;
  blogById: IBlog | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: BlogState = {
  blogs: [],
  blog: undefined,
  updatedBlog: undefined,
  deletedBlog: undefined,
  blogById: undefined,
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

export const getBlog = createAsyncThunk(
  `blog/get-blog`,

  async (id: string, thunkAPI) => {
    try {
      const coupon = await blogService.getBlog(id);
      return coupon;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/create-blog",
  async (blog: IBlog, thunkAPI) => {
    try {
      const res = await blogService.createBlog(blog);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updatedBlog = createAsyncThunk(
  "blog/update-blog",

  async (updateBlog: IBlog, thunkAPI) => {
    try {
      const res = await blogService.updateBlog(updateBlog);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete-blog",

  async (id: string, thunkAPI) => {
    try {
      const res = await blogService.deleteBlog(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const resetState = createAction("Reset_All");

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
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.blog = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(createBlog.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(getBlog.fulfilled, (state, action) => {
      state.blogById = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getBlog.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(getBlog.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(updatedBlog.fulfilled, (state, action) => {
      state.updatedBlog = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(updatedBlog.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(updatedBlog.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.deletedBlog = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(deleteBlog.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }),
      builder.addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
