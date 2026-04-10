import express from "express";

import {

    createBoard,
    getBoards,
    assignUsersToBoard

} from "../controllers/boardController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

/*
ADMIN CREATE BOARD
*/

router.post("/", protect, adminOnly, createBoard);


/*
GET BOARDS
ADMIN → all boards
USER → assigned boards only
*/

router.get("/", protect, getBoards);


/*
ADMIN ASSIGN USERS TO BOARD
*/

router.put("/assign/:id", protect, adminOnly, assignUsersToBoard);


export default router;