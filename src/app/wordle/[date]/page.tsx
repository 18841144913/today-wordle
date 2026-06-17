import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PuzzleArticle } from "@/components/PuzzleArticle";
import {
  getAnswer,
  getPuzzleView,
  getRecentAnswers,
  getRecentDatesForPrerender,
  getTodayDate,
} from "@/lib/services/wordle";
import { isValidDateString } from "@/lib/utils/date";

// Past answers never change once published -> cache the generated page forever.
export const revalidate = false;
export const dynamicParams = true;

export async function generateStaticParams() {
  const today = getTodayDate();
  return getRecentDatesForPrerender(today, 14).map((date) => ({ date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  if (!isValidDateString(date)) return {};

  const answer = await getAnswer(date);
  if (!answer) return {};

  const title = `Wordle Answer for ${answer.longDate} (#${answer.number})`;
  const description = `Hints and the answer for Wordle #${answer.number} on ${answer.longDate}. Spoiler-free clues first, then reveal the solution.`;
  const path = `/wordle/${answer.date}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "article" },
    twitter: { title, description },
  };
}

export default async function DatedPuzzlePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  if (!isValidDateString(date)) notFound();

  const puzzle = await getPuzzleView(date);
  if (!puzzle) notFound();

  const recent = await getRecentAnswers(date, 7);
  const isToday = date === getTodayDate();

  return (
    <PuzzleArticle
      puzzle={puzzle}
      recent={recent}
      isToday={isToday}
      canonicalPath={`/wordle/${date}`}
    />
  );
}
