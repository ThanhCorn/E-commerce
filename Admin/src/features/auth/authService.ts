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

const getOrderById = async () => {
  try {
    const res = await axios.get(`${base_url}/user/get-order-by-id`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get order by user id failed.");
  }
};
const getOrderByIdParam = async (id: string) => {
  try {
    const res = await axios.get(`${base_url}/user/get-order-id/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get order by user id failed.");
  }
};

const getMonthlyOrder = async () => {
  try {
    const res = await axios.get(`${base_url}/user/get-month-income`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get monthly order failed.");
  }
};

const getYearlyOrderCount = async () => {
  try {
    const res = await axios.get(
      `${base_url}/user/get-yearly-total-order`,
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Get monthly order count failed.");
  }
};
const getYearlyOrderIncome = async () => {
  try {
    const res = await axios.get(
      `${base_url}/user/get-yearly-total-income`,
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Get monthly order failed.");
  }
};

const getMonthlyOrderCount = async () => {
  try {
    const res = await axios.get(
      `${base_url}/user/get-month-order-count`,
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Get monthly order count failed.");
  }
};

const getAllOrders = async () => {
  try {
    const res = await axios.get(`${base_url}/user/get-all-orders`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get all order failed.");
  }
};

const updateOrderStatus = async (status: string, id: string) => {
  try {
    const res = await axios.put(
      `${base_url}/user/update-order/${id}`,
      { status },
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Update order status failed.");
  }
};

const authService = {
  login,
  getAllOrder,
  getOrderById,
  getMonthlyOrder,
  getYearlyOrderCount,
  getYearlyOrderIncome,
  getMonthlyOrderCount,
  getAllOrders,
  getOrderByIdParam,
  updateOrderStatus,
};

export default authService;
