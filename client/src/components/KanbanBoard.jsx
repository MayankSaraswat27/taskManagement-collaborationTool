
import Column from '../components/Column'
import API from "../api";
import { useEffect, useState } from "react";

function KanbanBoard({ board, onUpdateBoard, onBack }) {
  const [lists, setLists] = useState([]);
  useEffect(() => {
  fetchLists();
}, [board._id]);

const fetchLists = async () => {
  try {
    const { data } = await API.get(`/lists/board/${board._id}`);
    setLists(data);
  } catch (error) {
    console.error("Error fetching lists", error);
  }
};
  

  // Count total tasks across all columns
  const totalTasks = lists.reduce(
  (sum, list) => sum + (list.tasks?.length || 0),
  0
);


  // Add a new task to a specific column
  const handleAddTask = async (listId, taskData) => {
  try {
    await API.post("/tasks", {
      title: taskData.title,
      priority: taskData.priority,
      dueDate: taskData.deadline,
      list: listId,
    });

    fetchLists(); // refresh
  } catch (error) {
    alert("Failed to add task");
  }
};
const handleDeleteTask = async (taskId) => {
  try {
    await API.delete(`/tasks/${taskId}`);
    fetchLists(); // refresh UI
  } catch (error) {
    console.error("Delete failed", error);
  }
};
  return (
    <div className="flex flex-col h-full">
      {/* Board header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="h-4 w-px bg-gray-200"></div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{board.title}</h2>
          <p className="text-xs text-gray-400 mt-0.5">{totalTasks} tasks total</p>
        </div>
      </div>

      {/* Columns */}
  
        <div className="flex gap-5 overflow-x-auto pb-4">
          {lists.map((list) => (
            <Column
  key={list._id}
  title={list.title}
  columnId={list._id}
  tasks={list.tasks || []}
  onAddTask={(taskData) => handleAddTask(list._id, taskData)}
  onDelete={handleDeleteTask}
/>
          ))}
        </div>
    </div>
  )
}

export default KanbanBoard;