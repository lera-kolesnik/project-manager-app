import NewTask from "./NewTask.jsx";

export default function Tasks({ tasks, onAdd, onDelete }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="mt-8 rounded-md">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center my-4"
            >
              <span className="flex-1 overflow-wrap-break-word rounded-md bg-stone-100 mr-8 p-3">
                {task.text}
              </span>
              <button
                className="text-stone-700 hover:border-stone-400 rounded-md border-2 border-stone-300 px-2 py-2"
                onClick={() => onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
