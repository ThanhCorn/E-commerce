import axios from "axios";
import { base_url } from "../../utils/base_url";
import { ICart, IUser } from "../../@types/declare";
import { config } from "../../utils/axiosConfig";

const registerUser = async (user: IUser) => {
  try {
    const res = await axios.post(`${base_url}/user/register`, user);
    return res.data;
  } catch (error) {
    throw new Error("Register failed");
  }
};

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${base_url}/user/login`, { email, password });
    return res.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

const getInfoUser = async () => {
  try {
    const res = await axios.get(`${base_url}/user/info-user`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get info user failed");
  }
};

const updateInfoUser = async (data: IUser) => {
  try {
    const res = await axios.put(`${base_url}/user/edit-user`, data, config);
    return res.data;
  } catch (error) {
    throw new Error("Update info user failed");
  }
};

const getUserProductWishlist = async () => {
  try {
    const res = await axios.get(`${base_url}/user/wishlist`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get wishlist failed");
  }
};

const addToCart = async (data: ICart) => {
  try {
    const res = await axios.post(`${base_url}/user/cart`, data, config);
    return res.data;
  } catch (error) {
    throw new Error("Add to cart failed");
  }
};

const getCart = async () => {
  try {
    const res = await axios.get(`${base_url}/user/cart`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get cart failed");
  }
};

const removeItemFromCart = async (cartItemId: string) => {
  try {
    const res = await axios.delete(
      `${base_url}/user/delete-item-cart/${cartItemId}`,
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Remove from cart failed");
  }
};

const updateQuantityItem = async (cartItemId: string, newQuantity: number) => {
  try {
    const res = await axios.delete(
      `${base_url}/user/update-item-cart/${cartItemId}/${newQuantity}`,
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Update quantity item failed");
  }
};

const getUserOrders = async () => {
  try {
    const res = await axios.get(`${base_url}/user/get-order-by-id`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get user orders failed");
  }
};

const emptyCart = async () => {
  try {
    const res = await axios.delete(`${base_url}/user/empty-cart`, config);
    return res.data;
  } catch (error) {
    throw new Error("Empty cart failed");
  }
};

const forgotPassword = async (email: string) => {
  try {
    const res = await axios.post(`${base_url}/user/forgot-password-token`, {
      email,
    });
    return res.data;
  } catch (error) {
    throw new Error("Forgot password failed");
  }
};

const resetPassword = async (password: string, token: string) => {
  try {
    const res = await axios.put(`${base_url}/user/reset-password/${token}`, {
      password,
    });
    return res.data;
  } catch (error) {
    throw new Error("Reset password failed");
  }
};

const userService = {
  registerUser,
  loginUser,
  getUserProductWishlist,
  addToCart,
  getCart,
  removeItemFromCart,
  updateQuantityItem,
  getUserOrders,
  emptyCart,
  getInfoUser,
  updateInfoUser,
  forgotPassword,
  resetPassword,
};

export default userService;
