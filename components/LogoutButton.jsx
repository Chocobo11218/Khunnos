"use client";
import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
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
        <div className="flex flex-col items-center justify-center">
            <button
                onClick={handlelogout}
                className="border-1 font-bold hover:bg-[#EBF0CB] p-2"
                style={{ borderRadius: "16px" }}
            >
                Logout
            </button>
        </div>
    );
}

export default LogoutButton;