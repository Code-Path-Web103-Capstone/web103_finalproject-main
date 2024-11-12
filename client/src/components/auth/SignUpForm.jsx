import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../services/api.js";
import { useUser } from "../../services/context.jsx";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const data = await signUpUser(username, email, password);
      console.log(data);
      setSuccess(data.message || "User created successfully");
      // Store user data in the context
      const userData = data.authData.user;
      login(userData); // Populate context with user data
      navigate("/");
    } catch (err) {
      setError(err.message || "Sign up failed");
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6 rounded-xl bg-[#D9D9D9] px-8 pb-12 pt-8 shadow-lg">
      {/* Title */}
      <h2 className="text-center text-4xl font-bold text-gray-800">Sign Up</h2>
      {/* Link to Login */}
      <div className="flex items-center justify-center">
        <p>
          Have an account?
          <Link to="/auth/login" className="ml-1 text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
      {/* Displays if Signup fails */}
      {error && <p className="text-center text-sm text-red-600">{error}</p>}
      {/* Displays if Signup is successful */}
      {success && (
        <p className="text-center text-sm text-green-600">{success}</p>
      )}
      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username  input */}
        <div>
          <input
            placeholder="Username:"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3A405A] focus:ring-offset-0"
          />
        </div>
        {/* Email address input */}
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
        {/* Password input */}
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
        {/* Submit Form */}
        <button
          type="submit"
          className="w-full rounded-md bg-[#3A405A] px-4 py-2 font-medium text-white hover:bg-[#292e40] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
        >
          Sign Up
        </button>
        {/* Add Divider */}
        <div className="flex h-10 items-center justify-center space-x-2">
          <hr className="h-0.5 w-1/2 bg-[#3A405A]" />
          <p className="text-[#3A405A]"> or </p>
          <hr className="h-0.5 w-1/2 bg-[#3A405A]" />
        </div>
        {/* Continue with Google */}
        <button
          type="submit"
          className="w-full rounded-md bg-white px-4 py-2 font-medium text-[#3A405A] focus:outline-none focus:ring-2 focus:ring-[#3A405A] focus:ring-offset-0"
        >
          Sign Up with Google
        </button>
        {/* Continue with Github */}
        <button
          type="submit"
          className="w-full rounded-md bg-white px-4 py-2 font-medium text-[#3A405A] focus:outline-none focus:ring-2 focus:ring-[#3A405A] focus:ring-offset-0"
        >
          Sign Up with Github
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
