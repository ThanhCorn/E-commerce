import {
  IMonthIncome,
  IMonthOrderCount,
  IYearIncome,
  IYearOrderCount,
} from "./../../@types/custom-types.d";
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
  orderByIdParam: IOrder;
  orderStatus: string;
  monthIncome: IMonthIncome[];
  monthOrderCount: IMonthOrderCount[];
  yearIncome: IYearIncome[];
  yearOrderCount: IYearOrderCount[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | unknown;
}

const initialState: AuthState = {
  user: getUserFromLocalStorage(),
  orders: [],
  orderById: {} as IOrder,
  orderByIdParam: {} as IOrder,
  orderStatus: "",
  monthIncome: [],
  monthOrderCount: [],
  yearIncome: [],
  yearOrderCount: [],
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
  async (_, thunkAPI) => {
    try {
      const res = await authService.getOrderById();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getOrderParam = createAsyncThunk(
  `order/get-order-id`,
  async (id: string, thunkAPI) => {
    try {
      const res = await authService.getOrderByIdParam(id);
      return res[0];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getMonthlyOrder = createAsyncThunk(
  `order/getMonthlyOrder`,
  async (_, thunkAPI) => {
    try {
      const res = await authService.getMonthlyOrder();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getMonthlyOrderCount = createAsyncThunk(
  `order/getMonthlyOrderCount`,
  async (_, thunkAPI) => {
    try {
      const res = await authService.getMonthlyOrderCount();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const getYearlyOrder = createAsyncThunk(
  `order/getYearlyOrder`,
  async (_, thunkAPI) => {
    try {
      const res = await authService.getYearlyOrderIncome();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getYearlyOrderCount = createAsyncThunk(
  `order/getYearlyOrderCount`,
  async (_, thunkAPI) => {
    try {
      const res = await authService.getYearlyOrderCount();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  `order/get-all-orders`,
  async (_, thunkAPI) => {
    try {
      const res = await authService.getAllOrders();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  `order/update-order-status`,
  async ({ status, id }: { status: string; id: string }, thunkAPI) => {
    try {
      const res = await authService.updateOrderStatus(status, id);
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
    builder.addCase(getOrderParam.fulfilled, (state, action) => {
      state.orderByIdParam = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getOrderParam.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(getOrderParam.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.orderStatus = action.payload.status;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      toast.success("Order status updated");
    });
    builder.addCase(updateOrderStatus.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMonthlyOrder.fulfilled, (state, action) => {
      state.monthIncome = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getMonthlyOrder.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(getMonthlyOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMonthlyOrderCount.fulfilled, (state, action) => {
      state.monthOrderCount = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getMonthlyOrderCount.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(getMonthlyOrderCount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getYearlyOrder.fulfilled, (state, action) => {
      state.yearIncome = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getYearlyOrder.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(getYearlyOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getYearlyOrderCount.fulfilled, (state, action) => {
      state.yearOrderCount = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getYearlyOrderCount.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(getYearlyOrderCount.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
