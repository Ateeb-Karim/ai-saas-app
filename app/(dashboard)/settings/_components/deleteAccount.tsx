"use client";

import { useState } from "react";
import { JSX } from "react/jsx-runtime";

// const toastStyle = {
//   duration: 3000,
//   position: "top-center" as const,
//   className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
//   iconTheme: { primary: "#DC2626", secondary: "#F5F6F8" },
// };

export default function DeleteAccount(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setLoading((prev) => !prev)}
        className={`w-full sm:w-auto bg-[#e22828] border border-[#2A2F3A] px-6 py-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#d80b0b] active:scale-95
            ${loading ? "opacity-80 cursor-not-allowed" : ""}`}
      >
        Delete
      </button>

      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 border border-[#2A2F3A] rounded-lg px-4 py-4 ">
          <div className="bg-[#12161F] shadow-2xl shadow-black/30 p-5 rounded-lg flex flex-col gap-3 items-center justify-center">
            <p className="text-lg font-medium">
              Are you sure you want to delete your account?
            </p>
            <p className="text-sm text-[#8B93A5]">
              This action cannot be undone!
            </p>
            <div className="flex flex-col items-center gap-2">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full sm:w-auto bg-[#12161F] border border-[#2A2F3A] px-6 py-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95 outline-none"
              />
              <button
                onClick={() => setLoading(false)}
                className="w-full sm:w-auto bg-[#e22828] border border-[#2A2F3A] px-6 py-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#d80b0b] active:scale-95"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
