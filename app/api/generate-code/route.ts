import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
      model: "gemini-3.5-flash",
      contents: `Write code for the following request: ${prompt}. Return the code in a properly fenced markdown code block with the correct language tag (e.g. \`\`\`javascript). Include a brief explanation before the code block.`,
    });

    return NextResponse.json({ result: response.text });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to generate code" },
      { status: 500 },
    );
  }
}
