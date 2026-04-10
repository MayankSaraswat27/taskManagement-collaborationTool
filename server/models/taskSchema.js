import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    status: {
        type: String,
        enum: ["todo", "in-progress", "completed"],
        default: "todo"
    },

    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{ timestamps: true }
);

export default mongoose.model("Task", taskSchema);