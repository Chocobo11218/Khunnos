"use client";
import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../../config";

function Dashboard() {
    const auth = getAuth();
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log("User is authenticated:", user, user.email);
            } else {
                // setUser(null);
                router.push("/"); // Redirect to the login page if not authenticated
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const handlelogout = async () => {
        try {
            await signOut(auth);
            router.push("/"); // Redirect to the login page after logout
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };

    if (!user) {
        return null; // Prevent rendering until auth state is resolved
      }
      
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome to the Dashboard, {user ? user.displayName : "Guest"}!
                </h1>
                <button
                    onClick={handlelogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;