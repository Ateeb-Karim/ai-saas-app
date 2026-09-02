"use client";

import { Loader2, MessageCircle, Send } from "lucide-react";
import React, { JSX, useState } from "react";
import UserStyle from "../_components/userStyle";
import ShowCard from "../_components/showcard";
import ModelStyle from "../_components/modelStyle";
import toast from "react-hot-toast";

export default function ChatAssistant(): React.JSX.Element {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    { role: "user" | "model"; content: string }[]
  >([]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("failed to send message");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
    } catch (error) {
      console.error("failed to send message");
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full max-w-4xl mx-auto text-[#F5F6F8] px-4 sm:px-6 py-4 gap-4">
      <ShowCard
        icon={<MessageCircle className="h-6 w-6 text-blue-500" />}
        title="Chat Assistant"
        description="Ask questions, get code snippets, and more..."
      />

      <div className="flex-1 w-full border border-[#2A2F3A] rounded-2xl p-4 flex flex-col gap-4 overflow-y-auto min-h-75 bg-[#0A0E14]/50 scrollbar-thin">
        {messages.map(
          (msg: { role: string; content: string }, i: number): JSX.Element => {
            return msg.role === "user" ? (
              <UserStyle key={i} content={msg.content} />
            ) : (
              <ModelStyle key={i} content={msg.content} />
            );
          },
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex items-end gap-2 bg-[#0F141A] border border-[#2A2F3A] rounded-2xl p-2 transition-colors"
      >
        <textarea
          rows={1}
          className="flex-1 p-2 bg-transparent border-none outline-none text-sm sm:text-base resize-none max-h-30 placeholder:text-gray-500 scrollbar-hide"
          placeholder="Type your message here...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-3 bg-blue-500 rounded-xl text-white font-medium transition-all duration-200 hover:bg-blue-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </form>
    </div>
  );
}
