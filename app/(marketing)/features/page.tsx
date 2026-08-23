import {
  Code,
  FileText,
  Image,
  LayoutGrid,
  Mail,
  MessageSquare,
  PenLine,
} from "lucide-react";
import FeatureCard from "../_components/featureCard";

export default function FeaturesPage() {
  return (
    <div
      id="features"
      className="flex flex-col justify-center items-center min-h-screen gap-10 p-4 sm:p-20"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 rounded-full p-2 px-3 bg-blue-500/10 border border-blue-500/20">
          <LayoutGrid className="h-4 w-4 text-blue-500" />
          <p className="text-sm font-semibold text-blue-500">features</p>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
            Everything you need
          </h1>
          <p className="text-base sm:text-lg text-gray-400 text-center">
            one platform six AI tools, no more switching tabs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
        <FeatureCard
          icon={<MessageSquare className="h-6 w-6 text-blue-500 mb-4" />}
          title="AI Chat Assistant"
          description="chat with ai anytime you need quick answers"
        />

        <FeatureCard
          icon={<Image className="h-6 w-6 text-blue-500 mb-4" />}
          title="AI Image Generator"
          description="generate high-quality images using ai with a simple text prompt"
        />

        <FeatureCard
          icon={<Code className="h-6 w-6 text-blue-500 mb-4" />}
          title="Code Generator"
          description="generate high-quality code using ai with a simple text prompt"
        />

        <FeatureCard
          icon={<FileText className="h-6 w-6 text-blue-500 mb-4" />}
          title="Text Summarizer"
          description="summarize long articles or documents into short summaries"
        />

        <FeatureCard
          icon={<Mail className="h-6 w-6 text-blue-500 mb-4" />}
          title="Email Generator"
          description="generate professional emails for any situation"
        />

        <FeatureCard
          icon={<PenLine className="h-6 w-6 text-blue-500 mb-4" />}
          title="Blog Writer"
          description="write high-quality blogs using ai with a simple text prompt"
        />
      </div>
    </div>
  );
}
