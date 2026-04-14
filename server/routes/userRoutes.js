import express from "express";
import protect from "../middleware/authMiddleware.js";
import { searchUsers, getCurrentUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/search", protect, searchUsers);
router.get("/me", protect, getCurrentUser);

export default router;
