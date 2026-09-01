import { Bot } from "lucide-react";
import { JSX } from "react/jsx-runtime";

export default function AssisstantStyle({
  content,
}: {
  content: string;
}): JSX.Element {
  return (
    <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[75%] self-start">
      <div className="flex items-center justify-center p-2 rounded-xl bg-[#0A0E14] border border-[#2A2F3A] shrink-0">
        <Bot className="h-5 w-5 text-blue-500" />
      </div>
      <div className="p-3 border border-[#2A2F3A] rounded-2xl rounded-tl-xs bg-linear-to-br from-[#141924] to-[#1E222D] text-sm sm:text-base leading-relaxed wrap-break">
        {content}
      </div>
    </div>
  );
}
