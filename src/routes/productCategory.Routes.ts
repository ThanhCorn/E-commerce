import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from '../controllers/productCategory.Controller';
import { isAdmin, verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', verifyToken, isAdmin, createCategory);
router.put('/:id', verifyToken, isAdmin, updateCategory);
router.delete('/:id', verifyToken, isAdmin, deleteCategory);
router.get('/:id', getCategory);
router.get('/', getAllCategory);

export default router;
