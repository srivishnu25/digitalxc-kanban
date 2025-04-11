import { useCallback, useEffect, useState } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";

const columns = ["To Do", "In Progress", "Done"];
const ENDPOINT = "https://67f8b2102466325443ed6e07.mockapi.io/api/todo/kanban";

// --- API UTILS ---
const api = {
  get: async () => {
    const res = await fetch(ENDPOINT);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },
  post: async (data) => {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
  },
  update: async (id, data) => {
    const res = await fetch(`${ENDPOINT}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  },
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api.get().then(setTasks).catch(console.error);
  }, []);

  const addTask = async (task) => {
    try {
      const newTask = await api.post(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskStatus = useCallback(async (id, status) => {
    // Optimistic UI update
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

    try {
      await api.update(id, { status });
    } catch (err) {
      console.error(err);
      // Revert UI if API fails
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: t.status } : t))
      );
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

      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => (
          <Column
            key={col}
            title={col}
            tasks={tasks.filter((task) => task.status === col)}
            onDropTask={updateTaskStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
