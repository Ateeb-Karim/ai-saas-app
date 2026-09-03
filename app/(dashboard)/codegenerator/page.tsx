"use client";

import { Code, Copy, Loader2 } from "lucide-react";
import { JSX, useState } from "react";
import ShowCard from "../_components/showcard";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";
import { setHistory } from "@/lib/history";

export default function CodeGenerator(): JSX.Element {
  const [prompt, setPrompt] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        body: JSON.stringify({
          prompt,
        }),
        headers: {
          "content-type": "application/json",
        },
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to generate code");
      }

      const data = await response.json();
      setResult(data.result);
      setHistory({
        id: crypto.randomUUID(),
        tool: "code",
        input: prompt,
        output: data.result,
        timestamp: Date.now(),
      });
    } catch (e) {
      toast.error("Failed to generate code. Please try again", {
        duration: 3000,
        position: "top-center",
        className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
        iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
        id: "error-toast",
      });
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setLoading(false);
    setResult("");
    setPrompt("");
  };

  const copyToClipboard = () => {
    if (!result) {
      return toast.error("No code to copy", {
        duration: 3000,
        position: "top-center",
        className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
        iconTheme: { primary: "#EF4444", secondary: "#F5F6F8" },
        id: "error-toast",
      });
    }
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard", {
      duration: 3000,
      position: "top-center",
      className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
      iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
      id: "success-toast",
    });
  };

  return (
    <div className="flex flex-col items-start w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <ShowCard
        icon={<Code className="h-6 w-6 text-blue-500" />}
        title="Code Generator"
        description="Generate professional code snippets tailored to any scenario."
      />

      <div className="w-full">
        <p className="text-base sm:text-lg text-[#F5F6F8] mt-4">
          Purpose of code...
        </p>
        <textarea
          rows={5}
          className="w-full px-3 py-3 outline-none bg-[#0F141A] border border-[#2A2F3A] rounded-lg text-sm sm:text-md resize-none"
          placeholder="e.g: Generate a code snippet for a login page in react... "
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPrompt(e.target.value)
          }
        />
      </div>

      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1">
        <button
          onClick={generateCode}
          disabled={loading}
          className="w-full sm:flex-1 px-6 py-2 mt-2 bg-blue-500 rounded-lg text-white font-medium transition-all duration-200 hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Code"
          )}
        </button>
        <button
          onClick={clear}
          className="w-full sm:w-auto bg-[#12161F] border border-[#2A2F3A] px-6 py-2 mt-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95"
        >
          Clear
        </button>
      </div>

      <div className="w-full flex items-center justify-between mt-4">
        <p className="text-base sm:text-lg text-[#F5F6F8]">Generated Code</p>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-blue-500 text-sm sm:text-md cursor-pointer transition-all duration-200 hover:scale-99 active:scale-95"
        >
          <Copy className="h-4 w-4" />
          <p>Copy</p>
        </button>
      </div>

      <div className="w-full bg-[#12161F] border border-[#2A2F3A] rounded-lg p-3 sm:p-4">
        {!result ? (
          <p className="text-sm text-center text-[#8B93A5]">no code yet ...</p>
        ) : (
          <div className="text-sm text-left text-[#F5F6F8] h-fit">
            <ReactMarkdown
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ borderRadius: "8px", fontSize: "12.5px" }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {result}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
