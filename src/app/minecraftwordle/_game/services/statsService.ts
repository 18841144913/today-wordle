// Service layer: streak & distribution rules.
import { MAX_GUESSES, type GameState, type GameStats } from "../types";
import { isYesterday } from "../utils/dateUtils";

export function emptyStats(): GameStats {
  return {
    played: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
    lastWonDayIndex: null,
    guessDistribution: Array(MAX_GUESSES).fill(0),
  };
}

/** Apply a finished game to the stats. Pure: returns a new stats object. */
export function recordResult(stats: GameStats, state: GameState): GameStats {
  const next: GameStats = {
    ...stats,
    guessDistribution: [...stats.guessDistribution],
  };
  next.played += 1;

  if (state.status === "won") {
    next.wins += 1;
    const tries = state.guesses.length;
    next.guessDistribution[tries - 1] += 1;
    const continues =
      stats.lastWonDayIndex !== null && isYesterday(stats.lastWonDayIndex, state.dayIndex);
    next.currentStreak = continues ? stats.currentStreak + 1 : 1;
    next.maxStreak = Math.max(next.maxStreak, next.currentStreak);
    next.lastWonDayIndex = state.dayIndex;
  } else {
    next.currentStreak = 0;
  }

  return next;
}

export function winPercentage(stats: GameStats): number {
  return stats.played === 0 ? 0 : Math.round((stats.wins / stats.played) * 100);
}
