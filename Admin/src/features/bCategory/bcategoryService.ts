/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { IBlogCategory } from '../../@types/custom-types';
import { config } from '../../utils/axiosConfig';

const getAllBlogCategory = async () => {
  try {
    const res = await axios.get(`${base_url}/blog-category`);
    return res.data;
  } catch (error: any) {
    throw new Error('Get all product category failed.');
  }
};

const createBlogCategory = async (blogCategory: IBlogCategory) => {
  try {
    const res = await axios.post(
      `${base_url}/blog-category`,
      blogCategory,
      config,
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const bCategoryService = {
  getAllBlogCategory,
  createBlogCategory,
};

export default bCategoryService;
