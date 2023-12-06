import { Link, Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../../services/auth";
import { useEffect, useState } from "react";

const NavigationButtons = () => {
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isSignedIn = isLoggedIn();
    setSignedIn(isSignedIn);
  }, []);

  const handleLogout = () => {
    logout();
    setSignedIn(false);
    navigate("/login");
  };

  if (signedIn) {
    return (
      <>
        <nav className="navbar flex justify-between items-center">
          <Link
            to="/profile"
            className="text-gray-900 hover:text-white hover:bg-pink-700 font-semibold text-lg py-2 px-4 rounded transition duration-300 flex items-center"
          >
            <span role="img" aria-label="Person" className="mr-2">
              👤
            </span>
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-gray-900 text-white hover:bg-pink-700 font-bold py-2 px-4 rounded transition duration-300"
          >
            Log out
          </button>
        </nav>
      </>
    );
  } else {
    return (
      <Link
        to="/login"
        className="bg-gray-900 text-white hover:bg-pink-700 font-bold py-2 px-4 rounded transition duration-300"
      >
        Login
      </Link>
    );
  }
};

export default NavigationButtons;
