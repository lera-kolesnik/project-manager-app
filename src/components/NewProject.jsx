import { useRef } from "react";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const onChange = () => {
    const currentDescription = description.current;
    const newHeight = currentDescription.scrollHeight;

    currentDescription.style.height = `${newHeight > 152 ? newHeight : 152}px`;

    requestAnimationFrame(() => {
      currentDescription.style.height = "auto";
      currentDescription.style.height = `${currentDescription.scrollHeight}px`;
    });
  };

  function handleSave() {
    const enteredTitle = title.current.value.trim();
    const enteredDescription = description.current.value.trim();
    const enteredDueDate = dueDate.current.value.trim();

    if (
      enteredTitle === "" ||
      enteredDescription === "" ||
      enteredDueDate === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-gray-700 my-4">Invalid Input</h2>
        <p className="text-gray-600 mb-4">
          Oops... looks like you forgot to enter a value
        </p>
        <p className="text-gray-600 mb-4">
          Please make sure you provide a valid value for every input field
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex item-center justify-end gap-2 my-4">
          <li>
            <button
              className="px-5 py-2 rounded-md text-gray-800 text-decoration-line: underline hover:bg-indigo-200"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-gray-700 text-gray-50 hover:bg-gray-800"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input
            textarea
            ref={description}
            label="Description"
            className="resize-none w-full p-1 border-b-2 rounded-sm border-gray-300 bg-gray-200 text-gray-600 focus:outline-none focus:border-gray-600 mb-4"
            style={{
              minHeight: "152px",
              overflow: "hidden",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
            onChange={onChange}
          />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}
