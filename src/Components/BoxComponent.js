import React, { useState } from 'react';
import Modal from './Modal';

function BoxComponent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div 
        className="w-64 h-32 bg-gray-300 p-4 border border-gray-400 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Box
      </div>

      <Modal isOpen={showModal}>
        <h1>Select a Part</h1>
        {/* Add your list of parts here */}
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default BoxComponent;
