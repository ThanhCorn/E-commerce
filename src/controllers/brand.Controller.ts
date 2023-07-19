import { Request, Response } from 'express';
import BrandModel from '../models/brand.Model';
import { validateMongoDbId } from '../utils/validateMongodbid';

export const createBrand = async (req: Request, res: Response) => {
  try {
    const newBrand = await BrandModel.create(req.body);
    return res.status(201).json(newBrand);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updateBrand = await BrandModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateBrand);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteBrand = await BrandModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Delete Brand successfully',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBrand = await BrandModel.findById(id);
    return res.status(200).json(getBrand);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllBrand = async (req: Request, res: Response) => {
  try {
    const allBrand = await BrandModel.find();
    return res.status(200).json(allBrand);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
