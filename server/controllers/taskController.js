import Task from "../models/taskSchema.js";

export const createTask = async(req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            userId: req.user.id
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async(req, res) => {

    try {

        const task = await Task.findOneAndUpdate({
                _id: req.params.id,
                userId: req.user.id
            },
            req.body, { new: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found or not authorized"
            });
        }

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const deleteTask = async(req, res) => {

    try {

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found or not authorized"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


export const getSingleTask = async(req, res) => {

    try {

        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};