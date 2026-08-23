import Hero from "./_components/hero";
import ContactPage from "./contact/page";
import FaqsPage from "./faqs/page";
import FeaturesPage from "./features/page";
import PricingPage from "./pricing/page";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <FeaturesPage />
      <PricingPage />
      <FaqsPage />
      <ContactPage />
    </>
  );
}
