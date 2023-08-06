import axios from "axios";
import { base_url } from "../../utils/base_url";
import { IBlog } from "../../@types/custom-types";
import { config } from "../../utils/axiosConfig";

const getAllBlog = async () => {
  try {
    const res = await axios.get(`${base_url}/blog`);
    return res.data;
  } catch (error) {
    throw new Error("Get all blog failed.");
  }
};

const createBlog = async (blog: IBlog) => {
  try {
    const res = await axios.post(`${base_url}/blog`, blog, config);
    return res.data;
  } catch (error) {
    throw new Error("Create blog failed.");
  }
};

const getBlog = async (id: string) => {
  try {
    const res = await axios.get(`${base_url}/blog/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get Blog failed.");
  }
};

const updateBlog = async (updateBlog: IBlog) => {
  try {
    const res = await axios.put(
      `${base_url}/blog/${updateBlog._id}`,
      updateBlog,
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Update Blog failed.");
  }
};

const deleteBlog = async (id: string) => {
  try {
    const res = await axios.delete(`${base_url}/blog/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error("Delete Blog failed.");
  }
};

const blogService = {
  getAllBlog,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
