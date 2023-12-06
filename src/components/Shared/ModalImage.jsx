const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-4 rounded-lg overflow-auto max-h-full max-w-full">
        <img
          src={imageSrc}
          alt="Clickable Image"
          className="max-w-full max-h-[80vh] h-auto rounded "
        />

        <button
          onClick={onClose}
          className="mt-4 bg-gray-900 text-white text-lg py-3 px-6 rounded hover:bg-pink-700 shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
