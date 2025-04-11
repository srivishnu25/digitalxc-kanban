import { useState } from "react";

function TaskForm({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title, description: desc, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-[400px] text-black">
        <h2 className="text-xl font-bold mb-4">New Task</h2>
        <input
          className="w-full border border-black/40 rounded-md p-2 mb-5"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border border-black/40 rounded-md p-2 mb-5"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <select
          className="w-full border border-black/40 rounded-md p-2 mb-5"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="text-white px-3 py-1 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
