





































import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KanbanBoard from '../components/KanbanBoard'

// Initial dummy boards with pre-populated tasks

const initialBoards = [
  {
    id: 'board-1',
    title: 'Website Redesign',
    columns: {
      todo: [
        { id: 'task-1', title: 'Design new homepage mockups', priority: 'High', deadline: '2024-05-10' },
        { id: 'task-2', title: 'Write content for About page', priority: 'Medium', deadline: '2024-05-15' },
      ],
      inProgress: [
        { id: 'task-3', title: 'Conduct user interviews', priority: 'High', deadline: '2024-05-08' },
      ],
      completed: [
        { id: 'task-4', title: 'Define project scope', priority: 'Low', deadline: '2024-04-30' },
      ],
    },
  },
  {
    id: 'board-2',
    title: 'Mobile App Development',
    columns: {
      todo: [
        { id: 'task-5', title: 'Set up development environment', priority: 'High', deadline: '2024-05-12' },
        { id: 'task-6', title: 'Design onboarding flow', priority: 'Medium', deadline: '2024-05-20' },
      ],
      inProgress: [
        { id: 'task-7', title: 'Build authentication screens', priority: 'High', deadline: '2024-05-14' },
      ],
      completed: [],
    },
  },
  {
    id: 'board-3',
    title: 'Q2 Marketing Campaign',
    columns: {
      todo: [
        { id: 'task-8', title: 'Create social media calendar', priority: 'Medium', deadline: '2024-05-18' },
      ],
      inProgress: [
        { id: 'task-9', title: 'Draft email newsletter', priority: 'High', deadline: '2024-05-10' },
        { id: 'task-10', title: 'Design banner ads', priority: 'Low', deadline: '2024-05-22' },
      ],
      completed: [
        { id: 'task-11', title: 'Competitor analysis', priority: 'Medium', deadline: '2024-04-28' },
        { id: 'task-12', title: 'Set campaign goals', priority: 'High', deadline: '2024-04-25' },
      ],
    },
  },
]

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
    id: 'boards',
    label: 'My Boards',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    id: 'teams',
    label: 'Teams',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

function BoardCard({ board, onEdit, onDelete, onOpen }) {
  const [showMenu, setShowMenu] = useState(false)

  const totalTasks = Object.values(board.columns).reduce(
    (sum, tasks) => sum + tasks.length, 0
  )
  const completedCount = board.columns.completed.length

  // Board color themes
  const boardColors = [
    'from-blue-400 to-blue-500',
    'from-teal-400 to-teal-500',
    'from-orange-400 to-orange-500',
    'from-pink-400 to-pink-500',
    'from-cyan-400 to-cyan-500',
  ]
  const colorIndex = parseInt(board.id.split('-')[1]) % boardColors.length
  const gradient = boardColors[colorIndex] || boardColors[0]

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group"
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
              <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 w-36 py-1 overflow-hidden">
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

        {/* Task stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs text-gray-500">{totalTasks} tasks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs text-gray-500">{completedCount} done</span>
          </div>
        </div>

        {/* Progress bar */}
        {totalTasks > 0 && (
          <div className="mt-3">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.round((completedCount / totalTasks) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  const [boards, setBoards] = useState(initialBoards)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [selectedBoardId, setSelectedBoardId] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const [editingBoard, setEditingBoard] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  const selectedBoard = boards.find((b) => b.id === selectedBoardId)

  // Create a new board
  function handleCreateBoard() {
    if (!newBoardTitle.trim()) return
    const newBoard = {
      id: `board-${Date.now()}`,
      title: newBoardTitle.trim(),
      columns: { todo: [], inProgress: [], completed: [] },
    }
    setBoards([...boards, newBoard])
    setNewBoardTitle('')
    setShowCreateModal(false)
  }

  // Delete a board by id
  function handleDeleteBoard(boardId) {
    setBoards(boards.filter((b) => b.id !== boardId))
  }

  // Start editing a board name
  function handleStartEdit(board) {
    setEditingBoard(board.id)
    setEditTitle(board.title)
  }

  // Save edited board name
  function handleSaveEdit() {
    if (!editTitle.trim()) return
    setBoards(boards.map((b) =>
      b.id === editingBoard ? { ...b, title: editTitle.trim() } : b
    ))
    setEditingBoard(null)
    setEditTitle('')
  }

  // Update board data from KanbanBoard (after drag-drop or adding tasks)
  function handleUpdateBoard(updatedBoard) {
    setBoards(boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b)))
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
              onClick={() => { setActiveNav(item.id); setSelectedBoardId(null) }}
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
                New List
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
                    key={board.id}
                    board={board}
                    onOpen={() => setSelectedBoardId(board.id)}
                    onEdit={() => handleStartEdit(board)}
                    onDelete={() => handleDeleteBoard(board.id)}
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