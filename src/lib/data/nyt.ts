/**
 * Data access layer: the ONLY place that talks to the New York Times Wordle
 * endpoint. Business logic must go through this module so the source can be
 * swapped or cached without touching upper layers.
 *
 * Source (official, authoritative): https://www.nytimes.com/svc/wordle/v2/{YYYY-MM-DD}.json
 */

const NYT_BASE = "https://www.nytimes.com/svc/wordle/v2";
const DICT_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en";

export interface NytPuzzle {
  id: number;
  solution: string;
  printDate: string;
  daysSinceLaunch: number | null;
  editor: string | null;
}

interface NytRaw {
  id?: number;
  solution?: string;
  print_date?: string;
  days_since_launch?: number;
  editor?: string;
  status?: string;
}

/**
 * Fetch the official answer for a given date (YYYY-MM-DD).
 * Returns null when the puzzle does not exist yet (e.g. a future date -> 404).
 * Throws on genuine network/server failures (no silent fallback).
 */
export async function fetchPuzzleByDate(date: string): Promise<NytPuzzle | null> {
  const url = `${NYT_BASE}/${date}.json`;
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: false, tags: [`puzzle:${date}`] },
        signal: AbortSignal.timeout(8000),
        headers: { Accept: "application/json" },
      });

      if (res.status === 404) return null;
      if (!res.ok) {
        lastError = new Error(`NYT responded ${res.status} for ${date}`);
        continue;
      }

      const raw = (await res.json()) as NytRaw;
      if (raw.status === "ERROR" || !raw.solution || !raw.print_date) {
        return null;
      }

      return {
        id: raw.id ?? 0,
        solution: raw.solution.toUpperCase(),
        printDate: raw.print_date,
        daysSinceLaunch: raw.days_since_launch ?? null,
        editor: raw.editor ?? null,
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`Failed to fetch Wordle answer for ${date}: ${String(lastError)}`);
}

export interface WordDefinition {
  partOfSpeech: string | null;
  definition: string;
  synonyms: string[];
}

/**
 * Optional content enrichment. Returns null on any failure so it never blocks
 * the main answer flow (definition is a nice-to-have, not the source of truth).
 */
export async function fetchDefinition(word: string): Promise<WordDefinition | null> {
  const lower = word.toLowerCase();
  try {
    const res = await fetch(`${DICT_BASE}/${lower}`, {
      next: { revalidate: false, tags: [`def:${lower}`] },
      signal: AbortSignal.timeout(6000),
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as Array<{
      meanings?: Array<{
        partOfSpeech?: string;
        definitions?: Array<{ definition?: string }>;
        synonyms?: string[];
      }>;
    }>;

    const meaning = data?.[0]?.meanings?.[0];
    const definition = meaning?.definitions?.[0]?.definition;
    if (!definition) return null;

    return {
      partOfSpeech: meaning?.partOfSpeech ?? null,
      definition,
      synonyms: (meaning?.synonyms ?? []).slice(0, 4),
    };
  } catch {
    return null;
  }
}
