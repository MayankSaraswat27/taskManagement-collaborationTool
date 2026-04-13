import { DragDropContext } from 'react-beautiful-dnd'
import Column from '../components/Column'

function KanbanBoard({ board, onUpdateBoard, onBack }) {
  // Column display order and labels
  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' },
  ]

  // Count total tasks across all columns
  const totalTasks = Object.values(board.columns).reduce(
    (sum, tasks) => sum + tasks.length, 0
  )

 


    function handleDragEnd(result) {
  const { source, destination } = result;

  if (!destination) return;

  const sourceCol = source.droppableId;
  const destCol = destination.droppableId;

  // SAME COLUMN (reorder)
  if (sourceCol === destCol) {
    const tasks = [...board.columns[sourceCol]];
    const [movedTask] = tasks.splice(source.index, 1);
    tasks.splice(destination.index, 0, movedTask);

    const updatedColumns = {
      ...board.columns,
      [sourceCol]: tasks,
    };

    onUpdateBoard({ ...board, columns: updatedColumns });
  }

  // DIFFERENT COLUMN (move)
  else {
    const sourceTasks = [...board.columns[sourceCol]];
    const destTasks = [...board.columns[destCol]];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    const updatedColumns = {
      ...board.columns,
      [sourceCol]: sourceTasks,
      [destCol]: destTasks,
    };

    onUpdateBoard({ ...board, columns: updatedColumns });
  }
}

  // Add a new task to a specific column
  function handleAddTask(columnId, taskData) {
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskData.title,
      priority: taskData.priority,
      deadline: taskData.deadline,
    }

    const updatedColumns = {
      ...board.columns,
      [columnId]: [...board.columns[columnId], newTask],
    }

    onUpdateBoard({ ...board, columns: updatedColumns })
  }

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
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-5 overflow-x-auto pb-4">
          {columns.map((col) => (
            <Column
              key={col.id}
              title={col.title}
              columnId={col.id}
              tasks={board.columns[col.id] || []}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default KanbanBoard;