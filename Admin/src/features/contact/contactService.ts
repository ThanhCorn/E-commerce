/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import { IContact } from "../../@types/custom-types";

const getAllContact = async () => {
  try {
    const res = await axios.get(`${base_url}/contact`);
    return res.data;
  } catch (error: any) {
    throw new Error("Get all contact failed.");
  }
};

const getContactById = async (id: string) => {
  try {
    const res = await axios.get(`${base_url}/contact/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error("Get contact by id failed.");
  }
};

const updateContact = async (id: string, data: IContact) => {
  try {
    const res = await axios.put(`${base_url}/contact/${id}`, data, config);
    return res.data;
  } catch (error: any) {
    throw new Error("Update contact failed.");
  }
};

const deleteContact = async (id: string) => {
  try {
    const res = await axios.delete(`${base_url}/contact/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error("Delete contact failed.");
  }
};

const contactService = {
  getAllContact,
  getContactById,
  updateContact,
  deleteContact,
};

export default contactService;
