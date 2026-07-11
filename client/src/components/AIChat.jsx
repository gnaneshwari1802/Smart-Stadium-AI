import { useEffect, useRef, useState } from "react";
import {
  Send,
  Trash2,
  Copy,
  Bot,
  User,
  Loader2,
} from "lucide-react";

import api from "../services/api";
import VoiceAssistant from "./VoiceAssistant";

function AIChat({ stadiumData, selectedLocation }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const suggestedQuestions = [
    "Which parking area is least crowded?",
    "How crowded is the stadium?",
    "Suggest the fastest food court.",
    "Is the weather safe for visitors?",
  ];

  const askAI = async (question = prompt) => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    const locationContext = selectedLocation
      ? `Selected Location: Latitude ${selectedLocation.lat.toFixed(
          4
        )}, Longitude ${selectedLocation.lng.toFixed(4)}.`
      : "";

    try {
      const res = await api.post("/ai", {
        prompt: `${locationContext}\n${question}`,
        stadiumData,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.data.reply,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Unable to contact AI service.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }

    setLoading(false);
  };

  const copyMessage = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="text-blue-600" />
          Smart Stadium AI
        </h2>

        <button
          onClick={() => setMessages([])}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
        >
          <Trash2 size={18} />
          Clear
        </button>

      </div>

      {messages.length === 0 && (
        <div className="mb-6">

          <h3 className="font-semibold mb-3">
            Suggested Questions
          </h3>

          <div className="grid md:grid-cols-2 gap-3">

            {suggestedQuestions.map((item) => (
              <button
                key={item}
                onClick={() => askAI(item)}
                className="border rounded-xl p-3 text-left hover:bg-slate-50 transition"
              >
                {item}
              </button>
            ))}

          </div>

        </div>
      )}

      <div className="h-96 overflow-y-auto space-y-4 pr-2">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100"
              }`}
            >

              <div className="flex justify-between items-center mb-2">

                <div className="flex items-center gap-2">

                  {message.role === "assistant" ? (
                    <Bot size={18} />
                  ) : (
                    <User size={18} />
                  )}

                  <span className="font-semibold capitalize">
                    {message.role}
                  </span>

                </div>

                {message.role === "assistant" && (
                  <button
                    onClick={() => copyMessage(message.text)}
                  >
                    <Copy size={16} />
                  </button>
                )}

              </div>

              <p className="whitespace-pre-wrap">
                {message.text}
              </p>

              <p className="text-xs mt-3 opacity-70">
                {message.time}
              </p>

            </div>

          </div>

        ))}

        {loading && (

          <div className="flex">

            <div className="bg-slate-100 rounded-xl p-4 flex items-center gap-3">

              <Loader2
                size={20}
                className="animate-spin"
              />

              AI is thinking...

            </div>

          </div>

        )}

        <div ref={bottomRef} />

      </div>

      <div className="mt-6">

        <textarea
          rows={3}
          className="w-full border rounded-xl p-3"
          placeholder="Ask anything about your stadium..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="flex justify-between items-center mt-4">

          <VoiceAssistant
            onQuestion={(q) => askAI(q)}
          />

          <button
            onClick={() => askAI()}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            <Send size={18} />
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIChat;
