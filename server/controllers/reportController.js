import Board from "../models/boardModel.js";
import Task from "../models/taskSchema.js";

export const getProgressSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const boards = await Board.find({ members: { $in: [userId] } }).select("title");
    const boardIds = boards.map((board) => board._id);
    const listIdMap = await getListIdsByBoard(boardIds);
    const allListIds = Object.values(listIdMap).flat();

    const totalTasks = await Task.countDocuments({ list: { $in: allListIds } });
    const completedTasks = await Task.countDocuments({ list: { $in: allListIds }, status: "completed" });
    const inProgressTasks = await Task.countDocuments({ list: { $in: allListIds }, status: "in-progress" });
    const todoTasks = await Task.countDocuments({ list: { $in: allListIds }, status: "todo" });

    const boardSummaries = await Promise.all(
      boards.map(async (board) => {
        const boardListIds = listIdMap[board._id.toString()] || [];
        const boardTaskCount = await Task.countDocuments({ list: { $in: boardListIds } });
        const boardCompleted = await Task.countDocuments({ list: { $in: boardListIds }, status: "completed" });

        return {
          boardId: board._id,
          title: board.title,
          totalTasks: boardTaskCount,
          completedTasks: boardCompleted,
        };
      })
    );

    res.json({
      boardCount: boards.length,
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      boardSummaries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getListIdsByBoard = async (boardIds) => {
  const List = (await import("../models/listModel.js")).default;
  const lists = await List.find({ board: { $in: boardIds } }).select("board _id");
  const map = {};

  lists.forEach((list) => {
    const boardId = list.board.toString();
    map[boardId] = map[boardId] || [];
    map[boardId].push(list._id);
  });

  return map;
};
