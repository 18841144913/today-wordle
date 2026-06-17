import Link from "next/link";
import { CalendarDays, LibraryBig, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-absent">
        <SearchX className="h-8 w-8" aria-hidden />
      </div>
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-zinc-600">
        That Wordle answer isn&apos;t available. The puzzle may not have been
        published yet.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-cta px-4 py-2 font-semibold text-white transition hover:bg-cta-dark"
        >
          <CalendarDays className="h-4 w-4" aria-hidden />
          Today&apos;s answer
        </Link>
        <Link
          href="/archive"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 font-semibold transition hover:bg-muted"
        >
          <LibraryBig className="h-4 w-4" aria-hidden />
          Browse the archive
        </Link>
      </div>
    </div>
  );
}
