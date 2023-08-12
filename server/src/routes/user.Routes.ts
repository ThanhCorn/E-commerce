import express from "express";
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
  // emptyCart,
  // applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderId,
  removeItemFromCart,
  updateQuantityItem,
} from "../controllers/user.Controller";
import { isAdmin, verifyToken } from "../middleware/authMiddleware";
import "dotenv/config";

const router = express.Router();

router.post("/register", registerUser);
router.post("/forgot-password-token", forgotPassword);
router.put("/reset-password/:token", resetPassword);

router.put("/password", verifyToken, updatedPassword);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/cart", verifyToken, userCart);
router.delete(
  "/update-item-cart/:cartItemId/:newQuantity",
  verifyToken,
  updateQuantityItem
);
router.delete("/delete-item-cart/:cartItemId", verifyToken, removeItemFromCart);
// router.post("/cart/apply-coupon", verifyToken, applyCoupon);
router.post("/cart/create-order", verifyToken, createOrder);
router.get("/get-orders", verifyToken, getOrders);
router.get("/get-all-orders", verifyToken, isAdmin, getAllOrders);
router.post("/get-order-by-id/:id", verifyToken, isAdmin, getOrderId);
router.put("/update-order/:id", verifyToken, isAdmin, updateOrderStatus);
router.get("/all-users", getAllUser);
router.get("/refresh", handleRefreshToken);
router.post("/logout", logoutUser);
router.get("/wishlist", verifyToken, getWishlist);
router.get("/cart", verifyToken, getUserCart);

router.get("/:id", getUser);
// router.delete("/empty-cart", verifyToken, emptyCart);
router.delete("/:id", verifyToken, isAdmin, deletedUser);

router.put("/edit-user", verifyToken, updatedUser);
router.put("/save-address", verifyToken, saveAddress);
router.put("/block-user/:id", verifyToken, isAdmin, blockUser);
router.put("/unblock-user/:id", verifyToken, isAdmin, unblockUser);

export default router;
