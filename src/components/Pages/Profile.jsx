import React, { useState, useEffect } from "react";
import Navigation from "../Shared/Navigation";
import Footer from "../Shared/Footer";
import LoadingSpinner from "../Shared/Loading";
import { getBookings } from "../../services/booking";
import ModalForm from "../Shared/ModalForm";
import ConfirmModal from "../Shared/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { validateVenueFormData } from "../Shared/ValidateForm";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const navigate = useNavigate();
  const [venueName, setVenueName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      venueName,
      address,
      city,
      zipCode,
      country,
      continent,
      maxGuests,
      imageUrl,
    };

    if (validateVenueFormData(formData)) {
      console.log("Form is valid");
    }
  };

  const handleViewAllClick = () => {
    navigate("/bookedvenues");
  };

  const [bookings, setBookings] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getBookings().then((res) => {
      console.log(res);
    });

    setTimeout(() => {
      setContent();
      setIsLoading(false);
    }, 3000);
  }, []);
  const userProfile = {
    avatarUrl: "https://via.placeholder.com/150",
    bookings: [
      {
        id: 1,
        venue: "Booking 1",
        checkIn: "2023-01-01",
        checkOut: "2023-01-05",
      },
      {
        id: 2,
        venue: "Booking 2",
        checkIn: "2023-02-10",
        checkOut: "2023-02-15",
      },
    ], // Replace with actual data
    venues: ["Venue 1", "Venue 2"], // Replace with actual data
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navigation />

      <main className="flex-grow">
        <div className="max-w-5xl mx-auto p-20">
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center space-y-4 md:space-y-0 md:space-x-8 mb-10">
            <img
              src={userProfile.avatarUrl}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full border-2 border-gray-300"
            />
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-3 text-lg"
                placeholder="New avatar URL"
              />
              <button className="px-5 py-3 bg-gray-900 text-white text-lg rounded hover:bg-pink-700">
                Change Avatar
              </button>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-5">Your Bookings</h2>
            <div className="grid grid-cols-1 gap-6">
              {userProfile.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border-l-4 border-pink-500 bg-pink-100 rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {booking.venue}
                  </h3>
                  <p className="mb-1">
                    Check-in: <strong>{booking.checkIn}</strong>
                  </p>
                  <p>
                    Check-out: <strong>{booking.checkOut}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-5">Your Venues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userProfile.venues.map((venue, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold mb-2">{venue}</h3>
                  <p className="mb-4">Description of the venue...</p>
                  <div className="flex justify-between">
                    <button
                      onClick={toggleModal}
                      className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-pink-700"
                    >
                      Edit
                    </button>

                    <ConfirmModal
                      isOpen={isConfirmModalOpen}
                      onClose={() => setIsConfirmModalOpen(false)}
                      onConfirm={() => {
                        console.log("Item deleted");
                        setIsConfirmModalOpen(false);
                      }}
                    />

                    <button
                      onClick={() => setIsConfirmModalOpen(true)}
                      className="px-4 py-2 bg-pink-200 text-gray-600 rounded hover:bg-pink-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <ModalForm isOpen={isModalOpen} onClose={toggleModal}>
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-4">
                  Create a New Venue
                </h3>

                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="Venue Name"
                  className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                />
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Zip Code"
                  className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                />
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                />
                <input
                  type="text"
                  value={continent}
                  onChange={(e) => setContinent(e.target.value)}
                  placeholder="Continent"
                  className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                />
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  placeholder="Max Guests"
                  className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                />
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Image URL"
                  className="border-2 border-gray-300 rounded p-2 w-full mb-4"
                />

                <div className="mb-4">
                  <label className="block mb-2">Amenities:</label>
                  {/* Implement checkboxes as needed */}
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-pink-700"
                >
                  Submit
                </button>
              </form>
            </ModalForm>
            <div className="mt-6 flex justify-start space-x-4">
              <button
                onClick={toggleModal}
                className="px-5 py-3 bg-gray-900 text-white hover:bg-pink-700 rounded-lg"
              >
                Create Venue
              </button>
              <button
                onClick={handleViewAllClick}
                className="px-5 py-3 bg-gray-900 text-white hover:bg-pink-700 rounded-lg"
              >
                View All
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
