"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut, Settings, User } from "lucide-react";

export default function AvatarMenu({
  name,
  email,
}: {
  name?: string | null;
  email?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-blue-400 cursor-pointer"
      >
        {name?.charAt(0)?.toUpperCase() || "U"}
      </button>

      {isOpen && (
        <div className="absolute top-11 right-0 w-52 bg-[#12161F] border border-[#2A2F3A] rounded-lg p-2 shadow-xl z-50">
          <div className="px-3 py-2 border-b border-[#2A2F3A] mb-1">
            <p className="text-sm font-medium text-[#F5F6F8] truncate">
              {name
                ? `${name.charAt(0).toUpperCase()}${name.slice(1)}`
                : "User"}
            </p>
            <p className="text-xs text-[#8B93A5] truncate">{email}</p>
          </div>

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[#F5F6F8] hover:bg-[#1A1F2B] transition-colors"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[#F5F6F8] hover:bg-[#1A1F2B] transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-500 hover:bg-red-600 hover:text-white transition-colors w-full border-t border-[#2A2F3A] mt-1 pt-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
