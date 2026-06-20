// Data layer: localStorage persistence. Only stores/reads data, no logic.
import type { GameState, GameStats } from "../types";

const GAME_KEY = "mcdle:game";
const STATS_KEY = "mcdle:stats";
const THEME_KEY = "mcdle:theme";

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable / quota — ignore, game still playable in-memory */
  }
}

export function loadGame(dayIndex: number): GameState | null {
  const saved = read<GameState>(GAME_KEY);
  return saved && saved.dayIndex === dayIndex ? saved : null;
}

export function saveGame(state: GameState): void {
  write(GAME_KEY, state);
}

export function loadStats(): GameStats | null {
  return read<GameStats>(STATS_KEY);
}

export function saveStats(stats: GameStats): void {
  write(STATS_KEY, stats);
}

export type ThemePref = "light" | "dark";

export function loadTheme(): ThemePref | null {
  return read<ThemePref>(THEME_KEY);
}

export function saveTheme(theme: ThemePref): void {
  write(THEME_KEY, theme);
}
