import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PuzzleArticle } from "@/components/PuzzleArticle";
import {
  getRecentAnswers,
  getTodayDate,
  getTodayPuzzleView,
} from "@/lib/services/wordle";

// Safety net: regenerate hourly so the page self-heals to the new day even if
// the cron revalidation is missed. The cron triggers an instant refresh.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const puzzle = await getTodayPuzzleView();
  if (!puzzle) {
    return { title: "Today's Wordle Answer & Hints" };
  }

  const title = `Today's Wordle Answer — ${puzzle.longDate} (#${puzzle.number})`;
  const description = `Today's Wordle hints and answer for ${puzzle.longDate} (puzzle #${puzzle.number}). Spoiler-free clues first, then reveal the solution. Updated daily.`;

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: { title, description, url: "/", type: "article" },
    twitter: { title, description },
  };
}

export default async function HomePage() {
  const puzzle = await getTodayPuzzleView();
  if (!puzzle) notFound();

  const recent = await getRecentAnswers(getTodayDate(), 7);

  return (
    <PuzzleArticle
      puzzle={puzzle}
      recent={recent}
      isToday
      canonicalPath="/"
    />
  );
}
