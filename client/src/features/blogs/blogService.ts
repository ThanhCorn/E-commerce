import axios from "axios";
import { base_url } from "../../utils/base_url";

const getAllBlog = async () => {
  try {
    const res = await axios.get(`${base_url}/blog`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getBlog = async (id: string) => {
  try {
    const res = await axios.get(`${base_url}/blog/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const productService = {
  getAllBlog,
  getBlog,
};

export default productService;
