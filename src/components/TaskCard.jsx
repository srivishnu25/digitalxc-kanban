import { useDrag } from "react-dnd";

function TaskCard({ task }) {
  const [, drag] = useDrag({
    type: "task",
    item: { id: task.id },
  });

  return (
    <div
      ref={drag}
      className="bg-gray-200 p-3 mb-3 rounded cursor-move shadow-sm text-black"
    >
      <h3 className="font-medium">{task.title}</h3>
      {task.description && <p className="text-sm">{task.description}</p>}
    </div>
  );
}

export default TaskCard;
