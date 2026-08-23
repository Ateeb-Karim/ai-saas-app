import Link from "next/link";
import { Copy, RotateCw, Sparkles } from "lucide-react";

export default function MarketingPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center px-4 sm:px-10 py-10 sm:py-15 gap-y-10 md:gap-y-0">
        <div className="w-full md:w-1/2 md:ml-2 order-2 md:order-2">
          <div className="transform md:skew-y-3 w-full max-w-md mx-auto bg-[#1b1c28] rounded-3xl p-5 text-white font-sans shadow-2xl">
            <div className="flex items-center gap-1.5 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500 opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500 opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500 opacity-80" />
            </div>
            <div className="mb-3 max-w-[85%] bg-[#2a2b3d] text-slate-100 rounded-2xl p-4 text-base font-semibold leading-snug">
              Write a launch email for our new feature
            </div>
            <div className="ml-auto mb-6 max-w-[85%] bg-blue-500 text-white rounded-2xl p-4 text-base font-medium leading-snug shadow-sm">
              Subject: Say hello to smarter workflows 🚀 ...
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-1.5 py-3.5 px-4 bg-[#232535] hover:bg-[#2c2e42] transition-colors rounded-2xl text-slate-300 font-medium">
                <Copy />
                <span className="text-sm">Copy</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-1.5 py-3.5 px-4 bg-[#232535] hover:bg-[#2c2e42] transition-colors rounded-2xl text-slate-300 font-medium">
                <RotateCw />
                <span className="text-sm">Regenerate</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 gap-y-4 md:mr-2 order-1 md:order-1 text-center md:text-left">
          <div className="flex justify-center items-center gap-2 rounded-full p-2 px-3 bg-blue-500/10 border border-blue-500/20">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <p className="text-sm font-semibold">
              All your AI tools in one place
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-y-2 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
              one dashboard, every AI tool you need.
            </h1>
          </div>
          <div className="flex flex-col items-center md:items-start gap-y-2 text-center md:text-left">
            <p className="text-base sm:text-lg">
              chat, generate image, write code, summarize, and draft content
              without switching between six different platforms
            </p>
          </div>
          <div className="flex items-center justify-center gap-5">
            <Link
              href="/signup"
              className="rounded-xl bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-all duration-200 cursor-pointer hover:scale-105"
            >
              Get started
            </Link>
            <Link
              href="/#pricing"
              className="rounded-xl border border-blue-500 text-blue-500 px-4 py-2 hover:border-blue-600 hover:bg-blue-500 transition-all duration-200 cursor-pointer hover:text-white hover:scale-105"
            >
              see pricing
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
