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
  updateOrderStatus,
  getAllOrders,
  removeItemFromCart,
  updateQuantityItem,
  getOrderByUserId,
  emptyCart,
  getInfoUser,
  getMonthOrderIncome,
  getMonthOrderCount,
  getYearlyTotalOrders,
  getYearlyIncome,
  getOrderById,
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
router.get("/get-all-orders", verifyToken, isAdmin, getAllOrders);
router.get("/info-user", verifyToken, getInfoUser);
router.delete("/delete-item-cart/:cartItemId", verifyToken, removeItemFromCart);
// router.post("/cart/apply-coupon", verifyToken, applyCoupon);
router.get("/get-month-income", verifyToken, isAdmin, getMonthOrderIncome);
router.get("/get-month-order-count", verifyToken, isAdmin, getMonthOrderCount);
router.get(
  "/get-yearly-total-order",
  verifyToken,
  isAdmin,
  getYearlyTotalOrders
);
router.get("/get-yearly-total-income", verifyToken, isAdmin, getYearlyIncome);
router.get("/get-order-by-id", verifyToken, getOrderByUserId);
router.get("/get-order-id/:id", verifyToken, getOrderById);
router.delete("/empty-cart", verifyToken, emptyCart);
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
