import Board from "../models/boardModel.js";
import List from "../models/listModel.js";
import Task from "../models/taskSchema.js";

export const createBoard = async (req, res) => {
  try {
    const { title } = req.body;

    const board = await Board.create({
      title,
      createdBy: req.user.id,
      members: [req.user.id], 
    });

    const lists = await List.insertMany([
      { title: "To Do", board: board._id, position: 1 },
      { title: "In Progress", board: board._id, position: 2 },
      { title: "Completed", board: board._id, position: 3 },
    ]);

    board.lists = lists.map((l) => l._id);
    await board.save();

    res.status(201).json(board);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBoards = async (req, res) => {
  try {
    let boards;

    if (req.user.role === "admin") {
      boards = await Board.find().populate("members", "name email");
    } else {
      boards = await Board.find({
  members: { $in: [req.user.id] },
}).populate("members", "name email");
    }

    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate("members", "name email")
      .populate({
        path: "lists",
        populate: {
          path: "tasks",
        },
      });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMembers = async (req, res) => {
  try {
    const { userIds } = req.body;

    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    userIds.forEach((id) => {
      if (!board.members.includes(id)) {
        board.members.push(id);
      }
    });

    await board.save();

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    board.members = board.members.filter(
      (m) => m.toString() !== req.params.userId
    );

    await board.save();

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const lists = await List.find({ board: board._id });

    for (const list of lists) {
      await Task.deleteMany({ list: list._id });
      await list.deleteOne();
    }

    await board.deleteOne();

    res.json({ message: "Board deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};