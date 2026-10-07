import type { MetadataRoute } from "next";

// The app allows every crawler. Note: Cloudflare's managed robots.txt setting
// prepends its own block in production that disallows several AI crawlers and
// user-triggered fetchers (e.g. GPTBot, ChatGPT-User, Perplexity-User). That
// is a Cloudflare dashboard setting, not controlled here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://plaguemap2026.com/sitemap.xml",
    host: "https://plaguemap2026.com",
  };
}
