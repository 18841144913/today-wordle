import Link from "next/link";
import { CalendarDays, LibraryBig, Wand2, Boxes } from "lucide-react";
import { SITE_NAME } from "@/lib/config";

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold tracking-tight"
        >
          <span className="flex gap-0.5">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-correct text-sm font-black text-white">
              W
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded bg-present text-sm font-black text-white">
              !
            </span>
          </span>
          <span>{SITE_NAME}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium text-zinc-600 sm:gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-muted hover:text-ink"
          >
            <CalendarDays className="h-4 w-4" aria-hidden />
            <span>Today</span>
          </Link>
          <Link
            href="/archive"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-muted hover:text-ink"
          >
            <LibraryBig className="h-4 w-4" aria-hidden />
            <span>Archive</span>
          </Link>
          <Link
            href="/wordle-solver"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-muted hover:text-ink"
          >
            <Wand2 className="h-4 w-4" aria-hidden />
            <span>Solver</span>
          </Link>
          <Link
            href="/minecraftwordle"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-muted hover:text-ink"
          >
            <Boxes className="h-4 w-4" aria-hidden />
            <span>Minecraft</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-muted/50">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-zinc-500">
        <p className="mb-2">
          {SITE_NAME} publishes the official New York Times Wordle answer and
          hints every day, plus a complete archive of past answers.
        </p>
        <p className="mb-4">
          Wordle is a trademark of The New York Times Company. This site is an
          independent fan resource and is not affiliated with NYT.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/" className="flex items-center gap-1.5 hover:text-ink">
            <CalendarDays className="h-4 w-4" aria-hidden />
            Today&apos;s Answer
          </Link>
          <Link href="/archive" className="flex items-center gap-1.5 hover:text-ink">
            <LibraryBig className="h-4 w-4" aria-hidden />
            Past Answers
          </Link>
          <Link
            href="/wordle-solver"
            className="flex items-center gap-1.5 hover:text-ink"
          >
            <Wand2 className="h-4 w-4" aria-hidden />
            Wordle Solver
          </Link>
          <Link
            href="/minecraftwordle"
            className="flex items-center gap-1.5 hover:text-ink"
          >
            <Boxes className="h-4 w-4" aria-hidden />
            Minecraft Wordle
          </Link>
        </div>
        <p className="mt-4 text-zinc-400">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
      <Footer />
    </>
  );
}
