// components/MainLayout.js
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import NavBar from "../components/nav/NavBar.jsx";
import { UserProvider } from "../services/context.jsx";

const MainLayout = ({ element }) => {
  const location = useLocation();

  // Hide Header and NavBar on /login and /signup routes
  const hideHeaderAndNav =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <UserProvider>
      <main className="flex min-h-screen w-full flex-col items-center">
        {/* Conditionally render Header and NavBar */}
        {!hideHeaderAndNav && <Header />}
        {!hideHeaderAndNav && <NavBar />}
        {element}
      </main>
    </UserProvider>
  );
};

export default MainLayout;
