import React, { createContext, useState, useContext, useEffect } from "react";

// Create the UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [budgetId, setBudgetId] = useState(() => {
    return localStorage.getItem("budgetId") || null;
  });

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    // Save to localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setBudgetId(null);
    // Clear from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("budgetId");
  };

  // Sync budgetId with localStorage
  useEffect(() => {
    if (budgetId) {
      localStorage.setItem("budgetId", budgetId);
    } else {
      localStorage.removeItem("budgetId");
    }
  }, [budgetId]);

  // Sync other states with localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, user, budgetId, setBudgetId, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
