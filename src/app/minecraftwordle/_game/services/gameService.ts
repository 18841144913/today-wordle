// Service layer: core Wordle business logic.
// May use Utils and Data layers (per architecture: Service -> Utils/Data).
import {
  MAX_GUESSES,
  WORD_LENGTH,
  type GameState,
  type GameStatus,
  type LetterStatus,
} from "../types";
import { dayIndexFor } from "../utils/dateUtils";
import { answerForDay, isValidWord } from "../repositories/wordRepository";

export function createGame(dayIndex: number = dayIndexFor()): GameState {
  return {
    dayIndex,
    answer: answerForDay(dayIndex).word,
    guesses: [],
    evaluations: [],
    current: "",
    status: "playing",
  };
}

/**
 * Two-pass evaluation so duplicate letters are scored correctly:
 * greens first, then yellows drawn from the remaining letter pool.
 */
export function evaluateGuess(guess: string, answer: string): LetterStatus[] {
  const result: LetterStatus[] = Array(WORD_LENGTH).fill("absent");
  const pool: Record<string, number> = {};

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
    } else {
      pool[answer[i]] = (pool[answer[i]] ?? 0) + 1;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    const ch = guess[i];
    if (pool[ch] > 0) {
      result[i] = "present";
      pool[ch] -= 1;
    }
  }

  return result;
}

/** Best-known status per letter for keyboard coloring. */
export function getKeyboardStatuses(state: GameState): Record<string, LetterStatus> {
  const rank: Record<LetterStatus, number> = {
    empty: 0,
    tbd: 0,
    absent: 1,
    present: 2,
    correct: 3,
  };
  const map: Record<string, LetterStatus> = {};
  state.guesses.forEach((guess, row) => {
    const evals = state.evaluations[row];
    for (let i = 0; i < guess.length; i++) {
      const ch = guess[i];
      const next = evals[i];
      if (!map[ch] || rank[next] > rank[map[ch]]) map[ch] = next;
    }
  });
  return map;
}

export function addLetter(state: GameState, letter: string): GameState {
  if (state.status !== "playing" || state.current.length >= WORD_LENGTH) return state;
  return { ...state, current: state.current + letter.toLowerCase() };
}

export function removeLetter(state: GameState): GameState {
  if (state.status !== "playing" || state.current.length === 0) return state;
  return { ...state, current: state.current.slice(0, -1) };
}

export interface SubmitResult {
  state: GameState;
  error?: string;
  justFinished?: boolean;
}

export function submitGuess(state: GameState): SubmitResult {
  if (state.status !== "playing") return { state };
  if (state.current.length < WORD_LENGTH) return { state, error: "Not enough letters!" };
  if (!isValidWord(state.current)) return { state, error: "Word is not in word list!" };

  const guess = state.current;
  const evaluation = evaluateGuess(guess, state.answer);
  const guesses = [...state.guesses, guess];
  const evaluations = [...state.evaluations, evaluation];

  let status: GameStatus = state.status;
  if (guess === state.answer) status = "won";
  else if (guesses.length >= MAX_GUESSES) status = "lost";

  const next: GameState = { ...state, guesses, evaluations, current: "", status };
  return { state: next, justFinished: status !== "playing" };
}
