import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const result = await login(username, password);
      if (!result.success) {
        setErrors(result.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="flex w-full max-w-4xl bg-white overflow-hidden rounded-lg shadow-lg flex-col md:flex-row">
        {/* Branding Panel */}
        <div className="hidden md:flex md:w-1/3 flex-col items-center justify-center p-8 bg-blue-600 text-white">
          <div className="h-20 w-20 bg-white rounded-full mb-4 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">🚀</span>
          </div>
          <h1 className="text-2xl font-extrabold">LaunchKit</h1>
          <p className="text-sm mt-2 text-center">Welcome back!</p>
        </div>

        {/* Form Panel */}
        <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
          {/* Mobile Branding */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-3xl font-extrabold text-blue-600">LaunchKit</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back! Sign in to continue.</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username[0]}</p>
              )}
            </div>

            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Your secret password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password[0]}</p>
              )}
            </div>

            {errors.non_field_errors && (
              <p className="text-red-600 text-sm">{errors.non_field_errors[0]}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              Let’s Go 🚀
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

          {/* Footer Text */}
          <p className="text-xs text-gray-400 mt-8 text-center">
            © 2025 LaunchKit. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
