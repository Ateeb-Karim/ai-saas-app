import { JSX } from "react/jsx-runtime";

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
    <div className="flex items-center gap-2">
      <div className="p-2 bg-[#12161F] rounded-lg">{icon}</div>
      <div>
        <p className="text-lg text-[#F5F6F8]">{title}</p>
        <p className="text-[#8B93A5] font-normal text-sm">{description}</p>
      </div>
    </div>
  );
}
