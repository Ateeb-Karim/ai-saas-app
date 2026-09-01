import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 },
      );
    }

    const safeHistory = history ?? [];

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const chat = ai.chats.create({
      model: "gemini-3.5-flash-lite",
      history: safeHistory.map((h: { role: string; content: string }) => ({
        role: h.role,
        parts: [{ text: h.content }],
      })),
    });

    const response = await chat.sendMessage({ message });

    return NextResponse.json({ success: true, reply: response.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to generate response" },
      { status: 500 },
    );
  }
}
