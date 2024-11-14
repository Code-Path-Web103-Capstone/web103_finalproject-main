import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleOAuthCallback } from "../services/api"; // Assume this API function exists

const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function processOAuthCallback() {
      const hash = window.location.hash.substring(1); // Get the URL fragment after '#'
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        try {
          await handleOAuthCallback(accessToken, refreshToken);
          navigate("/dashboard"); // Redirect after successful login
        } catch (error) {
          console.error("OAuth callback failed:", error);
          navigate("/login"); // Redirect on failure
        }
      }
    }

    processOAuthCallback();
  }, [navigate]);

  return <p>Processing login...</p>;
};

export default AuthCallbackPage;
