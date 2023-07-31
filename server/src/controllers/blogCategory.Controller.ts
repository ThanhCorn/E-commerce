import { Request, Response } from "express";
import blogCategoryModel from "../models/blogCategory.Model";
import { validateMongoDbId } from "../utils/validateMongodbid";

export const createBlogCategory = async (req: Request, res: Response) => {
  try {
    const newBlogCategory = await blogCategoryModel.create(req.body);
    return res.status(201).json(newBlogCategory);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateBlogCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updateBlogCategory = await blogCategoryModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(updateBlogCategory);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteBlogCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteBlogCategory = await blogCategoryModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Delete category successfully",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getBlogCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlogCategory = await blogCategoryModel.findById(id);
    return res.status(200).json(getBlogCategory);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllBlogCategory = async (req: Request, res: Response) => {
  try {
    const allBlogCategory = await blogCategoryModel.find();
    return res.status(200).json(allBlogCategory);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
