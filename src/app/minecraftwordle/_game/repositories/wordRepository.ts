// Data layer: read-only access to the bundled word datasets.
import answersData from "../data/answers.json";
import validWordsData from "../data/valid-words.json";
import { seededPermutation } from "../utils/shuffle";
import type { WordEntry } from "../types";

const answers = answersData as WordEntry[];
const validWords = new Set(validWordsData as string[]);

// Fixed-seed shuffle so the daily order is not a visible ascending sequence and
// the whole pool is consumed before any word repeats. Deterministic for all.
const DAILY_SEED = 0x6d63646c; // "mcdl"
const dailyOrder = seededPermutation(answers.length, DAILY_SEED);

export function answerCount(): number {
  return answers.length;
}

/** The answer for a given day, mapped through the shuffled order. */
export function answerForDay(dayIndex: number): WordEntry {
  const n = answers.length;
  const slot = ((dayIndex % n) + n) % n;
  return answers[dailyOrder[slot]];
}

export function isValidWord(word: string): boolean {
  return validWords.has(word.toLowerCase());
}
