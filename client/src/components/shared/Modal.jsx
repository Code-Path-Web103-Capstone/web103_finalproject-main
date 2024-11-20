import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-96 rounded-md bg-white p-5 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-0 text-2xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body // Renders the modal at the root level of the DOM
  );
};

export default Modal;
