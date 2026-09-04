"use client";

import { JSX } from "react/jsx-runtime";
import ShowCard from "../_components/showcard";
import { Book, Copy, Loader2 } from "lucide-react";
import { useState } from "react";
import { Length, Tone } from "@/types/types";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { setHistory } from "@/lib/history";

export default function BlogGenerator(): JSX.Element {
  const [topic, setTopic] = useState<string>("");
  const [blog, setBlog] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tones, setTones] = useState<Tone[]>([
    { title: "casual", active: true },
    { title: "professional", active: false },
    { title: "persuasive", active: false },
  ]);
  const [length, setLength] = useState<Length[]>([
    { title: "short", active: true },
    { title: "medium", active: false },
    { title: "long", active: false },
  ]);

  const toggleActiveTone = (i: number) => {
    setTones(
      tones.map((tone: Tone, idx) => ({
        ...tone,
        active: i == idx,
      })),
    );
  };

  const toggleActiveLength = (i: number) => {
    setLength(
      length.map((len: Length, idx) => ({
        ...len,
        active: i == idx,
      })),
    );
  };

  const generateBlog = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        body: JSON.stringify({
          topic: topic,
          tone:
            tones
              .filter((tone: Tone) => tone.active === true)
              .map((tone: Tone) => tone.title)[0] ?? "Casual",
          length:
            length
              .filter((len: Length) => len.active === true)
              .map((len: Length) => len.title)[0] ?? "short",
        }),
        headers: {
          "content-type": "application/json",
        },
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to generate blog");
      }

      const data = await response.json();
      setBlog(data.blog);
      setHistory({
        id: crypto.randomUUID(),
        tool: "blog",
        title: topic,
        output: data.blog,
        timestamp: Date.now(),
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate blog. Please try again", {
        duration: 3000,
        position: "top-center",
        className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
        iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
        id: "error-toast",
      });
    }
  };

  const clear = () => {
    setTopic("");
    setBlog("");
    setTones(
      tones.map((tone: Tone, idx) => ({
        ...tone,
        active: idx === 0,
      })),
    );
    setLength(
      length.map((len: Length, idx) => ({
        ...len,
        active: idx === 0,
      })),
    );
  };

  const CopyToClipBoard = () => {
    if (!blog) return;
    navigator.clipboard.writeText(blog);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex flex-col items-start w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <ShowCard
        icon={<Book className="h-6 w-6 text-blue-500" />}
        title="Blog Generator"
        description="Generate professional blog posts tailored to any scenario."
      />
      <div className="w-full">
        <p className="text-base sm:text-lg text-[#F5F6F8] mt-4">
          Blog idea/topic...
        </p>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={5}
          className="w-full px-3 py-3 outline-none bg-[#0F141A] border border-[#2A2F3A] rounded-lg text-sm sm:text-md resize-none"
          placeholder="e.g: why remote teams need async communication... "
        />
      </div>
      <div className="w-full">
        <p className="font-normal text-sm sm:text-md mt-5">Tone of blog</p>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {tones.map(
            (tone: Tone, i: number): JSX.Element => (
              <button
                key={i}
                title={tone.title}
                onClick={() => toggleActiveTone(i)}
                className={`w-full px-2 py-3 outline-none cursor-pointer bg-[#0F141A] border border-[#2A2F3A] rounded-lg text-sm sm:text-md transition-all duration-200 hover:bg-blue-600 active:scale-95
                ${tones[i].active ? "bg-blue-700 text-white" : "text-[#F5F6F8]"}`}
              >
                {tone.title}
              </button>
            ),
          )}
        </div>
        <p className="font-normal text-sm sm:text-md mt-5">Length of blog</p>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {length.map(
            (len: Length, i: number): JSX.Element => (
              <button
                key={i}
                title={len.title}
                onClick={() => toggleActiveLength(i)}
                className={`w-full px-2 py-3 outline-none cursor-pointer bg-[#0F141A] border border-[#2A2F3A] rounded-lg text-sm sm:text-md transition-all duration-200 hover:bg-blue-600 active:scale-95
                ${length[i].active ? "bg-blue-700 text-white" : "text-[#F5F6F8]"}`}
              >
                {len.title}
              </button>
            ),
          )}
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1">
        <button
          onClick={generateBlog}
          disabled={isLoading}
          className="w-full sm:flex-1 px-6 py-2 mt-2 bg-blue-500 rounded-lg text-white font-medium transition-all duration-200 hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Blog"
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
        <p className="text-base sm:text-lg text-[#F5F6F8]">Generated Blog</p>
        <button
          onClick={CopyToClipBoard}
          className="flex items-center gap-1 text-blue-500 text-sm sm:text-md cursor-pointer transition-all duration-200 hover:scale-99 active:scale-95"
        >
          <Copy className="h-4 w-4" />
          <p>Copy</p>
        </button>
      </div>
      <div className="mt-2 w-full bg-[#12161F] border border-[#2A2F3A] rounded-lg p-3 sm:p-4">
        {!blog ? (
          <p className="text-sm text-center text-[#8B93A5]">No blog yet</p>
        ) : (
          <div className="text-sm text-left text-[#F5F6F8] h-fit">
            <ReactMarkdown>{blog}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
