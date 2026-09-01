import { describe, expect, it } from "vitest";
import { PORTS } from "@/content/ports";
import { ALL_OBJECTIVES } from "@/content/catalog";

describe("official A+ lists", () => {
  it("keeps the official 2.1 port list", () => {
    expect(PORTS.map((p) => p.ports)).toEqual([
      "20/21",
      "22",
      "23",
      "25",
      "53",
      "67/68",
      "80",
      "110",
      "143",
      "137-139",
      "389",
      "443",
      "445",
      "3389",
    ]);
  });

  it("catalogs AI as 4.10", () => {
    const ai = ALL_OBJECTIVES.find((o) => o.id === "C2-D4-O10");
    expect(ai?.officialCode).toBe("4.10");
  });
});
