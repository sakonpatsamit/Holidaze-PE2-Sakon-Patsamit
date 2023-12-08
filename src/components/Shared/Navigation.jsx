import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationButtons from "./NavigationButtons";

const Navigation = ({ onSearch, showSearch = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    onSearch(searchTerm);
  };

  return (
    <nav className="bg-pink-200 p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link
          to="/"
          className="text-3xl font-bold text-gray-900 py-2 px-4"
          style={{ fontFamily: "'Roboto', san serif" }}
        >
          Holidaze
        </Link>

        <button
          className="text-gray-900 inline-flex items-center justify-center p-2 rounded-md md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto mt-4 md:mt-0`}
      >
        {showSearch && (
          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Search Venues"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-200 flex-grow"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white hover:bg-pink-700 p-2 rounded-r-lg"
            >
              Search
            </button>
          </form>
        )}
        <NavigationButtons />
      </div>
    </nav>
  );
};

export default Navigation;
