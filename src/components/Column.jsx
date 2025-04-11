import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

function Column({ title, tasks, onDropTask }) {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => onDropTask(item.id, title),
  });

  return (
    <div ref={drop} className="bg-white p-4 rounded shadow min-h-[400px]">
      <h2 className="text-lg text-black font-semibold mb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Column;
