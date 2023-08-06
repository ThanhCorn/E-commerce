import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import { ICoupon } from "../../@types/custom-types";

const getAllCoupon = async () => {
  try {
    const res = await axios.get(`${base_url}/coupon`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get all blog failed.");
  }
};

const createCoupon = async (coupon: ICoupon) => {
  try {
    const res = await axios.post(`${base_url}/coupon`, coupon, config);
    return res.data;
  } catch (error) {
    throw new Error("Create blog failed.");
  }
};

const getCoupon = async (id: string) => {
  try {
    const res = await axios.get(`${base_url}/coupon/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get Coupon failed.");
  }
};

const updateCoupon = async (updateCounpon: ICoupon) => {
  try {
    const res = await axios.put(
      `${base_url}/coupon/${updateCounpon._id}`,
      updateCounpon,
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Update Coupon failed.");
  }
};

const deleteCoupon = async (id: string) => {
  try {
    const res = await axios.delete(`${base_url}/coupon/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error("Delete color failed.");
  }
};

const couponService = {
  getAllCoupon,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
