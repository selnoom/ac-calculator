function CustomConfirmModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl z-10 w-96">
        <p className="text-lg mb-4 text-white">{message}</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition duration-150"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-150"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomConfirmModal;
