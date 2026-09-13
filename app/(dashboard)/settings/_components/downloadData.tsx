"use client";

import { JSX } from "react/jsx-runtime";
import { useSession } from "next-auth/react";

export default function DownlaodDataBtn(): JSX.Element {
  const { data: session } = useSession();

  const downloadData = () => {};
  console.log("hello");
  console.log(session);

  return (
    <button
      onClick={downloadData}
      className="w-full sm:w-auto bg-[#12161F] border border-[#2A2F3A] px-6 py-2 mt-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95"
    >
      Download
    </button>
  );
}
