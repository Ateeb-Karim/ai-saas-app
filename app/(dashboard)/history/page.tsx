"use client";

import {
  Book,
  Code,
  FileText,
  Image,
  Mail,
  MessageCircle,
  Trash2Icon,
} from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { FilterType, HistoryEntry } from "@/types/types";

export default function HistoryPage(): React.JSX.Element {
  const [filterType, setFilterType] = useState<FilterType[]>([
    { type: "all", active: true },
    { type: "chat", active: false },
    { type: "blog", active: false },
    { type: "code", active: false },
    { type: "email", active: false },
    { type: "image", active: false },
    { type: "summarizer", active: false },
  ]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const toggleActive = (i: number) => {
    setFilterType(
      filterType.map((type: FilterType, idx: number) => ({
        ...type,
        active: i === idx,
      })),
    );
  };

  useEffect(() => {
    const data = localStorage.getItem("history");
    if (!data) return;
    setHistory(JSON.parse(data));
  }, []);

  return (
    <div className="flex flex-col items-start gap-3.5 w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <div className="w-full">
        <h1 className="text-3xl font-bold">History</h1>
        <p className="text-gray-500 font-medium text-xs mt-1">
          Track your previous generations and access them anytime.
        </p>
      </div>
      {history.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center gap-3.5">
          <p className="text-lg text-[#F5F6F8]">No history found</p>
        </div>
      )}
      <div className="w-full mt-3">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-1">
          {filterType.map((type: FilterType, i: number) => (
            <button
              key={i}
              onClick={() => toggleActive(i)}
              className={`w-full px-2 py-3 outline-none cursor-pointer bg-[#0F141A] border border-[#2A2F3A] rounded-lg text-sm sm:text-md transition-all duration-200 hover:bg-blue-600 active:scale-95
                ${filterType[i].active ? "bg-blue-700 text-white" : "text-[#F5F6F8]"}`}
            >
              {type.type}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2.5">
        {history.map((historyItem: HistoryEntry, i: number): JSX.Element => {
          return (
            <div
              key={i}
              className="bg-[#151B22] rounded-lg p-4 w-full flex items-center justify-center border border-[#2a2f3a]"
            >
              <div className="w-full flex items-center gap-2">
                <div className="p-2 bg-[#12161F] rounded-lg">
                  {historyItem.tool === "chat" && (
                    <MessageCircle className="h-6 w-6 text-blue-500" />
                  )}
                  {historyItem.tool === "blog" && (
                    <Book className="h-6 w-6 text-blue-500" />
                  )}
                  {historyItem.tool === "code" && (
                    <Code className="h-6 w-6 text-blue-500" />
                  )}
                  {historyItem.tool === "email" && (
                    <Mail className="h-6 w-6 text-blue-500" />
                  )}
                  {historyItem.tool === "image" && (
                    <Image className="h-6 w-6 text-blue-500" />
                  )}
                  {historyItem.tool === "summarizer" && (
                    <FileText className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="text-lg text-[#F5F6F8]">{historyItem.title}</p>
                  <p className="text-[#8B93A5] font-normal text-sm">
                    {historyItem.tool} .{" "}
                    {new Date(historyItem.timestamp).toLocaleString()}
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
