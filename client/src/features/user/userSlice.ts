/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, IUser } from "../../@types/declare";
import userService from "./userService";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";

interface UserState {
  createUser: IUser | null;
  userLogin: IUser | null;
  userWishlist?: IProduct[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initialState: UserState = {
  userLogin: getUserFromLocalStorage(),
  userWishlist: undefined,
  createUser: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (createUser: IUser, thunkAPI) => {
    try {
      const res = await userService.registerUser(createUser);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await userService.loginUser({ email, password });
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUserProductWishlist = createAsyncThunk(
  "auth/get-user-product-wishlist",
  async (_, thunkAPI) => {
    try {
      const res = await userService.getUserProductWishlist();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.createUser = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userLogin = action.payload;
      addUserToLocalStorage(action.payload);
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getUserProductWishlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserProductWishlist.fulfilled, (state, action) => {
      state.userWishlist = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(getUserProductWishlist.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
