import { SITE_URL } from "@/lib/config";

// AI crawlers we explicitly allow for maximum AI-search visibility.
const ALLOWED_AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "Amazonbot",
  "FacebookBot",
];

// Aggressive / low-value crawlers we block.
const BLOCKED_BOTS = ["Bytespider"];

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    "# today-wordle.com",
    "",
    "User-agent: *",
    "Allow: /",
    // Declare AI usage preferences (IETF draft draft-romm-aipref-contentsignals).
    "Content-Signal: ai-train=yes, search=yes, ai-retrieval=yes",
    "",
    "# AI search crawlers — explicitly allowed",
  ];

  for (const bot of ALLOWED_AI_BOTS) {
    lines.push(`User-agent: ${bot}`, "Allow: /", "");
  }

  lines.push("# Aggressive / low-value crawlers — blocked");
  for (const bot of BLOCKED_BOTS) {
    lines.push(`User-agent: ${bot}`, "Disallow: /", "");
  }

  lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`, `Host: ${SITE_URL}`, "");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
