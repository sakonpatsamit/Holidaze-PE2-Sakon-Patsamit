const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-pink-200 text-gray-900 w-full max-w-md m-auto flex-col flex rounded-lg">
        {children}
        <button className="absolute top-0 right-0 mt-4 mr-4" onClick={onClose}>
          <span className="text-gray-700">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
