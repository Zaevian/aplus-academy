import type { Lesson } from "../schema";
import { C2_D1_LESSONS } from "./c2/d1";
import { C2_D2_LESSONS } from "./c2/d2";
import { C2_D3_LESSONS } from "./c2/d3";
import { C2_D4_LESSONS } from "./c2/d4";

export const CORE2_LESSONS: Lesson[] = [
  ...C2_D1_LESSONS,
  ...C2_D2_LESSONS,
  ...C2_D3_LESSONS,
  ...C2_D4_LESSONS,
];
