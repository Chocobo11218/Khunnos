"use client";
import { useAuth } from "../context/AuthContext";
import axios from "axios"; 
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Meetings() {
  const { user } = useAuth();
  const router = useRouter();

  const [calendarUrl, setCalendarUrl] = useState("");

  const handleCreateCalendar = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      // Step 1: Check if the user already has a calendar
      const checkRes = await axios.post(
        "https://us-central1-appdev-f40ab.cloudfunctions.net/getdata",
        { username: user.email }
      );

      if (checkRes.data && checkRes.data.footprint) {
        const existingCalendarUrl = `https://calendar.google.com/calendar/u/0/r?cid=${checkRes.data.footprint[user.email]}`;
        console.log("User already has a calendar:", existingCalendarUrl);
        setCalendarUrl(existingCalendarUrl);
        return; // Skip creation if already exists
      }

      // Step 2: Otherwise, create a new calendar
      const createRes = await axios.post(
        "https://us-central1-appdev-f40ab.cloudfunctions.net/googleauthen",
        { username: user.email }
      );

      console.log("Calendar created successfully:", createRes.data);
      setCalendarUrl(createRes.data); // If this returns a URL
    } catch (error) {
      console.error("Error checking or creating calendar:", error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={handleCreateCalendar}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Create Calendar
      </button>

      {calendarUrl && (
        <div>
          <p className="text-green-600">Calendar ready!</p>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View your calendar
          </a>
        </div>
      )}
    </div>
  );
}