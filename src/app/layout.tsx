import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { CalendarDays, LibraryBig, Wand2 } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  GOOGLE_ANALYTICS_ID,
  MICROSOFT_CLARITY_ID,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/config";
import "./globals.css";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_TAGLINE,
  logo: `${SITE_URL}/opengraph-image`,
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_TAGLINE,
  inLanguage: "en-US",
  publisher: { "@type": "Organization", name: SITE_NAME },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Today's Wordle Answer & Hints`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

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
        </div>
        <p className="mt-4 text-zinc-400">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${MICROSOFT_CLARITY_ID}");
          `}
        </Script>
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
        <Footer />
        <JsonLd data={ORGANIZATION_SCHEMA} />
        <JsonLd data={WEBSITE_SCHEMA} />
      </body>
    </html>
  );
}
