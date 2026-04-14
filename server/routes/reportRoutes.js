import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getProgressSummary } from "../controllers/reportController.js";

const router = express.Router();

router.get("/progress", protect, getProgressSummary);

export default router;
