import express from 'express';
import { isAdmin, verifyToken } from '../middleware/authMiddleware';
import { productImgResize, uploadPhoto } from '../middleware/uploadImages';
import { deleteImages, uploadImages } from '../controllers/upload.Controller';

const router = express.Router();

router.post(
  '/',
  verifyToken,
  isAdmin,
  uploadPhoto.array('images', 10),
  productImgResize,
  uploadImages,
);

router.delete('/delete-img/:id', verifyToken, isAdmin, deleteImages);

export default router;
