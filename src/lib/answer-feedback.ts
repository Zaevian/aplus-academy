const LETTERS = "ABCDEF";

export const MISS_LINE = "Not quite. Here is the right one.";

export function successLine(seed: number): "Nice!" | "You got it!" {
  return seed % 2 === 0 ? "Nice!" : "You got it!";
}

export function choiceLetter(index: number): string {
  return LETTERS[index] ?? String(index + 1);
}
