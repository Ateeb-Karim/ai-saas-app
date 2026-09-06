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
import { clearHistory, deleteHistory } from "@/lib/history";

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

  const activeFilter =
    filterType.find((type: FilterType) => type.active)?.type ?? "all";

  const filteredHistory = history.filter(
    (item: HistoryEntry) =>
      activeFilter === "all" || item.tool === activeFilter,
  );

  const toggleActive = (i: number) => {
    setFilterType(
      filterType.map((type: FilterType, idx: number) => ({
        ...type,
        active: i === idx,
      })),
    );
  };

  const deleteItem = (id: string) => {
    deleteHistory(id);
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  useEffect(() => {
    const data = localStorage.getItem("history");
    if (!data) return;
    setHistory(JSON.parse(data));
  }, []);

  return (
    <div className="flex flex-col items-start gap-3.5 w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <div className="w-full flex justify-between items-start sm:items-center flex-col sm:flex-row gap-3">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-[#8B93A5] font-medium text-xs mt-1">
            Track your previous generations and access them anytime.
          </p>
        </div>
        <button
          onClick={() => {
            clearHistory();
            setHistory([]);
          }}
          className="p-2 bg-[#12161F] text-red-500 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white active:scale-95 transition-all duration-200 flex items-center gap-2 shrink-0"
        >
          <p className="text-sm font-medium">Clear History</p>
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>

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
      {filteredHistory.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center gap-3.5 py-3 border border-[#2A2F3A] rounded-lg">
          <p className="text-lg text-[#8B93A5]">No history found !</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2.5">
          {filteredHistory.map(
            (historyItem: HistoryEntry, i: number): JSX.Element => {
              return (
                <div
                  key={i}
                  className="bg-[#151B22] rounded-lg p-4 w-full flex items-center justify-between gap-3 border border-[#2a2f3a]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-2 bg-[#12161F] rounded-lg shrink-0">
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
                    <div className="min-w-0">
                      <p className="text-lg text-[#F5F6F8] truncate">
                        {historyItem.title}
                      </p>
                      <p className="text-[#8B93A5] font-normal text-sm">
                        {historyItem.tool} .{" "}
                        {new Date(historyItem.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteItem(historyItem.id)}
                    className="p-3 bg-[#12161F] text-red-500 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white active:scale-95 transition-all duration-200 shrink-0"
                  >
                    <Trash2Icon />
                  </button>
                </div>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}
