import { ImageResponse } from "next/og";
import { markDataUri } from "@/lib/brand/mark";

export const dynamic = "force-static";

const SIZES = [16, 32, 48];

/** Packs PNG images into one ICO file (PNG entries are valid ICO images since Windows Vista). */
function ico(images: { size: number; png: Buffer }[]) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(16 * images.length);
  let offset = header.length + directory.length;
  images.forEach(({ size, png }, i) => {
    const at = i * 16;
    directory.writeUInt8(size, at); // width
    directory.writeUInt8(size, at + 1); // height
    directory.writeUInt16LE(1, at + 4); // colour planes
    directory.writeUInt16LE(32, at + 6); // bits per pixel
    directory.writeUInt32LE(png.length, at + 8);
    directory.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });

  return Buffer.concat([header, directory, ...images.map((image) => image.png)]);
}

/** /favicon.ico for clients that ask for it by name: the tab icon at 16, 32 and 48 pixels. */
export async function GET() {
  const images = await Promise.all(
    SIZES.map(async (size) => {
      const image = new ImageResponse(
        // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain elements, not next/image.
        <img src={markDataUri({ detail: "small", tile: "rounded", size })} width={size} height={size} alt="" />,
        { width: size, height: size }
      );
      return { size, png: Buffer.from(await image.arrayBuffer()) };
    })
  );
  // The registered ICO type. Hosts that sort binary from text by type (OpenNext among them) miss "image/x-icon".
  return new Response(new Uint8Array(ico(images)), { headers: { "Content-Type": "image/vnd.microsoft.icon" } });
}
