import Board from "../models/boardModel.js";

/*
CREATE BOARD (ADMIN ONLY)
*/
export const createBoard = async(req, res) => {

    try {

        const { title, assignedUsers } = req.body;

        const board = await Board.create({

            title,

            createdBy: req.user.id,

            assignedUsers

        });

        res.status(201).json(board);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};



/*
GET ALL BOARDS (ADMIN)
GET ASSIGNED BOARDS (USER)
*/

export const getBoards = async(req, res) => {

    try {

        let boards;

        if (req.user.role === "admin") {

            boards = await Board.find().populate("assignedUsers", "name email");

        } else {

            boards = await Board.find({

                assignedUsers: req.user.id

            });

        }

        res.json(boards);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};



/*
ASSIGN USERS TO BOARD (ADMIN ONLY)
*/

export const assignUsersToBoard = async(req, res) => {

    try {

        const { assignedUsers } = req.body;

        const board = await Board.findById(req.params.id);

        if (!board) {

            return res.status(404).json({

                message: "Board not found"

            });

        }

        board.assignedUsers = assignedUsers;

        await board.save();

        res.json(board);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};