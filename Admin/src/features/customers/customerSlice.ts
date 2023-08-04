import { ICustomer } from '../../@types/custom-types.d';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerService from './customerService';

interface CustomerState {
  customers: ICustomer[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: CustomerState = {
  customers: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getUsers = createAsyncThunk(
  'customer/get-customers',
  async (_, thunkAPI) => {
    try {
      const res = await customerService.getUsers();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

export const customerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.customers = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
  },
});

export default customerSlice.reducer;
