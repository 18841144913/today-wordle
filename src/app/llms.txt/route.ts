import { SITE_NAME, SITE_URL } from "@/lib/config";

export const dynamic = "force-static";

export function GET() {
  const content = `# ${SITE_NAME}

> ${SITE_NAME} publishes the official New York Times Wordle answer and spoiler-free hints every day, plus a complete archive of every past answer and a free Wordle solver. Answers are sourced from the official NYT Wordle data and updated daily at midnight US Eastern time.

## Main Pages
- [Today's Wordle Answer](${SITE_URL}/): Today's official Wordle answer, progressive spoiler-free hints, an objective word breakdown, and yesterday's answer. Updated every day.
- [Wordle Answer Archive](${SITE_URL}/archive): Every past Wordle answer organised by year and puzzle number, going back to the first puzzle (CIGAR) on June 19, 2021.
- [Wordle Solver](${SITE_URL}/wordle-solver): Free tool that lists every valid five-letter word matching your green, yellow and gray letter clues.
- [Minecraft Wordle](${SITE_URL}/minecraftwordle): A free daily Minecraft-themed Wordle. Guess the hidden five-letter Minecraft word (blocks, mobs, biomes, tools) in six tries using color clues, with stats and streaks saved in your browser.

## Answer Pages
- Each day has a permanent page at ${SITE_URL}/wordle/YYYY-MM-DD (for example ${SITE_URL}/wordle/2026-06-17) containing that day's answer, hints, puzzle number and word breakdown.

## About
- Wordle gives players six guesses to find a hidden five-letter word, with a new puzzle published daily by The New York Times.
- Wordle is a trademark of The New York Times Company. ${SITE_NAME} is an independent fan resource and is not affiliated with NYT.

## Contact
- Website: ${SITE_URL}
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
