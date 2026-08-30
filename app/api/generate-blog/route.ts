import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { topic, tone, length } = await request.json();

    if (!topic || !tone || !length) {
      return NextResponse.json(
        { error: "missing topic, tone or length" },
        { status: 400 },
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `Write a ${tone.toLowerCase()} blog post about: ${topic}. Length: ${length} (short = 2-3 paragraphs, medium = 4-6 paragraphs, long = 7+ paragraphs with subheadings). Include a title.`,
    });

    return NextResponse.json({ blog: response.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to generate blog" },
      { status: 500 },
    );
  }
}
