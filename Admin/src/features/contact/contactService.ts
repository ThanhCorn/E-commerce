/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getAllContact = async () => {
  try {
    const res = await axios.get(`${base_url}/contact`);
    return res.data;
  } catch (error: any) {
    throw new Error("Get all contact failed.");
  }
};

const contactService = {
  getAllContact,
};

export default contactService;
