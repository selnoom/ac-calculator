import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="modal-content bg-gray-800 text-white rounded shadow-lg p-8 m-4 w-[70%] h-[70%]">
        {children}
      </div>
    </div>,
    document.getElementById('portal-root')
  );
};

export default Modal;
