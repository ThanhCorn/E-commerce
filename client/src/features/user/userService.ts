import axios from "axios";
import { base_url } from "../../utils/base_url";
import { IUser } from "../../@types/declare";
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

const getUserProductWishlist = async () => {
  try {
    const res = await axios.get(`${base_url}/user/wishlist`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get wishlist failed");
  }
};

const userService = {
  registerUser,
  loginUser,
  getUserProductWishlist,
};

export default userService;
