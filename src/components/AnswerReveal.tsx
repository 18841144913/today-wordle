import { Eye, EyeOff, HelpCircle, PartyPopper, ScanSearch } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Tile, WordTiles } from "@/components/Tile";
import { buildLetterHints } from "@/lib/utils/hints";

/**
 * Spoiler-protected answer reveal. The answer text is rendered in the DOM at
 * all times (inside collapsed <details>), so search engines can index it while
 * users only see it after they choose to reveal.
 */
export function AnswerReveal({
  solution,
  longDate,
  number,
  isToday,
}: {
  solution: string;
  longDate: string;
  number: number;
  isToday: boolean;
}) {
  const letters = solution.toUpperCase().split("");
  const facts = buildLetterHints(solution);

  const breakdown = [
    `It is ${facts.length} letters long.`,
    `It contains ${facts.vowelCount} vowel${facts.vowelCount === 1 ? "" : "s"}.`,
    facts.hasRepeatedLetter
      ? "It has at least one repeated letter."
      : "All five letters are different.",
    facts.uncommonLetters.length > 0
      ? `It uses the less common letter${facts.uncommonLetters.length === 1 ? "" : "s"} ${facts.uncommonLetters.join(", ")}.`
      : "Every letter is a common one.",
  ];

  return (
    <section
      aria-label="Wordle answer"
      className="rounded-2xl border border-zinc-200 bg-gradient-to-b from-muted to-white p-5 shadow-sm sm:p-6"
    >
      <SectionHeading icon={HelpCircle}>
        {isToday
          ? "What is today's Wordle answer?"
          : `What was the Wordle answer for ${longDate}?`}
      </SectionHeading>
      <p className="mt-2 text-sm text-zinc-600">
        Tap a tile to reveal one letter at a time, or reveal the whole word.
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {letters.map((char, i) => (
          <details key={i} className="tile-reveal">
            <summary>
              <Tile char={String(i + 1)} variant="masked" />
            </summary>
            <Tile char={char} variant="correct" className="tile-shown" />
          </details>
        ))}
      </div>

      <details className="group mt-5">
        <summary className="inline-flex items-center gap-2 rounded-lg bg-cta px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-cta-dark active:scale-[0.98]">
          <Eye className="h-4 w-4 group-open:hidden" aria-hidden />
          <EyeOff className="hidden h-4 w-4 group-open:block" aria-hidden />
          <span className="group-open:hidden">
            {isToday ? "Show today's answer" : "Show the answer"}
          </span>
          <span className="hidden group-open:inline">Answer revealed</span>
        </summary>
        <div className="mt-4">
          <p className="mb-3 text-sm text-zinc-600">
            The answer to Wordle #{number} for {longDate} is:
          </p>
          <WordTiles word={solution} />
          <p className="mt-3 flex items-center gap-2 text-2xl font-black uppercase tracking-widest">
            <PartyPopper className="h-6 w-6 text-present" aria-hidden />
            {solution}
          </p>

          <div className="mt-5 rounded-xl border border-zinc-200 bg-white p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold">
              <ScanSearch className="h-4 w-4 text-correct" aria-hidden />
              Word breakdown
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
              {breakdown.map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </section>
  );
}
