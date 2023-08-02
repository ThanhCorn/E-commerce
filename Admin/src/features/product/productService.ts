import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';
import { IProduct } from '../../@types/custom-types';

const getAllProduct = async () => {
  try {
    const res = await axios.get(`${base_url}/product`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (product: IProduct) => {
  try {
    const res = await axios.post(`${base_url}/product`, product, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const productService = {
  getAllProduct,
  createProduct,
};

export default productService;
