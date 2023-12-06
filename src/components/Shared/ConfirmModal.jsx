const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-pink-200 p-6 rounded w-full max-w-sm mx-auto">
        <h3 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this?
        </h3>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
