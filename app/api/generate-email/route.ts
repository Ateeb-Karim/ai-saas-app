import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { purpose, tone } = await request.json();

    if (!purpose || !tone) {
      return NextResponse.json(
        { error: "Purpose and tone are required" },
        { status: 400 },
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const email = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `Write a ${tone.toLowerCase()} email about the following: ${purpose}. Include a subject line and a full email body with an appropriate greeting and sign-off.`,
    });

    return NextResponse.json({ email: email.text });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
