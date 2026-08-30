"use client";

import { Copy, Loader2, Mail } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import ShowCard from "../_components/showcard";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Tone } from "@/types/types";
import toast from "react-hot-toast";

export default function EmailGenerator(): JSX.Element {
  const [purpose, setPurpose] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tones, setTones] = useState<Tone[]>([
    { title: "Casual", active: true },
    { title: "Formal", active: false },
    { title: "Informal", active: false },
    { title: "Professional", active: false },
    { title: "Persuasive", active: false },
  ]);

  const toggleActive = (i: number) => {
    setTones(
      tones.map((tone: Tone, idx) => ({
        ...tone,
        active: i == idx,
      })),
    );
  };

  const generateEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        body: JSON.stringify({
          purpose: purpose,
          tone:
            tones
              .filter((tone: Tone) => tone.active === true)
              .map((tone: Tone) => tone.title)[0] ?? "Casual",
        }),
        headers: {
          "content-type": "application/json",
        },
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("failed to generate EMAIL");
      }

      const data = await response.json();
      setEmail(data.email);
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate email. Please try again", {
        duration: 3000,
        position: "top-center",
        className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
        iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
        id: "error-toast",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setPurpose("");
    setEmail("");
    setTones(
      tones.map((tone: Tone, idx) => ({
        ...tone,
        active: idx === 0,
      })),
    );
  };

  const copyToClipboard = () => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex flex-col items-start w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <ShowCard
        icon={<Mail className="h-6 w-6 text-blue-500" />}
        title="Email Generator"
        description="Generate professional emails tailored to any scenario."
      />

      <div className="w-full">
        <p className="font-normal text-sm sm:text-md mt-5">
          Purpose of email...
        </p>
        <textarea
          rows={5}
          className="w-full px-3 py-3 outline-none bg-[#0F141A] border border-[#2A2F3A] rounded-lg text-sm sm:text-md resize-none"
          placeholder="e.g: following up after a job interview ... "
          value={purpose}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPurpose(e.target.value)
          }
        />
      </div>

      <div className="w-full">
        <p className="font-normal text-sm sm:text-md mt-5">Tone of email...</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-1">
          {tones.map(
            (tone: Tone, i: number): JSX.Element => (
              <button
                key={i}
                title={tone.title}
                onClick={() => toggleActive(i)}
                className={`w-full px-2 py-3 outline-none cursor-pointer bg-[#0F141A] border border-[#2A2F3A] rounded-lg text-sm sm:text-md transition-all duration-200 hover:bg-blue-600 active:scale-95
                ${tones[i].active ? "bg-blue-700 text-white" : "text-[#F5F6F8]"}`}
              >
                {tone.title}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1">
        <button
          onClick={generateEmail}
          disabled={isLoading}
          className="w-full sm:flex-1 px-6 py-2 mt-2 bg-blue-500 rounded-lg text-white font-medium transition-all duration-200 hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Email"
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
        <p className="text-base sm:text-lg text-[#F5F6F8]">Generated Email</p>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-blue-500 text-sm sm:text-md cursor-pointer transition-all duration-200 hover:scale-99 active:scale-95"
        >
          <Copy className="h-4 w-4" />
          <p>Copy</p>
        </button>
      </div>

      <div className="mt-2 w-full bg-[#12161F] border border-[#2A2F3A] rounded-lg p-3 sm:p-4">
        {!email ? (
          <p className="text-sm text-center text-[#8B93A5]">No email yet</p>
        ) : (
          <div className="text-sm text-left text-[#F5F6F8] h-fit">
            <ReactMarkdown>{email}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
