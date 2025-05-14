"use client";
import { useState, useEffect } from "react";

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [theme, setTheme] = useState("light");
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
            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages, userInput }),
            });

            const data = await response.json();

            if (response.ok) {
                const botMessage = {
                    text: data.text,
                    role: "bot",
                    timestamp: new Date(),
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } else {
                setError(data.error || "Failed to send message");
            }
        } catch (err) {
            setError("Failed to send message. Please try again.");
        }
    };

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    const getThemeColors = () => {
        switch (theme) {
            case "light":
                return {
                    primary: "bg-white",
                    secondary: "bg-gray-100",
                    accent: "bg-blue-500",
                    text: "text-gray-800",
                };
            case "dark":
                return {
                    primary: "bg-gray-900",
                    secondary: "bg-gray-800",
                    accent: "bg-yellow-500",
                    text: "text-gray-100",
                };
            default:
                return {
                    primary: "bg-white",
                    secondary: "bg-gray-100",
                    accent: "bg-blue-500",
                    text: "text-gray-800",
                };
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const { primary, secondary, accent, text } = getThemeColors();

    return (
        <div className={`flex flex-col h-screen p-4 `}
            // ${primary} style={{ backgroundColor : theme === "dark" ? "#1a1a1a" : "#68D4C7" }} // Adjust background color based on theme
        >
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <label htmlFor="theme" className={`text-sm ${text}`}>
                        Theme:
                    </label>
                    <select
                        id="theme"
                        value={theme}
                        onChange={handleThemeChange}
                        className={`p-1 rounded-md border ${text}`}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </div>
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
                                    ? `${accent} text-white`
                                    : `${primary} ${text}`
                            }`}
                        >
                            {msg.text}
                        </span>
                        <p className={`text-xs ${text} mt-1`}>
                            {msg.role === "bot" ? "Bot" : "You"} -{" "}
                            {msg.timestamp.toLocaleTimeString()}
                        </p>
                    </div>
                ))}
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="p-4 rounded-md"
               style={{ backgroundColor: "#68D4C7" }}> 
                <div className="flex items-center mt-4">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={`flex-1 p-2 rounded-l-md border-t border-b border-l focus:outline-none focus:border-${accent}`}
                    />
                    <button
                        onClick={handleSendMessage}
                        className={`p-2 ${accent} text-white rounded-r-md hover:bg-opacity-80 focus:outline-none`}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}