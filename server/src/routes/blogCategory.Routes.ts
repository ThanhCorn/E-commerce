import express from "express";
import {
  createBlogCategory,
  deleteBlogCategory,
  getAllBlogCategory,
  getBlogCategory,
  updateBlogCategory,
} from "../controllers/blogCategory.Controller";
import { isAdmin, verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createBlogCategory);
router.put("/:id", verifyToken, isAdmin, updateBlogCategory);
router.delete("/:id", verifyToken, isAdmin, deleteBlogCategory);
router.get("/:id", getBlogCategory);
router.get("/", getAllBlogCategory);

export default router;
