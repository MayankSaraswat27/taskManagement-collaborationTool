import List from "../models/listModel.js";


/*
CREATE LIST INSIDE BOARD
*/

export const createList = async(req, res) => {

    try {

        const { title, boardId } = req.body;

        const list = await List.create({

            title,

            boardId

        });

        res.status(201).json(list);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



/*
GET LISTS OF A BOARD
*/

export const getListsByBoard = async(req, res) => {

    try {

        const lists = await List.find({

            boardId: req.params.boardId

        });

        res.json(lists);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



/*
DELETE LIST
*/

export const deleteList = async(req, res) => {

    try {

        const list = await List.findByIdAndDelete(req.params.id);

        if (!list) {

            return res.status(404).json({

                message: "List not found"

            });

        }

        res.json({

            message: "List deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};