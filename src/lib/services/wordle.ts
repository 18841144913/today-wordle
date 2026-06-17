import { fetchDefinition, fetchPuzzleByDate, type WordDefinition } from "@/lib/data/nyt";
import {
  LAUNCH_DATE,
  addDays,
  daysBetween,
  formatLongDate,
  getAllDatesDescending,
  getRecentDates,
  getTodayEtDate,
} from "@/lib/utils/date";
import { buildLetterHints, type LetterHints } from "@/lib/utils/hints";
import { getWordleNumber } from "@/lib/utils/wordle-number";

export interface Answer {
  date: string;
  longDate: string;
  number: number;
  solution: string;
  editor: string | null;
}

export interface PuzzleView extends Answer {
  hints: LetterHints;
  definition: WordDefinition | null;
}

export interface ArchiveEntry {
  date: string;
  longDate: string;
  number: number;
}

function toAnswer(puzzle: {
  printDate: string;
  solution: string;
  daysSinceLaunch: number | null;
  editor: string | null;
}): Answer {
  return {
    date: puzzle.printDate,
    longDate: formatLongDate(puzzle.printDate),
    number: getWordleNumber(puzzle.printDate, puzzle.daysSinceLaunch),
    solution: puzzle.solution,
    editor: puzzle.editor,
  };
}

/** Lightweight answer (one fetch, no enrichment). */
export async function getAnswer(date: string): Promise<Answer | null> {
  const puzzle = await fetchPuzzleByDate(date);
  return puzzle ? toAnswer(puzzle) : null;
}

/** Full view for an answer page: answer + hints + optional definition. */
export async function getPuzzleView(date: string): Promise<PuzzleView | null> {
  const puzzle = await fetchPuzzleByDate(date);
  if (!puzzle) return null;

  const answer = toAnswer(puzzle);
  const definition = await fetchDefinition(puzzle.solution);

  return {
    ...answer,
    hints: buildLetterHints(puzzle.solution),
    definition,
  };
}

export function getTodayDate(): string {
  return getTodayEtDate();
}

export async function getTodayPuzzleView(): Promise<PuzzleView | null> {
  return getPuzzleView(getTodayEtDate());
}

/** Recent answers (newest first) for the "recent" block. */
export async function getRecentAnswers(
  fromDate: string,
  count: number,
): Promise<Answer[]> {
  const dates = getRecentDates(fromDate, count).filter(
    (d) => daysBetween(LAUNCH_DATE, d) >= 0,
  );
  const answers = await Promise.all(dates.map((d) => getAnswer(d)));
  return answers.filter((a): a is Answer => a !== null);
}

/**
 * Archive index: every date from today back to launch as navigation links.
 * Computed from date math only (no API calls) — the solutions live on each
 * individual answer page, which is where the long-tail SEO value sits.
 */
export function getArchiveIndex(today: string): ArchiveEntry[] {
  return getAllDatesDescending(today).map((date) => ({
    date,
    longDate: formatLongDate(date),
    number: getWordleNumber(date, null),
  }));
}

/** Dates to statically pre-render at build time (recent window). */
export function getRecentDatesForPrerender(today: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => addDays(today, -i)).filter(
    (d) => daysBetween(LAUNCH_DATE, d) >= 0,
  );
}
