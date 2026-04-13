import { useState } from 'react'
import TaskCard from './TaskCard'

// Column accent colors
const columnColors = {
  todo: { accent: 'bg-slate-400', badge: 'bg-slate-100 text-slate-600' },
  inProgress: { accent: 'bg-blue-400', badge: 'bg-blue-100 text-blue-600' },
  completed: { accent: 'bg-emerald-400', badge: 'bg-emerald-100 text-emerald-600' },
}

function Column({ title, tasks, columnId, onAddTask, onDelete }) {
  const [showForm, setShowForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium',
    deadline: ''
  })

  const colors = columnColors[columnId] || columnColors.todo

  function handleAdd() {
    if (!newTask.title.trim()) return
    onAddTask(newTask)
    setNewTask({ title: '', priority: 'medium', deadline: '' })
    setShowForm(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd()
    if (e.key === 'Escape') setShowForm(false)
  }

  return (
    <div className="flex flex-col w-72 min-w-72">

      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${colors.accent}`}></span>
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        >
          +
        </button>
      </div>

      {/* Tasks */}
      <div className="flex-1 min-h-20 rounded-xl p-2 bg-gray-50">
        {tasks.map((task, index) => (
          <TaskCard
            key={task._id}
            task={task}
            index={index}
            onDelete={onDelete}
          />
        ))}

        {/* Empty state */}
        {tasks.length === 0 && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 text-xs text-gray-400 hover:bg-white rounded-lg border-2 border-dashed border-gray-200"
          >
            + Add a task
          </button>
        )}
      </div>

      {/* Add Task Form */}
      {showForm && (
        <div className="bg-white border rounded-xl p-3 mt-2">
          <input
            autoFocus
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            onKeyDown={handleKeyDown}
            placeholder="Task title..."
            className="w-full mb-2 px-2 py-1 border rounded"
          />

          <div className="flex gap-2 mb-2">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="flex-1 border rounded px-2 py-1"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              className="flex-1 border rounded px-2 py-1"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 bg-blue-500 text-white rounded py-1"
            >
              Add
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="flex-1 bg-gray-200 rounded py-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Column