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
import { isLoggedIn } from "../../services/auth";

const SpecificPostPage = ({}) => {
  const confirmationDialog = useRef(null);

  const [venueId, setVenueId] = useState(null);
  const [venue, setVenue] = useState(null);
  const [venueBookings, setVenueBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const [todayDate, setTodayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  useEffect(() => {
    const isSignedIn = isLoggedIn();
    setSignedIn(isSignedIn);
  }, []);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const _venueId = queryParams.get("id");
    document.title = "Holidaze - Spesific Post";

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
                <div className="flex flex-row items-center justify-end gap-3 float-right">
                  {venue.meta.wifi && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="20"
                      viewBox="0 0 640 512"
                    >
                      <path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
                    </svg>
                  )}
                  {venue.meta.parking && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                    >
                      <path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                    </svg>
                  )}
                  {venue.meta.breakfast && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="14"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
                    </svg>
                  )}
                  {venue.meta.pets && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                    >
                      <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
                    </svg>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                  {venue.name}
                </h1>
                <div className="flex items-center mb-6">
                  <span className="text-pink-500 text-1xl">{`${venue.rating} ★`}</span>
                  <span className="ml-3 text-gray-900 text-lg">
                    ({venue.rating})
                  </span>
                </div>
                <p className="text-1xl text-gray-900 mb-6">
                  <span className="font-bold">Description:</span>{" "}
                  {venue.description}
                </p>
                <p className="text-1xl text-gray-900 mb-6">
                  <span className="font-bold">Price:</span> {venue.price}
                </p>
                <p className="text-sm text-gray-700 mb-6">
                  <span className="font-bold">Location</span> :{" "}
                  {venue.location.city}, {venue.location.country}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Max Guests</span> :{" "}
                  {venue.maxGuests}
                </p>
              </div>
            </div>

            <div className="bg-pink-200 shadow-lg rounded-lg overflow-hidden mt-8 p-6 ">
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
              {signedIn ? (
                <button
                  onClick={handleBooking}
                  className="w-80 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-pink-700 transition duration-300 mt-4"
                >
                  Book Now
                </button>
              ) : (
                <p>Please log in to book this venue.</p>
              )}
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
