import axios from "axios";
import { base_url } from "../../utils/base_url";
import { IUser } from "../../@types/custom-types";
import { config } from "../../utils/axiosConfig";

const login = async (user: IUser) => {
  try {
    const res = await axios.post(`${base_url}/user/admin-login`, user);
    return res.data;
  } catch (error) {
    throw new Error("Login failed. Invalid email or password.");
  }
};

const getAllOrder = async () => {
  try {
    const res = await axios.get(`${base_url}/user/get-all-orders`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get all order failed.");
  }
};

const getOrderById = async (id: string) => {
  try {
    const res = await axios.post(
      `${base_url}/user/get-order-by-id/${id}`,
      "",
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Get order by user id failed.");
  }
};

const authService = {
  login,
  getAllOrder,
  getOrderById,
};

export default authService;
