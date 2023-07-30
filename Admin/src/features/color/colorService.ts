/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getAllColor = async () => {
  try {
    const res = await axios.get(`${base_url}/color`);
    return res.data;
  } catch (error: any) {
    throw new Error("Get all color failed.");
  }
};

const colorService = {
  getAllColor,
};

export default colorService;
