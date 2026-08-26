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

export default function NavItems() {
  const pathname = usePathname();

  const navlinks: NavLinksType[] = [
    {
      title: "Chat Assistant",
      href: "/dashboard/chat-assistant",
      icon: "MessageSquare",
    },
    {
      title: "Image Generator",
      href: "/dashboard/image-generator",
      icon: "Image",
    },
    {
      title: "Code Generator",
      href: "/dashboard/code-generator",
      icon: "Code",
    },
    { title: "Summarizer", href: "/dashboard/summarizer", icon: "FileText" },
    {
      title: "Email Generator",
      href: "/dashboard/email-generator",
      icon: "Mail",
    },
    {
      title: "Blog Generator",
      href: "/dashboard/blog-generator",
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
              href={link.href}
              className={`flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-gray-700 w-full ${
                isActive ? "bg-blue-500 text-white" : "bg-gray-900"
              }`}
            >
              {link.icon === "MessageSquare" && (
                <MessageSquare className="h-5 w-5" />
              )}
              {link.icon === "Image" && <Image className="h-5 w-5 mr-2" />}
              {link.icon === "Code" && <Code className="h-5 w-5 mr-2" />}
              {link.icon === "FileText" && (
                <FileText className="h-5 w-5 mr-2" />
              )}
              {link.icon === "Mail" && <Mail className="h-5 w-5 mr-2" />}
              {link.icon === "PenLine" && <PenLine className="h-5 w-5 mr-2" />}
              {link.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
