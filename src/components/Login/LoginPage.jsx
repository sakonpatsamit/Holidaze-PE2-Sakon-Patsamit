import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { useState } from "react";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Holidaze - Login";
  }, []);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    login(username, password).then((res) => {
      // TODO: Error message on failed login
      if (res) {
        navigate("/");
      }
    });
  };

  const handleSignUpClick = () => {
    navigate("/signup");
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
        <form onSubmit={handleLogin}>
          <div className="mb-6">
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-start space-x-4">
            <button
              className="bg-gray-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>

            <button
              className="bg-gray-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
