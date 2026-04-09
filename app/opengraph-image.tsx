import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background:
          "radial-gradient(circle at 20% 20%, #334155 0%, #0f172a 45%, #020617 100%)",
        color: "#e2e8f0",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 30,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#cbd5e1",
        }}
      >
        Nirman Shrestha
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "flex",
            fontSize: 86,
            lineHeight: 1,
            fontWeight: 700,
            color: "#f8fafc",
          }}
        >
          Frontend Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#93c5fd",
          }}
        >
          React.js | Next.js | TypeScript | JavaScript
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#94a3b8",
          fontSize: 28,
        }}
      >
        <span>Portfolio</span>
        <span>Frontend Engineering</span>
      </div>
    </div>,
    size,
  );
}
