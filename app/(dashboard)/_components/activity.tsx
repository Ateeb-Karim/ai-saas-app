import { JSX } from "react/jsx-runtime";

export default function Activity({
  icon,
  description,
  time,
}: {
  icon: JSX.Element;
  description: string;
  time: string;
}): JSX.Element {
  return (
    <div className="flex bg-[#1C2128] rounded-xl gap-3 items-center w-full border-[#2A2F3A] px-3 py-3">
      <div className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-blue-500 text-sm">
        {icon}
      </div>
      <div className="flex justify-between w-full">
        <p className="text-[#F5F6F8] text-sm font-medium">{description}</p>
        <p className="text-[#A1A5AE] text-sm">{time}</p>
      </div>
    </div>
  );
}
