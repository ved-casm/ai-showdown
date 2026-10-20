import type { MetadataRoute } from "next";

const SITE_URL = "https://ai-showdown-vg.vercel.app";

const PAGES = [
  "/production/",
  "/production/pillow.html",
  "/production/pillow-pdp.html",
  "/production/pillow-landing.html",
  "/production/perfume.html",
  "/production/perfume-pdp.html",
  "/production/perfume-landing.html",
  "/production/mattress.html",
  "/production/mattress-pdp.html",
  "/production/mattress-landing.html",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/production/" ? 1 : 0.8,
  }));
}
