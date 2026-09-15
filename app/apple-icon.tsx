import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon: same gold "G" brand mark, solid background (no transparency).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          borderRadius: "40px",
          border: "9px solid #C9A96E",
        }}
      >
        <div
          style={{
            fontSize: 96,
            lineHeight: 1,
            color: "#C9A96E",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 400,
            transform: "translateY(-4px)",
          }}
        >
          G
        </div>
      </div>
    ),
    { ...size }
  );
}
