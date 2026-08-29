import { Copy, FileText } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import TextArea from "./_components/textarea";
import Button from "./_components/button";

export default async function SummarizerPage(): Promise<JSX.Element> {
  const text: string | null = "";

  const response = await fetch("http://localhost:3000/api/summarize", {
    method: "POST",
    body: JSON.stringify({
      text: text,
    }),
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return (
    <div className="flex flex-col items-start w-full text-white">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gray-800 rounded-lg">
          <FileText className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <p className="text-lg text-white">Text Summarizer</p>
          <p className="text-gray-500 font-normal text-sm">
            Paste your text here to get concise summary.
          </p>
        </div>
      </div>
      <div className="w-full">
        <p className="font-normal text-md mt-5">Your text ...</p>
        <TextArea textProp={text} />
      </div>
      <div className="w-full flex items-center justify-center gap-2 mt-1">
        <Button />
        <button className="bg-[#0F141A] border border-gray-700 px-6 py-2 mt-2 rounded-lg text-white cursor-pointer transition-all duration-200 hover:bg-gray-800  active:scale-95">
          clear
        </button>
      </div>
      <div className="w-full flex items-center justify-between mt-4">
        <p className="text-lg text-white">Summary</p>
        <div className="flex items-center gap-1 text-blue-500 text-md cursor-pointer transition-all duration-200 hover:scale-99  active:scale-95">
          <Copy className="h-4 w-4" />
          <p>Copy</p>
        </div>
      </div>
      <div className="mt-2 h-full w-full bg-[#0F141A] border border-gray-700 rounded-lg p-2">
        <p className="text-sm text-gray-200 font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
          dignissimos consequuntur enim laboriosam. Ex fugit quo repellat sequi,
          consequuntur, tempore repellendus, similique dolorem aliquid
          consectetur placeat at nemo reiciendis officiis!
        </p>
      </div>
    </div>
  );
}
