import Link from "next/link";
import { Gamepad2, Lightbulb, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const STARTING_WORDS = ["CRANE", "SLATE", "ADIEU", "AUDIO", "STARE", "ROAST"];

const TILE_LEGEND = [
  { color: "bg-correct", label: "Correct spot" },
  { color: "bg-present", label: "Wrong spot" },
  { color: "bg-absent", label: "Not in word" },
];

export function EvergreenContent() {
  return (
    <section className="space-y-8 text-zinc-700">
      <div className="space-y-3">
        <SectionHeading icon={Gamepad2}>How to play Wordle</SectionHeading>
        <p>
          Wordle gives you six tries to guess a hidden five-letter word. After
          each guess, the tiles change color to show how close you are. A new
          puzzle is published every day at midnight.
        </p>
        <div className="flex flex-wrap gap-3">
          {TILE_LEGEND.map((item) => (
            <span key={item.label} className="flex items-center gap-2 text-sm">
              <span className={`h-5 w-5 rounded ${item.color}`} aria-hidden />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <SectionHeading icon={Lightbulb}>
          Tips to solve today&apos;s Wordle
        </SectionHeading>
        <ul className="list-disc space-y-1 pl-5">
          <li>Open with a word rich in common letters like E, A, R, O, T and S.</li>
          <li>Use your second guess to test a fresh set of vowels and consonants.</li>
          <li>Watch for repeated letters — they are easy to overlook.</li>
          <li>Eliminate gray letters completely before your next guess.</li>
          <li>
            Stuck? Try our{" "}
            <Link href="/wordle-solver" className="font-semibold text-correct-text underline">
              Wordle solver
            </Link>
            .
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <SectionHeading icon={Rocket}>Best Wordle starting words</SectionHeading>
        <p>
          A strong opener tests several common letters at once. Popular choices
          among players include:
        </p>
        <div className="flex flex-wrap gap-2">
          {STARTING_WORDS.map((word) => (
            <span
              key={word}
              className="rounded-md bg-muted px-3 py-1 font-bold tracking-wide ring-1 ring-zinc-200"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
