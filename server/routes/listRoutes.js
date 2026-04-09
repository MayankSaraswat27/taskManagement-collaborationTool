import express from "express";

import {

    createList,
    getListsByBoard,
    deleteList

} from "../controllers/listController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


/*
CREATE LIST INSIDE BOARD
*/

router.post("/", protect, createList);


/*
GET LISTS OF A BOARD
*/

router.get("/:boardId", protect, getListsByBoard);


/*
DELETE LIST
*/

router.delete("/:id", protect, deleteList);


export default router;