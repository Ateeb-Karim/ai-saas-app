import { Bot, MessageCircle, Send, User } from "lucide-react";
import React from "react";
import ShowCard from "../_components/showcard";

export default function ChatAssistant(): React.JSX.Element {
  return (
    <div className="flex flex-col w-full h-full max-w-4xl mx-auto text-[#F5F6F8] px-4 sm:px-6 py-4 gap-4">
      <ShowCard
        icon={<MessageCircle className="h-6 w-6 text-blue-500" />}
        title="Chat Assistant"
        description="Ask questions, get code snippets, and more..."
      />

      <div className="flex-1 w-full border border-[#2A2F3A] rounded-2xl p-4 flex flex-col gap-4 overflow-y-auto min-h-75 bg-[#0A0E14]/50 scrollbar-thin">
        <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[75%] self-start">
          <div className="flex items-center justify-center p-2 rounded-xl bg-[#0A0E14] border border-[#2A2F3A] shrink-0">
            <Bot className="h-5 w-5 text-blue-500" />
          </div>
          <div className="p-3 border border-[#2A2F3A] rounded-2xl rounded-tl-xs bg-linear-to-br from-[#141924] to-[#1E222D] text-sm sm:text-base leading-relaxed wrap-break">
            Ask questions, get code snippets, and more...
          </div>
        </div>

        <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[75%] self-end flex-row-reverse">
          <div className="flex items-center justify-center p-2 rounded-xl bg-[#0A0E14] border border-[#2A2F3A] shrink-0">
            <User className="h-5 w-5 text-blue-400" />
          </div>
          <div className="p-3 border border-blue-500/30 rounded-2xl rounded-tr-xs bg-linear-to-br from-blue-600 to-sky-900 text-sm sm:text-base leading-relaxed wrap-break">
            hello from the user ...
          </div>
        </div>
      </div>

      <form className="w-full flex items-end gap-2 bg-[#0F141A] border border-[#2A2F3A] rounded-2xl p-2 focus-within:border-blue-500 transition-colors">
        <textarea
          rows={1}
          className="flex-1 p-2 bg-transparent border-none outline-none text-sm sm:text-base resize-none max-h-30 placeholder:text-gray-500"
          placeholder="Type your message here...."
        />
        <button
          type="submit"
          className="p-3 bg-blue-500 rounded-xl text-white font-medium transition-all duration-200 hover:bg-blue-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shrink-0"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
