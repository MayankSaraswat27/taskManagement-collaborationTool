import { Draggable } from 'react-beautiful-dnd'

// Priority color badge configuration
const priorityConfig = {
  High: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
  Medium: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' },
  Low: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
}

function TaskCard({ task, index }) {
  const priority = priorityConfig[task.priority] || priorityConfig.Low

  // Format deadline date for display
  function formatDate(dateStr) {
    if (!dateStr) return null
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white border border-gray-100 rounded-xl p-4 mb-3
            shadow-sm hover:shadow-md transition-all duration-150 cursor-grab
            ${snapshot.isDragging ? 'shadow-lg rotate-1 scale-105 border-blue-200' : ''}
          `}
        >
          {/* Task title */}
          <p className="text-sm font-medium text-gray-800 leading-snug mb-3">
            {task.title}
          </p>

          {/* Priority badge and deadline */}
          <div className="flex items-center justify-between">
            {/* Priority badge */}
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${priority.bg} ${priority.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}></span>
              {task.priority}
            </span>

            {/* Deadline */}
            {task.deadline && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(task.deadline)}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard;

 /*"@dnd-kit/core": "^6.3.1",*/