import axios from "axios";
import { base_url } from "../../utils/base_url";

const getAllBrand = async () => {
  try {
    const res = await axios.get(`${base_url}/brand`);
    return res.data;
  } catch (error) {
    throw new Error("Get all brand failed.");
  }
};

const brandService = {
  getAllBrand,
};

export default brandService;
