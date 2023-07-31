import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import uploadService from './uploadService';
import { IImages } from '../../@types/custom-types';

interface IUploadState {
  images: string[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initialState: IUploadState = {
  images: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const uploadImages = createAsyncThunk(
  `upload/images`,
  async (images: File[], thunkAPI) => {
    try {
      const res = await uploadService.uploadImages(images); // Pass the array directly
      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImages.fulfilled, (state, action) => {
      state.images = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(uploadImages.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(uploadImages.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
  },
});

export default uploadSlice.reducer;
