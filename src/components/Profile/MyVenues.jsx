import { useEffect, useState } from "react";
import { deleteVenue } from "../../services/venues";
import { getMyVenues } from "../../services/profile";
import LoadingSpinner from "../Shared/Loading";
import Alert from "../Shared/Alert";
import ConfirmModal from "./ConfirmModal";
import EditVenueModal from "./EditVenueModal";
import BookingsModal from "./BookingModal";

const MyVenues = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [myVenues, setMyVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [selectedVenueForBooking, setSelectedVenueForBooking] = useState(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleBookingsModal = (venue) => {
    setSelectedVenueForBooking(venue);
    setIsBookingsModalOpen(!isBookingsModalOpen);
  };

  const toggleModal = (venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(!isModalOpen);
  };

  const updateShowModal = (index) => {
    let newArray = [...isConfirmModalOpen];
    newArray[index] = !newArray[index];
    setIsConfirmModalOpen(newArray);
  };

  useEffect(() => {
    getMyVenues()
      .then((res) => {
        setMyVenues(res || []);
        setIsConfirmModalOpen(res.map(() => false));
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingSpinner />;
  else if (error)
    return (
      <Alert
        type="error"
        title="Something went wrong"
        text="We were unable to load your venues. Please refresh the page to try again."
      />
    );
  else
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-5">Your Venues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myVenues.length <= 0 && (
            <div className="col-span-2">
              <Alert
                title="You don't own any venues"
                text="Click 'Create venue' to register a new venue."
              />
            </div>
          )}
          {myVenues.map((venue, index) => (
            <div
              key={index}
              className="border border-gray-300  rounded-lg shadow-lg p-4 m-4"
            >
              {venue.media.length > 0 ? (
                <img
                  src={venue.media[0]}
                  alt={venue.name}
                  className="w-full h-64 object-cover rounded-lg shadow-sm mb-4"
                />
              ) : (
                <img
                  src="../public/placeholder-house.png"
                  alt="Placeholder"
                  className="w-full h-64 object-cover rounded-lg shadow-sm mb-4"
                />
              )}
              <h3 className="text-2xl font-semibold mb-2">{venue.name}</h3>
              <p className="mb-4 text-md text-gray-600">{venue.description}</p>
              <div className="flex flex-wrap justify-between gap-2">
                <button
                  onClick={() => toggleModal(venue)}
                  className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-pink-700 transition duration-300 ease-in-out flex-grow"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleBookingsModal(venue)}
                  className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-pink-700 transition duration-300 ease-in-out flex-grow"
                >
                  View Bookings
                </button>
                <button
                  onClick={() => updateShowModal(index)}
                  className="px-4 py-2 bg-pink-200 text-gray-600 rounded hover:bg-pink-700 transition duration-300 ease-in-out flex-grow"
                >
                  Delete
                </button>
              </div>

              <ConfirmModal
                isOpen={isConfirmModalOpen[index]}
                onClose={() => updateShowModal(index)}
                onConfirm={() => {
                  deleteVenue(venue.id);
                  setIsConfirmModalOpen(false);
                }}
              />
            </div>
          ))}
        </div>
        {isModalOpen && (
          <EditVenueModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            venueData={selectedVenue}
          />
        )}
        {isBookingsModalOpen && (
          <BookingsModal
            bookings={selectedVenueForBooking.bookings}
            isOpen={isBookingsModalOpen}
            onClose={() => setIsBookingsModalOpen(false)}
            venue={selectedVenueForBooking}
          />
        )}

        <div className="mt-6 flex justify-start space-x-4">
          <button
            onClick={() => toggleModal(null)}
            className="px-5 py-3 bg-gray-900 text-white hover:bg-pink-700 rounded-lg"
          >
            Create Venue
          </button>
        </div>
      </div>
    );
};

export default MyVenues;
