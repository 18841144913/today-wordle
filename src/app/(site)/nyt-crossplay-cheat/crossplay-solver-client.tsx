"use client";

import { useEffect, useMemo, useState } from "react";
import { ListChecks, Loader2 } from "lucide-react";
import { solve } from "@/lib/crossplay/solver";

export function CrossplaySolverClient() {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [rack, setRack] = useState("");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");

  useEffect(() => {
    fetch("/crossplay-words.txt")
      .then((res) => res.text())
      .then((text) =>
        setWords(text.split("\n").map((w) => w.trim()).filter(Boolean)),
      )
      .finally(() => setLoading(false));
  }, []);

  const { results, total } = useMemo(() => {
    if (words.length === 0 || rack.trim() === "") {
      return { results: [], total: 0 };
    }
    return solve(words, { rack, startsWith, endsWith, contains });
  }, [words, rack, startsWith, endsWith, contains]);

  const sanitizeRack = (value: string) =>
    value.toLowerCase().replace(/[^a-z?]/g, "");
  const sanitizeLetters = (value: string) =>
    value.toLowerCase().replace(/[^a-z]/g, "");

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold" htmlFor="rack">
          Your tiles — use <span className="font-mono">?</span> for a blank
        </label>
        <input
          id="rack"
          value={rack.toUpperCase()}
          onChange={(e) => setRack(sanitizeRack(e.target.value))}
          placeholder="e.g. LMNO?ET"
          autoComplete="off"
          autoCapitalize="characters"
          className="mt-2 w-full rounded border-2 border-correct px-3 py-3 text-xl font-extrabold uppercase tracking-[0.3em] outline-none focus:ring-2 focus:ring-correct"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-semibold" htmlFor="starts">
            Starts with
          </label>
          <input
            id="starts"
            value={startsWith.toUpperCase()}
            onChange={(e) => setStartsWith(sanitizeLetters(e.target.value))}
            placeholder="LE"
            autoComplete="off"
            className="mt-2 w-full rounded border-2 border-zinc-300 px-3 py-2 text-lg font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-present"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold" htmlFor="ends">
            Ends with
          </label>
          <input
            id="ends"
            value={endsWith.toUpperCase()}
            onChange={(e) => setEndsWith(sanitizeLetters(e.target.value))}
            placeholder="ON"
            autoComplete="off"
            className="mt-2 w-full rounded border-2 border-zinc-300 px-3 py-2 text-lg font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-present"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold" htmlFor="contains">
            Contains letters
          </label>
          <input
            id="contains"
            value={contains.toUpperCase()}
            onChange={(e) => setContains(sanitizeLetters(e.target.value))}
            placeholder="MO"
            autoComplete="off"
            className="mt-2 w-full rounded border-2 border-zinc-300 px-3 py-2 text-lg font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-present"
          />
        </div>
      </div>

      <div>
        <p className="flex items-center gap-2 text-sm font-semibold text-zinc-600">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Loading word list…
            </>
          ) : rack.trim() === "" ? (
            <>
              <ListChecks className="h-4 w-4 text-correct" aria-hidden />
              Enter your tiles to see playable words.
            </>
          ) : (
            <>
              <ListChecks className="h-4 w-4 text-correct" aria-hidden />
              {total} playable word{total === 1 ? "" : "s"} — sorted by Crossplay
              score
            </>
          )}
        </p>

        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {results.map((r) => (
            <li
              key={r.word}
              className="flex items-center justify-between gap-2 rounded-md bg-muted px-3 py-2"
            >
              <span className="font-bold uppercase tracking-wide">{r.word}</span>
              <span
                className="flex h-6 min-w-6 items-center justify-center rounded bg-correct px-1.5 text-xs font-black text-white"
                title={`${r.score} points${r.blanksUsed ? ` · ${r.blanksUsed} blank${r.blanksUsed === 1 ? "" : "s"}` : ""}`}
              >
                {r.score}
              </span>
            </li>
          ))}
        </ul>

        {total > results.length && (
          <p className="mt-3 text-sm text-zinc-500">
            Showing the top {results.length} by score — add a constraint to
            narrow it down.
          </p>
        )}
      </div>
    </div>
  );
}
