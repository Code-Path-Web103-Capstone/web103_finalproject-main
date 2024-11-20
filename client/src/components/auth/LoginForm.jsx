import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, handleGoogleLogin, handleGoogleCallback } from "../../services/api.js";
import { useUser } from "../../services/context.jsx";

const LoginForm = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (window.location.hash.includes("access_token")) {
      handleGoogleCallback(login, navigate).catch((err) => setError(err.message));
    }
  }, [login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const data = await loginUser(email, password);
      setSuccess(data.message || "Login successful");
      const userData = data.userData;
      console.log(userData);
      login(userData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6 rounded-xl bg-[#D9D9D9] px-8 pb-12 pt-8 shadow-lg">
      <h2 className="text-center text-4xl font-bold text-gray-800">Login</h2>
      <div className="flex items-center justify-center">
        <p>
          Don’t have an account?
          <Link to="/signup" className="ml-1 text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      {error && <p className="text-center text-sm text-red-600">{error}</p>}
      {success && <p className="text-center text-sm text-green-600">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            placeholder="Email address:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3A405A] focus:ring-offset-0"
          />
        </div>
        <div>
          <input
            placeholder="Password:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3A405A] focus:ring-offset-0"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[#3A405A] px-4 py-2 font-medium text-white hover:bg-[#292e40] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
        >
          Log In
        </button>
        <div className="flex h-10 items-center justify-center space-x-2">
          <hr className="h-0.5 w-1/2 bg-[#3A405A]" />
          <p className="text-[#3A405A]"> or </p>
          <hr className="h-0.5 w-1/2 bg-[#3A405A]" />
        </div>
        <button
          type="button"
          onClick={() => handleGoogleLogin().catch((err) => setError(err.message))}
          className="w-full rounded-md bg-white px-4 py-2 font-medium text-[#3A405A] focus:outline-none focus:ring-2 focus:ring-[#3A405A] focus:ring-offset-0"
        >
          Log In with Google
        </button>
      </form>
    </div>
  );
};

export default LoginForm;