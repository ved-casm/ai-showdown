import type { MetadataRoute } from "next";

const SITE_URL = "https://ai-showdown-vg.vercel.app";

const PAGES = [
  "/",
  "/pillow.html",
  "/pillow-pdp.html",
  "/pillow-landing.html",
  "/perfume.html",
  "/perfume-pdp.html",
  "/perfume-landing.html",
  "/mattress.html",
  "/mattress-pdp.html",
  "/mattress-landing.html",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
