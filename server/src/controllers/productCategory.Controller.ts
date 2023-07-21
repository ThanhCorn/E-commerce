import { Request, Response } from 'express';
import categoryModel from '../models/productCategory.Model';
import { validateMongoDbId } from '../utils/validateMongodbid';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await categoryModel.create(req.body);
    return res.status(201).json(newCategory);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updateCategory = await categoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateCategory);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteCategory = await categoryModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Delete category successfully',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCategory = await categoryModel.findById(id);
    return res.status(200).json(getCategory);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const allCategory = await categoryModel.find();
    return res.status(200).json(allCategory);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
