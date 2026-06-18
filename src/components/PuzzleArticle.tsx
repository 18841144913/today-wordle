import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  LibraryBig,
  PenLine,
  TriangleAlert,
  Wand2,
} from "lucide-react";
import { AnswerReveal } from "@/components/AnswerReveal";
import { EvergreenContent } from "@/components/EvergreenContent";
import { Faq, type FaqItem } from "@/components/Faq";
import { HintList } from "@/components/HintList";
import { JsonLd } from "@/components/JsonLd";
import { RecentAnswers } from "@/components/RecentAnswers";
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from "@/lib/config";
import type { Answer, PuzzleView } from "@/lib/services/wordle";

function buildAnswerPassage(puzzle: PuzzleView, isToday: boolean): string {
  const h = puzzle.hints;
  const when = isToday
    ? `today's Wordle puzzle (#${puzzle.number}) for ${puzzle.longDate}`
    : `the Wordle puzzle (#${puzzle.number}) for ${puzzle.longDate}`;

  const meaning = puzzle.definition?.definition
    ? `${puzzle.solution} is a five-letter ${puzzle.definition.partOfSpeech ?? "word"} meaning ${puzzle.definition.definition.replace(/\.$/, "").toLowerCase()}.`
    : `${puzzle.solution} is a common five-letter English word.`;

  const letters = `It contains ${h.vowelCount} vowel${h.vowelCount === 1 ? "" : "s"}, starts with the letter ${h.firstLetter} and ends with ${h.lastLetter}, and ${h.hasRepeatedLetter ? "includes a repeated letter" : "uses five different letters"}.`;

  const uncommon =
    h.uncommonLetters.length > 0
      ? ` It also uses the less common letter${h.uncommonLetters.length === 1 ? "" : "s"} ${h.uncommonLetters.join(", ")}, which can make it trickier to guess.`
      : "";

  const rules = `In Wordle you get six guesses to find a hidden five-letter word, with green, yellow and gray tiles showing how close each guess is.`;

  const nyt = `Wordle is published daily by The New York Times, and the puzzle number increases by one with each new day.`;

  const source = `${SITE_NAME} updates the answer every day at midnight US Eastern time using the official New York Times Wordle data.`;

  const help = `You can also browse every past answer in our archive or use our free Wordle solver to match your green, yellow and gray letters.`;

  return `The answer to ${when} is ${puzzle.solution}. ${meaning} ${letters}${uncommon} ${rules} ${nyt} ${source} ${help}`;
}

function buildFaq(puzzle: PuzzleView, isToday: boolean): FaqItem[] {
  const label = isToday ? "today's" : `the ${puzzle.longDate}`;
  return [
    {
      question: isToday
        ? "What is today's Wordle answer?"
        : `What was the Wordle answer for ${puzzle.longDate}?`,
      answer: `The answer to ${label} Wordle (#${puzzle.number}) is ${puzzle.solution}. Read the full explanation and spoiler-free hints above.`,
    },
    {
      question: "What are the rules of Wordle?",
      answer:
        "You have six guesses to find a hidden five-letter word. Green tiles mark a correct letter in the right spot, yellow tiles mark a correct letter in the wrong spot, and gray tiles mark letters that are not in the word.",
    },
    {
      question: "Who makes Wordle?",
      answer:
        "Wordle was created by Josh Wardle and is now owned and published by The New York Times, which releases a new puzzle every day.",
    },
    {
      question: "How often is the Wordle answer updated?",
      answer: `${SITE_NAME} updates with the new official Wordle answer and hints every day at midnight US Eastern time.`,
    },
  ];
}

export function PuzzleArticle({
  puzzle,
  recent,
  isToday,
  canonicalPath,
}: {
  puzzle: PuzzleView;
  recent: Answer[];
  isToday: boolean;
  canonicalPath: string;
}) {
  const heading = isToday
    ? `Today's Wordle Answer — ${puzzle.longDate} (#${puzzle.number})`
    : `Wordle Answer for ${puzzle.longDate} (#${puzzle.number})`;

  const pageUrl = `${SITE_URL}${canonicalPath}`;
  const previous = recent[0] ?? null;
  const olderAnswers = recent.slice(1);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: heading,
    description: `Hints and the answer for Wordle #${puzzle.number} on ${puzzle.longDate}.`,
    datePublished: `${puzzle.date}T00:05:00-04:00`,
    dateModified: `${puzzle.date}T00:05:00-04:00`,
    author: { "@type": "Organization", name: AUTHOR_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
      },
    },
    image: `${pageUrl}/opengraph-image`,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    inLanguage: "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Archive", item: `${SITE_URL}/archive` },
      { "@type": "ListItem", position: 3, name: `#${puzzle.number}`, item: pageUrl },
    ],
  };

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span className="px-1">/</span>
          <Link href="/archive" className="hover:text-ink">Archive</Link>
          <span className="px-1">/</span>
          <span className="text-zinc-700">#{puzzle.number}</span>
        </nav>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {heading}
        </h1>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <PenLine className="h-4 w-4" aria-hidden />
            By {AUTHOR_NAME}
          </span>
          <span className="text-zinc-300">·</span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarClock className="h-4 w-4" aria-hidden />
            Updated {puzzle.longDate}
          </span>
          {puzzle.editor ? (
            <>
              <span className="text-zinc-300">·</span>
              <span>NYT editor: {puzzle.editor}</span>
            </>
          ) : null}
        </p>
        <p className="text-zinc-700">
          {isToday
            ? "Looking for today's Wordle answer?"
            : `Looking for the Wordle answer for ${puzzle.longDate}?`}{" "}
          You&apos;re in the right place. Below are spoiler-free hints for Wordle
          #{puzzle.number}, the full solution whenever you&apos;re ready, the
          previous day&apos;s answer, and a complete archive of past Wordle
          answers. {SITE_NAME} is updated every day.
        </p>
        <p className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            <strong>Spoiler warning:</strong> hints come first, and the answer
            stays hidden until you choose to reveal it.
          </span>
        </p>
      </header>

      <HintList hints={puzzle.hints} definition={puzzle.definition} />
      <AnswerReveal
        solution={puzzle.solution}
        longDate={puzzle.longDate}
        number={puzzle.number}
        isToday={isToday}
      />

      {previous && (
        <Link
          href={`/wordle/${previous.date}`}
          className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-muted px-5 py-4 transition hover:border-correct hover:bg-white"
        >
          <span className="flex items-center gap-2 font-semibold">
            <CalendarClock className="h-4 w-4 text-correct" aria-hidden />
            {isToday ? "Yesterday's Wordle answer" : "Previous answer"} · #
            {previous.number}
          </span>
          <span className="flex items-center gap-2">
            <span className="font-black uppercase tracking-widest">
              {previous.solution}
            </span>
            <ArrowRight
              className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-correct"
              aria-hidden
            />
          </span>
        </Link>
      )}

      <section aria-label="Answer explained" className="space-y-3">
        <h2 className="text-lg font-bold">
          {isToday
            ? "Today's Wordle answer explained"
            : `Wordle #${puzzle.number} answer explained`}
        </h2>
        <p className="text-zinc-700">{buildAnswerPassage(puzzle, isToday)}</p>
      </section>

      <RecentAnswers answers={olderAnswers} heading="More recent answers" />
      <EvergreenContent />
      <Faq items={buildFaq(puzzle, isToday)} />

      <section className="flex flex-wrap gap-3">
        <Link
          href="/archive"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 font-semibold transition hover:border-correct hover:bg-muted"
        >
          <LibraryBig className="h-4 w-4" aria-hidden />
          Browse all past answers
        </Link>
        <Link
          href="/wordle-solver"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 font-semibold transition hover:border-correct hover:bg-muted"
        >
          <Wand2 className="h-4 w-4" aria-hidden />
          Open the Wordle solver
        </Link>
      </section>

      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
    </article>
  );
}
