import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import { IDataSort } from "../../@types/declare";

const getAllProduct = async (data: IDataSort) => {
  try {
    const res = await axios.get(
      `${base_url}/product?${
        data?.brand !== "" ? `brand=${data?.brand}&` : ""
      }${data?.tag !== "" ? `tags=${data?.tag}&` : ""}${
        data?.category !== "" ? `category=${data?.category}&` : ""
      }${data?.sort !== "" ? `sort=${data?.sort}&` : ""}${
        data?.minPrice !== 0 ? `price[gte]=${data?.minPrice}&` : ""
      }${data?.maxPrice !== 0 ? `price[lte]=${data?.maxPrice}&` : ""}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (id: string) => {
  try {
    const res = await axios.get(`${base_url}/product/${id}`);
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

const rateProduct = async (
  productId: string,
  star: number,
  comment: string
) => {
  try {
    const res = await axios.put(
      `${base_url}/product/rating`,
      { productId, star, comment },
      config
    );
    return res.data;
  } catch (error) {
    throw new Error("Rate product failed");
  }
};

const productService = {
  getAllProduct,
  addToWishList,
  getSingleProduct,
  rateProduct,
};

export default productService;
