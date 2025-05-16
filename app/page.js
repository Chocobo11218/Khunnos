"use client";
import { useAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateCalendar from "../components/CreateCalendar";
import LoginButton from "../components/LoginButton";

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Web App Logo"
            className="h-auto w-40 mx-auto rounded-full mt-10"
          />
          <div className="mt-4 text-2xl font-bold">Welcome to Khunnos!</div>
      </div>
      {user ? (
        // User is logged in
        <CreateCalendar />
      ) : (
        // User is not logged in, render the login button
        <LoginButton />
      )}
    </div>
  );
};

export default Home;