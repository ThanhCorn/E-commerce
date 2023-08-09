import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getAllProduct = async () => {
  try {
    const res = await axios.get(`${base_url}/product`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const addToWishList = async (productId: string) => {
  try {
    const res = await axios.put(
      `${base_url}/product/wishlist`,
      { productId },
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Add to wishlist failed");
  }
};

const productService = {
  getAllProduct,
  addToWishList,
};

export default productService;
