import type { Lesson } from "../schema";
import { FOUNDATION_LESSONS } from "./foundation";
import { CORE1_LESSONS } from "./core1";
import { CORE2_LESSONS } from "./core2";

export const LESSONS: Lesson[] = [
  ...FOUNDATION_LESSONS,
  ...CORE1_LESSONS,
  ...CORE2_LESSONS,
];
