import React, { useState } from "react";
import { registerUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    registerUser(username, email, password, imageUrl, false).then((res) => {
      if (res) {
        navigate("/login");
        setIsLoading(false);
      }
      console.log(res);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-200">
      <div className="p-6 max-w-md w-full bg-white rounded-md shadow-md">
        <h2
          className="text-2xl font-bold text-center text-gray-700 mb-4"
          style={{ fontFamily: "Dancing Script, san-serif" }}
        >
          Holidaze
        </h2>
        <form onSubmit={handleRegistration}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={username}
              placeholder="Your name"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="avatar"
            >
              Avatar URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="avatar"
              type="text"
              placeholder="Paste your avatar URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isVenueManager"
            >
              <input
                className="mr-2 leading-tight"
                id="isVenueManager"
                type="checkbox"
              />
              Sign up as a Venue Manager
            </label>
          </div>

          <div className="flex items-center justify-between">
            {isLoading ? (
              <p>Please wait</p>
            ) : (
              <button
                onClick={handleRegistration}
                className="bg-gray-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
