import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Shared/Navigation";
import Footer from "../Shared/Footer";
import VenueCard from "../Shared/VenueCard";
import { getVenues } from "../../services/venues";

const HomePage = () => {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [venues, setVenues] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function _getVenues() {
      let _venues = await getVenues();
      setVenues(_venues);
      setFilteredVenues(_venues.slice(0, 12));
    }

    _getVenues();
  }, []);

  const handleSearch = (query) => {
    const _filteredVenues = venues.filter(
      (venue) => venue.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
    setFilteredVenues(_filteredVenues);
  };

  const handleExploreClick = () => {
    navigate("/venues");
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navigation onSearch={handleSearch} />
      <main className="flex-grow">
        <div className="relative text-center p-8">
          <img
            src="/balcony.jpg"
            alt="Scenic view"
            className="w-full h-96 rounded-lg object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-2xl font-bold text-gray-900 my-4 bg-pink-200 bg-opacity-50 p-2 rounded">
              Every day, a getaway
            </h2>
            <button
              onClick={handleExploreClick}
              className="bg-gray-900 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
              Explore
            </button>
          </div>
        </div>

        {/* Placeholder Cards Section */}
        <div className="container mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredVenues.map(
              ({ id, name, description, media, location }) => {
                return (
                  <VenueCard
                    key={id}
                    id={id}
                    title={name}
                    location={location}
                    description={description}
                    image={media}
                  />
                );
              }
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
