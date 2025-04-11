import { useCallback, useEffect, useState } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { api } from "./utils/api";

const columns = ["To Do", "In Progress", "Done"];

// --- API UTILS ---

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api.get().then(setTasks).catch(console.error);
  }, []);

  const addTask = async (task) => {
    try {
      const sameColumnTasks = tasks.filter((t) => t.status === task.status);
      const maxOrder =
        sameColumnTasks.length > 0
          ? Math.max(...sameColumnTasks.map((t) => t.order || 0))
          : 0;

      const newTask = await api.post({ ...task, order: maxOrder + 1 });
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskStatus = useCallback(async (id, status, order) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, order } : t))
    );

    try {
      await api.update(id, { status, order });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Task Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Task
        </button>
      </div>

      {showForm && (
        <TaskForm onClose={() => setShowForm(false)} onSubmit={addTask} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {columns.map((col) => (
          <Column
            key={col}
            title={col}
            tasks={tasks
              .filter((task) => task.status === col)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))}
            onDropTask={updateTaskStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
