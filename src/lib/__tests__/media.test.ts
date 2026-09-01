import { describe, expect, it } from "vitest";
import { getMediaAsset, MEDIA_ASSETS } from "../media";

describe("SEE media manifest", () => {
  it("records Imagine holes as unverified and code clips as verified", () => {
    const imagine = MEDIA_ASSETS.filter((a) => a.model === "grok-imagine");
    expect(imagine.length).toBeGreaterThanOrEqual(8);
    expect(imagine.every((a) => a.verified === false)).toBe(true);
    expect(getMediaAsset("t568-pair-swap")?.verified).toBe(true);
    expect(getMediaAsset("apipa-lease")?.transcript).toMatch(/169\.254/);
    expect(getMediaAsset("wifi-band-reach")?.transcript).toMatch(/6E/);
    expect(getMediaAsset("m2-screw")?.transcript).toMatch(/NVMe/);
    expect(getMediaAsset("phishing-hover")?.overlayLabels).toEqual([
      "paypal.com",
      "paypa1-secure.example",
    ]);
  });

  it("never treats missing mp4 as the only label source", () => {
    for (const asset of MEDIA_ASSETS) {
      expect(asset.fallback.length).toBeGreaterThan(3);
      expect(asset.transcript ?? "").not.toHaveLength(0);
    }
  });
});
