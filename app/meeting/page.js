"use client";
import { useAuth } from "../context/AuthContext";
import axios from "axios"; 

export default function Meetings() {
  const { user } = useAuth();

  const handleCreateCalendar = async () => {
    try {
      const { data } = await axios.post(
        "https://us-central1-appdev-f40ab.cloudfunctions.net/googleauthen",
        {
          username: "test",
        }
      );
      console.log("Calendar created successfully:", data);
      // Assuming the API returns a URL to the Google Calendar
      // You can use the URL as needed, e.g., redirect or display it
    } catch (error) {
      console.error("Error creating calendar:", error);
    }
  };

  return (
    <button
      onClick={handleCreateCalendar}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Create Calendar
    </button>
  );
}