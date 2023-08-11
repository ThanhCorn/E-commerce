import axios from "axios";
import { base_url } from "../../utils/base_url";
import { IContact } from "../../@types/declare";

const createContact = async (data: IContact) => {
  try {
    const res = await axios.post(`${base_url}/contact`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const contactService = {
  createContact,
};

export default contactService;
