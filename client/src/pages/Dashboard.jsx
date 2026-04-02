import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

export const Dashboard = () => {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Design UI",
            description: "Landing page design",
            assignedTo: "Mahak",
            priority: "High",
            dueDate: "2026-04-10",
            status: "todo",
          },
        ];
  });

  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      ...newTask,
      status: "todo",
    };

    setTasks([...tasks, task]);

    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      priority: "Medium",
      dueDate: "",
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const columns = [
    { key: "todo", title: "To Do", color: "bg-orange-400" },
    { key: "inprogress", title: "In Progress", color: "bg-pink-400" },
    { key: "done", title: "Done", color: "bg-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-20 pb-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Welcome back</p>
          </div>

          <input
            placeholder="Search tasks..."
            className="px-4 py-2 border rounded-lg"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ADD TASK */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          <input
            placeholder="Title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Assign"
            value={newTask.assignedTo}
            onChange={(e) =>
              setNewTask({ ...newTask, assignedTo: e.target.value })
            }
            className="border px-3 py-2 rounded"
          />

          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            className="border px-3 py-2 rounded"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            className="border px-3 py-2 rounded"
          />

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <Plus size={18} /> Add Task
          </button>
        </div>

        {/* COLUMNS */}
        <div className="grid md:grid-cols-3 gap-6">
          {columns.map((col) => (
            <div key={col.key} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">

              <div className={`p-2 text-white rounded mb-4 ${col.color}`}>
                {col.title}
              </div>

              <div className="space-y-4">
                {tasks
                  .filter(
                    (task) =>
                      task.status === col.key &&
                      task.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.03 }}
                      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{task.title}</h3>
                        <Trash2
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteTask(task.id)}
                        />
                      </div>

                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>

                      <div className="flex justify-between mt-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-500"
                            : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-500"
                            : "bg-green-100 text-green-500"
                        }`}>
                          {task.priority}
                        </span>

                        <span className="text-xs">
                          👤 {task.assignedTo}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 mt-2">
                        Due: {task.dueDate}
                      </p>

                      {/* MOVE BUTTONS */}
                      <div className="flex gap-2 mt-3 text-xs">
                        <button onClick={() => moveTask(task.id, "todo")}>
                          ToDo
                        </button>
                        <button onClick={() => moveTask(task.id, "inprogress")}>
                          Progress
                        </button>
                        <button onClick={() => moveTask(task.id, "done")}>
                          Done
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};