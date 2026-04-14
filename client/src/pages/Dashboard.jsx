import API from "../api";
import { useEffect } from "react";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KanbanBoard from '../components/KanbanBoard'


// Sidebar navigation items
const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l2 2m7 1a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
  id: 'logout',
  label: 'Logout',
  icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V7" />
    </svg>
  ),
}
]

function BoardCard({ board, onEdit, onDelete, onOpen }) {
  const [showMenu, setShowMenu] = useState(false)

  const totalLists = board.lists?.length || 0;
  const memberCount = board.members?.length || 0;

  // Board color themes
  const boardColors = [
    'from-blue-400 to-blue-500',
    'from-teal-400 to-teal-500',
    'from-orange-400 to-orange-500',
    'from-pink-400 to-pink-500',
    'from-cyan-400 to-cyan-500',
  ]
  const colorIndex = Math.floor(Math.random() * boardColors.length);
  const gradient = boardColors[colorIndex] || boardColors[0]

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-visible cursor-pointer group"
      onClick={onOpen}
    >
      {/* Color header strip */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
            {board.title}
          </h3>
          {/* Options menu */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
              </svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-50 w-36 py-1 overflow-visible">
                <button
                  onClick={() => { onEdit(); setShowMenu(false) }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit name
                </button>
                <button
                  onClick={() => { onDelete(); setShowMenu(false) }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h10M7 15h10" />
            </svg>
            <span className="text-xs text-gray-500">{totalLists} lists</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11a4 4 0 10-8 0 4 4 0 008 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v4m0 0v4m0-4h4m-4 0H8" />
            </svg>
            <span className="text-xs text-gray-500">{memberCount} members</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [progress, setProgress] = useState(null);
  const [progressLoading, setProgressLoading] = useState(false);
  const [progressError, setProgressError] = useState(null);

  const [activeNav, setActiveNav] = useState("dashboard");

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    if (activeNav === "progress") {
      fetchProgress();
    }
  }, [activeNav]);

  const fetchBoards = async () => {
    try {
      const { data } = await API.get("/boards");
      setBoards(data);
    } catch (error) {
      console.error("Error fetching boards", error);
    }
  };

  
  const handleLogout = () => {
  localStorage.removeItem("token"); // remove auth token
  navigate("/login"); // redirect to login page
};

  const fetchProgress = async () => {
    try {
      setProgressLoading(true);
      const { data } = await API.get("/reports/progress");
      setProgress(data);
      setProgressError(null);
    } catch (error) {
      console.error("Error fetching progress", error);
      setProgressError("Unable to load progress summary");
    } finally {
      setProgressLoading(false);
    }
  };

  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [editingBoard, setEditingBoard] = useState(null);
  const [editTitle, setEditTitle] = useState("");


  const selectedBoard = boards.find(
  (b) => b._id === selectedBoardId
);

  // Create a new board
  const handleCreateBoard = async () => {
  if (!newBoardTitle.trim()) return;

  try {
    const { data } = await API.post("/boards", {
      title: newBoardTitle,
    });

    setBoards([...boards, data]);
    setNewBoardTitle("");
    setShowCreateModal(false);

  } catch (error) {
    alert("Failed to create board");
  }
};

  // Delete a board by id
  const handleDeleteBoard = async (boardId) => {
  try {
    await API.delete(`/boards/${boardId}`);

    setBoards(boards.filter((b) => b._id !== boardId));

  } catch (error) {
    alert("Failed to delete board");
  }
};

  // Start editing a board name
  function handleStartEdit(board) {
    setEditingBoard(board._id)
    setEditTitle(board.title)
  }

  // Save edited board name
  async function handleSaveEdit() {
    if (!editTitle.trim()) return;

    try {
      const { data } = await API.put(`/boards/${editingBoard}`, {
        title: editTitle.trim(),
      });

      setBoards(boards.map((b) =>
        b._id === editingBoard ? data : b
      ));
    } catch (error) {
      console.error("Failed to update board", error);
      alert("Unable to save changes");
    } finally {
      setEditingBoard(null);
      setEditTitle("");
    }
  }

  // Update board data from KanbanBoard (after drag-drop or adding tasks)
  function handleUpdateBoard(updatedBoard) {
    setBoards(boards.map((b) =>
      b._id === updatedBoard._id ? updatedBoard : b
    ));
  }



  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-semibold text-gray-900 text-base">Trackify</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
  if (item.id === "logout") {
    handleLogout();
  } else {
    setActiveNav(item.id);
    setSelectedBoardId(null);
  }
}}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
                ${activeNav === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Create board button */}
        {/* <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full flex items-center gap-2 px-3 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New List
          </button>
        </div> */}
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 overflow-y-auto">
        {selectedBoard ? (
          /* Kanban board view */
          <div className="p-8">
            <KanbanBoard
              board={selectedBoard}
              onUpdateBoard={handleUpdateBoard}
              onBack={() => setSelectedBoardId(null)}
            />
          </div>
        ) : activeNav === "progress" ? (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Progress Summary</h1>
                <p className="text-sm text-gray-500 mt-1">Track task completion across your boards</p>
              </div>
              <button
                onClick={() => setActiveNav("dashboard")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >
                Back to boards
              </button>
            </div>

            {progressLoading ? (
              <div className="text-gray-600">Loading progress...</div>
            ) : progressError ? (
              <div className="text-red-500">{progressError}</div>
            ) : progress ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Boards</p>
                  <p className="mt-3 text-3xl font-semibold text-gray-900">{progress.boardCount}</p>
                </div>
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Total tasks</p>
                  <p className="mt-3 text-3xl font-semibold text-gray-900">{progress.totalTasks}</p>
                </div>
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="mt-3 text-3xl font-semibold text-gray-900">{progress.completedTasks}</p>
                </div>
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">In progress</p>
                  <p className="mt-3 text-3xl font-semibold text-gray-900">{progress.inProgressTasks}</p>
                </div>
              </div>
            ) : (
              <div className="text-gray-600">No progress data available yet.</div>
            )}

            {progress?.boardSummaries?.length ? (
              <div className="mt-8 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Board details</h2>
                <div className="grid gap-4">
                  {progress.boardSummaries.map((summary) => (
                    <div key={summary.boardId} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{summary.title}</h3>
                        <span className="text-sm text-gray-500">{summary.completedTasks}/{summary.totalTasks} done</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          /* Dashboard overview */
          <div className="p-8">
            {/* Page header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Boards</h1>
                <p className="text-sm text-gray-500 mt-1">{boards.length} boards</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Board
              </button>
            </div>

            {/* Boards grid */}
            {boards.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium mb-1">No boards yet</p>
                <p className="text-gray-400 text-sm mb-4">Create your first board to get started</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Create a board
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {boards.map((board) => (
                  <BoardCard
                    key={board._id}
                    board={board}
                    onOpen={() => setSelectedBoardId(board._id)}
                    onEdit={() => handleStartEdit(board)}
                    onDelete={() => handleDeleteBoard(board._id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ===== CREATE BOARD MODAL ===== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Create new board</h3>
            <p className="text-sm text-gray-500 mb-4">Give your board a clear, descriptive name</p>
            <input
              autoFocus
              type="text"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateBoard()}
              placeholder="e.g. Product Roadmap"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateBoard}
                className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Create board
              </button>
              <button
                onClick={() => { setShowCreateModal(false); setNewBoardTitle('') }}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT BOARD NAME MODAL ===== */}
      {editingBoard && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rename board</h3>
            <input
              autoFocus
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setEditingBoard(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard;