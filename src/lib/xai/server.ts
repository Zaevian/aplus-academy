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
