import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "999px",
          border: "2px solid #C9A96E",
        }}
      >
        <div style={{ fontSize: 14, color: "#C9A96E", letterSpacing: 2, fontFamily: "serif" }}>GL</div>
      </div>
    ),
    { ...size }
  );
}
