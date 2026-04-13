import express from "express";

import {
  createBoard,
  getBoards,
  getSingleBoard,
  addMembers,
  removeMember,
} from "../controllers/boardController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import { deleteBoard } from "../controllers/boardController.js";

const router = express.Router();

router.post("/", protect, createBoard);

router.get("/", protect, getBoards);

router.get("/:id", protect, getSingleBoard);
router.delete("/:id", protect, deleteBoard);

router.post("/:id/members", protect, adminOnly, addMembers);

router.delete("/:id/members/:userId", protect, adminOnly, removeMember);

export default router;