import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../Shared/Footer";
import Navigation from "../Shared/Navigation";
import { getVenue } from "../../services/venues";
import { createBooking } from "../../services/booking";

const SpecificPostPage = () => {
  const confirmationDialog = useRef(null);

  const [venueId, setVenueId] = useState(null);
  const [venueBookings, setVenueBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [todayDate, setTodayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const post = {
    imageUrl: "beach.jpg",
    title: "ZZZZZZZZXzzzzzzzzz2.5",
    rating: 5.0,
    price: "42,069",
    location: "someaddressrte, someCity2, Norway",
    description: "A description of the venue.",
    maxGuests: 2,
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const _venueId = queryParams.get("id");

    console.log(_venueId);

    //682244a0-6094-481c-acc4-9cdce16cd955
    if (_venueId) {
      setVenueId(_venueId);
      getVenue(_venueId).then((venue) => {
        if (venue && venue.bookings) {
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
      });
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
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navigation />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={post.imageUrl}
              alt="Venue"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                {post.title}
              </h1>
              <div className="flex items-center mb-6">
                <span className="text-pink-500 text-2xl">{`${post.rating} ★`}</span>
                <span className="ml-3 text-gray-900 text-lg">
                  ({post.rating})
                </span>
              </div>
              <p className="text-2xl text-gray-900 mb-6">Price: {post.price}</p>
              <p className="text-lg text-gray-700 mb-6">
                Location: {post.location}
              </p>
              <p className="text-gray-800 mb-6">{post.description}</p>
              <p className="text-lg text-gray-700">
                Max Guests: {post.maxGuests}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Want to book this venue?
            </h2>
            <div className="">
              <DatePicker
                allowSameDay={true}
                excludeDates={venueBookings}
                selected={startDate}
                minDate={todayDate}
                onChange={(date) => handleStartDateSelect(date)}
                className="form-input w-full text-center border-2 border-pink-500 rounded-md"
                wrapperClassName="date-picker-wrapper"
                calendarClassName="border-2 border-pink-500 rounded-lg shadow-xl bg-white"
              />
              <DatePicker
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
      </main>
      <Footer />
    </div>
  );
};

export default SpecificPostPage;
