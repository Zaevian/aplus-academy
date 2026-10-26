type VibratePattern = number | number[];

function vibrationApi(): ((pattern: VibratePattern) => boolean) | null {
  if (typeof navigator === "undefined") return null;
  const vibrate = navigator.vibrate;
  if (typeof vibrate !== "function") return null;
  return vibrate.bind(navigator);
}

function pulse(pattern: number[]): void {
  const vibrate = vibrationApi();
  if (!vibrate) return;
  try {
    vibrate(pattern);
  } catch {
    // Desktop browsers often expose nothing, or throw if the device cannot pulse.
  }
}

/** Short double tap. No-ops when Vibration API is missing. */
export function vibrateSuccess(): void {
  pulse([15, 40, 20]);
}

/** Longer triple pulse, distinct from success. No-ops when unsupported. */
export function vibrateFail(): void {
  pulse([40, 60, 40, 60, 50]);
}
