"use client";
import { useAuth } from "../app/context/AuthContext";
import Navbar from "./Navbar";

const AuthenticatedNavbar = () => {
  const { user, loading } = useAuth();

  // Don't render Navbar while loading or if user is not logged in
  if (loading || !user) {
    return null;
  }

  return <Navbar />;
};

export default AuthenticatedNavbar;