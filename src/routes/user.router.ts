import express from 'express';
import {
  getUsers,
  getUser,
  loginUser,
  registerUser,
  deletedUser,
  updatedUser,
} from '../controllers/user.controller';
import { isAdmin, verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/all-users', getUsers);
router.get('/:id', getUser);
router.delete('/:id', verifyToken, isAdmin, deletedUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', updatedUser);

export default router;
