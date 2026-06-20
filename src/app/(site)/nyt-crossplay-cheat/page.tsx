import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Grid3x3, HelpCircle, Lightbulb, ListOrdered } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { buildWebsiteMetadata } from "@/lib/utils/seo";
import { VALUE_GROUPS } from "@/lib/crossplay/tiles";
import { CrossplaySolverClient } from "./crossplay-solver-client";

const PAGE_PATH = "/nyt-crossplay-cheat";

// Let the local opengraph-image.tsx convention inject the (content-hashed)
// og:image and twitter:image URLs, so we strip the default images here.
const baseMetadata = buildWebsiteMetadata({
  title: "NYT Crossplay Cheat & Solver — Free Word Finder",
  description:
    "Free NYT Crossplay solver and cheat. Enter your rack tiles and board letters to find every playable word instantly, ranked by Crossplay points, with the full letter-value chart and strategy tips.",
  path: PAGE_PATH,
  keywords: [
    "NYT Crossplay",
    "Crossplay solver",
    "Crossplay cheat",
    "Crossplay word finder",
    "Crossplay helper",
    "Crossplay letter values",
    "Crossplay tile values",
    "Crossplay word game",
    "NYT Crossplay answers",
  ],
});

const { images: _ogImages, ...openGraphRest } = baseMetadata.openGraph ?? {};
const { images: _twImages, ...twitterRest } = baseMetadata.twitter ?? {};

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: openGraphRest,
  twitter: twitterRest,
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the NYT Crossplay solver?",
    a: "It is a free word finder for The New York Times' two-player game Crossplay. Type the tiles on your rack, add any letters already on the board, and it lists every valid word ranked by how many Crossplay points it scores.",
  },
  {
    q: "How do I use a blank tile?",
    a: "Type a question mark (?) in the tiles box for each blank you hold. A blank can stand in for any letter, but like in the real game it scores zero points.",
  },
  {
    q: "Are the letter values the same as Scrabble?",
    a: "No. Crossplay uses its own scoring. Mid-tier letters such as K, V, W, and Y are worth more, while common consonants like N, R, S, and T are only one point each, so the best play is often a short, high-value word.",
  },
  {
    q: "Which dictionary does this tool use?",
    a: "Results come from a large open English word list, so a handful of entries may differ from the official Crossplay dictionary. Treat the tool as practice and study help rather than a guaranteed in-game checker.",
  },
  {
    q: "Is the Crossplay solver free?",
    a: "Yes. It runs entirely in your browser with no account, download, or payment, and your tiles never leave your device.",
  },
  {
    q: "How many tiles are in NYT Crossplay?",
    a: "Crossplay uses a 100-tile bag that includes three blanks. Each player keeps a rack of seven hidden tiles and refills it after every move until the bag is empty.",
  },
  {
    q: "Can I use the Crossplay cheat on my phone?",
    a: "Yes. The solver is fully responsive and works in any mobile browser, so you can look up your best word on the same device you play Crossplay on.",
  },
];

const STEPS: { title: string; body: string }[] = [
  {
    title: "Enter your rack tiles",
    body: "Type the letters on your rack into the tiles box. Use a question mark (?) for each blank you are holding.",
  },
  {
    title: "Add board letters (optional)",
    body: "Narrow the list with a starts-with, ends-with, or contains filter to match a hook or open square on the board.",
  },
  {
    title: "Play the highest-scoring word",
    body: "Results are ranked by Crossplay points, so the word at the top is usually your strongest play. Aim it at a bonus square for even more.",
  },
];

export default function CrossplayCheatPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "NYT Crossplay Solver",
        item: `${SITE_URL}${PAGE_PATH}`,
      },
    ],
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NYT Crossplay Cheat & Solver",
    url: `${SITE_URL}${PAGE_PATH}`,
    description:
      "Free NYT Crossplay word finder that ranks every playable word from your tiles by Crossplay points.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    inLanguage: "en",
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript. Runs in any modern browser.",
    featureList: [
      "Find every playable Crossplay word from your rack tiles",
      "Blank tile (wildcard) support",
      "Starts-with, ends-with and contains filters",
      "Results ranked by official Crossplay letter values",
    ],
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li className="font-medium text-ink" aria-current="page">
            NYT Crossplay Solver
          </li>
        </ol>
      </nav>

      <header className="space-y-2">
        <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-correct/10 text-correct">
            <Grid3x3 className="h-5 w-5" aria-hidden />
          </span>
          NYT Crossplay Cheat &amp; Solver
        </h1>
        <p className="text-zinc-600">
          Enter the tiles on your rack (use <span className="font-mono">?</span>{" "}
          for blanks) plus any letters on the board, and we&apos;ll list every
          playable word ranked by Crossplay score.
        </p>
      </header>

      <CrossplaySolverClient />

      <section className="space-y-3 text-zinc-700">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <ListOrdered className="h-5 w-5 text-correct" aria-hidden />
          How to use the Crossplay solver
        </h2>
        <ol className="space-y-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-correct text-sm font-black text-white">
                {i + 1}
              </span>
              <span>
                <strong className="text-ink">{step.title}.</strong> {step.body}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3 text-zinc-700">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <HelpCircle className="h-5 w-5 text-correct" aria-hidden />
          What is NYT Crossplay?
        </h2>
        <p>
          Crossplay is the first head-to-head word game from The New York Times.
          Two players take turns building words on a shared grid from a common
          tile bag, a bit like Scrabble, but with its own rebalanced letter
          values and a stricter dictionary. Because short, high-value words
          often beat long ones, a quick way to spot your best move is to run your
          rack through a Crossplay solver like this one.
        </p>
      </section>

      <section className="space-y-3 text-zinc-700">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <Grid3x3 className="h-5 w-5 text-correct" aria-hidden />
          Crossplay letter values
        </h2>
        <p>
          Crossplay scoring rewards the trickier letters. Here is what each tile
          is worth, grouped by point value:
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {VALUE_GROUPS.map((group) => (
            <div
              key={group.points}
              className="flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2"
            >
              <span className="flex h-8 min-w-8 items-center justify-center rounded bg-correct px-2 text-sm font-black text-white">
                {group.points}
              </span>
              <span className="font-bold uppercase tracking-widest text-ink">
                {group.letters.join(" ")}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          Blank tiles are worth 0 points and can represent any letter.
        </p>
      </section>

      <section className="space-y-3 text-zinc-700">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <Lightbulb className="h-5 w-5 text-correct" aria-hidden />
          Strategy tips
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Chase the multipliers. Park a heavy tile like J, Q, X, or Z on a
            double- or triple-word square instead of playing it for face value.
          </li>
          <li>
            Short can beat long. A four-letter word with K, V, or W on a bonus
            often outscores a seven-letter word built from one-point tiles.
          </li>
          <li>
            Keep flexible letters such as S, R, T, N, and E to hook onto words
            already on the board and open up parallel plays.
          </li>
          <li>
            Plan the endgame. Don&apos;t get stuck holding high-value tiles when
            the bag runs low, because both players still get one final turn.
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-zinc-700">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <HelpCircle className="h-5 w-5 text-correct" aria-hidden />
          Frequently asked questions
        </h2>
        <dl className="space-y-4">
          {FAQS.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold text-ink">{item.q}</dt>
              <dd className="mt-1">{item.a}</dd>
            </div>
          ))}
        </dl>
        <p>
          Prefer a different puzzle? Try the{" "}
          <Link href="/wordle-solver" className="font-semibold text-correct-text underline">
            Wordle solver
          </Link>
          , check{" "}
          <Link href="/" className="font-semibold text-correct-text underline">
            today&apos;s Wordle answer
          </Link>
          , or browse the{" "}
          <Link href="/archive" className="font-semibold text-correct-text underline">
            answer archive
          </Link>
          .
        </p>
        <p className="text-sm text-zinc-500">
          Crossplay is a trademark of The New York Times Company. This is an
          independent fan tool and is not affiliated with NYT.
        </p>
      </section>

      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={appSchema} />
      <JsonLd data={faqSchema} />
    </div>
  );
}
