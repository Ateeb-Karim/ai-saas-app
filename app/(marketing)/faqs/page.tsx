import { MessageCircleQuestionMark } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import FAQCard from "../_components/faqCard";
import { faqs } from "./questions";

export default function FaqsPage(): JSX.Element {
  return (
    <section
      id="faqs"
      className="flex flex-col justify-center items-center gap-10 px-4 py-16 sm:px-10 sm:py-20 lg:px-20"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 rounded-full p-2 px-3 bg-blue-500/10 border border-blue-500/20">
          <MessageCircleQuestionMark className="h-4 w-4 text-blue-500" />
          <p className="text-sm font-semibold text-blue-500">FAQs</p>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center">
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <FAQCard key={i} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
