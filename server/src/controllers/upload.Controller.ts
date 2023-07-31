/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { cloudinaryDelete, cloudinaryUpload } from '../utils/cloudinary';

export const uploadImages = async (req: Request, res: Response) => {
  console.log(req.files);
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

    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    console.error('Error while uploading images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteImages = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deteled = await cloudinaryDelete(id);
    res.json({ message: 'Delete successfully' });
  } catch (error) {
    console.error('Error while uploading images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
