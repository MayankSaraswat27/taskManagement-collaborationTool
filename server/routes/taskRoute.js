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


/*
CREATE TASK INSIDE LIST
*/

router.post("/", protect, createTask);


/*
GET TASKS OF A LIST
Example:
GET /api/tasks/list/12345
*/

router.get("/list/:listId", protect, getTasks);


/*
GET SINGLE TASK
Example:
GET /api/tasks/12345
*/

router.get("/:id", protect, getSingleTask);


/*
UPDATE TASK
*/

router.put("/:id", protect, updateTask);


/*
DELETE TASK
*/

router.delete("/:id", protect, deleteTask);


export default router;