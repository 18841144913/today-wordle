// Service layer: build shareable result text + per-platform share URLs.
import { SITE_URL as SITE_BASE } from "@/lib/config";
import { MAX_GUESSES, type GameState, type LetterStatus } from "../types";

export const SITE_URL = `${SITE_BASE}/minecraftwordle`;

const EMOJI: Record<LetterStatus, string> = {
  correct: "🟩",
  present: "🟨",
  absent: "⬛",
  empty: "⬛",
  tbd: "⬛",
};

export function buildShareText(state: GameState): string {
  const tries = state.status === "won" ? `${state.guesses.length}` : "X";
  const grid = state.evaluations
    .map((row) => row.map((s) => EMOJI[s]).join(""))
    .join("\n");
  return `Minecraft Wordle #${state.dayIndex} ${tries}/${MAX_GUESSES}\n\n${grid}\n${SITE_URL}`;
}

export interface ShareTarget {
  id: "copy" | "link" | "native" | "twitter" | "bluesky" | "email";
  label: string;
}

export function twitterUrl(text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function blueskyUrl(text: string): string {
  return `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`;
}

export function emailUrl(text: string): string {
  const subject = encodeURIComponent("My Minecraft Wordle result");
  return `mailto:?subject=${subject}&body=${encodeURIComponent(text)}`;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function canNativeShare(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function nativeShare(text: string): Promise<boolean> {
  try {
    await navigator.share({ title: "Minecraft Wordle", text });
    return true;
  } catch {
    return false;
  }
}
