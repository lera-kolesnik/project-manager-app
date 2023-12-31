import { useRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

import Button from "./Button";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-gray-900/90 p-4 rounded-md chadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.querySelector("#modal-root")
  );
});

export default Modal;
