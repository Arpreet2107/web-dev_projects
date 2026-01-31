"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm the PMI Pune-Deccan assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response (replace with actual AI integration)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("event") || lowerQuery.includes("meeting")) {
      return "You can view all upcoming events on our Events page. Visit /events to see seminars, workshops, and conferences. You can register directly from the event detail page.";
    }
    if (lowerQuery.includes("member") || lowerQuery.includes("join")) {
      return "To become a member, visit our Membership page at /membership. You'll need to be a PMI Global member first, then you can join our local chapter.";
    }
    if (lowerQuery.includes("pdu") || lowerQuery.includes("credit")) {
      return "PDU credits are tracked in your dashboard. After attending events, credits are automatically added. You can also manually log external PDUs from your dashboard.";
    }
    if (lowerQuery.includes("certification") || lowerQuery.includes("pmp") || lowerQuery.includes("capm")) {
      return "We offer support for PMP, CAPM, and other certifications. Visit /certifications to learn more about exam preparation and training partners.";
    }
    if (lowerQuery.includes("resource") || lowerQuery.includes("template")) {
      return "Our Resource Library contains templates, whitepapers, case studies, and guides. Visit /resources to browse and download resources.";
    }
    if (lowerQuery.includes("contact") || lowerQuery.includes("help")) {
      return "You can reach us at info@pmipunechapter.com or visit our Contact page at /contact for more information.";
    }

    return "I can help you with information about events, membership, PDU tracking, certifications, and resources. What would you like to know more about?";
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">PMI Assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-blue-700 rounded p-1 transition"
          aria-label="Close chatbot"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI-powered assistant. Responses are simulated.
        </p>
      </div>
    </div>
  );
}

