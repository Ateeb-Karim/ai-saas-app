"use client";

import { LINKtype } from "@/types/types";
import Link from "next/link";
import { JSX } from "react/jsx-runtime";
import { useState } from "react";

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const links: LINKtype[] = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQs", href: "/#faqs" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 bg-surface/80 backdrop-blur-xl ${
        isOpen ? "border-0" : "border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="text-xl font-bold text-white tracking-wide">
          nexus <span className="text-blue-500">AI</span>
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 text-muted hover:text-white transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="font-semibold cursor-pointer hover:text-blue-500 transition-colors duration-200 ease-in-out"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-blue-500 px-4 py-1 rounded-md font-semibold text-white cursor-pointer hover:bg-blue-600 transition-colors duration-200 ease-in-out"
          >
            Sign Up
          </Link>
        </div>

        {/* mobile responsive menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out rounded-md border-l-2 border-white/10 ${
          isOpen
            ? "h-auto opacity-100 w-fit ml-auto"
            : "h-0 opacity-0 w-fit ml-auto"
        }`}
      >
        <div className="px-6 pb-5 flex flex-col gap-4 pt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-white"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="bg-blue-500 text-center px-4 py-2 rounded-md font-semibold text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
