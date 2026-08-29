"use client";

import { useState } from "react";
import { Copy, FileText, Loader2 } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import toast, { Toaster } from "react-hot-toast";

export default function SummarizerPage(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateSummary = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        body: JSON.stringify({
          text: text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();

      setSummary(data.summary);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Failed to generate summary. Please try again", {
        duration: 500,
        position: "top-center",
        className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
        iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
        id: "error-toast",
      });
    }
  };

  const clear = () => {
    setText("");
    setSummary("");
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex flex-col items-start w-full text-[#F5F6F8]">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-[#12161F] rounded-lg">
          <FileText className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <p className="text-lg text-[#F5F6F8]">Text Summarizer</p>
          <p className="text-[#8B93A5] font-normal text-sm">
            Paste your text here to get concise summary.
          </p>
        </div>
      </div>
      <div className="w-full">
        <p className="font-normal text-md mt-5">Your text ...</p>
        <textarea
          name=""
          id=""
          cols={70}
          rows={5}
          className="w-full px-2 py-3 outline-none border-none bg-[#0F141A] border-gray-700 border rounded-lg text-md"
          placeholder="Paste your long article, report, or any text you want to summarize ..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
        />
      </div>
      <div className="w-full flex items-center justify-center gap-2 mt-1">
        <button
          onClick={generateSummary}
          disabled={isLoading}
          className="w-full px-6 py-2 mt-2 bg-blue-500 rounded-lg text-white font-medium  transition-all duration-200 hover:bg-blue-600  active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Summary"
          )}
        </button>
        <button
          onClick={clear}
          className="bg-[#12161F] border border-[#2A2F3A] px-6 py-2 mt-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95"
        >
          clear
        </button>
      </div>
      <div className="w-full flex items-center justify-between mt-4">
        <p className="text-lg text-[#F5F6F8]">Summary</p>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-blue-500 text-md cursor-pointer transition-all duration-200 hover:scale-99 active:scale-95"
        >
          <Copy className="h-4 w-4" />
          <p>Copy</p>
        </button>
      </div>
      <div className="mt-2 h-full w-full bg-[#12161F] border border-[#2A2F3A] rounded-lg p-2">
        <p className="text-sm text-center text-[#F5F6F8] font-medium">
          {!summary ? "No summary yet" : summary}
        </p>
      </div>
    </div>
  );
}
