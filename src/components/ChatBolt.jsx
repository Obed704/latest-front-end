import React, { useState, useEffect, useRef } from "react";
import { intents } from "../utils/intents.js"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdvancedChatBolt() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi, I’m the STEM Inspires assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Failed to fetch from API");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "🤔 I didn't get a response." },
      ]);
    } catch (error) {
      console.error("API fetch failed, using local intents:", error);

      // Fallback to local intents
      const userInputLower = input.toLowerCase();
      const intentMatch = intents.find((intent) =>
        intent.examples.some((example) =>
          example.toLowerCase().includes(userInputLower)
        )
      );

      const botReply = intentMatch
        ? intentMatch.responses[0]
        : "⚠️ Sorry, I don’t have an answer for that right now.";

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div className="fixed bottom-24 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 p-5 rounded-full shadow-2xl hover:scale-110 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.405 0-2.724-.317-3.91-.88L3 20l1.88-5.09C3.317 13.724 3 12.405 3 11c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* Chatbox */}
      {open && (
        <div className="fixed bottom-24 md:bottom-24 md:right-6 left-2 md:left-auto w-[95%] md:w-[400px] h-[500px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col border border-gray-200 animate-fade-in z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-900 text-white font-semibold p-4 flex justify-between items-center shadow-md rounded-t-2xl">
            <span className="text-lg">STEM Inspires Chat</span>
            <button onClick={() => setOpen(false)} className="text-white text-2xl font-bold hover:text-gray-200 transition">×</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-2 ${msg.from === "bot" ? "self-start" : "self-end flex-row-reverse"}`}>
                <div className={`h-8 w-8 flex items-center justify-center rounded-full text-white text-sm ${msg.from === "bot" ? "bg-indigo-500" : "bg-gray-400"}`}>
                  {msg.from === "bot" ? "🤖" : "🧑"}
                </div>
                <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${msg.from === "bot" ? "bg-gray-200 text-gray-800" : "bg-indigo-600 text-white"}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 self-start">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-indigo-500 text-white">🤖</div>
                <div className="bg-gray-200 px-3 py-2 rounded-2xl flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex gap-2 bg-white">
            <input
              type="text"
              className="flex-1 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm border-2 border-blue-900"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend} className="bg-indigo-600 px-5 py-2 rounded-full text-white hover:bg-indigo-700 transition text-sm">Send</button>
          </div>
        </div>
      )}
    </>
  );
}
