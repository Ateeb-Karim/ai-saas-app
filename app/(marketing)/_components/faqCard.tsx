"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { JSX } from "react/jsx-runtime";

export default function FAQCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full bg-[#12161f] shadow-2xl border-gray-800 rounded-xl overflow-hidden transition-colors hover:border-gray-700">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center gap-6 p-4 lg:p-5 text-left cursor-pointer"
      >
        <h3 className="text-sm sm:text-base font-semibold">{question}</h3>
        <ChevronDownIcon
          className={`shrink-0 text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-gray-400 px-4 pb-4 lg:px-5 lg:pb-5">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
