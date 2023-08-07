/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { IOrder, IUser } from "../../@types/custom-types";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";

interface AuthState {
  user: IUser | null;
  orders: IOrder[];
  orderById: IOrder;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | unknown;
}

const initialState: AuthState = {
  user: getUserFromLocalStorage(),
  orders: [],
  orderById: {} as IOrder,
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

export const getAllOrder = createAsyncThunk(
  `order/get-orders`,
  async (_, thunkAPI) => {
    try {
      const res = await authService.getAllOrder();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getOrderById = createAsyncThunk(
  `order/get-order-by-id`,
  async (id: string, thunkAPI) => {
    try {
      const res = await authService.getOrderById(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const resetState = createAction("ResetState");

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
    builder.addCase(getAllOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getAllOrder.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(getAllOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.orderById = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getOrderById.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(getOrderById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
