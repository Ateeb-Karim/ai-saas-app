"use client";

import Link from "next/link";
import NavItems from "@/app/(dashboard)/_components/navitems";
import { LayoutGrid, LogOut, RotateCcwClock, Settings } from "lucide-react";
import { JSX } from "react/jsx-runtime";

export default function SideBar({
  setIsOpen,
}: {
  setIsOpen?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}): JSX.Element {
  return (
    <>
      <div className="h-full px-4 py-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 px-2">
          nexus <span className="text-blue-500">AI</span>
        </h2>

        <Link
          onClick={() => setIsOpen?.(false)}
          href="/dashboard"
          className="flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-[#1A1F2B] w-full"
        >
          <LayoutGrid className="h-5 w-5" />
          <p>Dashboard</p>
        </Link>

        <p className="text-[#8B93A5] border-b border-[#2A2F3A] my-2 pb-1 text-xs uppercase tracking-wide">
          AI tools
        </p>
        <nav className="grow">
          <NavItems setIsOpen={setIsOpen} />
        </nav>

        <p className="text-[#8B93A5] border-b border-[#2A2F3A] my-2 pb-1 text-xs uppercase tracking-wide">
          workspace
        </p>

        <Link
          onClick={() => setIsOpen?.(false)}
          href="/dashboard/history"
          className="flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-[#1A1F2B] w-full"
        >
          <RotateCcwClock className="h-5 w-5" />
          <p>History</p>
        </Link>
        <Link
          onClick={() => setIsOpen?.(false)}
          href="/dashboard/settings"
          className="flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-[#1A1F2B] w-full"
        >
          <Settings className="h-5 w-5" />
          <p>Settings</p>
        </Link>

        <button
          type="button"
          className="flex items-center gap-2 border-t border-[#2A2F3A] text-left px-2 py-2 rounded hover:bg-[#1A1F2B] w-full mt-2 cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          <p>Log Out</p>
        </button>
      </div>
    </>
  );
}
