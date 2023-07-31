/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IContact } from "../../@types/custom-types";
import contactService from "../contact/contactService";

interface ContactState {
  contacts: IContact[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ContactState = {
  contacts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllContact = createAsyncThunk(
  `contact/get-contacts`,
  async (_, thunkAPI) => {
    try {
      const res = await contactService.getAllContact();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllContact.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getAllContact.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getAllContact.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
  },
});

export default contactSlice.reducer;
