import ProductModel from '../models/product.Model';
import { Request, Response } from 'express';
import slugify from 'slugify';
import { Document, Query } from 'mongoose';

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

    let query: Query<Document[], Document> = ProductModel.find(
      JSON.parse(queryStr),
    );

    // Sorting
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Limiting fields
    if (req.query.fields) {
      const fields = (req.query.fields as string).split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = Number(req.query.page as string) * 1 || 1;
    const limit = Number(req.query.limit as string) * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const productCount = await ProductModel.countDocuments();
      if (skip >= productCount) {
        throw new Error('This page does not exist.');
      }
    }

    const allProduct = await query;
    return res.status(200).json(allProduct);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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