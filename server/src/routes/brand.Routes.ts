import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getBrand,
  updateBrand,
} from "../controllers/brand.Controller";
import { isAdmin, verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createBrand);
router.put("/:id", verifyToken, isAdmin, updateBrand);
router.delete("/:id", verifyToken, isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getAllBrand);

export default router;
