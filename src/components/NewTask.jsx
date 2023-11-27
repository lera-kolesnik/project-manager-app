import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleClick();
    }
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-gray-200"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={enteredTask}
      />
      <button
        className="px-1 py-1 rounded-md text-lg text-gray-700 text-decoration-line: underline hover:text-gray-950 hover:bg-indigo-200"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
