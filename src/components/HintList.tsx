import { ChevronDown, Lightbulb } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { WordDefinition } from "@/lib/data/nyt";
import type { LetterHints } from "@/lib/utils/hints";

interface Hint {
  label: string;
  value: string;
}

function buildHints(
  hints: LetterHints,
  definition: WordDefinition | null,
): Hint[] {
  const items: Hint[] = [];

  if (definition?.definition) {
    items.push({ label: "Meaning", value: definition.definition });
  }
  if (definition?.partOfSpeech) {
    items.push({ label: "Part of speech", value: `It is a ${definition.partOfSpeech}.` });
  }

  items.push({
    label: "Vowels",
    value: `Today's answer contains ${hints.vowelCount} vowel${hints.vowelCount === 1 ? "" : "s"}.`,
  });
  items.push({
    label: "Repeated letters",
    value: hints.hasRepeatedLetter
      ? "There is at least one repeated letter."
      : "All five letters are unique.",
  });
  items.push({ label: "First letter", value: `It starts with “${hints.firstLetter}”.` });
  items.push({ label: "Last letter", value: `It ends with “${hints.lastLetter}”.` });

  if (definition?.synonyms?.length) {
    items.push({ label: "Synonyms", value: definition.synonyms.join(", ") });
  }

  return items;
}

export function HintList({
  hints,
  definition,
}: {
  hints: LetterHints;
  definition: WordDefinition | null;
}) {
  const items = buildHints(hints, definition);

  return (
    <section aria-label="Wordle hints" className="space-y-3">
      <SectionHeading icon={Lightbulb}>Today&apos;s Wordle hints</SectionHeading>
      <p className="text-sm text-zinc-600">
        Need a nudge without spoiling it? Reveal the clues one by one.
      </p>
      <ol className="space-y-2">
        {items.map((hint, i) => (
          <li key={i}>
            <details className="group rounded-xl border border-zinc-200 px-4 py-3 transition hover:border-zinc-300 open:bg-muted/60">
              <summary className="flex items-center gap-3 font-semibold">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-present/20 text-xs font-black text-present-dark">
                  {i + 1}
                </span>
                <span className="flex-1">{hint.label}</span>
                <span className="text-sm font-medium text-correct-text group-open:hidden">
                  Reveal
                </span>
                <ChevronDown
                  className="chevron h-4 w-4 text-zinc-400"
                  aria-hidden
                />
              </summary>
              <p className="mt-2 pl-9 text-zinc-700">{hint.value}</p>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}
