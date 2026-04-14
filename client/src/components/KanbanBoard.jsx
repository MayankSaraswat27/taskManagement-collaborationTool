import { DragDropContext } from "@hello-pangea/dnd";
import Column from '../components/Column'
import API from "../api";
import { useEffect, useState } from "react";

function KanbanBoard({ board, onUpdateBoard, onBack, onDeleteBoard }) {
  const [lists, setLists] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [collaborators, setCollaborators] = useState(board.members || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchLists();
    setCollaborators(board.members || []);
  }, [board._id, board.members]);

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

  const totalMembers = collaborators.length;

  const handleInviteCollaborator = async () => {
    if (!inviteEmail.trim()) return;

    try {
      const { data } = await API.post(`/boards/${board._id}/members`, {
        emails: [inviteEmail.trim()],
      });

      setCollaborators(data.members || []);
      onUpdateBoard?.({ ...board, members: data.members || [] });
      setInviteEmail("");
      setInviteError("");
    } catch (error) {
      console.error("Invite failed", error);
      setInviteError(error.response?.data?.message || "Unable to invite collaborator");
    }
  };

  const handleRemoveCollaborator = async (userId) => {
    try {
      const { data } = await API.delete(`/boards/${board._id}/members/${userId}`);
      setCollaborators(data.members || []);
      onUpdateBoard?.({ ...board, members: data.members || [] });
    } catch (error) {
      console.error("Remove collaborator failed", error);
    }
  };

  const handleDeleteBoard = async () => {
    try {
      await API.delete(`/boards/${board._id}`);
      onDeleteBoard?.(board._id);
      onBack();
    } catch (error) {
      console.error("Delete board failed", error);
      alert("Failed to delete board");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleAddTask = async (listId, taskData) => {
    try {
      await API.post("/tasks", {
        title: taskData.title,
        priority: taskData.priority,
        dueDate: taskData.deadline,
        list: listId,
      });

      fetchLists();
    } catch (error) {
      alert("Failed to add task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchLists();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleDragEnd = async (result) => {
  const { source, destination } = result;

  if (!destination) return;

  // same list → reorder
  if (source.droppableId === destination.droppableId) {
    const list = lists.find(l => l._id === source.droppableId);
    const newTasks = Array.from(list.tasks);
    const [moved] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, moved);

    const newLists = lists.map(l =>
      l._id === list._id ? { ...l, tasks: newTasks } : l
    );

    setLists(newLists);
    return;
  }

  // move between lists
  const sourceList = lists.find(l => l._id === source.droppableId);
  const destList = lists.find(l => l._id === destination.droppableId);

  const sourceTasks = Array.from(sourceList.tasks);
  const destTasks = Array.from(destList.tasks);

  const [movedTask] = sourceTasks.splice(source.index, 1);
  destTasks.splice(destination.index, 0, movedTask);

  const newLists = lists.map(l => {
    if (l._id === sourceList._id) return { ...l, tasks: sourceTasks };
    if (l._id === destList._id) return { ...l, tasks: destTasks };
    return l;
  });

  setLists(newLists);

  // 🔥 update backend (VERY IMPORTANT)
  try {
    await API.put(`/tasks/${movedTask._id}`, {
      list: destination.droppableId,
    });
  } catch (error) {
    console.error("Failed to update task", error);
  }
};

  return (
    <div className="flex flex-col h-full">
      {/* Board header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">{board.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {totalTasks} tasks · {totalMembers} collaborators
          </p>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm w-full sm:w-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Collaborators</p>
          <div className="mt-3 space-y-2">
            {collaborators.length ? (
              collaborators.map((member) => (
                <div key={member._id} className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveCollaborator(member._id)}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No collaborators yet</p>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Invite by email"
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleInviteCollaborator}
              className="w-full rounded-2xl bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
            >
              Invite collaborator
            </button>
            {inviteError && <p className="text-xs text-red-500">{inviteError}</p>}
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
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
</DragDropContext>
    </div>
  )
}

export default KanbanBoard;

