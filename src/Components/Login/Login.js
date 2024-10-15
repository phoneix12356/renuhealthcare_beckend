import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Destructure the user and setUser from the context
  const {user, setUser } = useContext(UserContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password }
      );

      if (response.data.user) {
        setUser(response.data.user); // Use setUser from the context
        console.log(user)

        if (response.data.token) {
          localStorage.setItem("userToken", response.data.token);
          navigate("/Course"); // Redirect on successful login
        }
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm"
      >
        <img src="./logo.png" className="h-20 mx-auto mb-4" alt="logo" />
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
          <span
            className="absolute top-10 right-4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁" : "👁‍🗨"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Login
        </button>

        <p className="text-center mt-4 text-gray-500">
          New here?{" "}
          <Link to="/signup" className="text-indigo-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
