import express from 'express';
import {
  getAllUser,
  getUser,
  loginUser,
  registerUser,
  deletedUser,
  updatedUser,
  unblockUser,
  blockUser,
  handleRefreshToken,
  logoutUser,
  updatedPassword,
  forgotPassword,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
} from '../controllers/user.Controller';
import { isAdmin, verifyToken } from '../middleware/authMiddleware';
import 'dotenv/config';

const router = express.Router();

router.post('/register', registerUser);
router.post('/forgot-password-token', forgotPassword);
router.put('/reset-password/:token', resetPassword);

router.put('/password', verifyToken, updatedPassword);
router.post('/login', loginUser);
router.post('/login-admin', loginAdmin);
router.post('/cart', verifyToken, userCart);
router.post('/cart/applycoupon', verifyToken, applyCoupon);
router.get('/all-users', getAllUser);
router.get('/refresh', handleRefreshToken);
router.post('/logout', logoutUser);
router.get('/wishlist', verifyToken, getWishlist);
router.get('/cart', verifyToken, getUserCart);

router.get('/:id', getUser);
router.delete('/empty-cart', verifyToken, emptyCart);
router.delete('/:id', verifyToken, isAdmin, deletedUser);

router.put('/edit-user', verifyToken, updatedUser);
router.put('/save-address', verifyToken, saveAddress);
router.put('/block-user/:id', verifyToken, isAdmin, blockUser);
router.put('/unblock-user/:id', verifyToken, isAdmin, unblockUser);

export default router;
