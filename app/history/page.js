"use client";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";


export default function Home() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [error, setError] = useState(null);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const userMessage = {
            text: userInput,
            role: "user",
            timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setUserInput("");

        try {
            const { data } = await axios.post(
                "https://us-central1-appdev-f40ab.cloudfunctions.net/Khunnoscall", // Replace with your full endpoint
                {
                    username: "test",
                    INPUT: userInput,
                }
            );
            const botMessage = {
                text: data.text, // Adjust if `data.text` is not the actual response
                role: "bot",
                timestamp: new Date(),
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setError(null); // Clear any previous error
        } catch (err) {
            console.error(err);
            setError("Failed to send message. Please try again.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // const { primary, secondary, accent, text } = getThemeColors();

    return (
        <div className={`flex flex-col h-screen p-4 `}
            // ${primary} style={{ backgroundColor : theme === "dark" ? "#1a1a1a" : "#68D4C7" }} // Adjust background color based on theme
        >
            <div className={`flex-1 overflow-y-auto rounded-md p-2`}
                // ${secondary} style={{ backgroundColor: theme === "dark" ? "#1a1a1a" : "#FBFFE3" }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-4 ${
                            msg.role === "user" ? "text-right" : "text-left"
                        }`}
                    >
                        <span
                            className={`p-2 rounded-lg ${
                                msg.role === "user"
                                    ? `bg-[#68D4C7] text-black`
                                    : `bg-[#FF803D] text-white`
                            }`}
                        >
                            {msg.text}
                        </span>
                        <p className={`text-xs text-gray mt-1`}>
                            {msg.role === "bot" ? "Khunnos" : "You"} -{" "}
                            {msg.timestamp.toLocaleTimeString()}
                        </p>
                    </div>
                ))}
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="p-4"
               style={{ backgroundColor: "#68D4C7", borderRadius: "20px" }}> 
                <div className="flex flex-col items-end mb-2 space-y-2"
                    style={{ borderRadius: "18px" }}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={`w-full p-2 bg-white border-t border-b border-l focus:outline-none focus:border-black`}
                        style={{ borderRadius: "16px" }}
                    />
                    <button
                        onClick={handleSendMessage}
                        className={`p-2 bg-black text-white rounded-full focus:outline-none hover:scale-110 transition-transform duration-300`}
                    >
                        <FaArrowRight className="text-2xl" style={{color: "#68D4C7"}}/>
                    </button>
                </div>
            </div>
        </div>
    );
}