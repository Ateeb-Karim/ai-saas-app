"use client";

import { JSX } from "react/jsx-runtime";
import { useSession } from "next-auth/react";
import { getHistory } from "@/lib/history";
import toast from "react-hot-toast";

export default function DownlaodDataBtn(): JSX.Element {
  const { data: session } = useSession();
  const history = getHistory();

  const downloadData = () => {
    if (!session) {
      toast.error("You must be logged in to download your data", {
        duration: 3000,
        position: "top-center",
        className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
        iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
        id: "download-error-toast",
      });
      return;
    }

    if (!history) {
      toast.error("No history found", {
        duration: 3000,
        position: "top-center",
        className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
        iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
        id: "download-error-toast",
      });
      return;
    }

    try {
      const data = JSON.stringify(
        {
          userProfile: session?.user,
          chatHistory: history,
          exportedAt: new Date().toISOString(),
        },
        null,
        2,
      );
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${session?.user?.name}_data.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download data", {
        duration: 3000,
        position: "top-center",
        className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
        iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
        id: "download-error-toast",
      });
    }
  };

  return (
    <button
      onClick={downloadData}
      className="w-full sm:w-auto bg-[#12161F] border border-[#2A2F3A] px-6 py-2 mt-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95"
    >
      Download
    </button>
  );
}
