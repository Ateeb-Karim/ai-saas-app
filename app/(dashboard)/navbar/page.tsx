import { JSX } from "react/jsx-runtime";

export default function Navbar(): JSX.Element {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Welcome, User</span>
        <div className="w-8 h-8 rounded-full bg-slate-300"></div>
      </div>
    </header>
  );
}
