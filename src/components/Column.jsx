import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

function Column({ title, tasks, onDropTask }) {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item, monitor) => {
      const hoverIndex = tasks.length;
      const newOrder =
        hoverIndex > 0 ? Math.max(...tasks.map((t) => t.order ?? 0)) + 1 : 0;

      onDropTask(item.id, title, newOrder);
    },
  });

  return (
    <div ref={drop} className="bg-white p-4 rounded shadow min-h-[400px]">
      <h2 className="text-lg text-black font-semibold mb-4">{title}</h2>
      {tasks
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
    </div>
  );
}

export default Column;
