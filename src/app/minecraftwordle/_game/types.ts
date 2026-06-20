export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export type LetterStatus = "correct" | "present" | "absent" | "empty" | "tbd";

export type GameStatus = "playing" | "won" | "lost";

export interface WordEntry {
  word: string;
  about: string;
  wiki: string;
}

export interface GameState {
  dayIndex: number;
  answer: string;
  guesses: string[];
  evaluations: LetterStatus[][];
  current: string;
  status: GameStatus;
}

export interface GameStats {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  lastWonDayIndex: number | null;
  guessDistribution: number[];
}

export interface InputResult {
  state: GameState;
  toast?: string;
  /** Set on the turn the game transitions to won/lost. */
  justFinished?: boolean;
}
