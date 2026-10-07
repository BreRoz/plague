import type { MetadataRoute } from "next";

const SITE_URL = "https://plaguemap2026.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: "2026-10-07", changeFrequency: "hourly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: "2026-10-07", changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: "2026-10-07", changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: "2026-10-05", changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: "2026-10-05", changeFrequency: "yearly", priority: 0.2 },
  ];
}
