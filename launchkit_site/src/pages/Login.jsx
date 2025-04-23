import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Fixed typo here

const Login = () => {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // For general messages
  const [errors, setErrors] = useState({}); // For specific field errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Clear any previous messages
    setErrors({}); // Clear any previous errors

    try {
      await login(username, password);
      // Optionally, redirect after successful login
      // <Navigate to="/dashboard" />
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        // Assuming backend sends errors in a format like { username: ["Invalid username"] }
        setErrors(error.response.data);
        setMessage("Login failed. Please check the errors below.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-4xl bg-white overflow-hidden rounded-lg shadow-lg flex-col md:flex-row">
        {/* Branding Panel */}
        <div className="hidden md:flex md:w-1/3 flex-col items-center justify-center p-8 bg-blue-600 text-white">
          <div className="h-20 w-20 bg-white rounded-full mb-4 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl"></span>
          </div>
          <h1 className="text-2xl font-extrabold">LaunchKit</h1>
          <p className="text-sm mt-2 text-center">Welcome back!</p>
        </div>

        {/* Form Panel */}
        <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
            Log In
          </h2>

          {/* General Error Message */}
          {message && (
            <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {/* Display username-related error */}
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username[0]}</p>
              )}
            </div>

            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {/* Display password-related error */}
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
