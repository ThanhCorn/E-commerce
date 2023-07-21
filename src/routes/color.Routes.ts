import express from 'express';
import {
  createColor,
  deleteColor,
  getAllColor,
  getColor,
  updateColor,
} from '../controllers/color.Controller';
import { isAdmin, verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', verifyToken, isAdmin, createColor);
router.put('/:id', verifyToken, isAdmin, updateColor);
router.delete('/:id', verifyToken, isAdmin, deleteColor);
router.get('/:id', getColor);
router.get('/', getAllColor);

export default router;
