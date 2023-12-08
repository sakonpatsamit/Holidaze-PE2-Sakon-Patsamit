import React, { useEffect, useState } from "react";
import Navigation from "../Shared/Navigation";
import Footer from "../Shared/Footer";
import VenueCard from "./VenueCard";
import { getVenues } from "../../services/venues";
import Balcony from "../../assets/balcony.jpg";
import Hero from "./Hero";
import LoadingSpinner from "../Shared/Loading";

const HomePage = () => {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Holidaze - Homepage";
    async function _getVenues() {
      try {
        let _venues = await getVenues();
        setVenues(_venues);
        setFilteredVenues(_venues);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setIsLoading(false);
      }
    }

    _getVenues();
  }, []);

  const handleSearch = (query) => {
    const _filteredVenues = venues.filter(
      (venue) => venue.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
    setFilteredVenues(_filteredVenues);
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navigation onSearch={handleSearch} showSearch={true} />
      <main className="flex-grow">
        <Hero image={Balcony} />
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <div className="container mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredVenues.map(
                ({ id, name, description, media, location, meta }) => {
                  return (
                    <VenueCard
                      key={id}
                      id={id}
                      title={name}
                      location={location}
                      description={description}
                      image={media}
                      meta={meta}
                    />
                  );
                }
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
