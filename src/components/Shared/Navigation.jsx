import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationButtons from "./NavigationButtons";

const Navigation = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu toggle

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    onSearch(searchTerm);
  };

  return (
    <nav className="bg-pink-200 p-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-3xl font-bold text-gray-900 py-2 px-4"
        style={{ fontFamily: "'Dancing Script', san serif" }}
      >
        Holidaze
      </Link>

      {/* Mobile Menu Toggle */}
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

      {/* Menu Items */}
      <div
        className={`flex-col md:flex-row flex items-center space-x-4 md:flex ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search Venues"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white hover:bg-pink-700 p-2 rounded-r-lg"
          >
            Search
          </button>
        </form>
        <NavigationButtons />
      </div>
    </nav>
  );
};

export default Navigation;
