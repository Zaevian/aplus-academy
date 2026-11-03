import { NextResponse } from "next/server";
import { hasXaiKey, synthesizeSpeech } from "@/lib/xai/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ cloud: hasXaiKey() });
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  // `null`, arrays, and primitives parse as valid JSON but are not a request body.
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }
  const body = raw as { text?: unknown; voiceId?: unknown };
  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) return NextResponse.json({ error: "Missing text" }, { status: 400 });
  const result = await synthesizeSpeech({
    text,
    voiceId: typeof body.voiceId === "string" ? body.voiceId : undefined,
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
