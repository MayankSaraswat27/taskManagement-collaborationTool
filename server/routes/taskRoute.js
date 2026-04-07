import express from "express";
import {
    createTask,
    getTasks,
    getSingleTask,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.get("/:id", protect, getSingleTask);

export default router;