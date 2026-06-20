// Controller layer: exposes word info to the View without it touching
// the Data layer directly.
import { answerForDay } from "../repositories/wordRepository";
import type { WordEntry } from "../types";

export function getWordInfo(dayIndex: number): WordEntry {
  return answerForDay(dayIndex);
}
