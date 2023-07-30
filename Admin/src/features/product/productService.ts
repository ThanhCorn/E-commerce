import axios from "axios";
import { base_url } from "../../utils/base_url";

const getAllProduct = async () => {
  try {
    const res = await axios.get(`${base_url}/product`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const productService = {
  getAllProduct,
};

export default productService;
