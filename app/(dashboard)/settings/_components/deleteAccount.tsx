"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { JSX } from "react";
import toast from "react-hot-toast";

const toastStyle = {
  duration: 3000,
  position: "top-center" as const,
  className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
  iconTheme: { primary: "#DC2626", secondary: "#F5F6F8" },
};

export default function DeleteAccount(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const closeModal = () => {
    if (loading) return;
    setOpen(false);
    setPassword("");
  };

  const handleDelete = async () => {
    if (!password.trim()) {
      toast.error("Please enter your password", {
        ...toastStyle,
        id: "delete-error-toast",
      });
      return;
    }

    try {
      const router = useRouter();

      const response = await fetch("/api/deleteAccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, toastStyle);
        return;
      }

      toast.success(data.message, toastStyle);
      closeModal();
      router.push("/");
    } catch (error) {
      console.error("ERROR:", error);
      toast.error("Internal server error", toastStyle);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto bg-[#e22828] border border-[#2A2F3A] px-6 py-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#d80b0b] active:scale-95"
      >
        Delete
      </button>

      {open && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#12161F] border border-[#2A2F3A] shadow-2xl shadow-black/30 p-5 rounded-lg flex flex-col gap-3 items-center text-center"
          >
            <p className="text-lg font-medium">
              Are you sure you want to delete your account?
            </p>
            <p className="text-sm text-[#8B93A5]">
              This action cannot be undone!
            </p>
            <div className="flex flex-col items-center gap-3 w-full">
              <input
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                className="w-full bg-[#0B0E14] border border-[#2A2F3A] px-4 py-2 rounded-lg text-[#F5F6F8] cursor-text outline-none transition-colors disabled:opacity-60"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center justify-center gap-2 w-full">
                <button
                  onClick={closeModal}
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#1A1F2B] border border-[#2A2F3A] px-6 py-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#242A38] active:scale-95 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#e22828] border border-[#2A2F3A] px-6 py-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#d80b0b] active:scale-95 disabled:opacity-60"
                >
                  {loading ? "Deleting..." : "Delete permanently"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
