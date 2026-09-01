import manifest from "@/content/media-manifest.json";

export type MediaAssetRecord = {
  id: string;
  kind: "image" | "video" | "audio";
  prompt: string;
  conceptId: string;
  model: string;
  generatedAt: string;
  path: string;
  fallback: string;
  verified: boolean;
  alt: string;
  transcript?: string;
  overlayLabels?: string[];
};

export const MEDIA_ASSETS = (manifest as { assets: MediaAssetRecord[] }).assets;

export function getMediaAsset(id: string): MediaAssetRecord | undefined {
  return MEDIA_ASSETS.find((a) => a.id === id);
}

export function publicMediaSrc(assetId: string): string {
  return `/media/${assetId}.mp4`;
}
