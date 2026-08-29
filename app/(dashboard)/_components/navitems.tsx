"use client";

import { NavLinksType } from "@/types/types";
import {
  Code,
  FileText,
  Image,
  Mail,
  MessageSquare,
  PenLine,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react/jsx-runtime";

export default function NavItems({
  setIsOpen,
}: {
  setIsOpen?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}) {
  const pathname = usePathname();

  const navlinks: NavLinksType[] = [
    {
      title: "Chat Assistant",
      href: "/chatassistant",
      icon: "MessageSquare",
    },
    {
      title: "Image Generator",
      href: "/imagegenerator",
      icon: "Image",
    },
    {
      title: "Code Generator",
      href: "/codegenerator",
      icon: "Code",
    },
    { title: "Summarizer", href: "/summarizer", icon: "FileText" },
    {
      title: "Email Generator",
      href: "/emailgenerator",
      icon: "Mail",
    },
    {
      title: "Blog Generator",
      href: "/bloggenerator",
      icon: "PenLine",
    },
  ];

  return (
    <ul className="space-y-2">
      {navlinks.map((link: NavLinksType, i: number): JSX.Element => {
        const isActive = link.href === pathname;
        return (
          <li key={i}>
            <Link
              onClick={() => setIsOpen?.((prevVar) => !prevVar)}
              href={link.href}
              className={`flex items-center gap-2 text-left px-2 py-2 rounded w-full ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-[#1A1F2B]"
              }`}
            >
              {link.icon === "MessageSquare" && (
                <MessageSquare className="h-5 w-5" />
              )}
              {link.icon === "Image" && <Image className="h-5 w-5" />}
              {link.icon === "Code" && <Code className="h-5 w-5" />}
              {link.icon === "FileText" && <FileText className="h-5 w-5" />}
              {link.icon === "Mail" && <Mail className="h-5 w-5" />}
              {link.icon === "PenLine" && <PenLine className="h-5 w-5" />}
              {link.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
