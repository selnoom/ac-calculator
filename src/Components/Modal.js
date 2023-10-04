import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('portal-root')
  );
};

export default Modal;
