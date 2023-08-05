import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';
import { ICoupon } from '../../@types/custom-types';

const getAllCoupon = async () => {
  try {
    const res = await axios.get(`${base_url}/coupon`, config);
    return res.data;
  } catch (error) {
    throw new Error('Get all blog failed.');
  }
};

const createCoupon = async (coupon: ICoupon) => {
  try {
    const res = await axios.post(`${base_url}/coupon`, coupon, config);
    return res.data;
  } catch (error) {
    throw new Error('Create blog failed.');
  }
};

const couponService = {
  getAllCoupon,
  createCoupon,
};

export default couponService;
