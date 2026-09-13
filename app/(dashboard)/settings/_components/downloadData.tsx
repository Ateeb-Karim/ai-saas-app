"use client";

import { JSX } from "react";
import { useSession } from "next-auth/react";
import { getHistory } from "@/lib/history";
import toast from "react-hot-toast";

const toastStyle = {
  duration: 3000,
  position: "top-center" as const,
  className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
  iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
};

export default function DownloadDataBtn(): JSX.Element {
  const { data: session } = useSession();

  const downloadData = () => {
    if (!session) {
      toast.error("You must be logged in to download your data", {
        ...toastStyle,
        id: "download-error-toast",
      });
      return;
    }

    try {
      const history = getHistory();

      const data = JSON.stringify(
        {
          userProfile: session.user,
          exportedAt: new Date().toISOString(),
          chatHistory: history.map((item) => ({
            ...item,
            timestamp: new Date(item.timestamp).toISOString(),
          })),
        },
        null,
        2,
      );

      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const safeName =
        session.user?.name?.trim().replace(/\s+/g, "-") || "user";

      const link = document.createElement("a");
      link.href = url;
      link.download = `${safeName}_data.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(
        history.length === 0
          ? "Data downloaded (no history yet)"
          : "Data downloaded successfully",
        {
          ...toastStyle,
          id: "download-success-toast",
        },
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to download data", {
        ...toastStyle,
        id: "download-error-toast",
      });
    }
  };

  return (
    <button
      onClick={downloadData}
      className="w-full sm:w-auto bg-[#12161F] border border-[#2A2F3A] px-6 py-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95"
    >
      Download
    </button>
  );
}
