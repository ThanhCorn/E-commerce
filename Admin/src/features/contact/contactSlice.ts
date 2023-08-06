/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { IContact } from "../../@types/custom-types";
import contactService from "../contact/contactService";

interface ContactState {
  contacts: IContact[];
  updatedContact: IContact | undefined;
  deletedContact: IContact | undefined;
  contactById: IContact | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ContactState = {
  contacts: [],
  updatedContact: undefined,
  deletedContact: undefined,
  contactById: undefined,
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

export const getContactById = createAsyncThunk(
  `contact/get-contact`,
  async (id: string, thunkAPI) => {
    try {
      const res = await contactService.getContactById(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateContact = createAsyncThunk(
  `contact/update-contact`,
  async ({ id, data }: { id: string; data: IContact }, thunkAPI) => {
    try {
      const res = await contactService.updateContact(id, data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteContact = createAsyncThunk(
  `contact/delete-contact`,
  async (id: string, thunkAPI) => {
    try {
      const res = await contactService.deleteContact(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const resetState = createAction("Reset_All");

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
    builder.addCase(getContactById.fulfilled, (state, action) => {
      state.contactById = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(getContactById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(getContactById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.updatedContact = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(updateContact.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(updateContact.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.deletedContact = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
      builder.addCase(deleteContact.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
      builder.addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      });

    builder.addCase(resetState, () => initialState);
  },
});

export default contactSlice.reducer;
