import "server-only";

export function hasXaiKey(): boolean {
  return Boolean(process.env.XAI_API_KEY);
}

export function xaiHeaders(): HeadersInit {
  const key = process.env.XAI_API_KEY;
  if (!key) throw new Error("XAI_API_KEY is not configured");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

/** Server-only. Never import this module from client components. */
export async function createEphemeralVoiceToken(): Promise<{ token: string } | { disabled: true }> {
  if (!hasXaiKey()) return { disabled: true };
  return { token: "disabled-until-realtime-credentials" };
}

export async function synthesizeSpeech(input: {
  text: string;
  voiceId?: string;
}): Promise<{ audio: ArrayBuffer; contentType: string } | { fallback: true }> {
  if (!hasXaiKey()) return { fallback: true };
  const text = input.text.trim().slice(0, 15000);
  if (!text) return { fallback: true };
  const res = await fetch("https://api.x.ai/v1/tts", {
    method: "POST",
    headers: xaiHeaders(),
    body: JSON.stringify({
      text,
      voice_id: input.voiceId || "eve",
      language: "en",
      text_normalization: true,
    }),
  });
  if (!res.ok) return { fallback: true };
  return {
    audio: await res.arrayBuffer(),
    contentType: res.headers.get("content-type") || "audio/mpeg",
  };
}
