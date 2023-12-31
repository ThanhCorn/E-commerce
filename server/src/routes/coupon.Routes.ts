import express from "express";
import {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
} from "../controllers/coupon.Controller";
import { isAdmin, verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createCoupon);
router.get("/", verifyToken, isAdmin, getAllCoupon);
router.get("/:id", verifyToken, isAdmin, getCoupon);
router.put("/:id", verifyToken, isAdmin, updateCoupon);
router.delete("/:id", verifyToken, isAdmin, deleteCoupon);

export default router;
