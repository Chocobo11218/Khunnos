import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
    const { messages, userInput } = await request.json();
    console.log("Request received:", { messages, userInput });

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const generationConfig = {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
        ];

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: messages.map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.text }],
            })),
        });

        console.log("Sending to Google API:", { userInput, history: messages });
        const result = await chat.sendMessage(userInput);
        const botResponse = result.response.text();
        console.log("Google API response:", botResponse);

        return new Response(JSON.stringify({ text: botResponse }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return new Response(
            JSON.stringify({ error: error.message || "Failed to generate response" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}