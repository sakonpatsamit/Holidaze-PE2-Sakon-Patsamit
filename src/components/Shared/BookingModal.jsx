const BookingsModal = ({ isOpen, onClose, venue }) => {
  if (!isOpen || !venue || !venue.bookings) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md mx-auto shadow-xl relative animate-glow">
        <h2 className="text-3xl font-semibold text-center mb-6">Booked</h2>
        <div className="space-y-4 overflow-auto max-h-80">
          {venue.bookings.map((booking) => (
            <div
              key={booking.id}
              className="border-l-4 border-pink-500 bg-pink-100 rounded-lg p-4"
            >
              <p className="mb-1">
                Check-in:{" "}
                <strong>
                  {new Date(booking.dateFrom).toLocaleDateString()}
                </strong>
              </p>
              <p>
                Check-out:{" "}
                <strong>{new Date(booking.dateTo).toLocaleDateString()}</strong>
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-900 hover:bg-pink-700 text-white font-semibold py-1 px-3 rounded-md text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingsModal;
