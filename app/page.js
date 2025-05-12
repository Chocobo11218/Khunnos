"use client";
import { useState, useEffect } from "react";
import app from "../config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Dashboard from "./dashboard/page.js";

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setIsLoading(true); // Show loading state
    setError(null); // Clear previous errors
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      if (error.code === "auth/popup-closed-by-user") {
        setError("Sign-in canceled. Please try again.");
      } else {
        setError("Failed to sign in with Google. Please try again.");
      }
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        // User is logged in, render-dashboard or redirect to the dashboard
        <Dashboard />
      ) : (
        // User is not logged in, render the login button
        <div className="flex flex-col items-center">
          <div className="mb-6 text-2xl font-bold">Welcome to Khunnos</div>
          <img
            src="/logo.png"
            alt="Web App Logo"
            className="w-32 h-32 mb-6 rounded-full"
          />
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            onClick={signInWithGoogle}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;