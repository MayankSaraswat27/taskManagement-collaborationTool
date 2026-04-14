import express from "express";

import {
  createBoard,
  getBoards,
  getSingleBoard,
  updateBoard,
  addMembers,
  removeMember,
  deleteBoard,
} from "../controllers/boardController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBoard);
router.get("/", protect, getBoards);
router.get("/:id", protect, getSingleBoard);
router.put("/:id", protect, updateBoard);
router.delete("/:id", protect, deleteBoard);
router.post("/:id/members", protect, addMembers);
router.delete("/:id/members/:userId", protect, removeMember);

export default router;