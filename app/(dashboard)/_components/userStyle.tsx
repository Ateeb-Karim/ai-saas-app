import { User } from "lucide-react";
import { JSX } from "react/jsx-runtime";

export default function UserStyle({
  content,
}: {
  content: string;
}): JSX.Element {
  return (
    <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[75%] self-end flex-row-reverse">
      <div className="flex items-center justify-center p-2 rounded-xl bg-[#0A0E14] border border-[#2A2F3A] shrink-0">
        <User className="h-5 w-5 text-blue-400" />
      </div>
      <div className="p-3 border border-blue-500/30 rounded-2xl rounded-tr-xs bg-linear-to-br from-blue-600 to-sky-900 text-sm sm:text-base leading-relaxed wrap-break">
        {content}
      </div>
    </div>
  );
}
