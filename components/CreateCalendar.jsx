"use client";
import { useAuth } from "../app/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SM_SCREEN = 576;

const useWindowSize = () => {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  
    useEffect(() => {
      if (typeof window === "undefined") return;
  
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Initial call
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return width;
  };

const CreateCalendar = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [calendarUrl, setCalendarUrl] = useState("");
  const [error, setError] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingCreateNew, setLoadingCreateNew] = useState(false);
  const width = useWindowSize();

  useEffect(() => {
    // Reset on user change
    console.log("Auth user changed:", user);
    setCalendarUrl("");
    setError("");
  }, [user?.email]);

  const handleCreateCalendar = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setError("");
    setLoadingCreate(true);

    try {
      // Check if the user already has a calendar
      const checkRes = await axios.post(
        "https://us-central1-appdev-f40ab.cloudfunctions.net/getdata",
        { username: user.email }
      );
      console.log("Check calendar data:", checkRes.data);

      if (checkRes.data && checkRes.data.footprint && checkRes.data.footprint[user.email]) {
        const existingCalendarUrl = `https://calendar.google.com/calendar/u/0/r?cid=${checkRes.data.footprint[user.email]}`;
        console.log("User already has a calendar:", existingCalendarUrl);
        setCalendarUrl(existingCalendarUrl);
        return;
      }

      // Create a new calendar
      const createRes = await axios.post(
        "https://us-central1-appdev-f40ab.cloudfunctions.net/googleauthen",
        { username: user.email }
      );

      console.log("API response:", createRes.data);
      if (createRes.data && typeof createRes.data === "string" && createRes.data.startsWith("https://accounts.google.com")) {
        window.location.href = createRes.data; // Redirect to OAuth consent page
      } else {
        setCalendarUrl(createRes.data); // Assume it's a calendar URL
      }
    } catch (error) {
      console.error("Error details:", error.response?.data, error.message);
      setError(error.response?.status === 401 ? "Authentication failed. Please log in again." : "Failed to create calendar. Please try again.");
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleCreateSecondCalendar = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setError("");
    setLoadingCreateNew(true);

    try {
      const createRes = await axios.post(
        "https://us-central1-appdev-f40ab.cloudfunctions.net/createsecondcal",
        { username: user.email }
      );

      console.log("User:", user.email)
      console.log("New calendar created:", createRes.data);
      setCalendarUrl(createRes.data);
      // window.open(calendarUrl, "_blank");
    } catch (error) {
      console.error("Error details:", error.response?.data, error.message);
      setError("Failed to create a new calendar. Please try again.");
    } finally {
      setLoadingCreateNew(false);
    }
  };

  const handleViewCalendar = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setError("");

    try {
      const checkRes = await axios.post(
        "https://us-central1-appdev-f40ab.cloudfunctions.net/getdata",
        { username: user.email }
      );

      if (checkRes.data && checkRes.data.footprint) {
        const existingCalendarUrl = `https://calendar.google.com/calendar/u/0/r?cid=${checkRes.data.footprint[user.email]}`;
        console.log("User already has a calendar:", existingCalendarUrl);
        setCalendarUrl(existingCalendarUrl);
        window.open(existingCalendarUrl, "_blank");
        return;
      }

      if (calendarUrl) {
        console.log("calendarUrl:", calendarUrl)
        window.open(calendarUrl, "_blank");
      } else {
        setError("Please create a calendar first.");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data, error.message);
      setError("Failed to load calendar. Please try again.");
    }
  };

  return (
    <div 
        className="flex flex-col items-center justify-center"
        // style={{ width: (width>SM_SCREEN)? '50%' : 'auto' }}
    >
      <div
            className={`flex p-4 ${
            width > SM_SCREEN ? 'flex-row gap-4' : 'flex-col gap-4'
            } items-center justify-center`}
        >
        <button
          onClick={handleCreateCalendar}
          className="flex items-center justify-center text-white text-xl px-6 py-3 hover:scale-110 transition-transform duration-300 hover:shadow-lg disabled:opacity-50 w-54"
          style={{ backgroundColor: "#FF803D", borderRadius: "26px" }}
          disabled={loadingCreate || loadingCreateNew}
        >
          {loadingCreate ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              loading...
            </>
          ) : (
            "Login/Sign in"
          )}
        </button>
        <button
          onClick={handleViewCalendar}
          className="flex items-center justify-center text-white text-xl px-6 py-3 hover:scale-110 transition-transform duration-300 hover:shadow-lg disabled:opacity-50 w-54"
          style={{ backgroundColor: "#FF803D", borderRadius: "26px" }}
          disabled={loadingCreate || loadingCreateNew}
        >
          View My Calendar
        </button>
        <button
          onClick={handleCreateSecondCalendar}
          className="flex items-center justify-center text-white text-xl px-6 py-3 hover:scale-110 transition-transform duration-300 hover:shadow-lg disabled:opacity-50 w-54"
          style={{ backgroundColor: "#FF803D", borderRadius: "26px" }}
          disabled={loadingCreate || loadingCreateNew}
        >
          {loadingCreateNew ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating...
            </>
          ) : (
            "New Calendar"
          )}
        </button>
      </div>
      <div className="mt-4 text-center">
        {calendarUrl && (
          <div className="text-green-600">Calendar is ready!</div>
        )}
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
};

export default CreateCalendar;