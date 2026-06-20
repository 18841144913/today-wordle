import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Wand2 } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { buildWebsiteMetadata } from "@/lib/utils/seo";
import { SolverClient } from "./solver-client";

export const metadata: Metadata = buildWebsiteMetadata({
  title: "Wordle Solver & Word Finder",
  description:
    "Free Wordle solver and word finder. Enter the green, yellow and gray letters from your board to instantly find every possible five-letter answer.",
  path: "/wordle-solver",
  imageAlt: "Free Wordle solver and five-letter word finder",
  keywords: [
    "Wordle solver",
    "Wordle word finder",
    "five letter word finder",
    "Wordle helper",
    "Wordle clues",
  ],
});

export default function WordleSolverPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Wordle Solver",
        item: `${SITE_URL}/wordle-solver`,
      },
    ],
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Wordle Solver",
    url: `${SITE_URL}/wordle-solver`,
    description:
      "Free Wordle solver that filters possible five-letter words from green, yellow and gray clue letters.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-correct/10 text-correct">
            <Wand2 className="h-5 w-5" aria-hidden />
          </span>
          Wordle Solver
        </h1>
        <p className="text-zinc-600">
          Enter the clues from your Wordle board and we&apos;ll list every valid
          five-letter word that still fits.
        </p>
      </header>

      <SolverClient />

      <section className="space-y-2 text-zinc-700">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <HelpCircle className="h-5 w-5 text-correct" aria-hidden />
          How to use the Wordle solver
        </h2>
        <p>
          Type the green letters into the matching positions, add any yellow
          letters you know are in the word, and list the gray letters that have
          been ruled out. The list updates instantly as you type.
        </p>
        <p>
          Looking for the answer instead? See{" "}
          <Link href="/" className="font-semibold text-correct-text underline">
            today&apos;s Wordle answer
          </Link>{" "}
          or browse the{" "}
          <Link href="/archive" className="font-semibold text-correct-text underline">
            full archive
          </Link>
          .
        </p>
      </section>

      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={appSchema} />
    </div>
  );
}
