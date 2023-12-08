import { useState, useEffect } from "react";
import { getBookings } from "../../services/booking";
import LoadingSpinner from "../Shared/Loading";
import Alert from "../Shared/Alert";

const MyBookings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings()
      .then((res) => {
        console.log(res);
        setBookings(res.booking);
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
        text="We were unable to load your bookings. Please refresh the page to try again."
      />
    );
  else
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-5">Your Bookings</h2>
        <div className="grid grid-cols-1 gap-6">
          {bookings.length <= 0 && (
            <div className="col-span-2">
              <Alert
                title="You don't have any bookings"
                text="Book a venue and come back here to see the details."
              />
            </div>
          )}
          {bookings.map((booking) => (
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
      </div>
    );
};

export default MyBookings;
