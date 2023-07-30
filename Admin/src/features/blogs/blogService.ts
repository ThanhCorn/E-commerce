import axios from "axios";
import { base_url } from "../../utils/base_url";

const getAllBlog = async () => {
  try {
    const res = await axios.get(`${base_url}/blog`);
    return res.data;
  } catch (error) {
    throw new Error("Get all blog failed.");
  }
};

const blogService = {
  getAllBlog,
};

export default blogService;
