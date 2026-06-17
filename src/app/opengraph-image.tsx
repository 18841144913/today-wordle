import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/config";
import { getAnswer, getTodayDate } from "@/lib/services/wordle";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Today's Wordle Answer & Hints";

export default async function Image() {
  const today = getTodayDate();
  let subtitle = "Hints & answer, updated daily";
  try {
    const answer = await getAnswer(today);
    if (answer) subtitle = `${answer.longDate} · Puzzle #${answer.number}`;
  } catch {
    // OG image must always render; fall back to the generic subtitle.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
          {["W", "O", "R", "D", "L", "E"].map((c, i) => (
            <div
              key={i}
              style={{
                width: "84px",
                height: "84px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: i % 2 === 0 ? "#6aaa64" : "#c9b458",
                color: "#fff",
                fontSize: "52px",
                fontWeight: 800,
                borderRadius: "8px",
              }}
            >
              {c}
            </div>
          ))}
        </div>
        <div style={{ fontSize: "72px", fontWeight: 800, color: "#121213" }}>
          Today&apos;s Wordle Answer
        </div>
        <div style={{ fontSize: "40px", color: "#787c7e", marginTop: "16px" }}>
          {subtitle}
        </div>
        <div style={{ fontSize: "32px", color: "#6aaa64", marginTop: "40px", fontWeight: 700 }}>
          {SITE_NAME}
        </div>
      </div>
    ),
    size,
  );
}
