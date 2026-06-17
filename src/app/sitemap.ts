import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getArchiveIndex, getTodayDate } from "@/lib/services/wordle";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const today = getTodayDate();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/archive`, lastModified, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/wordle-solver`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  const answerRoutes: MetadataRoute.Sitemap = getArchiveIndex(today).map((entry) => ({
    url: `${SITE_URL}/wordle/${entry.date}`,
    lastModified: new Date(`${entry.date}T00:05:00-04:00`),
    changeFrequency: "yearly",
    priority: entry.date === today ? 0.9 : 0.5,
  }));

  return [...staticRoutes, ...answerRoutes];
}
