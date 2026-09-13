"use client";

import { Loader2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

const toastStyle = {
  duration: 3000,
  position: "top-center" as const,
  className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
  iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
};

export default function LogOutBtn() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut({ callbackUrl: "/signin" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout", {
        ...toastStyle,
        id: "logout-error-toast",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full sm:w-auto bg-[#12161F] border border-[#2A2F3A] px-6 py-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95"
    >
      {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "Logout"}
    </button>
  );
}
