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
    <div className="flex bg-[#12161F] rounded-xl gap-3 items-center w-full border border-[#2A2F3A] px-3 py-3">
      <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-[#1A1F2B] text-blue-500">
        {icon}
      </div>
      <div className="flex justify-between w-full">
        <p className="text-[#F5F6F8] text-sm font-medium">{description}</p>
        <p className="text-[#8B93A5] text-sm">{time}</p>
      </div>
    </div>
  );
}
