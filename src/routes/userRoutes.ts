import express from 'express';
import {
  getUsers,
  getUser,
  loginUser,
  registerUser,
  deletedUser,
  updatedUser,
  unblockUser,
  blockUser,
  handleRefreshToken,
  logoutUser,
} from '../controllers/userController';
import { isAdmin, verifyToken } from '../middleware/authMiddleware';
import 'dotenv/config';

const router = express.Router();

router.get('/all-users', getUsers);
router.get('/:id', getUser);
router.delete('/:id', verifyToken, isAdmin, deletedUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/refresh', handleRefreshToken);
router.put('/edit-user', verifyToken, updatedUser);
router.put('/block-user/:id', verifyToken, isAdmin, blockUser);
router.put('/unblock-user/:id', verifyToken, isAdmin, unblockUser);

export default router;
