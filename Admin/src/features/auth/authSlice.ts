/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { IUser } from "../../@types/custom-types";
import { addUserToLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as string)
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "" as string | unknown,
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user: IUser, thunkAPI) => {
    try {
      const res = await authService.login(user);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "success";
      toast.success("Login successful");
      addUserToLocalStorage(action.payload);
    }),
      builder.addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.error; // The error message returned from the login async thunk
        toast.error("Invalid email or password");
      }),
      builder.addCase(login.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default authSlice.reducer;
