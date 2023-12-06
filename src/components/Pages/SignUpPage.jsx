import React, { useState } from "react";
import { registerUser } from "../../services/auth";
import LoadingSpinner from "../Shared/Loading";
import Modal from "../Shared/Modal";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (/\s/.test(username)) {
      setUsernameError("Username cannot contain spaces");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    if (!(email.endsWith("@noroff.no") || email.endsWith("@noroff.stud.no"))) {
      setIsModalOpen(true);
      setModalMessage("Please use a @noroff.no or @noroff.stud.no email");
      return;
    }

    setIsLoading(true);
    try {
      const res = await registerUser(
        username,
        email,
        password,
        imageUrl,
        isVenueManager
      );
      console.log(res);
      setModalMessage("Success! Please log in.");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigation("/login");
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
      setModalMessage("Registration failed. Please try again.");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <p>{modalMessage}</p>
        </Modal>

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
                  pattern="^[a-z0-9_]+$"
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
                    checked={isVenueManager}
                    onChange={(e) => setIsVenueManager(e.target.value)}
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
              <div className="text-red-500 text-sm mt-2">
                {usernameError && <p>{usernameError}</p>}
                {passwordError && <p>{passwordError}</p>}
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default SignUpPage;
