import type { Metadata } from "next";
import { Geist_Mono, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MotionProvider } from "@/components/motion/motion-provider";
import { meta } from "@/lib/content/home";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Without this, Next resolves preview-image URLs against localhost outside Vercel.
  metadataBase: new URL(meta.url),
  title: meta.title,
  description: meta.description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: meta.siteName,
    title: meta.title,
    description: meta.description,
  },
};

/** Cloudflare Web Analytics site token, read at build time. Without one, no beacon ships. */
const webAnalyticsToken = process.env.SALTANCY_WEB_ANALYTICS_TOKEN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("dark", inter.variable, fraunces.variable, geistMono.variable)}
    >
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
        {/* Cookieless page-view analytics, matching "basic analytics" in the privacy policy. */}
        {webAnalyticsToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: webAnalyticsToken })}
          />
        )}
      </body>
    </html>
  );
}
