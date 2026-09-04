"use client";

import {
  Book,
  Code,
  FileText,
  Image,
  Mail,
  MessageCircle,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { HistoryEntry } from "@/types/types";
import { clearHistory } from "@/lib/history";

export default function HistoryPage(): React.JSX.Element {
  const [input, setInput] = useState<string>("");
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("history");
    if (!data) return;
    setEntries(JSON.parse(data));
    console.log(JSON.parse(data));
  }, []);

  return (
    <div className="flex flex-col items-start gap-3.5 w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <div className="w-full">
        <h1 className="text-3xl font-bold">History</h1>
        <p className="text-gray-500 font-medium text-xs mt-1">
          Track your previous generations and access them anytime.
        </p>
      </div>
      <div className="w-full flex items-center gap-2">
        <div className="w-full flex items-center gap-2 px-3 py-3 outline-none bg-[#0F141A] border border-[#2A2F3A] rounded-lg text-sm sm:text-md">
          <SearchIcon className="w-4 h-4 text-[#8B93A5]" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search history by tool or keyword..."
            className="outline-none w-full bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div
          onClick={() => {
            clearHistory();
            setEntries([]);
          }}
          className="p-3 bg-[#12161F] text-red-500 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white active:scale-95 border border-[#2A2F3A]"
        >
          <Trash2Icon />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2.5">
        {entries.map((entry: HistoryEntry, i: number): JSX.Element => {
          return (
            <div
              key={i}
              className="bg-[#151B22] rounded-lg p-4 w-full flex items-center justify-center border border-[#2a2f3a]"
            >
              <div className="w-full flex items-center gap-2">
                <div className="p-2 bg-[#12161F] rounded-lg">
                  {entry.tool === "chat" && (
                    <MessageCircle className="h-6 w-6 text-blue-500" />
                  )}
                  {entry.tool === "blog" && (
                    <Book className="h-6 w-6 text-blue-500" />
                  )}
                  {entry.tool === "code" && (
                    <Code className="h-6 w-6 text-blue-500" />
                  )}
                  {entry.tool === "email" && (
                    <Mail className="h-6 w-6 text-blue-500" />
                  )}
                  {entry.tool === "image" && (
                    <Image className="h-6 w-6 text-blue-500" />
                  )}
                  {entry.tool === "summarizer" && (
                    <FileText className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="text-lg text-[#F5F6F8]">{entry.title}</p>
                  <p className="text-[#8B93A5] font-normal text-sm">
                    {entry.tool} . {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-[#12161F] text-red-500 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white active:scale-95 transition-all duration-200">
                <Trash2Icon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
