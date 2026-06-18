import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, LibraryBig } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { getArchiveIndex, getTodayDate } from "@/lib/services/wordle";
import { getYear } from "@/lib/utils/date";
import { absoluteUrl, buildWebsiteMetadata } from "@/lib/utils/seo";

export const revalidate = 86400;

export const metadata: Metadata = buildWebsiteMetadata({
  title: "Wordle Answers Archive — Every Past Answer",
  description:
    "Browse the complete archive of past Wordle answers by date and puzzle number, all the way back to the first puzzle (CIGAR) in June 2021.",
  path: "/archive",
  imageAlt: "Complete Wordle answers archive by date and puzzle number",
  keywords: [
    "Wordle answers archive",
    "past Wordle answers",
    "Wordle answer list",
    "Wordle puzzle numbers",
    "Wordle history",
  ],
});

export default function ArchivePage() {
  const today = getTodayDate();
  const entries = getArchiveIndex(today);

  const byYear = new Map<string, typeof entries>();
  for (const entry of entries) {
    const year = getYear(entry.date);
    const list = byYear.get(year) ?? [];
    list.push(entry);
    byYear.set(year, list);
  }
  const years = [...byYear.keys()];
  const currentYear = years[0];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Archive", item: `${SITE_URL}/archive` },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Wordle Answers Archive",
    description:
      "Complete archive of past Wordle answer pages, grouped by year and puzzle number.",
    url: `${SITE_URL}/archive`,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: entries.length,
      itemListElement: entries.slice(0, 50).map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Wordle #${entry.number} — ${entry.longDate}`,
        url: absoluteUrl(`/wordle/${entry.date}`),
      })),
    },
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-correct/10 text-correct">
            <LibraryBig className="h-5 w-5" aria-hidden />
          </span>
          Wordle Answers Archive
        </h1>
        <p className="text-zinc-600">
          Every {SITE_NAME} answer page, grouped by year. The very first Wordle
          answer was <strong>CIGAR</strong> on June 19, 2021.
        </p>
      </header>

      {years.map((year) => (
        <details key={year} open={year === currentYear} className="group">
          <summary className="flex cursor-pointer items-center gap-2 text-xl font-bold">
            <ChevronDown className="chevron h-5 w-5 text-zinc-400" aria-hidden />
            {year}{" "}
            <span className="text-sm font-normal text-zinc-500">
              ({byYear.get(year)!.length} answers)
            </span>
          </summary>
          <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {byYear.get(year)!.map((entry) => (
              <li key={entry.date}>
                <Link
                  href={`/wordle/${entry.date}`}
                  className="flex items-center justify-between rounded px-3 py-2 text-sm hover:bg-muted"
                >
                  <span className="text-zinc-700">{entry.longDate}</span>
                  <span className="text-zinc-400">#{entry.number}</span>
                </Link>
              </li>
            ))}
          </ul>
        </details>
      ))}

      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
    </div>
  );
}
