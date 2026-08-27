import { JSX } from "react/jsx-runtime";
import Hamburger from "./Hamburger";

export default function Navbar(): JSX.Element {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#12161F] md:border-b md:border-[#2A2F3A] shrink-0">
      <div className="flex items-center md:hidden">
        <Hamburger />
      </div>
      <div className="flex items-center justify-end w-full md:justify-center gap-3">
        <span className="text-sm text-[#F5F6F8] hidden md:block">
          Welcome, User
        </span>
        <div className="w-8 h-8 rounded-full bg-[#1A1F2B]"></div>
      </div>
    </header>
  );
}
