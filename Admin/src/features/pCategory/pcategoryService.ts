/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { IProductCategory } from '../../@types/custom-types';
import { config } from '../../utils/axiosConfig';

const getAllProductCategory = async () => {
  try {
    const res = await axios.get(`${base_url}/category`);
    return res.data;
  } catch (error: any) {
    throw new Error('Get all product category failed.');
  }
};

const createPCategory = async (category: IProductCategory) => {
  try {
    const res = await axios.post(`${base_url}/category`, category, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const pcategoryService = {
  getAllProductCategory,
  createPCategory,
};

export default pcategoryService;
