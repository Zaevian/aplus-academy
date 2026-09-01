import type { Question } from "../schema";
import { FOUNDATION_QUESTIONS } from "./foundation";
import { CORE1_QUESTIONS } from "./core1";
import { CORE2_QUESTIONS } from "./core2";

export const QUESTIONS: Question[] = [
  ...FOUNDATION_QUESTIONS,
  ...CORE1_QUESTIONS,
  ...CORE2_QUESTIONS,
];
