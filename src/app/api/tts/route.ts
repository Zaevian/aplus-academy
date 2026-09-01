import { NextResponse } from "next/server";
import { hasXaiKey, synthesizeSpeech } from "@/lib/xai/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ cloud: hasXaiKey() });
}

export async function POST(req: Request) {
  let body: { text?: string; voiceId?: string };
  try {
    body = (await req.json()) as { text?: string; voiceId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) return NextResponse.json({ error: "Missing text" }, { status: 400 });
  const result = await synthesizeSpeech({
    text,
    voiceId: body.voiceId,
  });
  if ("fallback" in result) {
    return new NextResponse(null, { status: 204 });
  }
  return new NextResponse(result.audio, {
    headers: {
      "Content-Type": result.contentType,
      "Cache-Control": "private, max-age=120",
    },
  });
}
