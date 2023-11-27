import Tasks from "./Tasks.jsx";
import { formatDate } from "../helpers/dateUtils.js";

export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
}) {
  const formattedDate = formatDate(project.dueDate);

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-gray-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-600 mb-2">
            {project.title}
          </h1>
          <button
            className="px-1 py-1 rounded-md text-lg text-gray-600 text-decoration-line: underline hover:bg-rose-200"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-gray-400">{formattedDate}</p>
        <p className="mb-4 text-gray-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tasks
        onAdd={onAddTask}
        onDelete={onDeleteTask}
        tasks={tasks[project?.id] || []}
      />
    </div>
  );
}
