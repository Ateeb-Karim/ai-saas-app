import { JSX } from "react/jsx-runtime";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}): JSX.Element {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      {icon}
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
