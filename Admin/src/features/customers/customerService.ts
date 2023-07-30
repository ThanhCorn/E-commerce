import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUsers = async () => {
  try {
    const res = await axios.get(`${base_url}/user/all-users`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const customerService = {
  getUsers,
};

export default customerService;
