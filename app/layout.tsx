import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const roboto = Roboto({
  weight: ["400", "500", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://ai-showdown-vg.vercel.app";

const TITLE = "Vedank Gaur - Generative AI Designer | the photorealism showdown";
const DESCRIPTION = "One prompt, three AIs, zero studio. Gemini vs ChatGPT vs a personal agent on photoreal UGC - by Vedank Gaur, Generative AI Designer.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "the photorealism showdown",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "One prompt. Three AIs. - the photorealism showdown, Emma and Jake polaroid portraits on dotted paper" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.jpg", alt: "One prompt. Three AIs. - the photorealism showdown, Emma and Jake polaroid portraits on dotted paper" }],
  },
};

export const viewport: Viewport = { themeColor: "#F4F4F2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <nav aria-label="Version switch" style={{ position: "fixed", right: 18, bottom: 18, zIndex: 9999, display: "flex", gap: 10 }}>
          <a href="/" aria-current="page" style={{ width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, textDecoration: "none", color: "#1c1a17", border: "2px solid #1c1a17", background: "#ffd84d", boxShadow: "3px 3px 0 #1c1a17" }}>Old</a>
          <a href="/production" style={{ width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, textDecoration: "none", color: "#1c1a17", border: "2px solid #1c1a17", background: "#f6f1e4" }}>New</a>
        </nav>
      </body>
    </html>
  );
}
