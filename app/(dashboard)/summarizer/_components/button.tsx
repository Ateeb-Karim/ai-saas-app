import { Loader2 } from "lucide-react";
import { JSX } from "react/jsx-runtime";

export default function Button({
  onGenerate,
  loading,
}: {
  onGenerate: () => void;
  loading: boolean;
}): JSX.Element {
  return (
    <button
      onClick={onGenerate}
      disabled={loading}
      className="w-full px-6 py-2 mt-2 bg-blue-500 rounded-lg text-white font-medium cursor-pointer transition-all duration-200 hover:bg-blue-600  active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin h-4 w-4" />
          <span>Generating...</span>
        </div>
      ) : (
        "Generate Summary"
      )}
    </button>
  );
}
