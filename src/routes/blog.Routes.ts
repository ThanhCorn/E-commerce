import express from 'express';
import {
  createBlog,
  deleteBlog,
  dislikeTheBlog,
  getAllBlog,
  getBlog,
  likeTheBlog,
  updateBlog,
  uploadImages,
} from '../controllers/blog.Controller';
import { isAdmin, verifyToken } from '../middleware/authMiddleware';
import { blogImgResize, uploadPhoto } from '../middleware/uploadImages';

const router = express.Router();

router.post('/', verifyToken, isAdmin, createBlog);
router.put('/likes', verifyToken, likeTheBlog);
router.put('/dislikes', verifyToken, dislikeTheBlog);
router.put(
  '/upload/:id',
  verifyToken,
  isAdmin,
  uploadPhoto.array('images', 2),
  blogImgResize,
  uploadImages,
);

router.put('/:id', verifyToken, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlog);
router.delete('/:id', verifyToken, isAdmin, deleteBlog);

export default router;
