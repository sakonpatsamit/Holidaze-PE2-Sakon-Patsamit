const BookingsModal = ({ venue, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md mx-auto shadow-xl relative animate-glow">
        <h2 className="text-3xl font-semibold text-center mb-6">
          {venue.name} Bookings
        </h2>
        <div className="space-y-4 overflow-auto max-h-80">
          {venue.bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <p className="font-medium">Booked by: {booking.user}</p>
              <p>From: {booking.checkIn}</p>
              <p>To: {booking.checkOut}</p>
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
