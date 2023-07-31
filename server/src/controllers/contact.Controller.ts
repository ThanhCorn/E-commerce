import { Request, Response } from "express";
import contactModel from "../models/contact.Model";
import { validateMongoDbId } from "../utils/validateMongodbid";

export const createContact = async (req: Request, res: Response) => {
  try {
    const newContact = await contactModel.create(req.body);
    return res.status(201).json(newContact);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updateContact = await contactModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateContact);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteContact = await contactModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Delete Color successfully",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getContact = await contactModel.findById(id);
    return res.status(200).json(getContact);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllContact = async (req: Request, res: Response) => {
  try {
    const allContact = await contactModel.find();
    return res.status(200).json(allContact);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
