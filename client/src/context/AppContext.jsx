import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Design new landing page",
      description: "Create a modern, eye-catching landing page",
      priority: "high",
      dueDate: "2026-04-10",
      column: "todo",
    },
    {
      id: "2",
      title: "Implement authentication",
      description: "Add login and signup functionality",
      priority: "medium",
      dueDate: "2026-04-15",
      column: "inProgress",
    },
    {
      id: "3",
      title: "Setup database",
      description: "Configure database schema",
      priority: "high",
      dueDate: "2026-04-05",
      column: "done",
    },
  ]);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (taskId, newColumn) => {
    updateTask(taskId, { column: newColumn });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
};