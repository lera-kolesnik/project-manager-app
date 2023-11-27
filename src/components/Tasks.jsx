import NewTask from "./NewTask.jsx";

export default function Tasks({ tasks, onAdd, onDelete }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-gray-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="mt-8 rounded-md">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center my-4 relative"
            >
              <span className="flex-1 overflow-wrap-break-word rounded-md bg-gray-100 mr-8 p-3">
                {task.text}
              </span>
              <button
                className="text-gray-700 hover:border-gray-400 rounded-md border-2 border-gray-300 px-2 py-2 relative"
                onClick={() => onDelete(task.id)}
              >
                Clear
                <span className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100"></span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
