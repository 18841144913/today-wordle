import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/config";
import { TILE_VALUES } from "@/lib/crossplay/tiles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "NYT Crossplay Cheat & Solver — free word finder";

const WORD = "CROSSPLAY";

export default function Image() {
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
        <div style={{ display: "flex", gap: "10px", marginBottom: "40px" }}>
          {WORD.split("").map((c, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                width: "100px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: i % 2 === 0 ? "#6aaa64" : "#c9b458",
                color: "#fff",
                fontSize: "56px",
                fontWeight: 800,
                borderRadius: "10px",
              }}
            >
              <div style={{ display: "flex" }}>{c}</div>
              <div
                style={{
                  position: "absolute",
                  bottom: "6px",
                  right: "9px",
                  display: "flex",
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                {TILE_VALUES[c.toLowerCase()]}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: "70px", fontWeight: 800, color: "#121213" }}>
          Crossplay Cheat &amp; Solver
        </div>
        <div style={{ fontSize: "38px", color: "#787c7e", marginTop: "16px" }}>
          Free word finder · ranked by Crossplay points
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#2e7d32",
            marginTop: "40px",
            fontWeight: 700,
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    ),
    size,
  );
}
