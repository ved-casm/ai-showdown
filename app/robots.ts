import type { MetadataRoute } from "next";

const SITE_URL = "https://ai-showdown-vedankgaur11262002-gmailcoms-projects.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
