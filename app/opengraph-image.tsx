import { ImageResponse } from "next/og";
import { markDataUri } from "@/lib/brand/mark";
import { halite, haliteAlpha } from "@/lib/brand/tokens";
import { hero } from "@/lib/content/home";

export const alt = "Saltancy: software worth its salt. A glass crystal with a glowing ember core.";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

/**
 * One static TrueType cut from Google Fonts (the same source next/font uses at
 * build time). The image renderer can't read variable fonts or woff2, so the
 * optical size and weight are pinned to the cuts the site shows at this scale.
 */
async function googleFont(family: string) {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}`, {
    // An old browser is served TrueType instead of woff2.
    headers: { "User-Agent": "Mozilla/4.0" },
  }).then((res) => res.text());
  const url = css.match(/src: url\((\S+?)\) format\('truetype'\)/)?.[1];
  if (!url) throw new Error(`Google Fonts returned no TrueType file for ${family}`);
  return fetch(url).then((res) => res.arrayBuffer());
}

/** The social card shown when saltancy.com is shared: the hero headline beside the crystal. */
export default async function OpengraphImage() {
  const [display, displayItalic, wordmark, mono] = await Promise.all([
    googleFont("Fraunces:opsz,wght@144,300"),
    googleFont("Fraunces:ital,opsz,wght@1,144,300"),
    googleFont("Fraunces:opsz,wght@72,500"),
    googleFont("Geist+Mono:wght@400"),
  ]);
  const ember = halite("ember");
  const { headline } = hero;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        padding: "64px 80px",
        backgroundColor: halite("ink"),
        color: halite("salt"),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 640,
          top: 25,
          width: 580,
          height: 580,
          backgroundImage: `radial-gradient(circle, ${haliteAlpha("ember", 0.2)} 0%, ${haliteAlpha("ember", 0)} 68%)`,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain elements, not next/image. */}
          <img src={markDataUri({ detail: "small", tile: "none", size: 56 })} width={56} height={56} alt="" />
          <div style={{ display: "flex", fontFamily: "Fraunces Wordmark", fontSize: 40, letterSpacing: -0.8 }}>
            Saltancy<span style={{ color: ember }}>.</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Fraunces",
            fontSize: 118,
            lineHeight: 1,
            letterSpacing: -4,
          }}
        >
          <span>{headline.before}</span>
          <span style={{ display: "flex" }}>
            {headline.after}&nbsp;<span style={{ fontStyle: "italic", color: ember }}>{headline.emphasis}</span>
            {headline.end}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Geist Mono",
            fontSize: 21,
            letterSpacing: 1.7,
            textTransform: "uppercase",
            color: halite("dune"),
          }}
        >
          {hero.kickerLead} {hero.kicker}
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain elements, not next/image. */}
        <img src={markDataUri({ detail: "full", tile: "none", size: 380 })} width={380} height={380} alt="" />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: display, weight: 300, style: "normal" },
        { name: "Fraunces", data: displayItalic, weight: 300, style: "italic" },
        { name: "Fraunces Wordmark", data: wordmark, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    }
  );
}
