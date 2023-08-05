/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { ICoupon } from '../../@types/custom-types';
import couponService from './couponService';

interface CouponState {
  coupons: ICoupon[];
  coupon: ICoupon | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: CouponState = {
  coupons: [],
  coupon: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllCoupon = createAsyncThunk(
  `coupon/get-coupons`,
  async (_, thunkAPI) => {
    try {
      const res = await couponService.getAllCoupon();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

export const createCoupon = createAsyncThunk(
  'coupon/create-coupon',
  async (coupon: ICoupon, thunkAPI) => {
    try {
      const res = await couponService.createCoupon(coupon);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

export const resetState = createAction('Reset_All');

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCoupon.fulfilled, (state, action) => {
      state.coupons = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getAllCoupon.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getAllCoupon.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(createCoupon.fulfilled, (state, action) => {
      state.coupon = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(createCoupon.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
