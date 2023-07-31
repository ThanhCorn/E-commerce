import express from "express";
import {
  createContact,
  deleteContact,
  getAllContact,
  getContact,
  updateContact,
} from "../controllers/contact.Controller";
import { isAdmin, verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", createContact);
router.put("/:id", verifyToken, isAdmin, updateContact);
router.delete("/:id", verifyToken, isAdmin, deleteContact);
router.get("/:id", getContact);
router.get("/", getAllContact);

export default router;
