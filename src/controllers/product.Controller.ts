/* eslint-disable @typescript-eslint/no-unused-vars */
import ProductModel from '../models/product.Model';
import UserModel from '../models/user.Model';
import { Request, Response } from 'express';
import slugify from 'slugify';
import { Document, Query } from 'mongoose';
import { validateMongoDbId } from '../utils/validateMongodbid';
import { cloudinaryUpload } from '../utils/cloudinary';

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

// Add to wishlist
export const addToWishlist = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    const user = await UserModel.findById(_id);
    const alreadyAdded = await user?.wishlist.find(
      (id) => id.toString() === productId,
    );
    if (alreadyAdded) {
      const user = await UserModel.findByIdAndUpdate(
        _id,
        { $pull: { wishlist: productId } },
        { new: true },
      );
      res.status(200).json(user);
    } else {
      const user = await UserModel.findByIdAndUpdate(
        _id,
        { $push: { wishlist: productId } },
        { new: true },
      );
      res.status(200).json(user);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Rating product
export const rating = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { productId, star, comment } = req.body;

  try {
    const product = await ProductModel.findById(productId);
    const alreadyRated = await product?.ratings?.find(
      (userId) => userId.postedBy.toString() === _id.toString(),
    );

    if (alreadyRated) {
      const updateRating = await ProductModel.updateOne(
        { ratings: { $elemMatch: alreadyRated } },
        { $set: { 'ratings.$.star': star, 'ratings.$.comment': comment } },
        { new: true },
      );
    } else {
      const rateProduct = await ProductModel.findByIdAndUpdate(
        productId,
        {
          $push: { ratings: { star: star, postedBy: _id, comment: comment } },
        },
        { new: true },
      );
    }

    const getAllRating = await ProductModel.findById(productId);
    const ratingLength = getAllRating?.ratings?.length;
    const totalRating = getAllRating?.ratings
      ?.map((rating) => rating.star)
      .reduce((prev, curr) => prev + curr, 0);

    if (ratingLength && totalRating) {
      const averageRating = Math.round(totalRating / ratingLength);
      const updateAverageRating = await ProductModel.findByIdAndUpdate(
        productId,
        {
          totalRating: averageRating,
        },
        { new: true },
      );
      // You can send a success message or the updated product data here
      res.status(200).json(updateAverageRating);
    } else {
      res.status(400).json({ message: 'Rating not found' });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const uploadImages = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const uploader = async (file: Express.Multer.File) =>
      cloudinaryUpload(file);
    const urls = [];
    const files = req.files as Express.Multer.File[];
    for (const file of files) {
      const newPath = await uploader(file);
      if (newPath) {
        urls.push(newPath);
      }
    }

    // Filter out any null values from the urls array
    const filteredUrls = urls.filter((url) => url !== null);

    const findProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        images: filteredUrls.map((file) => {
          return file;
        }),
      },
      { new: true },
    );

    return res.status(200).json(findProduct);
  } catch (error) {
    console.error('Error while uploading images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
