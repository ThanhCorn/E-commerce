/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { NextFunction, Request, Response } from 'express';
import { FileFilterCallback } from 'multer';
import fs from 'fs';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true); // File is an image, pass null for the error argument
  } else {
    const error = new Error('Not an image, please upload an image') as any;
    cb(error, false); // File is not an image, pass the error
  }
};

export const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 1000000 },
});

export const productImgResize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.files);
  if (!req.files || !Array.isArray(req.files)) return next();

  try {
    await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
        if (!file.buffer || file.buffer.length === 0) {
          // Skip image processing for empty files
          return;
        }

        const outputPath = `public/images/products/${file.filename}`;
        const resizedImageBuffer = await sharp(file.buffer)
          .resize(300, 300)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toBuffer();

        fs.writeFileSync(outputPath, resizedImageBuffer);
        fs.unlinkSync(file.path);
      }),
    );

    next();
  } catch (error) {
    // Handle errors more gracefully
    console.error('Error while resizing and saving images:', error);
    return res
      .status(500)
      .json({ message: 'Failed to resize and save images.' });
  }
};

export const blogImgResize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.files || !Array.isArray(req.files)) return next();

  try {
    await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
        if (!file.buffer || file.buffer.length === 0) {
          // Skip image processing for empty files
          return;
        }

        const outputPath = `public/images/blogs/${file.filename}`;
        const resizedImageBuffer = await sharp(file.buffer)
          .resize(300, 300)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toBuffer();

        fs.writeFileSync(outputPath, resizedImageBuffer);
        fs.unlinkSync(file.path);
      }),
    );

    next();
  } catch (error) {
    // Handle errors more gracefully
    console.error('Error while resizing and saving images:', error);
    return res
      .status(500)
      .json({ message: 'Failed to resize and save images.' });
  }
};
