import React from "react";
import Navigation from "../Shared/Navigation"; // Adjust the import path as needed
import Footer from "../Shared/Footer";

const VenuesPage = () => {
  // Placeholder data for venues
  const venues = [
    { id: 1, name: "Venue One", description: "Description for Venue One" },
    { id: 2, name: "Venue Two", description: "Description for Venue Two" },
    { id: 3, name: "Venue Three", description: "Description for Venue Three" },
    // Add more placeholder venues as needed
  ];

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navigation />
      <main className="flex-grow">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-center mb-8 py-2 px-8">
            Explore Our Venues
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <img
                  className="w-full h-40 object-cover"
                  src="/view.jpg"
                  alt={venue.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{venue.name}</div>
                  <p className="text-gray-700 text-base">{venue.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VenuesPage;
