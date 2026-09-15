import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share card: brand mark + wordmark on near-black.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          border: "6px solid #C9A96E",
        }}
      >
        <div
          style={{
            width: 148,
            height: 148,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "999px",
            border: "4px solid #C9A96E",
          }}
        >
          <div
            style={{
              fontSize: 78,
              lineHeight: 1,
              color: "#C9A96E",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            G
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 54,
            letterSpacing: 14,
            color: "#FCFCF9",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          GOLD INTEREST
        </div>
        <div style={{ marginTop: 14, fontSize: 24, letterSpacing: 6, color: "#C9A96E" }}>
          WALLPAPERS · POSTERS · APPAREL
        </div>
      </div>
    ),
    { ...size }
  );
}
