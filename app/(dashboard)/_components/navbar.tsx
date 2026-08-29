import { JSX } from "react/jsx-runtime";
import Hamburger from "./Hamburger";
import { auth } from "@/auth";

export default async function Navbar(): Promise<JSX.Element> {
  const session = await auth();

  return (
    <header className="h-16  w-full flex items-center justify-between px-6 bg-[#12161F] md:border-b md:border-[#2A2F3A] shrink-0">
      <div className="flex items-center md:hidden">
        <Hamburger />
      </div>
      <div className="flex items-center justify-end w-full md:justify-end gap-3">
        <span className="text-sm text-[#F5F6F8] hidden md:block">
          welcome,{" "}
          {session?.user?.name
            ? `${session?.user?.name?.charAt(0)?.toUpperCase()}${session?.user?.name?.slice(1)}`
            : "User"}
        </span>
        <div className="w-8 h-8 rounded-full bg-[#1A1F2B] flex items-center justify-center text-white font-semibold">
          {session?.user?.name
            ? `${session?.user?.name.charAt(0).toUpperCase()}`
            : "U"}
        </div>
      </div>
    </header>
  );
}
