import { Tag } from "lucide-react";
import PricingCard from "../_components/pricingCard";
import { JSX } from "react/jsx-runtime";

export default function PricingPage(): JSX.Element {
  return (
    <div
      id="pricing"
      className="flex flex-col justify-center items-center gap-10 px-4 py-16 sm:px-10 sm:py-20 lg:px-20"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 rounded-full p-2 px-3 bg-blue-500/10 border border-blue-500/20">
          <Tag className="h-4 w-4 text-blue-500" />
          <p className="text-sm font-semibold text-blue-500">pricing</p>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center">
            Simple, transparent pricing
          </h1>
          <p className="text-base sm:text-lg text-gray-400 text-center">
            Start free, upgrade as you grow
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full items-start">
        <PricingCard
          name="free"
          price="0"
          description="For trying things out"
          features={[
            "3 tools included",
            "10 generations/month",
            "basic history",
          ]}
          button="Get Started"
        />
        <PricingCard
          name="most popular"
          price="9.99"
          description="For professionals"
          features={[
            "all 6 AI tools included",
            "100 generations/month",
            "full chat history",
            "email support",
          ]}
          button="Buy Now"
          isPopular={true}
        />
        <PricingCard
          name="pro"
          price="19.99"
          description="For power users"
          features={[
            "all 6 AI tools included",
            "unlimited generations",
            "extended history",
            "priority support",
            "early access to new tools",
          ]}
          button="Buy Now"
        />
      </div>
    </div>
  );
}
