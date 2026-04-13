import List from "../models/listModel.js";
import Board from "../models/boardModel.js";
import Task from "../models/taskSchema.js";

export const createList = async (req, res) => {
  try {
    const { title, board } = req.body;

    const boardExists = await Board.findById(board);

    if (!boardExists) {
      return res.status(404).json({ message: "Board not found" });
    }

    const list = await List.create({
      title,
      board,
    });

    boardExists.lists.push(list._id);
    await boardExists.save();

    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getListsByBoard = async (req, res) => {
  try {
    const lists = await List.find({
      board: req.params.boardId,
    })
      .populate("tasks")
      .sort({ position: 1 });

    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    Object.assign(list, req.body);
    const updatedList = await list.save();

    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    await Task.deleteMany({ list: list._id });

    const board = await Board.findById(list.board);
    if (board) {
      board.lists = board.lists.filter(
        (l) => l.toString() !== list._id.toString()
      );
      await board.save();
    }

    await list.deleteOne();

    res.json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};