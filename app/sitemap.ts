import type { MetadataRoute } from "next";

const SITE_URL = "https://ai-showdown-vedankgaur11262002-gmailcoms-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
