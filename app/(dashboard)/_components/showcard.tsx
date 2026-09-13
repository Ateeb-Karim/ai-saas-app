import { JSX } from "react";

interface ShowCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ShowCard({
  icon,
  title,
  description,
}: ShowCardProps): JSX.Element {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="p-2 bg-[#12161F] rounded-lg shrink-0">{icon}</div>
      <div className="flex flex-col min-w-0">
        <p className="text-lg sm:text-xl font-semibold tracking-wide text-[#F5F6F8] wrap-break">
          {title}
        </p>
        <p className="text-[#8B93A5] text-sm wrap-break-word">{description}</p>
      </div>
    </div>
  );
}
