"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import app from "../config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LoginButton = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push("/");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account", // Forces Google to show account selection
    });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-10">
        <button
          onClick={signInWithGoogle}
          className="text-white text-xl p-4 hover:scale-110 transition-transform duration-300 hover:shadow-lg"
          style={{ backgroundColor: "#FF803D", borderRadius: "26px" }}
        >
            Sign in with Google
        </button>
    </div>
  );
};

export default LoginButton;