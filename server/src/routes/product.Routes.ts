import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  addToWishlist,
  rating,
} from "../controllers/product.Controller";
import { isAdmin, verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createProduct);
router.get("/:id", getProduct);

router.put("/rating", verifyToken, rating);
router.get("/", getAllProduct);
router.put("/wishlist", verifyToken, addToWishlist);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;
