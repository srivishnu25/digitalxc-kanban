import { useCallback, useEffect, useMemo, useState } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import axios from "axios";

const columns = ["To Do", "In Progress", "Done"];
const ENDPOINT = "https://67f8b2102466325443ed6e07.mockapi.io/api/todo/kanban";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get(ENDPOINT).then((res) => {
      setTasks(res.data);
    });
  }, []);

  const addTask = async (task) => {
    const res = await axios.post(ENDPOINT, task);
    setTasks((prev) => [...prev, res.data]);
  };

  const updateTaskStatus = useCallback(async (id, status) => {
    await axios.patch(`${ENDPOINT}/${id}`, { status });
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
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
