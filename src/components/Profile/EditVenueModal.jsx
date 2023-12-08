import { useEffect, useState } from "react";
import { editVenue, createVenue } from "../../services/venues";

const EditVenueModal = ({ isOpen, onClose, venueData = null }) => {
  const [venueName, setVenueName] = useState("");
  const [venueDescription, setVenueDescription] = useState("");
  const [venueCity, setVenueCity] = useState("");
  const [venueCountry, setVenueCountry] = useState("");
  const [venueImage, setVenueImage] = useState("");
  const [venueRating, setVenueRating] = useState(3);
  const [venuePrice, setVenuePrice] = useState(100);
  const [maxGuests, setMaxGuests] = useState("");
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (venueData) {
      console.log(venueData);
      setVenueName(venueData.name);
      setVenueDescription(venueData.description);
      setVenueCity(venueData.location.city);
      setVenueCountry(venueData.location.country);
      setVenueImage(venueData.media[0] || "");
      setVenueRating(venueData.rating);
      setVenuePrice(venueData.price);
      setMaxGuests(venueData.maxGuests);
      setVenueName(venueData.name);
      setWifi(venueData.meta.wifi);
      setParking(venueData.meta.parking);
      setBreakfast(venueData.meta.breakfast);
      setPets(venueData.meta.pets);
    }
  }, [venueData]);

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!venueName) newErrors.venueName = "Venue name is required";
    if (!venueDescription)
      newErrors.venueDescription = "Description is required";
    if (!venueCity) newErrors.venueCity = "City is required";
    if (!venueCountry) newErrors.venueCountry = "Country is required";
    if (!maxGuests) newErrors.maxGuests = "Max guests is required";

    setErrors(newErrors);
    return isValid && Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitAction = venueData ? editVenue : createVenue;
    const submitArgs = venueData
      ? [
          venueData.id,
          venueName,
          venueDescription,
          venueImage,
          venuePrice,
          maxGuests,
          venueRating,
          wifi,
          parking,
          breakfast,
          pets,
          venueCity,
          venueCountry,
        ]
      : [
          venueName,
          venueDescription,
          venueImage,
          venuePrice,
          maxGuests,
          venueRating,
          wifi,
          parking,
          breakfast,
          pets,
          venueCity,
          venueCountry,
        ];

    submitAction(...submitArgs)
      .then((res) => {
        console.log(res);
        onClose();
        if (typeof onSubmitSuccess === "function") {
          onSubmitSuccess();
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-full max-w-md mx-auto">
        <button onClick={onClose} className="float-right text-lg font-bold">
          X
        </button>

        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-4">Create a New Venue</h3>

          <input
            type="text"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            placeholder="Venue Name"
            className="border-2 border-gray-300 rounded p-2 w-full mb-4"
          />
          {errors.venueName && (
            <p className="text-red-500 text-sm mb-4">{errors.venueName}</p>
          )}
          <input
            type="text"
            value={venueDescription}
            onChange={(e) => setVenueDescription(e.target.value)}
            placeholder="Description"
            className="border-2 border-gray-300 rounded p-2 w-full mb-4"
          />
          {errors.venueDescription && (
            <p className="text-red-500 text-sm mb-4">
              {errors.venueDescription}
            </p>
          )}
          <input
            type="text"
            value={venueCity}
            onChange={(e) => setVenueCity(e.target.value)}
            placeholder="City"
            className="border-2 border-gray-300 rounded p-2 w-full mb-4"
          />
          {errors.venueCity && (
            <p className="text-red-500 text-sm mb-4">{errors.venueCity}</p>
          )}
          <input
            type="text"
            value={venueCountry}
            onChange={(e) => setVenueCountry(e.target.value)}
            placeholder="Country"
            className="border-2 border-gray-300 rounded p-2 w-full mb-4"
          />
          {errors.venueCountry && (
            <p className="text-red-500 text-sm mb-4">{errors.venueCountry}</p>
          )}
          <input
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            placeholder="Max Guests"
            className="border-2 border-gray-300 rounded p-2 w-full mb-4"
          />
          {errors.maxGuests && (
            <p className="text-red-500 text-sm mb-4">{errors.maxGuests}</p>
          )}
          <input
            type="text"
            value={venueImage}
            onChange={(e) => setVenueImage(e.target.value)}
            placeholder="Image URL"
            className="border-2 border-gray-300 rounded p-2 w-full mb-4"
          />

          <div className="mb-4">
            <label className="block mb-2">Amenities:</label>
            <div className="flex flex-row gap-3">
              <div className="flex flex-row gap-1 items-center">
                <input
                  type="checkbox"
                  value={wifi}
                  onChange={(e) => setWifi(e.target.checked)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
                <span>WiFi</span>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <input
                  type="checkbox"
                  value={pets}
                  onChange={(e) => setPets(e.target.checked)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
                <span>Pets</span>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <input
                  type="checkbox"
                  value={parking}
                  onChange={(e) => setParking(e.target.checked)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
                <span>Parking</span>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <input
                  type="checkbox"
                  value={breakfast}
                  onChange={(e) => setBreakfast(e.target.checked)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
                <span>Breakfast</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-pink-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVenueModal;
