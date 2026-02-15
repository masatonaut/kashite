import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { sanitize } from "@/lib/validations";

export const runtime = "edge";

const ogParamsSchema = z.object({
  item: z.string().max(100).default("アイテム"),
  person: z.string().max(50).default("誰か"),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = ogParamsSchema.safeParse({
      item: searchParams.get("item") || undefined,
      person: searchParams.get("person") || undefined,
    });

    const item = sanitize(parsed.success ? parsed.data.item : "アイテム");
    const person = sanitize(parsed.success ? parsed.data.person : "誰か");

    // Fetch Outfit Bold font from Google Fonts
    const fontData = await fetch(
      "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC0C4G-EiAou6Y.woff2"
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: "#FAFAF8",
            position: "relative",
          }}
        >
          {/* Left accent line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "8px",
              background: "#E85D3A",
            }}
          />

          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px 80px",
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#1A1A1A",
                fontFamily: "Outfit",
                lineHeight: 1.3,
              }}
            >
              {person}さん、
              <br />
              {item} 返して！
            </div>
          </div>

          {/* Bottom right logo */}
          <div
            style={{
              position: "absolute",
              right: "60px",
              bottom: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                fontFamily: "Outfit",
                display: "flex",
              }}
            >
              <span style={{ color: "#E85D3A" }}>K</span>
              <span style={{ color: "#1A1A1A" }}>ASHITE</span>
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#9B9B9B",
                marginTop: "4px",
              }}
            >
              by choimo
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Outfit",
            data: fontData,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error("OG Image generation error:", error);

    // Fallback simple response
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FAFAF8",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            KASHITE
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
