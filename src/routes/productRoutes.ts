import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from '../controllers/productController';
import { isAdmin, verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', verifyToken, isAdmin, createProduct);
router.get('/:id', getProduct);
router.get('/', getAllProduct);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;
