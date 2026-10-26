import { afterEach, describe, expect, it, vi } from "vitest";
import { vibrateFail, vibrateSuccess } from "../haptics";

describe("haptics", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("no-ops when vibrate is missing", () => {
    vi.stubGlobal("navigator", {});
    expect(() => vibrateSuccess()).not.toThrow();
    expect(() => vibrateFail()).not.toThrow();
  });

  it("uses a short pattern for success and a different one for a miss", () => {
    const vibrate = vi.fn(() => true);
    vi.stubGlobal("navigator", { vibrate });
    vibrateSuccess();
    vibrateFail();
    expect(vibrate).toHaveBeenNthCalledWith(1, [15, 40, 20]);
    expect(vibrate).toHaveBeenNthCalledWith(2, [40, 60, 40, 60, 50]);
  });

  it("swallows vibrate throws", () => {
    vi.stubGlobal("navigator", {
      vibrate: () => {
        throw new Error("unsupported");
      },
    });
    expect(() => vibrateFail()).not.toThrow();
  });
});
