import { toast } from "react-toastify";
import { IContact } from "../../@types/declare";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import contactService from "./contactService";

interface BlogState {
  createContact?: IContact;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: BlogState = {
  createContact: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const createContact = createAsyncThunk(
  "contact/create-contact",
  async (data: IContact, thunkAPI) => {
    try {
      const res = await contactService.createContact(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const resetState = createAction("Reset_All");

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createContact.fulfilled, (state, action) => {
      state.createContact = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      toast.success("Create contact successfully");
    }),
      builder.addCase(createContact.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(createContact.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });

    builder.addCase(resetState, () => initialState);
  },
});

export default contactSlice.reducer;
