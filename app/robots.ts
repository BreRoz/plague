import type { MetadataRoute } from "next";

// All crawlers, including AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended), are allowed so answer engines can cite the tracker.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://plaguemap2026.com/sitemap.xml",
    host: "https://plaguemap2026.com",
  };
}
