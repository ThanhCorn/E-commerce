/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { IColor } from "../../@types/custom-types";
import { config } from "../../utils/axiosConfig";

const getAllColor = async () => {
  try {
    const res = await axios.get(`${base_url}/color`);
    return res.data;
  } catch (error: any) {
    throw new Error("Get all color failed.");
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

const getColor = async (id: string) => {
  try {
    const res = await axios.get(`${base_url}/color/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error("Get color failed.");
  }
};

const updateColor = async (id: string, Color: IColor) => {
  try {
    const res = await axios.put(`${base_url}/color/${id}`, Color, config);
    return res.data;
  } catch (error) {
    throw new Error("Update color failed.");
  }
};

const deleteColor = async (id: string) => {
  try {
    const res = await axios.delete(`${base_url}/color/${id}`, config);
    return res.data;
  } catch (error) {
    throw new Error("Delete color failed.");
  }
};

const colorService = {
  getAllColor,
  createColor,
  getColor,
  updateColor,
  deleteColor,
};

export default colorService;
