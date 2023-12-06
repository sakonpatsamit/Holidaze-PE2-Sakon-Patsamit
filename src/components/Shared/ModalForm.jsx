const ModalForm = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-full max-w-md mx-auto">
        <button onClick={onClose} className="float-right text-lg font-bold">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalForm;
