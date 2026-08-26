"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import SideBar from "./sidebar";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="text-white flex items-center justify-between">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 hover:bg-gray-700 rounded transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {isOpen && (
        <div className="absolute top-16 z-50 left-0 border-l border-white/10 bg-[#12161F] h-screen w-full flex-none  md:w-64 text-[#F5F6F8] shrink-0 flex-col ">
          <SideBar setIsOpen={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
