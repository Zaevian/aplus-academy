import type { Question } from "../schema";
import { C1_D1_QUESTIONS } from "./c1/d1";
import { C1_D2_QUESTIONS } from "./c1/d2";
import { C1_D3_QUESTIONS } from "./c1/d3";
import { C1_D4_QUESTIONS } from "./c1/d4";
import { C1_D5_QUESTIONS } from "./c1/d5";

export const CORE1_QUESTIONS: Question[] = [
  ...C1_D1_QUESTIONS,
  ...C1_D2_QUESTIONS,
  ...C1_D3_QUESTIONS,
  ...C1_D4_QUESTIONS,
  ...C1_D5_QUESTIONS,
];
