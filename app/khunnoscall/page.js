"use client";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setMessages([
      {
        text: "Hello, I am Khunnos. Please enter your appointment details!",
        role: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      text: userInput,
      role: "user",
      timestamp: new Date(),
    };

    // Add temporary "..." bot message
    const loadingMessage = {
      text: "...",
      role: "bot",
      timestamp: new Date(),
    };

    // Add both user message and loading message at once
    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      loadingMessage,
    ]);
    setUserInput("");

    try {
      const { data } = await axios.post(
        "https://us-central1-appdev-f40ab.cloudfunctions.net/Khunnoscall", // Replace with your full endpoint
        {
          username: user.email,
          INPUT: userInput,
        }
      );

      // Replace the "..." with the actual bot response
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.pop(); // Remove the "..." loading message

        const formattedLines = (data?.text || data || "No response from bot.")
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0); // remove empty lines

        return [
          ...newMessages,
          {
            role: "bot",
            lines: formattedLines,
            timestamp: new Date(),
          },
        ];
      });
      setError(null); // Clear any previous error
    } catch (err) {
      console.error(err);
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.pop(); // Remove the "..." loading message
        return [
          ...newMessages,
          {
            text: "Failed to create the appointment. Please try again.",
            role: "bot",
            timestamp: new Date(),
          },
        ];
      });
      setError("Failed to send message. Please try again.");
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        text: "Hello, I am Khunnos. Please enter your appointment!",
        role: "bot",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`flex flex-col min-h-screen p-4 `}>
      <div className={`flex-1 overflow-y-auto rounded-md p-2`}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === "user"
                  ? "bg-[#68D4C7] text-black"
                  : "bg-[#FF803D] text-white"
              }`}
            >
              {msg.role === "bot" && msg.lines ? (
                <ul className="list-disc pl-5">
                  {msg.lines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              ) : (
                <span>{msg.text}</span>
              )}
              <p className="text-[0.65rem] text-gray-200 mt-1 text-right">
                {msg.role === "bot" ? "Khunnos" : "You"} –{" "}
                {msg.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <div className="p-4  bg-[#68D4C7] rounded-2xl">
        <div
          className="flex flex-col mb-2 space-y-2"
          style={{ borderRadius: "18px" }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`w-full p-2 bg-white border focus:outline-none focus:border-black`}
            style={{ borderRadius: "16px" }}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={clearMessages}
              className="px-4 py-2 mr-2 text-sm p-2 bg-black text-[#68D4C7] rounded-full focus:outline-none hover:scale-110 transition-transform duration-300"
            >
              New Chat
            </button>
            <button
              onClick={handleSendMessage}
              className={`p-2 bg-black text-white rounded-full focus:outline-none hover:scale-110 transition-transform duration-300`}
            >
              <FaArrowRight className="text-2xl" style={{ color: "#68D4C7" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
