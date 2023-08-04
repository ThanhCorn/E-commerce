/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { IColor } from '../../@types/custom-types';
import { config } from '../../utils/axiosConfig';

const getAllColor = async () => {
  try {
    const res = await axios.get(`${base_url}/color`);
    return res.data;
  } catch (error: any) {
    throw new Error('Get all color failed.');
  }
};

const createColor = async (color: IColor) => {
  try {
    const res = await axios.post(`${base_url}/color`, color, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const colorService = {
  getAllColor,
  createColor,
};

export default colorService;
