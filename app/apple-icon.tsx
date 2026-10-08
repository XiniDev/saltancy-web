import { ImageResponse } from "next/og";
import { markDataUri } from "@/lib/brand/mark";

export const contentType = "image/png";
export const size = { width: 180, height: 180 };

/** The home-screen icon. Square and full-bleed: iOS rounds the corners itself. */
export default function AppleIcon() {
  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain elements, not next/image.
    <img src={markDataUri({ detail: "full", tile: "square", size: size.width })} width={size.width} height={size.height} alt="" />,
    size
  );
}
