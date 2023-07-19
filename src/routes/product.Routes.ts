import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  addToWishlist,
  rating,
  uploadImages,
} from '../controllers/product.Controller';
import { isAdmin, verifyToken } from '../middleware/authMiddleware';
import { productImgResize, uploadPhoto } from '../middleware/uploadImages';

const router = express.Router();

router.post('/', verifyToken, isAdmin, createProduct);
router.get('/:id', getProduct);
router.put(
  '/upload/:id',
  verifyToken,
  isAdmin,
  uploadPhoto.array('images', 10),
  productImgResize,
  uploadImages,
);

router.put('/rating', verifyToken, rating);
router.get('/', getAllProduct);
router.put('/wishlist', verifyToken, addToWishlist);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;
