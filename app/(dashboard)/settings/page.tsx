import { JSX } from "react/jsx-runtime";
import ShowCard from "../_components/showcard";
import { Download, Info, LogOut, Settings, Trash, Trash2 } from "lucide-react";
import Link from "next/link";

export default function SettingPage(): JSX.Element {
  return (
    <div className="flex flex-col gap-5 items-start w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <ShowCard
        icon={<Settings className="h-6 w-6 text-blue-500" />}
        title="Settings"
        description="Manage your account settings"
      />

      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between bg-[#12161F] shadow-2xl border border-[#2A2F3A] rounded-lg px-4 py-4">
        <div className="flex items-center gap-4">
          <Info className="h-6 w-6 text-blue-500" />
          <div className="flex flex-col">
            <p className="text-lg font-medium">Account Information</p>
            <p className="text-sm text-[#8B93A5]">
              Manage your account information
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Link
            href="/profile/edit"
            className="w-full sm:w-auto bg-[#12161F] border border-[#2A2F3A] px-6 py-2 mt-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95"
          >
            Manage Profile
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between bg-[#12161F] shadow-2xl border border-[#2A2F3A] rounded-lg px-4 py-4">
        <div className="flex items-center gap-4">
          <Download className="h-6 w-6 text-blue-500" />
          <div className="flex flex-col">
            <p className="text-lg font-medium">Download Data</p>
            <p className="text-sm text-[#8B93A5]">
              Download your profile and chat history as JSON
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button className="w-full sm:w-auto bg-[#12161F] border border-[#2A2F3A] px-6 py-2 mt-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95">
            Download
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between bg-[#12161F] shadow-2xl border border-[#2A2F3A] rounded-lg px-4 py-4">
        <div className="flex items-center gap-4">
          <LogOut className="h-6 w-6 text-blue-500" />
          <div className="flex flex-col">
            <p className="text-lg font-medium">Logout everywhere</p>
            <p className="text-sm text-[#8B93A5]">Logout from all devices</p>
          </div>
        </div>
        <div className="flex items-center">
          <button className="w-full sm:w-auto bg-[#12161F] border border-[#2A2F3A] px-6 py-2 mt-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95">
            Logout
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between bg-[#741111] shadow-2xl border border-[#ff5d5d] rounded-lg px-4 py-4">
        <div className="flex items-center gap-4">
          <Trash2 className="h-6 w-6 text-red-500" />
          <div className="flex flex-col">
            <p className="text-lg font-medium">Delete Account</p>
            <p className="text-sm text-[#8B93A5]">
              Delete your account and all of your data
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button className="w-full sm:w-auto bg-[#e22828] border border-[#2A2F3A] px-6 py-2 mt-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#d80b0b] active:scale-95">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
