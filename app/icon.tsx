import { markSvg } from "@/lib/brand/mark";

export const contentType = "image/svg+xml";
export const size = { width: 64, height: 64 };

/** The browser-tab icon: the crystal on a dark tile, drawn to read at 16 to 48 pixels. */
export default function Icon() {
  return new Response(markSvg({ detail: "small", tile: "rounded", size: size.width }), {
    headers: { "Content-Type": contentType },
  });
}
