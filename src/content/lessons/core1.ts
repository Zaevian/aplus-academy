import type { Lesson } from "../schema";
import { C1_D1_LESSONS } from "./c1/d1";
import { C1_D2_LESSONS } from "./c1/d2";
import { C1_D3_LESSONS } from "./c1/d3";
import { C1_D4_LESSONS } from "./c1/d4";
import { C1_D5_LESSONS } from "./c1/d5";

export const CORE1_LESSONS: Lesson[] = [
  ...C1_D1_LESSONS,
  ...C1_D2_LESSONS,
  ...C1_D3_LESSONS,
  ...C1_D4_LESSONS,
  ...C1_D5_LESSONS,
];
