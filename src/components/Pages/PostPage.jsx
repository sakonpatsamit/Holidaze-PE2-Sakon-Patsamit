import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../Shared/Footer";
import Navigation from "../Shared/Navigation";
import { getVenue } from "../../services/venues";
import { createBooking } from "../../services/booking";
import LoadingSpinner from "../Shared/Loading";
import Alert from "../Shared/Alert";
import ImageModal from "../Shared/ModalImage";

const SpecificPostPage = () => {
  const confirmationDialog = useRef(null);

  const [venueId, setVenueId] = useState(null);
  const [venue, setVenue] = useState(null);
  const [venueBookings, setVenueBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [todayDate, setTodayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const _venueId = queryParams.get("id");

    console.log(_venueId);

    if (_venueId) {
      setVenueId(_venueId);
      getVenue(_venueId)
        .then((venue) => {
          if (venue) {
            setVenue(venue);
            if (venue.bookings) {
              const bookings = venue.bookings;
              const excludeDates = [];

              for (let i = 0; i < bookings.length; i++) {
                const booking = bookings[i];
                const dates = [];
                let date = new Date(booking.dateFrom);

                while (date <= new Date(booking.dateTo)) {
                  dates.push(new Date(date));
                  date.setDate(date.getDate() + 1);
                }

                excludeDates.push(...dates);
              }

              excludeDates.sort((a, b) => a - b);
              setVenueBookings(excludeDates);
            }
          } else {
            setError(true);
          }

          setIsLoading(false);
        })
        .catch((error) => {
          setError(true);
          setIsLoading(false);
        });
    } else {
      setError(true);
      setIsLoading(false);
    }
  }, []);

  const handleStartDateSelect = (date) => {
    const selectedDate = new Date(date);

    setStartDate(date);
    setEndDate(date);

    let _maxDate = new Date(date);
    let maxDateIdx = venueBookings.findIndex((d) => {
      return d > _maxDate;
    });

    if (maxDateIdx == -1) {
      _maxDate = null;
    } else {
      _maxDate = new Date(venueBookings[maxDateIdx]);
      _maxDate.setDate(_maxDate.getDate() - 1);
    }

    setMaxDate(_maxDate);
  };

  const handleBooking = () => {
    const booking = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: 1,
      venueId: venueId,
    };

    createBooking(booking).then((res) => {
      console.log(res);
      if (confirmationDialog.current) {
        confirmationDialog.current.showModal();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navigation />
      <main className="flex-grow">
        {isLoading && <LoadingSpinner />}
        {!isLoading && !error && venue && (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative cursor-pointer hover:opacity-90">
                <img
                  src={venue.media[0]}
                  alt={venue.name}
                  onClick={handleImageClick}
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="p-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                  {venue.name}
                </h1>
                <div className="flex items-center mb-6">
                  <span className="text-pink-500 text-2xl">{`${venue.rating} ★`}</span>
                  <span className="ml-3 text-gray-900 text-lg">
                    ({venue.rating})
                  </span>
                </div>
                <p className="text-2xl text-gray-900 mb-6">
                  Price: {venue.price}
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Location: {venue.location.city}, {venue.location.country}
                </p>
                <p className="text-gray-800 mb-6">{venue.description}</p>
                <p className="text-lg text-gray-700">
                  Max Guests: {venue.maxGuests}
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Want to book this venue?
              </h2>
              <div className="flex space-x-4">
                <div className="date-picker-container">
                  <label
                    htmlFor="startDate"
                    className="block text-lg font-medium text-gray-700"
                  >
                    From
                  </label>
                  <DatePicker
                    id="startDate"
                    allowSameDay={true}
                    excludeDates={venueBookings}
                    selected={startDate}
                    minDate={todayDate}
                    onChange={(date) => handleStartDateSelect(date)}
                    className="form-input w-full text-center border-2 border-pink-500 rounded-md"
                    wrapperClassName="date-picker-wrapper"
                    calendarClassName="border-2 border-pink-500 rounded-lg shadow-xl bg-white"
                  />
                </div>

                <div className="date-picker-container">
                  <label
                    htmlFor="endDate"
                    className="block text-lg font-medium text-gray-700"
                  >
                    To
                  </label>
                  <DatePicker
                    id="endDate"
                    allowSameDay={true}
                    excludeDates={venueBookings}
                    selected={endDate}
                    minDate={startDate}
                    maxDate={maxDate}
                    onChange={(date) => setEndDate(date)}
                    className="form-input w-full text-center border-2 border-pink-500 rounded-md"
                    wrapperClassName="date-picker-wrapper"
                    calendarClassName="border-2 border-pink-500 rounded-lg shadow-xl bg-white"
                  />
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-80 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-pink-700 transition duration-300 mt-4"
              >
                Book Now
              </button>

              <dialog
                ref={confirmationDialog}
                className="p-8 w-96 max-w-full rounded shadow-2xl"
              >
                <h2 className="font-bold text-xl">Your booking is confirmed</h2>
                <p>Check-in: {startDate.toLocaleDateString()} (after 2PM)</p>
                <p>Check-out: {endDate.toLocaleDateString()} (before 10AM)</p>
                <form method="dialog">
                  <button className="bg-black rounded font-bold text-lg mt-4 text-white px-4 py-2 hover:bg-gray-800 transition-colors">
                    Close
                  </button>
                </form>
              </dialog>
            </div>
          </div>
        )}
        {!isLoading && error && (
          <Alert
            title="Something went wrong!"
            text="Please return to the homepage and try again"
            type="error"
          />
        )}
      </main>
      <Footer />
      {venue && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageSrc={venue.media[0]}
        />
      )}
    </div>
  );
};

export default SpecificPostPage;
