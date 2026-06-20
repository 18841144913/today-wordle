import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/config";
import { MinecraftWordleGame } from "./_game/MinecraftWordleGame";

const PAGE_PATH = "/minecraftwordle";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/minecraftwordle-og.png`;

const TITLE = "Minecraft Wordle — Daily Block Word Puzzle";
const DESCRIPTION =
  "Play Minecraft Wordle free in your browser: a daily five-letter guessing game built from Minecraft blocks, mobs, and biomes. Six tries, color clues, and a streak to defend.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "minecraft wordle",
    "minecraft word game",
    "daily minecraft puzzle",
    "5 letter minecraft words",
    "block word game",
    "wordle minecraft edition",
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PAGE_URL,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Minecraft Wordle daily block word puzzle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need to download anything or sign up to play Minecraft Wordle?",
    a: "No. Minecraft Wordle loads straight in your browser at no cost, with nothing to install and no account or sign-in required.",
  },
  {
    q: "Is there a fresh puzzle each day?",
    a: "Yes. The Minecraft Wordle answer resets once per day and is the same for everyone, so you and your friends all chase the identical block-themed word.",
  },
  {
    q: "Where do the answers come from?",
    a: "Every solution is a five-letter term taken straight from Minecraft, spanning mobs, blocks, biomes, tools, and other things crafters meet in-game.",
  },
  {
    q: "What do the tile colors mean?",
    a: "Green marks a letter that is correct and in the right place, yellow means the letter belongs in the word but elsewhere, and gray rules the letter out entirely.",
  },
  {
    q: "Will my stats and streak carry over between visits?",
    a: "They will. Wins, streaks, and your guess distribution are kept in your own browser, so your progress stays put on that device.",
  },
];

const VIDEO_GAME_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Minecraft Wordle",
  url: PAGE_URL,
  image: OG_IMAGE,
  description:
    "A free daily Minecraft Wordle. Guess the hidden five-letter Minecraft word in six tries using green, yellow, and gray color clues.",
  genre: ["Puzzle", "Word game"],
  gamePlatform: "Web browser",
  applicationCategory: "Game",
  operatingSystem: "Any",
  inLanguage: "en",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function SeoContent() {
  return (
    <section className="seo-content" aria-label="About Minecraft Wordle">
      <article>
        <h2>How to Play Minecraft Wordle</h2>
        <p>
          Each round of Minecraft Wordle hides one five-letter word from the
          Minecraft universe, and you get six guesses to crack it. Type any real
          five-letter word, hit Enter, and watch the tiles repaint themselves:{" "}
          <strong>green</strong> means the letter is correct and in position,{" "}
          <strong>yellow</strong> means it is in the word but sitting elsewhere,
          and <strong>gray</strong> means it does not appear at all. Read those
          clues, refine your next guess, and close in on the answer before your
          six tries run out. A brand-new word lands every day.
        </p>
      </article>

      <article>
        <h2>Strategy Tips</h2>
        <ul>
          <li>
            Open with a vowel-rich word such as AUDIO or RAISE so your first
            guess lights up the most common letters at once.
          </li>
          <li>
            Treat every yellow tile as a clue with a job: that letter is in the
            answer, so simply relocate it on your following attempt.
          </li>
          <li>
            Lean into the theme. Because answers are rooted in Minecraft, blocky
            staples like STONE, CREEP, TORCH, or BIOME are smart words to keep in
            your back pocket.
          </li>
        </ul>
      </article>

      <article>
        <h2>What Is Minecraft Wordle?</h2>
        <p>
          Minecraft Wordle is a free daily brain teaser that fuses the
          one-word-a-day rhythm of Wordle with the blocky world players already
          love. The hidden word is always something you would recognize from the
          game, whether that is a mob, a building block, a biome, or a trusty
          tool. Solve it within six attempts and the color clues guide you the
          whole way; finish the round and you reveal a quick fact about the day
          word plus a link to learn more. Your streak and statistics live right
          in your browser, and a tap of the share button hands you the familiar
          grid of colored squares to show off. No installs, no accounts, no
          cost, just a quick daily puzzle for anyone who enjoys Minecraft.
        </p>
      </article>

      <article>
        <h2>Frequently Asked Questions</h2>
        <dl className="faq">
          {FAQS.map((item) => (
            <div className="faq__item" key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </article>

      <nav className="seo-links" aria-label="More word games">
        <Link href="/">Today&apos;s Wordle answer</Link>
        <Link href="/archive">Past Wordle answers</Link>
        <Link href="/wordle-solver">Wordle solver</Link>
      </nav>
    </section>
  );
}

export default function MinecraftWordlePage() {
  return (
    <>
      <JsonLd data={VIDEO_GAME_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <MinecraftWordleGame>
        <SeoContent />
      </MinecraftWordleGame>
    </>
  );
}
