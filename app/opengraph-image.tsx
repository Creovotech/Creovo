import { ImageResponse } from "next/og";

export const alt = "Creovo — Premium websites, hand-built in weeks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f6f3",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 40,
            fontWeight: 700,
            color: "#08080a",
          }}
        >
          creovo<div style={{ color: "#ff4d2e" }}>.</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 70,
            fontWeight: 600,
            color: "#08080a",
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 1010,
          }}
        >
          Premium sites, hand-built in weeks — not template-factory months.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "#54545a",
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              background: "#ff4d2e",
              marginRight: 24,
            }}
          />
          Hand-coded · Sub-second loads · Live in ~4 weeks
        </div>
      </div>
    ),
    size,
  );
}
