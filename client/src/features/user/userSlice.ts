/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { ICart, IOrder, IProduct, IUser } from "../../@types/declare";
import userService from "./userService";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";

interface UserState {
  createUser: IUser | null;
  userCart?: ICart[];
  userState?: IUser;
  userLogin: IUser | null;
  deleteItemFromCart?: ICart;
  updateItemFromCart?: ICart;
  userWishlist?: IProduct[];
  userOrder?: IOrder[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initialState: UserState = {
  userLogin: getUserFromLocalStorage(),
  userWishlist: undefined,
  userState: undefined,
  userCart: [],
  deleteItemFromCart: undefined,
  userOrder: undefined,
  updateItemFromCart: undefined,
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

export const getInfoUser = createAsyncThunk("auth/get-info-user", async () => {
  try {
    const res = await userService.getInfoUser();
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const updateInfoUser = createAsyncThunk(
  "auth/edit-user",
  async (data: IUser, thunkAPI) => {
    try {
      const res = await userService.updateInfoUser(data);
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

export const addToCart = createAsyncThunk(
  "auth/add-to-cart",
  async (data: ICart, thunkAPI) => {
    try {
      const res = await userService.addToCart(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getCart = createAsyncThunk(
  "auth/get-cart",
  async (_, thunkAPI) => {
    try {
      const res = await userService.getCart();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const removeItemCart = createAsyncThunk(
  "auth/remove-item-cart",
  async (cartItemId: string, thunkAPI) => {
    try {
      const res = await userService.removeItemFromCart(cartItemId);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const updateQuantityItem = createAsyncThunk(
  "auth/update-quantity-item",
  async (data: { cartItemId: string; newQuantity: number }, thunkAPI) => {
    try {
      const res = await userService.updateQuantityItem(
        data.cartItemId,
        data.newQuantity
      );
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "auth/get-user-orders",
  async (_, thunkAPI) => {
    try {
      const res = await userService.getUserOrders();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const emptyCart = createAsyncThunk(
  "auth/empty-cart",
  async (_, thunkAPI) => {
    try {
      const res = await userService.emptyCart();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const resetState = createAction("ResetAll");

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
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.userCart = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      toast.success("Product added to cart");
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.userCart = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(removeItemCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeItemCart.fulfilled, (state, action) => {
      state.deleteItemFromCart = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      toast.success("Product removed from cart");
    });
    builder.addCase(removeItemCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(updateQuantityItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateQuantityItem.fulfilled, (state, action) => {
      state.updateItemFromCart = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      toast.success("Product updated from cart");
    });
    builder.addCase(updateQuantityItem.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getUserOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.userOrder = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(getUserOrders.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(emptyCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(emptyCart.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(emptyCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getInfoUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInfoUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userState = action.payload;
    });
    builder.addCase(getInfoUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(updateInfoUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateInfoUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      toast.success("User updated");
    });
    builder.addCase(updateInfoUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
