# Today Wordle (today-wordle.com)

Daily New York Times Wordle answer, hints and a complete archive. Built with
Next.js (App Router) and deployed on Vercel.

## How it works

- **Answer source (single source of truth):** the official NYT endpoint
  `https://www.nytimes.com/svc/wordle/v2/{YYYY-MM-DD}.json`. It serves every
  puzzle from launch (2021-06-19) up to today. No third-party guesses, no
  fallback answers.
- **Daily freshness:** a Vercel Cron job hits `/api/revalidate` shortly after
  midnight US Eastern time and re-renders the home + today's pages. The home
  page also uses hourly ISR as a safety net.
- **Archive:** each past day is a permanent, statically-generated page at
  `/wordle/{date}` (immutable, cached forever). The `/archive` index links to
  all of them.

## Architecture (5-layer)

```
src/app/            View      — pages, layout, UI routes
src/components/      View      — presentational components
src/app/api/         Controller — request entry + validation (revalidate)
src/lib/services/    Service    — business logic (wordle.ts)
src/lib/utils/       Utils      — date/timezone, wordle number, hints
src/lib/data/        Data       — NYT + dictionary fetch (only I/O layer)
```

## Local development

```bash
npm install
cp .env.example .env.local   # adjust values
npm run dev
```

## Deploy on Vercel

1. Import the repo into Vercel.
2. Set env vars: `NEXT_PUBLIC_SITE_URL`, `CRON_SECRET`.
3. The cron in `vercel.json` runs `5 5 * * *` (UTC). On the Pro plan you can add
   a second entry to tighten the midnight rollover across DST.
4. Add the domain `today-wordle.com` and submit `/sitemap.xml` to Google Search
   Console.

## Updating the solver word list

`public/wordle-words.txt` is the bundled five-letter word list used by the
client-side solver. Regenerate it from the canonical Wordle lists if needed.
