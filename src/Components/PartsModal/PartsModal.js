import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen, onCloseModal }) => { // <-- Extract the onCloseModal prop
  if (!isOpen) return null;

  const handleContentClick = (event) => {
    event.stopPropagation(); // Prevent event from reaching the modal background
  }

  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-60"
         onClick={onCloseModal}> {/* Attach the handler to the modal background */}
      <div className="modal-content bg-gray-800 text-white rounded shadow-lg p-8 m-4 w-[70%] h-[70%] overflow-auto"
      onClick={handleContentClick}> {/* Stop event propagation for the content div */}
        {children}
      </div>
    </div>,
    document.getElementById('portal-root')
  );
};

export default Modal;
