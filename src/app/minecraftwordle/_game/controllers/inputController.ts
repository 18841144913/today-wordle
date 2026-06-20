// Controller layer: turns raw key events into game actions and routes them
// to the Service layer. No business rules live here, only dispatch + guarding.
import { addLetter, removeLetter, submitGuess } from "../services/gameService";
import type { GameState, InputResult } from "../types";
import { isLetter } from "../utils/stringUtils";

export type Key = string; // a single letter, "ENTER", or "BACKSPACE"

export function normalizeKey(raw: string): Key | null {
  if (raw === "Enter") return "ENTER";
  if (raw === "Backspace" || raw === "Delete") return "BACKSPACE";
  if (isLetter(raw)) return raw.toUpperCase();
  return null;
}

export function handleKey(state: GameState, key: Key): InputResult {
  if (state.status !== "playing") return { state };

  if (key === "ENTER") {
    const { state: next, error, justFinished } = submitGuess(state);
    return { state: next, toast: error, justFinished };
  }
  if (key === "BACKSPACE") {
    return { state: removeLetter(state) };
  }
  if (isLetter(key)) {
    return { state: addLetter(state, key) };
  }
  return { state };
}
