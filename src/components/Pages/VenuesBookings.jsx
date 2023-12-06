import React, { useState } from "react";
import BookingsModal from "../Shared/BookingModal";
import Navigation from "../Shared/Navigation";
import Footer from "../Shared/Footer";

const mockVenues = [
  {
    id: 1,
    name: "Beachside Bungalow",
    image: "https://via.placeholder.com/400",
    bookings: [
      {
        id: 101,
        user: "Alice Johnson",
        checkIn: "2023-07-01",
        checkOut: "2023-07-05",
      },
      {
        id: 102,
        user: "Bob Smith",
        checkIn: "2023-07-10",
        checkOut: "2023-07-15",
      },
    ],
  },
  // ... other venues
];
const VenueBookingsPage = () => {
  const [venues] = useState(mockVenues); // Using mock data
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navigation />
      <div
        className="container mx-auto p-8 flex-grow
    "
      >
        <h1 className="text-3xl font-bold text-center mb-8">Your Venues</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img
                className="w-full h-40 object-cover"
                src={venue.image}
                alt={venue.name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{venue.name}</div>
                <button
                  onClick={() => handleVenueClick(venue)}
                  className="bg-gray-900 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Bookings
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedVenue && (
        <BookingsModal
          venue={selectedVenue}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default VenueBookingsPage;
