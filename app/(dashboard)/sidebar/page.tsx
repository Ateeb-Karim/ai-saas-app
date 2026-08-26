import NavItems from "@/app/(dashboard)/_components/navitems";
import { LayoutGrid, LogOut, RotateCcwClock, Settings } from "lucide-react";
import { JSX } from "react/jsx-runtime";

export default function SideBar(): JSX.Element {
  return (
    <aside className="w-full flex-none md:block hidden md:w-64 bg-[#181C2F] text-white shrink-0 flex-col h-screen">
      <div className="h-full px-4 py-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 px-2">
          nexus <span className="text-blue-500">AI</span>
        </h2>
        <div className="flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-gray-700 w-full">
          <LayoutGrid className="h-5 w-5" />
          <p className="">Dashboard</p>
        </div>
        <p className="text-gray-500 border-b my-2">AI tools</p>
        <nav className="grow">
          <NavItems />
        </nav>
        <p className="text-gray-500 border-b my-2">workspace</p>
        <div className="flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-gray-700 w-full">
          <RotateCcwClock className="h-5 w-5" />
          <p>History</p>
        </div>
        <div className="flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-gray-700 w-full">
          <Settings className="h-5 w-5" />
          <p>Settings</p>
        </div>
        <div className="flex items-center gap-2 border-t border-gray-700 text-left px-2 py-2 rounded hover:bg-gray-700 w-full">
          <LogOut className="h-5 w-5" />
          <p>Log Out</p>
        </div>
      </div>
    </aside>
  );
}
