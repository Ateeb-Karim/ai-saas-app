import { Check } from "lucide-react";
import { JSX } from "react/jsx-runtime";

export default function PricingCard({
  name,
  price,
  description,
  features,
  button,
  isPopular = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  button: string;
  isPopular?: boolean;
}): JSX.Element {
  return (
    <div className="p-2 h-full">
      <div
        className={`relative bg-gray-900 p-6 rounded-xl border w-full h-full flex flex-col ${
          isPopular
            ? "border-blue-500 md:scale-105 shadow-lg shadow-blue-500/10"
            : "border-gray-800"
        }`}
      >
        {isPopular && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg shadow-blue-500/20 whitespace-nowrap">
            Most Popular
          </span>
        )}
        <h3 className="text-sm font-semibold capitalize text-gray-400">
          {name}
        </h3>
        <p className="text-4xl font-bold mt-2">
          ${price}
          <span className="text-sm font-normal text-gray-400">/mo</span>
        </p>
        <p className="text-gray-400 text-sm capitalize mt-1">{description}</p>
        <ul className="my-6 space-y-2 flex-1">
          {features.map(
            (feature: string, i: number): JSX.Element => (
              <li
                key={i}
                className="text-sm capitalize flex items-center gap-2"
              >
                <Check className="text-blue-500 shrink-0" size={14} />
                {feature}
              </li>
            ),
          )}
        </ul>
        <button
          className={`w-full px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-300 ${
            isPopular
              ? "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-2xl"
              : "border border-gray-700 text-white hover:border-blue-500"
          }`}
        >
          {button}
        </button>
      </div>
    </div>
  );
}
