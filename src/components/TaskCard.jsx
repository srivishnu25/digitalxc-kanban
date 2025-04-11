import { useDrag } from "react-dnd";

function TaskCard({ task, index }) {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task.id, index, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-gray-100 p-3 rounded cursor-move mb-2 shadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="text-black font-bold">{task.title}</h3>
      <p className="text-gray-600 text-sm">{task.description}</p>
    </div>
  );
}

export default TaskCard;
