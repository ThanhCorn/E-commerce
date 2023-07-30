import axios from "axios";
import { base_url } from "../../utils/base_url";
import { IUser } from "../../@types/custom-types";

const login = async (user: IUser) => {
  try {
    const res = await axios.post(`${base_url}/user/admin-login`, user);
    return res.data;
  } catch (error) {
    throw new Error("Login failed. Invalid email or password.");
  }
};

const authService = {
  login,
};

export default authService;
