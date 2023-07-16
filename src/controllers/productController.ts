import ProductModel from '../models/productModel';
import { Request, Response } from 'express';
import slugify from 'slugify';

// POST createProduct
export const createProduct = async (req: Request, res: Response) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, {
        lower: true,
      });
    }
    const newProduct = await ProductModel.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get product
export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findProduct = await ProductModel.findById(id);
    if (findProduct) {
      return res.status(200).json(findProduct);
    }
  } catch (error) {
    res.status(400).json({ message: 'Product not found' });
  }
};

// GET all products
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //gte = greater than or equal, gt = greater than, lte = less than or equal, lt = less than

    const query = await ProductModel.find(JSON.parse(queryStr));
    const allProduct = await query;
    return res.status(200).json(allProduct);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// UPDATE product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, {
        lower: true,
      });
    }
    const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    if (deleteProduct) {
      return res.status(200).json({
        message: 'Product deleted successfully',
      });
    } else {
      return res.status(400).json({
        message: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
