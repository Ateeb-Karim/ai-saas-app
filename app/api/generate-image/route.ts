import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-image",
      contents: prompt,
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts || !Array.isArray(parts)) {
      return NextResponse.json(
        { error: "Invalid response from AI" },
        { status: 500 },
      );
    }

    let imagebase64: string | null = null;

    for (const part of parts) {
      if (
        part?.inlineData &&
        part?.inlineData?.data &&
        part?.inlineData?.mimeType
      ) {
        imagebase64 = part.inlineData.data || null;
      }
    }

    if (!imagebase64) {
      return NextResponse.json(
        { error: "No image data received from AI" },
        { status: 500 },
      );
    }

    return NextResponse.json({ image: imagebase64 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}
