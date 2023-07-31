/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getAllProductCategory = async () => {
  try {
    const res = await axios.get(`${base_url}/category`);
    return res.data;
  } catch (error: any) {
    throw new Error("Get all product category failed.");
  }
};

const pcategoryService = {
  getAllProductCategory,
};

export default pcategoryService;
