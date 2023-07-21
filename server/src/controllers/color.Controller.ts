import { Request, Response } from 'express';
import colorModel from '../models/color.Model';
import { validateMongoDbId } from '../utils/validateMongodbid';

export const createColor = async (req: Request, res: Response) => {
  try {
    const newColor = await colorModel.create(req.body);
    return res.status(201).json(newColor);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateColor = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updateColor = await colorModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateColor);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteColor = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteColor = await colorModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Delete Color successfully',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getColor = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getColor = await colorModel.findById(id);
    return res.status(200).json(getColor);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllColor = async (req: Request, res: Response) => {
  try {
    const allColor = await colorModel.find();
    return res.status(200).json(allColor);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
