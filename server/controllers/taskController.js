import Task from "../models/taskSchema.js";
import List from "../models/listModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, list, assignedTo } = req.body;

    const listExists = await List.findById(list);
    if (!listExists) {
      return res.status(404).json({ message: "List not found" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      list,
      createdBy: req.user.id,
      assignedTo,
    });

    listExists.tasks.push(task._id);
    await listExists.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      list: req.params.listId,
    })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ position: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.body.list && req.body.list !== task.list.toString()) {
      const oldList = await List.findById(task.list);
      const newList = await List.findById(req.body.list);

      oldList.tasks = oldList.tasks.filter(
        (t) => t.toString() !== task._id.toString()
      );
      await oldList.save();

      newList.tasks.push(task._id);
      await newList.save();
    }

    Object.assign(task, req.body);
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const list = await List.findById(task.list);
    if (list) {
      list.tasks = list.tasks.filter(
        (t) => t.toString() !== task._id.toString()
      );
      await list.save();
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};