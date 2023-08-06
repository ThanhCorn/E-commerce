/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { IBlogCategory } from "../../@types/custom-types";
import { config } from "../../utils/axiosConfig";

const getAllBlogCategory = async () => {
  try {
    const res = await axios.get(`${base_url}/blog-category`);
    return res.data;
  } catch (error: any) {
    throw new Error("Get all product category failed.");
  }
};

const createBlogCategory = async (blogCategory: IBlogCategory) => {
  try {
    const res = await axios.post(
      `${base_url}/blog-category`,
      blogCategory,
      config
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getBlogCategory = async (id: string) => {
  try {
    const res = await axios.get(`${base_url}/blog-category/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get all brand failed.");
  }
};

const updateBlogCategory = async (id: string, blogCategory: IBlogCategory) => {
  try {
    const res = await axios.put(
      `${base_url}/blog-category/${id}`,
      blogCategory,
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Update brand failed.");
  }
};

const deleteBlogCategory = async (id: string) => {
  try {
    const res = await axios.delete(`${base_url}/blog-category/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error("Delete brand failed.");
  }
};

const bCategoryService = {
  getAllBlogCategory,
  createBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};

export default bCategoryService;
