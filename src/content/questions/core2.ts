import type { Question } from "../schema";
import { C2_D1_QUESTIONS } from "./c2/d1";
import { C2_D2_QUESTIONS } from "./c2/d2";
import { C2_D3_QUESTIONS } from "./c2/d3";
import { C2_D4_QUESTIONS } from "./c2/d4";

export const CORE2_QUESTIONS: Question[] = [
  ...C2_D1_QUESTIONS,
  ...C2_D2_QUESTIONS,
  ...C2_D3_QUESTIONS,
  ...C2_D4_QUESTIONS,
];
