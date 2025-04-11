const ENDPOINT = "https://67f8b2102466325443ed6e07.mockapi.io/api/todo/kanban";
export const api = {
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
