"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaRegCalendarCheck, FaHistory, FaInfoCircle, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../app/context/AuthContext";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // Get user from context

  // If no user is logged in, don't render the Navbar
  //if (!user) {
  //  return null;
  //}

  const username = (user ? user.displayName || user.email : "Guest");

  const sideList = [
    {
      icon: <FaInfoCircle className="text-2xl" />,
      title: "About",
      path: "/about",
    },
    {
      icon: <BsChatLeftTextFill className="text-2xl" />,
      title: "My Chat",
      path: "/chat",
    },
    {
      icon: <FaRegCalendarCheck className="text-2xl" />,
      title: "My Meetings",
      path: "/meeting",
    },
    {
      icon: <FaHistory className="text-2xl" />,
      title: "Chat History",
      path: "/history",
    },
  ];

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEscKeyPress = (e) => {
      if (e.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);

  return (
    <nav 
      className="flex w-full items-center justify-between px-6 h-16 text-gray-700 border-b border-gray-200 z-10"
      style={{ backgroundColor: "#FBFFE3" }}>
      <div className="flex items-center">
        <button className="mr-2" aria-label="Open Menu" onClick={handleDrawer}>
          <GiHamburgerMenu className="text-3xl" />
        </button>

        <span className="text-xl font-bold">Khunnos</span>
      </div>

      {isOpen && (
        <div className="z-10 fixed inset-0 transition-opacity">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
            tabIndex="0"
          ></div>
        </div>
      )}

      <aside
        className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#FBFFE3" }}
      >
        <span className="flex w-full items-center p-4 border-b">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-auto w-16 mx-auto rounded-full"
          />
        </span>
        {sideList.map(({ icon, title, path }, index) => {
          return (
            <Link href={path} key={index}>
              <span
                key={index}
                className="flex items-center p-4 hover:bg-[#FF803D] hover:text-white "
              >
                <span className="mr-2">{icon}</span> <span>{title}</span>
              </span>
            </Link>
          );
        })}
        <div className="fixed bottom-0 w-full">
          <div className="flex items-center p-4 font-bold" style={{ backgroundColor: "#FBFFE3" }}>
          {user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="rounded-full w-8 h-8 mr-2"
              />
            ) : (
              <FaUserCircle className="text-2xl mr-2" />
          )}
            <span className="truncate block max-w-full">{username}</span>
          </div>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;