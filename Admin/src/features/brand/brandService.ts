import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { IBrand } from '../../@types/custom-types';
import { config } from '../../utils/axiosConfig';

const getAllBrand = async () => {
  try {
    const res = await axios.get(`${base_url}/brand`);
    return res.data;
  } catch (error) {
    throw new Error('Get all brand failed.');
  }
};

const createBrand = async (brand: IBrand) => {
  try {
    const res = await axios.post(`${base_url}/brand`, brand, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getBrand = async (id: string) => {
  try {
    const res = await axios.get(`${base_url}/brand/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error('Get all brand failed.');
  }
};

const updateBrand = async (id: string, brand: IBrand) => {
  try {
    const res = await axios.put(`${base_url}/brand/${id}`, brand, config);
    return res.data;
  } catch (error) {
    throw new Error('Update brand failed.');
  }
};

const deleteBrand = async (id: string) => {
  try {
    const res = await axios.delete(`${base_url}/brand/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error('Delete brand failed.');
  }
};

const brandService = {
  getAllBrand,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
