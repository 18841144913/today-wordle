"use client";

import { useEffect, useMemo, useState } from "react";
import { ListChecks, Loader2 } from "lucide-react";

function sanitizeLetters(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function matches(
  word: string,
  greens: string[],
  contains: string[],
  excludes: string[],
): boolean {
  for (let i = 0; i < 5; i++) {
    if (greens[i] && word[i] !== greens[i]) return false;
  }
  for (const letter of contains) {
    if (!word.includes(letter)) return false;
  }
  for (const letter of excludes) {
    // A gray letter excludes the word unless that letter is also known to be
    // present (green/yellow), in which case the user's gray input is ignored.
    if (contains.includes(letter) || greens.includes(letter)) continue;
    if (word.includes(letter)) return false;
  }
  return true;
}

export function SolverClient() {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [greens, setGreens] = useState<string[]>(["", "", "", "", ""]);
  const [contains, setContains] = useState("");
  const [excludes, setExcludes] = useState("");

  useEffect(() => {
    fetch("/wordle-words.txt")
      .then((res) => res.text())
      .then((text) => setWords(text.split("\n").map((w) => w.trim()).filter(Boolean)))
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    if (words.length === 0) return [];
    const containsArr = [...new Set(sanitizeLetters(contains).split(""))];
    const excludesArr = [...new Set(sanitizeLetters(excludes).split(""))];
    return words.filter((w) => matches(w, greens, containsArr, excludesArr));
  }, [words, greens, contains, excludes]);

  const setGreen = (i: number, value: string) => {
    const letter = sanitizeLetters(value).slice(-1);
    setGreens((prev) => prev.map((g, idx) => (idx === i ? letter : g)));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold">
          Correct letters (green) — placed in the right spot
        </label>
        <div className="mt-2 flex gap-2">
          {greens.map((g, i) => (
            <input
              key={i}
              value={g.toUpperCase()}
              onChange={(e) => setGreen(i, e.target.value)}
              maxLength={1}
              aria-label={`Green letter position ${i + 1}`}
              className="h-12 w-12 rounded border-2 border-correct text-center text-xl font-extrabold uppercase outline-none focus:ring-2 focus:ring-correct"
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold">
          Letters in the word (yellow)
        </label>
        <input
          value={contains.toUpperCase()}
          onChange={(e) => setContains(sanitizeLetters(e.target.value))}
          placeholder="e.g. AOR"
          className="mt-2 w-full rounded border-2 border-present px-3 py-2 text-lg font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-present"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold">
          Letters not in the word (gray)
        </label>
        <input
          value={excludes.toUpperCase()}
          onChange={(e) => setExcludes(sanitizeLetters(e.target.value))}
          placeholder="e.g. STLN"
          className="mt-2 w-full rounded border-2 border-absent px-3 py-2 text-lg font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-absent"
        />
      </div>

      <div>
        <p className="flex items-center gap-2 text-sm font-semibold text-zinc-600">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Loading word list…
            </>
          ) : (
            <>
              <ListChecks className="h-4 w-4 text-correct" aria-hidden />
              {results.length} matching word{results.length === 1 ? "" : "s"}
            </>
          )}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {results.slice(0, 200).map((word) => (
            <span
              key={word}
              className="rounded-md bg-muted px-3 py-1 font-bold uppercase tracking-wide"
            >
              {word}
            </span>
          ))}
        </div>
        {results.length > 200 && (
          <p className="mt-3 text-sm text-zinc-500">
            Showing the first 200 — add more clues to narrow it down.
          </p>
        )}
      </div>
    </div>
  );
}
