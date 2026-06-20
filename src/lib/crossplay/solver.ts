/**
 * Service + Utils layer: pure Crossplay word-finding logic. No DOM, no data
 * access — the word list is passed in by the caller (View/Data layer).
 *
 * Core model (KISS): every letter of a candidate word is treated as coming
 * from your rack. Blanks ("?") act as wildcards that score 0 points. Optional
 * starts-with / ends-with / contains constraints further filter the matches.
 */
import { TILE_VALUES } from "./tiles";

export interface SolveQuery {
  rack: string;
  startsWith?: string;
  endsWith?: string;
  contains?: string;
}

export interface SolveResult {
  word: string;
  score: number;
  length: number;
  blanksUsed: number;
}

export interface SolveOutput {
  results: SolveResult[];
  total: number;
}

function sanitize(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

interface ParsedRack {
  counts: Map<string, number>;
  blanks: number;
  total: number;
}

/** Parse a rack string into per-letter counts plus a blank count. */
export function parseRack(rack: string): ParsedRack {
  const counts = new Map<string, number>();
  let blanks = 0;
  for (const ch of rack.toLowerCase()) {
    if (ch === "?" || ch === "*") {
      blanks += 1;
    } else if (ch >= "a" && ch <= "z") {
      counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
  }
  let letterTotal = 0;
  for (const n of counts.values()) letterTotal += n;
  return { counts, blanks, total: letterTotal + blanks };
}

/**
 * Greedily check whether `word` can be built from the rack. Returns its
 * Crossplay score and the number of blanks consumed, or null if it cannot be
 * formed. Letters covered by a blank score 0 (real Crossplay rule).
 */
export function evaluateWord(
  word: string,
  rack: ParsedRack,
): { score: number; blanksUsed: number } | null {
  const remaining = new Map(rack.counts);
  let blanksLeft = rack.blanks;
  let blanksUsed = 0;
  let score = 0;

  for (const ch of word) {
    const have = remaining.get(ch) ?? 0;
    if (have > 0) {
      remaining.set(ch, have - 1);
      score += TILE_VALUES[ch] ?? 0;
    } else if (blanksLeft > 0) {
      blanksLeft -= 1;
      blanksUsed += 1;
    } else {
      return null;
    }
  }

  return { score, blanksUsed };
}

/** Find every playable word for the rack + constraints, ranked by score. */
export function solve(
  words: string[],
  query: SolveQuery,
  limit = 300,
): SolveOutput {
  const rack = parseRack(query.rack);
  if (rack.total === 0) return { results: [], total: 0 };

  const startsWith = sanitize(query.startsWith ?? "");
  const endsWith = sanitize(query.endsWith ?? "");
  const contains = [...new Set(sanitize(query.contains ?? ""))];

  const matches: SolveResult[] = [];
  for (const word of words) {
    if (word.length > rack.total) continue;
    if (startsWith && !word.startsWith(startsWith)) continue;
    if (endsWith && !word.endsWith(endsWith)) continue;
    if (contains.length && !contains.every((c) => word.includes(c))) continue;

    const evaluated = evaluateWord(word, rack);
    if (!evaluated) continue;

    matches.push({
      word,
      score: evaluated.score,
      length: word.length,
      blanksUsed: evaluated.blanksUsed,
    });
  }

  matches.sort(
    (a, b) =>
      b.score - a.score || b.length - a.length || a.word.localeCompare(b.word),
  );

  return { results: matches.slice(0, limit), total: matches.length };
}
