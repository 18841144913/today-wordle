const VOWELS = new Set(["A", "E", "I", "O", "U"]);
// Genuinely low-frequency English letters (objective, not a difficulty guess).
const UNCOMMON = new Set(["J", "Q", "X", "Z", "K", "V", "W", "F", "B"]);

export interface LetterHints {
  firstLetter: string;
  lastLetter: string;
  length: number;
  vowelCount: number;
  hasRepeatedLetter: boolean;
  uniqueLetterCount: number;
  uncommonLetters: string[];
}

/** Derive spoiler-free structural hints directly from the answer. */
export function buildLetterHints(solution: string): LetterHints {
  const letters = solution.toUpperCase().split("");
  const uniqueLetterCount = new Set(letters).size;
  return {
    firstLetter: letters[0],
    lastLetter: letters[letters.length - 1],
    length: letters.length,
    vowelCount: letters.filter((l) => VOWELS.has(l)).length,
    hasRepeatedLetter: uniqueLetterCount < letters.length,
    uniqueLetterCount,
    uncommonLetters: [...new Set(letters.filter((l) => UNCOMMON.has(l)))],
  };
}
