import { LAUNCH_DATE, daysBetween } from "./date";

/**
 * The Wordle number players see in-game. NYT exposes it as `days_since_launch`;
 * when absent (only the earliest entries) we derive it from the launch date.
 */
export function getWordleNumber(
  printDate: string,
  daysSinceLaunch: number | null,
): number {
  return daysSinceLaunch ?? daysBetween(LAUNCH_DATE, printDate);
}
