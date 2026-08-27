import { JSX } from "react/jsx-runtime";

export default function DashboardCards({
  heading,
  description,
}: {
  heading: string;
  description: string;
}): JSX.Element {
  return (
    <div className="rounded-xl p-6 text-white flex flex-col gap-1 bg-[#12161F] border border-[#2A2F3A] shadow-lg">
      <h1 className="text-[#A1A5AE] text-sm">{heading}</h1>
      <p className="text-[#F5F6F8] text-2xl font-semibold">{description}</p>
    </div>
  );
}
