import { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'

// Column accent colors
const columnColors = {
  todo: { accent: 'bg-slate-400', light: 'bg-slate-50', badge: 'bg-slate-100 text-slate-600' },
  inProgress: { accent: 'bg-blue-400', light: 'bg-blue-50', badge: 'bg-blue-100 text-blue-600' },
  completed: { accent: 'bg-emerald-400', light: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-600' },
}

function Column({ title, tasks, columnId, onAddTask }) {
  const [showForm, setShowForm] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', priority: 'Medium', deadline: '' })

  const colors = columnColors[columnId] || columnColors.todo

  function handleAdd() {
    if (!newTask.title.trim()) return
    onAddTask(columnId, newTask)
    setNewTask({ title: '', priority: 'Medium', deadline: '' })
    setShowForm(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd()
    if (e.key === 'Escape') setShowForm(false)
  }

  return (
    <div className="flex flex-col w-72 min-w-72">
      {/* Column header */}
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
          className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title="Add task"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Droppable task list */}
      <Droppable droppableId={columnId} type="TASK">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 min-h-20 rounded-xl p-2 transition-colors
              ${snapshot.isDraggingOver ? colors.light + ' border-2 border-dashed border-blue-200' : 'bg-gray-50'}
            `}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}

            {/* Add task inline form */}
            {showForm && (
              <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                <input
                  autoFocus
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="Task title..."
                  className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <div className="flex gap-2 mb-2">
                  {/* Priority selector */}
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                  {/* Deadline picker */}
                  <input
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Add task
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Empty state prompt */}
            {tasks.length === 0 && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-3 text-xs text-gray-400 hover:text-gray-500 hover:bg-white rounded-lg transition-colors border-2 border-dashed border-gray-200 hover:border-gray-300"
              >
                + Add a task
              </button>
            )}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column;
