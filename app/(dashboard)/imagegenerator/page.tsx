"use client";

import { JSX } from "react/jsx-runtime";
import ShowCard from "../_components/showcard";
import { Download, Image, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { setHistory } from "@/lib/history";

export default function ImageGenerator(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageReady, setImageReady] = useState<boolean>(false);

  const generateImage = async () => {
    setIsLoading(true);
    setImageReady(false);
    setImageUrl("");
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
        }),
        headers: {
          "content-type": "application/json",
        },
        cache: "no-cache",
      });
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
      const data = await response.json();
      setImageUrl(data.imageUrl);
      setHistory({
        id: crypto.randomUUID(),
        tool: "image",
        title: prompt,
        output: data.imageUrl,
        timestamp: Date.now(),
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate image. Please try again", {
        duration: 3000,
        position: "top-center",
        className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
        iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
        id: "error-toast",
      });
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageReady(true);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageReady(false);
    toast.error("Image failed to load. Please try again", {
      duration: 3000,
      position: "top-center",
      className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
      iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
      id: "error-toast",
    });
  };

  const clear = () => {
    setIsLoading(false);
    setPrompt("");
    setImageUrl("");
    setImageReady(false);
  };

  const downloadImage = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error("Failed to download image", {
        duration: 3000,
        position: "top-center",
        className: "bg-[#0A0E14] text-white border border-[#2A2F3A] rounded-lg",
        iconTheme: { primary: "#3B82F6", secondary: "#F5F6F8" },
        id: "download-error-toast",
      });
    }
  };

  return (
    <div className="flex flex-col items-start w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <ShowCard
        icon={<Image className="h-6 w-6 text-blue-500" />}
        title="Image Generator"
        description="Turn a text description into a generated image."
      />
      <div className="w-full">
        <p className="text-base sm:text-lg text-[#F5F6F8] mt-4">Prompt...</p>
        <textarea
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-3 outline-none bg-[#0F141A] border border-[#2A2F3A] rounded-lg text-sm sm:text-md resize-none"
          placeholder="e.g: a red bicycle leaning against a brick wall, golden hour lighting..."
        />
      </div>
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1">
        <button
          onClick={generateImage}
          disabled={isLoading}
          className="w-full sm:flex-1 px-6 py-2 mt-2 bg-blue-500 rounded-lg text-white font-medium transition-all duration-200 hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Image"
          )}
        </button>
        <button
          onClick={clear}
          className="w-full sm:w-auto bg-[#12161F] border border-[#2A2F3A] px-6 py-2 mt-2 rounded-lg text-[#F5F6F8] cursor-pointer transition-all duration-200 hover:bg-[#1A1F2B] active:scale-95"
        >
          Clear
        </button>
      </div>
      <div className="w-full flex items-center justify-between mt-4">
        <p className="text-base sm:text-lg text-[#F5F6F8]">Generated Image</p>
        <button
          onClick={downloadImage}
          disabled={!imageReady}
          className="flex items-center gap-1 text-blue-500 text-sm sm:text-md transition-all duration-200 hover:scale-99 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4" />
          <p>Download</p>
        </button>
      </div>
      <div className="mt-2 w-full bg-[#12161F] border border-[#2A2F3A] rounded-lg p-3 sm:p-4 aspect-square flex items-center justify-center overflow-hidden">
        {!imageUrl ? (
          <p className="text-center text-[#8B93A5]">No image generated yet</p>
        ) : (
          <img
            src={imageUrl}
            alt={prompt || "Generated image"}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full object-contain rounded-lg transition-opacity duration-300 ${
              imageReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </div>
  );
}
