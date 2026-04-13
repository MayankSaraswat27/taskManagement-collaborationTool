const priorityConfig = {
  high: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' },
  low: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
};

function TaskCard({ task, onDelete }) {
  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  function formatDate(dateStr) {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition-all">

      {/* 🔥 Title + Delete */}
      <div className="flex justify-between items-start mb-3">
        <p className="text-sm font-medium text-gray-800 leading-snug">
          {task.title}
        </p>

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-400 text-xs hover:text-red-600"
        >
          ✕
        </button>
      </div>

      {/* Priority + Deadline */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${priority.bg} ${priority.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}></span>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>

        {task.dueDate && (
          <span className="text-xs text-gray-400 flex items-center gap-1">
            📅 {formatDate(task.dueDate)}
          </span>
        )}
      </div>

    </div>
  );
}

export default TaskCard;