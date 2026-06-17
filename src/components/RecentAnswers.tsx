import Link from "next/link";
import { ArrowUpRight, History } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { Answer } from "@/lib/services/wordle";

export function RecentAnswers({
  answers,
  heading = "Recent Wordle answers",
}: {
  answers: Answer[];
  heading?: string;
}) {
  if (answers.length === 0) return null;

  return (
    <section aria-label={heading} className="space-y-3">
      <SectionHeading icon={History}>{heading}</SectionHeading>
      <ul className="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200">
        {answers.map((answer) => (
          <li key={answer.date}>
            <Link
              href={`/wordle/${answer.date}`}
              className="group flex items-center justify-between px-4 py-3 transition hover:bg-muted"
            >
              <span className="text-zinc-600">
                <span className="font-mono text-xs text-zinc-400">
                  #{answer.number}
                </span>{" "}
                · {answer.longDate}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-bold uppercase tracking-wide">
                  {answer.solution}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-zinc-300 transition group-hover:text-correct"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
